import type { MusicDto } from "../../../shared/music";

export type DraftStatus = "ready" | "uploading" | "publishing" | "published" | "failed";
export type DraftBackground = "black" | "soft" | "blur";
export type DraftFit = "contain" | "cover";

export type StoryDraft = {
  id: string;
  file: File | null;
  previewUrl: string;
  secureUrl?: string;
  publicId?: string;
  resourceType?: string;
  fileName: string;
  mediaType: "IMAGE" | "VIDEO";
  status: DraftStatus;
  fit: DraftFit;
  background: DraftBackground;
  muted: boolean;
  music: MusicDto | null;
  musicStart: number | null;
  musicEnd: number | null;
  error?: string;
};

export type StoryDraftSaveRequest = {
  id: string | null;
  draftType: "STORY";
  thumbnailUrl: string | null;
  mediaCount: number;
  captionPreview: string;
  payload: string;
};
