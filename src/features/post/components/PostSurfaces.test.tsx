import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiGet, apiSend, uploadCloudinaryMedia } from "../../../shared/api";
import type { Post } from "../model/post.types";
import { reportFeedMusicVisibility } from "../model/feedMusicCoordinator";
import { CommentRow } from "./CommentRow";
import { PostDetail } from "./PostDetail";
import { PostCard } from "./PostCard";

const postMediaCss = readFileSync(
  resolve(process.cwd(), "src/features/post/styles/post-media.css"),
  "utf8",
);

vi.mock("../../../shared/api", () => ({
  apiGet: vi.fn(),
  apiSend: vi.fn(),
  uploadCloudinaryMedia: vi.fn(),
}));

const observers: Array<(entries: IntersectionObserverEntry[]) => void> = [];

class TestIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observers.push((entries) => callback(entries, this as unknown as IntersectionObserver));
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = "0px";
  thresholds = [0, 1];
}

function videoPost(mediaCount = 1): Post {
  return {
    id: "post-video",
    author: { id: "author-1", username: "author", displayName: "Author", avatarUrl: "" },
    createdAt: "2026-08-10T00:00:00Z",
    layoutVariant: "STANDARD",
    mediaRatio: "16:9",
    caption: "Video post",
    media: Array.from({ length: mediaCount }, (_, index) => ({
      id: `video-${index + 1}`,
      orderNumber: index + 1,
      type: "VIDEO" as const,
      url: `https://cdn.example.test/video-${index + 1}.mp4`,
      aspectRatio: 9 / 16,
      alt: `Video ${index + 1}`,
    })),
    engagement: { likes: 0, comments: 0, reposts: 0, shares: 0, saves: 0 },
    viewerState: { liked: false, saved: false, reposted: false },
    comments: [],
  };
}

beforeEach(() => {
  observers.length = 0;
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
  vi.mocked(apiGet).mockRejectedValue(new Error("offline fixture"));
});

afterEach(() => {
  reportFeedMusicVisibility("post-video", 0);
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Post video playback", () => {
  it("centers a fitted detail video inside its full-size player wrapper", () => {
    expect(postMediaCss).toMatch(
      /\.detail-media-content \.post-video-player\s*\{[^}]*display:\s*grid;[^}]*place-items:\s*center;/s,
    );
  });

  it("renders the feed media frame with the stored width-to-height ratio", () => {
    const { container } = render(<PostCard
      post={videoPost()}
      index={1}
      viewerId="viewer-1"
      onOpen={vi.fn()}
      onToggle={vi.fn()}
      onEdit={vi.fn()}
      onArchive={vi.fn(async () => undefined)}
      onOpenProfile={vi.fn(async () => undefined)}
    />);

    expect(container.querySelector<HTMLElement>(".post-media-frame")?.style.aspectRatio).toBe("16 / 9");
  });

  it("autoplays the visible Feed video with original audio", async () => {
    const { container } = render(<PostCard
      post={videoPost()}
      index={1}
      viewerId="viewer-1"
      onOpen={vi.fn()}
      onToggle={vi.fn()}
      onEdit={vi.fn()}
      onArchive={vi.fn(async () => undefined)}
      onOpenProfile={vi.fn(async () => undefined)}
    />);

    act(() => observers.forEach((notify) => notify([{
      isIntersecting: true,
      intersectionRatio: 0.9,
    } as IntersectionObserverEntry])));

    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    expect((container.querySelector("video") as HTMLVideoElement).muted).toBe(false);
  });

  it("autoplays the active Post Detail video and the next selected video", async () => {
    const post = videoPost(2);
    const { container } = render(<PostDetail
      post={post}
      viewerId="viewer-1"
      onClose={vi.fn()}
      onTogglePost={vi.fn()}
      onCommentCreated={vi.fn()}
      onEdit={vi.fn()}
      onArchive={vi.fn()}
      onOpenProfile={vi.fn(async () => undefined)}
    />);

    await waitFor(() => expect(container.querySelector("video")).toBeInTheDocument());
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    const firstPlayCount = vi.mocked(HTMLMediaElement.prototype.play).mock.calls.length;

    fireEvent.click(screen.getByRole("button", { name: "Next media" }));

    await waitFor(() => expect(screen.getByText("02 / 02")).toBeInTheDocument());
    await waitFor(() => expect(vi.mocked(HTMLMediaElement.prototype.play).mock.calls.length).toBeGreaterThan(firstPlayCount));
  });
});

describe("Post comment media policy", () => {
  it("sends the uploaded video resource type to moderation", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:comment-video");
    vi.mocked(uploadCloudinaryMedia).mockResolvedValue({
      secureUrl: "https://cdn.example.test/comment.mp4",
      publicId: "comment-video",
      resourceType: "video",
      bytes: 1024,
      fileName: "comment.mp4",
      mimeType: "video/mp4",
    });
    vi.mocked(apiSend).mockResolvedValue({ commentId: "comment-1" });
    const { container } = render(<PostDetail
      post={videoPost()}
      viewerId="viewer-1"
      onClose={vi.fn()}
      onTogglePost={vi.fn()}
      onCommentCreated={vi.fn()}
      onEdit={vi.fn()}
      onArchive={vi.fn()}
      onOpenProfile={vi.fn(async () => undefined)}
    />);
    const file = new File(["video"], "comment.mp4", { type: "video/mp4" });

    fireEvent.change(container.querySelector(".comment-file-input") as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.click(container.querySelector(".detail-composer button[type=submit]") as HTMLButtonElement);

    await waitFor(() => expect(apiSend).toHaveBeenCalledWith("/comments", "POST", expect.objectContaining({
      mediaList: [expect.objectContaining({ resourceType: "video" })],
    })));
  });
});

describe("CommentRow", () => {
  it("keeps the author identity visible for a media-only comment", () => {
    render(
      <CommentRow
        item={{
          id: "comment-1",
          postId: "post-1",
          userId: "user-1",
          username: "commenter",
          fullName: "Commenter",
          content: null,
          mediaUrl: "https://cdn.example.test/portrait.jpg",
          timestamp: "2026-07-31T00:00:00Z",
        }}
        viewerId="viewer-1"
        postAuthorId="author-1"
        onLike={vi.fn(async () => false)}
        onReply={vi.fn()}
        onOpenMedia={vi.fn()}
        onOpenProfile={vi.fn(async () => undefined)}
      />,
    );

    expect(screen.getByRole("button", { name: /^commenter$/ })).toBeInTheDocument();
    expect(screen.getByAltText("Comment attachment")).toBeInTheDocument();
  });
});
