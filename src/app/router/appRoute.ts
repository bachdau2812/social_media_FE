import { decodeNotificationDeepLink } from "../../features/notification/core/deepLinkCodec";
import type { AppDestination } from "../../features/notification/core/types";
import type { ChatNavigationTarget } from "../../features/chat/model/chat.types";
import type { ViewKey } from "./navigation.types";
import { routes } from "./routes";

export type AppRoute = {
  view: ViewKey;
  known: boolean;
  profileUserId?: string;
  profileFeedPostId?: string;
  postId?: string;
  commentId?: string;
  chatTarget?: ChatNavigationTarget;
  story?: Extract<AppDestination, { kind: "story" }>;
  createStory?: boolean;
  query?: string;
  libraryTab?: string;
  settingsSection?: string;
};
type RouteLocation = { pathname: string; search: string };

function withQuery(path: string, values: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.size ? `${path}?${query}` : path;
}

export function destinationPath(destination: AppDestination): string {
  switch (destination.kind) {
    case "home": return routes.home;
    case "profile": return routes.profile(destination.userId);
    case "post": return withQuery(routes.post(destination.postId), { commentId: destination.commentId });
    case "conversation": return withQuery(routes.conversation(destination.conversationId), {
      messageId: destination.messageId, messageSeq: destination.messageSeq, panel: destination.panel,
    });
    case "story": return withQuery(routes.story(destination.ownerId, destination.storyItemId || destination.storyId), { scope: destination.scope });
  }
}

export function canonicalAppPath(location: RouteLocation): string | null {
  const destination = decodeNotificationDeepLink(`${location.pathname}${location.search}`);
  return destination ? destinationPath(destination) : null;
}

export function isResourceRoute(route: AppRoute): boolean {
  return Boolean(route.postId || route.story || route.createStory);
}

export function readAppRoute(location: RouteLocation): AppRoute {
  const canonical = canonicalAppPath(location);
  if (canonical) {
    const url = new URL(canonical, "https://route.local");
    return readAppRoute({ pathname: url.pathname, search: url.search });
  }
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const params = new URLSearchParams(location.search);
  const screen: Record<string, ViewKey> = {
    "/": "home", "/search": "search", "/notifications": "notifications", "/library": "library",
    "/settings": "settings", "/chat": "chat", "/profile": "profile", "/create/post": "create", "/states": "states",
  };
  if (screen[path]) return {
    view: screen[path], known: true,
    ...(path === "/search" ? { query: params.get("q") || "" } : {}),
    ...(path === "/library" ? { libraryTab: params.get("tab") || "saved" } : {}),
  };
  if (path === "/create/story") return { view: "home", known: true, createStory: true };
  try {
    const parts = path.split("/").slice(1).map(decodeURIComponent);
    if (!parts.every((part) => part.trim())) return { view: "home", known: false };
    if (parts[0] === "profile" && parts.length === 2) return { view: "profile", known: true, profileUserId: parts[1] };
    if (parts[0] === "profile" && parts.length === 4 && parts[2] === "posts") return {
      view: "profile", known: true, profileUserId: parts[1], profileFeedPostId: parts[3],
    };
    if (parts[0] === "post" && parts.length === 2) return {
      view: "home", known: true, postId: parts[1], ...(params.get("commentId") ? { commentId: params.get("commentId")! } : {}),
    };
    if (parts[0] === "settings" && parts.length === 2 && ["appearance", "privacy", "posts", "feed", "messages", "notifications"].includes(parts[1])) return { view: "settings", known: true, settingsSection: parts[1] };
    if (parts[0] === "chat" && parts.length === 2) {
      const rawSequence = params.get("messageSeq");
      const sequence = rawSequence && /^\d+$/.test(rawSequence) ? Number(rawSequence) : undefined;
      const panel = params.get("panel");
      return { view: "chat", known: true, chatTarget: {
        conversationId: parts[1],
        ...(params.get("messageId") ? { messageId: params.get("messageId")! } : {}),
        ...(sequence !== undefined && Number.isSafeInteger(sequence) ? { messageSeq: sequence } : {}),
        ...(panel === "details" || panel === "requests" ? { panel } : {}),
      } };
    }
    if (parts[0] === "story" && (parts.length === 2 || parts.length === 3)) {
      const scope = params.get("scope");
      return { view: "home", known: true, story: {
        kind: "story", ownerId: parts[1], ...(parts[2] ? { storyId: parts[2] } : {}),
        scope: scope === "owner" || scope === "rail" ? scope : parts[2] ? "single" : "owner",
      } };
    }
  } catch { /* Malformed percent-encoded resource IDs are unavailable routes. */ }
  return { view: "home", known: false };
}
