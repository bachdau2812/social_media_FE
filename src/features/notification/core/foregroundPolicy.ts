import type { AppDestination } from "./types";

export interface ForegroundNotificationIdentity {
  notificationId?: string;
  url?: string;
  destination: AppDestination | null;
}

export type ForegroundSuppressionReason = "display" | "duplicate" | "active-destination" | "custom";

export interface ForegroundPolicyResult {
  display: boolean;
  reason: ForegroundSuppressionReason;
}

interface ForegroundNotificationGateOptions {
  dedupeWindowMs?: number;
  now?: () => number;
  shouldSuppress?: (
    notification: ForegroundNotificationIdentity,
    activeDestination: AppDestination | null,
  ) => boolean;
}

function primaryDestinationId(destination: AppDestination) {
  switch (destination.kind) {
    case "home":
      return "home";
    case "profile":
      return destination.userId;
    case "post":
      return destination.postId;
    case "conversation":
      return destination.conversationId;
    case "story":
      return destination.storyId ?? destination.ownerId;
  }
}

export function destinationsReferToSameContent(
  first: AppDestination | null,
  second: AppDestination | null,
) {
  return Boolean(first && second && first.kind === second.kind && primaryDestinationId(first) === primaryDestinationId(second));
}

export function createForegroundNotificationGate(options: ForegroundNotificationGateOptions = {}) {
  const seen = new Map<string, number>();
  const dedupeWindowMs = options.dedupeWindowMs ?? 60_000;
  const now = options.now ?? Date.now;

  function evaluate(
    notification: ForegroundNotificationIdentity,
    activeDestination: AppDestination | null,
  ): ForegroundPolicyResult {
    const currentTime = now();
    const dedupeKey = notification.notificationId ?? notification.url;
    if (dedupeKey) {
      const previousTime = seen.get(dedupeKey);
      if (previousTime !== undefined && currentTime - previousTime <= dedupeWindowMs) {
        return { display: false, reason: "duplicate" };
      }
      seen.set(dedupeKey, currentTime);
    }

    if (destinationsReferToSameContent(notification.destination, activeDestination)) {
      return { display: false, reason: "active-destination" };
    }

    if (options.shouldSuppress?.(notification, activeDestination)) {
      return { display: false, reason: "custom" };
    }

    return { display: true, reason: "display" };
  }

  return { evaluate };
}
