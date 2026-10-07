import { apiGet, apiSend } from "../../../shared/api";
import type { Page, StoryArchiveDto, StoryHighlightDto, StoryViewerDto } from "../model/story.dto";

export type StoryReplyResponseDto = {
  conversationId: string;
  messageId: string;
  messageSeq: number;
};

export type StoryCreateRequestDto = {
  userId: string;
  mediaUrl: string;
  musicId: string | null;
  musicUrl: string | null;
  musicStart: number | null;
  musicEnd: number | null;
  publicationId: string;
  publicationOrder: number;
  publicationItemCount: number;
};

export const storyApi = {
  create(request: StoryCreateRequestDto) {
    return apiSend<unknown>("/profile-media/stories", "POST", request);
  },
  archive(ownerId: string, page = 0, size = 60) {
    return apiGet<Page<StoryArchiveDto>>(`/profile-media/${encodeURIComponent(ownerId)}/stories?page=${page}&size=${size}&mediaType=STORY`);
  },
  recordView(storyId: string, viewerId: string, reaction?: string) {
    const params = new URLSearchParams({ viewerId });
    if (reaction) params.set("reaction", reaction);
    return apiSend<void>(`/profile-media/stories/${encodeURIComponent(storyId)}/views?${params.toString()}`, "POST");
  },
  like(storyId: string) {
    return apiSend<boolean>(`/profile-media/stories/${encodeURIComponent(storyId)}/like`, "PUT");
  },
  unlike(storyId: string) {
    return apiSend<boolean>(`/profile-media/stories/${encodeURIComponent(storyId)}/like`, "DELETE");
  },
  reply(storyId: string, body: { content: string; clientMessageId: string; previewAtMs: number }) {
    return apiSend<StoryReplyResponseDto>(
      `/profile-media/stories/${encodeURIComponent(storyId)}/replies`,
      "POST",
      body,
    );
  },
  viewers(storyId: string, ownerId: string, page = 0, size = 20, query = "") {
    return apiGet<Page<StoryViewerDto>>(`/profile-media/stories/${encodeURIComponent(storyId)}/viewers?ownerId=${encodeURIComponent(ownerId)}&page=${page}&size=${size}${query ? `&query=${encodeURIComponent(query)}` : ""}`);
  },
  deleteStory(storyId: string) {
    return apiSend<void>(`/profile-media/stories/${encodeURIComponent(storyId)}`, "DELETE");
  },
  highlights(ownerId: string) {
    return apiGet<StoryHighlightDto[]>(`/profile-media/${encodeURIComponent(ownerId)}/highlights`);
  },
  createHighlight(ownerId: string, title: string, storyIds: string[], coverStoryId?: string | null) {
    return apiSend<StoryHighlightDto>("/profile-media/highlights", "POST", { ownerId, title, storyIds, coverStoryId });
  },
  updateHighlight(highlightId: string, ownerId: string, title: string, storyIds: string[], coverStoryId?: string | null) {
    return apiSend<StoryHighlightDto>(`/profile-media/highlights/${encodeURIComponent(highlightId)}`, "PUT", { ownerId, title, storyIds, coverStoryId });
  },
  deleteHighlight(highlightId: string, ownerId: string) {
    return apiSend<void>(`/profile-media/highlights/${encodeURIComponent(highlightId)}?ownerId=${encodeURIComponent(ownerId)}`, "DELETE");
  },
};
