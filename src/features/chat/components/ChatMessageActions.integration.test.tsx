import { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChatMessageDto, ConversationDto } from "../model/chat.dto";
import type { ChatRealtimeEvent } from "../services/chatRealtime";
import { ChatScreen } from "../screens/ChatScreen";
import { FloatingMessenger } from "./FloatingMessenger";
import { ApiError } from "../../../shared/api";

const listeners = vi.hoisted(() => new Set<(event: ChatRealtimeEvent) => void>());
const reconnects = vi.hoisted(() => new Set<() => void>());
const api = vi.hoisted(() => ({ conversations: vi.fn(), conversation: vi.fn(), details: vi.fn(), presence: vi.fn(), messages: vi.fn(), pins: vi.fn(), pin: vi.fn(), unpin: vi.fn(), recall: vi.fn(), messageStates: vi.fn(), reactionStates: vi.fn(), suggestions: vi.fn(), direct: vi.fn(), forward: vi.fn(), group: vi.fn(), send: vi.fn() }));
const realtime = vi.hoisted(() => ({ subscribe: vi.fn((_user: string, listener: (event: ChatRealtimeEvent) => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; }),
  subscribeReconnect: vi.fn((listener: () => void) => { reconnects.add(listener); return () => { reconnects.delete(listener); }; }),
  rememberRecipientCursor: vi.fn(), clearRecipientMemberCursors: vi.fn(), acknowledgeDelivered: vi.fn(), acknowledgeRead: vi.fn(), outgoingStatus: vi.fn(() => "sent"), publishLocalMessage: vi.fn() }));
