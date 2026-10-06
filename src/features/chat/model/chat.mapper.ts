import type { ChatMessageDto, ConversationDto } from "./chat.dto";
import type { ChatMessage, ChatStoryContext, ChatThread } from "./chat.types";

export function conversationToThread(item: ConversationDto, viewerId: string): ChatThread {
  const fallback = item.lastMessageType === "STORY_REPLY"
    ? "Đã trả lời một tin"
    : item.lastMessageType === "IMAGE"
    ? "Đã gửi một ảnh"
    : item.lastMessageType === "AUDIO"
      ? "Đã gửi một tin nhắn thoại"
      : "Tin nhắn mới";
  const preview = item.lastMessageSeq > 0 ? item.lastMessagePreview?.trim() || fallback : "Chưa có tin nhắn";
  return {
    id: item.id,
    title: item.title?.trim() || (item.type === "GROUP" ? "Nhóm chat" : "Tin nhắn"),
    type: item.type,
    isDissolved: item.isDissolved,
    avatarUrl: item.avatarUrl,
    unreadCount: item.unreadCount,
    preview: item.lastMessageSenderId === viewerId ? `Bạn: ${preview}` : preview,
    lastMessageId: item.lastMessageId,
    lastMessageSeq: item.lastMessageSeq,
    lastMessageAt: item.lastMessageAt,
    currentUserRole: item.currentUserRole,
    createdAt: item.createdAt,
    recipientDeliveredSeq: item.recipientDeliveredSeq,
    recipientReadSeq: item.recipientReadSeq,
  };
}

export function chatMessageToModel(item: ChatMessageDto): ChatMessage {
  return {
    ...item,
    clientMessageId: item.clientMessageId || undefined,
    metadata: item.metadata,
    reply: item.reply,
    storyContext: normalizeStoryContext(item.storyContext),
  };
}

function normalizeStoryContext(context: ChatMessageDto["storyContext"]): ChatStoryContext | null {
  if (!context || !context.storyId?.trim() || !context.storyOwnerId?.trim()) return null;
  return {
    storyId: context.storyId.trim(),
    storyOwnerId: context.storyOwnerId.trim(),
    mediaType: context.mediaType?.trim().toUpperCase() || "IMAGE",
    previewAtMs: Number.isFinite(context.previewAtMs) && context.previewAtMs >= 0 ? context.previewAtMs : 0,
    expiresAt: context.expiresAt,
    available: context.available === true,
    previewUrl: context.previewUrl?.trim() || null,
  };
}
