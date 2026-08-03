import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMusicSegmentPreview } from "./useMusicSegmentPreview";

class AudioStub {
  static instances: AudioStub[] = [];
  src: string;
  currentTime = 0;
  preload = "";
  paused = true;
  listeners = new Map<string, () => void>();
  play = vi.fn(async () => {
    this.paused = false;
  });
  pause = vi.fn(() => {
    this.paused = true;
  });
  addEventListener = vi.fn((name: string, listener: () => void) => {
    this.listeners.set(name, listener);
  });
  removeEventListener = vi.fn((name: string, listener: () => void) => {
    if (this.listeners.get(name) === listener) this.listeners.delete(name);
  });

  constructor(src: string) {
    this.src = src;
    AudioStub.instances.push(this);
  }
}

describe("useMusicSegmentPreview", () => {
  beforeEach(() => {
    AudioStub.instances = [];
    vi.stubGlobal("Audio", AudioStub);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("plays from the selected start and stops at the selected end", async () => {
    const { result } = renderHook(() => useMusicSegmentPreview());

    await act(() => result.current.playSegment(
      { id: "one", url: "/one.mp3" },
      { start: 10, end: 40 },
    ));

    const audio = AudioStub.instances[0];
    expect(audio.currentTime).toBe(10);
    expect(audio.play).toHaveBeenCalledOnce();
    expect(result.current.previewingId).toBe("one");

    audio.currentTime = 40;
    act(() => audio.listeners.get("timeupdate")?.());

    expect(audio.pause).toHaveBeenCalledOnce();
    expect(result.current.previewingId).toBeNull();
  });

  it("stops the active demo as soon as editing begins", async () => {
    const { result } = renderHook(() => useMusicSegmentPreview());
    await act(() => result.current.playSegment(
      { id: "one", url: "/one.mp3" },
      { start: 0, end: 30 },
    ));

    act(() => result.current.stop());

    expect(AudioStub.instances[0].pause).toHaveBeenCalledOnce();
    expect(result.current.previewingId).toBeNull();
  });

  it("removes listeners from the previous track before playing another", async () => {
    const { result, unmount } = renderHook(() => useMusicSegmentPreview());
    await act(() => result.current.playSegment(
      { id: "one", url: "/one.mp3" },
      { start: 0, end: 30 },
    ));
    await act(() => result.current.playSegment(
      { id: "two", url: "/two.mp3" },
      { start: 5, end: 35 },
    ));

    expect(AudioStub.instances[0].listeners.size).toBe(0);
    expect(AudioStub.instances[0].pause).toHaveBeenCalledOnce();
    expect(result.current.previewingId).toBe("two");

    unmount();
    expect(AudioStub.instances[1].listeners.size).toBe(0);
    expect(AudioStub.instances[1].pause).toHaveBeenCalledOnce();
  });
});
