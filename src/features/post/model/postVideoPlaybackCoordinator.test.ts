import { describe, expect, it, vi } from "vitest";
import {
  enablePostVideoSound,
  getPostVideoSoundEnabled,
  reportAudibleAutoplayBlocked,
  subscribePostVideoSound,
} from "./postVideoPlaybackCoordinator";

describe("postVideoPlaybackCoordinator", () => {
  it("shares muted fallback and later audible activation across players", () => {
    const listener = vi.fn();
    const unsubscribe = subscribePostVideoSound(listener);

    expect(getPostVideoSoundEnabled()).toBe(true);
    expect(listener).toHaveBeenLastCalledWith(true);

    reportAudibleAutoplayBlocked();
    expect(getPostVideoSoundEnabled()).toBe(false);
    expect(listener).toHaveBeenLastCalledWith(false);

    enablePostVideoSound();
    expect(getPostVideoSoundEnabled()).toBe(true);
    expect(listener).toHaveBeenLastCalledWith(true);
    expect(listener).toHaveBeenCalledTimes(3);

    unsubscribe();
  });
});
