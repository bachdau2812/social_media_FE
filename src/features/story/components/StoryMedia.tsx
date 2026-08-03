import { useCallback, useEffect, useRef, type RefCallback } from "react";
import type { StoryItem } from "../model/story.types";
import type { StoryMediaState } from "../hooks/useStoryPreloader";

export function isStoryVideo(story: StoryItem) {
  return story.mediaType === "VIDEO" || Boolean(story.mediaUrl?.match(/\.(mp4|webm|mov|m4v)(\?|$)/i));
}

export function StoryMedia({ story, state, current, muted, videoRef, onStateChange, onRetry }: { story: StoryItem; state: StoryMediaState; current: boolean; muted: boolean; videoRef?: RefCallback<HTMLVideoElement>; onStateChange: (state: StoryMediaState) => void; onRetry: () => void }) {
  const ownVideoRef = useRef<HTMLVideoElement | null>(null);
  const assignVideo = useCallback((element: HTMLVideoElement | null) => {
    ownVideoRef.current = element;
    if (!current && element) element.pause();
    videoRef?.(element);
  }, [current, videoRef]);
  useEffect(() => {
    const videoElement = ownVideoRef.current;
    if (current || !videoElement) return;
    videoElement.pause();
    videoElement.currentTime = 0;
  }, [current]);
  const deleted = story.status === "DELETED" || story.status === "REMOVED";
  const expired = story.status === "EXPIRED";
  const video = isStoryVideo(story);
  if (deleted || expired || state === "unavailable") return <StoryMediaState title="Tin không hiển thị" detail="Tin này đã hết hạn hoặc không còn khả dụng." />;
  if (state === "network") return <StoryMediaState title="Failed media loading" detail="The media failed to load. Retry or continue to the next story." action="Retry" onRetry={onRetry} />;
  if (!story.mediaUrl) return <div className="story-text-only"><strong>{story.name}</strong><p>Shared a quiet text update.</p></div>;
  return <>
    <div className="story-media-fill" aria-hidden="true">{video ? <video src={story.mediaUrl} muted playsInline preload="metadata" /> : <img src={story.mediaUrl} alt="" />}</div>
    {video
      ? <video ref={assignVideo} className="story-media" src={story.mediaUrl} playsInline muted={!current || muted} preload={current ? "auto" : "metadata"} onWaiting={() => current && onStateChange("buffering")} onCanPlay={() => onStateChange("ready")} onLoadedMetadata={() => onStateChange("ready")} onError={() => onStateChange("network")} />
      : <img className="story-media" src={story.mediaUrl} alt={`Story by ${story.username}`} onLoad={() => onStateChange("ready")} onError={() => onStateChange("network")} />}
    {(state === "loading" || state === "buffering") && <div className="story-loading compact" aria-live="polite"><span /><strong>{state === "buffering" ? "Buffering" : "Loading"}</strong></div>}
  </>;
}

function StoryMediaState({ title, detail, action, onRetry }: { title: string; detail: string; action?: string; onRetry?: () => void }) {
  return <div className="story-unavailable"><strong>{title}</strong><span>{detail}</span>{action && <button onClick={onRetry}>{action}</button>}</div>;
}
