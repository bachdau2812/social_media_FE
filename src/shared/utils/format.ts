export function formatCount(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    notation: value >= 10_000 ? "compact" : "standard",
  }).format(value);
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export function formatDate(value: string | number | Date, locale = "vi-VN"): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date);
}

export function formatRelativeTime(value: string | number | Date): string {
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return "";
  const elapsedMilliseconds = Math.max(0, Date.now() - timestamp);
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  if (elapsedSeconds < 60) return "Vừa xong";
  const minutes = Math.floor(elapsedSeconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (elapsedMilliseconds <= 7 * 24 * 60 * 60 * 1000) return `${days} ngày trước`;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(timestamp));
}

export function normalizeHashtags(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim().replace(/^#+/, "").toLowerCase()).filter(Boolean))];
}
