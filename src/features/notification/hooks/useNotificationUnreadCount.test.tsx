import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { notificationApi } from "../api/notification.api";
import { refreshNotificationUnreadCount, setNotificationUnreadCount, useNotificationUnreadCount } from "./useNotificationUnreadCount";

vi.mock("../api/notification.api", () => ({
  notificationApi: { unreadCount: vi.fn() },
}));

const unreadCount = vi.mocked(notificationApi.unreadCount);

afterEach(() => vi.clearAllMocks());

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
});
