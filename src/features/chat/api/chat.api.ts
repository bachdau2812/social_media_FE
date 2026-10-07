import { apiGet, apiSend } from "../../../shared/api";
import type { ChatMessageDto, ChatPresenceDto, ConversationDetailsDto, ConversationDto, CursorPageDto, MessageReactorDto, PinCollectionDto } from "../model/chat.dto";
import type { ReactionSnapshot, ReactionState, ReactionType } from "../model/chatReactions";
import type { ChatUserSuggestion } from "../model/chat.types";

export const chatApi = {
  recall(conversationId: string, actorId: string, messageId: string) {
    return apiSend<ChatMessageDto>(conversationPath(conversationId, actorId, `/messages/${encodeURIComponent(messageId)}/recall`), "POST");
  },
  messageStates(conversationId: string, actorId: string, messageIds: string[]) {
    return apiSend<ChatMessageDto[]>(conversationPath(conversationId, actorId, "/messages/state"), "POST", { messageIds });
  },
  pins(conversationId: string, actorId: string) {
    return apiGet<PinCollectionDto>(conversationPath(conversationId, actorId, "/pins"));
  },
  pin(conversationId: string, actorId: string, messageId: string) {
    return apiSend<PinCollectionDto>(conversationPath(conversationId, actorId, `/pins/${encodeURIComponent(messageId)}`), "PUT");
  },
  unpin(conversationId: string, actorId: string, messageId: string) {
    return apiSend<PinCollectionDto>(conversationPath(conversationId, actorId, `/pins/${encodeURIComponent(messageId)}`), "DELETE");
  },
  forward(conversationId: string, actorId: string, body: { sourceConversationId: string; sourceMessageId: string; clientMessageId: string }) {
    return apiSend<ChatMessageDto>(conversationPath(conversationId, actorId, "/messages/forward"), "POST", body);
  },
  conversations(actorId: string, cursor?: string, limit = 100, signal?: AbortSignal) {
    const query = new URLSearchParams({ actorId, limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    return apiGet<CursorPageDto<ConversationDto>>(`/chat/conversations?${query}`, { signal });
  },
  messages(conversationId: string, actorId: string, limit = 80, beforeSeq?: number, signal?: AbortSignal) {
    const before = beforeSeq ? `&beforeSeq=${beforeSeq}` : "";
    return apiGet<CursorPageDto<ChatMessageDto>>(`/chat/conversations/${encodeURIComponent(conversationId)}/messages?actorId=${encodeURIComponent(actorId)}&limit=${limit}${before}`, { signal });
  },
  messagesAfter(conversationId: string, actorId: string, afterSeq: number, limit = 100, signal?: AbortSignal) {
    return apiGet<CursorPageDto<ChatMessageDto>>(`/chat/conversations/${encodeURIComponent(conversationId)}/messages?actorId=${encodeURIComponent(actorId)}&limit=${limit}&afterSeq=${afterSeq}`, { signal });
  },
  conversation(conversationId: string, actorId: string, signal?: AbortSignal) {
    return apiGet<ConversationDto>(`/chat/conversations/${encodeURIComponent(conversationId)}?actorId=${encodeURIComponent(actorId)}`, { signal });
  },
  details(conversationId: string, actorId: string, signal?: AbortSignal) {
    return apiGet<ConversationDetailsDto>(`/chat/conversations/${encodeURIComponent(conversationId)}/details?actorId=${encodeURIComponent(actorId)}`, { signal });
  },
  presence(userId: string, signal?: AbortSignal) {
    return apiGet<ChatPresenceDto>(`/chat/presence/${encodeURIComponent(userId)}`, { signal });
  },
  send(conversationId: string, actorId: string, body: Record<string, unknown>) {
    return apiSend<ChatMessageDto>(`/chat/conversations/${encodeURIComponent(conversationId)}/messages?actorId=${encodeURIComponent(actorId)}`, "POST", body);
  },
  suggestions(viewerId: string, query: string) {
    return apiGet<ChatUserSuggestion[]>(`/user-details/chat-suggestions?viewerId=${encodeURIComponent(viewerId)}&query=${encodeURIComponent(query)}&limit=30`);
  },
  direct(actorId: string, targetUserId: string) {
    return apiSend<ConversationDto>(`/chat/conversations/direct?actorId=${encodeURIComponent(actorId)}`, "POST", { targetUserId });
  },
  group(actorId: string, title: string, initialUserIds: string[]) {
    return apiSend<ConversationDto>(`/chat/conversations/group?actorId=${encodeURIComponent(actorId)}`, "POST", { title, initialUserIds });
  },
  setReaction(conversationId: string, actorId: string, messageId: string, reaction: ReactionType) {
    return apiSend<ReactionState>(reactionPath(conversationId, messageId, actorId), "PUT", { reaction });
  },
  removeReaction(conversationId: string, actorId: string, messageId: string) {
    return apiSend<ReactionState>(reactionPath(conversationId, messageId, actorId), "DELETE");
  },
  reactionStates(conversationId: string, actorId: string, messageIds: string[]) {
    return apiSend<ReactionSnapshot[]>(`/chat/conversations/${encodeURIComponent(conversationId)}/messages/reactions/state?actorId=${encodeURIComponent(actorId)}`, "POST", { messageIds });
  },
  reactors(conversationId: string, actorId: string, messageId: string, reaction?: ReactionType, cursor?: string, signal?: AbortSignal) {
    const query = new URLSearchParams({ actorId, limit: "30" });
    if (reaction) query.set("reaction", reaction);
    if (cursor) query.set("cursor", cursor);
    return apiGet<CursorPageDto<MessageReactorDto>>(`/chat/conversations/${encodeURIComponent(conversationId)}/messages/${encodeURIComponent(messageId)}/reactions?${query}`, { signal });
  },
};

function conversationPath(conversationId: string, actorId: string, suffix: string) {
  return `/chat/conversations/${encodeURIComponent(conversationId)}${suffix}?actorId=${encodeURIComponent(actorId)}`;
}

function reactionPath(conversationId: string, messageId: string, actorId: string) {
  return `/chat/conversations/${encodeURIComponent(conversationId)}/messages/${encodeURIComponent(messageId)}/reactions/me?actorId=${encodeURIComponent(actorId)}`;
}
