export type SavedPost = {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
};

export type ContentDraft = {
  id: string;
  userId: string;
  draftType: "POST" | "STORY";
  thumbnailUrl?: string | null;
  mediaCount: number;
  captionPreview?: string | null;
  payload?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DraftResumeIntent =
  | { kind: "POST"; draft: ContentDraft & { draftType: "POST" } }
  | { kind: "STORY"; draft: ContentDraft & { draftType: "STORY" } };

export function toDraftResumeIntent(draft: ContentDraft): DraftResumeIntent {
  return draft.draftType === "POST"
    ? { kind: "POST", draft: draft as ContentDraft & { draftType: "POST" } }
    : { kind: "STORY", draft: draft as ContentDraft & { draftType: "STORY" } };
}

export type ArchiveItem = {
  id: string;
  userId: string;
  contentId: string;
  contentType: "POST" | "STORY" | string;
  thumbnailUrl?: string | null;
  captionPreview?: string | null;
  archivedAt: string;
};

export type StoryArchiveItem = {
  id: string;
  userId: string;
  username?: string | null;
  fullName?: string | null;
  mediaUrl?: string | null;
  mediaType?: string | null;
  createdAt?: string | null;
  expiredAt?: string | null;
  status?: string | null;
};

export type Page<T> = {
  content: T[];
  pageNumber: number;
  totalElements: number;
  totalPages: number;
};

export type LibraryState = {
  saved: Array<{ id: string; postId: string; createdAt: string }>;
  drafts: Array<{ id: string; draftType: string; thumbnailUrl?: string; mediaCount: number; captionPreview: string; updatedAt: string }>;
  archive: Array<{ id: string; contentId: string; contentType: string; thumbnailUrl?: string; captionPreview: string; archivedAt: string }>;
};
