import { apiGet, apiSend } from "../../../shared/api";
import type { SuggestionPage } from "../model/suggestion.types";

export const suggestionsApi = {
  list(viewerId: string, page = 0, size = 8, signal?: AbortSignal) {
    return apiGet<SuggestionPage>(`/search/users/suggested?viewerId=${encodeURIComponent(viewerId)}&page=${page}&size=${size}`, { signal });
  },
  refresh(viewerId: string, page = 0, size = 30) {
    return apiSend<SuggestionPage>(`/search/users/suggested/refresh?viewerId=${encodeURIComponent(viewerId)}&page=${page}&size=${size}`, "POST");
  },
  follow(viewerId: string, userId: string) {
    return apiSend("/user-followers/follow", "POST", { followerId: viewerId, followingId: userId });
  },
};
