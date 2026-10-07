import { AudioLines } from "lucide-react";
import { Avatar } from "../../../shared/components";
import { formatRelativeTime } from "../../../shared/utils/format";
import type { StoryItem } from "../model/story.types";

export function StoryHeader({ story, onOpenProfile }: { story: StoryItem; onOpenProfile: (userId: string) => Promise<void> }) {
  return <button className="author-button" onClick={() => void onOpenProfile(story.userId)}>
    <Avatar className="story-header-avatar" src={story.avatarUrl} name={story.username || story.name} alt={story.username} />
    <span className="story-header-details">
      <span className="story-header-identity">
        <span className="story-header-nickname" title={story.username}>{story.username}</span>
        <small className="story-header-time">{formatRelativeTime(story.createdAt ?? new Date().toISOString())}{story.collectionId ? " · Featured" : ""}</small>
      </span>
      {story.musicName && <small className="story-music-name" title={story.musicName}><AudioLines size={12} aria-hidden="true" /><span>{story.musicName}</span></small>}
    </span>
  </button>;
}
