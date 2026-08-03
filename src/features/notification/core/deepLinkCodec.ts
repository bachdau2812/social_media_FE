import { isAppDestination, type AppDestination } from "./types";

const TARGET_PARAM = "notificationTarget";
const FALLBACK_ORIGIN = "https://notification.local";

function setOptional(params: URLSearchParams, key: string, value: string | number | undefined) {
  if (value !== undefined) params.set(key, String(value));
}

function asNonEmpty(value: string | null) {
  return value?.trim() || null;
}

function asSequence(value: string | null) {
  if (value === null || !/^\d+$/.test(value)) return undefined;
  const sequence = Number(value);
  return Number.isSafeInteger(sequence) ? sequence : undefined;
}

function decodeBackendPath(url: URL): AppDestination | null {
  const pathname = url.pathname.replace(/^\/app(?=\/)/, "");
  const params = url.searchParams;
  if (pathname === "/" || pathname === "") return { kind: "home" };
  if (pathname === "/messages") {
    const conversationId = asNonEmpty(params.get("conversationId"));
    if (!conversationId) return null;
    const messageId = asNonEmpty(params.get("messageId")) ?? undefined;
    const messageSeq = asSequence(params.get("messageSeq"));
    const panel = params.get("panel");
    return {
      kind: "conversation",
      conversationId,
      ...(messageId ? { messageId } : {}),
      ...(messageSeq !== undefined ? { messageSeq } : {}),
      ...(panel === "details" || panel === "requests" ? { panel } : {}),
    };
  }
  const profileMatch = pathname.match(/^\/profiles\/([^/]+)$/);
  if (profileMatch) return { kind: "profile", userId: decodeURIComponent(profileMatch[1]) };
  const postMatch = pathname.match(/^\/posts\/([^/]+)$/);
  if (postMatch) {
    const commentId = asNonEmpty(params.get("commentId")) ?? undefined;
    return {
      kind: "post",
      postId: decodeURIComponent(postMatch[1]),
      ...(commentId ? { commentId, focusComment: true } : {}),
    };
  }
  if (pathname === "/stories") {
    const ownerId = asNonEmpty(params.get("ownerId"));
    if (!ownerId) return null;
    const storyId = asNonEmpty(params.get("storyId")) ?? undefined;
    const storyItemId = asNonEmpty(params.get("storyItemId")) ?? undefined;
    const scope = params.get("storyScope") === "single"
      ? "single"
      : params.get("scoped") === "true" ? "owner" : "rail";
    return {
      kind: "story",
      ownerId,
      scope,
      ...(storyId ? { storyId } : {}),
      ...(storyItemId ? { storyItemId } : {}),
    };
  }
  return null;
}

export function encodeNotificationDeepLink(destination: AppDestination, baseUrl = "/") {
  if (!isAppDestination(destination)) {
    throw new Error("Cannot encode an invalid notification destination.");
  }

  const isAbsolute = /^[a-z][a-z\d+.-]*:\/\//i.test(baseUrl);
  const url = new URL(baseUrl, FALLBACK_ORIGIN);
  const params = url.searchParams;
  params.set(TARGET_PARAM, destination.kind);

  switch (destination.kind) {
    case "home":
      break;
    case "profile":
      params.set("userId", destination.userId);
      break;
    case "post":
      params.set("postId", destination.postId);
      setOptional(params, "commentId", destination.commentId);
      if (destination.focusComment) params.set("focusComment", "1");
      break;
    case "conversation":
      params.set("conversationId", destination.conversationId);
      setOptional(params, "messageId", destination.messageId);
      setOptional(params, "messageSeq", destination.messageSeq);
      setOptional(params, "surface", destination.surface);
      setOptional(params, "panel", destination.panel);
      break;
    case "story":
      params.set("ownerId", destination.ownerId);
      setOptional(params, "storyId", destination.storyId);
      setOptional(params, "storyItemId", destination.storyItemId);
      params.set("scope", destination.scope);
      break;
  }

  return isAbsolute ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
}

export function decodeNotificationDeepLink(input: string | URL): AppDestination | null {
  try {
    const url = input instanceof URL ? input : new URL(input, FALLBACK_ORIGIN);
    const params = url.searchParams;
    const kind = params.get(TARGET_PARAM);
    if (!kind) return decodeBackendPath(url);
    let destination: AppDestination | null = null;

    switch (kind) {
      case "home":
        destination = { kind: "home" };
        break;
      case "profile": {
        const userId = asNonEmpty(params.get("userId"));
        if (userId) destination = { kind: "profile", userId };
        break;
      }
      case "post": {
        const postId = asNonEmpty(params.get("postId"));
        if (!postId) break;
        const commentId = asNonEmpty(params.get("commentId")) ?? undefined;
        destination = {
          kind: "post",
          postId,
          ...(commentId ? { commentId } : {}),
          ...(params.get("focusComment") === "1" ? { focusComment: true } : {}),
        };
        break;
      }
      case "conversation": {
        const conversationId = asNonEmpty(params.get("conversationId"));
        if (!conversationId) break;
        const messageId = asNonEmpty(params.get("messageId")) ?? undefined;
        const messageSeq = asSequence(params.get("messageSeq"));
        const surface = params.get("surface");
        const panel = params.get("panel");
        destination = {
          kind: "conversation",
          conversationId,
          ...(messageId ? { messageId } : {}),
          ...(messageSeq !== undefined ? { messageSeq } : {}),
          ...(surface === "full" || surface === "mini" ? { surface } : {}),
          ...(panel === "details" || panel === "requests" ? { panel } : {}),
        };
        break;
      }
      case "story": {
        const ownerId = asNonEmpty(params.get("ownerId"));
        const scope = params.get("scope");
        if (!ownerId || (scope !== "owner" && scope !== "rail" && scope !== "single")) break;
        const storyId = asNonEmpty(params.get("storyId")) ?? undefined;
        const storyItemId = asNonEmpty(params.get("storyItemId")) ?? undefined;
        destination = {
          kind: "story",
          ownerId,
          scope,
          ...(storyId ? { storyId } : {}),
          ...(storyItemId ? { storyItemId } : {}),
        };
        break;
      }
    }

    return destination && isAppDestination(destination) ? destination : null;
  } catch {
    return null;
  }
}