vi.mock("../api/chat.api", () => ({ chatApi: api }));
vi.mock("../services/chatRealtime", () => ({ chatRealtime: realtime }));
vi.mock("../hooks/useChatMediaComposer", async (importOriginal) => ({
  ...await importOriginal<typeof import("../hooks/useChatMediaComposer")>(),
  useChatMediaComposer: () => ({ images: [], audioAttachment: null, recording: false, recordingElapsed: 0, error: "", clearImages: vi.fn() }),
}));
const conversation: ConversationDto = { id: "c", type: "DIRECT", title: "An", isDissolved: false, avatarUrl: null, lastMessageId: "m", lastMessageSeq: 5, lastMessageAt: null, lastMessageSenderId: "me", lastMessageType: "TEXT", lastMessagePreview: "secret-message", currentUserRole: "USER", unreadCount: 4, recipientDeliveredSeq: 0, recipientReadSeq: 0, createdAt: null };
const message: ChatMessageDto = { id: "m", conversationId: "c", messageSeq: 5, clientMessageId: null, senderId: "me", senderDisplayName: "Me", senderAvatarUrl: null, messageType: "TEXT", content: "secret-message", metadata: null, reply: null, replyToSeq: null, createdAt: "2026-10-06T08:00:00Z", editedAt: null, deleted: false, reactions: [], reactionVersion: 0, myReaction: null, isReact: false, likeCount: 0 };
beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  HTMLElement.prototype.scrollIntoView = vi.fn();
  vi.clearAllMocks(); Object.values(api).forEach((mock) => mock.mockReset()); listeners.clear(); reconnects.clear();
  api.conversations.mockResolvedValue({ items: [conversation], hasMore: false, nextCursor: null });
  api.conversation.mockRejectedValue(new Error("membership removed"));
  api.details.mockResolvedValue({ members: [{ userId: "me" }, { userId: "peer" }] });
  api.presence.mockResolvedValue({ userId: "peer", online: false, lastActiveAt: null });
  api.messages.mockResolvedValue({ items: [message], hasMore: false, nextCursor: null });
  api.pins.mockResolvedValue({ version: 0, canManage: true, items: [] });
  api.recall.mockResolvedValue({ ...message, deleted: true });
  api.messageStates.mockResolvedValue([{ ...message, deleted: true }]); api.reactionStates.mockResolvedValue([]);
});
afterEach(async () => { cleanup(); await Promise.resolve(); vi.restoreAllMocks(); });
function mount(surface: "full" | "mini") {
  return render(<StrictMode>{surface === "full" ? <ChatScreen userId="me" username="me" initialTarget={{ conversationId: "c" }} onOpenProfile={vi.fn()} onOpenStory={vi.fn()} />
    : <FloatingMessenger userId="me" openConversationRequest={{ conversationId: "c", nonce: 1 }} onOpenFullChat={vi.fn()} onOpenStory={vi.fn()} />}</StrictMode>);
}
describe.each(["full", "mini"] as const)("%s message action parity", (surface) => {
  it("retains the draft after send failure 1323 and retries the same request once", async () => {
    const content = `retry-1323-${surface}`;
    api.send.mockRejectedValueOnce(new ApiError("POST", "/chat/conversations/c/messages", 500,
      { code: 1323, backendMessage: "Create chat message failed" }))
      .mockResolvedValueOnce({ ...message, id: "accepted", messageSeq: 6, content });
    mount(surface);
    await screen.findByText("secret-message");
    const composer = screen.getByRole("textbox", { name: "Nội dung tin nhắn" });
    fireEvent.change(composer, { target: { value: content } });
    fireEvent.click(screen.getByRole("button", { name: "Gửi tin nhắn" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Máy chủ đang gặp sự cố");
    expect(composer).toHaveValue(content);
    const firstRequest = api.send.mock.calls[0][2];
    expect(firstRequest).toMatchObject({ messageType: "TEXT", content, recipientId: "peer" });
    expect(firstRequest.clientMessageId).toMatch(/^[a-f0-9-]{36}$/i);
    expect(screen.queryByText(content, { selector: "p.emoji-text" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Gửi tin nhắn" }));
    await waitFor(() => expect(api.send).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(composer).toHaveValue(""));
    expect(api.send.mock.calls[1][2]).toEqual(firstRequest);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getAllByText(content, { selector: "p.emoji-text" })).toHaveLength(1);
    expect(realtime.publishLocalMessage).toHaveBeenCalledTimes(1);
  });
  it("redacts an unloaded recalled source on reconnect and rejects a stale quote replay", async () => {
    const reply: ChatMessageDto = { ...message, id: "reply", messageSeq: 100, content: "reply-body", replyToSeq: 1, reply: { messageSeq: 1, content: "unloaded-private-quote", deleted: false, senderId: "me", senderDisplayName: "Me", messageType: "TEXT", metadata: null } };
    api.messages.mockResolvedValue({ items: [reply], hasMore: false, nextCursor: null });
    api.messageStates.mockResolvedValue([{ ...reply, reply: { ...reply.reply, content: null, metadata: null, deleted: true } }]);
    mount(surface); await screen.findByText("unloaded-private-quote");
    await act(async () => reconnects.forEach((listener) => listener()));
    await waitFor(() => expect(screen.queryByText("unloaded-private-quote")).not.toBeInTheDocument());
    await act(async () => listeners.forEach((listener) => listener({ type: "MESSAGE_CREATED", eventId: "old-quote", conversationId: "c", actorId: "me", recipientIds: ["me"], message: reply })));
    expect(screen.queryByText("unloaded-private-quote")).not.toBeInTheDocument();
    expect(screen.getByText("reply-body")).toBeInTheDocument();
  });
  it("closes an image viewer when its source is recalled", async () => {
    const image = { ...message, messageType: "IMAGE", content: null, metadata: { url: "https://example.com/private.jpg" } };
    api.messages.mockResolvedValue({ items: [image], hasMore: false, nextCursor: null });
    mount(surface); fireEvent.click(await screen.findByRole("button", { name: "Mở ảnh 1 / 1" }));
    expect(screen.getByRole("dialog", { name: "Xem ảnh" })).toBeInTheDocument();
    await act(async () => listeners.forEach((listener) => listener({ type: "MESSAGE_DELETED", eventId: "recalled-image", conversationId: "c", actorId: "me", recipientIds: ["me"], message: { ...image, deleted: true, metadata: null } })));
    expect(screen.queryByRole("dialog", { name: "Xem ảnh" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Mở ảnh 1 / 1" })).not.toBeInTheDocument();
  });
  it("clears inaccessible media/history after removal and does not restore it on a failed rejoin load", async () => {
    const image = { ...message, messageType: "IMAGE", content: null, metadata: { url: "https://example.com/private.jpg" } };
    api.messages.mockResolvedValue({ items: [image], hasMore: false, nextCursor: null });
    mount(surface); fireEvent.click(await screen.findByRole("button", { name: "Mở ảnh 1 / 1" }));
    await act(async () => listeners.forEach((listener) => listener({ type: "MEMBER_REMOVED", eventId: "removed", conversationId: "c", actorId: "admin", targetUserId: "me", recipientIds: ["me"] })));
    expect(screen.queryByRole("dialog", { name: "Xem ảnh" })).not.toBeInTheDocument();
    api.messages.mockRejectedValue(new Error("offline"));
    await act(async () => listeners.forEach((listener) => listener({ type: "MEMBER_ADDED", eventId: "rejoined", conversationId: "c", actorId: "admin", targetUserId: "me", recipientIds: ["me"] })));
    if (surface === "mini") fireEvent.click(await screen.findByText("An"));
    await waitFor(() => expect(screen.queryByRole("button", { name: "Mở ảnh 1 / 1" })).not.toBeInTheDocument());
    expect(screen.queryByRole("dialog", { name: "Xem ảnh" })).not.toBeInTheDocument();
  });
  it("pins and unpins through the shared menu with confirmed collection results", async () => {
    api.pin.mockResolvedValue({ version: 1, canManage: true, items: [{ message, pinnedBy: "me", pinnedAt: "2026-10-06T08:00:00Z" }] });
    api.unpin.mockResolvedValue({ version: 2, canManage: true, items: [] });
    mount(surface); await screen.findByText("secret-message");
    fireEvent.click(screen.getByRole("button", { name: "Thao tác khác" })); fireEvent.click(screen.getByRole("menuitem", { name: "Ghim" }));
    expect(await screen.findByRole("button", { name: "1 tin nhắn đã ghim" })).toBeInTheDocument();
    expect(api.pin).toHaveBeenCalledWith("c", "me", "m");
    fireEvent.click(screen.getByRole("button", { name: "Thao tác khác" })); fireEvent.click(screen.getByRole("menuitem", { name: "Bỏ ghim" }));
    await waitFor(() => expect(screen.queryByRole("button", { name: "1 tin nhắn đã ghim" })).not.toBeInTheDocument());
    expect(api.unpin).toHaveBeenCalledWith("c", "me", "m");
  });
  it("respects server pin permissions and applies collection changes without new-message cursors", async () => {
    api.pins.mockResolvedValue({ version: 1, canManage: false, items: [{ message, pinnedBy: "admin", pinnedAt: "2026-10-06T08:00:00Z" }] });
    mount(surface); fireEvent.click(await screen.findByRole("button", { name: "1 tin nhắn đã ghim" }));
    expect(screen.queryByRole("button", { name: "Bỏ ghim secret-message" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Thao tác khác" }));
    expect(screen.queryByRole("menuitem", { name: "Bỏ ghim" })).not.toBeInTheDocument();
    const delivered = realtime.acknowledgeDelivered.mock.calls.length, read = realtime.acknowledgeRead.mock.calls.length;
    api.pins.mockResolvedValue({ version: 2, canManage: false, items: [] });
    await act(async () => listeners.forEach((listener) => listener({ type: "PINS_CHANGED", eventId: "unpin", conversationId: "c", actorId: "admin", recipientIds: ["me"], pinVersion: 2 })));
    await waitFor(() => expect(screen.queryByRole("button", { name: "1 tin nhắn đã ghim" })).not.toBeInTheDocument());
    expect(realtime.acknowledgeDelivered).toHaveBeenCalledTimes(delivered); expect(realtime.acknowledgeRead).toHaveBeenCalledTimes(read);
  });
  it("recalls for the sender and redacts reply quotes without clearing the composer", async () => {
    const reply: ChatMessageDto = { ...message, id: "reply", messageSeq: 6, content: "reply-body", replyToSeq: 5, reply: { messageSeq: 5, content: "quoted-secret", metadata: null, messageType: "TEXT", senderId: "me", senderDisplayName: "Me", deleted: false } };
    api.messages.mockResolvedValue({ items: [message, reply], hasMore: false, nextCursor: null });
    mount(surface); await screen.findByText("quoted-secret");
    fireEvent.change(screen.getByRole("textbox", { name: "Nội dung tin nhắn" }), { target: { value: "keep draft" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Thao tác khác" })[0]);
    fireEvent.click(screen.getByRole("menuitem", { name: "Thu hồi" }));
    await waitFor(() => expect(api.recall).toHaveBeenCalledWith("c", "me", "m"));
    await waitFor(() => expect(screen.queryByText("quoted-secret")).not.toBeInTheDocument());
    expect(screen.getAllByText("Tin nhắn đã được thu hồi").length).toBeGreaterThan(0);
    expect(screen.getByRole("textbox", { name: "Nội dung tin nhắn" })).toHaveValue("keep draft");
    expect(screen.getByText("reply-body")).toBeInTheDocument();
  });
  it("applies peer recall and ignores an old creation replay or reconnect page", async () => {
    const peer = { ...message, senderId: "other" }; api.messages.mockResolvedValue({ items: [peer], hasMore: false, nextCursor: null });
    mount(surface); await screen.findByText("secret-message");
    const beforeDelivered = realtime.acknowledgeDelivered.mock.calls.length, beforeRead = realtime.acknowledgeRead.mock.calls.length;
    await act(async () => listeners.forEach((listener) => listener({ type: "MESSAGE_DELETED", eventId: "delete", conversationId: "c", actorId: "other", recipientIds: ["me"], message: { ...peer, deleted: true } })));
    expect(screen.getAllByText("Tin nhắn đã được thu hồi").length).toBeGreaterThan(0);
    expect(realtime.acknowledgeDelivered).toHaveBeenCalledTimes(beforeDelivered);
    expect(realtime.acknowledgeRead).toHaveBeenCalledTimes(beforeRead);
    await act(async () => listeners.forEach((listener) => listener({ type: "MESSAGE_CREATED", eventId: "stale", conversationId: "c", actorId: "other", recipientIds: ["me"], message: peer })));
    expect(screen.queryByText("secret-message")).not.toBeInTheDocument();
    await act(async () => reconnects.forEach((listener) => listener()));
    expect(api.messageStates).toHaveBeenCalledWith("c", "me", ["m"]);
    expect(screen.queryByText("secret-message")).not.toBeInTheDocument();
  });
  it("shows pins outside the loaded page with original time and focuses existing history", async () => {
    const old = { ...message, id: "old", messageSeq: 1, content: "old-pinned", createdAt: "2026-01-01T08:00:00Z" };
    api.pins.mockResolvedValue({ version: 1, canManage: true, items: [{ message: old, pinnedBy: "me", pinnedAt: "2026-10-06T08:00:00Z" }] });
    api.messages.mockImplementation((_c, _u, _limit, before) => Promise.resolve({ items: before ? [old] : [message], hasMore: !before, nextCursor: null }));
    mount(surface); fireEvent.click(await screen.findByRole("button", { name: "1 tin nhắn đã ghim" }));
    const panel = screen.getByRole("region", { name: "Tin nhắn đã ghim" });
    expect(panel.querySelector("time")).toHaveAttribute("datetime", old.createdAt);
    fireEvent.click(within(panel).getByText("old-pinned"));
    await waitFor(() => expect(api.messages).toHaveBeenCalledWith("c", "me", 100, 5));
    expect(await screen.findByText("old-pinned")).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Tin nhắn đã ghim" })).not.toBeInTheDocument();
  });
  it("shows failed unpin feedback even when the pinned message is outside history", async () => {
    const old = { ...message, id: "old", messageSeq: 1, content: "old-pinned" };
    api.pins.mockResolvedValue({ version: 1, canManage: true, items: [{ message: old, pinnedBy: "me", pinnedAt: "2026-10-06T08:00:00Z" }] });
    api.unpin.mockRejectedValue(new Error("offline"));
    mount(surface); fireEvent.click(await screen.findByRole("button", { name: "1 tin nhắn đã ghim" }));
    fireEvent.click(screen.getByRole("button", { name: "Bỏ ghim old-pinned" }));
    const panel = screen.getByRole("region", { name: "Tin nhắn đã ghim" });
    expect(await within(panel).findByRole("alert")).toHaveTextContent("Không thể cập nhật tin ghim");
    api.unpin.mockResolvedValue({ version: 2, canManage: true, items: [] });
    fireEvent.click(screen.getByRole("button", { name: "Bỏ ghim old-pinned" }));
    await waitFor(() => expect(screen.queryByRole("button", { name: "1 tin nhắn đã ghim" })).not.toBeInTheDocument());
  });
  it("forwards to selected DIRECT recipients and retries only failures", async () => {
    api.suggestions.mockResolvedValue([{ id: "a", username: "An" }, { id: "b", username: "Bình" }]);
    api.direct.mockImplementation((_actor, user) => Promise.resolve({ id: `direct-${user}` }));
    api.forward.mockResolvedValueOnce({ ...message, id: "a-m", conversationId: "direct-a", forwarded: true }).mockRejectedValueOnce(new Error("offline"));
    mount(surface); await screen.findByText("secret-message");
    fireEvent.click(screen.getByRole("button", { name: "Thao tác khác" })); fireEvent.click(screen.getByRole("menuitem", { name: "Chuyển tiếp" }));
    const dialog = screen.getByRole("dialog", { name: "Chuyển tiếp tin nhắn" });
    fireEvent.click(await within(dialog).findByText("@An"));
    fireEvent.click(within(dialog).getByText("@Bình"));
    fireEvent.click(within(dialog).getByRole("button", { name: "Gửi" }));
    await within(dialog).findByText("Gửi thất bại"); const retryBody = api.forward.mock.calls[1][2];
    api.forward.mockResolvedValueOnce({ ...message, id: "b-m", conversationId: "direct-b", forwarded: true });
    fireEvent.click(within(dialog).getByRole("button", { name: "Thử gửi lại" }));
    await waitFor(() => expect(api.forward).toHaveBeenCalledTimes(3));
    expect(api.forward.mock.calls[2]).toEqual(["direct-b", "me", retryBody]); expect(api.group).not.toHaveBeenCalled();
    expect(api.direct).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Chuyển tiếp tin nhắn" })).not.toBeInTheDocument());
  });
  it.each(["IMAGE", "AUDIO"])("forwards %s using source identity while preserving the composer and conversation", async (messageType) => {
    const media = { ...message, messageType, content: null, metadata: { url: "https://example.com/source-media", duration: 10 } };
    api.messages.mockResolvedValue({ items: [media], hasMore: false, nextCursor: null });
    api.suggestions.mockResolvedValue([{ id: "a", username: "Alice" }]);
    api.direct.mockResolvedValue({ id: "direct-a" });
    api.forward.mockResolvedValue({ ...media, id: "copy", conversationId: "direct-a", forwarded: true });
    mount(surface); fireEvent.click(await screen.findByRole("button", { name: "Thao tác khác" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Nội dung tin nhắn" }), { target: { value: "keep draft" } });
    fireEvent.click(screen.getByRole("menuitem", { name: "Chuyển tiếp" }));
    const dialog = screen.getByRole("dialog", { name: "Chuyển tiếp tin nhắn" });
    fireEvent.click(await within(dialog).findByText("@Alice")); fireEvent.click(within(dialog).getByRole("button", { name: "Gửi" }));
    await waitFor(() => expect(api.forward).toHaveBeenCalledWith("direct-a", "me", { sourceConversationId: "c", sourceMessageId: "m", clientMessageId: expect.any(String) }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Chuyển tiếp tin nhắn" })).not.toBeInTheDocument());
    expect(screen.getByRole("textbox", { name: "Nội dung tin nhắn" })).toHaveValue("keep draft");
    expect(screen.getByRole("button", { name: "Thao tác khác" })).toBeInTheDocument();
    expect(api.messages.mock.calls.every((call) => call[0] === "c")).toBe(true);
    expect(api.group).not.toHaveBeenCalled();
  });
});
