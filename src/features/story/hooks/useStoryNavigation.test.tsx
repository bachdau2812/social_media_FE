import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useStoryNavigation } from "./useStoryNavigation";

describe("useStoryNavigation", () => {
  it("keeps the committed story until the transform transition ends", async () => {
    const onCommit = vi.fn();
    const { result } = renderHook(() => useStoryNavigation({
      initialIndex: 1,
      itemCount: 3,
      onCommit,
      prepare: async () => undefined,
    }));

    await act(async () => { await result.current.move(1); });

    expect(result.current.committedIndex).toBe(1);
    expect(result.current.pendingIndex).toBe(2);
    expect(result.current.transitionState).toBe("animating");
    expect(result.current.trackTransform).toBe("translate3d(-200%, 0, 0)");
    expect(onCommit).not.toHaveBeenCalled();

    await act(async () => { result.current.onTransitionEnd({ propertyName: "transform" } as React.TransitionEvent<HTMLDivElement>); });

    expect(result.current.committedIndex).toBe(2);
    expect(result.current.trackTransform).toBe("translate3d(-100%, 0, 0)");
    expect(onCommit).toHaveBeenCalledWith(2);
  });

  it("locks repeated navigation while media is preparing or sliding", async () => {
    let release: (() => void) | undefined;
    const prepare = vi.fn(() => new Promise<void>((resolve) => { release = resolve; }));
    const onCommit = vi.fn();
    const { result } = renderHook(() => useStoryNavigation({ initialIndex: 0, itemCount: 3, onCommit, prepare }));

    let firstMove: Promise<boolean> | undefined;
    act(() => { firstMove = result.current.move(1); });
    expect(result.current.transitionState).toBe("idle");
    expect(result.current.isPreparing).toBe(true);

    await act(async () => {
      expect(await result.current.move(1)).toBe(false);
      release?.();
      await firstMove;
    });

    expect(result.current.pendingIndex).toBe(1);
    expect(result.current.transitionState).toBe("animating");
    expect(prepare).toHaveBeenCalledTimes(1);
  });

  it("slides right for the previous story and rejects the collection edges", async () => {
    const onCommit = vi.fn();
    const { result } = renderHook(() => useStoryNavigation({
      initialIndex: 1,
      itemCount: 3,
      onCommit,
      prepare: async () => undefined,
    }));

    await act(async () => { expect(await result.current.move(-1)).toBe(true); });
    expect(result.current.direction).toBe("previous");
    expect(result.current.trackTransform).toBe("translate3d(0%, 0, 0)");
    await act(async () => { result.current.onTransitionEnd({ propertyName: "transform" } as React.TransitionEvent<HTMLDivElement>); });
    await act(async () => { expect(await result.current.move(-1)).toBe(false); });
  });

  it("animates a short drag back to the centered slide", () => {
    const { result } = renderHook(() => useStoryNavigation({ initialIndex: 1, itemCount: 3, onCommit: vi.fn(), prepare: async () => undefined }));
    const currentTarget = {
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn(),
      getBoundingClientRect: () => ({ width: 200 }),
    };
    act(() => result.current.pointerHandlers.onPointerDown({ button: 0, pointerId: 7, clientX: 100, timeStamp: 0, currentTarget } as never));
    act(() => result.current.pointerHandlers.onPointerMove({ pointerId: 7, clientX: 70, timeStamp: 200, currentTarget } as never));
    expect(result.current.isDragging).toBe(true);
    act(() => result.current.pointerHandlers.onPointerUp({ pointerId: 7, clientX: 70, timeStamp: 220, currentTarget } as never));
    expect(result.current.isSnapping).toBe(true);
    expect(result.current.trackTransform).toBe("translate3d(-100%, 0, 0)");
    act(() => result.current.onTransitionEnd({ propertyName: "transform" } as React.TransitionEvent<HTMLDivElement>));
    expect(result.current.isSnapping).toBe(false);
  });

  it("keeps the released swipe position until the prepared story continues in the same direction", async () => {
    let releasePreparation: (() => void) | undefined;
    const prepare = vi.fn(() => new Promise<void>((resolve) => { releasePreparation = resolve; }));
    const { result } = renderHook(() => useStoryNavigation({ initialIndex: 1, itemCount: 3, onCommit: vi.fn(), prepare }));
    const currentTarget = {
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn(),
      getBoundingClientRect: () => ({ width: 200 }),
    };

    act(() => result.current.pointerHandlers.onPointerDown({ button: 0, pointerId: 8, clientX: 160, timeStamp: 0, currentTarget } as never));
    act(() => result.current.pointerHandlers.onPointerMove({ pointerId: 8, clientX: 90, timeStamp: 100, currentTarget } as never));
    expect(result.current.trackTransform).toBe("translate3d(calc(-100% + -70px), 0, 0)");

    act(() => result.current.pointerHandlers.onPointerUp({ pointerId: 8, clientX: 90, timeStamp: 110, currentTarget } as never));

    expect(result.current.isPreparing).toBe(true);
    expect(result.current.trackTransform).toBe("translate3d(calc(-100% + -70px), 0, 0)");

    await act(async () => {
      releasePreparation?.();
      await Promise.resolve();
    });

    expect(result.current.direction).toBe("next");
    expect(result.current.trackTransform).toBe("translate3d(-200%, 0, 0)");
  });
});
