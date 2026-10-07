import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_BASE_URL } from "../api";
import { subscribeAccountEvents } from "./accountEventStream";

class EventSourceStub {
  static instances: EventSourceStub[] = [];
  listeners = new Map<string, Set<EventListener>>();
  closed = false;
  constructor(readonly url: string | URL, readonly init?: EventSourceInit) { EventSourceStub.instances.push(this); }
  addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    const group = this.listeners.get(type) ?? new Set<EventListener>();
    group.add(typeof listener === "function" ? listener : (event) => listener.handleEvent(event));
    this.listeners.set(type, group);
  }
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    const group = this.listeners.get(type);
    if (!group) return;
    group.delete(typeof listener === "function" ? listener : (event) => listener.handleEvent(event));
  }
  close() { this.closed = true; }
  emit(type: string, data: string) {
    const event = new MessageEvent(type, { data, lastEventId: "event-1" });
    this.listeners.get(type)?.forEach((listener) => listener(event));
  }
}

beforeEach(() => {
  EventSourceStub.instances = [];
  vi.stubGlobal("EventSource", EventSourceStub);
});
afterEach(() => vi.unstubAllGlobals());

describe("accountEventStream", () => {
  it("multiplexes raw named events over one credentialed connection per account", () => {
    const post = vi.fn();
    const story = vi.fn();
    const removePost = subscribeAccountEvents("user/1", ["post_upload"], post);
    const removeStory = subscribeAccountEvents("user/1", ["story_upload_event"], story);

    expect(EventSourceStub.instances).toHaveLength(1);
    expect(EventSourceStub.instances[0].url).toBe(`${API_BASE_URL}/posts/sse/user%2F1`);
    expect(EventSourceStub.instances[0].init).toEqual({ withCredentials: true });
    EventSourceStub.instances[0].emit("post_upload", "raw-post-payload");
    EventSourceStub.instances[0].emit("story_upload_event", "raw-story-payload");
    expect(post).toHaveBeenCalledWith({ type: "post_upload", data: "raw-post-payload", lastEventId: "event-1" });
    expect(story).toHaveBeenCalledWith({ type: "story_upload_event", data: "raw-story-payload", lastEventId: "event-1" });

    removePost();
    expect(EventSourceStub.instances[0].closed).toBe(false);
    removeStory();
    expect(EventSourceStub.instances[0].closed).toBe(true);
  });

  it("keeps accounts on separate event sessions", () => {
    const removeFirst = subscribeAccountEvents("first", ["post_upload"], vi.fn());
    const removeSecond = subscribeAccountEvents("second", ["post_upload"], vi.fn());
    expect(EventSourceStub.instances).toHaveLength(2);
    removeFirst(); removeSecond();
    expect(EventSourceStub.instances.every((source) => source.closed)).toBe(true);
  });
});
