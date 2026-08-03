import { apiGet, apiSend } from "../../../shared/api";
import type { ArchiveItem, ContentDraft, Page, SavedPost, StoryArchiveItem } from "../model/library.types";

export const libraryApi = {
  saved(userId: string, page = 0, size = 30) {
    return apiGet<Page<SavedPost>>(`/me/${encodeURIComponent(userId)}/saved?page=${page}&size=${size}`);
  },
  drafts(userId: string) {
    return apiGet<ContentDraft[]>(`/me/${encodeURIComponent(userId)}/drafts`);
  },
  archive(userId: string, type?: "POST" | "STORY") {
    const query = type ? `?type=${type}` : "";
    return apiGet<ArchiveItem[]>(`/me/${encodeURIComponent(userId)}/archive${query}`);
  },
  storyArchive(userId: string, page = 0, size = 100) {
    return apiGet<Page<StoryArchiveItem>>(`/profile-media/${encodeURIComponent(userId)}/stories?page=${page}&size=${size}&mediaType=STORY`);
  },
  removeSaved(userId: string, postId: string) {
    return apiSend<string>(`/me/${encodeURIComponent(userId)}/saved/items/${encodeURIComponent(postId)}`, "DELETE");
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
