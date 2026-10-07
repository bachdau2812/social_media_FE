import { useCallback, useEffect, useRef, useState } from "react";
import { emitAppToast } from "../notifications/appToast";
import {
  isMusicDto,
  isMusicFetchFailedEvent,
  MUSIC_FETCH_RESULT_EVENT,
  requestMusicFetch,
  type MusicDto,
  type MusicFetchResult,
} from "./musicCatalog";

export type MusicFetchControllerOptions = {
  previewingId: string | null;
  stopPreview: () => void;
  onFetched: (music: MusicDto) => void;
};

export function useMusicFetchController({ previewingId, stopPreview, onFetched }: MusicFetchControllerOptions) {
  const [fetchingTrackIds, setFetchingTrackIds] = useState<Set<string>>(() => new Set());
  const fetchingRef = useRef(new Set<string>());
  const previewingIdRef = useRef(previewingId);
  const stopPreviewRef = useRef(stopPreview);
  const onFetchedRef = useRef(onFetched);
  previewingIdRef.current = previewingId;
  stopPreviewRef.current = stopPreview;
  onFetchedRef.current = onFetched;

  const finish = useCallback((trackId: string) => {
    if (!fetchingRef.current.delete(trackId)) return;
    setFetchingTrackIds((current) => {
      if (!current.has(trackId)) return current;
      const next = new Set(current);
      next.delete(trackId);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleResult = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      if (!detail || typeof detail !== "object") return;
      const result = detail as Partial<MusicFetchResult>;
      if (result.kind === "success" && isMusicDto(result.music)) {
        finish(result.music.id);
        if (previewingIdRef.current === result.music.id) stopPreviewRef.current();
        onFetchedRef.current(result.music);
      } else if (result.kind === "failure" && isMusicFetchFailedEvent(result)) {
        finish(result.trackId);
      }
    };
    window.addEventListener(MUSIC_FETCH_RESULT_EVENT, handleResult);
    return () => window.removeEventListener(MUSIC_FETCH_RESULT_EVENT, handleResult);
  }, [finish]);

  const fetchTrack = useCallback(async (track: MusicDto) => {
    if (track.fetched || fetchingRef.current.has(track.id)) return;
    fetchingRef.current.add(track.id);
    setFetchingTrackIds((current) => new Set(current).add(track.id));
    try {
      await requestMusicFetch(track.id);
      emitAppToast(`Đang tải bài hát ${track.displayName}...`);
    } catch {
      finish(track.id);
      emitAppToast("Không thể bắt đầu tải bài hát.");
    }
  }, [finish]);

  useEffect(() => () => fetchingRef.current.clear(), []);

  return { fetchingTrackIds, fetchTrack };
}
