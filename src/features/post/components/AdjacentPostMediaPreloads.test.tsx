import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PostMedia } from "../model/post.types";
import { AdjacentPostMediaPreloads } from "./AdjacentPostMediaPreloads";

const media: PostMedia[] = [
  { id: "video-1", type: "VIDEO", url: "/one.mp4", aspectRatio: 1, alt: "one" },
  { id: "image-2", type: "IMAGE", url: "/two.jpg", aspectRatio: 1, alt: "two" },
  { id: "video-3", type: "VIDEO", url: "/three.mp4", aspectRatio: 1, alt: "three" },
  { id: "video-4", type: "VIDEO", url: "/four.mp4", aspectRatio: 1, alt: "four" },
];

describe("AdjacentPostMediaPreloads", () => {
  it('does not request adjacent media when the feed frame is outside its preload neighborhood', () => {
    const { container } = render(<AdjacentPostMediaPreloads media={media} activeIndex={1} enabled={false} />);
    expect(container.querySelectorAll('video,img')).toHaveLength(0);
  });
  it("warms only the immediately adjacent media without the active item", () => {
    const { container } = render(<AdjacentPostMediaPreloads media={media} activeIndex={1} />);
    const sources = [...container.querySelectorAll("video, img")].map((item) => item.getAttribute("src"));

    expect(sources).toEqual(["/one.mp4", "/three.mp4"]);
    expect(container.querySelectorAll('video[preload="auto"]')).toHaveLength(2);
    expect(sources).not.toContain("/two.jpg");
    expect(sources).not.toContain("/four.mp4");
  });
});
