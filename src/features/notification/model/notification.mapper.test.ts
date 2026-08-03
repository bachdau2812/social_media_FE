import { describe, expect, it } from "vitest";
import { notificationToViewItem } from "./notification.mapper";

describe("notificationToViewItem", () => {
  it("preserves backend time and never exposes an actor id as a display name", () => {
    const item = notificationToViewItem({
      id: "notification-1",
      userId: "viewer-1",
      actorId: "private-user-id",
      actorUsername: null,
      actorDisplayName: null,
      actorAvatarUrl: null,
      actionType: "LIKE_POST",
      entityId: "post-1",
      entityType: "POST",
      contentThumbnailUrl: null,
      entityAvailable: true,
      status: "UNREAD",
      readAt: null,
      createdAt: "2026-07-30T10:00:00Z",
      content: null,
      metadata: null,
      deepLink: null,
    });

    expect(item.actor).toBe("Người dùng");
    expect(item.actor).not.toContain("private-user-id");
    expect(item.createdAt).toBe("2026-07-30T10:00:00Z");
  });
});
