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
  type: "MESSAGE_CREATED" | "CURSOR_UPDATED" | "GROUP_CREATED" | "MEMBER_ADDED" | "MEMBER_REMOVED" | "MESSAGE_REACTION_CHANGED" | "MESSAGE_DELETED" | "PINS_CHANGED";
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

type Listener = (event: ChatRealtimeEvent) => void;

class ChatRealtimeClient {
  private socket: WebSocket | null = null;
  private userId: string | null = null;
  private listeners = new Set<Listener>();
  private reconnectListeners = new Set<() => void>();
  private heartbeatTimer: number | null = null;
  private reconnectTimer: number | null = null;
  private reconnectAttempt = 0;
  private recipientCursors = new Map<string, { deliveredSeq: number; readSeq: number }>();
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
      this.recipientCursors.clear();
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
    const current = this.recipientCursors.get(conversationId) ?? { deliveredSeq: 0, readSeq: 0 };
    this.recipientCursors.set(conversationId, {
      deliveredSeq: Math.max(current.deliveredSeq, deliveredSeq),
      readSeq: Math.max(current.readSeq, readSeq),
    });
  }

  outgoingStatus(conversationId: string, sequence: number): "sent" | "delivered" | "read" {
    const cursor = this.recipientCursors.get(conversationId);
    if (cursor && sequence <= cursor.readSeq) return "read";
    if (cursor && sequence <= cursor.deliveredSeq) return "delivered";
    return "sent";
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
    this.send({ type: "DELIVERED_ACK", conversationId, sequence });
    this.persistCursor("delivered", conversationId, sequence);
  }

  acknowledgeRead(conversationId: string, sequence: number) {
    this.send({ type: "READ_ACK", conversationId, sequence });
    this.persistCursor("read", conversationId, sequence);
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
      this.reconnectListeners.forEach((listener) => listener());
    };
    socket.onmessage = (message) => {
      if (this.socket !== socket) return;
      try {
        const event = JSON.parse(message.data) as ChatRealtimeEvent;
        if (!event?.type || !event.conversationId) return;
        if (event.type === "MESSAGE_CREATED" && event.message && event.message.senderId !== this.userId) {
          this.acknowledgeDelivered(event.conversationId, event.message.messageSeq);
        }
        if (event.type === "CURSOR_UPDATED" && event.actorId !== this.userId) {
          this.rememberRecipientCursor(event.conversationId, event.deliveredSeq ?? 0, event.readSeq ?? 0);
        }
        this.listeners.forEach((listener) => listener(event));
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
      this.scheduleReconnect();
    };
  }

  private persistCursor(kind: "delivered" | "read", conversationId: string, sequence: number) {
    if (!this.userId || sequence <= 0) return;
    const path = "/chat/conversations/" + encodeURIComponent(conversationId)
      + "/cursor/" + kind + "?actorId=" + encodeURIComponent(this.userId);
    void fetch(API_BASE_URL + path, {
      method: "PUT",
      credentials: "include",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ sequence }),
    }).catch(() => undefined);
  }
  private send(frame: { type: string; conversationId?: string; sequence?: number }) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(frame));
    }
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
