import { decodeNotificationDeepLink } from "./deepLinkCodec";
import type { AppDestination } from "./types";

export const NOTIFICATION_NAVIGATE_MESSAGE = "SOCIAL_NOTIFICATION_NAVIGATE" as const;

export interface NotificationNavigateMessage {
  type: typeof NOTIFICATION_NAVIGATE_MESSAGE;
  url: string;
  notificationId?: string;
}

export function createNotificationNavigateMessage(
  url: string,
  notificationId?: string,
): NotificationNavigateMessage {
  if (!decodeNotificationDeepLink(url)) {
    throw new Error("Notification navigation messages require a canonical deep link.");
  }
  return {
    type: NOTIFICATION_NAVIGATE_MESSAGE,
    url,
    ...(notificationId ? { notificationId } : {}),
  };
}

export function parseNotificationNavigateMessage(value: unknown): NotificationNavigateMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as Record<string, unknown>;
  if (message.type !== NOTIFICATION_NAVIGATE_MESSAGE || typeof message.url !== "string") return null;
  if (!decodeNotificationDeepLink(message.url)) return null;
  if (message.notificationId !== undefined && typeof message.notificationId !== "string") return null;
  return {
    type: NOTIFICATION_NAVIGATE_MESSAGE,
    url: message.url,
    ...(typeof message.notificationId === "string" ? { notificationId: message.notificationId } : {}),
  };
}

export function subscribeToNotificationNavigation(
  listener: (destination: AppDestination, message: NotificationNavigateMessage) => void,
) {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return () => undefined;

  const handleMessage = (event: MessageEvent) => {
    const message = parseNotificationNavigateMessage(event.data);
    if (!message) return;
    const destination = decodeNotificationDeepLink(message.url);
    if (destination) listener(destination, message);
  };

  navigator.serviceWorker.addEventListener("message", handleMessage);
  return () => navigator.serviceWorker.removeEventListener("message", handleMessage);
}
