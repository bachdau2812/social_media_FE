const MINIMUM_PLAYBACK_RATIO = 0.55;
export const FEED_MUSIC_SUSPEND_EVENT = "feed-music-suspend";

const visibilityByPost = new Map<string, number>();
const listeners = new Set<(postId: string | null) => void>();
let activeOwner: string | null = null;
let suspended = false;

function selectOwner(): string | null {
  if (suspended) return null;
  let selected: string | null = null;
  let selectedRatio = MINIMUM_PLAYBACK_RATIO;
  visibilityByPost.forEach((ratio, postId) => {
    if (ratio < MINIMUM_PLAYBACK_RATIO) return;
    if (selected === null || ratio > selectedRatio || (ratio === selectedRatio && postId === activeOwner)) {
      selected = postId;
      selectedRatio = ratio;
    }
  });
  return selected;
}

function recomputeOwner() {
  const nextOwner = selectOwner();
  if (nextOwner === activeOwner) return;
  activeOwner = nextOwner;
  listeners.forEach((listener) => listener(activeOwner));
}

export function reportFeedMusicVisibility(postId: string, ratio: number): void {
  if (!postId) return;
  if (!Number.isFinite(ratio) || ratio <= 0) visibilityByPost.delete(postId);
  else visibilityByPost.set(postId, Math.min(1, ratio));
  recomputeOwner();
}

export function subscribeFeedMusicOwner(listener: (postId: string | null) => void): () => void {
  listeners.add(listener);
  listener(activeOwner);
  return () => listeners.delete(listener);
}

export function setFeedMusicSuspended(nextSuspended: boolean): void {
  if (suspended === nextSuspended) return;
  suspended = nextSuspended;
  recomputeOwner();
  window.dispatchEvent(new CustomEvent<boolean>(FEED_MUSIC_SUSPEND_EVENT, { detail: suspended }));
}
