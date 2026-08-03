import { describe, expect, it } from "vitest";
import { profileToIdentity, profileToView } from "./profile.mapper";
import type { ProfileDto } from "./profile.dto";

const profile: ProfileDto = {
  user: {
    userId: "user-1",
    username: null,
    fullName: null,
    dob: null,
    sex: null,
    hometown: null,
    livingIn: null,
    hobbyList: [],
  },
  currentAvatar: null,
  followerCount: 1,
  followingCount: 2,
  friendCount: 3,
  viewerFollowsUser: false,
  userFollowsViewer: false,
  friend: false,
  socialMedia: [{ id: "social-1", userId: "user-1", link: "https://example.com" }],
  jobs: [{ id: "job-1", userId: "user-1", companyName: "OpenAI", position: "Engineer", fromDate: null, toDate: null, public: false }],
  universities: [{ id: "uni-1", userId: "user-1", schoolName: "UIT", major: null, from: null, to: null, graduate: true, public: true }],
  highSchools: [{ id: "school-1", userId: "user-1", schoolName: "THPT", fromDate: null, toDate: null, graduate: true, public: true }],
  recentPosts: [],
  repostedPosts: [],
};

describe("profileToView", () => {
  it("normalizes profile identity once for cross-feature owner labels", () => {
    expect(profileToIdentity({
      ...profile,
      user: { ...profile.user, username: "  bach  ", fullName: "  Đậu Đức Bách  " },
      currentAvatar: { secureUrl: "https://cdn/avatar.jpg", url: "https://legacy/avatar.jpg" },
    })).toEqual({ username: "bach", fullName: "Đậu Đức Bách", avatarUrl: "https://cdn/avatar.jpg" });
  });

  it("uses only current backend field names and never turns the user ID into a display name", () => {
    const view = profileToView(profile);

    expect(view).toMatchObject({ id: "user-1", username: "", displayName: "Người dùng", friendCount: 3 });
    expect(view.socialLinks).toEqual([{ id: "social-1", link: "https://example.com" }]);
    expect(view.jobs[0].isPublic).toBe(false);
    expect(view.universities[0]).toMatchObject({ isGraduate: true, isPublic: true });
  });
});
