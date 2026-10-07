import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { profileApi, type ConnectionUserDto } from "../api/profile.api";
import { useProfileConnections } from "./useProfileConnections";

vi.mock("../api/profile.api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../api/profile.api")>();
  return {
    ...actual,
    profileApi: {
      ...actual.profileApi,
      getConnections: vi.fn(),
      follow: vi.fn(),
      unfollow: vi.fn(),
    },
  };
});

const row: ConnectionUserDto = {
  id: "edge-1",
  userId: "user-1",
  username: "user",
  displayName: "User",
  relationshipAction: "Follow back",
  viewerFollowsUser: false,
  userFollowsViewer: true,
  friend: false,
};

describe("useProfileConnections", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads the current profile connection page and exposes its rows", async () => {
    vi.mocked(profileApi.getConnections).mockResolvedValue({ users: [row] } as Awaited<ReturnType<typeof profileApi.getConnections>>);

    const { result } = renderHook(() => useProfileConnections({
      profileId: "owner",
      viewerId: "viewer",
      tab: "FOLLOWERS",
      query: "user",
      sort: "NAME",
    }));

    await waitFor(() => expect(result.current.state).toBe("ready"));
    expect(profileApi.getConnections).toHaveBeenCalledWith({
      profileId: "owner",
      viewerId: "viewer",
      tab: "FOLLOWERS",
      query: "user",
      sort: "NAME",
    });
    expect(result.current.rows).toEqual([row]);
  });

  it("does not load until a profile is selected", () => {
    renderHook(() => useProfileConnections({
      profileId: undefined,
      viewerId: "viewer",
      tab: "FOLLOWERS",
      query: "",
      sort: "RECENT",
    }));

    expect(profileApi.getConnections).not.toHaveBeenCalled();
  });

  it("follows back through the shared profile relationship flow", async () => {
    vi.mocked(profileApi.getConnections).mockResolvedValue({ users: [row] } as Awaited<ReturnType<typeof profileApi.getConnections>>);
    const { result } = renderHook(() => useProfileConnections({
      profileId: "owner",
      viewerId: "viewer",
      tab: "FOLLOWERS",
      query: "",
      sort: "RECENT",
    }));

    await waitFor(() => expect(result.current.state).toBe("ready"));
    await act(async () => result.current.changeRelationship(row));

    expect(profileApi.follow).toHaveBeenCalledWith("viewer", "user-1");
    expect(profileApi.getConnections).toHaveBeenCalledTimes(2);
  });

  it("removes a row only after an unfollow succeeds", async () => {
    vi.mocked(profileApi.getConnections).mockResolvedValue({ users: [row] } as Awaited<ReturnType<typeof profileApi.getConnections>>);
    const { result } = renderHook(() => useProfileConnections({
      profileId: "owner",
      viewerId: "viewer",
      tab: "FOLLOWING",
      query: "",
      sort: "RECENT",
    }));

    await waitFor(() => expect(result.current.rows).toEqual([row]));
    await act(async () => result.current.removeRelationship("viewer", "user-1", "user-1"));

    expect(profileApi.unfollow).toHaveBeenCalledWith("viewer", "user-1");
    expect(result.current.rows).toEqual([]);
  });
});
