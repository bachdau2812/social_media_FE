import { useMediaQuery } from "./useMediaQuery";

export type ViewportMode = "mobile" | "tablet" | "desktop";

export function useViewportMode(): ViewportMode {
  const tablet = useMediaQuery("(min-width: 768px)");
  const desktop = useMediaQuery("(min-width: 1024px)");

  if (desktop) return "desktop";
  if (tablet) return "tablet";
  return "mobile";
}
