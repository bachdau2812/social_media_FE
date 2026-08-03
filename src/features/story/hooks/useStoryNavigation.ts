import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type TransitionEvent } from "react";

export type StoryNavigationDirection = "next" | "previous";
export type StoryTransitionState = "idle" | "animating";

type StoryNavigationOptions = {
  initialIndex: number;
  itemCount: number;
  onCommit: (index: number) => void;
  prepare: (index: number) => Promise<unknown>;
  onHoldChange?: (holding: boolean) => void;
};

type PointerSession = {
  id: number;
  startX: number;
  lastX: number;
  lastAt: number;
  velocity: number;
};

export function useStoryNavigation({ initialIndex, itemCount, onCommit, prepare, onHoldChange }: StoryNavigationOptions) {
  const [committedIndex, setCommittedIndex] = useState(initialIndex);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<StoryNavigationDirection | null>(null);
  const [transitionState, setTransitionState] = useState<StoryTransitionState>("idle");
  const [isPreparing, setIsPreparing] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const committedRef = useRef(initialIndex);
  const pendingRef = useRef<number | null>(null);
  const lockedRef = useRef(false);
  const mountedRef = useRef(true);
  const fallbackRef = useRef<number | null>(null);
  const pointerRef = useRef<PointerSession | null>(null);
  const suppressClickRef = useRef(false);

  const finishTransition = useCallback((committedTarget?: number) => {
    const next = committedTarget ?? pendingRef.current;
    if (next === null) return;
    if (fallbackRef.current !== null) window.clearTimeout(fallbackRef.current);
    fallbackRef.current = null;
    committedRef.current = next;
    pendingRef.current = null;
    setCommittedIndex(next);
    setPendingIndex(null);
    setDirection(null);
    setTransitionState("idle");
    setIsSnapping(false);
    setDragOffset(0);
    lockedRef.current = false;
    onCommit(next);
  }, [onCommit]);

  const startAnimation = useCallback((target: number, nextDirection: StoryNavigationDirection) => {
    if (!mountedRef.current) return;
    pendingRef.current = target;
    setPendingIndex(target);
    setDirection(nextDirection);
    setIsPreparing(false);
    setIsSnapping(false);
    setDragOffset(0);
    setTransitionState("animating");
    fallbackRef.current = window.setTimeout(() => finishTransition(target), 380);
  }, [finishTransition]);

  const moveTo = useCallback(async (target: number) => {
    if (lockedRef.current || target < 0 || target >= itemCount || target === committedRef.current) return false;
    lockedRef.current = true;
    setIsPreparing(true);
    const nextDirection: StoryNavigationDirection = target > committedRef.current ? "next" : "previous";
    try {
      await prepare(target);
    } catch {
      // A failed preload still has a stable error slide, so navigation may continue.
    }
    startAnimation(target, nextDirection);
    return true;
  }, [itemCount, prepare, startAnimation]);

  const move = useCallback((delta: number) => moveTo(committedRef.current + delta), [moveTo]);

  const onTransitionEnd = useCallback((_event: TransitionEvent<HTMLDivElement>) => {
    if (pendingIndex !== null) finishTransition(pendingIndex);
    else if (isSnapping) setIsSnapping(false);
  }, [finishTransition, isSnapping, pendingIndex]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (lockedRef.current || event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest("button, a, input, textarea, select, [role='button'], [contenteditable='true'], [data-story-interactive]")) return;
    setIsSnapping(false);
    pointerRef.current = { id: event.pointerId, startX: event.clientX, lastX: event.clientX, lastAt: event.timeStamp, velocity: 0 };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    onHoldChange?.(true);
  }, [onHoldChange]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const session = pointerRef.current;
    if (!session || session.id !== event.pointerId || lockedRef.current) return;
    const elapsed = Math.max(1, event.timeStamp - session.lastAt);
    session.velocity = (event.clientX - session.lastX) / elapsed;
    session.lastX = event.clientX;
    session.lastAt = event.timeStamp;
    let nextOffset = event.clientX - session.startX;
    if ((committedRef.current === 0 && nextOffset > 0) || (committedRef.current === itemCount - 1 && nextOffset < 0)) nextOffset *= 0.22;
    setDragOffset(nextOffset);
  }, [itemCount]);

  const releasePointer = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const session = pointerRef.current;
    if (!session || session.id !== event.pointerId) return;
    pointerRef.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    onHoldChange?.(false);
    const delta = event.clientX - session.startX;
    const width = Math.max(1, event.currentTarget.getBoundingClientRect().width);
    const dragged = Math.abs(delta) > 8;
    suppressClickRef.current = dragged;
    const shouldMove = Math.abs(delta) >= width * 0.22 || Math.abs(session.velocity) >= 0.55;
    const directionDelta = delta < 0 ? 1 : -1;
    const target = committedRef.current + directionDelta;
    if (shouldMove && target >= 0 && target < itemCount) {
      void move(directionDelta);
    } else {
      setIsSnapping(true);
      setDragOffset(0);
    }
  }, [itemCount, move, onHoldChange]);

  const cancelPointer = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const session = pointerRef.current;
    if (!session || session.id !== event.pointerId) return;
    pointerRef.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    onHoldChange?.(false);
    suppressClickRef.current = Math.abs(session.lastX - session.startX) > 8;
    setIsSnapping(true);
    setDragOffset(0);
  }, [onHoldChange]);

  const consumeSuppressedClick = useCallback(() => {
    if (!suppressClickRef.current) return false;
    suppressClickRef.current = false;
    return true;
  }, []);

  useEffect(() => {
    if (!lockedRef.current && initialIndex !== committedRef.current) {
      committedRef.current = initialIndex;
      setCommittedIndex(initialIndex);
    }
  }, [initialIndex]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (fallbackRef.current !== null) window.clearTimeout(fallbackRef.current);
    };
  }, []);

  const trackTransform = dragOffset !== 0
    ? `translate3d(calc(-100% + ${dragOffset}px), 0, 0)`
    : transitionState === "animating"
      ? direction === "next" ? "translate3d(-200%, 0, 0)" : "translate3d(0%, 0, 0)"
      : "translate3d(-100%, 0, 0)";

  return {
    committedIndex,
    pendingIndex,
    direction,
    transitionState,
    isPreparing,
    isSnapping,
    isDragging: dragOffset !== 0,
    trackTransform,
    move,
    moveTo,
    onTransitionEnd,
    consumeSuppressedClick,
    pointerHandlers: { onPointerDown, onPointerMove, onPointerUp: releasePointer, onPointerCancel: cancelPointer },
  };
}
