import { useEffect, useState } from "react";
import { notificationApi } from "../api/notification.api";
import { notificationRealtime } from "../services/notificationRealtime";

const NOTIFICATION_UNREAD_COUNT_EVENT = "notification-unread-count";

type NotificationUnreadCountDetail = number | undefined;

function normalizeCount(count: number) {
  return Number.isFinite(count) ? Math.max(0, count) : 0;
}

export function refreshNotificationUnreadCount() {
  window.dispatchEvent(new CustomEvent<NotificationUnreadCountDetail>(NOTIFICATION_UNREAD_COUNT_EVENT));
}

export function setNotificationUnreadCount(count: number) {
  window.dispatchEvent(new CustomEvent<number>(NOTIFICATION_UNREAD_COUNT_EVENT, {
    detail: normalizeCount(count),
  }));
}

export function useNotificationUnreadCount(userId?: string | null) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) {
      setCount(0);
      return;
    }

    let disposed = false;
    let running = false;
    let queued = false;
    let localMutationVersion = 0;

    const refresh = async () => {
      if (running) {
        queued = true;
        return;
      }
      running = true;
      do {
        queued = false;
        const requestMutationVersion = localMutationVersion;
        try {
          const next = await notificationApi.unreadCount(userId);
          if (!disposed && requestMutationVersion === localMutationVersion) {
            setCount(normalizeCount(next));
          }
        } catch {
          // Preserve the last confirmed count until a later recovery signal.
        }
      } while (!disposed && queued);
      running = false;
    };

    void refresh();
    const unsubscribeRealtime = notificationRealtime.subscribe(userId, () => void refresh());
    const synchronize = (event: Event) => {
      const detail = (event as CustomEvent<NotificationUnreadCountDetail>).detail;
      if (typeof detail === "number" && Number.isFinite(detail)) {
        localMutationVersion += 1;
        setCount(normalizeCount(detail));
        return;
      }
      void refresh();
    };
    const recoverOnline = () => void refresh();
    const recoverVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };

    window.addEventListener(NOTIFICATION_UNREAD_COUNT_EVENT, synchronize);
    window.addEventListener("online", recoverOnline);
    document.addEventListener("visibilitychange", recoverVisible);
    return () => {
      disposed = true;
      unsubscribeRealtime();
      window.removeEventListener(NOTIFICATION_UNREAD_COUNT_EVENT, synchronize);
      window.removeEventListener("online", recoverOnline);
      document.removeEventListener("visibilitychange", recoverVisible);
    };
  }, [userId]);

  return count;
}
