import { describe, expect, it } from "vitest";
import {
  createForegroundNotificationGate,
  destinationsReferToSameContent,
} from "./foregroundPolicy";

describe("foreground notification policy", () => {
  it("recognizes the same active conversation despite different message ids", () => {
    expect(destinationsReferToSameContent(
      { kind: "conversation", conversationId: "conversation-1", messageId: "message-1" },
      { kind: "conversation", conversationId: "conversation-1", messageId: "message-2" },
    )).toBe(true);
  });

  it("suppresses a notification for the active conversation", () => {
    const gate = createForegroundNotificationGate();
    const result = gate.evaluate({
      notificationId: "notification-1",
      destination: { kind: "conversation", conversationId: "conversation-1" },
    }, {
      kind: "conversation",
      conversationId: "conversation-1",
    });

    expect(result).toEqual({ display: false, reason: "active-destination" });
  });

  it("deduplicates notifications inside the configured window", () => {
    let now = 1_000;
    const gate = createForegroundNotificationGate({ now: () => now, dedupeWindowMs: 500 });
    const notification = {
      notificationId: "notification-1",
      destination: { kind: "post", postId: "post-1" } as const,
    };

    expect(gate.evaluate(notification, null)).toEqual({ display: true, reason: "display" });
    expect(gate.evaluate(notification, null)).toEqual({ display: false, reason: "duplicate" });
    now = 1_501;
    expect(gate.evaluate(notification, null)).toEqual({ display: true, reason: "display" });
  });

  it("allows callers to suppress additional foreground notifications", () => {
    const gate = createForegroundNotificationGate({
      shouldSuppress: (notification) => notification.notificationId === "quiet",
    });

    expect(gate.evaluate({ notificationId: "quiet", destination: null }, null))
      .toEqual({ display: false, reason: "custom" });
  });
});
