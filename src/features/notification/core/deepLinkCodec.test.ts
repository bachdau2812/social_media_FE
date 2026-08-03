import { describe, expect, it } from "vitest";
import type { AppDestination } from "./types";
import {
  decodeNotificationDeepLink,
  encodeNotificationDeepLink,
} from "./deepLinkCodec";

describe("notification deep-link codec", () => {
  const destinations: AppDestination[] = [
    { kind: "home" },
    { kind: "profile", userId: "user 1" },
    { kind: "post", postId: "post-1" },
    { kind: "post", postId: "post-1", commentId: "comment-2", focusComment: true },
    { kind: "conversation", conversationId: "conversation-1", messageId: "message-2", messageSeq: 14, surface: "mini" },
    { kind: "conversation", conversationId: "group-1", panel: "requests" },
    { kind: "story", ownerId: "user-1", storyId: "story-2", storyItemId: "item-3", scope: "owner" },
  ];

  it.each(destinations)("round-trips $kind destinations", (destination) => {
    const encoded = encodeNotificationDeepLink(destination);
    expect(decodeNotificationDeepLink(encoded)).toEqual(destination);
  });

  it("uses a caller-provided SPA base URL without losing its existing query", () => {
    const encoded = encodeNotificationDeepLink(
      { kind: "profile", userId: "user-1" },
      "https://social.test/app?locale=vi",
    );
    const url = new URL(encoded);

    expect(url.pathname).toBe("/app");
    expect(url.searchParams.get("locale")).toBe("vi");
    expect(decodeNotificationDeepLink(encoded)).toEqual({ kind: "profile", userId: "user-1" });
  });

  it("decodes canonical backend paths used by push and in-app notifications", () => {
    expect(decodeNotificationDeepLink("/messages?conversationId=group-1&panel=requests")).toEqual({
      kind: "conversation",
      conversationId: "group-1",
      panel: "requests",
    });
    expect(decodeNotificationDeepLink("/app/posts/post-1?commentId=comment-2")).toEqual({
      kind: "post",
      postId: "post-1",
      commentId: "comment-2",
      focusComment: true,
    });
    expect(decodeNotificationDeepLink("/stories?ownerId=user-1&storyId=story-2&scoped=true")).toEqual({
      kind: "story",
      ownerId: "user-1",
      storyId: "story-2",
      scope: "owner",
    });
    expect(decodeNotificationDeepLink("/stories?ownerId=user-1&storyId=story-2&storyScope=single")).toEqual({
      kind: "story",
      ownerId: "user-1",
      storyId: "story-2",
      scope: "single",
    });
  });

  it("rejects malformed or incomplete deep links", () => {
    expect(decodeNotificationDeepLink("/?notificationTarget=conversation")).toBeNull();
    expect(decodeNotificationDeepLink("/?notificationTarget=unknown&id=1")).toBeNull();
    expect(decodeNotificationDeepLink("not a url")).toBeNull();
  });
});
