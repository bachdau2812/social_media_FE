import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PostInteractionHandle } from "../model/postInteractionTracker";
import { PostInteractionContext } from "./PostInteractionProvider";

/** Both surfaces use the same episode, foreground clock, and report delivery flow. */
export function usePostInteraction(postId: string, viewerId: string, surface: "feed" | "detail", locallyBlocked = false) {
  const context = useContext(PostInteractionContext);
  const tracker = context?.viewerId === viewerId ? context.tracker : null;
  const blocked = locallyBlocked || Boolean(surface === "feed" ? context?.feedBlocked : context?.detailBlocked);
  const [target, ref] = useState<HTMLElement | null>(null);
  const blockedRef = useRef(blocked);
  const control = useRef<{ sync(): void; click(): void } | null>(null);

  useLayoutEffect(() => {
    blockedRef.current = blocked;
    control.current?.sync();
  }, [blocked]);

  useEffect(() => {
    if (!tracker || !postId || !target) return;
    let handle: PostInteractionHandle | null = null;
    let inViewport = surface === "detail";
    let pageHidden = false;
    let active = true;
    let openingClickPending = surface === "detail";

    const foreground = () => !pageHidden && document.visibilityState === "visible" && !blockedRef.current;
    const sync = () => {
      if (!active) return;
      if (inViewport && !handle) handle = tracker.attach(postId);
      if (!inViewport && handle) {
        handle.detach();
        handle = null;
      }
      handle?.setVisible(inViewport && foreground());
      if (openingClickPending && foreground() && handle) {
        handle.click();
        openingClickPending = false;
      }
    };
    const click = () => {
      if (!foreground()) return;
      // Explicit opening still counts without viewport-observer support.
      if (!handle) handle = tracker.attach(postId);
      handle.click();
    };
    control.current = { sync, click };
    sync();

    let observer: IntersectionObserver | undefined;
    if (surface === "feed" && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        if (!active) return;
        inViewport = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.5);
        sync();
      }, { threshold: [0, 0.5, 1] });
      observer.observe(target);
    }
    const hidePage = () => { pageHidden = true; sync(); };
    const showPage = () => { pageHidden = false; sync(); };
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pagehide", hidePage);
    window.addEventListener("pageshow", showPage);
    return () => {
      active = false;
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pagehide", hidePage);
      window.removeEventListener("pageshow", showPage);
      handle?.detach();
      control.current = null;
    };
  }, [tracker, postId, surface, target]);

  const click = useCallback(() => control.current?.click(), []);
  return { ref, click };
}
