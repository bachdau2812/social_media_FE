import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StoryItem } from "../model/story.types";
import { useStoryPreloader } from "./useStoryPreloader";

function story(id: string, userId: string, mediaUrl?: string): StoryItem {
  return { id, userId, mediaUrl, mediaType: "IMAGE", name: userId, username: userId, avatarUrl: "", totalItems: 1, seenItems: 0, state: "unseen" };
}

describe("useStoryPreloader", () => {
  const NativeImage = globalThis.Image;
  afterEach(() => { globalThis.Image = NativeImage; });

  it("decodes an image once and reuses its story-scoped cache", async () => {
    const decode = vi.fn().mockResolvedValue(undefined);
    const imageInstances: Array<{ src: string }> = [];
    globalThis.Image = class {
      src = "";
      decode = decode;
      constructor() { imageInstances.push(this); }
    } as unknown as typeof Image;
    const items = [story("a", "u1", "/a.jpg")];
    const { result } = renderHook(() => useStoryPreloader(items));

    await act(async () => {
      await result.current.ensureReady(0);
      await result.current.ensureReady(0);
    });

    expect(imageInstances).toHaveLength(1);
    expect(imageInstances[0]?.src).toBe("/a.jpg");
    expect(decode).toHaveBeenCalledTimes(1);
    expect(result.current.getState("a")).toBe("ready");
  });

  it("preloads previous/current/next plus the first item of the next user", async () => {
    const items = [story("a", "u1"), story("b", "u1"), story("c", "u1"), story("d", "u2"), story("e", "u2")];
    const { result } = renderHook(() => useStoryPreloader(items));

    await act(async () => { await result.current.preloadAround(1); });

    expect(result.current.getState("a")).toBe("ready");
    expect(result.current.getState("b")).toBe("ready");
    expect(result.current.getState("c")).toBe("ready");
    expect(result.current.getState("d")).toBe("ready");
    expect(result.current.getState("e")).toBe("loading");
  });
});
