import type { ChatMessage } from "./chat.types";

export function canForward(message: ChatMessage) {
  return !message.deleted && ["TEXT", "IMAGE", "AUDIO"].includes(message.messageType)
    && !["sending", "failed", "queued"].includes(message.status ?? "");
}

export function messageTombstone(message: ChatMessage): ChatMessage {
  return { ...message, deleted: true, content: null, metadata: null, storyContext: null, reply: null, replyToSeq: null,
    myReaction: null, isReact: false, likeCount: 0, reactions: [] };
}

export function messagePreview(message: ChatMessage) {
  if (message.deleted) return "Tin nhắn đã được thu hồi";
  return message.content?.trim() || (message.messageType === "IMAGE" ? "Ảnh" : message.messageType === "AUDIO" ? "Tin nhắn thoại" : "Tin nhắn");
}
