import type { PostMedia } from "./post.types";

export function adjacentPostMedia(media: PostMedia[], activeIndex: number): PostMedia[] {
  return [activeIndex - 1, activeIndex + 1].flatMap((index) => {
    const item = media[index];
    return item ? [item] : [];
  });
}
