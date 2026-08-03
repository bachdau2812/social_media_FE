import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useViewportMode } from "./useViewportMode";

function installViewport(width: number) {
  const listeners = new Map<string, Set<(event: MediaQueryListEvent) => void>>();
  let currentWidth = width;

  vi.stubGlobal("matchMedia", vi.fn((query: string) => {
    const minimum = Number(query.match(/min-width:\s*(\d+)px/)?.[1] ?? 0);
    const queryListeners = listeners.get(query) ?? new Set();
    listeners.set(query, queryListeners);
    return {
      get matches() {
        return currentWidth >= minimum;
      },
      media: query,
      onchange: null,
      addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => queryListeners.add(listener),
      removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => queryListeners.delete(listener),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  }));

  return (nextWidth: number) => {
    currentWidth = nextWidth;
    listeners.forEach((queryListeners, query) => {
      const minimum = Number(query.match(/min-width:\s*(\d+)px/)?.[1] ?? 0);
      const event = { matches: currentWidth >= minimum, media: query } as MediaQueryListEvent;
      queryListeners.forEach((listener) => listener(event));
    });
  };
}

afterEach(() => vi.unstubAllGlobals());

describe("useViewportMode", () => {
  it("expands from mobile to tablet and desktop at the shared breakpoints", () => {
    const setWidth = installViewport(390);
    const { result } = renderHook(() => useViewportMode());

    expect(result.current).toBe("mobile");

    act(() => setWidth(768));
    expect(result.current).toBe("tablet");

    act(() => setWidth(1024));
    expect(result.current).toBe("desktop");
  });
});
