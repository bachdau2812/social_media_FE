// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("./musicCatalog", async (original) => ({ ...await original<typeof import("./musicCatalog")>(), requestMusicFetch: vi.fn() }));
vi.mock("../notifications/appToast", () => ({ emitAppToast: vi.fn() }));

import { emitAppToast } from "../notifications/appToast";
import { MUSIC_FETCH_RESULT_EVENT, requestMusicFetch, type MusicDto } from "./musicCatalog";
import { useMusicFetchController } from "./useMusicFetchController";

const track: MusicDto = {
  id: "track-1", slugName: null, displayName: "Track", descriptions: null,
  displayImages: null, singleName: "Artist", songUrl: "https://music/track.flac",
  duration: 120, category: null, releaseYear: 2024, albumName: null, fetched: false,
};

afterEach(() => vi.clearAllMocks());

it("tracks pending fetches, stops a matching preview and delegates successful catalog updates", async () => {
  const onFetched = vi.fn();
  const stopPreview = vi.fn();
  vi.mocked(requestMusicFetch).mockResolvedValue({ trackId: track.id, status: "STARTED" });
  const { result } = renderHook(() => useMusicFetchController({ previewingId: track.id, stopPreview, onFetched }));

  await act(async () => { await result.current.fetchTrack(track); });
  expect(result.current.fetchingTrackIds.has(track.id)).toBe(true);
  expect(emitAppToast).toHaveBeenCalledOnce();

  act(() => window.dispatchEvent(new CustomEvent(MUSIC_FETCH_RESULT_EVENT, {
    detail: { kind: "success", music: { ...track, fetched: true } },
  })));

  expect(result.current.fetchingTrackIds.has(track.id)).toBe(false);
  expect(stopPreview).toHaveBeenCalledOnce();
  expect(onFetched).toHaveBeenCalledWith({ ...track, fetched: true });
});

it("clears pending state and reports a request failure so the action can be retried", async () => {
  vi.mocked(requestMusicFetch).mockRejectedValue(new Error("offline"));
  const { result } = renderHook(() => useMusicFetchController({ previewingId: null, stopPreview: vi.fn(), onFetched: vi.fn() }));

  await act(async () => { await result.current.fetchTrack(track); });

  expect(result.current.fetchingTrackIds.has(track.id)).toBe(false);
  expect(emitAppToast).toHaveBeenCalledOnce();
});
