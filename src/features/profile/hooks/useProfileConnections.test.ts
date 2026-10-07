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
    expect(profileApi.getConnections).toHaveBeenCalledWith(expect.objectContaining({
      profileId: "owner",
      viewerId: "viewer",
      tab: "FOLLOWERS",
      query: "user",
      sort: "NAME",
    }));
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
    expect(profileApi.getConnections).toHaveBeenCalledTimes(1);
    expect(result.current.rows[0].relationshipAction).toBe("Following");
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

const options = { profileId: "owner", viewerId: "viewer", tab: "FOLLOWERS" as const, query: "", sort: "RECENT" as const };
const page = (users: ConnectionUserDto[], currentPage = 0, hasNextPage = false) => ({ users, currentPage, hasNextPage } as Awaited<ReturnType<typeof profileApi.getConnections>>);
it("appends overlapping pages once and retries a failed next page without losing rows", async () => {
  vi.mocked(profileApi.getConnections).mockReset().mockResolvedValueOnce(page([row], 0, true)).mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce(page([row, { ...row, userId: "second" }], 1));
  const { result } = renderHook(() => useProfileConnections(options));
  await waitFor(() => expect(result.current.state).toBe("ready"));
  await act(async () => result.current.loadMore());
  expect(result.current.rows).toEqual([row]);
  expect(result.current.error).toBe("offline");
  await act(async () => result.current.loadMore());
  expect(result.current.rows.map(item => item.userId)).toEqual(["user-1", "second"]);
  expect(result.current.hasMore).toBe(false);
});
it("ignores old searches after a new search completes and aborts their request", async () => {
  let resolveOld!: (value: ReturnType<typeof page>) => void;
  vi.mocked(profileApi.getConnections).mockReset().mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; })).mockResolvedValueOnce(page([{ ...row, userId: "new" }]));
  const { result, rerender } = renderHook(({ query }) => useProfileConnections({ ...options, query }), { initialProps: { query: "old" } });
  const signal = vi.mocked(profileApi.getConnections).mock.calls[0][0].signal;
  rerender({ query: "new" });
  await waitFor(() => expect(result.current.rows[0]?.userId).toBe("new"));
  await act(async () => resolveOld(page([row])));
  expect(result.current.rows[0].userId).toBe("new");
  expect(signal?.aborted).toBe(true);
});
