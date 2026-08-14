import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { uploadCloudinaryMedia } from "../../../shared/api";
import { chatRealtime, type ChatRealtimeEvent } from "../services/chatRealtime";
import { useChatMediaComposer } from "./useChatMediaComposer";
import { chatApi } from "../api/chat.api";
import { chatMessageToModel, conversationToThread } from "../model/chat.mapper";
import { clearStoredFullChatTarget, readStoredFullChatTarget, writeStoredFullChatTarget } from "../model/chatNavigationPersistence";
import type { ChatMessage, ChatNavigationTarget, ChatReply, ChatThread } from "../model/chat.types";

function uuid() { return crypto.randomUUID(); }
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

export function useChatController(userId: string, initialTarget?: ChatNavigationTarget | null) {
  const restoredTarget = useRef<ChatNavigationTarget | null>(initialTarget ?? readStoredFullChatTarget());
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(restoredTarget.current?.conversationId || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadState, setThreadState] = useState<"loading" | "ready" | "error">("loading");
  const [messageState, setMessageState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [hasMore, setHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [focused, setFocused] = useState(false);
  const [highlightedSeq, setHighlightedSeq] = useState<number | null>(null);
  const recipientIds = useRef<Record<string, string[]>>({});
  const messageRequestController = useRef<AbortController | null>(null);
  const messageRequestVersion = useRef(0);
  const mediaComposer = useChatMediaComposer();
  const active = threads.find((thread) => thread.id === activeId) || null;
  const activeMessages = useMemo(() => messages.filter((message) => message.conversationId === activeId), [activeId, messages]);
  const unread = threads.reduce((sum, thread) => sum + thread.unreadCount, 0);

  const loadThreads = useCallback(async (preferredId?: string) => {
    setThreadState("loading");
    try {
      const page = await chatApi.conversations(userId);
      const next = (page.items || []).map((item) => conversationToThread(item, userId));
      next.forEach((thread) => chatRealtime.rememberRecipientCursor(thread.id, thread.recipientDeliveredSeq, thread.recipientReadSeq));
      setThreads(next);
      if (preferredId) setActiveId(preferredId);
      setThreadState("ready");
    } catch {
      setThreadState("error");
    }
  }, [userId]);

  const loadMessages = useCallback(async (conversationId: string) => {
    messageRequestController.current?.abort();
    const controller = new AbortController();
    const version = ++messageRequestVersion.current;
    messageRequestController.current = controller;
    setMessageState("loading");
    try {
      const page = await chatApi.messages(conversationId, userId, 80, undefined, controller.signal);
      if (controller.signal.aborted || version !== messageRequestVersion.current) return;
      const thread = threads.find((item) => item.id === conversationId);
      const next = (page.items || []).map(chatMessageToModel).map((message) => statusFor(message, userId, thread?.recipientDeliveredSeq || 0, thread?.recipientReadSeq || 0));
      setMessages((current) => mergeMessages(current.filter((message) => message.conversationId !== conversationId), next));
      setHasMore(Boolean(page.hasMore));
      setMessageState("ready");
      const lastIncoming = [...next].reverse().find((message) => message.senderId !== userId);
      if (lastIncoming) chatRealtime.acknowledgeDelivered(conversationId, lastIncoming.messageSeq);
    } catch {
      if (controller.signal.aborted || version !== messageRequestVersion.current) return;
      setMessageState("error");
    }
  }, [threads, userId]);

  useEffect(() => { void loadThreads(); }, [loadThreads]);
  useEffect(() => { if (activeId) void loadMessages(activeId); else setMessageState("idle"); }, [activeId]);
  useEffect(() => () => messageRequestController.current?.abort(), []);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("chat-unread-count", { detail: unread }));
  }, [unread]);
  useEffect(() => {
    if (!activeId || !focused || document.visibilityState !== "visible") return;
    const lastIncoming = [...activeMessages].reverse().find((message) => message.senderId !== userId);
    if (!lastIncoming) return;
    chatRealtime.acknowledgeRead(activeId, lastIncoming.messageSeq);
    setThreads((current) => current.map((thread) => thread.id === activeId ? { ...thread, unreadCount: 0 } : thread));
  }, [activeId, activeMessages, focused, userId]);
  useEffect(() => chatRealtime.subscribe(userId, handleRealtime), [userId, activeId, focused]);

  function handleRealtime(event: ChatRealtimeEvent) {
    if (event.type === "GROUP_CREATED" || event.type === "MEMBER_ADDED") { void loadThreads(); return; }
    if (event.type === "MEMBER_REMOVED" && event.targetUserId === userId) {
      setThreads((current) => current.filter((thread) => thread.id !== event.conversationId));
      if (activeId === event.conversationId) setActiveId(null);
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
    const incoming = event.message as ChatMessage;
    const own = incoming.senderId === userId;
    const opened = !own && activeId === event.conversationId && focused && document.visibilityState === "visible";
    if (incoming.messageType === "STORY_REPLY" && activeId === event.conversationId) {
      void loadMessages(event.conversationId);
    } else {
      setMessages((current) => mergeMessages(current, [{ ...incoming, status: own ? chatRealtime.outgoingStatus(event.conversationId, incoming.messageSeq) : incoming.status }]));
    }
    setThreads((current) => {
      const existing = current.find((thread) => thread.id === event.conversationId);
      if (!existing) { void loadThreads(event.conversationId); return current; }
      const preview = incoming.content?.trim() || (incoming.messageType === "IMAGE" ? "Đã gửi một ảnh" : incoming.messageType === "AUDIO" ? "Đã gửi một tin nhắn thoại" : "Tin nhắn mới");
      const updated = { ...existing, preview: own ? `Bạn: ${preview}` : preview, unreadCount: own || opened ? 0 : existing.unreadCount + 1 };
      return [updated, ...current.filter((thread) => thread.id !== updated.id)];
    });
    if (opened) chatRealtime.acknowledgeRead(event.conversationId, incoming.messageSeq);
  }

  async function getRecipients(conversationId: string) {
    if (recipientIds.current[conversationId]) return recipientIds.current[conversationId];
    const details = await chatApi.details(conversationId, userId);
    const ids = details.members.map((member) => member.userId).filter((id) => id !== userId);
    recipientIds.current[conversationId] = ids;
    return ids;
  }

  async function send() {
    if (!activeId || active?.isDissolved || sending || mediaComposer.recording) return;
    const text = draft.trim();
    const images = [...mediaComposer.images];
    const audio = mediaComposer.audioAttachment;
    if (!text && !images.length && !audio) return;
    setSending(true);
    const reply = replyTo;
    setDraft("");
    setReplyTo(null);
    try {
      const recipients = await getRecipients(activeId);
      const sendOne = async (messageType: string, content: string | null, metadata: Record<string, unknown> | null, replyToSeq?: number | null) => {
        const result = chatMessageToModel(await chatApi.send(activeId, userId, { clientMessageId: uuid(), messageType, content, metadata, replyToSeq: replyToSeq || null, recipientId: recipients.length === 1 ? recipients[0] : null, recipientIds: recipients.length > 1 ? recipients : null }));
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
      }
      if (audio) {
        const uploaded = await uploadCloudinaryMedia(audio.file);
        await sendOne("AUDIO", null, { url: uploaded.secureUrl, publicId: uploaded.publicId, mimeType: audio.file.type, size: audio.file.size, fileName: audio.file.name, duration: audio.duration }, reply?.messageSeq);
      }
      if (text) await sendOne("TEXT", text, null, images.length || audio ? null : reply?.messageSeq);
      mediaComposer.clearImages();
      mediaComposer.clearAudio();
    } catch {
      setDraft(text);
      setReplyTo(reply);
    } finally {
      setSending(false);
    }
  }

  async function loadOlder() {
    if (!activeId || loadingOlder || !hasMore || !activeMessages.length) return;
    setLoadingOlder(true);
    try {
      const first = activeMessages[0].messageSeq;
      const page = await chatApi.messages(activeId, userId, 50, first);
      setMessages((current) => mergeMessages(current, (page.items || []).map(chatMessageToModel)));
      setHasMore(Boolean(page.hasMore));
    } finally {
      setLoadingOlder(false);
    }
  }

  async function focusMessage(sequence: number) {
    if (!activeId) return;
    let loaded = activeMessages;
    let cursor = loaded[0]?.messageSeq;
    while (!loaded.some((message) => message.messageSeq === sequence) && cursor && cursor > sequence) {
      const page = await chatApi.messages(activeId, userId, 100, cursor);
      loaded = mergeMessages(loaded, (page.items || []).map(chatMessageToModel));
      cursor = loaded[0]?.messageSeq;
      if (!page.hasMore) break;
    }
    setMessages((current) => mergeMessages(current, loaded));
    setHighlightedSeq(sequence);
    window.setTimeout(() => setHighlightedSeq(null), 3600);
  }

  function openConversation(conversationId: string) {
    restoredTarget.current = { conversationId };
    writeStoredFullChatTarget({ conversationId });
    setActiveId(conversationId);
    setFocused(false);
  }

  function closeConversation() {
    restoredTarget.current = null;
    clearStoredFullChatTarget();
    setActiveId(null);
    setFocused(false);
    setReplyTo(null);
  }

  return { threads, active, activeId, activeMessages, threadState, messageState, hasMore, loadingOlder, sending, draft, setDraft, replyTo, setReplyTo, focused, setFocused, highlightedSeq, unread, mediaComposer, loadThreads, loadMessages, loadOlder, focusMessage, openConversation, closeConversation, send };
}
