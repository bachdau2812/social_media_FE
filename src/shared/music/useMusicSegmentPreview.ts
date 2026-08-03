import { useCallback, useEffect, useRef, useState } from "react";
import type { MusicSegment } from "./musicSegment";

export type MusicPreviewTrack = {
  id: string;
  url?: string | null;
};

type ActivePreview = {
  id: string;
  audio: HTMLAudioElement;
  onTimeUpdate: () => void;
  onEnded: () => void;
};

export function useMusicSegmentPreview() {
  const activeRef = useRef<ActivePreview | null>(null);
  const [previewingId, setPreviewingId] = useState<string | null>(null);

  const stop = useCallback(() => {
    const active = activeRef.current;
    if (active) {
      activeRef.current = null;
      active.audio.pause();
      active.audio.currentTime = 0;
      active.audio.removeEventListener("timeupdate", active.onTimeUpdate);
      active.audio.removeEventListener("ended", active.onEnded);
    }
    setPreviewingId(null);
  }, []);

  const playSegment = useCallback(async (
    track: MusicPreviewTrack,
    segment: MusicSegment,
  ) => {
    stop();
    if (!track.url) return;

    const audio = new Audio(track.url);
    const start = Math.max(0, segment.start);
    const end = Math.max(start + 1, segment.end);
    audio.preload = "auto";
    audio.currentTime = start;

    const onTimeUpdate = () => {
      if (activeRef.current?.audio !== audio || audio.currentTime < end) return;
      stop();
    };
    const onEnded = () => {
      if (activeRef.current?.audio === audio) stop();
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    activeRef.current = { id: track.id, audio, onTimeUpdate, onEnded };
    setPreviewingId(track.id);

    try {
      await audio.play();
    } catch {
      if (activeRef.current?.audio === audio) stop();
    }
  }, [stop]);

  const toggleSegment = useCallback(async (
    track: MusicPreviewTrack,
    segment: MusicSegment,
  ) => {
    if (activeRef.current?.id === track.id) {
      stop();
      return;
    }
    await playSegment(track, segment);
  }, [playSegment, stop]);

  useEffect(() => stop, [stop]);

  return {
    previewingId,
    playSegment,
    toggleSegment,
    stop,
  };
}
