import type { RichPostSearchDto, UserDiscoveryDto } from "./search.dto";
import type { PostSearchResult, SearchRelationship, UserSearchResult } from "./search.types";

function relationship(item: UserDiscoveryDto): SearchRelationship {
  if (item.friend) return "friends";
  if (item.viewerFollowsUser) return "following";
  if (item.userFollowsViewer) return "follows_you";
  return "none";
}

export function searchUserToResult(item: UserDiscoveryDto): UserSearchResult {
  const username = item.username?.trim() || "";
  return {
    id: item.userId,
    username,
    displayName: item.fullName?.trim() || username || "Người dùng",
    avatarUrl: item.avatarUrl || null,
    relationship: relationship(item),
  };
}

export function searchPostToResult(item: RichPostSearchDto): PostSearchResult {
  const username = item.authorUsername?.trim() || "";
  return {
    id: item.postId,
    author: {
      id: item.userId,
      username,
      displayName: item.authorFullName?.trim() || username || "Người dùng",
      avatarUrl: item.authorAvatarUrl || null,
    },
    caption: item.content || "",
    hashtags: item.hashtags,
    mediaRatio: item.mediaRatio,
    createdAt: item.createdAt,
    totalMediaItems: item.totalMediaItems,
    media: item.items.flatMap((postItem) => {
      const url = postItem.media?.secureUrl || postItem.media?.url;
      if (!url) return [];
      const mediaType = (postItem.media?.resourceType || postItem.media?.mediaFormat || "IMAGE")
        .toUpperCase().match(/VIDEO|MP4|WEBM|MOV/) ? "VIDEO" as const : "IMAGE" as const;
      return [{ id: postItem.id, thumbnailUrl: url, mediaType }];
    }),
  };
}
