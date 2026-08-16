// @vitest-environment jsdom

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MUSIC_FETCH_RESULT_EVENT,
  type MusicDto,
  type MusicFetchResult,
} from "../../../shared/music";
import { usePostEventStream } from "./usePostEventStream";

class EventSourceStub {
  static instances: EventSourceStub[] = [];

  readonly listeners = new Map<string, Set<EventListener>>();
  readonly url: string;
  readonly withCredentials: boolean;
  closed = false;
  onerror: ((event: Event) => unknown) | null = null;

  constructor(url: string | URL, init?: EventSourceInit) {
    this.url = String(url);
    this.withCredentials = Boolean(init?.withCredentials);
    EventSourceStub.instances.push(this);
  }

  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null) {
    if (!callback) return;
    const listener: EventListener = typeof callback === "function"
      ? callback
      : (event) => callback.handleEvent(event);
    const listeners = this.listeners.get(type) ?? new Set<EventListener>();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  emit(type: string, data: string) {
    const event = new MessageEvent(type, { data });
    this.listeners.get(type)?.forEach((listener) => listener(event));
  }

  close() {
    this.closed = true;
  }
}

const music: MusicDto = {
  id: "1Gqm6KaobG2A1mFVjGnJsS",
  slugName: "ca-khuc-cuoi",
  displayName: "Ca Khuc Cuoi",
  descriptions: null,
  displayImages: "https://host/cover.jpg",
  singleName: "Wxrdie",
  songUrl: "https://host/song.flac",
  duration: 186,
  category: "Rap/Hip Hop",
  releaseYear: 2024,
  albumName: "THE WXRDIES",
  fetched: true,
};

beforeEach(() => {
  EventSourceStub.instances = [];
  vi.stubGlobal("EventSource", EventSourceStub);
});

afterEach(() => vi.unstubAllGlobals());

describe("usePostEventStream", () => {
  it("normalizes terminal post and story upload events", () => {
    const onUploadResult = vi.fn();
    const { unmount } = renderHook(() => usePostEventStream("user-1", { onUploadResult }));
    const source = EventSourceStub.instances[0];

    source.emit("post_upload", JSON.stringify({ result: "SUCCESSED", message: "Post published" }));
    source.emit("story_upload_event", JSON.stringify({ result: "APPROVED", message: "Story published" }));
    source.emit("story_upload_event", JSON.stringify({ result: "REJECTED", message: "Story rejected" }));
    source.emit("story_upload_event", "not-json");

    expect(onUploadResult).toHaveBeenNthCalledWith(1, {
      kind: "post",
      success: true,
      result: "SUCCESSED",
      message: "Post published",
    });
    expect(onUploadResult).toHaveBeenNthCalledWith(2, {
      kind: "story",
      success: true,
      result: "APPROVED",
      message: "Story published",
    });
    expect(onUploadResult).toHaveBeenNthCalledWith(3, {
      kind: "story",
      success: false,
      result: "REJECTED",
      message: "Story rejected",
    });
    expect(onUploadResult).toHaveBeenNthCalledWith(4, {
      kind: "story",
      success: false,
      result: undefined,
      message: undefined,
    });

    unmount();
    expect(source.closed).toBe(true);
  });

  it("forwards valid music results both locally and to the global handler", () => {
    const results: MusicFetchResult[] = [];
    const onMusicFetchResult = vi.fn();
    const listener = (event: Event) => {
      results.push((event as CustomEvent<MusicFetchResult>).detail);
    };
    window.addEventListener(MUSIC_FETCH_RESULT_EVENT, listener);

    const { unmount } = renderHook(() => usePostEventStream("user-1", {
      onUploadResult: vi.fn(),
      onMusicFetchResult,
    }));
    expect(EventSourceStub.instances).toHaveLength(1);
    const source = EventSourceStub.instances[0];

    source.emit("music_fetch_success", JSON.stringify(music));
    source.emit("music_fetch_failed", JSON.stringify({ trackId: music.id, message: "Fetch failed" }));
    source.emit("music_fetch_success", JSON.stringify({ id: music.id, fetched: "yes" }));
    source.emit("music_fetch_failed", "not-json");

    expect(results).toEqual([
      { kind: "success", music },
      { kind: "failure", trackId: music.id, message: "Fetch failed" },
    ]);
    expect(onMusicFetchResult.mock.calls.map(([result]) => result)).toEqual(results);

    unmount();
    expect(source.closed).toBe(true);
    window.removeEventListener(MUSIC_FETCH_RESULT_EVENT, listener);
  });
});
