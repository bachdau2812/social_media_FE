import {
  isMusicDto,
  isMusicFetchFailedEvent,
  MUSIC_FETCH_RESULT_EVENT,
  type MusicFetchResult,
} from "./musicCatalog";

export const MUSIC_FETCH_SUCCESS_EVENT_TYPE = "music_fetch_success";
export const MUSIC_FETCH_FAILED_EVENT_TYPE = "music_fetch_failed";

export function parseMusicFetchEvent(type: string, payload: string): MusicFetchResult | null {
  try {
    const value: unknown = JSON.parse(payload);
    if (type === MUSIC_FETCH_SUCCESS_EVENT_TYPE && isMusicDto(value)) return { kind: "success", music: value };
    if (type === MUSIC_FETCH_FAILED_EVENT_TYPE && isMusicFetchFailedEvent(value)) return { kind: "failure", ...value };
    return null;
  } catch { return null; }
}

export function publishMusicFetchEvent(result: MusicFetchResult) {
  window.dispatchEvent(new CustomEvent<MusicFetchResult>(MUSIC_FETCH_RESULT_EVENT, { detail: result }));
}
