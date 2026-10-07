import { useCallback, useEffect, useMemo, useRef, useState, type SetStateAction } from "react";
import { ApiError, uploadCloudinaryMedia } from "../../../shared/api";
import { chatRealtime, type ChatRealtimeEvent } from "../services/chatRealtime";
import { useChatMediaComposer } from "./useChatMediaComposer";
import { useChatReactions } from "./useChatReactions";
import { useChatMessageActions } from "./useChatMessageActions";
import { chatApi } from "../api/chat.api";
import { chatMessageToModel, conversationToThread } from "../model/chat.mapper";
import { clearStoredFullChatTarget, readStoredFullChatTarget, writeStoredFullChatTarget } from "../model/chatNavigationPersistence";
import type { ChatMessage, ChatNavigationTarget, ChatReply, ChatThread } from "../model/chat.types";
import { chatSendJobs, mediaSendJobKey, textSendJobKey } from "../services/chatSendJobs";

const EMPTY_THREADS: ChatThread[] = [];
const EMPTY_MESSAGES: ChatMessage[] = [];

/** Hide the previous account immediately and reject its late async writes. */
function useAccountState<T>(userId: string, empty: T) {
  const [owned, setOwned] = useState({ userId, value: empty });
  const actor = useRef(userId);
  actor.current = userId;
  const setValue = useCallback((action: SetStateAction<T>) => {
    setOwned((current) => {
      if (actor.current !== userId) return current;
      const previous = current.userId === userId ? current.value : empty;
      return { userId, value: typeof action === "function" ? (action as (value: T) => T)(previous) : action };
    });
  }, [userId, empty]);
  return [owned.userId === userId ? owned.value : empty, setValue] as const;
}
function mergeMessages(current: ChatMessage[], incoming: ChatMessage[]) {
  const byId = new Map(current.map((message) => [message.id, message]));
  incoming.forEach((message) => byId.set(message.id, { ...byId.get(message.id), ...message }));
  return [...byId.values()].sort((left, right) => left.messageSeq - right.messageSeq);
}
function replyOf(message: ChatMessage): ChatReply {
  return { messageSeq: message.messageSeq, senderId: message.senderId, senderDisplayName: message.senderDisplayName, messageType: message.messageType, content: message.content, metadata: message.metadata, deleted: message.deleted };
}
function statusFor(message: ChatMessage, viewerId: string, delivered: number, read: number): ChatMessage {
  if (message.senderId !== viewerId) return message;
  return { ...message, status: message.messageSeq <= read ? "read" : message.messageSeq <= delivered ? "delivered" : message.status || "sent" };
}
function formatSendError(error: unknown, hasAudio: boolean) {
  const retrySuffix = " Bản ghi vẫn được giữ lại để bạn thử lại.";
  if (error instanceof ApiError) {
    const safeBackendMessage = ["validation", "permission", "unavailable"].includes(error.category)
      ? error.backendMessage?.trim()
      : undefined;
    const message = safeBackendMessage || error.message;
    return hasAudio ? `${message}${retrySuffix}` : message;
  }
  return hasAudio ? `Không thể gửi tin nhắn thoại.${retrySuffix}` : "Không thể gửi tin nhắn. Vui lòng thử lại.";
}

