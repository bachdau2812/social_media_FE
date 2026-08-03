import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CommentRow } from "./PostSurfaces";

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
