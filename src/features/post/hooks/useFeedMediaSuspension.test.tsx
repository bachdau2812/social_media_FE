import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  reportFeedMusicVisibility,
  setFeedMusicSuspended,
  subscribeFeedMusicOwner,
} from "../model/feedMusicCoordinator";
import { useFeedMediaSuspension } from "./useFeedMediaSuspension";

const POST_ID = "visible-post";

afterEach(() => {
  setFeedMusicSuspended(false);
  reportFeedMusicVisibility(POST_ID, 0);
});

describe("useFeedMediaSuspension", () => {
  it("restores the visible Feed owner after Create Story closes", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFeedMusicOwner(listener);
    reportFeedMusicVisibility(POST_ID, 0.8);
    const { rerender, unmount } = renderHook(
      (reasons) => useFeedMediaSuspension(reasons),
      {
        initialProps: {
          postDetailOpen: false,
          storyCreatorOpen: false,
          storyViewerOpen: false,
        },
      },
    );

    act(() => rerender({ postDetailOpen: false, storyCreatorOpen: true, storyViewerOpen: false }));
    expect(listener).toHaveBeenLastCalledWith(null);

    act(() => rerender({ postDetailOpen: false, storyCreatorOpen: false, storyViewerOpen: false }));
    expect(listener).toHaveBeenLastCalledWith(POST_ID);

    unmount();
    unsubscribe();
  });

  it("stays suspended until both Create Story and Post Detail close", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFeedMusicOwner(listener);
    reportFeedMusicVisibility(POST_ID, 0.8);
    const { rerender, unmount } = renderHook(
      (reasons) => useFeedMediaSuspension(reasons),
      {
        initialProps: {
          postDetailOpen: true,
          storyCreatorOpen: true,
          storyViewerOpen: false,
        },
      },
    );

    expect(listener).toHaveBeenLastCalledWith(null);
    act(() => rerender({ postDetailOpen: true, storyCreatorOpen: false, storyViewerOpen: false }));
    expect(listener).toHaveBeenLastCalledWith(null);

    act(() => rerender({ postDetailOpen: false, storyCreatorOpen: false, storyViewerOpen: false }));
    expect(listener).toHaveBeenLastCalledWith(POST_ID);

    unmount();
    unsubscribe();
  });

  it("restores the same visible Feed owner after Story Viewer closes", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeFeedMusicOwner(listener);
    reportFeedMusicVisibility(POST_ID, 0.8);
    const { rerender, unmount } = renderHook(
      (reasons) => useFeedMediaSuspension(reasons),
      {
        initialProps: {
          postDetailOpen: false,
          storyCreatorOpen: false,
          storyViewerOpen: false,
        },
      },
    );

    act(() => rerender({ postDetailOpen: false, storyCreatorOpen: false, storyViewerOpen: true }));
    expect(listener).toHaveBeenLastCalledWith(null);

    act(() => rerender({ postDetailOpen: false, storyCreatorOpen: false, storyViewerOpen: false }));
    expect(listener).toHaveBeenLastCalledWith(POST_ID);

    unmount();
    unsubscribe();
  });
});
