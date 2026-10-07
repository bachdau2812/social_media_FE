import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "../../../shared/api";
import type { ChatMessageDto, ConversationDto, CursorPageDto } from "../model/chat.dto";
import type { ChatRealtimeEvent } from "../services/chatRealtime";
import { chatSendJobs } from "../services/chatSendJobs";
import type { ChatImageDraft } from "./useChatMediaComposer";
import { useChatController } from "./useChatController";

const uploadCloudinaryMedia = vi.hoisted(() => vi.fn());
const chatApi = vi.hoisted(() => ({
  pins: vi.fn().mockResolvedValue({ version: 0, canManage: false, items: [] }),
  messageStates: vi.fn(),
  conversations: vi.fn(),
  conversation: vi.fn(),
  messages: vi.fn(),
  messagesAfter: vi.fn(),
  details: vi.fn(),
  send: vi.fn(),
}));

const chatRealtime = vi.hoisted(() => ({
  rememberRecipientCursor: vi.fn(),
  rememberMemberCursor: vi.fn(),
  clearRecipientMemberCursors: vi.fn(),
  recipientCursor: vi.fn(() => ({ deliveredSeq: 0, readSeq: 0 })),
  subscribe: vi.fn<(userId: string, listener: (event: ChatRealtimeEvent) => void) => () => void>(() => vi.fn()),
  subscribeReconnect: vi.fn<(listener: () => void) => () => void>(() => vi.fn()),
  acknowledgeDelivered: vi.fn(),
  acknowledgeRead: vi.fn(),
  outgoingStatus: vi.fn(() => "sent"),
  publishLocalMessage: vi.fn(),
}));

const mediaComposer = vi.hoisted(() => ({
  images: [] as ChatImageDraft[],
  audioAttachment: null as import("./useChatMediaComposer").ChatAudioDraft | null,
  recording: false,
  recordingElapsed: 0,
  error: "",
  removeImage: vi.fn<(id: string) => void>(),
  updateImageState: vi.fn(),
  clearImages: vi.fn(),
  clearAudio: vi.fn(),
}));

vi.mock("../api/chat.api", () => ({ chatApi }));
vi.mock("../services/chatRealtime", () => ({ chatRealtime }));
vi.mock("./useChatMediaComposer", () => ({ useChatMediaComposer: () => mediaComposer }));
vi.mock("../../../shared/api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../../shared/api")>()),
  uploadCloudinaryMedia,
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function thread(id: string): ConversationDto {
  return {
    id,
    type: "DIRECT",
    isDissolved: false,
    title: id,
    avatarUrl: null,
    lastMessageSeq: 0,
    lastMessageId: null,
    lastMessageAt: null,
    lastMessageSenderId: null,
    lastMessageType: null,
    lastMessagePreview: null,
    currentUserRole: "USER",
    unreadCount: 0,
    recipientDeliveredSeq: 0,
    recipientReadSeq: 0,
    createdAt: null,
  };
}

function messagePage(conversationId: string): CursorPageDto<ChatMessageDto> {
  return {
    nextCursor: null,
    hasMore: false,
    items: [{
      id: `message-${conversationId}`,
      conversationId,
      messageSeq: 1,
      clientMessageId: null,
      senderId: "other",
      senderDisplayName: "Other",
      senderAvatarUrl: null,
      messageType: "TEXT",
      content: conversationId,
      metadata: null,
      replyToSeq: null,
      reply: null,
      createdAt: "2026-07-30T10:00:00Z",
      editedAt: null,
      deleted: false,
    }],
  };
}

beforeEach(() => {
  chatSendJobs.clear();
  chatApi.conversations.mockReset();
  chatApi.conversation.mockReset();
  chatApi.messages.mockReset();
  chatApi.messagesAfter.mockReset();
  chatApi.details.mockReset();
  chatApi.send.mockReset();
  chatApi.messageStates.mockReset();
  chatRealtime.publishLocalMessage.mockClear();
  chatRealtime.acknowledgeDelivered.mockClear();
  chatRealtime.acknowledgeRead.mockClear();
  chatRealtime.subscribe.mockClear();
  chatRealtime.subscribeReconnect.mockClear();
  uploadCloudinaryMedia.mockReset();
  mediaComposer.images = [];
  mediaComposer.audioAttachment = null;
  mediaComposer.error = "";
  mediaComposer.removeImage.mockReset().mockImplementation((id) => {
    mediaComposer.images = mediaComposer.images.filter((image) => image.id !== id);
  });
  mediaComposer.updateImageState.mockReset();
  mediaComposer.clearImages.mockReset().mockImplementation(() => {
    mediaComposer.images = [];
    mediaComposer.error = "";
  });
  mediaComposer.clearAudio.mockReset().mockImplementation(() => {
    mediaComposer.audioAttachment = null;
  });
});

afterEach(async () => { cleanup(); await Promise.resolve(); sessionStorage.clear(); });

