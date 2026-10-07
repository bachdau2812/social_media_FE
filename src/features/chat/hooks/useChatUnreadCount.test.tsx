import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const chatApi = vi.hoisted(() => ({ conversations: vi.fn() }));
const chatRealtime = vi.hoisted(() => ({
  subscribe: vi.fn<(userId: string, listener: (event: { type: string; actorId?: string; message?: { senderId: string } }) => void) => () => void>(() => vi.fn()),
}));

vi.mock("../api/chat.api", () => ({ chatApi }));
vi.mock("../services/chatRealtime", () => ({ chatRealtime }));

import { useChatUnreadCount } from "./useChatUnreadCount";

beforeEach(() => {
  chatApi.conversations.mockReset();
  chatRealtime.subscribe.mockClear();
});
afterEach(() => cleanup());

describe("useChatUnreadCount", () => {
  it("sums unread counts across all inbox pages", async () => {
    chatApi.conversations
      .mockResolvedValueOnce({ items: [{ unreadCount: 2 }], hasMore: true, nextCursor: "next-page" })
      .mockResolvedValueOnce({ items: [{ unreadCount: 3 }], hasMore: false, nextCursor: null });

    const { result } = renderHook(() => useChatUnreadCount("viewer-1"));

    await waitFor(() => expect(result.current).toBe(5));
    expect(chatApi.conversations.mock.calls.map((call) => call.slice(0, 3))).toEqual([
      ["viewer-1", undefined, 100],
      ["viewer-1", "next-page", 100],
    ]);
  });

  it("reconciles the paged count after the current user advances a read cursor", async () => {
    chatApi.conversations
      .mockResolvedValueOnce({ items: [{ unreadCount: 2 }], hasMore: false, nextCursor: null })
      .mockResolvedValueOnce({ items: [{ unreadCount: 0 }], hasMore: false, nextCursor: null });
    let onEvent!: (event: { type: string; actorId?: string; message?: { senderId: string } }) => void;
    chatRealtime.subscribe.mockImplementation((_userId, listener) => { onEvent = listener; return vi.fn(); });
    const { result } = renderHook(() => useChatUnreadCount("viewer-1"));
    await waitFor(() => expect(result.current).toBe(2));

    act(() => onEvent({ type: "CURSOR_UPDATED", actorId: "viewer-1" }));

    await waitFor(() => expect(result.current).toBe(0));
    expect(chatApi.conversations).toHaveBeenCalledTimes(2);
  });
});
