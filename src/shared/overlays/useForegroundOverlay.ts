import { createContext, useContext, useLayoutEffect } from "react";

/** Register a covering overlay without coupling its feature to post telemetry. */
export const ForegroundOverlayContext = createContext<(() => () => void) | null>(null);

export function useForegroundOverlay(active: boolean): void {
  const register = useContext(ForegroundOverlayContext);
  useLayoutEffect(() => {
    if (active) return register?.();
  }, [active, register]);
}
