import type { Post } from "../../post";

export type ProfileJob = { id: string; companyName?: string | null; position?: string | null; fromDate?: string | null; toDate?: string | null; isPublic: boolean };
export type ProfileUniversity = { id: string; schoolName?: string | null; major?: string | null; from?: string | null; to?: string | null; isGraduate: boolean; isPublic: boolean };
export type ProfileHighSchool = { id: string; schoolName?: string | null; fromDate?: string | null; toDate?: string | null; isGraduate: boolean; isPublic: boolean };
export type ProfileSocialLink = { id: string; link: string };

export type Profile = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  relationship?: "NONE" | "FOLLOWING" | "FOLLOWED_BY" | "FRIEND";
  currentCity?: string;
  hometown?: string;
  hobbies: string[];
  jobs: ProfileJob[];
  universities: ProfileUniversity[];
  highSchools: ProfileHighSchool[];
  socialLinks: ProfileSocialLink[];
  followerCount: number;
  followingCount: number;
  friend: boolean;
  viewerFollows: boolean;
  friendCount: number;
  posts: Post[];
  reposts: Post[];
  userFollowsViewer: boolean;
};
