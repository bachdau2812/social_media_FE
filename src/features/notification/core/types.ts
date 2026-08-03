export type ConversationDetailsPanel = "details" | "requests";
export type ConversationSurface = "full" | "mini";

export type AppDestination =
  | { kind: "home" }
  | { kind: "profile"; userId: string }
  | {
      kind: "post";
      postId: string;
      commentId?: string;
      focusComment?: boolean;
    }
  | {
      kind: "conversation";
      conversationId: string;
      messageId?: string;
      messageSeq?: number;
      surface?: ConversationSurface;
      panel?: ConversationDetailsPanel;
    }
  | {
      kind: "story";
      ownerId: string;
      storyId?: string;
      storyItemId?: string;
      scope: "owner" | "rail" | "single";
    };

export type NotificationMetadata = Record<string, unknown>;

export interface NotificationEnvelope {
  id?: string | null;
  actionType?: string | null;
  actorId?: string | null;
  entityId?: string | null;
  entityType?: string | null;
  destination?: AppDestination | null;
  metadata?: NotificationMetadata | null;
  data?: NotificationMetadata | null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isAppDestination(value: unknown): value is AppDestination {
  if (!value || typeof value !== "object") return false;
  const destination = value as Record<string, unknown>;

  switch (destination.kind) {
    case "home":
      return true;
    case "profile":
      return isNonEmptyString(destination.userId);
    case "post":
      return isNonEmptyString(destination.postId)
        && (destination.commentId === undefined || isNonEmptyString(destination.commentId))
        && (destination.focusComment === undefined || typeof destination.focusComment === "boolean");
    case "conversation":
      return isNonEmptyString(destination.conversationId)
        && (destination.messageId === undefined || isNonEmptyString(destination.messageId))
        && (destination.messageSeq === undefined || (
          typeof destination.messageSeq === "number"
          && Number.isSafeInteger(destination.messageSeq)
          && destination.messageSeq >= 0
        ))
        && (destination.surface === undefined || destination.surface === "full" || destination.surface === "mini")
        && (destination.panel === undefined || destination.panel === "details" || destination.panel === "requests");
    case "story":
      return isNonEmptyString(destination.ownerId)
        && (destination.storyId === undefined || isNonEmptyString(destination.storyId))
        && (destination.storyItemId === undefined || isNonEmptyString(destination.storyItemId))
        && (destination.scope === "owner" || destination.scope === "rail" || destination.scope === "single")
        && (destination.scope !== "single" || isNonEmptyString(destination.storyId));
    default:
      return false;
  }
}
