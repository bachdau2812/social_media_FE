import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChatMessageDto, ConversationDto } from "../model/chat.dto";
import type { ReactionState, ReactionType } from "../model/chatReactions";
import type { ChatRealtimeEvent } from "../services/chatRealtime";
import { ChatScreen } from "../screens/ChatScreen";
import { FloatingMessenger } from "./FloatingMessenger";

const listeners = vi.hoisted(() => new Set<(event: ChatRealtimeEvent) => void>());
const reconnects = vi.hoisted(() => new Set<() => void>());
const api = vi.hoisted(() => ({ pins: vi.fn(), messageStates: vi.fn(), conversations: vi.fn(), messages: vi.fn(), setReaction: vi.fn(), removeReaction: vi.fn(), reactionStates: vi.fn(), reactors: vi.fn() }));
const realtime = vi.hoisted(() => ({
  subscribe: vi.fn((_user: string, listener: (event: ChatRealtimeEvent) => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; }),
  subscribeReconnect: vi.fn((listener: () => void) => { reconnects.add(listener); return () => { reconnects.delete(listener); }; }),
  rememberRecipientCursor: vi.fn(), acknowledgeDelivered: vi.fn(), acknowledgeRead: vi.fn(), outgoingStatus: vi.fn(() => "sent"),
}));
vi.mock("../api/chat.api", () => ({ chatApi: api }));
vi.mock("../services/chatRealtime", () => ({ chatRealtime: realtime }));
vi.mock("../hooks/useChatMediaComposer", () => ({ useChatMediaComposer: () => ({ images: [], audioAttachment: null, recording: false, recordingElapsed: 0, error: "" }) }));

const conversation: ConversationDto = {
  id: "c", type: "DIRECT", title: "An", isDissolved: false, avatarUrl: null,
  lastMessageId: "m", lastMessageSeq: 1, lastMessageAt: null, lastMessageSenderId: "me", lastMessageType: "TEXT", lastMessagePreview: "Hello",
  currentUserRole: "USER", unreadCount: 4, recipientDeliveredSeq: 0, recipientReadSeq: 0, createdAt: null,
};
const message: ChatMessageDto = {
  id: "m", conversationId: "c", messageSeq: 1, clientMessageId: null, senderId: "me", senderDisplayName: "Me", senderAvatarUrl: null,
  messageType: "TEXT", content: "Hello", metadata: null, reply: null, replyToSeq: null, createdAt: "2026-10-06T08:00:00Z", editedAt: null, deleted: false,
  reactionVersion: 0, reactions: [], myReaction: null, likeCount: 0, isReact: false,
};
const state = (reaction: ReactionType | null, version = 1, actorId = "me"): ReactionState => ({
  messageId: "m", messageSeq: 1, reactionVersion: version, actorId, reaction,
  likeCount: reaction === "HEART" ? 1 : 0, reactions: reaction ? [{ type: reaction, count: 1 }] : [],
});

beforeEach(() => {
  vi.clearAllMocks();
  Object.values(api).forEach((method) => method.mockReset());
  listeners.clear(); reconnects.clear();
  api.pins.mockResolvedValue({ version: 0, canManage: false, items: [] });
  api.messageStates.mockResolvedValue([]);
  api.conversations.mockResolvedValue({ items: [conversation], hasMore: false, nextCursor: null });
  api.messages.mockResolvedValue({ items: [message], hasMore: false, nextCursor: null });
  api.setReaction.mockImplementation((_c, _u, _m, reaction: ReactionType) => Promise.resolve(state(reaction)));
  api.removeReaction.mockResolvedValue(state(null, 3));
  api.reactionStates.mockResolvedValue([{ ...message, messageId: "m", reactionVersion: 5, myReaction: "SAD", reactions: [{ type: "SAD", count: 2 }] }]);
});
afterEach(async () => { cleanup(); await Promise.resolve(); });

