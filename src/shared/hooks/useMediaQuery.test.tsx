import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

type MatchMediaController = {
  setMatches: (matches: boolean) => void;
  addListener: ReturnType<typeof vi.fn>;
  removeListener: ReturnType<typeof vi.fn>;
};

function installMatchMedia(initialMatches: boolean): MatchMediaController {
  let matches = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const addListener = vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
    listeners.add(listener);
  });
  const removeListener = vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
    listeners.delete(listener);
  });

  vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addEventListener: addListener,
    removeEventListener: removeListener,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));

  return {
    addListener,
    removeListener,
    setMatches(nextMatches) {
      matches = nextMatches;
      const event = { matches, media: "(min-width: 768px)" } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useMediaQuery", () => {
  it("updates when the viewport starts matching the query", () => {
    const controller = installMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);

    act(() => controller.setMatches(true));

    expect(result.current).toBe(true);
  });

  it("removes its media-query listener when the consumer unmounts", () => {
    const controller = installMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(controller.addListener).toHaveBeenCalledTimes(1);

    unmount();

    expect(controller.removeListener).toHaveBeenCalledTimes(1);
  });
});
