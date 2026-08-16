// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_BASE_URL } from "../../../shared/api";
import { notificationRealtime } from "./notificationRealtime";

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
    const listener = typeof callback === "function" ? callback : (event: Event) => callback.handleEvent(event);
    const listeners = this.listeners.get(type) ?? new Set<EventListener>();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  emit(type: string, data: string) {
    this.listeners.get(type)?.forEach((listener) => listener(new MessageEvent(type, { data })));
  }

  close() {
    this.closed = true;
  }
}

beforeEach(() => {
  EventSourceStub.instances = [];
  vi.stubGlobal("EventSource", EventSourceStub);
});

afterEach(() => vi.unstubAllGlobals());

describe("notificationRealtime", () => {
  it("subscribes with credentials, forwards invalidations and closes cleanly", () => {
    const listener = vi.fn();
    const unsubscribe = notificationRealtime.subscribe("user-1", listener);
    const source = EventSourceStub.instances[0];

    expect(source.url).toBe(`${API_BASE_URL}/notifications/stream`);
    expect(source.withCredentials).toBe(true);
    source.emit("notification_changed", "notification-1");
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    expect(source.closed).toBe(true);
  });

  it("does not connect without an authenticated user", () => {
    const unsubscribe = notificationRealtime.subscribe("", vi.fn());
    expect(EventSourceStub.instances).toHaveLength(0);
    expect(() => unsubscribe()).not.toThrow();
  });
});
