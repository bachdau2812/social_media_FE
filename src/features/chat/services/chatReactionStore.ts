import { chatApi } from "../api/chat.api";
import { applyReactionEvent, applyReactionSnapshot, projectReaction, reactionSnapshot, type MessageReactionFields, type ReactionState, type ReactionType, type ReactionView } from "../model/chatReactions";

type Message = MessageReactionFields & { id: string; conversationId: string; messageSeq: number; messageType?: string; deleted?: boolean; status?: string };
type Entry = { conversationId: string; messageId: string; messageSeq: number; confirmed: ReactionView; pending?: { desired: ReactionType | null }; error?: string };
type Mutation = (conversationId: string, messageId: string, desired: ReactionType | null) => Promise<ReactionState>;

/** Only reaction state is shared; composer and conversation selection remain surface-local. */
export class ChatReactionStore {
  private entries = new Map<string, Entry>();
  private deleted = new Set<string>();
  private listeners = new Set<() => void>();
  private revoked = new Set<string>();
  private version = 0;
  private disposed = false;
  private watches = new Map<symbol, Set<string>>();

  constructor(readonly userId: string, private mutate: Mutation = (conversationId, messageId, desired) => desired
    ? chatApi.setReaction(conversationId, userId, messageId, desired)
    : chatApi.removeReaction(conversationId, userId, messageId)) {}

  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  getVersion = () => this.version;
  private key(conversationId: string, messageId: string) { return `${conversationId}/${messageId}`; }
  private notify() { this.version += 1; this.listeners.forEach((listener) => listener()); }

  watch(messages: Message[]) {
    const token = Symbol();
    this.watches.set(token, new Set(messages.filter(reactable).map((message) => this.key(message.conversationId, message.id))));
    return () => { this.watches.delete(token); queueMicrotask(() => this.trim()); };
  }

  ingest(messages: Message[]) {
    if (this.disposed) return;
    let changed = false;
    for (const message of messages) {
      if (this.revoked.has(message.conversationId)) continue;
      const key = this.key(message.conversationId, message.id);
      if (message.deleted) this.deleted.add(key);
      if (this.deleted.has(key)) { changed = this.entries.delete(key) || changed; continue; }
      if (!reactable(message)) { changed = this.entries.delete(key) || changed; continue; }
      const previous = this.entries.get(key);
      // Old/neutral MESSAGE_CREATED payloads cannot erase a personalized snapshot.
      if (previous && message.reactionVersion === undefined) continue;
      const confirmed = previous ? applyReactionSnapshot(previous.confirmed, message) : reactionSnapshot(message);
      if (previous && JSON.stringify(previous.confirmed) === JSON.stringify(confirmed)) continue;
      this.entries.set(key, { ...previous, conversationId: message.conversationId, messageId: message.id, messageSeq: message.messageSeq, confirmed });
      changed = true;
    }
    this.trim();
    if (changed) this.notify();
  }

  applyEvent(conversationId: string, event: ReactionState) {
    if (this.disposed || this.revoked.has(conversationId)) return;
    const key = this.key(conversationId, event.messageId);
    if (this.deleted.has(key)) return;
    const previous = this.entries.get(key);
    const confirmed = applyReactionEvent(previous?.confirmed ?? reactionSnapshot({}), event, this.userId);
    if (previous && JSON.stringify(previous.confirmed) === JSON.stringify(confirmed)) return;
    this.entries.set(key, { ...previous, conversationId, messageId: event.messageId, messageSeq: event.messageSeq, confirmed });
    this.trim();
    this.notify();
  }

  read(conversationId: string, message: MessageReactionFields & { id: string }) {
    if (this.deleted.has(this.key(conversationId, message.id))) return { ...reactionSnapshot({}), pending: false, error: null };
    const entry = this.entries.get(this.key(conversationId, message.id));
    const confirmed = entry?.confirmed ?? reactionSnapshot(message);
    return { ...(entry?.pending ? projectReaction(confirmed, entry.pending.desired) : confirmed), pending: !!entry?.pending, error: entry?.error ?? null };
  }

  async select(conversationId: string, message: Message, selected: ReactionType) {
    if (this.disposed || this.revoked.has(conversationId)) return;
    const key = this.key(conversationId, message.id);
    // UI passes a projection whose aggregate and viewer revisions may differ.
    // Only a missing entry needs initializing; it is not a trusted server snapshot.
    if (!this.entries.has(key)) this.ingest([message]);
    const entry = this.entries.get(key)!;
    if (!entry || entry.pending || !reactable(message)) return;
    const operation = { desired: entry.confirmed.myReaction === selected ? null : selected };
    entry.pending = operation;
    entry.error = undefined;
    this.notify();
    try {
      const result = await this.mutate(conversationId, message.id, operation.desired);
      if (!this.disposed && this.entries.get(key)?.pending === operation) this.applyEvent(conversationId, result);
    } catch {
      if (!this.disposed && this.entries.get(key)?.pending === operation) {
        this.entries.get(key)!.error = "Không thể cập nhật cảm xúc. Vui lòng thử lại.";
      }
    } finally {
      const current = this.entries.get(key);
      if (!this.disposed && current?.pending === operation) { current.pending = undefined; this.notify(); }
    }
  }

  async refresh() {
    const groups = new Map<string, string[]>();
    this.entries.forEach(({ conversationId, messageId }) => {
      if (this.revoked.has(conversationId)) return;
      groups.set(conversationId, [...(groups.get(conversationId) ?? []), messageId]);
    });
    for (const [conversationId, ids] of groups) {
      for (let index = 0; index < ids.length && !this.disposed; index += 100) {
        try {
          const snapshots = await chatApi.reactionStates(conversationId, this.userId, ids.slice(index, index + 100));
          if (!this.disposed) this.ingest(snapshots.map((item) => ({ ...item, id: item.messageId, conversationId })));
        } catch { /* History reload remains available; preserve the last confirmed snapshot. */ }
      }
    }
  }

  revoke(conversationId: string) {
    this.revoked.add(conversationId);
    this.entries.forEach((entry, key) => { if (entry.conversationId === conversationId) this.entries.delete(key); });
    this.notify();
  }
  allow(conversationId: string) { this.revoked.delete(conversationId); }
  dispose() { this.disposed = true; this.entries.clear(); this.deleted.clear(); this.revoked.clear(); this.watches.clear(); this.notify(); }
  private trim() {
    if (this.entries.size <= 1000) return;
    for (const [key, entry] of this.entries) {
      if (!entry.pending && ![...this.watches.values()].some((keys) => keys.has(key))) this.entries.delete(key);
      if (this.entries.size <= 1000) break;
    }
  }
}

function reactable(message: Message) {
  return !message.deleted && message.messageType !== "SYSTEM" && !["sending", "failed", "queued"].includes(message.status ?? "");
}

const stores = new Map<string, { store: ChatReactionStore; references: number; disconnect?: () => void }>();
export function getChatReactionStore(userId: string) {
  if (!stores.has(userId)) stores.set(userId, { store: new ChatReactionStore(userId), references: 0 });
  return stores.get(userId)!.store;
}

export function retainChatReactionStore(store: ChatReactionStore, connect: () => () => void) {
  const owner = stores.get(store.userId);
  if (!owner || owner.store !== store) return () => {};
  owner.references += 1;
  if (!owner.disconnect) owner.disconnect = connect();
  return () => {
    owner.references -= 1;
    queueMicrotask(() => {
      if (owner.references === 0 && stores.get(store.userId) === owner) {
        owner.disconnect?.(); owner.store.dispose(); stores.delete(store.userId);
      }
    });
  };
}
