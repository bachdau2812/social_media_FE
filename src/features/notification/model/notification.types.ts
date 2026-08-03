export type NotificationFilter = "ALL" | "INTERACTIONS" | "CONNECTIONS" | "SYSTEM";

export type NotificationDto = {
  id: string;
  userId: string;
  actorId?: string | null;
  actorUsername?: string | null;
  actorDisplayName?: string | null;
  actorAvatarUrl?: string | null;
  actionType?: string | null;
  entityId?: string | null;
  entityType?: string | null;
  contentThumbnailUrl?: string | null;
  entityAvailable: boolean;
  status: string;
  readAt?: string | null;
  createdAt: string;
  content?: string | null;
  metadata?: Record<string, string> | null;
  deepLink?: string | null;
};

export type NotificationViewItem = {
  id: string;
  status: "READ" | "UNREAD";
  actor: string;
  actorId?: string | null;
  actorAvatarUrl?: string;
  actionType: string;
  entityId?: string | null;
  entityType: string;
  contentThumbnailUrl?: string | null;
  entityAvailable: boolean;
  createdAt: string;
  message: string;
  actionLabel?: string;
  category: Exclude<NotificationFilter, "ALL">;
  content?: string;
  metadata?: Record<string, string>;
  deepLink?: string;
};

export type Page<T> = { content: T[]; pageNumber: number; totalElements: number; totalPages: number };
