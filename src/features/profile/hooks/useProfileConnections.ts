import { useCallback, useEffect, useState } from "react";
import { profileApi, type ConnectionTab, type ConnectionUserDto } from "../api/profile.api";

type LoadState = "idle" | "loading" | "ready" | "error";

interface UseProfileConnectionsOptions {
  profileId?: string;
  viewerId: string;
  tab: ConnectionTab;
  query: string;
  sort: "RECENT" | "NAME";
}

export function useProfileConnections({ profileId, viewerId, tab, query, sort }: UseProfileConnectionsOptions) {
  const [rows, setRows] = useState<ConnectionUserDto[]>([]);
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!profileId) return;
    setState("loading");
    setError("");
    try {
      const data = await profileApi.getConnections({ profileId, viewerId, tab, query, sort });
      setRows(data.users ?? []);
      setState("ready");
    } catch (failure) {
      setRows([]);
      setState("error");
      setError(failure instanceof Error ? failure.message : "Could not load connections");
    }
  }, [profileId, viewerId, tab, query, sort]);

  useEffect(() => { void load(); }, [load]);

  const changeRelationship = useCallback(async (row: ConnectionUserDto) => {
    if (row.relationshipAction === "Follow" || row.relationshipAction === "Follow back") {
      await profileApi.follow(viewerId, row.userId);
    } else if (row.relationshipAction === "Following") {
      await profileApi.unfollow(viewerId, row.userId);
    }
    await load();
  }, [load, viewerId]);

  const removeRelationship = useCallback(async (followerId: string, followingId: string, removedUserId: string) => {
    try {
      await profileApi.unfollow(followerId, followingId);
      setRows(current => current.filter(row => row.userId !== removedUserId));
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Could not update this relationship");
      throw failure;
    }
  }, []);

  return { rows, state, error, load, changeRelationship, removeRelationship };
}
