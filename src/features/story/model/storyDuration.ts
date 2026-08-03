import type { StoryItem } from "./story.types";

function isVideoStory(story: StoryItem) {
  return story.mediaType === "VIDEO"
    || Boolean(story.mediaUrl?.match(/\.(mp4|webm|mov|m4v)(\?|$)/i));
}

export function storyDurationSeconds(
  story: StoryItem,
  videoDuration?: number,
): number | null {
  if (isVideoStory(story)) {
    return videoDuration && Number.isFinite(videoDuration) && videoDuration > 0
      ? videoDuration
      : null;
  }

  const segmentDuration = (story.musicEnd ?? 0) - (story.musicStart ?? 0);
  if (story.musicUrl && segmentDuration > 0) return segmentDuration;
  return story.durationSeconds && story.durationSeconds > 0
    ? story.durationSeconds
    : 5;
}
