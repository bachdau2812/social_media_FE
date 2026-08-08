import { apiSend } from "../api";

export type MusicDto = {
  id: string;
  slugName: string | null;
  displayName: string;
  descriptions: string | null;
  displayImages: string | null;
  singleName: string | null;
  songUrl: string | null;
  duration: number | null;
  category: string | null;
  releaseYear: number | null;
  albumName: string | null;
  fetched: boolean;
};

export type MusicFetchStatus = "STARTED" | "PROCESSING" | "ALREADY_FETCHED";

export type MusicFetchAcceptedResponse = {
  trackId: string;
  status: MusicFetchStatus;
};

export type MusicFetchFailedEvent = {
  trackId: string;
  message: string;
};

export type MusicFetchResult =
  | { kind: "success"; music: MusicDto }
  | ({ kind: "failure" } & MusicFetchFailedEvent);

export const MUSIC_FETCH_RESULT_EVENT = "music-fetch-result";

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isNullableNumber(value: unknown): value is number | null {
  return value === null || typeof value === "number";
}

export function isMusicDto(value: unknown): value is MusicDto {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === "string"
    && typeof candidate.displayName === "string"
    && typeof candidate.fetched === "boolean"
    && isNullableString(candidate.slugName)
    && isNullableString(candidate.descriptions)
    && isNullableString(candidate.displayImages)
    && isNullableString(candidate.singleName)
    && isNullableString(candidate.songUrl)
    && isNullableNumber(candidate.duration)
    && isNullableString(candidate.category)
    && isNullableNumber(candidate.releaseYear)
    && isNullableString(candidate.albumName);
}

export function isMusicFetchFailedEvent(value: unknown): value is MusicFetchFailedEvent {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.trackId === "string" && typeof candidate.message === "string";
}

export function requestMusicFetch(trackId: string): Promise<MusicFetchAcceptedResponse> {
  return apiSend<MusicFetchAcceptedResponse>(
    `/musics/${encodeURIComponent(trackId)}/fetch`,
    "POST",
  );
}
