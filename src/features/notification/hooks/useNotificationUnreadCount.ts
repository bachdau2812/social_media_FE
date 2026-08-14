import { useCallback, useEffect, useState } from "react";
import { notificationApi } from "../api/notification.api";

const NOTIFICATION_UNREAD_COUNT_EVENT = "notification-unread-count";

type NotificationUnreadCountDetail = number | undefined;

export function refreshNotificationUnreadCount() {
  window.dispatchEvent(new CustomEvent<NotificationUnreadCountDetail>(NOTIFICATION_UNREAD_COUNT_EVENT));
}

export function setNotificationUnreadCount(count: number) {
  window.dispatchEvent(new CustomEvent<number>(NOTIFICATION_UNREAD_COUNT_EVENT, {
    detail: Math.max(0, count),
  }));
}

export function useNotificationUnreadCount(userId?: string | null) {
  const [count, setCount] = useState(0);

  const load = useCallback(async () => {
    if (!userId) {
      setCount(0);
      return;
    }
    try {
      const next = await notificationApi.unreadCount(userId);
      setCount(Number.isFinite(next) ? Math.max(0, next) : 0);
    } catch {
      // Keep the last known count when a background refresh fails.
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setCount(0);
      return;
    }
    let disposed = false;
    void notificationApi.unreadCount(userId)
      .then((next) => {
        if (!disposed) setCount(Number.isFinite(next) ? Math.max(0, next) : 0);
      })
      .catch(() => undefined);

    const synchronize = (event: Event) => {
      const detail = (event as CustomEvent<NotificationUnreadCountDetail>).detail;
      if (typeof detail === "number" && Number.isFinite(detail)) {
        setCount(Math.max(0, detail));
        return;
      }
      void load();
    };
    window.addEventListener(NOTIFICATION_UNREAD_COUNT_EVENT, synchronize);
    return () => {
      disposed = true;
      window.removeEventListener(NOTIFICATION_UNREAD_COUNT_EVENT, synchronize);
    };
  }, [load, userId]);

  return count;
}
