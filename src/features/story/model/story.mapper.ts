import type { StoryArchiveDto, StoryTrayDto } from "./story.dto";
import type { StoryItem } from "./story.types";

export type StoryOwnerContext = {
  username?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
};

type StoryMediaSource = StoryArchiveDto | StoryTrayDto;

function mediaTypeFor(story: StoryMediaSource): "IMAGE" | "VIDEO" {
  return (story.mediaType ?? story.mediaUrl ?? "").toUpperCase().match(/VIDEO|MP4|WEBM|MOV/) ? "VIDEO" : "IMAGE";
}

function mapStory(story: StoryMediaSource, owner: StoryOwnerContext, tray?: StoryTrayDto): StoryItem {
  const username = owner.username?.trim() || "";
  const status = story.status || undefined;
  return {
    id: story.id,
    userId: story.userId,
    name: owner.fullName?.trim() || username || "Người dùng",
    username,
    avatarUrl: owner.avatarUrl || "",
    mediaUrl: story.mediaUrl || "",
    mediaType: mediaTypeFor(story),
    musicId: story.musicId || undefined,
    musicUrl: story.musicUrl || undefined,
    musicName: story.musicName || undefined,
    musicStart: story.musicStart ?? undefined,
    musicEnd: story.musicEnd ?? undefined,
    durationSeconds: story.durationSeconds ?? undefined,
    createdAt: story.createdAt || "",
    expiredAt: story.expiredAt || undefined,
    status,
    replyEnabled: undefined,
    viewerSeen: story.viewerSeen ?? undefined,
    viewerReaction: tray?.viewerReaction?.trim().toUpperCase() === "LIKE" ? "LIKE" : null,
    publicationId: story.publicationId || undefined,
    publicationOrder: story.publicationOrder ?? undefined,
    publicationItemCount: story.publicationItemCount ?? undefined,
    totalItems: 1,
    seenItems: 0,
    state: status === "MUTED"
      ? "muted"
      : story.viewerSeen === true || (story.viewerSeen == null && status === "SEEN")
        ? "seen"
        : "unseen",
  };
}

export function isActiveStory(story: StoryItem, now = Date.now()): boolean {
  if (story.status === "EXPIRED" || story.status === "DELETED" || story.status === "REMOVED") return false;
  if (!story.expiredAt) return true;
  const expiry = Date.parse(story.expiredAt);
  return !Number.isFinite(expiry) || expiry > now;
}

export function storyTrayToItem(story: StoryTrayDto): StoryItem {
  return mapStory(story, {
    username: story.username,
    fullName: story.fullName,
    avatarUrl: story.avatarUrl,
  }, story);
}

export function archivedStoryToItem(story: StoryArchiveDto, owner: StoryOwnerContext = {}): StoryItem {
  return mapStory(story, owner);
}
