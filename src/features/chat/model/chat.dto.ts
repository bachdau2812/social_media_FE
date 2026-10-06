import type { MessageReactionFields, ReactionType } from "./chatReactions";

export type ConversationType = "DIRECT" | "GROUP";
export type ChatMemberRole = "USER" | "ADMIN";
export type ChatMessageType = "TEXT" | "IMAGE" | "VIDEO" | "FILE" | "AUDIO" | "STORY_REPLY" | "SYSTEM";

export type ConversationDto = {
  id: string;
  type: ConversationType;
  isDissolved: boolean;
  title: string | null;
  avatarUrl: string | null;
  lastMessageSeq: number;
  lastMessageId: string | null;
  lastMessageAt: string | null;
  lastMessageSenderId: string | null;
  lastMessageType: ChatMessageType | null;
  lastMessagePreview: string | null;
  currentUserRole: ChatMemberRole;
  unreadCount: number;
  recipientDeliveredSeq: number;
  recipientReadSeq: number;
  createdAt: string | null;
};

export type ConversationMemberDto = {
  userId: string;
  displayName: string | null;
  username: string | null;
  fullName: string | null;
  nickname: string | null;
  avatarUrl: string | null;
  role: ChatMemberRole;
};

export type ConversationDetailsDto = {
  conversationId: string;
  notificationsMuted: boolean;
  createdBy: string | null;
  canManageGroup: boolean;
  isDissolved: boolean;
  members: ConversationMemberDto[];
};

export type ChatMediaMetadataDto = {
  url: string | null;
  publicId: string | null;
  mimeType: string | null;
  size: number | null;
  fileName: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
};

export type ChatReplyDto = {
  messageSeq: number;
  senderId: string | null;
  senderDisplayName: string | null;
  messageType: ChatMessageType | null;
  content: string | null;
  metadata: ChatMediaMetadataDto | null;
  deleted: boolean;
};

export type ChatStoryContextDto = {
  storyId: string;
  storyOwnerId: string;
  mediaType: string;
  previewAtMs: number;
  expiresAt: string | null;
  available: boolean | null;
  previewUrl: string | null;
};

export type ChatMessageDto = MessageReactionFields & {
  forwarded?: boolean;
  id: string;
  conversationId: string;
  messageSeq: number;
  clientMessageId: string | null;
  senderId: string;
  senderDisplayName: string | null;
  senderAvatarUrl: string | null;
  messageType: ChatMessageType;
  content: string | null;
  metadata: ChatMediaMetadataDto | null;
  replyToSeq: number | null;
  reply: ChatReplyDto | null;
  createdAt: string | null;
  editedAt: string | null;
  deleted: boolean;
  storyContext?: ChatStoryContextDto | null;
};

export type CursorPageDto<T> = { items: T[]; nextCursor: string | null; hasMore: boolean };
export type PinCollectionDto = { version: number; canManage: boolean; items: { message: ChatMessageDto; pinnedBy: string; pinnedAt: string }[] };

export type MessageReactorDto = {
  userId: string; displayName: string; avatarUrl: string | null;
  reaction: ReactionType; reactedAt: string;
};
