import { chatApi } from "../api/chat.api";
import { chatMessageToModel } from "../model/chat.mapper";
import { chatRealtime } from "./chatRealtime";

type ForwardResult = { userId: string; clientMessageId: string; conversationId?: string; status: "waiting" | "sending" | "sent" | "error" };

/** Each destination has its own stable idempotency key and independent outcome. */
export class MessageForwarding {
  private jobs = new Map<string, ForwardResult>();
  private running = false;
  private cancelled = false;
  constructor(private actorId: string, private sourceConversationId: string, private sourceMessageId: string) {}
  results() { return [...this.jobs.values()].map((job) => ({ ...job })); }
  cancel() { this.cancelled = true; }
  async send(userIds: string[], changed: () => void = () => {}) {
    if (this.running || this.cancelled) return;
    const unique = [...new Set(userIds)];
    if (!unique.length || unique.length > 20) return;
    unique.forEach((userId) => { if (!this.jobs.has(userId)) this.jobs.set(userId, { userId, clientMessageId: crypto.randomUUID(), status: "waiting" }); });
    const pending = unique.map((id) => this.jobs.get(id)!).filter((job) => job.status !== "sent");
    this.running = true;
    let cursor = 0;
    try {
      await Promise.all(Array.from({ length: Math.min(3, pending.length) }, async () => {
        while (!this.cancelled && cursor < pending.length) {
          const job = pending[cursor++]; job.status = "sending"; changed();
          try {
            if (!job.conversationId) job.conversationId = (await chatApi.direct(this.actorId, job.userId)).id;
            if (this.cancelled) return;
            const message = await chatApi.forward(job.conversationId, this.actorId, { sourceConversationId: this.sourceConversationId, sourceMessageId: this.sourceMessageId, clientMessageId: job.clientMessageId });
            if (this.cancelled) return;
            job.status = "sent"; chatRealtime.publishLocalMessage(chatMessageToModel(message));
          } catch { if (!this.cancelled) job.status = "error"; }
          if (!this.cancelled) changed();
        }
      }));
    } finally { this.running = false; }
  }
}
