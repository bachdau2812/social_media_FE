import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiGet, apiSend } from "../../../shared/api";
import { profileApi } from "./profile.api";

vi.mock("../../../shared/api", () => ({
  apiGet: vi.fn(),
  apiSend: vi.fn(),
}));

describe("profileApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads connection rows with the current filters and page bounds", () => {
    profileApi.getConnections({
      profileId: "owner/id",
      viewerId: "viewer id",
      tab: "FOLLOWERS",
      query: "Bach Nguyen",
      sort: "NAME",
    });

    expect(apiGet).toHaveBeenCalledWith(
      "/profiles/owner%2Fid/connections?viewerId=viewer%20id&tab=FOLLOWERS&query=Bach%20Nguyen&sort=NAME&page=0&size=40",
    );
  });

  it("forwards cancellation to similar-user discovery", () => {
    const signal = new AbortController().signal;
    profileApi.getSimilarUsers("owner", "viewer", signal);

    expect(apiGet).toHaveBeenCalledWith(
      "/search/users/owner/similar?viewerId=viewer&page=0&size=20",
      { signal },
    );
  });

  it("keeps follow and unfollow payloads in the profile API boundary", () => {
    profileApi.follow("viewer", "target");
    profileApi.unfollow("viewer", "target");

    expect(apiSend).toHaveBeenNthCalledWith(1, "/user-followers/follow", "POST", {
      followerId: "viewer",
      followingId: "target",
    });
    expect(apiSend).toHaveBeenNthCalledWith(
      2,
      "/user-followers/unfollow?followerId=viewer&followingId=target",
      "DELETE",
    );
  });

  it("saves profile work and basic details through named operations", () => {
    const job = { id: "job-1", userId: "owner", position: "Engineer" };
    const details = { userId: "owner", livingIn: "Da Nang", homeTown: "Hue", hobbieList: ["books"] };

    profileApi.saveJob(job, "PUT");
    profileApi.updateBasicDetails(details);

    expect(apiSend).toHaveBeenNthCalledWith(1, "/user-jobs", "PUT", job);
    expect(apiSend).toHaveBeenNthCalledWith(2, "/user-details/update", "PUT", details);
  });
});
