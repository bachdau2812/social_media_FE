import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "../../../shared/api";
import type { ChatMessageDto, ConversationDto, CursorPageDto } from "../model/chat.dto";
import type { ChatRealtimeEvent } from "../services/chatRealtime";
import type { ChatImageDraft } from "./useChatMediaComposer";
import { useChatController } from "./useChatController";

const uploadCloudinaryMedia = vi.hoisted(() => vi.fn());
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
  chatApi.conversations.mockReset();
  chatApi.messages.mockReset();
  chatApi.details.mockReset();
  chatApi.send.mockReset();
  chatRealtime.subscribe.mockClear();
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

afterEach(() => { sessionStorage.clear(); });

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
    expect(uploadCloudinaryMedia).toHaveBeenCalledTimes(3);
    expect(mediaComposer.removeImage).toHaveBeenCalledTimes(1);
    expect(mediaComposer.clearAudio).toHaveBeenCalledTimes(1);
    expect(result.current.sendError).toBeNull();
  });
});
