import { useCallback, useEffect, useRef, useState } from "react";
import { mergePostDetail, postApi, type Post } from "../../post";
import { profileApi } from "../api/profile.api";
import type { ProfilePostPageDto } from "../model/profile.dto";
import { profilePostToPost } from "../model/profile.mapper";

type Status = "idle" | "loading" | "ready" | "error";
type Collection = {
  posts: Map<string, Post>; pages: Map<number, string[]>; start: number; end: number;
  hasPrevious: boolean; hasMore: boolean; selectedPostFound: boolean; anchor?: string;
  status: Status; error: string; loadingDirection: "previous" | "next" | null;
  hydrated: Set<string>; hydrationErrors: Map<string, string>;
};
type Snapshot = { key: string; posts: Post[]; status: Status; error: string; hasPrevious: boolean; hasMore: boolean;
  selectedPostFound: boolean; loadingDirection: Collection["loadingDirection"]; hydrationErrors: Record<string, string> };
const EMPTY: Snapshot = { key: "", posts: [], status: "idle", error: "", hasPrevious: false, hasMore: false, selectedPostFound: true, loadingDirection: null, hydrationErrors: {} };
const PAGE_SIZE = 18;

function createCollection(): Collection {
  return { posts: new Map(), pages: new Map(), start: 0, end: 0, hasPrevious: false, hasMore: false,
    selectedPostFound: true, status: "idle", error: "", loadingDirection: null, hydrated: new Set(), hydrationErrors: new Map() };
}
function acceptPage(collection: Collection, page: ProfilePostPageDto) {
  collection.pages.set(page.pageNumber, page.posts.map(item => item.postId));
  for (const dto of page.posts) {
    const mapped = profilePostToPost(dto);
    const existing = collection.posts.get(mapped.id);
    collection.posts.set(mapped.id, existing && collection.hydrated.has(mapped.id) ? {
      ...mapped, media: existing.media, caption: existing.caption, mediaRatio: existing.mediaRatio, music: existing.music,
    } : mapped);
  }
}

