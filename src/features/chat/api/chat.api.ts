import { apiGet, apiSend } from "../../../shared/api";
import type { ChatMessageDto, ConversationDetailsDto, ConversationDto, CursorPageDto } from "../model/chat.dto";
import type { ChatUserSuggestion } from "../model/chat.types";

export const chatApi = {
  conversations(actorId: string, limit = 100) {
    return apiGet<CursorPageDto<ConversationDto>>(`/chat/conversations?actorId=${encodeURIComponent(actorId)}&limit=${limit}`);
  },
  messages(conversationId: string, actorId: string, limit = 80, beforeSeq?: number, signal?: AbortSignal) {
    const before = beforeSeq ? `&beforeSeq=${beforeSeq}` : "";
    return apiGet<CursorPageDto<ChatMessageDto>>(`/chat/conversations/${encodeURIComponent(conversationId)}/messages?actorId=${encodeURIComponent(actorId)}&limit=${limit}${before}`, { signal });
  },
  details(conversationId: string, actorId: string) {
    return apiGet<ConversationDetailsDto>(`/chat/conversations/${encodeURIComponent(conversationId)}/details?actorId=${encodeURIComponent(actorId)}`);
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
};
