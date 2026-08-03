import { afterEach, describe, expect, it, vi } from "vitest";
import {
  reportFeedMusicVisibility,
  setFeedMusicSuspended,
  subscribeFeedMusicOwner,
} from "./feedMusicCoordinator";

const POST_IDS = ["post-1", "post-2", "post-3"];

afterEach(() => {
  setFeedMusicSuspended(false);
  POST_IDS.forEach((postId) => reportFeedMusicVisibility(postId, 0));
});

describe("feedMusicCoordinator", () => {
  it("selects exactly the most visible qualifying post", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFeedMusicOwner(listener);

    reportFeedMusicVisibility("post-1", 0.7);
    reportFeedMusicVisibility("post-2", 0.8);

    expect(listener).toHaveBeenLastCalledWith("post-2");
    unsubscribe();
  });

  it("suspends playback and restores the viewport owner", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFeedMusicOwner(listener);
    reportFeedMusicVisibility("post-1", 0.75);

    setFeedMusicSuspended(true);
    expect(listener).toHaveBeenLastCalledWith(null);

    setFeedMusicSuspended(false);
    expect(listener).toHaveBeenLastCalledWith("post-1");
    unsubscribe();
  });

  it("transfers ownership when the current post leaves the viewport", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFeedMusicOwner(listener);
    reportFeedMusicVisibility("post-1", 0.9);
    reportFeedMusicVisibility("post-2", 0.7);

    reportFeedMusicVisibility("post-1", 0);

    expect(listener).toHaveBeenLastCalledWith("post-2");
    unsubscribe();
  });
});
