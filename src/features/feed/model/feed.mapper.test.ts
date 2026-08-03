import { describe, expect, it } from "vitest";
import { feedItemToPost } from "./feed.mapper";
import type { FeedItemDto } from "./feed.dto";

const feedItem: FeedItemDto = {
  postId: "post-1",
  userId: "user-1",
  authorUsername: "bach",
  authorFullName: "Đậu Đức Bách",
  authorAvatarUrl: null,
  content: "Nội dung",
  hashtags: ["react"],
  mediaRatio: "4:3",
  media: [],
  music: null,
  items: [],
  likeCount: 4,
  commentCount: 2,
  repostCount: 1,
  likedByCurrentUser: true,
  repostedByCurrentUser: false,
  createdAt: "2026-07-30T10:00:00Z",
  updatedAt: "2026-07-30T10:01:00Z",
  sourceType: "FOLLOWING",
  recommendationReason: "Bạn đang theo dõi tác giả",
  rankingVersion: "rank-v2",
  experimentId: "feed-a",
  impressionToken: "imp-7",
};

describe("feedItemToPost", () => {
  it("keeps the original post ID while mapping a distinct repost feed entry", () => {
    const post = feedItemToPost({
      ...feedItem,
      feedEntryId: "repost-1",
      activityType: "REPOST",
      activityAt: "2026-07-31T01:00:00Z",
      reposter: {
        id: "friend-1",
        username: "an",
        displayName: "An",
        avatarUrl: "https://cdn.example/an.jpg",
      },
    });

    expect(post.id).toBe("post-1");
    expect(post.feedEntryId).toBe("repost-1");
    expect(post.feedActivity).toEqual({
      type: "REPOST",
      occurredAt: "2026-07-31T01:00:00Z",
      actor: {
        id: "friend-1",
        username: "an",
        displayName: "An",
        avatarUrl: "https://cdn.example/an.jpg",
      },
    });
  });

  it("falls back to post ID for legacy feed items without activity metadata", () => {
    const post = feedItemToPost(feedItem);

    expect(post.feedEntryId).toBe("post-1");
    expect(post.feedActivity).toBeUndefined();
  });

  it("preserves additive recommendation metadata without changing the Post rendering model", () => {
    const post = feedItemToPost(feedItem);

    expect(post.author).toMatchObject({ id: "user-1", username: "bach", displayName: "Đậu Đức Bách" });
    expect(post.engagement).toMatchObject({ likes: 4, comments: 2, reposts: 1 });
    expect(post.recommendation).toEqual({
      sourceType: "FOLLOWING",
      reason: "Bạn đang theo dõi tác giả",
      rankingVersion: "rank-v2",
      experimentId: "feed-a",
      impressionToken: "imp-7",
    });
  });

  it("does not expose a user ID as a missing display name", () => {
    const post = feedItemToPost({ ...feedItem, authorUsername: null, authorFullName: null });

    expect(post.author.username).toBe("");
    expect(post.author.displayName).toBe("Người dùng");
    expect(post.author.displayName).not.toContain("user-1");
  });
});
