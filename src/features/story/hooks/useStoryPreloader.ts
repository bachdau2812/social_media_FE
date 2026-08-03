import { useCallback, useEffect, useRef, useState } from "react";
import type { StoryItem } from "../model/story.types";

export type StoryMediaState = "loading" | "ready" | "buffering" | "network" | "unavailable";

type CacheEntry = {
  state: StoryMediaState;
  promise?: Promise<StoryMediaState>;
  media?: HTMLImageElement | HTMLVideoElement;
  audio?: HTMLAudioElement;
};

function isVideoStory(story: StoryItem) {
  return story.mediaType === "VIDEO" || Boolean(story.mediaUrl?.match(/\.(mp4|webm|mov|m4v)(\?|$)/i));
}

function terminalState(story: StoryItem): StoryMediaState | null {
  if (story.status === "DELETED" || story.status === "REMOVED" || story.status === "EXPIRED") return "unavailable";
  if (!story.mediaUrl) return "ready";
  return null;
}

export function useStoryPreloader(stories: StoryItem[]) {
  const cacheRef = useRef(new Map<string, CacheEntry>());
  const [, render] = useState(0);

  const update = useCallback((storyId: string, state: StoryMediaState) => {
    const entry = cacheRef.current.get(storyId) ?? { state };
    if (entry.state === state && cacheRef.current.has(storyId)) return state;
    entry.state = state;
    cacheRef.current.set(storyId, entry);
    render((value) => value + 1);
    return state;
  }, []);

  const preloadAudio = useCallback((story: StoryItem, entry: CacheEntry) => {
    if (!story.musicUrl || entry.audio) return;
    const audio = new Audio(story.musicUrl);
    audio.preload = "auto";
    audio.muted = true;
    audio.load?.();
    entry.audio = audio;
  }, []);

  const ensureReady = useCallback((index: number): Promise<StoryMediaState> => {
    const story = stories[index];
    if (!story) return Promise.resolve("unavailable");
    const cached = cacheRef.current.get(story.id);
    if (cached?.promise) return cached.promise;
    if (cached && cached.state !== "loading") return Promise.resolve(cached.state);

    const immediate = terminalState(story);
    if (immediate) {
      const entry = cached ?? { state: immediate };
      entry.state = immediate;
      cacheRef.current.set(story.id, entry);
      preloadAudio(story, entry);
      render((value) => value + 1);
      return Promise.resolve(immediate);
    }

    const entry: CacheEntry = cached ?? { state: "loading" };
    cacheRef.current.set(story.id, entry);
    preloadAudio(story, entry);
    entry.promise = new Promise<StoryMediaState>((resolve) => {
      let settled = false;
      const settle = (state: StoryMediaState) => {
        if (settled) return;
        settled = true;
        entry.promise = undefined;
        resolve(update(story.id, state));
      };

      if (isVideoStory(story)) {
        const video = document.createElement("video");
        entry.media = video;
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.addEventListener("loadedmetadata", () => settle("ready"), { once: true });
        video.addEventListener("canplay", () => settle("ready"), { once: true });
        video.addEventListener("error", () => settle("network"), { once: true });
        video.src = story.mediaUrl!;
        video.load();
        window.setTimeout(() => settle(video.readyState >= 1 ? "ready" : "network"), 3000);
        return;
      }

      const image = new Image();
      entry.media = image;
      image.onload = () => settle("ready");
      image.onerror = () => settle("network");
      image.src = story.mediaUrl!;
      if (typeof image.decode === "function") void image.decode().then(() => settle("ready")).catch(() => {
        if (image.complete && image.naturalWidth > 0) settle("ready");
      });
      else if (image.complete && image.naturalWidth > 0) settle("ready");
    });
    return entry.promise;
  }, [preloadAudio, stories, update]);

  const preloadAround = useCallback(async (index: number) => {
    const indexes = new Set<number>([index - 1, index, index + 1]);
    const currentUserId = stories[index]?.userId;
    if (currentUserId) {
      const nextUserIndex = stories.findIndex((story, storyIndex) => storyIndex > index && story.userId !== currentUserId);
      if (nextUserIndex >= 0) indexes.add(nextUserIndex);
    }
    await Promise.all([...indexes].filter((candidate) => candidate >= 0 && candidate < stories.length).map(ensureReady));
  }, [ensureReady, stories]);

  const getState = useCallback((storyId: string): StoryMediaState => cacheRef.current.get(storyId)?.state ?? "loading", []);
  const retry = useCallback((index: number) => {
    const story = stories[index];
    if (!story) return Promise.resolve<StoryMediaState>("unavailable");
    const old = cacheRef.current.get(story.id);
    old?.audio?.pause();
    cacheRef.current.delete(story.id);
    render((value) => value + 1);
    return ensureReady(index);
  }, [ensureReady, stories]);

  useEffect(() => () => {
    cacheRef.current.forEach((entry) => {
      entry.audio?.pause();
      if (entry.media instanceof HTMLVideoElement) entry.media.pause();
    });
    cacheRef.current.clear();
  }, []);

  return { ensureReady, preloadAround, getState, markState: update, retry };
}
