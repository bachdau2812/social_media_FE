import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { notificationApi } from "../api/notification.api";
import { refreshNotificationUnreadCount, setNotificationUnreadCount, useNotificationUnreadCount } from "./useNotificationUnreadCount";

const realtimeMocks = vi.hoisted(() => ({ subscribe: vi.fn() }));

vi.mock("../services/notificationRealtime", () => ({
  notificationRealtime: realtimeMocks,
}));

vi.mock("../api/notification.api", () => ({
  notificationApi: { unreadCount: vi.fn() },
}));

const unreadCount = vi.mocked(notificationApi.unreadCount);
let realtimeListener: (() => void) | undefined;
let unsubscribe: ReturnType<typeof vi.fn>;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}

beforeEach(() => {
  unreadCount.mockReset();
  realtimeMocks.subscribe.mockReset();
  unsubscribe = vi.fn();
  realtimeMocks.subscribe.mockImplementation((_userId: string, listener: () => void) => {
    realtimeListener = listener;
    return unsubscribe;
  });
});

describe("useNotificationUnreadCount", () => {
  it("loads, refreshes and accepts an immediate synchronized count", async () => {
    unreadCount.mockResolvedValueOnce(5).mockResolvedValueOnce(3);
    const { result } = renderHook(() => useNotificationUnreadCount("viewer-1"));

    await waitFor(() => expect(result.current).toBe(5));
    act(() => refreshNotificationUnreadCount());
    await waitFor(() => expect(result.current).toBe(3));

    act(() => setNotificationUnreadCount(0));
    expect(result.current).toBe(0);
    expect(unreadCount).toHaveBeenCalledTimes(2);
  });

  it("coalesces realtime bursts and keeps the newest authoritative count", async () => {
    const current = deferred<number>();
    const latest = deferred<number>();
    unreadCount.mockResolvedValueOnce(1).mockReturnValueOnce(current.promise).mockReturnValueOnce(latest.promise);
    const { result } = renderHook(() => useNotificationUnreadCount("viewer-1"));

    await waitFor(() => expect(result.current).toBe(1));
    act(() => {
      realtimeListener?.();
      realtimeListener?.();
      realtimeListener?.();
    });
    expect(unreadCount).toHaveBeenCalledTimes(2);

    act(() => current.resolve(2));
    await waitFor(() => expect(unreadCount).toHaveBeenCalledTimes(3));
    act(() => latest.resolve(7));
    await waitFor(() => expect(result.current).toBe(7));
    expect(unreadCount).toHaveBeenCalledTimes(3);
  });

  it("reconciles online and visible recovery signals and cleans up", async () => {
    unreadCount.mockResolvedValueOnce(4).mockResolvedValueOnce(5).mockResolvedValueOnce(6);
    const { result, unmount } = renderHook(() => useNotificationUnreadCount("viewer-1"));
    await waitFor(() => expect(result.current).toBe(4));

    act(() => window.dispatchEvent(new Event("online")));
    await waitFor(() => expect(result.current).toBe(5));

    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    await waitFor(() => expect(result.current).toBe(6));

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
