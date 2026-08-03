import type { Post } from "./post.types";
import { normalizePostMediaRatio } from "./postMediaRatio";
import type { LegacyPostMediaDto, PostDetailsDto, PostItemDto, PostMusicDto } from "./post.dto";

export function musicDtoToPostMusic(music?: PostMusicDto | null) {
  if (!music?.id || !music.playbackUrl) return null;
  return {
    id: music.id,
    displayName: music.displayName || music.id,
    artist: music.artist,
    artworkUrl: music.artworkUrl,
    playbackUrl: music.playbackUrl,
    segmentStart: music.segmentStart,
    segmentEnd: music.segmentEnd,
    duration: music.duration,
  };
}

export function postItemDtosToMedia(postId: string, items?: PostItemDto[] | null): Post["media"] {
  return (items ?? [])
    .filter((postItem) => postItem.media?.secureUrl || postItem.media?.url)
    .sort((left, right) => (left.orderNumber ?? 0) - (right.orderNumber ?? 0))
    .map((postItem, index) => {
      const media = postItem.media!;
      const width = Number(media.width ?? 0);
      const height = Number(media.height ?? 0);
      return {
        id: postItem.id || media.assetId || `${postId}-${index}`,
        orderNumber: postItem.orderNumber ?? undefined,
        type: ((media.resourceType ?? media.mediaFormat ?? "IMAGE").toUpperCase().match(/VIDEO|MP4|WEBM|MOV/) ? "VIDEO" : "IMAGE") as "IMAGE" | "VIDEO",
        url: media.secureUrl || media.url || "",
        aspectRatio: width > 0 && height > 0 ? height / width : 1.25,
        alt: media.displayName || postItem.caption || "Post media",
        caption: postItem.caption || null,
        music: musicDtoToPostMusic(postItem.music),
      };
    });
}

export function legacyPostMedia(postId: string, mediaItems?: LegacyPostMediaDto[] | null): Post["media"] {
  return (mediaItems ?? []).map((media, index) => ({
    id: media.assetId ?? `${postId}-${index}`,
    type: ((media.resourceType ?? "IMAGE").toUpperCase().includes("VIDEO") ? "VIDEO" : "IMAGE") as "IMAGE" | "VIDEO",
    url: media.secureUrl || media.url || "",
    aspectRatio: 1.25,
    alt: media.displayName || "Post media",
    caption: null,
    music: null,
  })).filter((media) => media.url);
}

export function normalizePostHashtags(value?: string[] | string | null): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item).replace(/^#/, "")).filter(Boolean);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map((item) => String(item).replace(/^#/, "")).filter(Boolean) : [];
  } catch {
    return String(value).split(/[ ,]+/).map((item) => item.replace(/^#/, "")).filter(Boolean);
  }
}

export function postDetailsToPost(item: PostDetailsDto): Post {
  const itemMedia = postItemDtosToMedia(item.postId, item.items);
  return {
    id: item.postId,
    author: {
      id: item.userId,
      username: item.authorUsername?.trim() || "",
      displayName: item.authorFullName?.trim() || item.authorUsername?.trim() || "Người dùng",
      avatarUrl: "",
    },
    createdAt: item.createdAt ?? "",
    layoutVariant: itemMedia.length ? "STANDARD" : "TEXT",
    mediaRatio: normalizePostMediaRatio(item.mediaRatio),
    caption: item.content || "",
    hashtags: normalizePostHashtags(item.hashtags ?? item.hashtag),
    music: musicDtoToPostMusic(item.music),
    media: itemMedia,
    engagement: {
      likes: 0,
      comments: 0,
      reposts: 0,
      shares: 0,
      saves: 0,
    },
    viewerState: {
      liked: false,
      saved: false,
      reposted: false,
    },
    comments: [],
  };
}

export function mergePostDetail(base: Post, detail: PostDetailsDto): Post {
  const hydrated = postDetailsToPost(detail);
  return {
    ...base,
    createdAt: hydrated.createdAt,
    caption: hydrated.caption,
    hashtags: hydrated.hashtags,
    mediaRatio: hydrated.mediaRatio,
    music: hydrated.music,
    media: hydrated.media.length ? hydrated.media : base.media,
  };
}
