import { describe, expect, it } from "vitest";
import {
  createNotificationNavigateMessage,
  parseNotificationNavigateMessage,
} from "./serviceWorkerContract";

describe("notification service-worker message contract", () => {
  it("creates and parses a navigation message", () => {
    const message = createNotificationNavigateMessage(
      "/?notificationTarget=profile&userId=user-1",
      "notification-2",
    );

    expect(parseNotificationNavigateMessage(message)).toEqual({
      type: "SOCIAL_NOTIFICATION_NAVIGATE",
      url: "/?notificationTarget=profile&userId=user-1",
      notificationId: "notification-2",
    });
  });

  it("rejects unrelated or malformed messages", () => {
    expect(parseNotificationNavigateMessage({ type: "OTHER", url: "/" })).toBeNull();
    expect(parseNotificationNavigateMessage({ type: "SOCIAL_NOTIFICATION_NAVIGATE" })).toBeNull();
    expect(parseNotificationNavigateMessage(null)).toBeNull();
  });
});
