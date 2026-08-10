import { describe, expect, it } from "vitest";
import type { PostMedia } from "./post.types";
import { adjacentPostMedia } from "./adjacentPostMedia";

const items: PostMedia[] = ["item-1", "item-2", "item-3"].map((id, index) => ({
  id,
  type: "VIDEO",
  url: `https://cdn.example.test/${id}.mp4`,
  aspectRatio: 9 / 16,
  alt: id,
  orderNumber: index + 1,
}));

describe("adjacentPostMedia", () => {
  it("returns only valid previous and next media in source order", () => {
    expect(adjacentPostMedia(items, 0).map((item) => item.id)).toEqual(["item-2"]);
    expect(adjacentPostMedia(items, 1).map((item) => item.id)).toEqual(["item-1", "item-3"]);
    expect(adjacentPostMedia(items, 2).map((item) => item.id)).toEqual(["item-2"]);
  });
});