// This feature-owned cache survives screen switches and is scoped to the viewer.
export function useProfilePostCollection({ viewerId, profileId, selectedPostId, enabled }: {
  viewerId?: string; profileId?: string; selectedPostId?: string; enabled: boolean;
}) {
  const key = viewerId && profileId ? `${viewerId}:${profileId}` : "";
  const cache = useRef(new Map<string, Collection>());
  const activeKey = useRef(key);
  const requests = useRef(new Map<string, { controller: AbortController; promise: Promise<void> }>());
  const mounted = useRef(true);
  const hydrationSlots = useRef(0);
  const hydrationWaiters = useRef<Array<() => void>>([]);
  const [snapshot, setSnapshot] = useState<Snapshot>(EMPTY);
  const collectionFor = useCallback((collectionKey: string) => {
    let collection = cache.current.get(collectionKey);
    if (!collection) { collection = createCollection(); cache.current.set(collectionKey, collection); }
    return collection;
  }, []);
  const publish = useCallback((collectionKey: string) => {
    if (!mounted.current || activeKey.current !== collectionKey) return;
    const collection = collectionFor(collectionKey);
    const ids = new Set<string>();
    for (let page = collection.start; page <= collection.end; page++) {
      for (const id of collection.pages.get(page) ?? []) ids.add(id);
    }
    setSnapshot({ key: collectionKey, posts: [...ids].flatMap(id => { const post = collection.posts.get(id); return post ? [post] : []; }),
      status: collection.status, error: collection.error, hasPrevious: collection.hasPrevious, hasMore: collection.hasMore,
      selectedPostFound: collection.selectedPostFound, loadingDirection: collection.loadingDirection, hydrationErrors: Object.fromEntries(collection.hydrationErrors) });
  }, [collectionFor]);

  const loadInitial = useCallback(async (force = false) => {
    if (!key || !viewerId || !profileId) return;
    const collection = collectionFor(key);
    if (!force && collection.status === "ready" && collection.anchor === selectedPostId) { publish(key); return; }
    const requestId = `${key}:initial`;
    requests.current.get(requestId)?.controller.abort();
    const controller = new AbortController();
    collection.status = "loading"; collection.error = ""; publish(key);
    const promise = (async () => {
      try {
        const page = await profileApi.getPosts(profileId, viewerId, 0, PAGE_SIZE, controller.signal, selectedPostId);
        if (controller.signal.aborted) return;
        acceptPage(collection, page);
        collection.start = collection.end = page.pageNumber;
        collection.hasPrevious = page.hasPrevious; collection.hasMore = page.hasMore;
        collection.selectedPostFound = selectedPostId ? page.selectedPostFound : true;
        collection.anchor = selectedPostId; collection.status = "ready";
      } catch (failure) {
        if (!controller.signal.aborted) { collection.status = "error"; collection.error = failure instanceof Error ? failure.message : "Không thể tải bài viết"; }
      } finally {
        if (requests.current.get(requestId)?.controller === controller) requests.current.delete(requestId);
        if (!controller.signal.aborted) publish(key);
      }
    })();
    requests.current.set(requestId, { controller, promise });
    await promise;
  }, [key, viewerId, profileId, selectedPostId, collectionFor, publish]);

  useEffect(() => {
    activeKey.current = key;
    if (enabled && key) void loadInitial();
    return () => {
      for (const [id, request] of requests.current) {
        if (id.startsWith(`${key}:`)) { request.controller.abort(); requests.current.delete(id); }
      }
      const collection = cache.current.get(key);
      if (collection?.status === "loading") collection.status = "idle";
      if (collection) collection.loadingDirection = null;
    };
  }, [key, enabled, loadInitial]);
  useEffect(() => {
    for (const collectionKey of cache.current.keys()) if (!viewerId || !collectionKey.startsWith(`${viewerId}:`)) cache.current.delete(collectionKey);
  }, [viewerId]);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; requests.current.forEach(request => request.controller.abort()); requests.current.clear(); }; }, []);

  const loadDirection = useCallback(async (direction: "previous" | "next") => {
    if (!enabled || !key || !viewerId || !profileId) return;
    const collection = collectionFor(key);
    if (collection.status !== "ready" || collection.loadingDirection || !(direction === "previous" ? collection.hasPrevious : collection.hasMore)) return;
    const pageNumber = direction === "previous" ? collection.start - 1 : collection.end + 1;
    const controller = new AbortController();
    const requestId = `${key}:page:${pageNumber}`;
    collection.loadingDirection = direction; collection.error = ""; publish(key);
    const promise = (async () => {
      try {
        const page = await profileApi.getPosts(profileId, viewerId, pageNumber, PAGE_SIZE, controller.signal);
        if (controller.signal.aborted) return;
        acceptPage(collection, page);
        if (direction === "previous") { collection.start = page.pageNumber; collection.hasPrevious = page.hasPrevious; }
        else { collection.end = page.pageNumber; collection.hasMore = page.hasMore; }
      } catch (failure) {
        if (!controller.signal.aborted) collection.error = failure instanceof Error ? failure.message : "Không thể tải thêm bài viết";
      } finally {
        collection.loadingDirection = null;
        requests.current.delete(requestId);
        if (!controller.signal.aborted) publish(key);
      }
    })();
    requests.current.set(requestId, { controller, promise });
    await promise;
  }, [enabled, key, viewerId, profileId, collectionFor, publish]);

  const hydrate = useCallback(async (postId: string) => {
    if (!key) return;
    const collection = collectionFor(key);
    if (!collection.posts.has(postId) || collection.hydrated.has(postId)) return;
    const requestId = `${key}:media:${postId}`;
    const pending = requests.current.get(requestId);
    if (pending) return pending.promise;
    const controller = new AbortController();
    collection.hydrationErrors.delete(postId);
    const promise = (async () => {
      if (hydrationSlots.current >= 3) await new Promise<void>(resolve => hydrationWaiters.current.push(resolve));
      else hydrationSlots.current++;
      try {
        if (controller.signal.aborted) return;
        const detail = await postApi.getRouteDetail(postId, controller.signal);
        if (controller.signal.aborted) return;
        const base = collection.posts.get(postId);
        if (base) collection.posts.set(postId, mergePostDetail(base, detail));
        collection.hydrated.add(postId);
      } catch (failure) {
        if (!controller.signal.aborted) collection.hydrationErrors.set(postId, failure instanceof Error ? failure.message : "Không thể tải nội dung bài viết");
      } finally {
        const waiting = hydrationWaiters.current.shift();
        if (waiting) waiting(); else hydrationSlots.current--;
        requests.current.delete(requestId);
        if (!controller.signal.aborted) publish(key);
      }
    })();
    requests.current.set(requestId, { controller, promise });
    await promise;
  }, [key, collectionFor, publish]);
  const updatePost = useCallback((postId: string, update: (post: Post) => Post) => {
    for (const collection of cache.current.values()) { const post = collection.posts.get(postId); if (post) collection.posts.set(postId, update(post)); }
    if (key) publish(key);
  }, [key, publish]);
  const removePost = useCallback((postId: string) => {
    for (const collection of cache.current.values()) collection.posts.delete(postId);
    if (key) publish(key);
  }, [key, publish]);
  const getPost = useCallback((postId: string) => cache.current.get(key)?.posts.get(postId), [key]);
  const loadPrevious = useCallback(() => loadDirection("previous"), [loadDirection]);
  const loadNext = useCallback(() => loadDirection("next"), [loadDirection]);
  const retry = useCallback(() => loadInitial(true), [loadInitial]);
  return { ...(snapshot.key === key ? snapshot : { ...EMPTY, status: enabled ? "loading" as const : "idle" as const }),
    loadPrevious, loadNext, retry, hydrate, updatePost, removePost, getPost };
}
