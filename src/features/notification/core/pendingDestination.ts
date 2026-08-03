import { decodeNotificationDeepLink, encodeNotificationDeepLink } from "./deepLinkCodec";
import type { AppDestination } from "./types";

export const PENDING_NOTIFICATION_DESTINATION_KEY = "social-media:pending-notification-destination";
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1_000;

interface PendingDestinationRecord {
  version: 1;
  url: string;
  expiresAt: number;
}

interface PendingDestinationOptions {
  storage?: Storage;
  now?: () => number;
  ttlMs?: number;
}

function browserSessionStorage() {
  return typeof window !== "undefined" ? window.sessionStorage : undefined;
}

export function savePendingNotificationDestination(
  destination: AppDestination,
  options: PendingDestinationOptions = {},
) {
  const storage = options.storage ?? browserSessionStorage();
  if (!storage) return;
  const now = options.now?.() ?? Date.now();
  const record: PendingDestinationRecord = {
    version: 1,
    url: encodeNotificationDeepLink(destination),
    expiresAt: now + (options.ttlMs ?? DEFAULT_TTL_MS),
  };
  storage.setItem(PENDING_NOTIFICATION_DESTINATION_KEY, JSON.stringify(record));
}

export function loadPendingNotificationDestination(
  options: PendingDestinationOptions = {},
): AppDestination | null {
  const storage = options.storage ?? browserSessionStorage();
  if (!storage) return null;
  const serialized = storage.getItem(PENDING_NOTIFICATION_DESTINATION_KEY);
  if (!serialized) return null;

  try {
    const record = JSON.parse(serialized) as Partial<PendingDestinationRecord>;
    const now = options.now?.() ?? Date.now();
    if (record.version !== 1 || typeof record.url !== "string" || typeof record.expiresAt !== "number" || record.expiresAt < now) {
      storage.removeItem(PENDING_NOTIFICATION_DESTINATION_KEY);
      return null;
    }
    const destination = decodeNotificationDeepLink(record.url);
    if (!destination) storage.removeItem(PENDING_NOTIFICATION_DESTINATION_KEY);
    return destination;
  } catch {
    storage.removeItem(PENDING_NOTIFICATION_DESTINATION_KEY);
    return null;
  }
}

export function consumePendingNotificationDestination(
  options: PendingDestinationOptions = {},
) {
  const storage = options.storage ?? browserSessionStorage();
  const destination = loadPendingNotificationDestination({ ...options, storage });
  storage?.removeItem(PENDING_NOTIFICATION_DESTINATION_KEY);
  return destination;
}

export function clearPendingNotificationDestination(storage = browserSessionStorage()) {
  storage?.removeItem(PENDING_NOTIFICATION_DESTINATION_KEY);
}
