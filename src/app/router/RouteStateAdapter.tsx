import { useEffect, type ReactNode } from "react";
import type { ViewKey } from "./navigation.types";

const ACTIVE_VIEW_STORAGE_KEY = "social-media-active-view";
const PROFILE_USER_STORAGE_KEY = "social-media-profile-user";
const PERSISTED_VIEW_KEYS = new Set<ViewKey>([
  "home",
  "search",
  "create",
  "profile",
  "notifications",
  "library",
  "settings",
  "chat",
  "states",
]);

type RouteView = "home" | "search" | "create" | "profile" | "notifications" | "library" | "settings" | "chat";

export function RouteStateAdapter({ view, profileUserId, children }: {
  view: RouteView;
  profileUserId?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    try {
      const storedView = sessionStorage.getItem(ACTIVE_VIEW_STORAGE_KEY);
      const rootRouteHasPersistedView =
        view === "home"
        && storedView !== null
        && PERSISTED_VIEW_KEYS.has(storedView as ViewKey);

      if (!rootRouteHasPersistedView) {
        sessionStorage.setItem(ACTIVE_VIEW_STORAGE_KEY, view);
      }
      if (profileUserId) sessionStorage.setItem(PROFILE_USER_STORAGE_KEY, profileUserId);
    } catch {
      // Storage may be unavailable in privacy mode; route rendering still proceeds.
    }
  }, [profileUserId, view]);
  return children;
}
