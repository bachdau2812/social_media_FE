import { useCallback, useEffect, useRef, useState } from "react";
import { profileApi, type ConnectionTab, type ConnectionUserDto } from "../api/profile.api";
type LoadState = "idle" | "loading" | "ready" | "error";
interface UseProfileConnectionsOptions { profileId?: string; viewerId: string; tab: ConnectionTab; query: string; sort: "RECENT" | "NAME" }
export function useProfileConnections({ profileId, viewerId, tab, query, sort }: UseProfileConnectionsOptions) {
  const [rows, setRows] = useState<ConnectionUserDto[]>([]);
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const version = useRef(0), nextPage = useRef(0), busy = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const fetchPage = useCallback(async (page: number, replace: boolean) => {
    if (!profileId || busy.current) return;
    busy.current = true;
    const generation = version.current;
    const request = new AbortController(); controller.current = request;
    if (replace) setState("loading"); else setLoadingMore(true);
    setError("");
    try {
      const data = await profileApi.getConnections({ profileId, viewerId, tab, query, sort, page, signal: request.signal });
      if (generation !== version.current || request.signal.aborted) return;
      setRows(current => Array.from(new Map([...replace ? [] : current, ...data.users ?? []].map(row => [row.userId, row])).values()));
      nextPage.current = (data.currentPage ?? page) + 1;
      setHasMore(Boolean(data.hasNextPage)); setState("ready");
    } catch (failure) {
      if (generation !== version.current || request.signal.aborted) return;
      if (replace) setState("error");
      setError(failure instanceof Error ? failure.message : "Could not load connections");
    } finally {
      if (generation === version.current) { busy.current = false; setLoadingMore(false); }
    }
  }, [profileId, viewerId, tab, query, sort]);
  useEffect(() => {
    const generation = ++version.current; controller.current?.abort(); busy.current = false; nextPage.current = 0;
    setRows([]); setHasMore(false); setError(""); setLoadingMore(false); setState(profileId ? "loading" : "idle");
    void fetchPage(0, true);
    return () => { version.current = generation + 1; controller.current?.abort(); busy.current = false; };
  }, [fetchPage, profileId]);
  const load = useCallback(() => fetchPage(0, true), [fetchPage]);
  const loadMore = useCallback(() => hasMore ? fetchPage(nextPage.current, false) : Promise.resolve(), [hasMore, fetchPage]);
  const changeRelationship = useCallback(async (row: ConnectionUserDto) => {
    const generation = version.current;
    const following = row.relationshipAction === "Follow" || row.relationshipAction === "Follow back";
    if (following) await profileApi.follow(viewerId, row.userId);
    else if (row.relationshipAction === "Following") await profileApi.unfollow(viewerId, row.userId);
    else return;
    if (generation !== version.current) return;
    setRows(current => current.map(item => item.userId === row.userId ? { ...item, viewerFollowsUser: following, friend: following && item.userFollowsViewer, relationshipAction: following ? "Following" : item.userFollowsViewer ? "Follow back" : "Follow" } : item));
  }, [viewerId]);
  const removeRelationship = useCallback(async (followerId: string, followingId: string, removedUserId: string) => {
    const generation = version.current;
    try {
      await profileApi.unfollow(followerId, followingId);
      if (generation === version.current) setRows(current => current.filter(row => row.userId !== removedUserId));
    } catch (failure) {
      if (generation === version.current) setError(failure instanceof Error ? failure.message : "Could not update this relationship");
      throw failure;
    }
  }, []);
  return { rows, state, error, hasMore, loadingMore, load, loadMore, changeRelationship, removeRelationship };
}
