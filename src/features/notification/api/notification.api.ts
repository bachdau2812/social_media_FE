import { apiGet, apiSend } from "../../../shared/api";
import type { NotificationDto, NotificationFilter, Page } from "../model/notification.types";

export const notificationApi = {
  list(userId: string, filter: NotificationFilter, page = 0, size = 50, signal?: AbortSignal) {
    return apiGet<Page<NotificationDto>>(`/notifications?userId=${encodeURIComponent(userId)}&filter=${filter}&page=${page}&size=${size}`, { signal });
  },
  markRead(notificationId: string) {
    return apiSend<void>(`/notifications/${encodeURIComponent(notificationId)}/read`, "POST");
  },
  markAllRead(userId: string) {
    return apiSend<void>(`/notifications/read-all?userId=${encodeURIComponent(userId)}`, "POST");
  },
  follow(followerId: string, followingId: string) {
    return apiSend<void>("/user-followers/follow", "POST", { followerId, followingId });
  },
};
