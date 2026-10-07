import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const transport = vi.hoisted(() => ({
  subscribeAccountEvents: vi.fn(),
  listener: undefined as ((event: { type: string; data: string; lastEventId: string }) => void) | undefined,
}));
vi.mock("../../shared/realtime/accountEventStream", () => transport);

import { useAccountRealtime } from "./useAccountRealtime";

afterEach(() => { cleanup(); vi.clearAllMocks(); });

it("routes raw account events through their feature parsers and keeps raw transport payloads out of app callbacks", () => {
  const onPostUploadResult = vi.fn();
  const onStoryUploadResult = vi.fn();
  const onAvatarUploadResult = vi.fn();
  const onMusicFetchResult = vi.fn();
  let release = vi.fn();
  transport.subscribeAccountEvents.mockImplementation((_userId, _types, listener) => {
    transport.listener = listener;
    return release;
  });
  const avatarEvents: Event[] = [];
  const musicEvents: Event[] = [];
  const commentEvents: Event[] = [];
  const collectAvatar = (event: Event) => avatarEvents.push(event);
  const collectMusic = (event: Event) => musicEvents.push(event);
  const collectComment = (event: Event) => commentEvents.push(event);
  window.addEventListener("avatar-upload-result", collectAvatar);
  window.addEventListener("music-fetch-result", collectMusic);
  window.addEventListener("comment-media-result", collectComment);

  renderHook(() => useAccountRealtime("viewer-1", {
    onPostUploadResult, onStoryUploadResult, onAvatarUploadResult, onMusicFetchResult,
  }));
  expect(transport.subscribeAccountEvents).toHaveBeenCalledWith(
    "viewer-1",
    expect.arrayContaining(["post_upload", "story_upload_event", "avatar_upload_event", "music_fetch_success", "music_fetch_failed"]),
    expect.any(Function),
  );

  act(() => {
    const dispatch = transport.listener!;
    dispatch({ type: "post_upload", data: JSON.stringify({ result: "SUCCESSED", message: "Published" }), lastEventId: "p1" });
    dispatch({ type: "story_upload_event", data: JSON.stringify({ result: "APPROVED", message: "Story ready" }), lastEventId: "s1" });
    dispatch({ type: "avatar_upload_event", data: JSON.stringify({ userId: "viewer-1", publicId: "avatar", mediaUrl: "/avatar.jpg", result: "APPROVED" }), lastEventId: "a1" });
    dispatch({ type: "avatar_upload_event", data: JSON.stringify({ userId: "other", publicId: "avatar", mediaUrl: "/other.jpg", result: "APPROVED" }), lastEventId: "a2" });
    dispatch({ type: "music_fetch_success", data: JSON.stringify({ id: "track", displayName: "Track", fetched: true, slugName: null, descriptions: null, displayImages: null, singleName: null, songUrl: null, duration: null, category: null, releaseYear: null, albumName: null }), lastEventId: "m1" });
    dispatch({ type: "comment_success_event", data: JSON.stringify({ commentId: "comment", postId: "post", result: "APPROVED" }), lastEventId: "c1" });
  });

  expect(onPostUploadResult).toHaveBeenCalledWith({ kind: "post", success: true, result: "SUCCESSED", message: "Published" });
  expect(onStoryUploadResult).toHaveBeenCalledWith({ success: true, result: "APPROVED", message: "Story ready" });
  expect(onAvatarUploadResult).toHaveBeenCalledOnce();
  expect(avatarEvents).toHaveLength(1);
  expect(onMusicFetchResult).toHaveBeenCalledWith({ kind: "success", music: expect.objectContaining({ id: "track" }) });
  expect(musicEvents).toHaveLength(1);
  expect(commentEvents).toHaveLength(1);
  expect((commentEvents[0] as CustomEvent).detail).toMatchObject({ commentId: "comment", postId: "post" });

  window.removeEventListener("avatar-upload-result", collectAvatar);
  window.removeEventListener("music-fetch-result", collectMusic);
  window.removeEventListener("comment-media-result", collectComment);
  release();
});
