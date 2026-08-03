import { apiGet } from "../../../shared/api";
import type { Page, RichPostSearchDto, UserDiscoveryDto } from "../model/search.dto";

export const searchApi = {
  users(viewerId: string, query: string, signal: AbortSignal) {
    return apiGet<Page<UserDiscoveryDto>>(
      `/search/users/rich?viewerId=${encodeURIComponent(viewerId)}&q=${encodeURIComponent(query)}&page=0&size=20`,
      { signal },
    );
  },
  posts(query: string, signal: AbortSignal) {
    return apiGet<Page<RichPostSearchDto>>(
      `/posts/search/rich?query=${encodeURIComponent(query)}&page=0&limit=20`,
      { signal },
    );
  },
};