function mount(surface: "full" | "mini") {
  return surface === "full"
    ? render(<ChatScreen userId="me" username="me" initialTarget={{ conversationId: "c" }} onOpenProfile={vi.fn()} onOpenStory={vi.fn()} />)
    : render(<FloatingMessenger userId="me" openConversationRequest={{ conversationId: "c", nonce: 1 }} onOpenFullChat={vi.fn()} onOpenStory={vi.fn()} />);
}

describe.each(["full", "mini"] as const)("%s chat reaction parity", (surface) => {
  it("uses the shared set/change/remove flow outside the bubble without changing unread/cursors", async () => {
    const { container } = mount(surface);
    const choose = await screen.findByRole("button", { name: "Chọn cảm xúc" });
    expect(choose.closest(".dm-bubble,.floating-bubble")).toBeNull();
    expect(choose.closest(".dm-message-actions")).not.toBeNull();
    fireEvent.click(choose);
    fireEvent.click(within(screen.getByRole("group", { name: "Cảm xúc tin nhắn" })).getByRole("button", { name: "Yêu thích" }));
    await waitFor(() => expect(api.setReaction).toHaveBeenCalledWith("c", "me", "m", "HEART"));
    await waitFor(() => expect(choose).not.toBeDisabled());
    const count = screen.getByRole("button", { name: "Xem 1 cảm xúc" });
    expect(count.closest(".chat-message-stack")).not.toBeNull();
    expect(count.closest(".dm-message-actions")).toBeNull();
    api.setReaction.mockResolvedValueOnce(state("HAHA", 2));
    fireEvent.click(choose);
    fireEvent.click(within(screen.getByRole("group", { name: "Cảm xúc tin nhắn" })).getByRole("button", { name: "Haha" }));
    await waitFor(() => expect(choose).toHaveTextContent("😂"));
    await waitFor(() => expect(choose).not.toBeDisabled());
    fireEvent.click(choose);
    fireEvent.click(within(screen.getByRole("group", { name: "Cảm xúc tin nhắn" })).getByRole("button", { name: "Haha" }));
    await waitFor(() => expect(api.removeReaction).toHaveBeenCalledWith("c", "me", "m"));
    await waitFor(() => expect(screen.queryByRole("button", { name: "Xem 1 cảm xúc" })).not.toBeInTheDocument());
    expect(realtime.acknowledgeRead).not.toHaveBeenCalled();
    expect(realtime.acknowledgeDelivered).not.toHaveBeenCalled();
    if (surface === "full") expect(container.querySelector(".dm-thread-list em")).toHaveTextContent("4");
  });

  it("receives shared realtime and reconnect snapshots for an old message", async () => {
    mount(surface);
    const choose = await screen.findByRole("button", { name: "Chọn cảm xúc" });
    await act(async () => listeners.forEach((listener) => listener({ type: "MESSAGE_REACTION_CHANGED", eventId: "e", conversationId: "c", actorId: "other", recipientIds: ["me"], reactionState: state("WOW", 2, "other") })));
    expect(screen.getByRole("button", { name: "Xem 1 cảm xúc" })).toBeInTheDocument();
    expect(choose).not.toHaveTextContent("😮");
    await act(async () => reconnects.forEach((listener) => listener()));
    await waitFor(() => expect(api.reactionStates).toHaveBeenCalledWith("c", "me", ["m"]));
    await waitFor(() => expect(choose).toHaveTextContent("😢"));
    expect(screen.getByRole("button", { name: "Xem 2 cảm xúc" })).toBeInTheDocument();
  });

  it("recovers from a failed optimistic mutation while preserving the composer draft", async () => {
    api.setReaction.mockRejectedValueOnce(new Error("offline"));
    mount(surface);
    const choose = await screen.findByRole("button", { name: "Chọn cảm xúc" });
    const draft = screen.getByRole("textbox", { name: "Nội dung tin nhắn" });
    fireEvent.change(draft, { target: { value: "draft stays" } });
    fireEvent.click(choose);
    fireEvent.click(within(screen.getByRole("group", { name: "Cảm xúc tin nhắn" })).getByRole("button", { name: "Phẫn nộ" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Không thể cập nhật cảm xúc");
    expect(choose).not.toHaveTextContent("😡");
    expect(draft).toHaveValue("draft stays");
  });
});
