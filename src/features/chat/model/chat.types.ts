import type { ChatDisplayMediaItem } from "../components/ChatMediaExperience";
import type { ChatMemberRole, ChatMessageType, ConversationDetailsDto, ConversationType } from "./chat.dto";
import type { MessageReactionFields } from "./chatReactions";
export type PinCollection = { version: number; canManage: boolean; items: { message: ChatMessage; pinnedBy: string; pinnedAt: string }[] };

export type ChatNavigationTarget = { conversationId: string; messageId?: string; messageSeq?: number; panel?: "details" | "requests" };
export type ChatThread = { id: string; title: string; type: ConversationType; isDissolved: boolean; avatarUrl: string | null; unreadCount: number; preview: string; lastMessageId: string | null; lastMessageSeq?: number; lastMessageAt: string | null; currentUserRole: ChatMemberRole; createdAt: string | null; recipientDeliveredSeq: number; recipientReadSeq: number };
export type ChatMediaMetadata = ChatDisplayMediaItem & { publicId?: string | null; mimeType?: string | null; size?: number | null; duration?: number | null; thumbnailUrl?: string | null; items?: ChatMediaMetadata[] | null };
export type ChatReply = { messageSeq: number; senderId?: string | null; senderDisplayName?: string | null; messageType?: string | null; content?: string | null; metadata?: ChatMediaMetadata | null; deleted?: boolean };
export type ChatStoryContext = { storyId: string; storyOwnerId: string; mediaType: string; previewAtMs: number; expiresAt?: string | null; available: boolean; previewUrl?: string | null };
export type ChatMessage = MessageReactionFields & { forwarded?: boolean; id: string; conversationId: string; messageSeq: number; clientMessageId?: string; senderId: string; senderDisplayName?: string | null; senderAvatarUrl?: string | null; messageType: ChatMessageType; content?: string | null; metadata?: ChatMediaMetadata | null; storyContext?: ChatStoryContext | null; replyToSeq?: number | null; reply?: ChatReply | null; createdAt?: string | null; editedAt?: string | null; deleted?: boolean; status?: "sending" | "sent" | "delivered" | "read" | "failed" | "queued" };
export type ConversationDetails = ConversationDetailsDto;
export type ChatUserSuggestion = { id: string; username: string; fullName?: string | null; avatar?: string | null };
export type CursorPage<T> = { items: T[]; nextCursor?: string | null; hasMore: boolean };
