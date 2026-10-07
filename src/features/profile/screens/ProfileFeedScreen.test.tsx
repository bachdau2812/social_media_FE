import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ProfileFeedScreen } from "./ProfileFeedScreen";

vi.mock("../../post", () => ({ PostCard: ({ post, onOpen }: any) => <article><p>{post.caption}</p><button onClick={onOpen}>Comments {post.id}</button></article> }));
const posts = ["a", "x", "y"].map(id => ({ id, caption: `Post ${id}`, author: { id: "owner" }, media: [], viewerState: {}, engagement: {}, comments: [] }));
const callbacks = { onSelectPost: vi.fn(), onTogglePost: vi.fn(), onEditPost: vi.fn(), onArchivePost: vi.fn(), onOpenProfile: vi.fn() };
const collection = { posts, status: "ready", error: "", hydrationErrors: {}, hasMore: false, hasPrevious: false, selectedPostFound: true,
  loadingDirection: null, hydrate: vi.fn(async () => {}), retry: vi.fn(), loadPrevious: vi.fn(), loadNext: vi.fn() };
const props = { viewerId: "viewer", profile: null, selectedPostId: "x", entryKey: "entry-one", restoring: false, collection, ...callbacks } as any;
beforeEach(() => { vi.spyOn(window, "scrollTo").mockImplementation(() => {}); vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 320 } as DOMRect); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.clearAllMocks(); });

it("renders all loaded posts and focuses the selected entry once, without jumping on mutations", () => {
  const { rerender } = render(<ProfileFeedScreen {...props} />);
  expect(screen.getByText("Post a")).toBeInTheDocument();
  expect(screen.getByText("Post y")).toBeInTheDocument();
  expect(window.scrollTo).toHaveBeenCalledTimes(1);
  rerender(<ProfileFeedScreen {...props} collection={{ ...collection, posts: [...posts, { ...posts[2], id: "z", caption: "Post z" }] }} />);
  expect(window.scrollTo).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByText("Comments x"));
  expect(callbacks.onSelectPost).toHaveBeenCalledWith(posts[1]);
});

it("leaves POP scroll restoration to navigation instead of refocusing the route anchor", () => {
  render(<ProfileFeedScreen {...props} restoring />);
  expect(window.scrollTo).not.toHaveBeenCalled();
});

it("keeps paging controls and shows a missing selected-post notice without a scroll loop", () => {
  render(<ProfileFeedScreen {...props} collection={{ ...collection, selectedPostFound: false, hasMore: true, hasPrevious: true }} />);
  expect(screen.getByRole("status")).toHaveTextContent("không còn");
  fireEvent.click(screen.getByRole("button", { name: "Tải bài viết trước" }));
  fireEvent.click(screen.getByRole("button", { name: "Tải thêm bài viết" }));
  expect(collection.loadPrevious).toHaveBeenCalledOnce();
  expect(collection.loadNext).toHaveBeenCalledOnce();
  expect(window.scrollTo).not.toHaveBeenCalled();
});
