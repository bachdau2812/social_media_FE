import { describe, expect, it } from "vitest";
import { ChatRealtimeEventDeduplicator, ChatRecipientCursorTracker } from "./chatRealtime";

describe("ChatRealtimeEventDeduplicator", () => {
  it("ignores repeated event IDs while keeping a bounded replay window", () => {
    const deduplicator = new ChatRealtimeEventDeduplicator(2);

    expect(deduplicator.shouldIgnore("event-1")).toBe(false);
    expect(deduplicator.shouldIgnore("event-1")).toBe(true);
    expect(deduplicator.shouldIgnore("event-2")).toBe(false);
    expect(deduplicator.shouldIgnore("event-3")).toBe(false);
    expect(deduplicator.shouldIgnore("event-1")).toBe(false);
    expect(deduplicator.shouldIgnore(undefined)).toBe(false);
  });
});

describe("ChatRecipientCursorTracker", () => {
  it("uses the slowest active peer cursor for group delivery and read status", () => {
    const cursors = new ChatRecipientCursorTracker();

    cursors.rememberMember("group", "viewer", "peer-b", ["viewer", "peer-c"], 10, 8);
    expect(cursors.outgoingStatus("group", 7)).toBe("sent");
    cursors.rememberMember("group", "viewer", "peer-c", ["viewer", "peer-b"], 7, 5);
    expect(cursors.cursor("group")).toEqual({ deliveredSeq: 7, readSeq: 5 });
    expect(cursors.outgoingStatus("group", 5)).toBe("read");
    expect(cursors.outgoingStatus("group", 7)).toBe("delivered");

    cursors.rememberMember("group", "viewer", "peer-b", ["viewer", "peer-c"], 2, 1);
    expect(cursors.outgoingStatus("group", 7)).toBe("delivered");
  });
});
