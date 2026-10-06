import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatMessageActionStore } from "./chatMessageActionStore";
import type { ChatMessage } from "../model/chat.types";

const api = vi.hoisted(() => ({ recall: vi.fn(), pins: vi.fn(), pin: vi.fn(), unpin: vi.fn(), messageStates: vi.fn() }));
vi.mock("../api/chat.api", () => ({ chatApi: api }));
const message: ChatMessage = { id: "m", conversationId: "c", messageSeq: 1, senderId: "me", messageType: "IMAGE", content: "secret", metadata: { url: "secret.jpg" }, reactions: [{ type: "HEART", count: 1 }] };
beforeEach(() => { Object.values(api).forEach((mock) => mock.mockReset()); api.pins.mockResolvedValue({ version: 0, canManage: true, items: [] }); });

describe("shared message actions", () => {
  it("remembers recalled sources learned through reply snapshots and rejects stale quotes", () => {
    const reply: ChatMessage = { ...message, id: "reply", messageSeq: 100, reply: { messageSeq: 1, deleted: true, content: null, metadata: null } };
    const store = new ChatMessageActionStore("me"); store.ingest([reply]);
    expect(store.project({ ...reply, reply: { messageSeq: 1, content: "stale secret" } }).reply).toMatchObject({ deleted: true, content: null });
    expect(store.project(message).deleted).toBe(true);
  });
  it("rejects pre-removal pin responses after rejoining and accepts a fresh membership response", async () => {
    let resolve!: (value: unknown) => void;
    api.pins.mockReturnValueOnce(new Promise((yes) => { resolve = yes; }));
    const store = new ChatMessageActionStore("me"); const old = store.refreshPins("c");
    store.revoke("c"); store.allow("c");
    await store.refreshPins("c");
    resolve({ version: 10, canManage: true, items: [{ message, pinnedBy: "me", pinnedAt: "2026-10-06T08:00:00Z" }] }); await old;
    expect(store.pins("c").items).toHaveLength(0);
    expect(store.pins("c").version).toBe(0);
  });
  it("rejects pre-removal recall confirmations after rejoining", async () => {
    let resolve!: (value: ChatMessage) => void;
    api.recall.mockReturnValue(new Promise((yes) => { resolve = yes; }));
    const store = new ChatMessageActionStore("me"); const old = store.recall(message);
    store.revoke("c"); store.allow("c"); resolve({ ...message, deleted: true }); await old;
    expect(store.project(message).deleted).not.toBe(true);
    expect(store.state(message).pending).toBe(false);
  });
  it("refetches watched pins on membership re-addition even when selection is unchanged", async () => {
    const store = new ChatMessageActionStore("me"); store.watch("c", [message]);
    await store.refreshPins("c"); store.revoke("c");
    api.pins.mockResolvedValue({ version: 2, canManage: false, items: [] });
    store.allow("c");
    await vi.waitFor(() => expect(store.pins("c")).toMatchObject({ version: 2, canManage: false }));
    expect(api.pins).toHaveBeenCalledTimes(2);
  });
  it("redacts a cached quote when reconnect returns only its sanitized reply", async () => {
    const reply: ChatMessage = { ...message, id: "reply", messageSeq: 2, replyToSeq: 1, reply: { messageSeq: 1, content: "old secret", metadata: message.metadata } };
    api.messageStates.mockResolvedValue([{ ...reply, reply: { ...reply.reply, deleted: true, content: null, metadata: null } }]);
    const store = new ChatMessageActionStore("me"); store.watch("c", [reply]);
    await store.refresh();
    expect(store.project(reply).reply).toMatchObject({ deleted: true, content: null, metadata: null });
    expect(store.project(message).deleted).toBe(true);
  });
  it("never restores a recalled message or its quote from a stale page", () => {
    const store = new ChatMessageActionStore("me");
    store.ingest([message]);
    store.deleted({ ...message, deleted: true });
    store.ingest([message]);
    expect(store.project(message)).toMatchObject({ deleted: true, content: null, metadata: null, reactions: [], reply: null });
    const reply: ChatMessage = { ...message, id: "reply", messageSeq: 2, replyToSeq: 1, reply: { messageSeq: 1, content: "secret", metadata: message.metadata } };
    expect(store.project(reply).reply).toMatchObject({ deleted: true, content: null, metadata: null });
  });
  it("rejects old pin snapshots and removes a recalled pin immediately", () => {
    const store = new ChatMessageActionStore("me");
    store.acceptPins("c", { version: 3, canManage: true, items: [{ message, pinnedBy: "me", pinnedAt: "2026-10-06T08:00:00Z" }] });
    store.acceptPins("c", { version: 2, canManage: false, items: [] });
    expect(store.pins("c").items).toHaveLength(1);
    store.deleted({ ...message, deleted: true });
    expect(store.pins("c").items).toHaveLength(0);
    store.acceptPins("c", { version: 3, canManage: true, items: [{ message, pinnedBy: "me", pinnedAt: "2026-10-06T08:00:00Z" }] });
    expect(store.pins("c").items).toHaveLength(0);
  });
  it("keeps content on a failed recall and prevents duplicate requests", async () => {
    let reject!: (error: Error) => void;
    api.recall.mockReturnValue(new Promise((_resolve, no) => { reject = no; }));
    const store = new ChatMessageActionStore("me");
    const first = store.recall(message);
    await store.recall(message);
    expect(api.recall).toHaveBeenCalledTimes(1);
    reject(new Error("offline")); await first;
    expect(store.project(message).deleted).not.toBe(true);
    expect(store.state(message).error).toBeTruthy();
  });
  it("ignores a late successful recall after account cleanup", async () => {
    let resolve!: (value: ChatMessage) => void;
    api.recall.mockReturnValue(new Promise((yes) => { resolve = yes; }));
    const store = new ChatMessageActionStore("me");
    const request = store.recall(message);
    store.dispose(); resolve({ ...message, deleted: true }); await request;
    expect(store.project(message).deleted).not.toBe(true);
  });
  it("refreshes old visible message IDs on reconnect, including tombstones", async () => {
    api.messageStates.mockResolvedValue([{ ...message, deleted: true }]);
    const store = new ChatMessageActionStore("me");
    const release = store.watch("c", [message]);
    store.ingest([message]); await store.refresh();
    expect(api.messageStates).toHaveBeenCalledWith("c", "me", ["m"]);
    expect(store.project(message).deleted).toBe(true);
    release();
  });
});
