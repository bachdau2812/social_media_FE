import { describe, expect, it } from "vitest";
import { searchPostToResult, searchUserToResult } from "./search.mapper";
import type { RichPostSearchDto, UserDiscoveryDto } from "./search.dto";

describe("Search DTO mappers", () => {
  it("does not replace a missing user name with the backend ID", () => {
    const dto: UserDiscoveryDto = {
      userId: "user-9",
      username: null,
      fullName: null,
      avatarUrl: null,
      viewerFollowsUser: false,
      userFollowsViewer: true,
      friend: false,
      relationship: null,
    };

    const result = searchUserToResult(dto);

    expect(result).toMatchObject({ id: "user-9", username: "", displayName: "Người dùng", relationship: "follows_you" });
    expect(result.metadata).toBeUndefined();
  });

  it("retains Search post hashtags, media ratio, timestamp, and responsive media", () => {
    const dto: RichPostSearchDto = {
      postId: "post-9",
      userId: "user-2",
      authorUsername: "bach",
      authorFullName: "Đậu Đức Bách",
      authorAvatarUrl: null,
      content: "Nội dung",
      hashtags: ["react"],
      mediaRatio: "4:3",
      items: [{
        id: "item-1",
        orderNumber: 0,
        caption: null,
        music: null,
        media: { secureUrl: "https://cdn/post.jpg", resourceType: "IMAGE" },
      }],
      totalMediaItems: 1,
      createdAt: "2026-07-30T10:00:00Z",
    };

    const result = searchPostToResult(dto);

    expect(result).toMatchObject({
      hashtags: ["react"],
      mediaRatio: "4:3",
      createdAt: "2026-07-30T10:00:00Z",
      totalMediaItems: 1,
    });
    expect(result.media).toEqual([{ id: "item-1", thumbnailUrl: "https://cdn/post.jpg", mediaType: "IMAGE" }]);
  });
});
