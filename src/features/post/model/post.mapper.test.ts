import { describe, expect, it } from "vitest";
import { postDetailsToPost } from "./post.mapper";
import type { PostDetailsDto } from "./post.dto";

const details: PostDetailsDto = {
  postId: "post-2",
  userId: "author-2",
  authorUsername: null,
  authorFullName: null,
  content: null,
  hashtag: null,
  hashtags: [],
  mediaRatio: "9:16",
  validateStatus: "APPROVED",
  musicId: null,
  musicStart: null,
  musicEnd: null,
  music: null,
  items: [],
  createdAt: null,
  updatedAt: null,
};

describe("postDetailsToPost", () => {
  it("keeps unavailable author and date fields explicit instead of fabricating identity or current time", () => {
    const post = postDetailsToPost(details);

    expect(post.author).toMatchObject({ id: "author-2", username: "", displayName: "Người dùng" });
    expect(post.createdAt).toBe("");
  });
});
