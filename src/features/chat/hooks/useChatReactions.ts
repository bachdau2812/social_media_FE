import { useEffect, useMemo, useSyncExternalStore } from "react";
import type { ChatMessage } from "../model/chat.types";
import { getChatReactionStore, retainChatReactionStore } from "../services/chatReactionStore";
import { chatRealtime } from "../services/chatRealtime";

export function useChatReactions(userId: string, messages: ChatMessage[]) {
  const store = useMemo(() => getChatReactionStore(userId), [userId]);
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion);
  const select = useMemo(() => store.select.bind(store), [store]);
  useEffect(() => {
    const release = store.watch(messages);
    store.ingest(messages);
    return release;
  }, [store, messages]);
  useEffect(() => retainChatReactionStore(store, () => {
    const disconnect = chatRealtime.subscribe(userId, (event) => {
      if (event.type === "MESSAGE_REACTION_CHANGED" && event.reactionState) store.applyEvent(event.conversationId, event.reactionState);
      if (event.type === "MEMBER_REMOVED" && event.targetUserId === userId) store.revoke(event.conversationId);
      if (event.type === "MEMBER_ADDED" && event.targetUserId === userId) store.allow(event.conversationId);
    });
    const reconnect = chatRealtime.subscribeReconnect?.(() => { void store.refresh(); });
    return () => { disconnect(); reconnect?.(); };
  }), [store, userId]);
  return {
    messages: messages.map((message) => ({ ...message, ...store.read(message.conversationId, message) })),
    select,
  };
}
