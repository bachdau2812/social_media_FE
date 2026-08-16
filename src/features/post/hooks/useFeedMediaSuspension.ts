import { useEffect } from "react";
import { setFeedMusicSuspended } from "../model/feedMusicCoordinator";

type FeedMediaSuspensionReasons = {
  postDetailOpen: boolean;
  storyCreatorOpen: boolean;
  storyViewerOpen: boolean;
};

export function useFeedMediaSuspension({
  postDetailOpen,
  storyCreatorOpen,
  storyViewerOpen,
}: FeedMediaSuspensionReasons): void {
  const suspended = postDetailOpen || storyCreatorOpen || storyViewerOpen;

  useEffect(() => {
    setFeedMusicSuspended(suspended);
  }, [suspended]);

  useEffect(() => () => setFeedMusicSuspended(false), []);
}
