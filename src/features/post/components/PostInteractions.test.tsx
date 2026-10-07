import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { apiGet, apiSend } from "../../../shared/api";
import { PostInteractionProvider } from "../hooks/PostInteractionProvider";
import type { Post } from "../model/post.types";
import { PostCard } from "./PostCard";
import { PostDetail } from "./PostDetail";
import { ChatMediaViewer } from "../../chat/components/ChatMediaExperience";

vi.mock("../../../shared/api", async (original) => ({
  ...await original<typeof import("../../../shared/api")>(), apiGet: vi.fn(), apiSend: vi.fn(),
}));
const observed: Array<{ target: Element; callback: IntersectionObserverCallback }> = [];
class Observer {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) { observed.push({ target, callback: this.callback }); }
  disconnect() {}
}
const post: Post = {
  id: "post-1", author: { id: "author-1", username: "author", displayName: "Author", avatarUrl: "" },
  createdAt: "2026-10-06T00:00:00Z", layoutVariant: "STANDARD", mediaRatio: "4:3", caption: "Post content",
  media: [{ id: "image-1", type: "IMAGE", url: "https://example.test/image.jpg", aspectRatio: 4 / 3, alt: "Post image" }],
  engagement: { likes: 0, comments: 0, reposts: 0, shares: 0, saves: 0 },
  viewerState: { liked: false, saved: false, reposted: false }, comments: [],
};
const callbacks = {
  onOpen: vi.fn(), onToggle: vi.fn(), onEdit: vi.fn(), onArchive: vi.fn(async () => {}), onOpenProfile: vi.fn(async () => {}),
};
function notifyContent(target: Element) {
  act(() => observed.filter((item) => item.target === target).forEach(({ callback }) => callback(
    [{ target, isIntersecting: true, intersectionRatio: 1 } as IntersectionObserverEntry], {} as IntersectionObserver,
  )));
}
function interactionBodies() {
  return vi.mocked(apiSend).mock.calls.filter(([path]) => path === "/posts/interaction").map(([, , body]) => body);
}
beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  observed.length = 0;
  vi.stubGlobal("IntersectionObserver", Observer);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
  vi.mocked(apiGet).mockRejectedValue(new Error("offline fixture"));
  vi.mocked(apiSend).mockResolvedValue({ eventId: "accepted", computedScore: 1, duplicate: false });
});
afterEach(async () => {
  cleanup();
  await act(async () => {});
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it("records foreground dwell on the actual feed media frame", async () => {
  const { container } = render(<PostInteractionProvider viewerId="viewer-1" feedBlocked={false} detailBlocked={false}>
    <PostCard post={post} index={1} viewerId="viewer-1" {...callbacks} />
  </PostInteractionProvider>);
  notifyContent(container.querySelector(".post-media-frame")!);
  await act(() => vi.advanceTimersByTimeAsync(31_000));
  expect(interactionBodies()).toEqual([expect.objectContaining({ postId: "post-1", isClick: false, viewTime: 31 })]);
  expect((container.querySelector(".post-media-frame") as HTMLElement).style.aspectRatio).toBe("4 / 3");
});

it.each(["media", "comment"])("reports a click before opening through the %s action", async (action) => {
  const { container } = render(<PostInteractionProvider viewerId="viewer-1" feedBlocked={false} detailBlocked={false}>
    <PostCard post={post} index={1} viewerId="viewer-1" {...callbacks} />
  </PostInteractionProvider>);
  fireEvent.click(action === "media" ? container.querySelector(".media-surface")! : screen.getByRole("button", { name: "Comment" }));
  expect(callbacks.onOpen).toHaveBeenCalledTimes(1);
  expect(interactionBodies()).toEqual([expect.objectContaining({ isClick: true, viewTime: 0 })]);
});

it("records a text-only content view and excludes ordinary like/repost actions", async () => {
  const { container } = render(<PostInteractionProvider viewerId="viewer-1" feedBlocked={false} detailBlocked={false}>
    <PostCard post={{ ...post, media: [], layoutVariant: "TEXT" }} index={1} viewerId="viewer-1" {...callbacks} />
  </PostInteractionProvider>);
  notifyContent(container.querySelector(".text-media")!);
  fireEvent.click(screen.getByRole("button", { name: "Like" }));
  fireEvent.click(screen.getByRole("button", { name: "Repost" }));
  expect(interactionBodies()).toHaveLength(0);
  await act(() => vi.advanceTimersByTimeAsync(31_000));
  fireEvent.click(container.querySelector(".text-media")!);
  expect(interactionBodies()).toEqual([
    expect.objectContaining({ isClick: false, viewTime: 31 }),
    expect.objectContaining({ isClick: true, viewTime: 31 }),
  ]);
});

it("records detail openings and cumulative dwell for posts reached outside feed", async () => {
  render(<PostInteractionProvider viewerId="viewer-1" feedBlocked detailBlocked={false}>
    <PostDetail post={post} viewerId="viewer-1" onClose={vi.fn()} onTogglePost={vi.fn()} onCommentCreated={vi.fn()} onEdit={vi.fn()} onArchive={vi.fn()} onOpenProfile={callbacks.onOpenProfile} />
  </PostInteractionProvider>);
  await act(() => vi.advanceTimersByTimeAsync(61_000));
  expect(interactionBodies()).toEqual([
    expect.objectContaining({ isClick: true, viewTime: 0 }),
    expect.objectContaining({ isClick: true, viewTime: 31 }),
    expect.objectContaining({ isClick: true, viewTime: 61 }),
  ]);
});

it("pauses every feed card while a people-list overlay covers the feed", async () => {
  const { container } = render(<PostInteractionProvider viewerId="viewer-1" feedBlocked={false} detailBlocked={false}>
    <PostCard post={post} index={1} viewerId="viewer-1" {...callbacks} />
    <PostCard post={{ ...post, id: "post-2" }} index={2} viewerId="viewer-1" {...callbacks} />
  </PostInteractionProvider>);
  container.querySelectorAll(".post-media-frame").forEach(notifyContent);
  await act(() => vi.advanceTimersByTimeAsync(20_000));
  fireEvent.click(screen.getAllByRole("button", { name: "View 0 likes" })[0]);
  await act(() => vi.advanceTimersByTimeAsync(100_000));
  expect(interactionBodies()).toHaveLength(0);
  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  await act(() => vi.advanceTimersByTimeAsync(11_000));
  expect(interactionBodies()).toEqual([
    expect.objectContaining({ postId: "post-1", viewTime: 31 }),
    expect.objectContaining({ postId: "post-2", viewTime: 31 }),
  ]);
});

it.each(["page-chat", "mini-chat"])("pauses post telemetry behind the shared %s image viewer", async (surface) => {
  const content = (viewerOpen: boolean) => <PostInteractionProvider viewerId="viewer-1" feedBlocked={false} detailBlocked={false}>
    <PostCard post={post} index={1} viewerId="viewer-1" {...callbacks} />
    {viewerOpen && <div className={surface}><ChatMediaViewer items={[{ url: "https://example.test/chat.jpg", alt: "Chat attachment" }]} initialIndex={0} onClose={vi.fn()} /></div>}
  </PostInteractionProvider>;
  const { container, rerender } = render(content(false));
  notifyContent(container.querySelector(".post-media-frame")!);
  await act(() => vi.advanceTimersByTimeAsync(20_000));
  rerender(content(true));
  await act(() => vi.advanceTimersByTimeAsync(100_000));
  expect(interactionBodies()).toHaveLength(0);
  rerender(content(false));
  await act(() => vi.advanceTimersByTimeAsync(11_000));
  expect(interactionBodies()).toEqual([expect.objectContaining({ viewTime: 31 })]);
});
