import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { StoryItem } from "../model/story.types";
import { useStoryPlayback } from "./useStoryPlayback";

const baseStory: StoryItem = { id: "story-1", userId: "u1", name: "A", username: "a", avatarUrl: "", durationSeconds: 1, totalItems: 1, seenItems: 0, state: "unseen" };

describe("useStoryPlayback", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("keeps exactly one progress timer and advances only once", async () => {
    const onAdvance = vi.fn();
    const { result, rerender } = renderHook(({ navigating }) => useStoryPlayback({ story: baseStory, ready: true, paused: false, navigating, muted: false, onAdvance }), { initialProps: { navigating: false } });

    act(() => vi.advanceTimersByTime(500));
    expect(result.current.progress).toBeGreaterThan(0);
    rerender({ navigating: true });
    const stoppedAt = result.current.progress;
    await act(async () => { vi.advanceTimersByTime(1000); await Promise.resolve(); });
    expect(result.current.progress).toBe(stoppedAt);
    rerender({ navigating: false });
    await act(async () => { vi.advanceTimersByTime(1000); await Promise.resolve(); });
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  it("resets progress only after the committed story changes", () => {
    const onAdvance = vi.fn();
    const { result, rerender } = renderHook(({ story }) => useStoryPlayback({ story, ready: true, paused: false, navigating: false, muted: true, onAdvance }), { initialProps: { story: baseStory } });
    act(() => vi.advanceTimersByTime(400));
    expect(result.current.progress).toBeGreaterThan(0);
    rerender({ story: { ...baseStory, id: "story-2" } });
    expect(result.current.progress).toBe(0);
  });

  it("stops progress and exposes retry when browser autoplay is blocked", async () => {
    const onAdvance = vi.fn();
    const video = { muted: false, duration: 1, pause: vi.fn(), play: vi.fn().mockRejectedValue(new Error("blocked")) } as unknown as HTMLVideoElement;
    const { result } = renderHook(() => useStoryPlayback({ story: baseStory, ready: true, paused: false, navigating: false, muted: false, onAdvance }));

    await act(async () => { result.current.videoRef(video); await Promise.resolve(); });
    expect(result.current.playBlocked).toBe(true);
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.progress).toBe(0);

    (video.play as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    await act(async () => { result.current.retryPlay(); await Promise.resolve(); });
    expect(result.current.playBlocked).toBe(false);
  });
});
