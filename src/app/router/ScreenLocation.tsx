import { createContext, useContext, type ReactNode } from "react";
import { useLocation, type Location } from "react-router-dom";

// A retained screen reads its own entry while an overlaid resource owns the address bar.
const ScreenLocationContext = createContext<Location | null>(null);
export function ScreenLocationProvider({ location, children }: { location: Location; children: ReactNode }) {
  return <ScreenLocationContext.Provider value={location}>{children}</ScreenLocationContext.Provider>;
}
export function useScreenLocation() {
  const actual = useLocation();
  return useContext(ScreenLocationContext) ?? actual;
}
export function nextScreenState(location: Location) {
  const depth = location.state?.depth;
  return { depth: (typeof depth === "number" && Number.isSafeInteger(depth) && depth >= 0 ? depth : 0) + 1 };
}
