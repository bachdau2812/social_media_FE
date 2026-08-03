import { decodeNotificationDeepLink } from "./deepLinkCodec";
import type { AppDestination } from "./types";

export interface FirebasePushPayloadLike {
  notification?: {
    title?: string;
    body?: string;
    icon?: string;
  };
  data?: Record<string, string>;
}

export interface ForegroundPushNotification {
  notificationId?: string;
  title: string;
  body: string;
  icon: string;
  url?: string;
  destination: AppDestination | null;
  data: Record<string, string>;
}

export function normalizeForegroundPushPayload(
  payload: FirebasePushPayloadLike,
): ForegroundPushNotification {
  const data = payload.data ?? {};
  const notificationId = data.notificationId?.trim() || data.id?.trim() || undefined;
  const url = data.url?.trim() || undefined;

  return {
    ...(notificationId ? { notificationId } : {}),
    title: data.title?.trim() || payload.notification?.title?.trim() || "Th\u00f4ng b\u00e1o m\u1edbi",
    body: data.body?.trim() || payload.notification?.body?.trim() || "B\u1ea1n c\u00f3 m\u1ed9t th\u00f4ng b\u00e1o m\u1edbi.",
    icon: data.icon?.trim() || payload.notification?.icon?.trim() || "/favicon.ico",
    ...(url ? { url } : {}),
    destination: url ? decodeNotificationDeepLink(url) : null,
    data,
  };
}
