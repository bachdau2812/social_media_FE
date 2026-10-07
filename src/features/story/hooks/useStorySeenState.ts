import { useCallback, useEffect, useRef, useState } from "react";
import { storyApi } from "../api/story.api";
import { persistSeenStoryIds, readSeenStoryIds } from "../model/storyQueue";

export function useStorySeenState(viewerId: string | null | undefined) {
  const [seenStoryIds, setSeenStoryIds] = useState<Set<string>>(() => new Set());
  const [recentlySeenStoryIds, setRecentlySeenStoryIds] = useState<Set<string>>(() => new Set());
  const viewerIdRef = useRef(viewerId);
  const seenStoryIdsRef = useRef(seenStoryIds);
  const recentlySeenStoryIdsRef = useRef(recentlySeenStoryIds);

  useEffect(() => {
    viewerIdRef.current = viewerId;
    const seen = viewerId ? readSeenStoryIds(viewerId) : new Set<string>();
    const recent = new Set<string>();
    seenStoryIdsRef.current = seen;
    recentlySeenStoryIdsRef.current = recent;
    setSeenStoryIds(seen);
    setRecentlySeenStoryIds(recent);
  }, [viewerId]);

  const markSeen = useCallback(async (storyId: string) => {
    if (!viewerId || seenStoryIdsRef.current.has(storyId) || recentlySeenStoryIdsRef.current.has(storyId)) return;

    const recent = new Set(recentlySeenStoryIdsRef.current).add(storyId);
    recentlySeenStoryIdsRef.current = recent;
    setRecentlySeenStoryIds(recent);

    try {
      await storyApi.recordView(storyId, viewerId);
      if (viewerIdRef.current !== viewerId) return;
      const seen = new Set(seenStoryIdsRef.current).add(storyId);
      seenStoryIdsRef.current = seen;
      setSeenStoryIds(seen);
      persistSeenStoryIds(viewerId, seen);
    } catch {
      if (viewerIdRef.current !== viewerId) return;
      const rollback = new Set(recentlySeenStoryIdsRef.current);
      rollback.delete(storyId);
      recentlySeenStoryIdsRef.current = rollback;
      setRecentlySeenStoryIds(rollback);
    }
  }, [viewerId]);

  return { seenStoryIds, recentlySeenStoryIds, markSeen };
}
