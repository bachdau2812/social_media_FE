import { useCallback, useEffect, useRef, useState } from "react";
import { suggestionsApi } from "../api/suggestions.api";
import type { SuggestedUser } from "../model/suggestion.types";

type SuggestionState = "loading" | "ready" | "error";

export function useSuggestedFriendsController(viewerId: string) {
  const [users, setUsers] = useState<SuggestedUser[]>([]);
  const [state, setState] = useState<SuggestionState>("loading");
  const [followingIds, setFollowingIds] = useState<Set<string>>(() => new Set());
  const [actionError, setActionError] = useState<string | null>(null);
  const viewerIdRef = useRef(viewerId);
  const requestRef = useRef<AbortController | null>(null);
  viewerIdRef.current = viewerId;

  useEffect(() => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setUsers([]);
    setFollowingIds(new Set());
    setActionError(null);
    setState("loading");
    let active = true;
    suggestionsApi.list(viewerId, 0, 30, controller.signal)
      .then((page) => {
        if (!active) return;
        setUsers(page.content ?? []);
        setState("ready");
      })
      .catch(() => { if (active && !controller.signal.aborted) setState("error"); });
    return () => {
      active = false;
      controller.abort();
      if (requestRef.current === controller) requestRef.current = null;
    };
  }, [viewerId]);

  const refresh = useCallback(async () => {
    const requestViewer = viewerId;
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setState("loading");
    try {
      const page = await suggestionsApi.refresh(requestViewer, 0, 30, controller.signal);
      if (controller.signal.aborted || viewerIdRef.current !== requestViewer) return;
      setUsers(page.content ?? []);
      setActionError(null);
      setState("ready");
    } catch {
      if (!controller.signal.aborted && viewerIdRef.current === requestViewer) setState("error");
    } finally {
      if (requestRef.current === controller) requestRef.current = null;
    }
  }, [viewerId]);

  const follow = useCallback(async (user: SuggestedUser) => {
    const requestViewer = viewerId;
    if (user.viewerFollowsUser || viewerIdRef.current !== requestViewer) return false;
    setFollowingIds((current) => {
      if (current.has(user.userId)) return current;
      return new Set(current).add(user.userId);
    });
    try {
      await suggestionsApi.follow(requestViewer, user.userId);
      if (viewerIdRef.current !== requestViewer) return false;
      setUsers((current) => current.map((item) => item.userId === user.userId ? { ...item, viewerFollowsUser: true } : item));
      setActionError(null);
      return true;
    } catch {
      if (viewerIdRef.current === requestViewer) setActionError("Không thể theo dõi người dùng. Vui lòng thử lại.");
      return false;
    } finally {
      if (viewerIdRef.current === requestViewer) {
        setFollowingIds((current) => { const next = new Set(current); next.delete(user.userId); return next; });
      }
    }
  }, [viewerId]);

  const hide = useCallback((userId: string) => setUsers((current) => current.filter((item) => item.userId !== userId)), []);

  return { users, state, followingIds, actionError, refresh, follow, hide };
}
