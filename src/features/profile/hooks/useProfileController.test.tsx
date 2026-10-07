import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../api/profile.api", () => ({
  profileApi: { getSummary: vi.fn() },
}));
vi.mock("../model/profile.mapper", () => ({
  profileToView: vi.fn((dto) => ({ id: dto.user.userId, username: dto.user.username })),
}));

import { profileApi } from "../api/profile.api";
import { profileToView } from "../model/profile.mapper";
import { useProfileController } from "./useProfileController";

afterEach(() => vi.clearAllMocks());

describe("useProfileController", () => {
  it("loads and maps profile summaries through the profile feature", async () => {
    const dto = { user: { userId: "profile-1", username: "profile" } } as any;
    vi.mocked(profileApi.getSummary).mockResolvedValue(dto);
    const { result } = renderHook(() => useProfileController());

    await expect(result.current.loadSummary("profile-1", "viewer-1")).resolves.toEqual({ id: "profile-1", username: "profile" });

    expect(profileApi.getSummary).toHaveBeenCalledWith("profile-1", "viewer-1", 18, expect.any(AbortSignal));
    expect(profileToView).toHaveBeenCalledWith(dto);
  });

  it("cancels the previous profile request and aborts its last request on unmount", async () => {
    vi.mocked(profileApi.getSummary).mockImplementation(() => new Promise(() => {}));
    const { result, unmount } = renderHook(() => useProfileController());
    let first: Promise<unknown>;
    let second: Promise<unknown>;

    act(() => { first = result.current.loadSummary("profile-1", "viewer-1"); });
    const firstSignal = vi.mocked(profileApi.getSummary).mock.calls[0][3]!;
    act(() => { second = result.current.loadSummary("profile-2", "viewer-1"); });
    const secondSignal = vi.mocked(profileApi.getSummary).mock.calls[1][3]!;

    expect(firstSignal.aborted).toBe(true);
    expect(secondSignal.aborted).toBe(false);
    unmount();
    expect(secondSignal.aborted).toBe(true);
    void first!;
    void second!;
  });

  it("aborts the current read when the authenticated viewer changes", async () => {
    vi.mocked(profileApi.getSummary).mockImplementation(() => new Promise(() => {}));
    const { result, rerender } = renderHook(({ viewerId }) => useProfileController(viewerId), { initialProps: { viewerId: "viewer-1" } });

    act(() => { void result.current.loadSummary("profile-1", "viewer-1"); });
    const signal = vi.mocked(profileApi.getSummary).mock.calls[0][3]!;
    rerender({ viewerId: "viewer-2" });

    expect(signal.aborted).toBe(true);
  });
});
