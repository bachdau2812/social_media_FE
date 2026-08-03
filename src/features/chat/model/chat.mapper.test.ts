import { describe, expect, it } from "vitest";
import { chatMessageToModel, conversationToThread } from "./chat.mapper";
import type { ChatMessageDto, ConversationDto } from "./chat.dto";

const conversation: ConversationDto = {
  id: "conversation-1",
  type: "DIRECT",
  isDissolved: false,
  title: null,
  avatarUrl: null,
  lastMessageSeq: 7,
  lastMessageId: "message-7",
  lastMessageAt: "2026-07-30T10:00:00Z",
  lastMessageSenderId: "viewer-1",
  lastMessageType: "IMAGE",
  lastMessagePreview: null,
  currentUserRole: "USER",
  unreadCount: 3,
  recipientDeliveredSeq: 6,
  recipientReadSeq: 5,
  createdAt: "2026-07-29T10:00:00Z",
};

describe("conversationToThread", () => {
  it("retains canonical conversation metadata while deriving the display preview", () => {
    const thread = conversationToThread(conversation, "viewer-1");

    expect(thread).toMatchObject({
      id: "conversation-1",
      type: "DIRECT",
      title: "Tin nhắn",
      preview: "Bạn: Đã gửi một ảnh",
      unreadCount: 3,
      lastMessageId: "message-7",
      lastMessageAt: "2026-07-30T10:00:00Z",
      currentUserRole: "USER",
      createdAt: "2026-07-29T10:00:00Z",
    });
  });
});

describe("chatMessageToModel", () => {
  it("normalizes the additive Story context once at the API boundary", () => {
    const message = chatMessageToModel({
      id: "message-1",
      conversationId: "conversation-1",
      messageSeq: 1,
      clientMessageId: "client-1",
      senderId: "sender-1",
      senderDisplayName: "An",
      senderAvatarUrl: null,
      messageType: "STORY_REPLY",
      content: "hello",
      metadata: null,
      replyToSeq: null,
      reply: null,
      createdAt: "2026-07-31T00:00:00Z",
      editedAt: null,
      deleted: false,
      storyContext: {
        storyId: "story-1",
        storyOwnerId: "owner-1",
        mediaType: "VIDEO",
        previewAtMs: 12400,
        expiresAt: "2026-08-01T00:00:00Z",
        available: true,
        previewUrl: "https://host/still.jpg",
      },
    } satisfies ChatMessageDto);

    expect(message.storyContext).toEqual({
      storyId: "story-1",
      storyOwnerId: "owner-1",
      mediaType: "VIDEO",
      previewAtMs: 12400,
      expiresAt: "2026-08-01T00:00:00Z",
      available: true,
      previewUrl: "https://host/still.jpg",
    });
  });
});
