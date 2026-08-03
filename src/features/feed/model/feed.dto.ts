import type { LegacyPostMediaDto, PostItemDto, PostMusicDto } from "../../post";
import type { StoryTrayDto } from "../../story";

export type FeedActorDto = {
  id: string;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
};

export type FeedItemDto = {
  postId: string;
  userId: string;
  authorUsername: string | null;
  authorFullName: string | null;
  authorAvatarUrl: string | null;
  content: string | null;
  hashtags: string[] | null;
  mediaRatio: string | null;
  media: LegacyPostMediaDto[] | null;
  music: PostMusicDto | null;
  items: PostItemDto[] | null;
  likeCount: number;
  commentCount: number;
  repostCount: number;
  likedByCurrentUser: boolean;
  repostedByCurrentUser: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  sourceType: string | null;
  recommendationReason: string | null;
  rankingVersion: string | null;
  experimentId: string | null;
  impressionToken: string | null;
  feedEntryId?: string | null;
  activityType?: "ORIGINAL_POST" | "REPOST" | null;
  activityAt?: string | null;
  reposter?: FeedActorDto | null;
};

export type CursorPage<T> = { items: T[]; nextCursor?: string | null; hasMore: boolean };
export type FeedPageDto = { userId: string; limit: number; items: FeedItemDto[]; hasMore: boolean };
export type HomeTabDto = { id: string; label: string; unreadCount: number };
export type HomeScreenPayload = {
  activeTab: string;
  tabs: HomeTabDto[];
  storyTray: StoryTrayDto[];
  feed: FeedPageDto;
  suggestedUsers: string[];
};
