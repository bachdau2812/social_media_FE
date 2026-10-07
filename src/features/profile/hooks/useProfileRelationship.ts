import { useCallback, useEffect, useState } from "react";
import { profileApi } from "../api/profile.api";
import type { ProfileRelationship } from "../components/ProfileRelationshipActions";

interface UseProfileRelationshipOptions {
  viewerId: string;
  profileId: string;
  viewerFollows: boolean;
  userFollowsViewer: boolean;
  friend: boolean;
  onRefresh: () => Promise<void>;
}

export function useProfileRelationship({
  viewerId,
  profileId,
  viewerFollows,
  userFollowsViewer,
  friend,
  onRefresh,
}: UseProfileRelationshipOptions) {
  const serverRelationship: ProfileRelationship = friend
    ? "friends"
    : viewerFollows
      ? "following"
      : userFollowsViewer
        ? "follows_you"
        : "none";
  const [relationship, setRelationship] = useState<ProfileRelationship>(serverRelationship);
  const [pending, setPending] = useState(false);

  useEffect(() => setRelationship(serverRelationship), [serverRelationship]);

  const follow = useCallback(async () => {
    const previous = relationship;
    setRelationship(userFollowsViewer ? "friends" : "following");
    setPending(true);
    try {
      await profileApi.follow(viewerId, profileId);
      await onRefresh();
    } catch {
      setRelationship(previous);
    } finally {
      setPending(false);
    }
  }, [onRefresh, profileId, relationship, userFollowsViewer, viewerId]);

  const unfollow = useCallback(async () => {
    const previous = relationship;
    setRelationship(userFollowsViewer ? "follows_you" : "none");
    setPending(true);
    try {
      await profileApi.unfollow(viewerId, profileId);
      await onRefresh();
    } catch {
      setRelationship(previous);
    } finally {
      setPending(false);
    }
  }, [onRefresh, profileId, relationship, userFollowsViewer, viewerId]);

  return { relationship, pending, follow, unfollow };
}