describe("useChatController message requests", () => {
  function emit(event: ChatRealtimeEvent) {
    const calls = chatRealtime.subscribe.mock.calls;
    act(() => calls[calls.length - 1]?.[1](event));
  }
  function membership(type: "MEMBER_REMOVED" | "MEMBER_ADDED", conversationId = "a"): ChatRealtimeEvent {
    return { type, eventId: type, conversationId, actorId: "admin", targetUserId: "viewer-1", recipientIds: ["viewer-1"] };
  }
  it("loads the next inbox cursor while retaining conversations already loaded", async () => {
    chatApi.conversations
      .mockResolvedValueOnce({ items: [thread("first")], hasMore: true, nextCursor: "inbox-next" })
      .mockResolvedValueOnce({ items: [thread("second")], hasMore: false, nextCursor: null });
    const { result } = renderHook(() => useChatController("viewer-1", null));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    expect(result.current.hasMoreThreads).toBe(true);

    await act(async () => result.current.loadMoreThreads());

    expect(chatApi.conversations.mock.calls[1].slice(0, 3)).toEqual(["viewer-1", "inbox-next", 100]);
    expect(result.current.threads.map((item) => item.id)).toEqual(["first", "second"]);
    expect(result.current.hasMoreThreads).toBe(false);
  });
  it("purges removed history and ignores creations until a fresh rejoined snapshot arrives", async () => {
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValue(messagePage("a"));
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.activeMessages).toHaveLength(1));
    emit(membership("MEMBER_REMOVED"));
    emit({ type: "MESSAGE_CREATED", eventId: "late", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...messagePage("a").items[0], clientMessageId: undefined, id: "inaccessible", messageSeq: 2 } });
    const fresh = deferred<CursorPageDto<ChatMessageDto>>();
    chatApi.messages.mockReturnValue(fresh.promise);
    emit(membership("MEMBER_ADDED"));
    await waitFor(() => expect(result.current.threads).toHaveLength(1));
    act(() => result.current.openConversation("a"));
    await waitFor(() => expect(result.current.messageState).toBe("loading"));
    expect(result.current.activeMessages).toEqual([]);
    await act(async () => fresh.resolve({ items: [], hasMore: false, nextCursor: null }));
    expect(result.current.activeMessages).toEqual([]);
  });
  it.each(["older", "focus"] as const)("ignores a late %s page after removal and re-addition", async (kind) => {
    const initial = messagePage("a"); initial.hasMore = true; initial.items[0].messageSeq = 10;
    const oldPage = deferred<CursorPageDto<ChatMessageDto>>();
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValueOnce(initial).mockReturnValueOnce(oldPage.promise).mockResolvedValue({ items: [], hasMore: false, nextCursor: null });
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    let pending!: Promise<void>;
    act(() => { pending = kind === "older" ? result.current.loadOlder() : result.current.focusMessage(1); });
    emit(membership("MEMBER_REMOVED")); emit(membership("MEMBER_ADDED"));
    await waitFor(() => expect(result.current.threads).toHaveLength(1));
    act(() => result.current.openConversation("a"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    await act(async () => { oldPage.resolve(messagePage("a")); await pending; });
    expect(result.current.activeMessages).toEqual([]);
    expect(result.current.highlightedSeq).toBeNull();
    expect(result.current.hasMore).toBe(false);
  });
  it("rejects a thread-list snapshot requested before membership removal", async () => {
    const pending = deferred<CursorPageDto<ConversationDto>>();
    chatApi.conversations.mockResolvedValueOnce({ items: [thread("a")] }).mockReturnValue(pending.promise);
    const { result } = renderHook(() => useChatController("viewer-1", null));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    let request!: Promise<void>;
    act(() => { request = result.current.loadThreads(); });
    emit(membership("MEMBER_REMOVED"));
    await act(async () => { pending.resolve({ items: [thread("a")], hasMore: false, nextCursor: null }); await request; });
    expect(result.current.threads).toEqual([]);
  });
  it.each(["older", "focus"] as const)("ignores a late %s request rejection after membership removal", async (kind) => {
    const initial = messagePage("a"); initial.hasMore = true; initial.items[0].messageSeq = 10;
    const page = deferred<CursorPageDto<ChatMessageDto>>();
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValueOnce(initial).mockReturnValueOnce(page.promise);
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    let outcome!: Promise<string>;
    act(() => { outcome = (kind === "older" ? result.current.loadOlder() : result.current.focusMessage(1)).then(() => "ignored", () => "rejected"); });
    emit(membership("MEMBER_REMOVED"));
    let status!: string;
    await act(async () => { page.reject(new Error("late membership failure")); status = await outcome; });
    expect(status).toBe("ignored");
    expect(result.current.loadingOlder).toBe(false);
  });
  it("keeps a newly created summary when an earlier thread request finishes afterward", async () => {
    const original = { ...thread("a"), lastMessageSeq: 10, lastMessageId: "previous", lastMessagePreview: "previous body", unreadCount: 4 };
    const page = deferred<CursorPageDto<ConversationDto>>();
    chatApi.conversations.mockResolvedValueOnce({ items: [original] }).mockReturnValueOnce(page.promise);
    const { result } = renderHook(() => useChatController("viewer-1", null));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    let request!: Promise<void>;
    act(() => { request = result.current.loadThreads(); });
    emit({ type: "MESSAGE_CREATED", eventId: "new", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...messagePage("a").items[0], clientMessageId: undefined, id: "latest", messageSeq: 11, content: "latest body" } });
    await act(async () => { page.resolve({ items: [original], hasMore: false, nextCursor: null }); await request; });
    expect(result.current.threads[0]).toMatchObject({ lastMessageId: "latest", lastMessageSeq: 11, preview: "latest body", unreadCount: 5 });
  });
  it("retains a creation accepted while a stale history snapshot was in flight", async () => {
    const page = deferred<CursorPageDto<ChatMessageDto>>();
    const initial = messagePage("a"); initial.items[0].messageSeq = 5;
    chatApi.conversations.mockResolvedValue({ items: [{ ...thread("a"), lastMessageSeq: 5 }] });
    chatApi.messages.mockReturnValue(page.promise);
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    emit({ type: "MESSAGE_CREATED", eventId: "new", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...initial.items[0], clientMessageId: undefined, id: "new", messageSeq: 6 } });
    await act(async () => page.resolve(initial));
    expect(result.current.activeMessages.map((item) => item.messageSeq)).toEqual([5, 6]);
  });
  it("fills an out-of-order gap before advancing the visible read cursor", async () => {
    const initial = messagePage("a"); initial.items[0].messageSeq = 5;
    chatApi.conversations.mockResolvedValue({ items: [{ ...thread("a"), lastMessageSeq: 5 }] });
    chatApi.messages.mockResolvedValue(initial);
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setFocused(true));
    emit({ type: "MESSAGE_CREATED", eventId: "seven", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...initial.items[0], clientMessageId: undefined, id: "seven", messageSeq: 7, content: "newest" } });
    const before = result.current.threads;
    emit({ type: "MESSAGE_CREATED", eventId: "six", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...initial.items[0], clientMessageId: undefined, id: "six", messageSeq: 6, content: "middle" } });
    expect(result.current.activeMessages.map((item) => item.messageSeq)).toEqual([5, 6, 7]);
    expect(result.current.threads).toEqual(before);
    expect(chatRealtime.acknowledgeRead).toHaveBeenCalledWith("a", 7);
  });
  it("backfills a live message sequence gap before acknowledging delivery", async () => {
    const initial = messagePage("a"); initial.items[0].messageSeq = 5;
    const gap = deferred<CursorPageDto<ChatMessageDto>>();
    chatApi.conversations.mockResolvedValue({ items: [{ ...thread("a"), lastMessageSeq: 5 }] });
    chatApi.messages.mockResolvedValue(initial);
    chatApi.messagesAfter.mockReturnValue(gap.promise);
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));

    emit({ type: "MESSAGE_CREATED", eventId: "seven", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...initial.items[0], clientMessageId: undefined, id: "seven", messageSeq: 7, content: "seven" } });
    await waitFor(() => expect(chatApi.messagesAfter).toHaveBeenCalledWith("a", "viewer-1", 5, 100));
    expect(chatRealtime.acknowledgeDelivered).not.toHaveBeenCalledWith("a", 7);

    const missing: ChatMessageDto = { ...initial.items[0], id: "six", messageSeq: 6, content: "six" };
    await act(async () => gap.resolve({ items: [missing], hasMore: false, nextCursor: null }));
    await waitFor(() => expect(result.current.activeMessages.map((message) => message.messageSeq)).toEqual([5, 6, 7]));
    await waitFor(() => expect(chatRealtime.acknowledgeDelivered).toHaveBeenCalledWith("a", 7));
  });
  it("reloads the active message snapshot after a WebSocket reconnect", async () => {
    const initial = messagePage("a"); initial.items[0].messageSeq = 5;
    const recovered = messagePage("a"); recovered.items[0].messageSeq = 7;
    chatApi.conversations.mockResolvedValue({ items: [{ ...thread("a"), lastMessageSeq: 7 }] });
    chatApi.messages.mockResolvedValueOnce(initial).mockResolvedValueOnce(recovered);
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));

    const reconnectCalls = chatRealtime.subscribeReconnect.mock.calls;
    const reconnect = reconnectCalls[reconnectCalls.length - 1]?.[0];
    expect(reconnect).toBeDefined();
    await act(async () => reconnect?.());

    await waitFor(() => expect(chatApi.messages).toHaveBeenCalledTimes(2));
    expect(result.current.activeMessages[0].messageSeq).toBe(7);
  });
  it("does not insert pre-rejoin creation replays below the fresh server snapshot boundary", async () => {
    chatApi.conversations.mockResolvedValue({ items: [{ ...thread("a"), lastMessageSeq: 10 }] });
    chatApi.messages.mockResolvedValue({ items: [], hasMore: false });
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    emit(membership("MEMBER_REMOVED")); emit(membership("MEMBER_ADDED"));
    await waitFor(() => expect(result.current.threads).toHaveLength(1));
    act(() => result.current.openConversation("a"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    emit({ type: "MESSAGE_CREATED", eventId: "old", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...messagePage("a").items[0], clientMessageId: undefined, messageSeq: 2 } });
    expect(result.current.activeMessages).toEqual([]);
  });
  it("refreshes an inactive recalled preview on reconnect while retaining active selection", async () => {
    const hidden = { ...thread("hidden"), lastMessageSeq: 5, lastMessageId: "private", lastMessagePreview: "private preview", unreadCount: 3 };
    chatApi.conversations.mockResolvedValueOnce({ items: [thread("a"), hidden] }).mockResolvedValueOnce({ items: [thread("a"), { ...hidden, lastMessagePreview: "Recalled" }] });
    chatApi.messages.mockResolvedValue(messagePage("a"));
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    const listeners = chatRealtime.subscribeReconnect.mock.calls;
    act(() => listeners.forEach(([listener]) => listener()));
    await waitFor(() => expect(result.current.threads.find((item) => item.id === "hidden")?.preview).toBe("Recalled"));
    expect(result.current.activeId).toBe("a");
    expect(result.current.unread).toBe(3);
  });
  it("rejects a late conversation lookup across removal and re-addition", async () => {
    const lookup = deferred<ConversationDto>();
    const rejoined = deferred<CursorPageDto<ConversationDto>>();
    chatApi.conversations.mockResolvedValueOnce({ items: [] }).mockReturnValue(rejoined.promise);
    chatApi.conversation.mockReturnValue(lookup.promise);
    chatApi.messages.mockResolvedValue({ items: [], hasMore: false });
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(chatApi.conversation).toHaveBeenCalled());
    emit(membership("MEMBER_REMOVED")); emit(membership("MEMBER_ADDED"));
    await act(async () => lookup.resolve(thread("a")));
    expect(result.current.threads).toEqual([]);
    await act(async () => rejoined.resolve({ items: [], hasMore: false, nextCursor: null }));
  });
  it("drops recipients resolved under a removed membership before submitting a send", async () => {
    const details = deferred<{ members: { userId: string }[] }>();
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValue(messagePage("a"));
    chatApi.details.mockReturnValue(details.promise);
    chatApi.send.mockResolvedValue({ ...messagePage("a").items[0], senderId: "viewer-1" });
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setDraft("before removal"));
    let sending!: Promise<void>;
    act(() => { sending = result.current.send(); });
    emit(membership("MEMBER_REMOVED"));
    await act(async () => { details.resolve({ members: [{ userId: "other" }] }); await sending; });
    expect(chatApi.send).not.toHaveBeenCalled();
    expect(result.current.replyTo).toBeNull();
  });
  it("does not publish an old account's accepted send after its controller unmounts", async () => {
    const sent = deferred<ChatMessageDto>();
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValue(messagePage("a"));
    chatApi.details.mockResolvedValue({ members: [{ userId: "other" }] });
    chatApi.send.mockReturnValue(sent.promise);
    const { result, unmount } = renderHook(() => useChatController("old-user", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setDraft("old private draft"));
    let request!: Promise<void>;
    act(() => { request = result.current.send(); });
    await waitFor(() => expect(chatApi.send).toHaveBeenCalled());
    unmount();
    await act(async () => { sent.resolve({ ...messagePage("a").items[0], senderId: "old-user", content: "old private draft" }); await request; });
    expect(chatRealtime.publishLocalMessage).not.toHaveBeenCalled();
  });
  it("does not submit a send when its recipient lookup resolves after unmount", async () => {
    const details = deferred<{ members: { userId: string }[] }>();
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValue(messagePage("a"));
    chatApi.details.mockReturnValue(details.promise);
    const { result, unmount } = renderHook(() => useChatController("old-user", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setDraft("old private draft"));
    let request!: Promise<void>;
    act(() => { request = result.current.send(); });
    unmount();
    await act(async () => { details.resolve({ members: [{ userId: "other" }] }); await request; });
    expect(chatApi.send).not.toHaveBeenCalled();
  });
  it("clears an old composer quote when reconnect learns recall only through a newer reply", async () => {
    const source = messagePage("a").items[0];
    const reply = { ...source, id: "reply", messageSeq: 100, content: "reply body", reply: { messageSeq: 1, senderId: "other", senderDisplayName: "Other", messageType: "TEXT" as const, content: "source quote", metadata: null, deleted: false } };
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValueOnce({ items: [source], hasMore: true }).mockResolvedValueOnce({ items: [reply], hasMore: true });
    chatApi.messageStates.mockResolvedValue([{ ...reply, reply: { ...reply.reply, deleted: true, content: null } }]);
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setReplyTo(result.current.activeMessages[0]));
    await act(async () => result.current.loadMessages("a"));
    expect(result.current.replyTo?.id).toBe(source.id);
    const reconnects = chatRealtime.subscribeReconnect.mock.calls;
    await act(async () => reconnects.forEach(([listener]) => listener()));
    await waitFor(() => expect(result.current.replyTo).toBeNull());
  });
  it("refetches recipients after membership re-addition rather than using the old member list", async () => {
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValue(messagePage("a"));
    chatApi.details.mockResolvedValueOnce({ members: [{ userId: "old-member" }] }).mockResolvedValueOnce({ members: [{ userId: "new-member" }] });
    chatApi.send.mockResolvedValue({ ...messagePage("a").items[0], id: "sent", messageSeq: 2, senderId: "viewer-1" });
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setDraft("first"));
    await act(async () => result.current.send());
    emit(membership("MEMBER_REMOVED")); emit(membership("MEMBER_ADDED"));
    await waitFor(() => expect(result.current.threads).toHaveLength(1));
    act(() => result.current.openConversation("a"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setDraft("second"));
    await act(async () => result.current.send());
    expect(chatApi.details).toHaveBeenCalledTimes(2);
    expect(chatApi.send.mock.calls[1][2].recipientId).toBe("new-member");
  });
  it("keeps unread, order and summary unchanged for an older recalled creation replay", async () => {
    const current = { ...thread("a"), lastMessageSeq: 10, lastMessageId: "latest", lastMessagePreview: "latest body", lastMessageAt: "2026-08-01T00:00:00Z", unreadCount: 4 };
    chatApi.conversations.mockResolvedValue({ items: [thread("b"), current] });
    const { result } = renderHook(() => useChatController("viewer-1", null));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    const before = result.current.threads;
    const recalled = { ...messagePage("a").items[0], clientMessageId: undefined, id: "old", messageSeq: 2, deleted: true, content: null };
    emit({ type: "MESSAGE_CREATED", eventId: "old-replay", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: recalled });
    expect(result.current.threads).toEqual(before);
    expect(result.current.unread).toBe(4);
  });
  it("refetches the server summary when a recalled creation's sequence was never observed", async () => {
    const recalled = { ...thread("a"), lastMessageSeq: 1, lastMessageId: "recalled", lastMessagePreview: "Recalled", unreadCount: 1 };
    chatApi.conversations.mockResolvedValueOnce({ items: [thread("a")] }).mockResolvedValueOnce({ items: [recalled] });
    const { result } = renderHook(() => useChatController("viewer-1", null));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    const delivered = chatRealtime.acknowledgeDelivered.mock.calls.length, read = chatRealtime.acknowledgeRead.mock.calls.length;
    emit({ type: "MESSAGE_DELETED", eventId: "recalled-creation", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...messagePage("a").items[0], clientMessageId: undefined, id: "recalled", deleted: true, content: null } });
    await waitFor(() => expect(result.current.threads[0]?.preview).toBe("Recalled"));
    expect(result.current.unread).toBe(1);
    expect(chatRealtime.acknowledgeDelivered).toHaveBeenCalledTimes(delivered);
    expect(chatRealtime.acknowledgeRead).toHaveBeenCalledTimes(read);
    emit({ type: "MESSAGE_DELETED", eventId: "known-recall", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...messagePage("a").items[0], clientMessageId: undefined, id: "recalled", deleted: true, content: null } });
    expect(chatApi.conversations).toHaveBeenCalledTimes(2);
  });
  it("counts one newly created message once when local/realtime duplicates share a batch", async () => {
    chatApi.conversations.mockResolvedValue({ items: [{ ...thread("a"), lastMessageSeq: 1, lastMessageId: "previous" }] });
    const { result } = renderHook(() => useChatController("viewer-1", null));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    const calls = chatRealtime.subscribe.mock.calls;
    const listener = calls[calls.length - 1][1];
    const event: ChatRealtimeEvent = { type: "MESSAGE_CREATED", eventId: "new", conversationId: "a", actorId: "other", recipientIds: ["viewer-1"], message: { ...messagePage("a").items[0], clientMessageId: undefined, id: "new", messageSeq: 2 } };
    act(() => { listener(event); listener(event); });
    expect(result.current.unread).toBe(1);
  });
  it("does not replace the viewer's reaction with a neutral MESSAGE_CREATED replay", async () => {
    const page = messagePage("a");
    page.items[0] = { ...page.items[0], reactionVersion: 5, myReaction: "HEART", isReact: true, likeCount: 1, reactions: [{ type: "HEART", count: 1 }] };
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValue(page);
    const { result } = renderHook(() => useChatController("replay-user", { conversationId: "a" }));
    await waitFor(() => expect(result.current.activeMessages[0]?.myReaction).toBe("HEART"));
    const calls = chatRealtime.subscribe.mock.calls;
    const listener = calls[calls.length - 1][1];
    act(() => listener({ type: "MESSAGE_CREATED", eventId: "replay", conversationId: "a", actorId: "other", recipientIds: ["replay-user"], message: { ...page.items[0], clientMessageId: undefined, myReaction: null, isReact: false } }));
    expect(result.current.activeMessages[0]?.myReaction).toBe("HEART");
  });
  it("does not hydrate a new account from a previous viewer's messages while its request is pending", async () => {
    const pending = deferred<CursorPageDto<ChatMessageDto>>();
    const old = messagePage("a");
    old.items[0] = { ...old.items[0], reactionVersion: 5, myReaction: "HEART", isReact: true, likeCount: 1, reactions: [{ type: "HEART", count: 1 }] };
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.conversation.mockResolvedValue(thread("a"));
    chatApi.messages.mockImplementation((_id, actorId) => actorId === "old-user" ? Promise.resolve(old) : pending.promise);
    const { result, rerender } = renderHook(({ userId }) => useChatController(userId, { conversationId: "a" }), { initialProps: { userId: "old-user" } });
    await waitFor(() => expect(result.current.activeMessages[0]?.myReaction).toBe("HEART"));
    rerender({ userId: "new-user" });
    expect(result.current.activeMessages).toEqual([]);
    await waitFor(() => expect(chatApi.messages).toHaveBeenCalledWith("a", "new-user", 80, undefined, expect.anything()));
    const fresh = messagePage("a");
    fresh.items[0] = { ...fresh.items[0], reactionVersion: 5, myReaction: null, isReact: false, likeCount: 1, reactions: [{ type: "HEART", count: 1 }] };
    await act(async () => pending.resolve(fresh));
    expect(result.current.activeMessages[0]?.myReaction).toBeNull();
    expect(result.current.activeMessages[0]?.isReact).toBe(false);
  });
  it("ignores a late focus page after the navigation target changes within the same conversation", async () => {
    const older = deferred<CursorPageDto<ChatMessageDto>>();
    const recent = messagePage("a");
    recent.items[0] = { ...recent.items[0], id: "recent", messageSeq: 50 };
    recent.hasMore = true;
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValueOnce(recent).mockReturnValueOnce(older.promise);
    const { result, rerender } = renderHook(({ messageId }) => useChatController("viewer-1", { conversationId: "a", messageId }), { initialProps: { messageId: "old" } });
    await waitFor(() => expect(chatApi.messages).toHaveBeenCalledTimes(2));
    rerender({ messageId: "recent" });
    await waitFor(() => expect(result.current.highlightedSeq).toBe(50));
    const oldPage = messagePage("a");
    oldPage.items[0] = { ...oldPage.items[0], id: "old", messageSeq: 1 };
    await act(async () => { older.resolve(oldPage); });
    expect(result.current.highlightedSeq).toBe(50);
  });
  it("can refocus a message after its route focus parameter is removed and restored", async () => {
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockResolvedValue(messagePage("a"));
    const { result, rerender } = renderHook(({ messageSeq }) => useChatController("viewer-1", { conversationId: "a", messageSeq }), { initialProps: { messageSeq: 1 as number | undefined } });
    await waitFor(() => expect(result.current.highlightedSeq).toBe(1));
    rerender({ messageSeq: undefined });
    await waitFor(() => expect(result.current.highlightedSeq).toBeNull());
    rerender({ messageSeq: 1 });
    await waitFor(() => expect(result.current.highlightedSeq).toBe(1));
  });
  it("resolves a directly requested conversation outside the inbox page", async () => {
    chatApi.conversations.mockResolvedValue({ items: [], hasMore: true });
    chatApi.conversation.mockResolvedValue(thread("older"));
    chatApi.messages.mockResolvedValue(messagePage("older"));
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "older" }));
    await waitFor(() => expect(result.current.active?.id).toBe("older"));
    expect(chatApi.conversation).toHaveBeenCalledWith("older", "viewer-1", expect.anything());
  });
  it("reports an unavailable conversation target and ignores a stale single-thread response", async () => {
    const pending = deferred<ConversationDto>();
    chatApi.conversations.mockResolvedValue({ items: [] });
    chatApi.conversation.mockImplementation((id: string) => id === "a" ? pending.promise : Promise.reject(new Error("Unavailable")));
    chatApi.messages.mockResolvedValue({ items: [], hasMore: false });
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a" }));
    await waitFor(() => expect(chatApi.conversation).toHaveBeenCalled());
    act(() => result.current.openConversation("missing"));
    await waitFor(() => expect(result.current.conversationState).toBe("error"));
    await act(async () => { pending.resolve(thread("a")); });
    expect(result.current.active).toBeNull();
    expect(result.current.conversationState).toBe("error");
  });
  it("focuses an ID-only navigation target after its conversation messages load", async () => {
    const pending = deferred<CursorPageDto<ChatMessageDto>>();
    chatApi.conversations.mockResolvedValue({ items: [thread("a")] });
    chatApi.messages.mockReturnValue(pending.promise);
    const { result } = renderHook(() => useChatController("viewer-1", { conversationId: "a", messageId: "message-a" }));
    await waitFor(() => expect(result.current.active?.id).toBe("a"));
    expect(result.current.highlightedSeq).toBeNull();
    await act(async () => { pending.resolve(messagePage("a")); });
    await waitFor(() => expect(result.current.highlightedSeq).toBe(1));
  });
  it("treats an explicit null target as the inbox instead of restoring a stored conversation", async () => {
    chatApi.conversations.mockResolvedValue({ items: [thread("stored")] });
    sessionStorage.setItem("social-media-full-chat-target", JSON.stringify({ conversationId: "stored" }));
    const { result } = renderHook(() => useChatController("viewer-1", null));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    expect(result.current.activeId).toBeNull();
    expect(chatApi.messages).not.toHaveBeenCalled();
  });
  it("aborts the previous conversation load and ignores its late failure", async () => {
    const first = deferred<CursorPageDto<ChatMessageDto>>();
    const second = deferred<CursorPageDto<ChatMessageDto>>();
    const signals: Array<AbortSignal | undefined> = [];
    chatApi.conversations.mockResolvedValue({ items: [thread("a"), thread("b")], nextCursor: null, hasMore: false });
    chatApi.messages
      .mockImplementationOnce((_id: string, _user: string, _limit: number, _before: undefined, signal?: AbortSignal) => {
        signals.push(signal);
        return first.promise;
      })
      .mockImplementationOnce((_id: string, _user: string, _limit: number, _before: undefined, signal?: AbortSignal) => {
        signals.push(signal);
        return second.promise;
      });
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));

    act(() => result.current.openConversation("a"));
    await waitFor(() => expect(chatApi.messages).toHaveBeenCalledTimes(1));
    act(() => result.current.openConversation("b"));
    await waitFor(() => expect(chatApi.messages).toHaveBeenCalledTimes(2));

    expect(signals[0]?.aborted).toBe(true);
    await act(async () => { second.resolve(messagePage("b")); await second.promise; });
    expect(result.current.messageState).toBe("ready");

    await act(async () => { first.reject(new Error("late failure")); await first.promise.catch(() => undefined); });
    expect(result.current.messageState).toBe("ready");
    expect(result.current.activeMessages.map((message) => message.conversationId)).toEqual(["b"]);
  });

  it("refetches a realtime Story reply so both Chat surfaces receive hydrated availability", async () => {
    const initial = messagePage("story-chat");
    const hydrated: CursorPageDto<ChatMessageDto> = {
      nextCursor: null,
      hasMore: false,
      items: [{
        ...initial.items[0],
        id: "story-message",
        messageType: "STORY_REPLY",
        content: "hello",
        storyContext: {
          storyId: "story-1",
          storyOwnerId: "owner-1",
          mediaType: "VIDEO",
          previewAtMs: 12400,
          expiresAt: "2026-08-01T00:00:00Z",
          available: true,
          previewUrl: "https://host/still.jpg",
        },
      }],
    };
    chatApi.conversations.mockResolvedValue({ items: [thread("story-chat")], nextCursor: null, hasMore: false });
    chatApi.messages.mockResolvedValueOnce(initial).mockResolvedValueOnce(hydrated);
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    act(() => result.current.openConversation("story-chat"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    const subscribeCalls = chatRealtime.subscribe.mock.calls;
    const listener = subscribeCalls[subscribeCalls.length - 1]?.[1];

    act(() => listener?.({
      type: "MESSAGE_CREATED",
      eventId: "event-1",
      conversationId: "story-chat",
      actorId: "other",
      recipientIds: ["viewer-1"],
      message: {
        id: "story-message",
        conversationId: "story-chat",
        messageSeq: 2,
        senderId: "other",
        messageType: "STORY_REPLY",
        content: "hello",
      },
    }));

    await waitFor(() => expect(chatApi.messages).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(result.current.activeMessages.find((message) => message.id === "story-message")?.storyContext?.previewUrl)
      .toBe("https://host/still.jpg"));
  });

  it("keeps a rejected audio send available for retry and reports the retryable error", async () => {
    chatApi.conversations.mockResolvedValue({ items: [thread("audio-chat")], nextCursor: null, hasMore: false });
    chatApi.messages.mockResolvedValue(messagePage("audio-chat"));
    chatApi.details.mockResolvedValue({ members: [{ userId: "viewer-1" }, { userId: "other" }] });
    uploadCloudinaryMedia.mockRejectedValue(new Error("upload failed"));
    mediaComposer.audioAttachment = {
      id: "audio-1",
      kind: "AUDIO",
      file: new File(["audio"], "voice.webm", { type: "audio/webm" }),
      previewUrl: "blob:audio-1",
      duration: 1200,
    };
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    act(() => result.current.openConversation("audio-chat"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));

    await act(async () => { await result.current.send(); });

    expect(mediaComposer.audioAttachment).not.toBeNull();
    expect(mediaComposer.clearAudio).not.toHaveBeenCalled();
    expect(result.current.sendError).toBe("Không thể gửi tin nhắn thoại. Bản ghi vẫn được giữ lại để bạn thử lại.");
  });

  it("clears the audio error and attachment after an explicit successful retry", async () => {
    const sent: ChatMessageDto = {
      id: "audio-message",
      conversationId: "audio-chat",
      messageSeq: 2,
      clientMessageId: null,
      senderId: "viewer-1",
      senderDisplayName: "Viewer",
      senderAvatarUrl: null,
      messageType: "AUDIO",
      content: null,
      metadata: {
        url: "https://cdn.test/audio.webm",
        publicId: "audio-1",
        mimeType: "audio/webm",
        size: 5,
        fileName: "voice.webm",
        width: null,
        height: null,
        duration: 1200,
      },
      replyToSeq: null,
      reply: null,
      createdAt: "2026-08-01T10:00:00Z",
      editedAt: null,
      deleted: false,
    };
    chatApi.conversations.mockResolvedValue({ items: [thread("audio-chat")], nextCursor: null, hasMore: false });
    chatApi.messages.mockResolvedValue(messagePage("audio-chat"));
    chatApi.details.mockResolvedValue({ members: [{ userId: "viewer-1" }, { userId: "other" }] });
    uploadCloudinaryMedia.mockResolvedValue({ secureUrl: "https://cdn.test/audio.webm", publicId: "audio-1", width: 0, height: 0 });
    chatApi.send.mockRejectedValueOnce(new Error("send failed")).mockResolvedValueOnce(sent);
    mediaComposer.audioAttachment = {
      id: "audio-1",
      kind: "AUDIO",
      file: new File(["audio"], "voice.webm", { type: "audio/webm" }),
      previewUrl: "blob:audio-1",
      duration: 1200,
    };
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    act(() => result.current.openConversation("audio-chat"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));

    await act(async () => { await result.current.send(); });
    expect(mediaComposer.audioAttachment).not.toBeNull();
    expect(mediaComposer.clearAudio).not.toHaveBeenCalled();
    expect(result.current.sendError).toContain("Bản ghi vẫn được giữ lại để bạn thử lại.");
    await act(async () => { await result.current.send(); });

    expect(result.current.sendError).toBeNull();
    expect(chatApi.send).toHaveBeenCalledTimes(2);
    expect(chatApi.send.mock.calls[1][2].clientMessageId).toBe(chatApi.send.mock.calls[0][2].clientMessageId);
    expect(uploadCloudinaryMedia).toHaveBeenCalledTimes(1);
    expect(mediaComposer.clearAudio).toHaveBeenCalledTimes(1);
    expect(result.current.activeMessages.some((message) => message.messageType === "AUDIO")).toBe(true);
  });

  it("falls back from a whitespace-only safe backend error message while retaining audio", async () => {
    const apiError = new ApiError("POST", "/chat/audio", 400, { backendMessage: "   \t" });
    chatApi.conversations.mockResolvedValue({ items: [thread("audio-chat")], nextCursor: null, hasMore: false });
    chatApi.messages.mockResolvedValue(messagePage("audio-chat"));
    chatApi.details.mockResolvedValue({ members: [{ userId: "viewer-1" }, { userId: "other" }] });
    uploadCloudinaryMedia.mockResolvedValue({ secureUrl: "https://cdn.test/audio.webm", publicId: "audio-1", width: 0, height: 0 });
    chatApi.send.mockRejectedValue(apiError);
    mediaComposer.audioAttachment = {
      id: "audio-1",
      kind: "AUDIO",
      file: new File(["audio"], "voice.webm", { type: "audio/webm" }),
      previewUrl: "blob:audio-1",
      duration: 1200,
    };
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    act(() => result.current.openConversation("audio-chat"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));

    await act(async () => { await result.current.send(); });

    expect(result.current.sendError).toBe(`${apiError.message} Bản ghi vẫn được giữ lại để bạn thử lại.`);
    expect(result.current.sendError?.trim()).not.toBe("");
    expect(mediaComposer.clearAudio).not.toHaveBeenCalled();
  });

  it("clears a stale media validation error after a successful text-only send", async () => {
    const textMessage: ChatMessageDto = {
      ...messagePage("text-chat").items[0],
      id: "text-message",
      messageSeq: 2,
      senderId: "viewer-1",
      content: "hello",
    };
    chatApi.conversations.mockResolvedValue({ items: [thread("text-chat")], nextCursor: null, hasMore: false });
    chatApi.messages.mockResolvedValue(messagePage("text-chat"));
    chatApi.details.mockResolvedValue({ members: [{ userId: "viewer-1" }, { userId: "other" }] });
    chatApi.send.mockResolvedValue(textMessage);
    mediaComposer.error = "Tệp ảnh không hợp lệ.";
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    act(() => result.current.openConversation("text-chat"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setDraft("hello"));

    await act(async () => { await result.current.send(); });

    expect(mediaComposer.clearImages).toHaveBeenCalledTimes(1);
    expect(mediaComposer.error).toBe("");
  });

  it("does not duplicate audio when text fails after the audio message succeeds", async () => {
    const audioMessage: ChatMessageDto = {
      ...messagePage("mixed-chat").items[0],
      id: "audio-message",
      messageSeq: 2,
      senderId: "viewer-1",
      messageType: "AUDIO",
      content: null,
      metadata: { url: "https://cdn.test/audio.webm", publicId: "audio-1", mimeType: "audio/webm", size: 5, fileName: "voice.webm", width: null, height: null, duration: 1200 },
    };
    const textMessage: ChatMessageDto = {
      ...messagePage("mixed-chat").items[0],
      id: "text-message",
      messageSeq: 3,
      senderId: "viewer-1",
      content: "hello",
    };
    chatApi.conversations.mockResolvedValue({ items: [thread("mixed-chat")], nextCursor: null, hasMore: false });
    chatApi.messages.mockResolvedValue(messagePage("mixed-chat"));
    chatApi.details.mockResolvedValue({ members: [{ userId: "viewer-1" }, { userId: "other" }] });
    uploadCloudinaryMedia.mockResolvedValue({ secureUrl: "https://cdn.test/audio.webm", publicId: "audio-1", width: 0, height: 0 });
    chatApi.send
      .mockResolvedValueOnce(audioMessage)
      .mockRejectedValueOnce(new Error("text failed"))
      .mockResolvedValueOnce(textMessage);
    mediaComposer.audioAttachment = {
      id: "audio-1",
      kind: "AUDIO",
      file: new File(["audio"], "voice.webm", { type: "audio/webm" }),
      previewUrl: "blob:audio-1",
      duration: 1200,
    };
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    act(() => result.current.openConversation("mixed-chat"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));
    act(() => result.current.setDraft("hello"));

    await act(async () => { await result.current.send(); });

    expect(mediaComposer.clearAudio).toHaveBeenCalledTimes(1);
    expect(mediaComposer.audioAttachment).toBeNull();
    expect(result.current.sendError).toBe("Không thể gửi tin nhắn. Vui lòng thử lại.");
    expect(result.current.draft).toBe("hello");

    await act(async () => { await result.current.send(); });

    expect(chatApi.send.mock.calls.map(([, , request]) => request.messageType)).toEqual(["AUDIO", "TEXT", "TEXT"]);
    expect(chatApi.send.mock.calls[2][2].clientMessageId).toBe(chatApi.send.mock.calls[1][2].clientMessageId);
    expect(chatApi.send.mock.calls[2][2].replyToSeq).toBe(chatApi.send.mock.calls[1][2].replyToSeq);
    expect(uploadCloudinaryMedia).toHaveBeenCalledTimes(1);
    expect(mediaComposer.clearAudio).toHaveBeenCalledTimes(1);
    expect(result.current.sendError).toBeNull();
  });

  it("removes a successful image and retries only retained audio after audio send failure", async () => {
    const imageMessage: ChatMessageDto = {
      ...messagePage("mixed-chat").items[0],
      id: "image-message",
      messageSeq: 2,
      senderId: "viewer-1",
      messageType: "IMAGE",
      content: null,
      metadata: { url: "https://cdn.test/image.png", publicId: "image-1", mimeType: "image/png", size: 5, fileName: "image.png", width: 100, height: 100, duration: null },
    };
    const audioMessage: ChatMessageDto = {
      ...imageMessage,
      id: "audio-message",
      messageSeq: 3,
      messageType: "AUDIO",
      metadata: { url: "https://cdn.test/audio.webm", publicId: "audio-1", mimeType: "audio/webm", size: 5, fileName: "voice.webm", width: null, height: null, duration: 1200 },
    };
    const image: ChatImageDraft = {
      id: "image-1",
      kind: "IMAGE",
      file: new File(["image"], "image.png", { type: "image/png" }),
      previewUrl: "blob:image-1",
      status: "ready",
      progress: 0,
    };
    chatApi.conversations.mockResolvedValue({ items: [thread("mixed-chat")], nextCursor: null, hasMore: false });
    chatApi.messages.mockResolvedValue(messagePage("mixed-chat"));
    chatApi.details.mockResolvedValue({ members: [{ userId: "viewer-1" }, { userId: "other" }] });
    uploadCloudinaryMedia
      .mockResolvedValueOnce({ secureUrl: "https://cdn.test/image.png", publicId: "image-1", width: 100, height: 100 })
      .mockResolvedValue({ secureUrl: "https://cdn.test/audio.webm", publicId: "audio-1", width: 0, height: 0 });
    chatApi.send
      .mockResolvedValueOnce(imageMessage)
      .mockRejectedValueOnce(new Error("audio failed"))
      .mockResolvedValueOnce(audioMessage);
    mediaComposer.images = [image];
    mediaComposer.audioAttachment = {
      id: "audio-1",
      kind: "AUDIO",
      file: new File(["audio"], "voice.webm", { type: "audio/webm" }),
      previewUrl: "blob:audio-1",
      duration: 1200,
    };
    const { result } = renderHook(() => useChatController("viewer-1"));
    await waitFor(() => expect(result.current.threadState).toBe("ready"));
    act(() => result.current.openConversation("mixed-chat"));
    await waitFor(() => expect(result.current.messageState).toBe("ready"));

    await act(async () => { await result.current.send(); });

    expect(mediaComposer.removeImage).toHaveBeenCalledWith("image-1");
    expect(mediaComposer.images).toEqual([]);
    expect(mediaComposer.clearAudio).not.toHaveBeenCalled();
    expect(result.current.sendError).toContain("Bản ghi vẫn được giữ lại để bạn thử lại.");

    await act(async () => { await result.current.send(); });

    expect(chatApi.send.mock.calls.map(([, , request]) => request.messageType)).toEqual(["IMAGE", "AUDIO", "AUDIO"]);
    expect(chatApi.send.mock.calls[2][2].clientMessageId).toBe(chatApi.send.mock.calls[1][2].clientMessageId);
    expect(uploadCloudinaryMedia).toHaveBeenCalledTimes(2);
    expect(mediaComposer.removeImage).toHaveBeenCalledTimes(1);
    expect(mediaComposer.clearAudio).toHaveBeenCalledTimes(1);
    expect(result.current.sendError).toBeNull();
  });
});
