import { describe, expect, it } from "vitest";
import type { StoryItem } from "./story.types";
import { orderStoryQueue, storyStartIndex } from "./storyQueue";

function story(id: string, userId: string, viewerSeen?: boolean): StoryItem {
  return {
    id,
    userId,
    name: userId,
    username: userId,
    avatarUrl: "",
    createdAt: `2026-07-29T00:00:0${id.slice(-1)}Z`,
    totalItems: 1,
    seenItems: 0,
    state: "unseen",
    viewerSeen,
  };
}

describe("server-backed Story queue", () => {
  it("uses viewerSeen as the source of truth and opens the first unseen item", () => {
    const queue = orderStoryQueue([
      story("story-1", "owner-1", true),
      story("story-2", "owner-1", false),
      story("story-3", "owner-1", false),
    ], "viewer-1", new Set());

    expect(queue.map((item) => item.state)).toEqual(["seen", "unseen", "unseen"]);
    expect(storyStartIndex(queue, "owner-1")).toBe(1);
  });

  it("does not let local storage override an explicit unseen backend value", () => {
    const queue = orderStoryQueue([story("story-1", "owner-1", false)], "viewer-1", new Set(["story-1"]));

    expect(queue[0].state).toBe("unseen");
    expect(storyStartIndex(queue, "owner-1")).toBe(0);
  });

  it("optimistically marks a view recorded in the current session", () => {
    const queue = orderStoryQueue(
      [story("story-1", "owner-1", false)],
      "viewer-1",
      new Set(["story-1"]),
      new Set(["story-1"]),
    );

    expect(queue[0].state).toBe("seen");
  });

  it("uses local storage only when an older response omits viewerSeen", () => {
    const queue = orderStoryQueue([story("story-1", "owner-1")], "viewer-1", new Set(["story-1"]));

    expect(queue[0].state).toBe("seen");
  });

  it("keeps publication item order when a retried first item has a later timestamp", () => {
    const first = { ...story("story-1", "owner-1", false), publicationId: "publication-1", publicationOrder: 1, createdAt: "2026-07-29T00:00:09Z" };
    const second = { ...story("story-2", "owner-1", false), publicationId: "publication-1", publicationOrder: 2, createdAt: "2026-07-29T00:00:02Z" };
    const third = { ...story("story-3", "owner-1", false), publicationId: "publication-1", publicationOrder: 3, createdAt: "2026-07-29T00:00:03Z" };

    expect(orderStoryQueue([second, third, first], "viewer-1", new Set()).map((item) => item.id))
      .toEqual(["story-1", "story-2", "story-3"]);
  });
});
