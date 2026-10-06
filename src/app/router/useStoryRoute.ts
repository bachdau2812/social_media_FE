import { useCallback, useEffect, useLayoutEffect, useRef, useState, type SetStateAction } from "react";
import { apiGet, ApiError } from "../../shared/api";
import { archivedStoryToItem, type StoryArchiveDto, type StoryItem } from "../../features/story";
import { profileApi, profileToIdentity } from "../../features/profile";
import type { AppDestination } from "../../features/notification/core/types";

type StoryDestination = Extract<AppDestination, { kind: "story" }>;
type StoryQueue = { viewerId?: string; items: StoryItem[]; index: number | null };
type Page = { content: StoryArchiveDto[]; totalPages?: number };

function unavailableStory(ownerId: string, id: string): StoryItem {
  return { id, userId: ownerId, name: "Người dùng", username: "", avatarUrl: "", status: "EXPIRED",
    replyEnabled: false, viewerSeen: true, totalItems: 1, seenItems: 1, state: "seen" };
}

export function useStoryRoute(destination: StoryDestination | undefined, viewerId: string | undefined) {
  const [queue, setQueue] = useState<StoryQueue>({ items: [], index: null });
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState<{ key: string; revision: number } | null>(null);
  const cache = useRef(queue);
  const ownerId = destination?.ownerId;
  const storyId = destination?.storyItemId || destination?.storyId;
  const scope = destination?.scope;
  const key = `${viewerId}:${ownerId}:${storyId}:${scope}`;
  const revision = retryKey?.key === key ? retryKey.revision : 0;
  useLayoutEffect(() => { if (queue.items.length) cache.current = queue; }, [queue]);

  useEffect(() => {
    if (!ownerId || !viewerId) { setQueue({ items: [], index: null }); return; }
    setErrorKey(null);
    const cached = cache.current.viewerId === viewerId ? cache.current.items : [];
    const cachedIndex = cached.findIndex((item) => item.userId === ownerId && (!storyId || item.id === storyId));
    if (cachedIndex >= 0 && revision === 0) {
      setQueue({ viewerId, items: scope === "single" ? [cached[cachedIndex]] : cached, index: scope === "single" ? 0 : cachedIndex });
      return;
    }
    let active = true;
    const controller = new AbortController();
    setQueue({ items: [], index: null });
    void (async () => {
      try {
        const page = await apiGet<Page>(`/profile-media/${encodeURIComponent(ownerId)}/stories?page=0&size=50&mediaType=STORY`, { signal: controller.signal });
        const entries = [...(page.content ?? [])];
        for (let pageNumber = 1; active && storyId && !entries.some((item) => item.id === storyId) && pageNumber < (page.totalPages ?? 1); pageNumber += 1) {
          const next = await apiGet<Page>(`/profile-media/${encodeURIComponent(ownerId)}/stories?page=${pageNumber}&size=50&mediaType=STORY`, { signal: controller.signal });
          entries.push(...(next.content ?? []));
        }
        if (!active) return;
        const summary = await profileApi.getSummary(ownerId, viewerId, 0).catch(() => null);
        if (!active) return;
        const items = entries.map((item) => archivedStoryToItem(item, summary ? profileToIdentity(summary) : undefined));
        const requested = items.find((item) => item.id === storyId);
        if (storyId && (scope === "single" || !requested)) {
          setQueue({ viewerId, items: [requested ?? unavailableStory(ownerId, storyId)], index: 0 });
        } else if (items.length) {
          setQueue({ viewerId, items, index: Math.max(0, items.findIndex((item) => item.id === storyId)) });
        } else setErrorKey(key);
      } catch (error) {
        if (!active) return;
        if (error instanceof ApiError && error.status === 404 && storyId) {
          setQueue({ viewerId, items: [unavailableStory(ownerId, storyId)], index: 0 });
        } else setErrorKey(key);
      }
    })();
    return () => { active = false; controller.abort(); };
  }, [ownerId, storyId, scope, viewerId, revision, key]);

  const seed = useCallback((items: StoryItem[], index: number) => {
    const next = { viewerId, items, index };
    cache.current = next;
    setQueue(next);
  }, [viewerId]);
  const setStories = useCallback((items: StoryItem[]) => setQueue((current) => ({ ...current, items })), []);
  const setIndex = useCallback((next: SetStateAction<number | null>) => setQueue((current) => ({ ...current, index: typeof next === "function" ? next(current.index) : next })), []);
  const retry = useCallback(() => setRetryKey((current) => ({ key, revision: current?.key === key ? current.revision + 1 : 1 })), [key]);
  const selected = queue.index === null ? undefined : queue.items[queue.index];
  const matchesRoute = Boolean(selected && selected.userId === ownerId && (!storyId || selected.id === storyId));
  return { stories: queue.viewerId === viewerId ? queue.items : [], index: destination && queue.viewerId === viewerId && matchesRoute ? queue.index : null,
    seed, setStories, setIndex, error: errorKey === key, retry };
}
