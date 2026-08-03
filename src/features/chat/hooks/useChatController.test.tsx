import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ChatMessageDto, ConversationDto, CursorPageDto } from "../model/chat.dto";
import type { ChatRealtimeEvent } from "../services/chatRealtime";
import { useChatController } from "./useChatController";

const chatApi = vi.hoisted(() => ({
  conversations: vi.fn(),
  messages: vi.fn(),
  details: vi.fn(),
  send: vi.fn(),
}));

const chatRealtime = vi.hoisted(() => ({
  rememberRecipientCursor: vi.fn(),
  subscribe: vi.fn<(userId: string, listener: (event: ChatRealtimeEvent) => void) => () => void>(() => vi.fn()),
  acknowledgeDelivered: vi.fn(),
  acknowledgeRead: vi.fn(),
  outgoingStatus: vi.fn(() => "sent"),
  publishLocalMessage: vi.fn(),
}));

const mediaComposer = vi.hoisted(() => ({
  images: [],
  audioAttachment: null,
  recording: false,
  recordingElapsed: 0,
  error: "",
  clearImages: vi.fn(),
  clearAudio: vi.fn(),
}));

vi.mock("../api/chat.api", () => ({ chatApi }));
vi.mock("../services/chatRealtime", () => ({ chatRealtime }));
vi.mock("./useChatMediaComposer", () => ({ useChatMediaComposer: () => mediaComposer }));

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

afterEach(() => {
  chatApi.conversations.mockReset();
  chatApi.messages.mockReset();
  chatRealtime.subscribe.mockClear();
});

describe("useChatController message requests", () => {
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
});
