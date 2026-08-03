import type { StoryItem } from "../model/story.types";

export function StoryProgress({ stories, current, displayStoryId, progress }: { stories: StoryItem[]; current: StoryItem; displayStoryId: string; progress: number }) {
  const ownerStories = stories.filter((story) => story.userId === current.userId);
  const active = Math.max(0, ownerStories.findIndex((story) => story.id === displayStoryId));
  const committedStoryDisplayed = displayStoryId === current.id;
  return <div className="story-segments" aria-label="Story progress">{ownerStories.map((story, index) => <span key={story.id} className={index < active ? "complete" : index === active ? "active" : ""}><i style={{ width: index === active ? `${committedStoryDisplayed ? progress : 0}%` : undefined }} /></span>)}</div>;
}
