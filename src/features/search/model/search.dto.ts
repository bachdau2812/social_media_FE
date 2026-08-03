import type { PostItemDto } from "../../post";

export type Page<T> = {
  content: T[];
  pageNumber: number;
  totalElements: number;
  totalPages: number;
};

export type UserDiscoveryDto = {
  userId: string;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  viewerFollowsUser: boolean;
  userFollowsViewer: boolean;
  friend: boolean;
  relationship: string | null;
};

export type RichPostSearchDto = {
  postId: string;
  userId: string;
  authorUsername: string | null;
  authorFullName: string | null;
  authorAvatarUrl: string | null;
  content: string | null;
  hashtags: string[];
  mediaRatio: string | null;
  items: PostItemDto[];
  totalMediaItems: number;
  createdAt: string | null;
};
