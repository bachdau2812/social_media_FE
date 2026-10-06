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

function uuid() { return crypto.randomUUID(); }
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
  const [messageState, setMessageState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [hasMore, setHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [focused, setFocused] = useState(false);
  const [highlightedSeq, setHighlightedSeq] = useState<number | null>(null);
  const [conversationErrorId, setConversationErrorId] = useState<string | null>(null);
  const [conversationRevision, setConversationRevision] = useState(0);
  const recipientIds = useRef<Record<string, string[]>>({});
  const membershipVersions = useRef(new Map<string, number>());
  const revokedConversations = useRef(new Set<string>());
  const rejoiningConversations = useRef(new Set<string>());
  const observedSequences = useRef(new Map<string, number>());
  const snapshotSequences = useRef(new Map<string, number>());
  const creationVersion = useRef(0);
  const acceptedCreations = useRef(new Map<string, number>());
  const threadRequestVersion = useRef(0);
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
  const lastIncomingSequence = useMemo(() => [...activeMessages].reverse().find((message) => message.senderId !== userId)?.messageSeq, [activeMessages, userId]);
  const conversationState = !activeId ? "idle" : active ? "ready" : conversationErrorId === activeId ? "error" : "loading";
  useEffect(() => {
    if (replyTo && projectMessage(replyTo).deleted) setReplyTo(null);
  }, [replyTo, actionVersion, projectMessage]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false; lifecycleVersion.current += 1;
      threadRequestVersion.current += 1; messageRequestVersion.current += 1; focusRequestVersion.current += 1;
      messageRequestController.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (previousActor.current === userId) return;
    previousActor.current = userId;
    messageRequestController.current?.abort();
    messageRequestVersion.current += 1;
    focusRequestVersion.current += 1;
    loadedConversationId.current = null;
    focusedTargetKey.current = null;
    recipientIds.current = {};
    membershipVersions.current.clear(); revokedConversations.current.clear(); rejoiningConversations.current.clear();
    observedSequences.current.clear(); snapshotSequences.current.clear(); acceptedCreations.current.clear(); threadRequestVersion.current += 1;
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
    setThreadState("loading");
    try {
      const page = await chatApi.conversations(userId);
      if (!mounted.current || actor.current !== userId || version !== threadRequestVersion.current) return;
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
        return [...current.flatMap((thread) => advanced.has(thread.id) ? [advanced.get(thread.id)!] : []), ...reconciled.filter((thread) => !advanced.has(thread.id))];
      });
      if (preferredId && !revokedConversations.current.has(preferredId)) setActiveId(preferredId);
      setThreadState("ready");
    } catch {
      if (!mounted.current || actor.current !== userId || version !== threadRequestVersion.current) return;
      setThreadState("error");
    }
  }, [userId, setThreads]);

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
      observedSequences.current.set(conversationId, Math.max(observedSequences.current.get(conversationId) ?? 0, ...next.map((message) => message.messageSeq)));
      setMessages((current) => {
        const pageIds = new Set(next.map((message) => message.id));
        const acceptedDuringRequest = current.filter((message) => message.conversationId === conversationId && !pageIds.has(message.id)
          && (acceptedCreations.current.get(`${conversationId}/${message.id}`) ?? 0) > creationsBeforeRequest);
        return mergeMessages(current.filter((message) => message.conversationId !== conversationId), [...next, ...acceptedDuringRequest]);
      });
      loadedConversationId.current = conversationId;
      setHasMore(Boolean(page.hasMore));
      setMessageState("ready");
      const lastIncoming = [...next].reverse().find((message) => message.senderId !== userId);
      if (lastIncoming) chatRealtime.acknowledgeDelivered(conversationId, lastIncoming.messageSeq);
    } catch {
      if (!mounted.current || controller.signal.aborted || actor.current !== userId || version !== messageRequestVersion.current || revokedConversations.current.has(conversationId) || membershipVersion !== (membershipVersions.current.get(conversationId) ?? 0)) return;
      setMessageState("error");
    }
  }, [threads, userId, setMessages]);

  useEffect(() => { void loadThreads(); }, [loadThreads]);
  useEffect(() => chatRealtime.subscribeReconnect?.(() => { void loadThreads(); }), [loadThreads]);
  useEffect(() => { if (activeId) void loadMessages(activeId); else setMessageState("idle"); }, [activeId, userId]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("chat-unread-count", { detail: unread }));
  }, [unread]);
  useEffect(() => {
    if (!activeId || !focused || document.visibilityState !== "visible") return;
    if (!lastIncomingSequence) return;
    chatRealtime.acknowledgeRead(activeId, lastIncomingSequence);
    setThreads((current) => current.map((thread) => thread.id === activeId ? { ...thread, unreadCount: 0 } : thread));
  }, [activeId, lastIncomingSequence, focused, userId, setThreads]);
  useEffect(() => chatRealtime.subscribe(userId, handleRealtime), [userId, activeId, focused]);

  function handleRealtime(event: ChatRealtimeEvent) {
    if (!mounted.current || actor.current !== userId) return;
    if ((event.type === "MEMBER_REMOVED" || event.type === "MEMBER_ADDED") && event.targetUserId === userId) {
      const conversationId = event.conversationId;
      membershipVersions.current.set(conversationId, (membershipVersions.current.get(conversationId) ?? 0) + 1);
      threadRequestVersion.current += 1;
      delete recipientIds.current[conversationId];
      for (const key of acceptedCreations.current.keys()) if (key.startsWith(`${conversationId}/`)) acceptedCreations.current.delete(key);
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
    if (event.type === "GROUP_CREATED" || event.type === "MEMBER_ADDED") { void loadThreads(); return; }
    if (revokedConversations.current.has(event.conversationId)) return;
    if (event.type === "MESSAGE_DELETED" && event.message) {
      // A queued creation may arrive as a tombstone if it was recalled before
      // dispatch. Only REST can reconcile its already-persisted summary/unread.
      const observed = observedSequences.current.get(event.conversationId);
      if (observed === undefined || event.message.messageSeq > observed) void loadThreads();
      return;
    }
    if (event.type === "CURSOR_UPDATED" && event.actorId !== userId) {
      const delivered = event.deliveredSeq || 0;
      const read = event.readSeq || 0;
      setThreads((current) => current.map((thread) => thread.id === event.conversationId ? { ...thread, recipientDeliveredSeq: Math.max(thread.recipientDeliveredSeq, delivered), recipientReadSeq: Math.max(thread.recipientReadSeq, read) } : thread));
      setMessages((current) => current.map((message) => message.conversationId === event.conversationId ? statusFor(message, userId, delivered, read) : message));
      return;
    }
    if (event.type !== "MESSAGE_CREATED" || !event.message) return;
    const incoming = messageActions.projectMessage({ ...event.message } as ChatMessage);
    const replay = incoming.messageSeq <= (observedSequences.current.get(event.conversationId) ?? 0);
    if (replay) {
      const cached = cachedMessages.current.some((message) => message.conversationId === event.conversationId && message.id === incoming.id);
      // Known rows need no neutral replay overwrite. Unknown rows at/before the
      // authoritative snapshot may belong to a former membership's history.
      if (cached || incoming.messageSeq <= (snapshotSequences.current.get(event.conversationId) ?? 0)) return;
    } else observedSequences.current.set(event.conversationId, incoming.messageSeq);
    acceptedCreations.current.set(`${event.conversationId}/${incoming.id}`, ++creationVersion.current);
    // Broadcast creation DTOs are viewer-neutral. Only REST snapshots and the
    // dedicated reaction events can update the personalized reaction projection.
    for (const field of ["likeCount", "isReact", "myReaction", "reactions", "reactionVersion"] as const) delete incoming[field];
    const own = incoming.senderId === userId;
    const opened = !own && activeId === event.conversationId && focused && document.visibilityState === "visible";
    if (incoming.messageType === "STORY_REPLY" && activeId === event.conversationId) {
      void loadMessages(event.conversationId);
    } else {
      setMessages((current) => mergeMessages(current, [{ ...incoming, status: own ? chatRealtime.outgoingStatus(event.conversationId, incoming.messageSeq) : incoming.status }]));
    }
    // Out-of-order messages after the snapshot can fill cache gaps. Summary,
    // unread and cursor changes belong only to advancing creations.
    if (replay) return;
    setThreads((current) => {
      const existing = current.find((thread) => thread.id === event.conversationId);
      if (!existing) { void loadThreads(); return current; }
      const preview = incoming.deleted ? "Tin nhắn đã được thu hồi" : incoming.content?.trim() || (incoming.messageType === "IMAGE" ? "Đã gửi một ảnh" : incoming.messageType === "AUDIO" ? "Đã gửi một tin nhắn thoại" : "Tin nhắn mới");
      if (incoming.messageSeq <= (existing.lastMessageSeq ?? 0)) return current;
      const updated = { ...existing, lastMessageId: incoming.id, lastMessageSeq: incoming.messageSeq, lastMessageAt: incoming.createdAt ?? existing.lastMessageAt,
        preview: own ? `Bạn: ${preview}` : preview, unreadCount: own || opened ? 0 : existing.unreadCount + 1 };
      return [updated, ...current.filter((thread) => thread.id !== updated.id)];
    });
    if (opened) chatRealtime.acknowledgeRead(event.conversationId, incoming.messageSeq);
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
      const sendOne = async (messageType: string, content: string | null, metadata: Record<string, unknown> | null, replyToSeq?: number | null) => {
        if (!isCurrent()) throw new Error("Conversation membership changed");
        const result = chatMessageToModel(await chatApi.send(activeId, userId, { clientMessageId: uuid(), messageType, content, metadata, replyToSeq: replyToSeq || null, recipientId: recipients.length === 1 ? recipients[0] : null, recipientIds: recipients.length > 1 ? recipients : null }));
        if (!isCurrent()) throw new Error("Conversation membership changed");
        const presented = { ...result, status: chatRealtime.outgoingStatus(activeId, result.messageSeq) as ChatMessage["status"] };
        setMessages((current) => mergeMessages(current, [presented]));
        chatRealtime.publishLocalMessage(presented);
        return presented;
      };
      for (let index = 0; index < images.length; index += 1) {
        const image = images[index];
        mediaComposer.updateImageState(image.id, { status: "uploading", progress: 20 });
        const uploaded = await uploadCloudinaryMedia(image.file);
        await sendOne("IMAGE", null, { url: uploaded.secureUrl, publicId: uploaded.publicId, mimeType: image.file.type, size: image.file.size, fileName: image.file.name, width: uploaded.width, height: uploaded.height }, index === 0 ? reply?.messageSeq : null);
        mediaComposer.updateImageState(image.id, { status: "uploading", progress: 100 });
        mediaComposer.removeImage(image.id);
      }
      if (audio) {
        const uploaded = await uploadCloudinaryMedia(audio.file);
        await sendOne("AUDIO", null, { url: uploaded.secureUrl, publicId: uploaded.publicId, mimeType: audio.file.type, size: audio.file.size, fileName: audio.file.name, duration: audio.duration }, reply?.messageSeq);
        mediaComposer.clearAudio();
        audioPending = false;
      }
      if (text) await sendOne("TEXT", text, null, images.length || audio ? null : reply?.messageSeq);
      mediaComposer.clearImages();
    } catch (error) {
      if (!isCurrent()) return;
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

  return { ...messageActions, threads: threads.map((thread) => thread.lastMessageId && messageActions.isMessageDeleted(thread.id, thread.lastMessageId) ? { ...thread, preview: "Tin nhắn đã được thu hồi" } : thread), active, activeId, activeMessages: reactions.messages, selectReaction: reactions.select, userId, threadState, conversationState, retryConversation, messageState, hasMore, loadingOlder, sending, sendError, draft, setDraft, replyTo, setReplyTo, focused, setFocused, highlightedSeq, unread, mediaComposer, loadThreads, loadMessages, loadOlder, focusMessage, openConversation, closeConversation, send };
}
