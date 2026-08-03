import { describe, expect, it } from "vitest";
import {
  clearPendingNotificationDestination,
  consumePendingNotificationDestination,
  loadPendingNotificationDestination,
  savePendingNotificationDestination,
} from "./pendingDestination";

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();

  get length() {
    return this.values.size;
  }

  clear() {
    this.values.clear();
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  key(index: number) {
    return [...this.values.keys()][index] ?? null;
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("pending notification destination", () => {
  it("stores, loads and consumes a destination", () => {
    const storage = new MemoryStorage();
    const destination = { kind: "profile", userId: "user-1" } as const;

    savePendingNotificationDestination(destination, { storage, now: () => 1_000 });
    expect(loadPendingNotificationDestination({ storage, now: () => 1_100 })).toEqual(destination);
    expect(consumePendingNotificationDestination({ storage, now: () => 1_100 })).toEqual(destination);
    expect(loadPendingNotificationDestination({ storage, now: () => 1_100 })).toBeNull();
  });

  it("drops an expired destination", () => {
    const storage = new MemoryStorage();
    savePendingNotificationDestination(
      { kind: "post", postId: "post-1" },
      { storage, now: () => 1_000, ttlMs: 500 },
    );

    expect(loadPendingNotificationDestination({ storage, now: () => 1_501 })).toBeNull();
    expect(storage.length).toBe(0);
  });

  it("clears invalid persisted data without throwing", () => {
    const storage = new MemoryStorage();
    storage.setItem("social-media:pending-notification-destination", "{bad json");

    expect(loadPendingNotificationDestination({ storage })).toBeNull();
    expect(storage.length).toBe(0);
  });

  it("can be cleared explicitly", () => {
    const storage = new MemoryStorage();
    savePendingNotificationDestination({ kind: "home" }, { storage });
    clearPendingNotificationDestination(storage);
    expect(storage.length).toBe(0);
  });
});
