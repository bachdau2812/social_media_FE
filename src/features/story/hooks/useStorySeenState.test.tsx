// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../api/story.api", () => ({
  storyApi: { recordView: vi.fn() },
}));

import { storyApi } from "../api/story.api";
import { useStorySeenState } from "./useStorySeenState";

afterEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("useStorySeenState", () => {
  it("loads viewer-specific local state and immediately marks a story seen while recording the view", async () => {
    localStorage.setItem("social-media-story-seen:viewer-1", JSON.stringify(["older-story"]));
    vi.mocked(storyApi.recordView).mockResolvedValue(undefined);

    const { result } = renderHook(() => useStorySeenState("viewer-1"));
    await waitFor(() => expect(result.current.seenStoryIds.has("older-story")).toBe(true));

    await act(async () => { await result.current.markSeen("story-1"); });

    expect(result.current.recentlySeenStoryIds.has("story-1")).toBe(true);
    expect(result.current.seenStoryIds.has("story-1")).toBe(true);
    expect(storyApi.recordView).toHaveBeenCalledWith("story-1", "viewer-1");
    expect(JSON.parse(localStorage.getItem("social-media-story-seen:viewer-1") ?? "[]")).toEqual(["older-story", "story-1"]);
  });

  it("rolls back the optimistic state when recording fails", async () => {
    vi.mocked(storyApi.recordView).mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => useStorySeenState("viewer-1"));

    await act(async () => { await result.current.markSeen("story-1"); });

    expect(result.current.recentlySeenStoryIds.has("story-1")).toBe(false);
    expect(result.current.seenStoryIds.has("story-1")).toBe(false);
    expect(localStorage.getItem("social-media-story-seen:viewer-1")).toBeNull();
  });

  it("does not apply an old viewer's in-flight result after an account switch", async () => {
    let complete!: () => void;
    vi.mocked(storyApi.recordView).mockImplementation(() => new Promise<void>((resolve) => { complete = resolve; }));
    const { result, rerender } = renderHook(({ viewerId }) => useStorySeenState(viewerId), { initialProps: { viewerId: "viewer-1" } });

    let pending!: Promise<void>;
    act(() => { pending = result.current.markSeen("story-1"); });
    rerender({ viewerId: "viewer-2" });
    await waitFor(() => expect(result.current.recentlySeenStoryIds.size).toBe(0));

    await act(async () => { complete(); await pending; });

    expect(result.current.seenStoryIds.has("story-1")).toBe(false);
    expect(result.current.recentlySeenStoryIds.has("story-1")).toBe(false);
    expect(localStorage.getItem("social-media-story-seen:viewer-1")).toBeNull();
  });
});
