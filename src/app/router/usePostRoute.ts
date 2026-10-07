import { useCallback, useEffect, useLayoutEffect, useRef, useState, type SetStateAction } from "react";
import { postDetailsToPost, postApi, type Post } from "../../features/post";

/** URL-driven loading with cached seeds and cancellation for fast history navigation. */
export function usePostRoute(postId: string | undefined, viewerId: string | undefined, seeds: Post[]) {
  const [loaded, setLoaded] = useState<{ viewerId?: string; post: Post | null }>({ post: null });
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState<{ key: string; revision: number } | null>(null);
  const key = `${viewerId}:${postId}`;
  const revision = retryKey?.key === key ? retryKey.revision : 0;
  const post = loaded.viewerId === viewerId ? loaded.post : null;
  const setPost = useCallback((next: SetStateAction<Post | null>) => {
    setLoaded((current) => ({ viewerId, post: typeof next === "function" ? next(current.viewerId === viewerId ? current.post : null) : next }));
  }, [viewerId]);
  const cache = useRef(new Map<string, Post>());
  const seedRef = useRef(seeds);
  const cacheViewer = useRef(viewerId);
  useLayoutEffect(() => {
    if (cacheViewer.current !== viewerId) {
      postApi.clearSurfaceDetailCache();
      cache.current.clear();
      cacheViewer.current = viewerId;
      seedRef.current = [];
    } else seedRef.current = seeds;
    if (post && viewerId) {
      cache.current.set(post.id, post);
      if (cache.current.size > 100) cache.current.delete(cache.current.keys().next().value!);
    }
  }, [seeds, post, viewerId]);
  useEffect(() => {
    setErrorKey(null);
    if (!postId || !viewerId) { setPost(null); return; }
    const seed = seedRef.current.find((item) => item.id === postId) ?? cache.current.get(postId);
    if (seed && revision === 0) { setPost(seed); return; }
    setPost(null);
    let active = true;
    const controller = new AbortController();
    postApi.getRouteDetail(postId, controller.signal)
      .then((detail) => { if (active) setPost(postDetailsToPost(detail)); })
      .catch(() => { if (active) setErrorKey(key); });
    return () => { active = false; controller.abort(); };
  }, [postId, viewerId, revision, setPost, key]);
  const retry = useCallback(() => setRetryKey((current) => ({ key, revision: current?.key === key ? current.revision + 1 : 1 })), [key]);
  return { post: post?.id === postId && viewerId ? post : null, setPost, error: errorKey === key, retry };
}
