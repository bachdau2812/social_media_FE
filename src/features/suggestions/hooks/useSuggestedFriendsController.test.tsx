// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../api/suggestions.api", () => ({
  suggestionsApi: { list: vi.fn(), refresh: vi.fn(), follow: vi.fn() },
}));

import { suggestionsApi } from "../api/suggestions.api";
import type { SuggestionPage } from "../model/suggestion.types";
import { useSuggestedFriendsController } from "./useSuggestedFriendsController";

const first = { userId: "user-1", username: "one", viewerFollowsUser: false, userFollowsViewer: true, friend: false };
const second = { userId: "user-2", username: "two", viewerFollowsUser: false, userFollowsViewer: false, friend: false };

afterEach(() => vi.clearAllMocks());

describe("useSuggestedFriendsController", () => {
  it("loads suggestions with cancellation and keeps older account results out after a switch", async () => {
    let finishOld!: (value: SuggestionPage) => void;
    vi.mocked(suggestionsApi.list)
      .mockImplementationOnce(() => new Promise((resolve) => { finishOld = resolve; }))
      .mockResolvedValueOnce({ content: [second], pageNumber: 0, totalElements: 1, totalPages: 1 });
    const { result, rerender } = renderHook(({ viewerId }) => useSuggestedFriendsController(viewerId), { initialProps: { viewerId: "viewer-1" } });

    await waitFor(() => expect(suggestionsApi.list).toHaveBeenCalledTimes(1));
    const oldSignal = vi.mocked(suggestionsApi.list).mock.calls[0][3]!;
    rerender({ viewerId: "viewer-2" });
    await waitFor(() => expect(result.current.users).toEqual([second]));
    finishOld({ content: [first], pageNumber: 0, totalElements: 1, totalPages: 1 });

    expect(oldSignal.aborted).toBe(true);
    expect(result.current.users).toEqual([second]);
    expect(result.current.state).toBe("ready");
  });

  it("updates relationship state after following and reports failures without rejecting the UI action", async () => {
    vi.mocked(suggestionsApi.list).mockResolvedValue({ content: [first, second], pageNumber: 0, totalElements: 2, totalPages: 1 });
    vi.mocked(suggestionsApi.follow).mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("offline"));
    const { result } = renderHook(() => useSuggestedFriendsController("viewer-1"));
    await waitFor(() => expect(result.current.state).toBe("ready"));

    await act(async () => { expect(await result.current.follow(first)).toBe(true); });
    expect(result.current.users[0].viewerFollowsUser).toBe(true);
    await act(async () => { expect(await result.current.follow(second)).toBe(false); });
    expect(result.current.users[1].viewerFollowsUser).toBe(false);
    expect(result.current.actionError).toBeTruthy();
    expect(result.current.followingIds.size).toBe(0);
  });

  it("replaces the suggestion list when refreshed and supports hiding one entry", async () => {
    vi.mocked(suggestionsApi.list).mockResolvedValue({ content: [first, second], pageNumber: 0, totalElements: 2, totalPages: 1 });
    vi.mocked(suggestionsApi.refresh).mockResolvedValue({ content: [second], pageNumber: 0, totalElements: 1, totalPages: 1 });
    const { result } = renderHook(() => useSuggestedFriendsController("viewer-1"));
    await waitFor(() => expect(result.current.state).toBe("ready"));
    act(() => result.current.hide("user-1"));
    expect(result.current.users).toEqual([second]);
    await act(async () => { await result.current.refresh(); });
    expect(suggestionsApi.refresh).toHaveBeenCalledWith("viewer-1", 0, 30, expect.any(AbortSignal));
    expect(result.current.users).toEqual([second]);
  });
});
