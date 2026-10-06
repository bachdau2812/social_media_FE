import { chatApi } from "../api/chat.api";
import { chatMessageToModel } from "../model/chat.mapper";
import { messageTombstone } from "../model/chatMessageActions";
import type { ChatMessage, PinCollection } from "../model/chat.types";
import type { ChatMessageDto, PinCollectionDto } from "../model/chat.dto";

const EMPTY_PINS: PinCollection = { version: 0, canManage: false, items: [] };
type Operation = { pending: boolean; error: string | null };

/** Shared confirmations only; surface selection, composer and dialogs stay local. */
export class ChatMessageActionStore {
  private tombstones = new Map<string, ChatMessage>();
  private deletedSequences = new Map<string, Set<number>>();
  private collections = new Map<string, PinCollection>();
  private pinFloor = new Map<string, number>();
  private pinRequests = new Map<string, Promise<void>>();
  private pinErrors = new Map<string, string>();
  private operations = new Map<string, Operation>();
  private watches = new Map<symbol, { conversationId: string; ids: string[] }>();
  private listeners = new Set<() => void>();
  private revoked = new Set<string>();
  private generations = new Map<string, number>();
  private version = 0;
  private disposed = false;
  constructor(readonly userId: string) {}
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  getVersion = () => this.version;
  private key(message: Pick<ChatMessage, "id" | "conversationId">) { return `${message.conversationId}/${message.id}`; }
  private notify() { this.version += 1; this.listeners.forEach((listener) => listener()); }
  private generation(conversationId: string) { return this.generations.get(conversationId) ?? 0; }
  private current(conversationId: string, generation: number) { return !this.disposed && !this.revoked.has(conversationId) && this.generation(conversationId) === generation; }

