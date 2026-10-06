import { useEffect, useMemo, useSyncExternalStore } from "react";
import type { ChatMessage } from "../model/chat.types";
import { getMessageActionStore, retainMessageActionStore } from "../services/chatMessageActionStore";
import { chatRealtime } from "../services/chatRealtime";

export function useChatMessageActions(userId: string, conversationId: string | null, messages: ChatMessage[]) {
  const store = useMemo(() => getMessageActionStore(userId), [userId]);
  const version = useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion);
  const actions = useMemo(() => ({ recallMessage: store.recall.bind(store), pinMessage: store.pin.bind(store),
    messageActionState: store.state.bind(store), projectMessage: store.project.bind(store), isMessageDeleted: store.isDeleted.bind(store),
    refreshPins: store.refreshPins.bind(store) }), [store]);
  useEffect(() => {
    const release = store.watch(conversationId, messages);
    store.ingest(messages);
    return release;
  }, [store, conversationId, messages]);
  useEffect(() => {
    if (conversationId) void store.refreshPins(conversationId);
  }, [store, conversationId]);
  useEffect(() => retainMessageActionStore(store, () => {
    const disconnect = chatRealtime.subscribe(userId, (event) => {
      if (event.type === "MESSAGE_DELETED" && event.message) store.deleted(event.message as ChatMessage);
      if (event.type === "PINS_CHANGED") void store.refreshPins(event.conversationId, event.pinVersion ?? 0);
      if (event.type === "MEMBER_REMOVED" && event.targetUserId === userId) store.revoke(event.conversationId);
      if (event.type === "MEMBER_ADDED" && event.targetUserId === userId) store.allow(event.conversationId);
    });
    const reconnect = chatRealtime.subscribeReconnect?.(() => { void store.refresh(); });
    return () => { disconnect(); reconnect?.(); };
  }), [store, userId]);
  return { ...actions, messages: messages.map((message) => store.project(message)), version,
    pins: conversationId ? store.pins(conversationId) : undefined, pinsError: conversationId ? store.pinsError(conversationId) : undefined };
}
