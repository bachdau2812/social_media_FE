import { createContext, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { postApi } from "../api/post.api";
import { PostInteractionTracker } from "../model/postInteractionTracker";
import { ForegroundOverlayContext } from "../../../shared/overlays/useForegroundOverlay";

type InteractionContext = {
  viewerId: string;
  tracker: PostInteractionTracker;
  feedBlocked: boolean;
  detailBlocked: boolean;
};
type Props = {
  viewerId: string;
  feedBlocked: boolean;
  detailBlocked: boolean;
  children: ReactNode;
};

export const PostInteractionContext = createContext<InteractionContext | null>(null);

export function PostInteractionProvider(props: Props) {
  // A new authenticated viewer owns a fresh tracker and cannot replay another's events.
  return <ViewerInteractions key={props.viewerId} {...props} />;
}

function ViewerInteractions({ viewerId, feedBlocked, detailBlocked, children }: Props) {
  const [tracker] = useState(() => new PostInteractionTracker(postApi.recordInteraction));
  const [localOverlays, setLocalOverlays] = useState(0);
  const registerOverlay = useCallback(() => {
    setLocalOverlays((count) => count + 1);
    return () => setLocalOverlays((count) => Math.max(0, count - 1));
  }, []);
  useEffect(() => tracker.retain(), [tracker]);
  const context = useMemo(() => ({
    viewerId, tracker,
    feedBlocked: feedBlocked || localOverlays > 0,
    detailBlocked: detailBlocked || localOverlays > 0,
  }), [viewerId, tracker, feedBlocked, detailBlocked, localOverlays]);
  return <ForegroundOverlayContext.Provider value={registerOverlay}>
    <PostInteractionContext.Provider value={context}>{children}</PostInteractionContext.Provider>
  </ForegroundOverlayContext.Provider>;
}
