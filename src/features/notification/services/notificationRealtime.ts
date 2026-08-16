import { API_BASE_URL } from "../../../shared/api";

export const notificationRealtime = {
  subscribe(userId: string, listener: () => void) {
    if (!userId || typeof EventSource === "undefined") return () => undefined;
    const source = new EventSource(`${API_BASE_URL}/notifications/stream`, { withCredentials: true });
    source.addEventListener("notification_changed", listener);
    source.onerror = () => undefined;
    return () => source.close();
  },
};
