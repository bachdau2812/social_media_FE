import { useEffect } from "react";
import { setFeedMusicSuspended } from "../model/feedMusicCoordinator";

type FeedMediaSuspensionReasons = {
  postDetailOpen: boolean;
  storyCreatorOpen: boolean;
};

export function useFeedMediaSuspension({
  postDetailOpen,
  storyCreatorOpen,
}: FeedMediaSuspensionReasons): void {
  const suspended = postDetailOpen || storyCreatorOpen;

  useEffect(() => {
    setFeedMusicSuspended(suspended);
  }, [suspended]);

  useEffect(() => () => setFeedMusicSuspended(false), []);
}
