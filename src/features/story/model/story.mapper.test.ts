import { describe, expect, it } from "vitest";
import { archivedStoryToItem, storyTrayToItem } from "./story.mapper";
import type { StoryArchiveDto, StoryTrayDto } from "./story.dto";

const archiveStory: StoryArchiveDto = {
  id: "story-1",
  userId: "user-1",
  mediaUrl: "https://cdn/story.jpg",
  mediaType: "IMAGE",
  musicId: null,
  musicUrl: null,
  musicStart: null,
  musicEnd: null,
  publicationId: null,
  publicationOrder: null,
  publicationItemCount: null,
  status: "AVAILABLE",
  createdAt: null,
  expiredAt: null,
  viewerSeen: false,
};

const trayStory: StoryTrayDto = {
  ...archiveStory,
  username: "bach",
  fullName: "Đậu Đức Bách",
  avatarUrl: "https://cdn/avatar.jpg",
  musicName: null,
  durationSeconds: 5,
};

describe("Story endpoint mappers", () => {
  it("maps the Home tray identity returned by the tray contract", () => {
    const item = storyTrayToItem(trayStory);

    expect(item).toMatchObject({ username: "bach", name: "Đậu Đức Bách", avatarUrl: "https://cdn/avatar.jpg" });
  });

  it("keeps archive owner and reply capability unavailable until context supplies them", () => {
    const item = archivedStoryToItem(archiveStory);

    expect(item.username).toBe("");
    expect(item.name).toBe("Người dùng");
    expect(item.createdAt).toBe("");
    expect(item.replyEnabled).toBeUndefined();
    expect(item.username).not.toContain("user-1");
  });

  it("preserves the backend expiry timestamp for Home tray filtering", () => {
    const item = storyTrayToItem({
      ...trayStory,
      expiredAt: "2026-07-30T10:00:00Z",
    });

    expect(item.expiredAt).toBe("2026-07-30T10:00:00Z");
  });

  it("maps the authenticated viewer reaction without inventing a public count", () => {
    const item = storyTrayToItem({
      ...trayStory,
      viewerReaction: "LIKE",
    });

    expect(item.viewerReaction).toBe("LIKE");
    expect(item).not.toHaveProperty("likeCount");
  });

  it("hydrates archive identity only from explicit owner context", () => {
    const item = archivedStoryToItem(archiveStory, {
      username: "bach",
      fullName: "Đậu Đức Bách",
      avatarUrl: "https://cdn/avatar.jpg",
    });

    expect(item).toMatchObject({ username: "bach", name: "Đậu Đức Bách", avatarUrl: "https://cdn/avatar.jpg" });
  });
});
