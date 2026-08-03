import type { StoryItem } from "./story.types";

const STORY_SEEN_STORAGE_PREFIX = "social-media-story-seen";

function storageKey(viewerId: string) {
  return `${STORY_SEEN_STORAGE_PREFIX}:${viewerId}`;
}

export function readSeenStoryIds(viewerId: string): Set<string> {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey(viewerId)) ?? "[]");
    return new Set(Array.isArray(stored) ? stored.filter((value): value is string => typeof value === "string") : []);
  } catch {
    return new Set();
  }
}

export function persistSeenStoryIds(viewerId: string, ids: Set<string>) {
  try {
    localStorage.setItem(storageKey(viewerId), JSON.stringify(Array.from(ids).slice(-500)));
  } catch {
    // Story viewing still works when storage is unavailable.
  }
}

function isSeen(story: StoryItem, seenIds: Set<string>, recentlySeenIds: Set<string>) {
  if (recentlySeenIds.has(story.id)) return true;
  if (story.viewerSeen !== undefined) return story.viewerSeen;
  return story.state === "seen" || story.status === "SEEN" || seenIds.has(story.id);
}

function sortOwnerStories(items: StoryItem[]) {
  const publications = new Map<string, StoryItem[]>();
  items.forEach((story) => {
    const key = story.publicationId || story.id;
    const publication = publications.get(key);
    if (publication) publication.push(story);
    else publications.set(key, [story]);
  });
  return [...publications.values()]
    .map((publication) => ({
      createdAt: Math.min(...publication.map((story) => new Date(story.createdAt ?? 0).getTime())),
      items: publication.sort((left, right) => (left.publicationOrder ?? 1) - (right.publicationOrder ?? 1)),
    }))
    .sort((left, right) => left.createdAt - right.createdAt)
    .flatMap((publication) => publication.items);
}

export function orderStoryQueue(items: StoryItem[], viewerId: string, seenIds: Set<string>, recentlySeenIds: Set<string> = new Set()): StoryItem[] {
  const owners = new Map<string, { firstPosition: number; items: StoryItem[] }>();
  items.forEach((story, position) => {
    const group = owners.get(story.userId);
    if (group) group.items.push(story);
    else owners.set(story.userId, { firstPosition: position, items: [story] });
  });

  return Array.from(owners.entries())
    .map(([ownerId, group]) => {
      const sorted = sortOwnerStories(group.items);
      const seenCount = sorted.filter((story) => isSeen(story, seenIds, recentlySeenIds)).length;
      return {
        ownerId,
        firstPosition: group.firstPosition,
        seenCount,
        fullySeen: seenCount === sorted.length,
        items: sorted.map((story) => ({
          ...story,
          totalItems: sorted.length,
          seenItems: seenCount,
          state: story.state === "muted"
            ? "muted" as const
            : isSeen(story, seenIds, recentlySeenIds)
              ? "seen" as const
              : "unseen" as const,
        })),
      };
    })
    .sort((left, right) => {
      const leftOwn = left.ownerId === viewerId;
      const rightOwn = right.ownerId === viewerId;
      if (leftOwn !== rightOwn) return leftOwn ? -1 : 1;
      if (left.fullySeen !== right.fullySeen) return left.fullySeen ? 1 : -1;
      return left.firstPosition - right.firstPosition;
    })
    .flatMap((group) => group.items);
}

export function storyOwnerEntries(queue: StoryItem[]) {
  const owners = new Map<string, StoryItem[]>();
  queue.forEach((story) => {
    const group = owners.get(story.userId);
    if (group) group.push(story);
    else owners.set(story.userId, [story]);
  });
  return Array.from(owners.values()).map((items) => {
    const firstUnseen = items.find((story) => story.state === "unseen");
    const representative = firstUnseen ?? items[items.length - 1];
    const seenCount = items.filter((story) => story.state === "seen").length;
    return {
      ...representative,
      totalItems: items.length,
      seenItems: seenCount,
      state: representative.state === "muted"
        ? "muted" as const
        : seenCount >= items.length
          ? "seen" as const
          : "unseen" as const,
    };
  });
}

export function storyStartIndex(queue: StoryItem[], ownerId: string) {
  const firstUnseen = queue.findIndex((story) => story.userId === ownerId && story.state === "unseen");
  if (firstUnseen >= 0) return firstUnseen;
  return Math.max(0, queue.findIndex((story) => story.userId === ownerId));
}