  watch(conversationId: string | null, messages: ChatMessage[]) {
    const token = Symbol();
    if (conversationId) this.watches.set(token, { conversationId, ids: messages.filter((m) => !["sending", "failed", "queued"].includes(m.status ?? "")).map((m) => m.id) });
    return () => { this.watches.delete(token); };
  }
  ingest(messages: ChatMessage[]) {
    for (const message of messages) {
      if (this.disposed || this.revoked.has(message.conversationId)) continue;
      if (message.deleted) this.deleted(message);
      if (message.reply?.deleted) {
        const sequences = this.deletedSequences.get(message.conversationId) ?? new Set<number>();
        if (!sequences.has(message.reply.messageSeq)) {
          sequences.add(message.reply.messageSeq); this.deletedSequences.set(message.conversationId, sequences); this.notify();
        }
      }
    }
  }
  deleted(message: ChatMessage) {
    if (this.disposed || this.revoked.has(message.conversationId) || this.tombstones.has(this.key(message))) return;
    this.tombstones.set(this.key(message), messageTombstone(message));
    const sequences = this.deletedSequences.get(message.conversationId) ?? new Set<number>();
    sequences.add(message.messageSeq); this.deletedSequences.set(message.conversationId, sequences);
    const pins = this.collections.get(message.conversationId);
    if (pins) this.collections.set(message.conversationId, { ...pins, items: pins.items.filter((item) => item.message.id !== message.id) });
    this.notify();
  }
  project(message: ChatMessage): ChatMessage {
    const recalled = this.tombstones.get(this.key(message));
    if (recalled || message.deleted || this.deletedSequences.get(message.conversationId)?.has(message.messageSeq)) return messageTombstone({ ...message, ...recalled });
    if (message.reply && (message.reply.deleted || this.deletedSequences.get(message.conversationId)?.has(message.reply.messageSeq)))
      return { ...message, reply: { ...message.reply, deleted: true, content: null, metadata: null } };
    return message;
  }
  state(message: ChatMessage) { return this.operations.get(this.key(message)) ?? { pending: false, error: null }; }
  pins(conversationId: string) {
    const collection = this.collections.get(conversationId);
    return collection ? { ...collection, items: collection.items.map((item) => ({ ...item, message: this.project(item.message) })).filter((item) => !item.message.deleted) } : EMPTY_PINS;
  }
  pinsError(conversationId: string) { return this.pinErrors.get(conversationId); }
  isDeleted(conversationId: string, id: string) { return this.tombstones.has(`${conversationId}/${id}`); }
  acceptPins(conversationId: string, collection: PinCollection | PinCollectionDto) {
    if (this.disposed || this.revoked.has(conversationId) || collection.version < Math.max(this.pins(conversationId).version, this.pinFloor.get(conversationId) ?? 0)) return;
    this.ingest(collection.items.map((item) => chatMessageToModel(item.message as ChatMessageDto)));
    this.collections.set(conversationId, { ...collection, items: collection.items
      .map((item) => ({ ...item, message: this.project(chatMessageToModel(item.message as ChatMessageDto)) }))
      .filter((item) => !item.message.deleted) });
    this.pinErrors.delete(conversationId); this.notify();
  }
  async refreshPins(conversationId: string, minimumVersion = 0) {
    if (this.disposed || this.revoked.has(conversationId)) return;
    this.pinFloor.set(conversationId, Math.max(minimumVersion, this.pinFloor.get(conversationId) ?? 0));
    const generation = this.generation(conversationId);
    const existing = this.pinRequests.get(conversationId);
    if (existing) { await existing; if (!this.current(conversationId, generation) || this.pins(conversationId).version >= minimumVersion) return; }
    const request = (async () => {
      try { const result = await chatApi.pins(conversationId, this.userId); if (this.current(conversationId, generation)) this.acceptPins(conversationId, result); }
      catch { if (this.current(conversationId, generation)) { this.pinErrors.set(conversationId, "Không thể tải tin ghim. Vui lòng thử lại."); this.notify(); } }
    })();
    this.pinRequests.set(conversationId, request);
    try { await request; } finally { if (this.pinRequests.get(conversationId) === request) this.pinRequests.delete(conversationId); }
  }
  async recall(message: ChatMessage) {
    return this.perform(message, () => chatApi.recall(message.conversationId, this.userId, message.id), (result) => this.deleted(chatMessageToModel(result)), "Không thể thu hồi tin nhắn. Vui lòng thử lại.");
  }
  async pin(message: ChatMessage, remove = false) {
    return this.perform(message, () => (remove ? chatApi.unpin : chatApi.pin)(message.conversationId, this.userId, message.id), (result) => this.acceptPins(message.conversationId, result), "Không thể cập nhật tin ghim. Vui lòng thử lại.");
  }
  private async perform<T>(message: ChatMessage, mutation: () => Promise<T>, accept: (result: T) => void, errorText: string) {
    const key = this.key(message);
    if (this.disposed || this.revoked.has(message.conversationId) || this.operations.get(key)?.pending) return;
    const operation = { pending: true, error: null as string | null };
    const generation = this.generation(message.conversationId);
    this.operations.set(key, operation); this.notify();
    try { const result = await mutation(); if (this.current(message.conversationId, generation)) accept(result); }
    catch { if (this.current(message.conversationId, generation)) operation.error = errorText; }
    finally { if (!this.disposed && this.operations.get(key) === operation) { operation.pending = false; this.notify(); } }
  }
  async refresh() {
    const conversations = new Map<string, Set<string>>();
    this.watches.forEach(({ conversationId, ids }) => { const group = conversations.get(conversationId) ?? new Set<string>(); ids.forEach((id) => group.add(id)); conversations.set(conversationId, group); });
    await Promise.all([...conversations].map(async ([conversationId, group]) => {
      if (this.revoked.has(conversationId)) return;
      const generation = this.generation(conversationId);
      await this.refreshPins(conversationId);
      const ids = [...group];
      for (let offset = 0; offset < ids.length && this.current(conversationId, generation); offset += 100) {
        try { const messages = await chatApi.messageStates(conversationId, this.userId, ids.slice(offset, offset + 100)); if (this.current(conversationId, generation)) this.ingest(messages.map(chatMessageToModel)); }
        catch { /* Keep confirmed state; history reload can retry later. */ }
      }
    }));
  }
  private invalidateMembership(conversationId: string) {
    this.generations.set(conversationId, this.generation(conversationId) + 1);
    this.collections.delete(conversationId); this.pinFloor.delete(conversationId); this.pinErrors.delete(conversationId); this.pinRequests.delete(conversationId);
    for (const key of this.operations.keys()) if (key.startsWith(`${conversationId}/`)) this.operations.delete(key);
  }
  revoke(conversationId: string) {
    this.invalidateMembership(conversationId); this.revoked.add(conversationId);
    this.notify();
  }
  allow(conversationId: string) {
    this.invalidateMembership(conversationId); this.revoked.delete(conversationId); this.notify();
    if ([...this.watches.values()].some((watch) => watch.conversationId === conversationId)) void this.refreshPins(conversationId);
  }
  dispose() { this.disposed = true; this.tombstones.clear(); this.deletedSequences.clear(); this.collections.clear(); this.operations.clear(); this.watches.clear(); }
}

const stores = new Map<string, { store: ChatMessageActionStore; references: number; disconnect?: () => void }>();
export function getMessageActionStore(userId: string) {
  if (!stores.has(userId)) stores.set(userId, { store: new ChatMessageActionStore(userId), references: 0 });
  return stores.get(userId)!.store;
}
export function retainMessageActionStore(store: ChatMessageActionStore, connect: () => () => void) {
  const owner = stores.get(store.userId)!; owner.references += 1;
  if (!owner.disconnect) owner.disconnect = connect();
  return () => { owner.references -= 1; queueMicrotask(() => { if (!owner.references && stores.get(store.userId) === owner) { owner.disconnect?.(); store.dispose(); stores.delete(store.userId); } }); };
}
