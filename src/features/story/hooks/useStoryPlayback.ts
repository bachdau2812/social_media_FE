import { useCallback, useEffect, useRef, useState } from "react";
import { storyDurationSeconds } from "../model/storyDuration";
import type { StoryItem } from "../model/story.types";

type StoryPlaybackOptions = {
  story: StoryItem;
  ready: boolean;
  paused: boolean;
  navigating: boolean;
  muted: boolean;
  onAdvance: () => void;
};

export function useStoryPlayback({ story, ready, paused, navigating, muted, onAdvance }: StoryPlaybackOptions) {
  const [progress, setProgress] = useState(0);
  const [playBlocked, setPlayBlocked] = useState(false);
  const [mediaRevision, setMediaRevision] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const storyIdRef = useRef(story.id);
  const blockedSourcesRef = useRef(new Set<"video" | "audio">());
  const advancedRef = useRef(false);
  const pausedRef = useRef(paused);
  const onAdvanceRef = useRef(onAdvance);

  pausedRef.current = paused;
  onAdvanceRef.current = onAdvance;
  storyIdRef.current = story.id;

  const markPlayResult = useCallback((source: "video" | "audio", blocked: boolean) => {
    if (blocked) blockedSourcesRef.current.add(source);
    else blockedSourcesRef.current.delete(source);
    setPlayBlocked(blockedSourcesRef.current.size > 0);
  }, []);

  const setVideoElement = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    setMediaRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    advancedRef.current = false;
    blockedSourcesRef.current.clear();
    setProgress(0);
    setPlayBlocked(false);
  }, [story.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const storyId = story.id;
    video.muted = muted;
    if (!ready || paused) video.pause();
    else void video.play()
      .then(() => { if (storyIdRef.current === storyId && videoRef.current === video) markPlayResult("video", false); })
      .catch(() => { if (storyIdRef.current === storyId && videoRef.current === video) markPlayResult("video", true); });
  }, [markPlayResult, mediaRevision, muted, paused, ready, story.id]);

  useEffect(() => {
    const previous = audioRef.current;
    previous?.pause();
    audioRef.current = null;
    if (!story.musicUrl || story.status === "DELETED" || story.status === "REMOVED" || story.status === "EXPIRED") return;
    const audio = new Audio(story.musicUrl);
    const storyId = story.id;
    const start = Math.max(0, story.musicStart ?? 0);
    audio.preload = "auto";
    audio.loop = !story.musicEnd;
    const seekToStart = () => {
      if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(start, Math.max(0, audio.duration - 0.05));
      else audio.currentTime = start;
    };
    const keepInsideSegment = () => {
      if (story.musicEnd !== undefined && audio.currentTime >= story.musicEnd) {
        seekToStart();
        if (!pausedRef.current) void audio.play().catch(() => {
          if (storyIdRef.current === storyId && audioRef.current === audio) markPlayResult("audio", true);
        });
      }
    };
    audio.addEventListener("loadedmetadata", seekToStart);
    audio.addEventListener("timeupdate", keepInsideSegment);
    audioRef.current = audio;
    audio.load?.();
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("loadedmetadata", seekToStart);
      audio.removeEventListener("timeupdate", keepInsideSegment);
      if (audioRef.current === audio) audioRef.current = null;
    };
  }, [markPlayResult, story.id, story.musicEnd, story.musicStart, story.musicUrl, story.status]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (!ready || paused) audio.pause();
    else {
      const storyId = story.id;
      void audio.play()
        .then(() => { if (storyIdRef.current === storyId && audioRef.current === audio) markPlayResult("audio", false); })
        .catch(() => { if (storyIdRef.current === storyId && audioRef.current === audio) markPlayResult("audio", true); });
    }
  }, [markPlayResult, muted, paused, ready, story.id]);

  useEffect(() => {
    if (!ready || paused || navigating || playBlocked || advancedRef.current) return;
    const videoDuration = videoRef.current?.duration;
    const duration = storyDurationSeconds(story, videoDuration);
    const durationMs = Math.max(100, (duration ?? 5) * 1000);
    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 10000 / durationMs);
        if (next >= 100 && !advancedRef.current) {
          advancedRef.current = true;
          queueMicrotask(() => onAdvanceRef.current());
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [
    navigating,
    paused,
    playBlocked,
    ready,
    story.durationSeconds,
    story.id,
    story.mediaType,
    story.mediaUrl,
    story.musicEnd,
    story.musicStart,
    story.musicUrl,
  ]);

  const retryPlay = useCallback((nextMuted = muted) => {
    blockedSourcesRef.current.clear();
    setPlayBlocked(false);
    const storyId = storyIdRef.current;
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.muted = nextMuted;
      try {
        void video.play()
          .then(() => { if (storyIdRef.current === storyId && videoRef.current === video) markPlayResult("video", false); })
          .catch(() => { if (storyIdRef.current === storyId && videoRef.current === video) markPlayResult("video", true); });
      } catch {
        markPlayResult("video", true);
      }
    }
    if (audio) {
      audio.muted = nextMuted;
      try {
        void audio.play()
          .then(() => { if (storyIdRef.current === storyId && audioRef.current === audio) markPlayResult("audio", false); })
          .catch(() => { if (storyIdRef.current === storyId && audioRef.current === audio) markPlayResult("audio", true); });
      } catch {
        markPlayResult("audio", true);
      }
    }
  }, [markPlayResult, muted]);

  const currentVideoTimeMs = useCallback(() => {
    const currentTime = videoRef.current?.currentTime;
    return Number.isFinite(currentTime) && currentTime !== undefined
      ? Math.max(0, Math.round(currentTime * 1000))
      : 0;
  }, []);

  return { progress, setProgress, videoRef: setVideoElement, playBlocked, retryPlay, currentVideoTimeMs };
}
