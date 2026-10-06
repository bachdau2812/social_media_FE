import { beforeEach, describe, expect, it, vi } from "vitest";
import * as domain from "./chatReactionStore";
import type { ChatMessage } from "../model/chat.types";
import type { ReactionState, ReactionType } from "../model/chatReactions";

const api = vi.hoisted(() => ({ reactionStates: vi.fn() }));
vi.mock("../api/chat.api", () => ({ chatApi: api }));
beforeEach(() => { api.reactionStates.mockReset().mockResolvedValue([]); });

const message: ChatMessage = { id: "m", conversationId: "c", messageSeq: 1, senderId: "other", messageType: "TEXT", myReaction: null, reactionVersion: 0, reactions: [], likeCount: 0 };
const changed = (version: number, actorId = "me", reaction: ReactionType | null = "HEART"): ReactionState => ({
  messageId: "m", messageSeq: 1, reactionVersion: version, actorId, reaction,
  likeCount: 1, reactions: [{ type: "HEART", count: 1 }],
});

function deferred() {
  let resolve!: (value: ReactionState) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<ReactionState>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

describe("shared chat reaction state", () => {
  it("ignores delayed reaction events after a permanent recall", () => {
    const store = new domain.ChatReactionStore("me", async () => changed(1));
    store.ingest([message]); store.applyEvent("c", changed(1));
    store.ingest([{ ...message, deleted: true }]); store.applyEvent("c", changed(2));
    store.ingest([message]);
    expect(store.read("c", message).likeCount).toBe(0);
    expect(store.read("c", message).myReaction).toBeNull();
  });
  it("never promotes a rendered aggregate revision into a personalized snapshot on select", async () => {
    const pending = deferred();
    const store = new domain.ChatReactionStore("me", () => pending.promise);
    const original: ChatMessage = { ...message, reactionVersion: 1, myReaction: "HEART", likeCount: 1, reactions: [{ type: "HEART", count: 1 }] };
    store.ingest([original]);
    store.applyEvent("c", { ...changed(3, "other", "LIKE"), likeCount: 0, reactions: [{ type: "LIKE", count: 1 }, { type: "WOW", count: 1 }] });
    const rendered = { ...original, ...store.read("c", original) };
    const operation = store.select("c", rendered, "SAD");
    store.applyEvent("c", { ...changed(2, "me", "WOW"), likeCount: 0, reactions: [{ type: "WOW", count: 1 }] });
    pending.reject(new Error("offline"));
    await operation;
    expect(store.read("c", original).myReaction).toBe("WOW");
    expect(store.read("c", original).myReactionVersion).toBe(2);
  });

  it("keeps visible messages while evicting inactive cached messages", () => {
    const store = new domain.ChatReactionStore("me", async () => changed(1));
    const release = store.watch([message]);
    store.ingest([message]);
    store.applyEvent("c", changed(1));
    store.ingest(Array.from({ length: 1100 }, (_, index) => ({ ...message, id: `old-${index}` })));
    expect(store.read("c", message).myReaction).toBe("HEART");
    expect(store.read("c", message).likeCount).toBe(1);
    release();
  });

  it("keeps SYSTEM/deleted/unsaved messages out of reconnect batch requests", async () => {
    const store = new domain.ChatReactionStore("me", async () => changed(1));
    store.ingest([{ ...message, messageType: "SYSTEM" }, { ...message, id: "deleted", deleted: true }, { ...message, id: "sending", status: "sending" }]);
    await store.refresh();
    expect(api.reactionStates).not.toHaveBeenCalled();
  });
  it("retains one connection across React effect teardown and reattachment", async () => {
    let connects = 0, disconnects = 0;
    const store = domain.getChatReactionStore("strict-user");
    const connect = () => { connects += 1; return () => { disconnects += 1; }; };
    const first = domain.retainChatReactionStore(store, connect);
    first();
    const second = domain.retainChatReactionStore(store, connect);
    await Promise.resolve();
    expect(connects).toBe(1);
    second();
    await Promise.resolve();
    expect(disconnects).toBe(1);
  });
  it("rolls back only the pending overlay and retains another user's event", async () => {
    const pending = deferred();
    const store = new domain.ChatReactionStore("me", () => pending.promise);
    store.ingest([message]);
    const operation = store.select("c", message, "HAHA");
    expect(store.read("c", message).myReaction).toBe("HAHA");
    expect(store.read("c", message).pending).toBe(true);
    store.applyEvent("c", changed(1, "other"));
    pending.reject(new Error("network"));
    await operation;
    expect(store.read("c", message).myReaction).toBe(null);
    expect(store.read("c", message).likeCount).toBe(1);
    expect(store.read("c", message).error).toBeTruthy();
  });

  it("reconciles REST and websocket echo without double counts", async () => {
    const pending = deferred();
    const store = new domain.ChatReactionStore("me", () => pending.promise);
    store.ingest([message]);
    const operation = store.select("c", message, "HEART");
    store.applyEvent("c", changed(1));
    expect(store.read("c", message).likeCount).toBe(1);
    pending.resolve(changed(1));
    await operation;
    expect(store.read("c", message).likeCount).toBe(1);
    expect(store.read("c", message).myReaction).toBe("HEART");
    expect(store.read("c", message).pending).toBe(false);
  });

  it("does not let old page data overwrite newer reaction state", () => {
    const store = new domain.ChatReactionStore("me", async () => changed(1));
    store.ingest([message]);
    store.applyEvent("c", changed(2, "me", "WOW"));
    store.ingest([message]);
    expect(store.read("c", message).myReaction).toBe("WOW");
  });

  it("removes a selected reaction and prevents concurrent duplicate submits", async () => {
    const pending = deferred();
    const calls: unknown[] = [];
    const store = new domain.ChatReactionStore("me", (...args: unknown[]) => { calls.push(args); return pending.promise; });
    const liked: ChatMessage = { ...message, myReaction: "HEART", reactions: [{ type: "HEART", count: 1 }], likeCount: 1 };
    store.ingest([liked]);
    const operation = store.select("c", liked, "HEART");
    void store.select("c", liked, "HAHA");
    expect(calls).toEqual([["c", "m", null]]);
    expect(store.read("c", liked).myReaction).toBe(null);
    pending.resolve({ ...changed(1, "me", null), likeCount: 0, reactions: [] });
    await operation;
  });

  it("drops private state and ignores an in-flight response after account cleanup", async () => {
    const pending = deferred();
    const store = new domain.ChatReactionStore("me", () => pending.promise);
    store.ingest([message]);
    const operation = store.select("c", message, "HEART");
    store.dispose();
    pending.resolve(changed(1));
    await operation;
    expect(store.read("c", message).myReaction).toBe(null);
  });
});
