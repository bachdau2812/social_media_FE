import { apiGet } from "../../../shared/api";
import type { CursorPage, FeedItemDto } from "../model/feed.dto";

export const feedApi = {
  getPage(userId: string, tab: "DISCOVER" | "FRIENDS", cursor?: string | null, limit = 10) {
    const params = new URLSearchParams({ userId, tab, limit: String(limit) });
    if (cursor) params.set("cursor", cursor);
    return apiGet<CursorPage<FeedItemDto>>(`/feed?${params.toString()}`);
  },
};
