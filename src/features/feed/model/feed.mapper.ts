import {
  legacyPostMedia,
  musicDtoToPostMusic,
  normalizePostHashtags,
  normalizePostMediaRatio,
  postItemDtosToMedia,
  type Post,
} from "../../post";
import type { FeedItemDto } from "./feed.dto";

function optionalText(value: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

export function feedItemToPost(item: FeedItemDto): Post {
  const itemMedia = postItemDtosToMedia(item.postId, item.items);
  const media = itemMedia.length ? itemMedia : legacyPostMedia(item.postId, item.media);
  const recommendation = {
    sourceType: optionalText(item.sourceType),
    reason: optionalText(item.recommendationReason),
    rankingVersion: optionalText(item.rankingVersion),
    experimentId: optionalText(item.experimentId),
    impressionToken: optionalText(item.impressionToken),
  };
  const activityType = item.activityType === "ORIGINAL_POST" || item.activityType === "REPOST"
    ? item.activityType
    : undefined;
  const activityAt = optionalText(item.activityAt ?? null);
  const reposterId = optionalText(item.reposter?.id ?? null);
  const reposter = reposterId ? {
    id: reposterId,
    username: optionalText(item.reposter?.username ?? null) ?? "",
    displayName: optionalText(item.reposter?.displayName ?? null)
      ?? optionalText(item.reposter?.username ?? null)
      ?? "Người dùng",
    avatarUrl: optionalText(item.reposter?.avatarUrl ?? null) ?? "",
  } : undefined;

  return {
    id: item.postId,
    feedEntryId: optionalText(item.feedEntryId ?? null) ?? item.postId,
    feedActivity: activityType && activityAt
      ? { type: activityType, occurredAt: activityAt, actor: reposter }
      : undefined,
    author: {
      id: item.userId,
      username: item.authorUsername?.trim() || "",
      displayName: item.authorFullName?.trim() || item.authorUsername?.trim() || "Người dùng",
      avatarUrl: item.authorAvatarUrl || "",
    },
    createdAt: item.createdAt ?? "",
    layoutVariant: media.length ? "STANDARD" : "TEXT",
    mediaRatio: normalizePostMediaRatio(item.mediaRatio),
    caption: item.content || "",
    hashtags: normalizePostHashtags(item.hashtags),
    music: musicDtoToPostMusic(item.music),
    media,
    engagement: {
      likes: item.likeCount,
      comments: item.commentCount,
      reposts: item.repostCount,
      shares: 0,
      saves: 0,
    },
    viewerState: {
      liked: item.likedByCurrentUser,
      saved: false,
      reposted: item.repostedByCurrentUser,
    },
    comments: [],
    recommendation,
  };
}

export function feedEntryIdentity(post: Post): string {
  return post.feedEntryId || post.id;
}
