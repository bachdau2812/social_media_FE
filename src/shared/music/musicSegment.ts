export type MusicSegment = {
  start: number;
  end: number;
};

export type MusicHandle = "start" | "end";

export const MIN_SEGMENT_SECONDS = 1;
export const MAX_SEGMENT_SECONDS = 60;
export const DEFAULT_SEGMENT_SECONDS = 30;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function wholeSeconds(value: number, fallback: number) {
  return Number.isFinite(value) ? Math.round(value) : fallback;
}

function safeDuration(duration: number) {
  return Math.max(MIN_SEGMENT_SECONDS, wholeSeconds(duration, DEFAULT_SEGMENT_SECONDS));
}

export function normalizeMusicSegment(
  value: MusicSegment,
  duration: number,
): MusicSegment {
  const limit = safeDuration(duration);
  const start = clamp(wholeSeconds(value.start, 0), 0, limit - MIN_SEGMENT_SECONDS);
  const requestedEnd = clamp(
    wholeSeconds(value.end, start + DEFAULT_SEGMENT_SECONDS),
    start + MIN_SEGMENT_SECONDS,
    limit,
  );
  const end = Math.min(requestedEnd, start + MAX_SEGMENT_SECONDS);
  return { start, end };
}

export function moveMusicHandle(
  value: MusicSegment,
  handle: MusicHandle,
  nextValue: number,
  duration: number,
): MusicSegment {
  const segment = normalizeMusicSegment(value, duration);
  const limit = safeDuration(duration);
  const next = wholeSeconds(nextValue, handle === "start" ? segment.start : segment.end);

  if (handle === "start") {
    return {
      start: clamp(
        next,
        Math.max(0, segment.end - MAX_SEGMENT_SECONDS),
        segment.end - MIN_SEGMENT_SECONDS,
      ),
      end: segment.end,
    };
  }

  return {
    start: segment.start,
    end: clamp(
      next,
      segment.start + MIN_SEGMENT_SECONDS,
      Math.min(limit, segment.start + MAX_SEGMENT_SECONDS),
    ),
  };
}

export function moveMusicWindow(
  value: MusicSegment,
  delta: number,
  duration: number,
): MusicSegment {
  const segment = normalizeMusicSegment(value, duration);
  const limit = safeDuration(duration);
  const length = segment.end - segment.start;
  const start = clamp(
    segment.start + wholeSeconds(delta, 0),
    0,
    limit - length,
  );
  return { start, end: start + length };
}
