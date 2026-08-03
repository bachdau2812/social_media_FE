import type { PostMediaRatio } from "./postMediaRatio";

export type PostAuthor = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  relationship?: "NONE" | "FOLLOWING" | "FOLLOWED_BY" | "FRIEND";
};

export type PostMusic = {
  id: string;
  displayName: string;
  artist?: string | null;
  artworkUrl?: string | null;
  playbackUrl: string;
  segmentStart?: number | null;
  segmentEnd?: number | null;
  duration?: number | null;
};

export type PostMedia = {
  id: string;
  orderNumber?: number;
  type: "IMAGE" | "VIDEO";
  url: string;
  aspectRatio: number;
  alt: string;
  caption?: string | null;
  music?: PostMusic | null;
};

export type Post = {
  id: string;
  feedEntryId?: string;
  feedActivity?: {
    type: "ORIGINAL_POST" | "REPOST";
    occurredAt: string;
    actor?: PostAuthor;
  };
  author: PostAuthor;
  createdAt: string;
  layoutVariant: "STANDARD" | "FEATURED" | "TEXT" | "COLLECTION";
  mediaRatio: PostMediaRatio;
  caption: string;
  hashtags?: string[];
  music?: PostMusic | null;
  media: PostMedia[];
  engagement: { likes: number; comments: number; reposts: number; shares: number; saves: number };
  viewerState: { liked: boolean; saved: boolean; reposted: boolean };
  comments: Array<{ id: string; author: string; text: string; likes: number }>;
  recommendation?: {
    sourceType?: string;
    reason?: string;
    rankingVersion?: string;
    experimentId?: string;
    impressionToken?: string;
  };
};
