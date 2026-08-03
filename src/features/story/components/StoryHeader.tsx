import { Volume2 } from "lucide-react";
import { Avatar } from "../../../shared/components";
import { formatRelativeTime } from "../../../shared/utils/format";
import type { StoryItem } from "../model/story.types";

export function StoryHeader({ story, onOpenProfile }: { story: StoryItem; onOpenProfile: (userId: string) => Promise<void> }) {
  return <button className="author-button" onClick={() => void onOpenProfile(story.userId)}><Avatar src={story.avatarUrl} name={story.name || story.username} alt={story.username} /><span><strong>{story.name}</strong><small>@{story.username} · {formatRelativeTime(story.createdAt ?? new Date().toISOString())}{story.collectionId ? " · Featured" : ""}</small>{story.musicName && <small className="story-music-name"><Volume2 size={13} /> {story.musicName}</small>}</span></button>;
}
