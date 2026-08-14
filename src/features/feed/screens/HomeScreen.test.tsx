import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Post } from "../../post";
import { HomeScreen } from "./HomeScreen";

afterEach(cleanup);

function basePost(overrides: Partial<Post> = {}): Post {
  return {
    id: "post-1",
    feedEntryId: "post:post-1",
    feedActivity: { type: "ORIGINAL_POST", occurredAt: "2026-07-31T01:00:00Z" },
    author: { id: "author-1", username: "bach", displayName: "Bach", avatarUrl: "" },
    createdAt: "2026-07-30T10:00:00Z",
    layoutVariant: "TEXT",
    mediaRatio: "1:1",
    caption: "Original post",
    media: [],
    engagement: { likes: 0, comments: 0, reposts: 0, shares: 0, saves: 0 },
    viewerState: { liked: false, saved: false, reposted: false },
    comments: [],
    ...overrides,
  };
}

function renderHome(overrides: Partial<Parameters<typeof HomeScreen>[0]> = {}) {
  return render(
    <HomeScreen
      userId="viewer-1"
      tab="FRIENDS"
      setTab={vi.fn()}
      stories={[]}
      posts={[]}
      status="ready"
      hasMore={false}
      loadingMore={false}
      onLoadMore={vi.fn()}
      onSelectPost={vi.fn()}
      onCreateStory={vi.fn()}
      onSelectStory={vi.fn()}
      onTogglePost={vi.fn()}
      onEditPost={vi.fn()}
      onArchivePost={vi.fn()}
      onOpenProfile={vi.fn()}
      {...overrides}
    />,
  );
}

describe("HomeScreen mobile structure", () => {
  it("renders repost context before the original author and opens the reposter profile", async () => {
    const onOpenProfile = vi.fn().mockResolvedValue(undefined);
    const post = basePost({
      feedEntryId: "repost-1",
      feedActivity: {
        type: "REPOST",
        occurredAt: "2026-07-31T01:00:00Z",
        actor: { id: "friend-1", username: "an", displayName: "An", avatarUrl: "" },
      },
    });

    const { container } = renderHome({ posts: [post], onOpenProfile });

    const context = container.querySelector(".post-repost-context");
    const originalAuthor = container.querySelector(".post-author");
    expect(context).not.toBeNull();
    expect(context?.querySelector("time")).not.toBeNull();
    if (!context || !originalAuthor) throw new Error("Missing repost context or original author");
    expect(context.compareDocumentPosition(originalAuthor) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /An/ }));
    await waitFor(() => expect(onOpenProfile).toHaveBeenCalledWith("friend-1"));
  });

  it("does not render repost context for an original post activity", () => {
    const { container } = renderHome({ posts: [basePost()] });

    expect(container.querySelector(".post-repost-context")).toBeNull();
  });

  it("keeps the story rail outside the sticky feed tabs", () => {
    const { container } = renderHome({ tab: "DISCOVER" });

    const stories = container.querySelector(".home-stories");
    const stickyTabs = container.querySelector(".home-sticky");
    expect(stories).not.toBeNull();
    expect(stickyTabs?.querySelector(".feed-tabs")).not.toBeNull();
    expect(stickyTabs?.querySelector(".story-strip")).toBeNull();
    expect(stories?.nextElementSibling).toBe(stickyTabs);
  });

  it("keeps the current feed content mounted while a different tab is loading", () => {
    renderHome({
      tab: "FRIENDS",
      posts: [basePost({ caption: "Existing feed item" })],
      status: "loading",
    });

    expect(screen.getAllByText("Existing feed item").length).toBeGreaterThan(0);
    expect(screen.queryByLabelText("Loading feed")).not.toBeInTheDocument();
  });
});
