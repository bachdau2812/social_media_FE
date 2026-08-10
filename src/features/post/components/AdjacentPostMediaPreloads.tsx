import type { PostMedia } from "../model/post.types";
import { adjacentPostMedia } from "../model/adjacentPostMedia";

export function AdjacentPostMediaPreloads({ media, activeIndex }: { media: PostMedia[]; activeIndex: number }) {
  return (
    <div className="post-adjacent-preloads" aria-hidden="true">
      {adjacentPostMedia(media, activeIndex).map((item) => item.type === "VIDEO"
        ? <video key={item.id} src={item.url} preload="auto" muted playsInline />
        : <img key={item.id} src={item.url} alt="" />)}
    </div>
  );
}
