import type { NotificationDto, NotificationViewItem } from "./notification.types";

export function normalizedNotificationAction(action?: string | null) {
  return (action || "SYSTEM").toUpperCase();
}

export function notificationCategory(action?: string | null): NotificationViewItem["category"] {
  const value = normalizedNotificationAction(action);
  if (value.includes("FOLLOW") || value.includes("FRIEND")) return "CONNECTIONS";
  if (["SYSTEM", "REGISTRATION", "LOGIN", "LOGOUT", "FORGOT_PASSWORD", "RESET_PASSWORD", "WELCOME_USER", "SECURITY"].includes(value)) return "SYSTEM";
  return "INTERACTIONS";
}

function fallbackMessage(action?: string | null, entityType?: string | null, available = true) {
  const value = normalizedNotificationAction(action);
  if (!available) return "Nội dung nguồn không còn tồn tại.";
  if (value === "CHAT_MEMBER_REQUEST") return "Nhóm của bạn có yêu cầu tham gia mới.";
  if (value === "CHAT_GROUP_MEMBER_ADDED" || value === "CHAT_MEMBER_ADDED") return "đã tham gia nhóm.";
  if (value === "SEND_MESSAGE" || value === "NEW_MESSAGE" || value === "MESSAGE") return "đã gửi cho bạn một tin nhắn mới.";
  if (value.includes("LIKE_COMMENT")) return "đã thích bình luận của bạn.";
  if (value.includes("LIKE")) return "đã thích bài viết của bạn.";
  if (value.includes("REPLY") || value.includes("COMMENT")) return "đã bình luận về bài viết của bạn.";
  if (value.includes("FOLLOW")) return "đã theo dõi bạn.";
  if (value === "STORY_DIRECT" || value === "FRIEND_STORY") return "đã đăng Story mới.";
  if (value === "STORY_ACTIVITY" || value === "UP_STORY") return "đã đăng một Story mới.";
  if (value.includes("MENTION")) return "đã nhắc đến bạn.";
  if (value.includes("TAG")) return "đã gắn thẻ bạn.";
  if (value.includes("POST_SHARED")) return "đã chia sẻ một bài viết với bạn.";
  if (notificationCategory(value) === "SYSTEM") return "đã gửi một thông báo tài khoản hoặc bảo mật.";
  return `đã gửi một thông báo ${String(entityType || "mới").toLowerCase()}.`;
}

function actionLabel(action?: string | null, entityType?: string | null, available = true) {
  if (!available) return undefined;
  const value = normalizedNotificationAction(action);
  if (value.includes("FOLLOW") && !value.includes("FOLLOW_BACK")) return "Theo dõi lại";
  if (value === "CHAT_MEMBER_REQUEST") return "Xem yêu cầu";
  if (value.includes("COMMENT") || value.includes("REPLY")) return "Xem bình luận";
  if (value.includes("LIKE") || value.includes("STORY") || value.includes("MESSAGE") || String(entityType || "").toUpperCase() === "POST") return "Mở";
  return undefined;
}

export function notificationToViewItem(item: NotificationDto): NotificationViewItem {
  const actionType = item.actionType || "SYSTEM";
  const available = item.entityAvailable !== false;
  const actor = item.actorDisplayName || item.actorUsername || (notificationCategory(actionType) === "SYSTEM" ? "Hệ thống" : "Người dùng");
  return {
    id: item.id,
    status: item.status === "READ" ? "READ" : "UNREAD",
    actor,
    actorId: item.actorId,
    actorAvatarUrl: item.actorAvatarUrl || undefined,
    actionType,
    entityId: item.entityId,
    entityType: item.entityType || "SYSTEM",
    contentThumbnailUrl: item.contentThumbnailUrl,
    entityAvailable: available,
    createdAt: item.createdAt,
    message: fallbackMessage(actionType, item.entityType, available),
    actionLabel: actionLabel(actionType, item.entityType, available),
    category: notificationCategory(actionType),
    content: item.content || undefined,
    metadata: { ...(item.metadata ?? {}), ...(item.deepLink ? { deepLink: item.deepLink } : {}) },
    deepLink: item.deepLink || undefined,
  };
}
