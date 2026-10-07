import { apiGet } from "../api";
import type { MusicDto } from "./musicCatalog";

export type MusicPage = { content: MusicDto[]; pageNumber?: number; totalPages?: number };

export const musicCatalogApi = {
  search(keyword: string, page = 0, size = 10, signal?: AbortSignal) {
    const query = `/musics?page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}`;
    return apiGet<MusicPage>(query, signal ? { signal } : undefined);
  },
};
