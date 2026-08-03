export const POST_MEDIA_RATIOS = ["1:1", "4:5", "3:4", "9:16", "4:3", "3:2", "16:9"] as const;

export type PostMediaRatio = typeof POST_MEDIA_RATIOS[number];

export const DEFAULT_POST_MEDIA_RATIO: PostMediaRatio = "4:5";

export function normalizePostMediaRatio(value?: string | null): PostMediaRatio {
  return POST_MEDIA_RATIOS.includes(value as PostMediaRatio)
    ? value as PostMediaRatio
    : DEFAULT_POST_MEDIA_RATIO;
}

/** Stored ratios use the standard width:height order expected by CSS. */
export function postMediaRatioValue(value?: string | null): string {
  const [width, height] = normalizePostMediaRatio(value).split(":").map(Number);
  return `${width} / ${height}`;
}
