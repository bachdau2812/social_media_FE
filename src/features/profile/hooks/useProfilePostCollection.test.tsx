import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { profileApi } from "../api/profile.api";
import { postApi } from "../../post";
import { useProfilePostCollection } from "./useProfilePostCollection";
import { apiGet } from "../../../shared/api";

vi.mock("../api/profile.api", () => ({ profileApi: { getPosts: vi.fn() } }));
vi.mock("../../../shared/api", async (original) => ({ ...await original<typeof import("../../../shared/api")>(), apiGet: vi.fn() }));

function dto(id: string) {
  return { postId: id, userId: "author", authorUsername: "author", authorFullName: "Author", authorAvatarUrl: "avatar",
    content: id, hashtags: [], mediaRatio: "4:3", firstItem: null, music: null, likeCount: 7, commentCount: 3,
    repostCount: 2, likedByCurrentUser: true, repostedByCurrentUser: false, savedByCurrentUser: true, createdAt: "2026-10-01", updatedAt: null };
}
function page(number: number, ids: string[], previous: boolean, more: boolean) {
  return { userId: "author", posts: ids.map(dto), pageNumber: number, pageSize: 18, hasPrevious: previous, hasMore: more, selectedPostFound: true };
}
beforeEach(() => postApi.clearSurfaceDetailCache());
afterEach(() => { cleanup(); vi.clearAllMocks(); });

it("starts at the selected post page and pages in both directions without duplicating posts", async () => {
  vi.mocked(profileApi.getPosts).mockResolvedValueOnce(page(2, ["x", "y"], true, true));
  const { result } = renderHook(() => useProfilePostCollection({ viewerId: "viewer", profileId: "author", selectedPostId: "x", enabled: true }));
  await waitFor(() => expect(result.current.status).toBe("ready"));
  expect(profileApi.getPosts).toHaveBeenCalledWith("author", "viewer", 0, 18, expect.any(AbortSignal), "x");
  expect(result.current.posts.map(post => post.id)).toEqual(["x", "y"]);
  vi.mocked(profileApi.getPosts).mockResolvedValueOnce(page(1, ["a", "x"], true, true));
  await act(async () => { await result.current.loadPrevious(); });
  expect(result.current.posts.map(post => post.id)).toEqual(["a", "x", "y"]);
  vi.mocked(profileApi.getPosts).mockResolvedValueOnce(page(3, ["z"], true, false));
  await act(async () => { await result.current.loadNext(); });
  expect(result.current.posts.map(post => post.id)).toEqual(["a", "x", "y", "z"]);
  expect(result.current.hasMore).toBe(false);
});

it("hydrates full media while preserving authoritative engagement and viewer state", async () => {
  vi.mocked(profileApi.getPosts).mockResolvedValue(page(0, ["x"], false, false));
  vi.mocked(apiGet).mockResolvedValue({ postId: "x", userId: "author", content: "Full post", mediaRatio: "9:16", items: [
    { id: "one", orderNumber: 1, media: { secureUrl: "one.jpg" } }, { id: "two", orderNumber: 2, media: { secureUrl: "two.jpg" } },
  ] } as any);
  const { result } = renderHook(() => useProfilePostCollection({ viewerId: "viewer", profileId: "author", selectedPostId: "x", enabled: true }));
  await waitFor(() => expect(result.current.status).toBe("ready"));
  await act(async () => { await Promise.all([result.current.hydrate("x"), result.current.hydrate("x")]); });
  expect(apiGet).toHaveBeenCalledTimes(1);
  expect(result.current.posts[0]).toMatchObject({ caption: "Full post", engagement: { likes: 7 }, viewerState: { liked: true, saved: true } });
  expect(result.current.posts[0].media).toHaveLength(2);
});

it("bounds near-viewport media hydration to three concurrent requests", async () => {
  vi.mocked(profileApi.getPosts).mockResolvedValue(page(0, ["a", "b", "c", "d"], false, false));
  const resolvers: Array<() => void> = [];
  vi.mocked(apiGet).mockImplementation(path => new Promise(resolve => {
    resolvers.push(() => resolve({ postId: path.split("/")[2].split("?")[0], userId: "author", items: [] }));
  }));
  const { result } = renderHook(() => useProfilePostCollection({ viewerId: "viewer", profileId: "author", selectedPostId: "a", enabled: true }));
  await waitFor(() => expect(result.current.status).toBe("ready"));
  let jobs!: Promise<void>[];
  act(() => { jobs = ["a", "b", "c", "d"].map(id => result.current.hydrate(id)); });
  await waitFor(() => expect(apiGet).toHaveBeenCalledTimes(3));
  await act(async () => { resolvers.slice(0, 3).forEach(resolve => resolve()); });
  await waitFor(() => expect(apiGet).toHaveBeenCalledTimes(4));
  await act(async () => { resolvers[3](); await Promise.all(jobs); });
});

it("keeps loaded pages and optimistic mutations when returning from another screen", async () => {
  vi.mocked(profileApi.getPosts).mockResolvedValue(page(0, ["x"], false, false));
  const { result, rerender } = renderHook(({ enabled }) => useProfilePostCollection({ viewerId: "viewer", profileId: "author", selectedPostId: "x", enabled }), { initialProps: { enabled: true } });
  await waitFor(() => expect(result.current.status).toBe("ready"));
  act(() => result.current.updatePost("x", post => ({ ...post, viewerState: { ...post.viewerState, liked: false } })));
  rerender({ enabled: false });
  rerender({ enabled: true });
  expect(result.current.posts[0].viewerState.liked).toBe(false);
  expect(profileApi.getPosts).toHaveBeenCalledTimes(1);
});

it("does not let an old profile response replace the new profile collection", async () => {
  let resolveOld!: (value: ReturnType<typeof page>) => void;
  vi.mocked(profileApi.getPosts).mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; })).mockResolvedValueOnce({ ...page(0, ["b"], false, false), userId: "other", posts: [{ ...dto("b"), userId: "other" }] });
  const { result, rerender } = renderHook(({ profileId }) => useProfilePostCollection({ viewerId: "viewer", profileId, selectedPostId: "x", enabled: true }), { initialProps: { profileId: "author" } });
  rerender({ profileId: "other" });
  await waitFor(() => expect(result.current.posts[0]?.id).toBe("b"));
  await act(async () => resolveOld(page(0, ["old"], false, false)));
  expect(result.current.posts[0].id).toBe("b");
});
