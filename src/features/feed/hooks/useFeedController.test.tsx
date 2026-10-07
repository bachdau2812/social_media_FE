import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HomeScreenPayload } from "../model/feed.dto";
import { useFeedController } from "./useFeedController";

const apiGet = vi.hoisted(() => vi.fn());

vi.mock("../../../shared/api", () => ({ apiGet }));

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => { resolve = resolvePromise; });
  return { promise, resolve };
}

function home(postId: string, feedEntryId?: string, hasMore = false): HomeScreenPayload {
  return {
    activeTab: "DISCOVER",
    tabs: [],
    storyTray: [],
    suggestedUsers: [],
    feed: {
      userId: "viewer-1",
      limit: 20,
      hasMore,
      items: [{
        postId,
        feedEntryId,
        userId: `author-${postId}`,
        authorUsername: "bach",
        authorFullName: "Đậu Đức Bách",
        authorAvatarUrl: null,
        content: postId,
        hashtags: [],
        mediaRatio: null,
        media: [],
        music: null,
        items: [],
        likeCount: 0,
        commentCount: 0,
        repostCount: 0,
        likedByCurrentUser: false,
        repostedByCurrentUser: false,
        createdAt: "2026-07-30T10:00:00Z",
        updatedAt: "2026-07-30T10:00:00Z",
        sourceType: null,
        recommendationReason: null,
        rankingVersion: null,
        experimentId: null,
        impressionToken: null,
      }],
    },
  };
}

afterEach(() => apiGet.mockReset());

describe("useFeedController", () => {
  it("preserves cached posts when invalidating a pending tab request", async () => {
    const pending = deferred<HomeScreenPayload>();
    apiGet.mockResolvedValueOnce(home("cached-discovery"));
    const { result } = renderHook(() => useFeedController());
    await act(async () => { await result.current.load("viewer-1", "DISCOVER"); });
    let signal: AbortSignal | undefined;
    apiGet.mockImplementationOnce((_path: string, options?: { signal?: AbortSignal }) => {
      signal = options?.signal;
      return pending.promise;
    });
    let pendingLoad!: Promise<void>;
    act(() => { pendingLoad = result.current.load("viewer-1", "FRIENDS"); });
    act(() => result.current.invalidate());
    expect(signal?.aborted).toBe(true);
    await act(async () => { pending.resolve(home("stale-friends")); await pendingLoad; });
    expect(result.current.posts.map((post) => post.id)).toEqual(["cached-discovery"]);
  });
  it("keeps separate repost entries for one post and deduplicates by feed entry ID", async () => {
    apiGet
      .mockResolvedValueOnce(home("post-1", "repost-1", true))
      .mockResolvedValueOnce(home("post-1", "repost-2", true))
      .mockResolvedValueOnce(home("post-1", "repost-2", false));
    const { result } = renderHook(() => useFeedController());

    await act(async () => {
      await result.current.load("viewer-1", "FRIENDS");
    });
    await act(async () => {
      await result.current.loadMore("viewer-1", "FRIENDS");
    });

    expect(result.current.posts.map((post) => post.feedEntryId)).toEqual(["repost-1", "repost-2"]);
    expect(result.current.posts.map((post) => post.id)).toEqual(["post-1", "post-1"]);

    await act(async () => {
      await result.current.loadMore("viewer-1", "FRIENDS");
    });
    expect(result.current.posts.map((post) => post.feedEntryId)).toEqual(["repost-1", "repost-2"]);
  });

  it("aborts the active request when the Feed controller unmounts", () => {
    const pending = deferred<HomeScreenPayload>();
    let signal: AbortSignal | undefined;
    apiGet.mockImplementationOnce((_path: string, options?: { signal?: AbortSignal }) => {
      signal = options?.signal;
      return pending.promise;
    });
    const { result, unmount } = renderHook(() => useFeedController());

    act(() => { void result.current.load("viewer-1", "DISCOVER"); });
    unmount();

    expect(signal?.aborted).toBe(true);
  });

  it("aborts the previous tab request and ignores its stale response", async () => {
    const first = deferred<HomeScreenPayload>();
    const second = deferred<HomeScreenPayload>();
    const signals: Array<AbortSignal | undefined> = [];
    apiGet
      .mockImplementationOnce((_path: string, options?: { signal?: AbortSignal }) => {
        signals.push(options?.signal);
        return first.promise;
      })
      .mockImplementationOnce((_path: string, options?: { signal?: AbortSignal }) => {
        signals.push(options?.signal);
        return second.promise;
      });
    const { result } = renderHook(() => useFeedController());

    let firstLoad!: Promise<void>;
    act(() => { firstLoad = result.current.load("viewer-1", "DISCOVER"); });
    let secondLoad!: Promise<void>;
    act(() => { secondLoad = result.current.load("viewer-1", "FRIENDS"); });

    expect(signals[0]).toBeDefined();
    expect(signals[0]?.aborted).toBe(true);
    expect(signals[1]?.aborted).toBe(false);

    await act(async () => {
      second.resolve(home("post-new"));
      await secondLoad;
    });
    expect(result.current.posts.map((post) => post.id)).toEqual(["post-new"]);

    await act(async () => {
      first.resolve(home("post-stale"));
      await firstLoad;
    });
    expect(result.current.posts.map((post) => post.id)).toEqual(["post-new"]);
  });
  it("does not expose expired stories returned by a stale backend response", async () => {
    const payload = home("post-with-stories");
    payload.storyTray = [
      {
        id: "expired", userId: "author-1", username: "expired_user", fullName: "Expired User",
        avatarUrl: null, mediaUrl: "https://cdn.example.test/expired.jpg", mediaType: "IMAGE",
        musicId: null, musicUrl: null, musicName: null, musicStart: null, musicEnd: null,
        durationSeconds: 5, status: "APPROVED", createdAt: "2026-07-29T09:00:00Z",
        expiredAt: "2026-07-30T09:00:00Z", publicationId: "publication-1",
        publicationOrder: 1, publicationItemCount: 1, viewerSeen: false,
      },
      {
        id: "active", userId: "author-2", username: "active_user", fullName: "Active User",
        avatarUrl: null, mediaUrl: "https://cdn.example.test/active.jpg", mediaType: "IMAGE",
        musicId: null, musicUrl: null, musicName: null, musicStart: null, musicEnd: null,
        durationSeconds: 5, status: "APPROVED", createdAt: "2026-07-30T09:00:00Z",
        expiredAt: "2099-07-31T09:00:00Z", publicationId: "publication-2",
        publicationOrder: 1, publicationItemCount: 1, viewerSeen: false,
      },
    ];
    apiGet.mockResolvedValueOnce(payload);
    const { result } = renderHook(() => useFeedController());

    await act(async () => {
      await result.current.load("viewer-1", "DISCOVER");
    });

    expect(result.current.stories.map((story) => story.id)).toEqual(["active"]);
  });
});
