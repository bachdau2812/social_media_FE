import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { apiGet } from "../../shared/api";
import type { Post } from "../../features/post";
import type { StoryItem } from "../../features/story";
import { usePostRoute } from "./usePostRoute";
import { useStoryRoute } from "./useStoryRoute";
import type { AppDestination } from "../../features/notification/core/types";

vi.mock("../../shared/api", async (original) => ({ ...await original<typeof import("../../shared/api")>(), apiGet: vi.fn() }));
vi.mock("../../features/profile", () => ({ profileApi: { getSummary: vi.fn().mockResolvedValue(null) } }));
beforeEach(() => { vi.mocked(apiGet).mockReset(); });
afterEach(cleanup);

it("restores a seeded story rail after closing and reopening its history entry", async () => {
  vi.mocked(apiGet).mockImplementation(() => new Promise(() => {}));
  const destination = { kind: "story", ownerId: "owner", storyId: "a", scope: "rail" } as Extract<AppDestination, { kind: "story" }>;
  const { result, rerender } = renderHook(({ target }) => useStoryRoute(target, "viewer"), { initialProps: { target: destination as typeof destination | undefined } });
  const rail = [{ id: "a", userId: "owner" }, { id: "b", userId: "other-owner" }] as StoryItem[];
  act(() => result.current.seed(rail, 0));
  rerender({ target: undefined });
  expect(result.current.index).toBeNull();
  rerender({ target: destination });
  await waitFor(() => expect(result.current.index).toBe(0));
  expect(result.current.stories).toEqual(rail);
});

it("does not reuse a post's private viewer state after switching accounts", async () => {
  vi.mocked(apiGet).mockImplementation(() => new Promise(() => {}));
  const post = { id: "p", viewerState: { liked: true } } as Post;
  const { result, rerender } = renderHook(({ viewerId }) => usePostRoute("p", viewerId, []), { initialProps: { viewerId: "viewer-a" } });
  act(() => result.current.setPost(post));
  expect(result.current.post).toBe(post);
  vi.mocked(apiGet).mockClear();
  rerender({ viewerId: "viewer-b" });
  expect(result.current.post).toBeNull();
  expect(apiGet).toHaveBeenCalledWith("/posts/p?mediaType=POST", expect.anything());
});
it("does not render the previous story when the URL moves to an uncached story", () => {
  vi.mocked(apiGet).mockImplementation(() => new Promise(() => {}));
  const rendered: Array<number | null> = [];
  const { result, rerender } = renderHook(({ storyId }) => {
    const state = useStoryRoute({ kind: "story", ownerId: "owner", storyId, scope: "owner" }, "viewer");
    rendered.push(state.index);
    return state;
  }, { initialProps: { storyId: "a" } });
  act(() => result.current.seed([{ id: "a", userId: "owner" } as StoryItem], 0));
  rendered.length = 0;
  rerender({ storyId: "b" });
  expect(rendered.every((index) => index === null)).toBe(true);
});
it("resolves a requested archived story beyond the first page", async () => {
  vi.mocked(apiGet).mockResolvedValueOnce({ content: [{ id: "a", userId: "owner" }], totalPages: 2 })
    .mockResolvedValueOnce({ content: [{ id: "b", userId: "owner" }], totalPages: 2 });
  const { result } = renderHook(() => useStoryRoute({ kind: "story", ownerId: "owner", storyId: "b", scope: "single" }, "viewer"));
  await waitFor(() => expect(result.current.index).toBe(0));
  expect(result.current.stories[0].id).toBe("b");
  expect(result.current.stories[0].status).not.toBe("EXPIRED");
  expect(apiGet).toHaveBeenCalledWith(expect.stringContaining("page=1"), expect.anything());
});
it("does not substitute a different story for a missing resource in owner scope", async () => {
  vi.mocked(apiGet).mockResolvedValue({ content: [{ id: "other", userId: "owner" }], totalPages: 1 });
  const { result } = renderHook(() => useStoryRoute({ kind: "story", ownerId: "owner", storyId: "missing", scope: "owner" }, "viewer"));
  await waitFor(() => expect(result.current.index).toBe(0));
  expect(result.current.stories[0]).toMatchObject({ id: "missing", status: "EXPIRED" });
});
