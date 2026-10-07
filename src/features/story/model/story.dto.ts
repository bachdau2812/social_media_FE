export type StoryTrayDto = {
  id: string;
  userId: string;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  musicId: string | null;
  musicUrl: string | null;
  musicName: string | null;
  musicStart: number | null;
  musicEnd: number | null;
  durationSeconds: number | null;
  status: string | null;
  createdAt: string | null;
  expiredAt: string | null;
  publicationId: string | null;
  publicationOrder: number | null;
  publicationItemCount: number | null;
  viewerSeen: boolean | null;
  viewerReaction?: string | null;
};

export type StoryArchiveDto = {
  id: string;
  userId: string;
  mediaUrl: string | null;
  mediaType: string | null;
  musicId: string | null;
  musicUrl: string | null;
  musicName: string | null;
  musicStart: number | null;
  musicEnd: number | null;
  durationSeconds: number | null;
  publicationId: string | null;
  publicationOrder: number | null;
  publicationItemCount: number | null;
  status: string | null;
  createdAt: string | null;
  expiredAt: string | null;
  viewerSeen: boolean | null;
};

export type StoryHighlightDto = {
  id: string;
  ownerId: string;
  title: string;
  coverStoryId?: string | null;
  coverUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  stories: StoryArchiveDto[];
};

export type StoryViewerDto = {
  userId: string;
  username?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
  reaction?: string | null;
  viewedAt: string;
  viewerFollowsUser?: boolean;
};

export type Page<T> = { content: T[]; pageNumber: number; totalElements: number; totalPages: number };
