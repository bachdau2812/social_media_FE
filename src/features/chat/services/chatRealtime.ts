import { API_BASE_URL } from "../../../shared/api";
import type { MessageReactionFields, ReactionState } from "../model/chatReactions";

export type RealtimeChatMessage = MessageReactionFields & {
  id: string;
  conversationId: string;
  messageSeq: number;
  clientMessageId?: string | null;
  senderId: string;
  senderDisplayName?: string | null;
  senderAvatarUrl?: string | null;
  messageType: string;
  content?: string | null;
  metadata?: { url?: string | null; publicId?: string | null; mimeType?: string | null; size?: number | null; fileName?: string | null; width?: number | null; height?: number | null; duration?: number | null; thumbnailUrl?: string | null; title?: string | null; description?: string | null } | null;
  replyToSeq?: number | null;
  reply?: { messageSeq: number; senderId?: string | null; senderDisplayName?: string | null; messageType?: string | null; content?: string | null; metadata?: RealtimeChatMessage["metadata"]; deleted?: boolean } | null;
  createdAt?: string | null;
  editedAt?: string | null;
  deleted?: boolean;
  forwarded?: boolean;
};

export type ChatRealtimeEvent = {
  type: "MESSAGE_CREATED" | "CURSOR_UPDATED" | "GROUP_CREATED" | "MEMBER_ADDED" | "MEMBER_REMOVED" | "MEMBER_ROLE_CHANGED" | "MESSAGE_REACTION_CHANGED" | "MESSAGE_DELETED" | "PINS_CHANGED";
  eventId: string;
  conversationId: string;
  actorId: string;
  targetUserId?: string | null;
  recipientIds: string[];
  message?: RealtimeChatMessage | null;
  deliveredSeq?: number | null;
  readSeq?: number | null;
  reactionState?: ReactionState | null;
  pinVersion?: number | null;
};

export class ChatRealtimeEventDeduplicator {
  private readonly recentIds = new Map<string, true>();

  constructor(private readonly capacity = 1_000) {}

  shouldIgnore(eventId: string | null | undefined): boolean {
    if (!eventId) return false;
    if (this.recentIds.has(eventId)) return true;

    this.recentIds.set(eventId, true);
    if (this.recentIds.size > this.capacity) {
      const oldest = this.recentIds.keys().next().value;
      if (oldest) this.recentIds.delete(oldest);
    }
    return false;
  }

  clear() {
    this.recentIds.clear();
  }
}

type RecipientCursor = { deliveredSeq: number; readSeq: number };

export class ChatRecipientCursorTracker {
  private readonly aggregateSnapshots = new Map<string, RecipientCursor>();
  private readonly memberCursors = new Map<string, Map<string, RecipientCursor>>();
  private readonly activePeerIds = new Map<string, Set<string>>();

  rememberAggregate(conversationId: string, deliveredSeq = 0, readSeq = 0) {
    const current = this.aggregateSnapshots.get(conversationId) ?? { deliveredSeq: 0, readSeq: 0 };
    this.aggregateSnapshots.set(conversationId, {
      deliveredSeq: Math.max(current.deliveredSeq, deliveredSeq),
      readSeq: Math.max(current.readSeq, readSeq),
    });
  }

  rememberMember(conversationId: string, viewerId: string, actorId: string, recipientIds: string[],
    deliveredSeq = 0, readSeq = 0) {
    if (!actorId || actorId === viewerId) return;
    const peers = new Set([actorId, ...recipientIds].filter((id) => id && id !== viewerId));
    this.activePeerIds.set(conversationId, peers);
    const cursors = this.memberCursors.get(conversationId) ?? new Map<string, RecipientCursor>();
    const current = cursors.get(actorId) ?? { deliveredSeq: 0, readSeq: 0 };
    cursors.set(actorId, {
      deliveredSeq: Math.max(current.deliveredSeq, deliveredSeq),
      readSeq: Math.max(current.readSeq, readSeq),
    });
    this.memberCursors.set(conversationId, cursors);

    const minDelivered = Math.min(...[...peers].map((id) => cursors.get(id)?.deliveredSeq ?? 0));
    const minRead = Math.min(...[...peers].map((id) => cursors.get(id)?.readSeq ?? 0));
    this.rememberAggregate(conversationId, minDelivered, minRead);
  }

  clearMembers(conversationId: string) {
    this.activePeerIds.delete(conversationId);
    this.memberCursors.delete(conversationId);
  }

  cursor(conversationId: string): RecipientCursor {
    return { ...(this.aggregateSnapshots.get(conversationId) ?? { deliveredSeq: 0, readSeq: 0 }) };
  }

  outgoingStatus(conversationId: string, sequence: number): "sent" | "delivered" | "read" {
    const cursor = this.cursor(conversationId);
    if (sequence <= cursor.readSeq) return "read";
    if (sequence <= cursor.deliveredSeq) return "delivered";
    return "sent";
  }

  clear() {
    this.aggregateSnapshots.clear();
    this.memberCursors.clear();
    this.activePeerIds.clear();
  }
}

