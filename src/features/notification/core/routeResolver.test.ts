import { describe, expect, it } from "vitest";
import { resolveNotificationRoute } from "./routeResolver";

describe("resolveNotificationRoute", () => {
  it("uses an explicit destination without inferring from the action", () => {
    const destination = {
      kind: "post",
      postId: "post-1",
      commentId: "comment-1",
      focusComment: true,
    } as const;

    expect(resolveNotificationRoute({ actionType: "SYSTEM", destination })).toEqual(destination);
  });

  it("resolves a new message to its conversation and message", () => {
    expect(resolveNotificationRoute({
      actionType: "SEND_MESSAGE",
      entityId: "message-9",
      metadata: { conversationId: "conversation-2", messageSeq: "17" },
    })).toEqual({
      kind: "conversation",
      conversationId: "conversation-2",
      messageId: "message-9",
      messageSeq: 17,
    });
  });

  it("resolves follow notifications to the actor profile", () => {
    expect(resolveNotificationRoute({
      actionType: "FOLLOW_EVENT",
      actorId: "user-4",
    })).toEqual({ kind: "profile", userId: "user-4" });
  });

  it("resolves a post like to the post detail", () => {
    expect(resolveNotificationRoute({
      actionType: "LIKE",
      entityType: "POST",
      entityId: "post-3",
    })).toEqual({ kind: "post", postId: "post-3" });
  });

  it("resolves a Story Like to only the referenced Story", () => {
    expect(resolveNotificationRoute({
      actionType: "LIKE_STORY",
      actorId: "actor-1",
      entityType: "STORY",
      entityId: "story-3",
      metadata: { STORY_OWNER_ID: "owner-1", STORY_ID: "story-3" },
    })).toEqual({
      kind: "story",
      ownerId: "owner-1",
      storyId: "story-3",
      scope: "single",
    });
  });

  it("resolves a comment to its post and focuses the comment", () => {
    expect(resolveNotificationRoute({
      actionType: "COMMENT",
      entityId: "comment-5",
      metadata: { postId: "post-3" },
    })).toEqual({
      kind: "post",
      postId: "post-3",
      commentId: "comment-5",
      focusComment: true,
    });
  });

  it("keeps direct story and story activity destinations independent", () => {
    expect(resolveNotificationRoute({
      actionType: "STORY_DIRECT",
      actorId: "user-7",
      metadata: { storyId: "story-8", storyItemId: "item-9" },
    })).toEqual({
      kind: "story",
      ownerId: "user-7",
      storyId: "story-8",
      storyItemId: "item-9",
      scope: "owner",
    });

    expect(resolveNotificationRoute({
      actionType: "STORY_ACTIVITY",
      actorId: "user-7",
    })).toEqual({ kind: "profile", userId: "user-7" });
  });

  it("opens the pending request panel for a group join request", () => {
    expect(resolveNotificationRoute({
      actionType: "CHAT_MEMBER_REQUEST",
      entityId: "conversation-6",
    })).toEqual({
      kind: "conversation",
      conversationId: "conversation-6",
      panel: "requests",
    });
  });

  it("accepts backend upper-snake-case metadata and separates request from membership", () => {
    expect(resolveNotificationRoute({
      actionType: "CHAT_MEMBER_REQUEST",
      entityId: "request-1",
      metadata: { CONVERSATION_ID: "group-2" },
    })).toEqual({
      kind: "conversation",
      conversationId: "group-2",
      panel: "requests",
    });

    expect(resolveNotificationRoute({
      actionType: "CHAT_GROUP_MEMBER_ADDED",
      metadata: { CONVERSATION_ID: "group-2" },
    })).toEqual({
      kind: "conversation",
      conversationId: "group-2",
    });
  });

  it("returns null when the action lacks required destination data", () => {
    expect(resolveNotificationRoute({ actionType: "COMMENT", entityId: "comment-5" })).toBeNull();
    expect(resolveNotificationRoute({ actionType: "SEND_MESSAGE", entityId: "message-9" })).toBeNull();
  });
});
