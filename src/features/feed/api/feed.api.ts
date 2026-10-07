import { apiGet } from "../../../shared/api";
import type { CursorPage, FeedItemDto, HomeScreenPayload } from "../model/feed.dto";

export const feedApi = {
  getHomePage(
    userId: string,
    tab: "DISCOVER" | "FRIENDS",
    page: number,
    signal?: AbortSignal,
  ) {
    const params = new URLSearchParams({
      userId,
      tab,
      limit: "20",
      page: String(page),
      mediaType: "FEED",
    });
    return apiGet<HomeScreenPayload>(`/home?${params.toString()}`, { signal });
  },

  getPage(userId: string, tab: "DISCOVER" | "FRIENDS", cursor?: string | null, limit = 10) {
    const params = new URLSearchParams({ userId, tab, limit: String(limit) });
    if (cursor) params.set("cursor", cursor);
    return apiGet<CursorPage<FeedItemDto>>(`/feed?${params.toString()}`);
  },
};