type Listener = (event: ChatRealtimeEvent) => void;
type CursorAckState = { deliveredSeq: number; readSeq: number; sentDeliveredSeq: number; sentReadSeq: number };
type PendingRestCursorAck = { kind: "delivered" | "read"; conversationId: string; sequence: number; inFlight: boolean };

class ChatRealtimeClient {
  private socket: WebSocket | null = null;
  private userId: string | null = null;
  private listeners = new Set<Listener>();
  private reconnectListeners = new Set<() => void>();
  private heartbeatTimer: number | null = null;
  private reconnectTimer: number | null = null;
  private reconnectAttempt = 0;
  private connectedOnce = false;
  private recipientCursorTracker = new ChatRecipientCursorTracker();
  private cursorAcks = new Map<string, CursorAckState>();
  private pendingRestCursorAcks = new Map<string, PendingRestCursorAck>();
  private eventDeduplicator = new ChatRealtimeEventDeduplicator();
  private networkOnline = typeof navigator === "undefined" || navigator.onLine;

  constructor() {
    if (typeof window === "undefined") return;
    window.addEventListener("online", () => {
      this.networkOnline = true;
      this.connect();
    });
    window.addEventListener("offline", () => {
      this.networkOnline = false;
      this.disconnect();
    });
  }
  subscribe(userId: string, listener: Listener) {
    this.listeners.add(listener);
    if (this.userId !== userId) {
      this.disconnect();
      this.recipientCursorTracker.clear();
      this.cursorAcks.clear();
      this.pendingRestCursorAcks.clear();
      this.eventDeduplicator.clear();
      this.connectedOnce = false;
      this.userId = userId;
    }
    this.connect();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) this.disconnect();
    };
  }

  subscribeReconnect(listener: () => void) {
    this.reconnectListeners.add(listener);
    return () => { this.reconnectListeners.delete(listener); };
  }

  rememberRecipientCursor(conversationId: string, deliveredSeq = 0, readSeq = 0) {
    this.recipientCursorTracker.rememberAggregate(conversationId, deliveredSeq, readSeq);
  }

  rememberMemberCursor(conversationId: string, actorId: string, recipientIds: string[], deliveredSeq = 0, readSeq = 0) {
    if (!this.userId) return;
    this.recipientCursorTracker.rememberMember(conversationId, this.userId, actorId, recipientIds, deliveredSeq, readSeq);
  }

  clearRecipientMemberCursors(conversationId: string) {
    this.recipientCursorTracker.clearMembers(conversationId);
  }

  recipientCursor(conversationId: string) {
    return this.recipientCursorTracker.cursor(conversationId);
  }

  outgoingStatus(conversationId: string, sequence: number): "sent" | "delivered" | "read" {
    return this.recipientCursorTracker.outgoingStatus(conversationId, sequence);
  }
  publishLocalMessage(message: RealtimeChatMessage) {
    if (!this.userId || !message?.conversationId) return;
    const event: ChatRealtimeEvent = {
      type: "MESSAGE_CREATED",
      eventId: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : "local-" + Date.now(),
      conversationId: message.conversationId,
      actorId: message.senderId,
      recipientIds: [this.userId],
      message,
    };
    this.listeners.forEach((listener) => listener(event));
  }

  acknowledgeDelivered(conversationId: string, sequence: number) {
    if (sequence <= 0) return;
    const state = this.cursorState(conversationId);
    if (sequence <= Math.max(state.deliveredSeq, state.readSeq)) return;
    state.deliveredSeq = sequence;
    this.sendCursorAck("delivered", conversationId, sequence);
  }

  acknowledgeRead(conversationId: string, sequence: number) {
    if (sequence <= 0) return;
    const state = this.cursorState(conversationId);
    if (sequence <= state.readSeq) return;
    state.readSeq = sequence;
    state.deliveredSeq = Math.max(state.deliveredSeq, sequence);
    this.sendCursorAck("read", conversationId, sequence);
  }

  private connect() {
    if (!this.userId || this.listeners.size === 0 || !this.networkOnline) return;
    if (this.socket?.readyState === WebSocket.OPEN || this.socket?.readyState === WebSocket.CONNECTING) return;

    const wsBase = API_BASE_URL.replace(/^http/i, "ws");
    const socket = new WebSocket(`${wsBase}/ws/chat`);
    this.socket = socket;
    socket.onopen = () => {
      if (this.socket !== socket) return;
      if (!this.networkOnline) {
        this.disconnect();
        return;
      }
      this.reconnectAttempt = 0;
      this.startHeartbeat();
      this.send({ type: "HEARTBEAT" });
      this.replayCursorAcks();
      if (this.connectedOnce) this.reconnectListeners.forEach((listener) => listener());
      this.connectedOnce = true;
    };
    socket.onmessage = (message) => {
      if (this.socket !== socket) return;
      try {
        const event = JSON.parse(message.data) as ChatRealtimeEvent;
        if (!event?.type || !event.conversationId) return;
        if (this.eventDeduplicator.shouldIgnore(event.eventId)) return;
        this.listeners.forEach((listener) => listener(event));
        if (event.type === "MESSAGE_CREATED" && event.message && event.message.senderId !== this.userId) {
          this.acknowledgeDelivered(event.conversationId, event.message.messageSeq);
        }
      } catch {
        // Ignore malformed frames and keep the realtime channel alive.
      }
    };
    socket.onerror = () => {
      if (this.socket === socket) socket.close();
    };
    socket.onclose = () => {
      if (this.socket !== socket) return;
      this.stopHeartbeat();
      this.socket = null;
      this.cursorAcks.forEach((cursor) => {
        cursor.sentDeliveredSeq = 0;
        cursor.sentReadSeq = 0;
      });
      this.scheduleReconnect();
    };
  }

  private persistCursor(kind: "delivered" | "read", conversationId: string, sequence: number) {
    if (!this.userId || sequence <= 0) return;
    const key = `${kind}:${conversationId}`;
    const pending = this.pendingRestCursorAcks.get(key);
    if (pending) {
      pending.sequence = Math.max(pending.sequence, sequence);
      return;
    }
    this.pendingRestCursorAcks.set(key, { kind, conversationId, sequence, inFlight: false });
    this.flushRestCursorAck(key);
  }
  private flushRestCursorAck(key: string) {
    const pending = this.pendingRestCursorAcks.get(key);
    if (!pending || pending.inFlight || !this.userId) return;
    pending.inFlight = true;
    const sentSequence = pending.sequence;
    const actorId = this.userId;
    const path = "/chat/conversations/" + encodeURIComponent(pending.conversationId)
      + "/cursor/" + pending.kind + "?actorId=" + encodeURIComponent(actorId);
    void fetch(API_BASE_URL + path, {
      method: "PUT",
      credentials: "include",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ sequence: sentSequence }),
    }).then((response) => {
      if (!response.ok || this.userId !== actorId) return;
      this.markCursorAckSent(pending.kind, pending.conversationId, sentSequence);
    }).catch(() => undefined).finally(() => {
      pending.inFlight = false;
      if (this.pendingRestCursorAcks.get(key) !== pending) return;
      if (pending.sequence > sentSequence) {
        this.flushRestCursorAck(key);
      } else {
        this.pendingRestCursorAcks.delete(key);
      }
    });
  }

  private cursorState(conversationId: string) {
    let state = this.cursorAcks.get(conversationId);
    if (!state) {
      while (this.cursorAcks.size >= 500) {
        const oldest = this.cursorAcks.keys().next().value;
        if (!oldest) break;
        this.cursorAcks.delete(oldest);
      }
      state = { deliveredSeq: 0, readSeq: 0, sentDeliveredSeq: 0, sentReadSeq: 0 };
      this.cursorAcks.set(conversationId, state);
    }
    return state;
  }

  private markCursorAckSent(kind: "delivered" | "read", conversationId: string, sequence: number) {
    const state = this.cursorState(conversationId);
    if (kind === "read") {
      state.readSeq = Math.max(state.readSeq, sequence);
      state.deliveredSeq = Math.max(state.deliveredSeq, sequence);
      state.sentReadSeq = Math.max(state.sentReadSeq, sequence);
      state.sentDeliveredSeq = Math.max(state.sentDeliveredSeq, sequence);
    } else {
      state.deliveredSeq = Math.max(state.deliveredSeq, sequence);
      state.sentDeliveredSeq = Math.max(state.sentDeliveredSeq, sequence);
    }
  }

  private replayCursorAcks() {
    this.cursorAcks.forEach((state, conversationId) => {
      if (state.readSeq > state.sentReadSeq) {
        this.sendCursorAck("read", conversationId, state.readSeq);
      } else if (state.deliveredSeq > state.sentDeliveredSeq) {
        this.sendCursorAck("delivered", conversationId, state.deliveredSeq);
      }
    });
  }

  private sendCursorAck(kind: "delivered" | "read", conversationId: string, sequence: number) {
    const type = kind === "read" ? "READ_ACK" : "DELIVERED_ACK";
    if (this.send({ type, conversationId, sequence })) {
      this.markCursorAckSent(kind, conversationId, sequence);
    } else {
      this.persistCursor(kind, conversationId, sequence);
    }
  }

  private send(frame: { type: string; conversationId?: string; sequence?: number }) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(frame));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = window.setInterval(() => this.send({ type: "HEARTBEAT" }), 30_000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer !== null) window.clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
  }

  private scheduleReconnect() {
    if (!this.userId || this.listeners.size === 0 || !this.networkOnline || this.reconnectTimer !== null) return;
    const delay = Math.min(15_000, 800 * 2 ** this.reconnectAttempt++);
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  private disconnect() {
    this.stopHeartbeat();
    if (this.reconnectTimer !== null) window.clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    const socket = this.socket;
    this.socket = null;
    if (socket && socket.readyState < WebSocket.CLOSING) socket.close(1000, "No active subscribers");
  }
}

export const chatRealtime = new ChatRealtimeClient();
