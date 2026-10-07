import { describe, expect, it } from "vitest";
import { buildPostUpdateRequest, type EditablePostMedia } from "./postEditing";
import type { Post } from "../model/post.types";

const post: Post = {
  id: "post-1",
  author: { id: "user-1", username: "author", displayName: "Author", avatarUrl: "" },
  createdAt: "2026-01-01T00:00:00Z",
  layoutVariant: "STANDARD",
  mediaRatio: "1:1",
  caption: "before",
  hashtags: ["old"],
  music: { id: "track-1", displayName: "Track", playbackUrl: "track.mp3", segmentStart: 2, segmentEnd: 20 },
  media: [{
    id: "item-1",
    orderNumber: 1,
    type: "IMAGE",
    url: "https://cdn.example/image.jpg",
    aspectRatio: 1,
    alt: "image.jpg",
    caption: "before item",
    music: null,
  }],
  engagement: { likes: 0, comments: 0, reposts: 0, shares: 0, saves: 0 },
  viewerState: { liked: false, saved: false, reposted: false },
  comments: [],
};

describe("post editing request", () => {
  it("keeps unchanged item identity and sends edited content and ratio", () => {
    const media: EditablePostMedia[] = post.media.map((item, originalIndex) => ({ ...item, originalIndex }));

    expect(buildPostUpdateRequest({
      post,
      userId: "user-1",
      caption: "after",
      hashtags: "#new #tag",
      mediaRatio: "4:3",
      media,
    })).toEqual({
      postId: "post-1",
      userId: "user-1",
      content: "after",
      hashtag: ["new", "tag"],
      mediaRatio: "4:3",
      musicId: "track-1",
      musicStart: 2,
      musicEnd: 20,
      items: [{
        itemId: "item-1",
        orderNumber: 1,
        secureUrl: null,
        publicId: null,
        resourceType: null,
        caption: "before item",
        musicId: null,
        musicStart: null,
        musicEnd: null,
      }],
    });
  });
});
