import type { RefCallback } from "react";
import type { StoryMediaState } from "../hooks/useStoryPreloader";
import type { StoryItem } from "../model/story.types";
import { StoryMedia } from "./StoryMedia";

export function StorySlide({ story, state = "loading", current, muted, videoRef, onStateChange, onRetry }: { story?: StoryItem; state?: StoryMediaState; current: boolean; muted: boolean; videoRef?: RefCallback<HTMLVideoElement>; onStateChange: (storyId: string, state: StoryMediaState) => void; onRetry: (storyId: string) => void }) {
  return <article className="story-slide" aria-hidden={!current}>{story
    ? <StoryMedia story={story} state={state} current={current} muted={muted} videoRef={videoRef} onStateChange={(next) => onStateChange(story.id, next)} onRetry={() => onRetry(story.id)} />
    : <div className="story-slide-boundary" />}</article>;
}
