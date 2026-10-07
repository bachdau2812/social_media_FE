import { apiGet, apiSend } from "../../../shared/api";
import type { ArchiveItem, ContentDraft, Page, SavedPost, StoryArchiveItem } from "../model/library.types";

export type SaveDraftRequest = {
  id: string | null;
  draftType: "POST" | "STORY";
  thumbnailUrl: string | null;
  mediaCount: number;
  captionPreview: string;
  payload: string;
};

export type ArchivePostRequest = {
  contentId: string;
  contentType: "POST";
  thumbnailUrl: string | null;
  captionPreview: string;
};

export const libraryApi = {
  saved(userId: string, page = 0, size = 30, signal?: AbortSignal) {
    return apiGet<Page<SavedPost>>(`/me/${encodeURIComponent(userId)}/saved?page=${page}&size=${size}`, { signal });
  },
  drafts(userId: string, signal?: AbortSignal) {
    return apiGet<ContentDraft[]>(`/me/${encodeURIComponent(userId)}/drafts`, { signal });
  },
  saveDraft(userId: string, request: SaveDraftRequest) {
    return apiSend<ContentDraft>(`/me/${encodeURIComponent(userId)}/drafts`, "POST", request);
  },
  archive(userId: string, type?: "POST" | "STORY", signal?: AbortSignal) {
    const query = type ? `?type=${type}` : "";
    return apiGet<ArchiveItem[]>(`/me/${encodeURIComponent(userId)}/archive${query}`, { signal });
  },
  archivePost(userId: string, request: ArchivePostRequest) {
    return apiSend<void>(`/me/${encodeURIComponent(userId)}/archive`, "POST", request);
  },
  storyArchive(userId: string, page = 0, size = 100, signal?: AbortSignal) {
    return apiGet<Page<StoryArchiveItem>>(`/profile-media/${encodeURIComponent(userId)}/stories?page=${page}&size=${size}&mediaType=STORY`, { signal });
  },
  removeSaved(userId: string, postId: string) {
    return apiSend<string>(`/me/${encodeURIComponent(userId)}/saved/items/${encodeURIComponent(postId)}`, "DELETE");
  },
  savePost(userId: string, postId: string) {
    return apiSend(`/me/${encodeURIComponent(userId)}/saved/items`, "POST", { postId });
  },
  deleteDraft(userId: string, draftId: string) {
    return apiSend<string>(`/me/${encodeURIComponent(userId)}/drafts/${encodeURIComponent(draftId)}`, "DELETE");
  },
  restoreArchive(userId: string, contentId: string) {
    return apiSend<string>(`/me/${encodeURIComponent(userId)}/archive/${encodeURIComponent(contentId)}/restore`, "POST");
  },
  deleteArchive(userId: string, itemId: string) {
    return apiSend<string>(`/me/${encodeURIComponent(userId)}/archive/items/${encodeURIComponent(itemId)}`, "DELETE");
  },
};
