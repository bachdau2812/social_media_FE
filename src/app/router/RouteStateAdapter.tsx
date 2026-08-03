import { useEffect, type ReactNode } from "react";

const ACTIVE_VIEW_STORAGE_KEY = "social-media-active-view";
const PROFILE_USER_STORAGE_KEY = "social-media-profile-user";

type RouteView = "home" | "search" | "create" | "profile" | "notifications" | "library" | "settings" | "chat";

export function RouteStateAdapter({ view, profileUserId, children }: {
  view: RouteView;
  profileUserId?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    try {
      sessionStorage.setItem(ACTIVE_VIEW_STORAGE_KEY, view);
      if (profileUserId) sessionStorage.setItem(PROFILE_USER_STORAGE_KEY, profileUserId);
    } catch {
      // Storage may be unavailable in privacy mode; route rendering still proceeds.
    }
  }, [profileUserId, view]);
  return children;
}
