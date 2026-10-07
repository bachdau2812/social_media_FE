import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Post } from "../../post";
import { isActiveStory, storyTrayToItem, type StoryItem } from "../../story";
import { feedApi } from "../api/feed.api";
import { feedEntryIdentity, feedItemToPost } from "../model/feed.mapper";

export type FeedController = {
  posts: Post[];
  stories: StoryItem[];
  hasMore: boolean;
  loadingMore: boolean;
  setPosts: Dispatch<SetStateAction<Post[]>>;
  load: (userId: string, tab: "DISCOVER" | "FRIENDS") => Promise<void>;
  loadMore: (userId: string, tab: "DISCOVER" | "FRIENDS") => Promise<void>;
  invalidate: () => void;
  clear: () => void;
};

export function useFeedController(): FeedController {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const requestVersion = useRef(0);
  const requestController = useRef<AbortController | null>(null);
  const loadingMoreRef = useRef(false);
  const postsRef = useRef<Post[]>([]);

  useEffect(() => () => {
    requestVersion.current += 1;
    requestController.current?.abort();
    requestController.current = null;
  }, []);

  useEffect(() => {
    const now = Date.now();
    const nextExpiry = stories.reduce<number | null>((nearest, story) => {
      if (!story.expiredAt) return nearest;
      const expiry = Date.parse(story.expiredAt);
      if (!Number.isFinite(expiry) || expiry <= now) return nearest;
      return nearest === null || expiry < nearest ? expiry : nearest;
    }, null);
    if (nextExpiry === null) return;
    const timer = window.setTimeout(() => {
      setStories((current) => {
        const active = current.filter((story) => isActiveStory(story));
        return active.length === current.length ? current : active;
      });
    }, Math.min(2_147_483_647, Math.max(0, nextExpiry - now + 25)));
    return () => window.clearTimeout(timer);
  }, [stories]);

  const updatePosts: Dispatch<SetStateAction<Post[]>> = useCallback((next) => {
    setPosts((current) => {
      const resolved = typeof next === "function" ? next(current) : next;
      postsRef.current = resolved;
      return resolved;
    });
  }, []);

  const invalidate = useCallback(() => {
    requestVersion.current += 1;
    requestController.current?.abort();
    requestController.current = null;
    loadingMoreRef.current = false;
    setLoadingMore(false);
  }, []);

  const load = useCallback(async (userId: string, tab: "DISCOVER" | "FRIENDS") => {
    const version = ++requestVersion.current;
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    loadingMoreRef.current = false;
    setLoadingMore(false);
    try {
      const home = await feedApi.getHomePage(userId, tab, 0, controller.signal);
      if (controller.signal.aborted || version !== requestVersion.current) return;
      updatePosts((home.feed?.items ?? []).map(feedItemToPost));
      setStories((home.storyTray ?? []).map(storyTrayToItem).filter((story) => isActiveStory(story)));
      setPage(0);
      setHasMore(Boolean(home.feed?.hasMore));
    } catch (error) {
      if (controller.signal.aborted) return;
      throw error;
    } finally {
      if (requestController.current === controller) requestController.current = null;
    }
  }, [updatePosts]);

  const loadMore = useCallback(async (userId: string, tab: "DISCOVER" | "FRIENDS") => {
    if (!hasMore || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    const version = requestVersion.current;
    const nextPage = page + 1;
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    try {
      const home = await feedApi.getHomePage(userId, tab, nextPage, controller.signal);
      if (controller.signal.aborted || version !== requestVersion.current) return;
      const existingIds = new Set(postsRef.current.map(feedEntryIdentity));
      const uniqueItems = (home.feed?.items ?? [])
        .map(feedItemToPost)
        .filter((post) => {
          const identity = feedEntryIdentity(post);
          if (existingIds.has(identity)) return false;
          existingIds.add(identity);
          return true;
        });
      updatePosts((current) => [...current, ...uniqueItems]);
      setPage(nextPage);
      setHasMore(Boolean(home.feed?.hasMore) && uniqueItems.length > 0);
    } catch (error) {
      if (controller.signal.aborted) return;
      throw error;
    } finally {
      if (requestController.current === controller) requestController.current = null;
      if (version === requestVersion.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  }, [hasMore, page, updatePosts]);

  const clear = useCallback(() => {
    invalidate();
    updatePosts([]);
    setStories([]);
    setPage(0);
    setHasMore(true);
  }, [invalidate, updatePosts]);

  return { posts, stories, hasMore, loadingMore, setPosts: updatePosts, load, loadMore, invalidate, clear };
}
