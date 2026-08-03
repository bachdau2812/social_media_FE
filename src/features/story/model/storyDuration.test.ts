import { describe, expect, it } from "vitest";
import type { StoryItem } from "./story.types";
import { storyDurationSeconds } from "./storyDuration";

const image: StoryItem = {
  id: "image",
  userId: "user-1",
  name: "User",
  username: "user",
  avatarUrl: "",
  mediaType: "IMAGE",
  mediaUrl: "/story.jpg",
  totalItems: 1,
  seenItems: 0,
  state: "unseen",
};

const video: StoryItem = {
  ...image,
  id: "video",
  mediaType: "VIDEO",
  mediaUrl: "/story.mp4",
};

describe("storyDurationSeconds", () => {
  it("uses the selected music segment for an image story", () => {
    expect(storyDurationSeconds({
      ...image,
      musicUrl: "/music.mp3",
      musicStart: 10,
      musicEnd: 55,
    })).toBe(45);
  });

  it("defaults an image story without music to five seconds", () => {
    expect(storyDurationSeconds(image)).toBe(5);
  });

  it("uses loaded video metadata duration", () => {
    expect(storyDurationSeconds(video, 12.5)).toBe(12.5);
  });
});
