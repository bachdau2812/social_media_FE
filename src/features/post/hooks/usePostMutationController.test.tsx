// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../api/post.api", () => ({
  postApi: { like: vi.fn(), repost: vi.fn() },
}));

import { postApi } from "../api/post.api";
import type { Post } from "../model/post.types";
import { usePostMutationController } from "./usePostMutationController";

function makePost(): Post {
  return {
    id: "post-1", author: { id: "author", username: "author", displayName: "Author", avatarUrl: "" },
    createdAt: "", layoutVariant: "TEXT", mediaRatio: "4:3", caption: "Original", media: [],
    viewerState: { liked: false, saved: false, reposted: false },
    engagement: { likes: 2, comments: 3, reposts: 1, shares: 0, saves: 0 }, comments: [],
  };
}

afterEach(() => vi.clearAllMocks());

describe("usePostMutationController", () => {
  it("optimistically changes engagement and rolls back when the owner API fails", async () => {
    const post = makePost();
    let current = post;
    const updatePost = vi.fn((_id: string, update: (value: Post) => Post) => { current = update(current); });
    const onError = vi.fn();
    const savePost = vi.fn(async () => {});
    vi.mocked(postApi.like).mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => usePostMutationController({
      userId: "viewer", getPost: () => current, updatePost, onError, savePost,
    }));

    await act(async () => { await result.current.togglePost("post-1", "liked"); });

    expect(postApi.like).toHaveBeenCalledWith("viewer", "post-1");
    expect(current.viewerState.liked).toBe(false);
    expect(current.engagement.likes).toBe(2);
    expect(onError).toHaveBeenCalledOnce();
  });

  it("uses the canonical repost response and exposes shared count/edit updates", async () => {
    let current = makePost();
    const updatePost = vi.fn((_id: string, update: (value: Post) => Post) => { current = update(current); });
    vi.mocked(postApi.repost).mockResolvedValue({ postId: "post-1", reposted: true, repostCount: 4 });
    const { result } = renderHook(() => usePostMutationController({
      userId: "viewer", getPost: () => current, updatePost, onError: vi.fn(), savePost: vi.fn(async () => {}),
    }));

    await act(async () => { await result.current.togglePost("post-1", "reposted"); });
    expect(current.viewerState.reposted).toBe(true);
    expect(current.engagement.reposts).toBe(4);

    act(() => result.current.incrementCommentCount("post-1"));
    expect(current.engagement.comments).toBe(4);
    act(() => result.current.applyEditedPost({ ...current, caption: "Edited" }));
    expect(current.caption).toBe("Edited");
  });

  it("routes save actions through the post feature API", async () => {
    let current = makePost();
    const updatePost = vi.fn((_id: string, update: (value: Post) => Post) => { current = update(current); });
    const savePost = vi.fn(async () => {});
    const { result } = renderHook(() => usePostMutationController({ userId: "viewer", getPost: () => current, updatePost, onError: vi.fn(), savePost }));

    await act(async () => { await result.current.togglePost("post-1", "saved"); });

    expect(savePost).toHaveBeenCalledWith("viewer", "post-1");
    expect(current.viewerState.saved).toBe(true);
  });
});