export function useChatController(userId: string, initialTarget?: (ChatNavigationTarget & { nonce?: number }) | null) {
  const restoredTarget = useRef<ChatNavigationTarget | null>(initialTarget === undefined ? readStoredFullChatTarget() : initialTarget);
  const [threads, setThreads] = useAccountState(userId, EMPTY_THREADS);
  const [activeId, setActiveId] = useState<string | null>(restoredTarget.current?.conversationId || null);
  const [messages, setMessages] = useAccountState(userId, EMPTY_MESSAGES);
  const cachedMessages = useRef(messages);
  cachedMessages.current = messages;
  const actor = useRef(userId);
  actor.current = userId;
  const previousActor = useRef(userId);
  const [threadState, setThreadState] = useState<"loading" | "ready" | "error">("loading");
  const [hasMoreThreads, setHasMoreThreads] = useState(false);
  const [loadingMoreThreads, setLoadingMoreThreads] = useState(false);
  const [threadPageError, setThreadPageError] = useState(false);
  const [messageState, setMessageState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [hasMore, setHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [focused, setFocused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(() => typeof document === "undefined" || document.visibilityState === "visible");
  const [highlightedSeq, setHighlightedSeq] = useState<number | null>(null);
  const [conversationErrorId, setConversationErrorId] = useState<string | null>(null);
  const [conversationRevision, setConversationRevision] = useState(0);
  const recipientIds = useRef<Record<string, string[]>>({});
  const membershipVersions = useRef(new Map<string, number>());
  const revokedConversations = useRef(new Set<string>());
  const rejoiningConversations = useRef(new Set<string>());
  const observedSequences = useRef(new Map<string, number>());
  const snapshotSequences = useRef(new Map<string, number>());
  const contiguousSequences = useRef(new Map<string, number>());
  const receivedSequences = useRef(new Map<string, Set<number>>());
  const gapSyncs = useRef(new Map<string, { afterSeq: number; targetSeq: number; promise: Promise<boolean> }>());
  const creationVersion = useRef(0);
  const acceptedCreations = useRef(new Map<string, number>());
  const acceptedMessageSnapshots = useRef(new Map<string, { conversationId: string; version: number; message: ChatMessage }>());
  const threadRequestVersion = useRef(0);
  const threadRequestController = useRef<AbortController | null>(null);
  const threadCursor = useRef<string | null>(null);
  const threadPageCount = useRef(0);
  const threadPageLoading = useRef(false);
  const selectedConversation = useRef(activeId);
  selectedConversation.current = activeId;
  const mounted = useRef(true);
  const lifecycleVersion = useRef(0);
  const messageRequestController = useRef<AbortController | null>(null);
  const messageRequestVersion = useRef(0);
  const loadedConversationId = useRef<string | null>(null);
  const focusedTargetKey = useRef<string | null>(null);
  const focusRequestVersion = useRef(0);
  const mediaComposer = useChatMediaComposer();
  const active = threads.find((thread) => thread.id === activeId) || null;
  const activeMessages = useMemo(() => messages.filter((message) => message.conversationId === activeId), [activeId, messages]);
  const messageActions = useChatMessageActions(userId, activeId, activeMessages);
  const { projectMessage, version: actionVersion } = messageActions;
  const reactions = useChatReactions(userId, messageActions.messages);
  const unread = threads.reduce((sum, thread) => sum + thread.unreadCount, 0);
  const activeContiguousSequence = activeId ? contiguousSequences.current.get(activeId) ?? 0 : 0;
  const lastIncomingSequence = useMemo(() => [...activeMessages].reverse()
    .find((message) => message.senderId !== userId && message.messageSeq <= activeContiguousSequence)?.messageSeq,
  [activeMessages, userId, activeContiguousSequence]);
  const conversationState = !activeId ? "idle" : active ? "ready" : conversationErrorId === activeId ? "error" : "loading";

  function advanceContiguousSequence(conversationId: string, sequences: number[]) {
    let contiguous = contiguousSequences.current.get(conversationId);
    if (contiguous === undefined) return undefined;
    const received = receivedSequences.current.get(conversationId) ?? new Set<number>();
    for (const sequence of sequences) if (sequence > contiguous) received.add(sequence);
    while (received.delete(contiguous + 1)) contiguous += 1;
    for (const sequence of received) if (sequence <= contiguous) received.delete(sequence);
    if (received.size > 1_000) {
      const sorted = [...received].sort((left, right) => left - right);
      sorted.slice(1_000).forEach((sequence) => received.delete(sequence));
    }
    receivedSequences.current.set(conversationId, received);
    contiguousSequences.current.set(conversationId, contiguous);
    return contiguous;
  }
  useEffect(() => chatSendJobs.retainUser(userId), [userId]);
  useEffect(() => {
    if (replyTo && projectMessage(replyTo).deleted) setReplyTo(null);
  }, [replyTo, actionVersion, projectMessage]);
  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false; lifecycleVersion.current += 1;
      threadRequestVersion.current += 1; messageRequestVersion.current += 1; focusRequestVersion.current += 1;
      messageRequestController.current?.abort();
      threadRequestController.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (previousActor.current === userId) return;
    previousActor.current = userId;
    threadRequestController.current?.abort();
    threadRequestController.current = null;
    threadCursor.current = null;
    threadPageCount.current = 0;
    threadPageLoading.current = false;
    setHasMoreThreads(false); setLoadingMoreThreads(false); setThreadPageError(false);
    messageRequestController.current?.abort();
    messageRequestVersion.current += 1;
    focusRequestVersion.current += 1;
    loadedConversationId.current = null;
    focusedTargetKey.current = null;
    recipientIds.current = {};
    membershipVersions.current.clear(); revokedConversations.current.clear(); rejoiningConversations.current.clear();
    observedSequences.current.clear(); snapshotSequences.current.clear(); contiguousSequences.current.clear(); receivedSequences.current.clear(); gapSyncs.current.clear(); acceptedCreations.current.clear(); acceptedMessageSnapshots.current.clear(); threadRequestVersion.current += 1;
    setDraft(""); setReplyTo(null); setSendError(null); setHighlightedSeq(null);
    setFocused(false); setHasMore(false); setLoadingOlder(false);
    setConversationErrorId(null);
  }, [userId]);

  // Both presentation surfaces resolve out-of-page targets through the same API flow.
  useEffect(() => {
    if (!activeId || active || threadState === "loading" || revokedConversations.current.has(activeId)) return;
    const controller = new AbortController();
    const membershipVersion = membershipVersions.current.get(activeId) ?? 0;
    let current = true;
    setConversationErrorId(null);
    void chatApi.conversation(activeId, userId, controller.signal).then((dto) => {
      if (!current || actor.current !== userId || revokedConversations.current.has(activeId) || membershipVersion !== (membershipVersions.current.get(activeId) ?? 0)) return;
      const thread = conversationToThread(dto, userId);
      observedSequences.current.set(thread.id, Math.max(observedSequences.current.get(thread.id) ?? 0, thread.lastMessageSeq ?? 0));
      snapshotSequences.current.set(thread.id, Math.max(snapshotSequences.current.get(thread.id) ?? 0, thread.lastMessageSeq ?? 0));
      chatRealtime.rememberRecipientCursor(thread.id, thread.recipientDeliveredSeq, thread.recipientReadSeq);
      setThreads((items) => items.some((item) => item.id === thread.id) ? items : [thread, ...items]);
    }).catch(() => { if (current && membershipVersion === (membershipVersions.current.get(activeId) ?? 0) && !revokedConversations.current.has(activeId)) setConversationErrorId(activeId); });
    return () => { current = false; controller.abort(); };
  }, [activeId, active, threadState, userId, conversationRevision, setThreads]);
  const retryConversation = useCallback(() => setConversationRevision((value) => value + 1), []);

  const loadThreads = useCallback(async (preferredId?: string) => {
    if (!mounted.current) return;
    const version = ++threadRequestVersion.current;
    threadRequestController.current?.abort();
    const controller = new AbortController();
    threadRequestController.current = controller;
    const previouslyLoadedPages = threadPageCount.current;
    threadCursor.current = null;
    threadPageLoading.current = false;
    setHasMoreThreads(false); setLoadingMoreThreads(false); setThreadPageError(false);
    setThreadState("loading");
    try {
      const page = await chatApi.conversations(userId, undefined, 100, controller.signal);
      if (!mounted.current || controller.signal.aborted || actor.current !== userId || version !== threadRequestVersion.current) return;
      const next = (page.items || []).map((item) => conversationToThread(item, userId)).filter((thread) => {
        if (rejoiningConversations.current.has(thread.id)) {
          rejoiningConversations.current.delete(thread.id); revokedConversations.current.delete(thread.id);
        }
        return !revokedConversations.current.has(thread.id);
      });
      next.forEach((thread) => observedSequences.current.set(thread.id, Math.max(observedSequences.current.get(thread.id) ?? 0, thread.lastMessageSeq ?? 0)));
      next.forEach((thread) => snapshotSequences.current.set(thread.id, Math.max(snapshotSequences.current.get(thread.id) ?? 0, thread.lastMessageSeq ?? 0)));
      next.forEach((thread) => chatRealtime.rememberRecipientCursor(thread.id, thread.recipientDeliveredSeq, thread.recipientReadSeq));
      setThreads((current) => {
        const previous = new Map(current.map((thread) => [thread.id, thread]));
        const advanced = new Map<string, ChatThread>();
        const reconciled = next.map((thread) => {
          const cached = previous.get(thread.id);
          if (!cached || (cached.lastMessageSeq ?? 0) <= (thread.lastMessageSeq ?? 0)) return thread;
          const preserved = { ...thread, lastMessageId: cached.lastMessageId, lastMessageSeq: cached.lastMessageSeq,
            lastMessageAt: cached.lastMessageAt, preview: cached.preview, unreadCount: cached.unreadCount };
          advanced.set(thread.id, preserved);
          return preserved;
        });
        // Accepted creations during the request already moved these threads up.
        const pageIds = new Set(reconciled.map((thread) => thread.id));
        const olderLoadedPages = previouslyLoadedPages > 1
          ? current.filter((thread) => !pageIds.has(thread.id) && !revokedConversations.current.has(thread.id))
          : [];
        return [
          ...current.flatMap((thread) => advanced.has(thread.id) ? [advanced.get(thread.id)!] : []),
          ...reconciled.filter((thread) => !advanced.has(thread.id)),
          ...olderLoadedPages,
        ];
      });
      threadCursor.current = page.nextCursor || null;
      threadPageCount.current = 1;
      setHasMoreThreads(Boolean(page.hasMore && page.nextCursor));
      if (preferredId && !revokedConversations.current.has(preferredId)) setActiveId(preferredId);
      setThreadState("ready");
    } catch {
      if (!mounted.current || controller.signal.aborted || actor.current !== userId || version !== threadRequestVersion.current) return;
      setThreadState("error");
    }
  }, [userId, setThreads]);

  const loadMoreThreads = useCallback(async () => {
    const cursor = threadCursor.current;
    if (!mounted.current || !cursor || threadPageLoading.current) return;
    threadPageLoading.current = true;
    setLoadingMoreThreads(true);
    setThreadPageError(false);
    threadRequestController.current?.abort();
    const controller = new AbortController();
    threadRequestController.current = controller;
    const version = ++threadRequestVersion.current;
    try {
      const page = await chatApi.conversations(userId, cursor, 100, controller.signal);
      if (!mounted.current || controller.signal.aborted || actor.current !== userId || version !== threadRequestVersion.current) return;
      const next = (page.items || []).map((item) => conversationToThread(item, userId)).filter((thread) => {
        if (rejoiningConversations.current.has(thread.id)) {
          rejoiningConversations.current.delete(thread.id); revokedConversations.current.delete(thread.id);
        }
        return !revokedConversations.current.has(thread.id);
      });
      next.forEach((thread) => observedSequences.current.set(thread.id, Math.max(observedSequences.current.get(thread.id) ?? 0, thread.lastMessageSeq ?? 0)));
      next.forEach((thread) => snapshotSequences.current.set(thread.id, Math.max(snapshotSequences.current.get(thread.id) ?? 0, thread.lastMessageSeq ?? 0)));
      next.forEach((thread) => chatRealtime.rememberRecipientCursor(thread.id, thread.recipientDeliveredSeq, thread.recipientReadSeq));
      setThreads((current) => {
        const byId = new Map(current.map((thread) => [thread.id, thread]));
        for (const thread of next) {
          const cached = byId.get(thread.id);
          if (!cached) { byId.set(thread.id, thread); continue; }
          if ((cached.lastMessageSeq ?? 0) > (thread.lastMessageSeq ?? 0)) {
            byId.set(thread.id, { ...thread, lastMessageId: cached.lastMessageId, lastMessageSeq: cached.lastMessageSeq,
              lastMessageAt: cached.lastMessageAt, preview: cached.preview, unreadCount: cached.unreadCount });
          } else byId.set(thread.id, thread);
        }
        return [...byId.values()];
      });
      threadCursor.current = page.nextCursor || null;
      threadPageCount.current += 1;
      setHasMoreThreads(Boolean(page.hasMore && page.nextCursor));
    } catch {
      if (!mounted.current || controller.signal.aborted || actor.current !== userId || version !== threadRequestVersion.current) return;
      setThreadPageError(true);
    } finally {
      if (threadRequestController.current === controller) threadRequestController.current = null;
      if (version === threadRequestVersion.current) {
        threadPageLoading.current = false;
        setLoadingMoreThreads(false);
      }
    }
  }, [setThreads, userId]);

  const loadMessageGap = useCallback((conversationId: string, afterSeq: number, targetSeq: number) => {
    const existing = gapSyncs.current.get(conversationId);
    if (existing) {
      existing.targetSeq = Math.max(existing.targetSeq, targetSeq);
      return existing.promise;
    }
    const membershipVersion = membershipVersions.current.get(conversationId) ?? 0;
    const lifecycle = lifecycleVersion.current;
    const current = () => mounted.current && lifecycle === lifecycleVersion.current && actor.current === userId
      && !revokedConversations.current.has(conversationId)
      && membershipVersion === (membershipVersions.current.get(conversationId) ?? 0);
    const state = { afterSeq, targetSeq, promise: Promise.resolve(false) };
    state.promise = (async () => {
      let cursor = afterSeq;
      while (cursor < state.targetSeq - 1) {
        const page = await chatApi.messagesAfter(conversationId, userId, cursor, 100);
        if (!current()) return false;
        const items = (page.items || []).map(chatMessageToModel).sort((left, right) => left.messageSeq - right.messageSeq);
        if (!items.length) return false;
        setMessages((messages) => mergeMessages(messages, items));
        let nextCursor = cursor;
        for (const message of items) {
          if (message.messageSeq <= nextCursor) continue;
          if (message.messageSeq !== nextCursor + 1) return false;
          nextCursor = message.messageSeq;
        }
        if (nextCursor === cursor) return false;
        cursor = nextCursor;
        const advanced = advanceContiguousSequence(conversationId, items.map((message) => message.messageSeq));
        if (advanced === undefined) contiguousSequences.current.set(conversationId, cursor);
        if (cursor >= state.targetSeq - 1) return true;
        if (!page.hasMore) return false;
      }
      return true;
    })().catch(() => false).finally(() => {
      if (gapSyncs.current.get(conversationId) === state) gapSyncs.current.delete(conversationId);
    });
    gapSyncs.current.set(conversationId, state);
    return state.promise;
  }, [setMessages, userId]);

  const loadMessages = useCallback(async (conversationId: string) => {
    if (!mounted.current || revokedConversations.current.has(conversationId)) return;
    const membershipVersion = membershipVersions.current.get(conversationId) ?? 0;
    const creationsBeforeRequest = creationVersion.current;
    loadedConversationId.current = null;
    messageRequestController.current?.abort();
    const controller = new AbortController();
    const version = ++messageRequestVersion.current;
    messageRequestController.current = controller;
    setMessageState("loading");
    try {
      const page = await chatApi.messages(conversationId, userId, 80, undefined, controller.signal);
      if (!mounted.current || controller.signal.aborted || actor.current !== userId || version !== messageRequestVersion.current || revokedConversations.current.has(conversationId) || membershipVersion !== (membershipVersions.current.get(conversationId) ?? 0)) return;
      const thread = threads.find((item) => item.id === conversationId);
      const next = (page.items || []).map(chatMessageToModel).map((message) => statusFor(message, userId, thread?.recipientDeliveredSeq || 0, thread?.recipientReadSeq || 0));
      const pageIds = new Set(next.map((message) => message.id));
      const acceptedDuringRequest = [...acceptedMessageSnapshots.current.values()]
        .filter((entry) => entry.conversationId === conversationId && entry.version > creationsBeforeRequest && !pageIds.has(entry.message.id))
        .map((entry) => entry.message);
      const pageSequence = next.reduce((maximum, message) => Math.max(maximum, message.messageSeq), 0);
      if (pageSequence > 0) {
        observedSequences.current.set(conversationId, Math.max(observedSequences.current.get(conversationId) ?? 0, pageSequence));
        snapshotSequences.current.set(conversationId, Math.max(snapshotSequences.current.get(conversationId) ?? 0, pageSequence));
        contiguousSequences.current.set(conversationId, Math.max(contiguousSequences.current.get(conversationId) ?? 0, pageSequence));
        advanceContiguousSequence(conversationId, next.map((message) => message.messageSeq));
      }
      setMessages((current) => {
        return mergeMessages(current.filter((message) => message.conversationId !== conversationId), [...next, ...acceptedDuringRequest]);
      });
      loadedConversationId.current = conversationId;
      setHasMore(Boolean(page.hasMore));
      setMessageState("ready");
      for (const accepted of acceptedDuringRequest.sort((left, right) => left.messageSeq - right.messageSeq)) {
        const contiguous = contiguousSequences.current.get(conversationId);
        if (contiguous === undefined || accepted.messageSeq <= contiguous) continue;
        const advanced = advanceContiguousSequence(conversationId, [accepted.messageSeq]);
        if (advanced !== undefined && accepted.messageSeq <= advanced) {
          chatRealtime.acknowledgeDelivered(conversationId, advanced);
        } else {
          void loadMessageGap(conversationId, contiguous, accepted.messageSeq).then((synchronized) => {
            if (!synchronized || revokedConversations.current.has(conversationId)) return;
            const sequence = advanceContiguousSequence(conversationId, [accepted.messageSeq]) ?? accepted.messageSeq;
            contiguousSequences.current.set(conversationId, Math.max(sequence, accepted.messageSeq));
            chatRealtime.acknowledgeDelivered(conversationId, sequence);
          });
        }
      }
      const allSynchronized = [...next, ...acceptedDuringRequest];
      const lastIncoming = allSynchronized.sort((left, right) => left.messageSeq - right.messageSeq).reverse()
        .find((message) => message.senderId !== userId
        && message.messageSeq <= (contiguousSequences.current.get(conversationId) ?? 0));
      if (lastIncoming) chatRealtime.acknowledgeDelivered(conversationId, lastIncoming.messageSeq);
    } catch {
      if (!mounted.current || controller.signal.aborted || actor.current !== userId || version !== messageRequestVersion.current || revokedConversations.current.has(conversationId) || membershipVersion !== (membershipVersions.current.get(conversationId) ?? 0)) return;
      setMessageState("error");
    }
  }, [threads, userId, setMessages]);

  const loadMessagesRef = useRef(loadMessages);
  loadMessagesRef.current = loadMessages;

  useEffect(() => { void loadThreads(); }, [loadThreads]);
  useEffect(() => chatRealtime.subscribeReconnect?.(() => {
    void loadThreads();
    const conversationId = selectedConversation.current;
    if (conversationId && loadedConversationId.current === conversationId) void loadMessagesRef.current(conversationId);
  }), [loadThreads]);
  useEffect(() => { if (activeId) void loadMessages(activeId); else setMessageState("idle"); }, [activeId, userId]);
  useEffect(() => {
    if (!hasMoreThreads) window.dispatchEvent(new CustomEvent("chat-unread-count", { detail: unread }));
  }, [unread, hasMoreThreads]);
  useEffect(() => {
    if (!activeId || !focused || !documentVisible) return;
    if (!lastIncomingSequence) return;
    chatRealtime.acknowledgeRead(activeId, lastIncomingSequence);
    setThreads((current) => current.map((thread) => thread.id === activeId ? { ...thread, unreadCount: 0 } : thread));
  }, [activeId, lastIncomingSequence, focused, documentVisible, userId, setThreads]);
  useEffect(() => chatRealtime.subscribe(userId, handleRealtime), [userId, activeId, focused]);

  function handleRealtime(event: ChatRealtimeEvent) {
    if (!mounted.current || actor.current !== userId) return;
    if (["GROUP_CREATED", "MEMBER_ADDED", "MEMBER_REMOVED", "MEMBER_ROLE_CHANGED"].includes(event.type)) {
      chatRealtime.clearRecipientMemberCursors(event.conversationId);
    }
    if ((event.type === "MEMBER_REMOVED" || event.type === "MEMBER_ADDED") && event.targetUserId === userId) {
      const conversationId = event.conversationId;
      membershipVersions.current.set(conversationId, (membershipVersions.current.get(conversationId) ?? 0) + 1);
      threadRequestVersion.current += 1;
      threadRequestController.current?.abort();
      threadPageLoading.current = false;
      setLoadingMoreThreads(false);
      delete recipientIds.current[conversationId];
      contiguousSequences.current.delete(conversationId);
      receivedSequences.current.delete(conversationId);
      gapSyncs.current.delete(conversationId);
      for (const key of acceptedCreations.current.keys()) if (key.startsWith(`${conversationId}/`)) acceptedCreations.current.delete(key);
      for (const [key, entry] of acceptedMessageSnapshots.current) if (entry.conversationId === conversationId) acceptedMessageSnapshots.current.delete(key);
      revokedConversations.current.add(conversationId);
      setMessages((current) => current.filter((message) => message.conversationId !== conversationId));
      setThreads((current) => current.filter((thread) => thread.id !== event.conversationId));
      if (activeId === conversationId) {
        messageRequestController.current?.abort(); messageRequestVersion.current += 1; focusRequestVersion.current += 1;
        loadedConversationId.current = null; focusedTargetKey.current = null;
        setActiveId(null); setFocused(false); setHasMore(false); setLoadingOlder(false); setHighlightedSeq(null); setReplyTo(null);
      }
      if (event.type === "MEMBER_ADDED") { rejoiningConversations.current.add(conversationId); void loadThreads(); }
      else { rejoiningConversations.current.delete(conversationId); setThreadState("ready"); }
      return;
    }
    if (["GROUP_CREATED", "MEMBER_ADDED", "MEMBER_REMOVED", "MEMBER_ROLE_CHANGED"].includes(event.type)) { void loadThreads(); return; }
    if (revokedConversations.current.has(event.conversationId)) return;
    if (event.type === "MESSAGE_DELETED" && event.message) {
      // A queued creation may arrive as a tombstone if it was recalled before
      // dispatch. Only REST can reconcile its already-persisted summary/unread.
      const observed = observedSequences.current.get(event.conversationId);
      if (observed === undefined || event.message.messageSeq > observed) void loadThreads();
      return;
    }
    if (event.type === "CURSOR_UPDATED" && event.actorId !== userId) {
      chatRealtime.rememberMemberCursor(event.conversationId, event.actorId, event.recipientIds, event.deliveredSeq || 0, event.readSeq || 0);
      const { deliveredSeq: delivered, readSeq: read } = chatRealtime.recipientCursor(event.conversationId);
      setThreads((current) => current.map((thread) => thread.id === event.conversationId ? { ...thread, recipientDeliveredSeq: Math.max(thread.recipientDeliveredSeq, delivered), recipientReadSeq: Math.max(thread.recipientReadSeq, read) } : thread));
      setMessages((current) => current.map((message) => message.conversationId === event.conversationId ? statusFor(message, userId, delivered, read) : message));
      return;
    }
    if (event.type !== "MESSAGE_CREATED" || !event.message) return;
    const incoming = messageActions.projectMessage({ ...event.message } as ChatMessage);
    const contiguous = contiguousSequences.current.get(event.conversationId);
    const pendingGap = gapSyncs.current.get(event.conversationId);
    const needsGapSync = contiguous !== undefined
      && (pendingGap !== undefined || incoming.messageSeq > contiguous + 1);
    const gapSync = needsGapSync
      ? loadMessageGap(event.conversationId, pendingGap?.afterSeq ?? contiguous!, incoming.messageSeq)
      : null;
    const replay = incoming.messageSeq <= (observedSequences.current.get(event.conversationId) ?? 0);
    if (replay) {
      const cached = cachedMessages.current.some((message) => message.conversationId === event.conversationId && message.id === incoming.id);
      // Known rows need no neutral replay overwrite. Unknown rows at/before the
      // authoritative snapshot may belong to a former membership's history.
      if (cached || incoming.messageSeq <= (snapshotSequences.current.get(event.conversationId) ?? 0)) return;
    } else observedSequences.current.set(event.conversationId, incoming.messageSeq);
    acceptedCreations.current.set(`${event.conversationId}/${incoming.id}`, ++creationVersion.current);
    acceptedMessageSnapshots.current.set(`${event.conversationId}/${incoming.id}`, {
      conversationId: event.conversationId,
      version: creationVersion.current,
      message: incoming,
    });
    advanceContiguousSequence(event.conversationId, [incoming.messageSeq]);
    // Broadcast creation DTOs are viewer-neutral. Only REST snapshots and the
    // dedicated reaction events can update the personalized reaction projection.
    for (const field of ["likeCount", "isReact", "myReaction", "reactions", "reactionVersion"] as const) delete incoming[field];
    const own = incoming.senderId === userId;
    const opened = !own && activeId === event.conversationId && focused && document.visibilityState === "visible";
    const acknowledgeAfterProcessing = () => {
      if (gapSync) {
        void gapSync.then((synchronized) => {
          if (!synchronized || !mounted.current || actor.current !== userId
              || revokedConversations.current.has(event.conversationId)) return;
          const sequence = advanceContiguousSequence(event.conversationId, [incoming.messageSeq]) ?? incoming.messageSeq;
          chatRealtime.acknowledgeDelivered(event.conversationId, sequence);
        });
        return;
      }
      const sequence = contiguousSequences.current.get(event.conversationId);
      if (sequence !== undefined && sequence > (contiguous ?? 0)) {
        chatRealtime.acknowledgeDelivered(event.conversationId, sequence);
      }
    };
    if (incoming.messageType === "STORY_REPLY" && activeId === event.conversationId) {
      void loadMessages(event.conversationId);
    } else {
      setMessages((current) => mergeMessages(current, [{ ...incoming, status: own ? chatRealtime.outgoingStatus(event.conversationId, incoming.messageSeq) : incoming.status }]));
    }
    // Out-of-order messages after the snapshot can fill cache gaps. Summary,
    // unread and cursor changes belong only to advancing creations.
    if (replay) {
      acknowledgeAfterProcessing();
      return;
    }
    setThreads((current) => {
      const existing = current.find((thread) => thread.id === event.conversationId);
      if (!existing) { void loadThreads(); return current; }
      const preview = incoming.deleted ? "Tin nhắn đã được thu hồi" : incoming.content?.trim() || (incoming.messageType === "IMAGE" ? "Đã gửi một ảnh" : incoming.messageType === "AUDIO" ? "Đã gửi một tin nhắn thoại" : "Tin nhắn mới");
      if (incoming.messageSeq <= (existing.lastMessageSeq ?? 0)) return current;
      const updated = { ...existing, lastMessageId: incoming.id, lastMessageSeq: incoming.messageSeq, lastMessageAt: incoming.createdAt ?? existing.lastMessageAt,
        preview: own ? `Bạn: ${preview}` : preview, unreadCount: own || opened ? 0 : existing.unreadCount + 1 };
      return [updated, ...current.filter((thread) => thread.id !== updated.id)];
    });
    acknowledgeAfterProcessing();
  }

  async function getRecipients(conversationId: string) {
    const membershipVersion = membershipVersions.current.get(conversationId) ?? 0;
    const lifecycle = lifecycleVersion.current;
    if (!mounted.current || revokedConversations.current.has(conversationId)) throw new Error("Conversation membership changed");
    if (recipientIds.current[conversationId]) return recipientIds.current[conversationId];
    const details = await chatApi.details(conversationId, userId);
    if (!mounted.current || lifecycle !== lifecycleVersion.current || actor.current !== userId || revokedConversations.current.has(conversationId) || membershipVersion !== (membershipVersions.current.get(conversationId) ?? 0)) throw new Error("Conversation membership changed");
    const ids = details.members.map((member) => member.userId).filter((id) => id !== userId);
    recipientIds.current[conversationId] = ids;
    return ids;
  }

  async function send() {
    if (!mounted.current || !activeId || revokedConversations.current.has(activeId) || active?.isDissolved || sending || mediaComposer.recording) return;
    const membershipVersion = membershipVersions.current.get(activeId) ?? 0;
    const lifecycle = lifecycleVersion.current;
    const isCurrent = () => mounted.current && lifecycle === lifecycleVersion.current && actor.current === userId && !revokedConversations.current.has(activeId) && membershipVersion === (membershipVersions.current.get(activeId) ?? 0);
    const text = draft.trim();
    const images = [...mediaComposer.images];
    const audio = mediaComposer.audioAttachment;
    let audioPending = Boolean(audio);
    if (!text && !images.length && !audio) return;
    setSendError(null);
    setSending(true);
    const reply = replyTo;
    setDraft("");
    setReplyTo(null);
    try {
      const recipients = await getRecipients(activeId);
      const sendOne = async (messageType: string, content: string | null, metadata: Record<string, unknown> | null,
        replyToSeq: number | null | undefined, jobKey: string) => {
        if (!isCurrent()) throw new Error("Conversation membership changed");
        const result = chatMessageToModel(await chatApi.send(activeId, userId, { clientMessageId: chatSendJobs.clientMessageId(jobKey), messageType, content, metadata, replyToSeq: replyToSeq || null, recipientId: recipients.length === 1 ? recipients[0] : null, recipientIds: recipients.length > 1 ? recipients : null }));
        chatSendJobs.complete(jobKey);
        if (!isCurrent()) throw new Error("Conversation membership changed");
        const presented = { ...result, status: chatRealtime.outgoingStatus(activeId, result.messageSeq) as ChatMessage["status"] };
        setMessages((current) => mergeMessages(current, [presented]));
        chatRealtime.publishLocalMessage(presented);
        return presented;
      };
      for (let index = 0; index < images.length; index += 1) {
        const image = images[index];
        const jobKey = mediaSendJobKey(userId, activeId, image.id);
        mediaComposer.updateImageState(image.id, { status: "uploading", progress: 20 });
        const uploaded = await chatSendJobs.upload(jobKey, () => uploadCloudinaryMedia(image.file));
        await sendOne("IMAGE", null, { url: uploaded.secureUrl, publicId: uploaded.publicId, mimeType: image.file.type, size: image.file.size, fileName: image.file.name, width: uploaded.width, height: uploaded.height }, index === 0 ? reply?.messageSeq ?? null : null, jobKey);
        mediaComposer.updateImageState(image.id, { status: "uploading", progress: 100 });
        mediaComposer.removeImage(image.id);
      }
      if (audio) {
        const jobKey = mediaSendJobKey(userId, activeId, audio.id);
        const uploaded = await chatSendJobs.upload(jobKey, () => uploadCloudinaryMedia(audio.file));
        await sendOne("AUDIO", null, { url: uploaded.secureUrl, publicId: uploaded.publicId, mimeType: audio.file.type, size: audio.file.size, fileName: audio.file.name, duration: audio.duration }, reply?.messageSeq ?? null, jobKey);
        mediaComposer.clearAudio();
        audioPending = false;
      }
      if (text) {
        const jobKey = textSendJobKey(userId, activeId, text);
        const proposedReply = images.length || audio ? null : reply?.messageSeq ?? null;
        const stableReply = chatSendJobs.textReplyToSeq(jobKey, proposedReply);
        await sendOne("TEXT", text, null, stableReply, jobKey);
      }
      mediaComposer.clearImages();
    } catch (error) {
      if (!isCurrent()) return;
      images.forEach((image) => mediaComposer.updateImageState(image.id, {
        status: "failed",
        progress: 0,
        error: formatSendError(error, audioPending),
      }));
      setDraft(text);
      setReplyTo(reply);
      setSendError(formatSendError(error, audioPending));
    } finally {
      if (mounted.current && lifecycle === lifecycleVersion.current && actor.current === userId) setSending(false);
    }
  }

  async function loadOlder() {
    if (!activeId || revokedConversations.current.has(activeId) || loadingOlder || !hasMore || !activeMessages.length) return;
    const membershipVersion = membershipVersions.current.get(activeId) ?? 0;
    const version = messageRequestVersion.current;
    const isCurrent = () => mounted.current && actor.current === userId && selectedConversation.current === activeId && version === messageRequestVersion.current && !revokedConversations.current.has(activeId) && membershipVersion === (membershipVersions.current.get(activeId) ?? 0);
    setLoadingOlder(true);
    try {
      const first = activeMessages[0].messageSeq;
      const page = await chatApi.messages(activeId, userId, 50, first);
      if (!isCurrent()) return;
      setMessages((current) => mergeMessages(current, (page.items || []).map(chatMessageToModel)));
      setHasMore(Boolean(page.hasMore));
    } catch (error) {
      if (isCurrent()) throw error;
    } finally {
      if (isCurrent()) setLoadingOlder(false);
    }
  }

  const focusMessage = useCallback(async (target: number | string) => {
    if (!activeId || revokedConversations.current.has(activeId)) return;
    const membershipVersion = membershipVersions.current.get(activeId) ?? 0;
    const version = messageRequestVersion.current;
    const focusVersion = ++focusRequestVersion.current;
    const isCurrent = () => mounted.current && actor.current === userId && selectedConversation.current === activeId && version === messageRequestVersion.current && focusVersion === focusRequestVersion.current && !revokedConversations.current.has(activeId) && membershipVersion === (membershipVersions.current.get(activeId) ?? 0);
    const matches = (message: ChatMessage) => typeof target === "number" ? message.messageSeq === target : message.id === target;
    let loaded = activeMessages;
    let cursor = loaded[0]?.messageSeq;
    let more = hasMore;
    while (!loaded.some(matches) && more && cursor && (typeof target === "string" || cursor > target)) {
      let page;
      try { page = await chatApi.messages(activeId, userId, 100, cursor); }
      catch (error) { if (!isCurrent()) return; throw error; }
      if (!isCurrent()) return;
      loaded = mergeMessages(loaded, (page.items || []).map(chatMessageToModel));
      const nextCursor = loaded[0]?.messageSeq;
      if (!nextCursor || nextCursor >= cursor) break;
      cursor = nextCursor;
      more = page.hasMore;
    }
    if (!isCurrent()) return;
    const message = loaded.find(matches);
    if (!message) return;
    setMessages((current) => mergeMessages(current, loaded));
    setHighlightedSeq(message.messageSeq);
    window.setTimeout(() => { if (isCurrent()) setHighlightedSeq(null); }, 3600);
  }, [activeId, activeMessages, hasMore, userId, setMessages]);

  useEffect(() => {
    if (!activeId || initialTarget?.conversationId !== activeId) {
      if (focusedTargetKey.current) { focusedTargetKey.current = null; focusRequestVersion.current += 1; setHighlightedSeq(null); }
      return;
    }
    const target = initialTarget.messageSeq ?? initialTarget.messageId;
    if (target === undefined) {
      if (focusedTargetKey.current) { focusedTargetKey.current = null; focusRequestVersion.current += 1; setHighlightedSeq(null); }
      return;
    }
    if (messageState !== "ready" || loadedConversationId.current !== activeId || conversationState !== "ready") return;
    const key = `${activeId}:${target}:${initialTarget.nonce ?? ""}`;
    if (focusedTargetKey.current === key) return;
    focusedTargetKey.current = key;
    void focusMessage(target).catch(() => { if (focusedTargetKey.current === key) focusedTargetKey.current = null; });
  }, [initialTarget?.conversationId, initialTarget?.messageSeq, initialTarget?.messageId, initialTarget?.nonce, activeId, messageState, conversationState, focusMessage]);

  const openConversation = useCallback((conversationId: string) => {
    if (revokedConversations.current.has(conversationId)) return;
    restoredTarget.current = { conversationId };
    writeStoredFullChatTarget({ conversationId });
    setActiveId(conversationId);
    setFocused(false);
  }, []);

  const closeConversation = useCallback(() => {
    messageRequestVersion.current += 1;
    messageRequestController.current?.abort();
    restoredTarget.current = null;
    clearStoredFullChatTarget();
    setActiveId(null);
    setFocused(false);
    setReplyTo(null);
  }, []);

  return { ...messageActions, threads: threads.map((thread) => thread.lastMessageId && messageActions.isMessageDeleted(thread.id, thread.lastMessageId) ? { ...thread, preview: "Tin nhắn đã được thu hồi" } : thread), active, activeId, activeMessages: reactions.messages, selectReaction: reactions.select, userId, threadState, hasMoreThreads, loadingMoreThreads, threadPageError, loadMoreThreads, conversationState, retryConversation, messageState, hasMore, loadingOlder, sending, sendError, draft, setDraft, replyTo, setReplyTo, focused, setFocused, highlightedSeq, unread, mediaComposer, loadThreads, loadMessages, loadOlder, focusMessage, openConversation, closeConversation, send };
}
