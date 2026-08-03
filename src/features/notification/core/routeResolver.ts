import { decodeNotificationDeepLink } from "./deepLinkCodec";
import {
  isAppDestination,
  type AppDestination,
  type NotificationEnvelope,
  type NotificationMetadata,
} from "./types";

function metadataFor(envelope: NotificationEnvelope): NotificationMetadata {
  return { ...(envelope.data ?? {}), ...(envelope.metadata ?? {}) };
}

function normalizedMetadataKey(value: string) {
  return value.replace(/[^a-z\d]/gi, "").toLowerCase();
}

function stringValue(metadata: NotificationMetadata, ...keys: string[]) {
  const accepted = new Set(keys.map(normalizedMetadataKey));
  for (const [key, value] of Object.entries(metadata)) {
    if (accepted.has(normalizedMetadataKey(key)) && typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function sequenceValue(metadata: NotificationMetadata, ...keys: string[]) {
  const accepted = new Set(keys.map(normalizedMetadataKey));
  for (const [key, value] of Object.entries(metadata)) {
    if (!accepted.has(normalizedMetadataKey(key))) continue;
    const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
    if (Number.isSafeInteger(parsed) && parsed >= 0) return parsed;
  }
  return undefined;
}

export function resolveNotificationRoute(envelope: NotificationEnvelope): AppDestination | null {
  if (isAppDestination(envelope.destination)) return envelope.destination;

  const metadata = metadataFor(envelope);
  if (isAppDestination(metadata.destination)) return metadata.destination;

  const canonicalUrl = stringValue(metadata, "url", "deepLink");
  if (canonicalUrl) {
    const decoded = decodeNotificationDeepLink(canonicalUrl);
    if (decoded) return decoded;
  }

  const action = envelope.actionType?.trim().toUpperCase() ?? "";
  const actorId = envelope.actorId?.trim() || stringValue(metadata, "actorId", "storyOwnerId");
  const entityId = envelope.entityId?.trim() || undefined;
  const conversationId = stringValue(metadata, "conversationId", "groupId");
  const postId = stringValue(metadata, "postId");

  if (action === "LIKE_STORY") {
    const ownerId = stringValue(metadata, "storyOwnerId");
    const storyId = stringValue(metadata, "storyId") ?? entityId;
    return ownerId && storyId
      ? { kind: "story", ownerId, storyId, scope: "single" }
      : null;
  }

  if (action === "CHAT_MEMBER_REQUEST") {
    const targetConversationId = conversationId ?? entityId;
    return targetConversationId
      ? { kind: "conversation", conversationId: targetConversationId, panel: "requests" }
      : null;
  }

  if (action === "CHAT_GROUP_MEMBER_ADDED" || action === "CHAT_MEMBER_ADDED") {
    const targetConversationId = conversationId ?? entityId;
    return targetConversationId ? { kind: "conversation", conversationId: targetConversationId } : null;
  }

  if (action === "SEND_MESSAGE" || action === "NEW_MESSAGE" || action === "MESSAGE") {
    if (!conversationId) return null;
    const messageId = stringValue(metadata, "messageId") ?? entityId;
    const messageSeq = sequenceValue(metadata, "messageSeq");
    return {
      kind: "conversation",
      conversationId,
      ...(messageId ? { messageId } : {}),
      ...(messageSeq !== undefined ? { messageSeq } : {}),
    };
  }

  if (action === "STORY_DIRECT" || action === "FRIEND_STORY") {
    if (!actorId) return null;
    const storyId = stringValue(metadata, "storyId") ?? entityId;
    const storyItemId = stringValue(metadata, "storyItemId");
    return {
      kind: "story",
      ownerId: actorId,
      scope: "owner",
      ...(storyId ? { storyId } : {}),
      ...(storyItemId ? { storyItemId } : {}),
    };
  }

  if (action === "STORY_ACTIVITY" || action === "UP_STORY") {
    return actorId ? { kind: "profile", userId: actorId } : null;
  }

  if (action.includes("FOLLOW")) {
    return actorId ? { kind: "profile", userId: actorId } : null;
  }

  if (action.includes("COMMENT") || action.includes("REPLY")) {
    const targetPostId = postId
      ?? (envelope.entityType?.toUpperCase() === "POST" ? entityId : undefined);
    const commentId = stringValue(metadata, "commentId")
      ?? (envelope.entityType?.toUpperCase() !== "POST" ? entityId : undefined);
    return targetPostId
      ? {
          kind: "post",
          postId: targetPostId,
          ...(commentId ? { commentId, focusComment: true } : {}),
        }
      : null;
  }

  if (action.includes("LIKE") || action.includes("POST_SHARED")) {
    const targetPostId = postId ?? entityId;
    return targetPostId ? { kind: "post", postId: targetPostId } : null;
  }

  return null;
}
