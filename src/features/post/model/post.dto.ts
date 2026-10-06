export type PostInteractionRequest = {
  postId: string;
  isClick: boolean;
  viewTime: number;
  eventId: string;
  impressionId: string;
};

export type PostInteractionAcceptedResponse = {
  eventId: string;
  computedScore: number;
  duplicate: boolean;
};

export type PostMusicDto = {
  id: string;
  displayName: string;
  artist?: string | null;
  artworkUrl?: string | null;
  playbackUrl: string;
  segmentStart?: number | null;
  segmentEnd?: number | null;
  duration?: number | null;
};

export type PostMediaDto = {
  assetId?: string | null;
  publicId?: string | null;
  mediaFormat?: string | null;
  resourceType?: string | null;
  url?: string | null;
  secureUrl?: string | null;
  displayName?: string | null;
  width?: number | null;
  height?: number | null;
};

export type PostItemDto = {
  id: string;
  orderNumber?: number | null;
  caption?: string | null;
  media?: PostMediaDto | null;
  music?: PostMusicDto | null;
};

export type LegacyPostMediaDto = {
  assetId?: string;
  resourceType?: string;
  url?: string;
  secureUrl?: string;
  displayName?: string;
};

export type PostDetailsDto = {
  postId: string;
  userId: string;
  authorUsername: string | null;
  authorFullName: string | null;
  content: string | null;
  hashtag: string | null;
  hashtags: string[] | null;
  mediaRatio: string | null;
  validateStatus: string | null;
  musicId: string | null;
  musicStart: number | null;
  musicEnd: number | null;
  music: PostMusicDto | null;
  items: PostItemDto[] | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type PostUpdateItemRequest = {
  itemId?: string | null;
  orderNumber: number;
  secureUrl?: string | null;
  publicId?: string | null;
  resourceType?: string | null;
  caption?: string | null;
  media?: PostMediaDto | null;
  musicId?: string | null;
  musicStart?: number | null;
  musicEnd?: number | null;
};

export type PostUpdateRequest = {
  postId: string;
  userId: string;
  content?: string | null;
  hashtag?: string[] | null;
  mediaRatio?: string | null;
  visibility?: string | null;
  musicId?: string | null;
  musicStart?: number | null;
  musicEnd?: number | null;
  items?: PostUpdateItemRequest[] | null;
};

export type RepostToggleResponse = {
  postId: string;
  reposted: boolean;
  repostId?: string | null;
  repostCount: number;
};
