import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { profileApi } from "../api/profile.api";
import { useProfileRelationship } from "./useProfileRelationship";

vi.mock("../api/profile.api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../api/profile.api")>();
  return {
    ...actual,
    profileApi: {
      ...actual.profileApi,
      follow: vi.fn(),
      unfollow: vi.fn(),
    },
  };
});

describe("useProfileRelationship", () => {
  it("updates optimistically and refreshes after follow succeeds", async () => {
    const onRefresh = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useProfileRelationship({
      viewerId: "viewer",
      profileId: "owner",
      viewerFollows: false,
      userFollowsViewer: true,
      friend: false,
      onRefresh,
    }));

    await act(async () => result.current.follow());

    expect(result.current.relationship).toBe("friends");
    expect(profileApi.follow).toHaveBeenCalledWith("viewer", "owner");
    expect(onRefresh).toHaveBeenCalledOnce();
    expect(result.current.pending).toBe(false);
  });

  it("restores the prior relationship when follow fails", async () => {
    vi.mocked(profileApi.follow).mockRejectedValueOnce(new Error("offline"));
    const { result } = renderHook(() => useProfileRelationship({
      viewerId: "viewer",
      profileId: "owner",
      viewerFollows: false,
      userFollowsViewer: false,
      friend: false,
      onRefresh: vi.fn(),
    }));

    await act(async () => result.current.follow());

    await waitFor(() => expect(result.current.relationship).toBe("none"));
    expect(result.current.pending).toBe(false);
  });

  it("updates optimistically on unfollow and refreshes on success", async () => {
    const onRefresh = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useProfileRelationship({
      viewerId: "viewer",
      profileId: "owner",
      viewerFollows: true,
      userFollowsViewer: true,
      friend: true,
      onRefresh,
    }));

    await act(async () => result.current.unfollow());

    expect(profileApi.unfollow).toHaveBeenCalledWith("viewer", "owner");
    expect(onRefresh).toHaveBeenCalledOnce();
    expect(result.current.pending).toBe(false);
  });
});
