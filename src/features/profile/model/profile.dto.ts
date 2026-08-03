import type { PostItemDto, PostMusicDto } from "../../post";

export type ProfileJobDto = {
  id: string;
  userId: string;
  companyName: string | null;
  position: string | null;
  fromDate: string | null;
  toDate: string | null;
  public: boolean;
};

export type ProfileUniversityDto = {
  id: string;
  userId: string;
  schoolName: string | null;
  major: string | null;
  from: string | null;
  to: string | null;
  graduate: boolean;
  public: boolean;
};

export type ProfileHighSchoolDto = {
  id: string;
  userId: string;
  schoolName: string | null;
  fromDate: string | null;
  toDate: string | null;
  graduate: boolean;
  public: boolean;
};

export type ProfileSocialLinkDto = { id: string; userId: string; link: string | null };

export type ProfilePostDto = {
  postId: string;
  userId: string;
  authorUsername: string | null;
  authorFullName: string | null;
  authorAvatarUrl: string | null;
  content: string | null;
  hashtags: string[] | null;
  mediaRatio: string | null;
  firstItem: PostItemDto | null;
  music: PostMusicDto | null;
  likeCount: number;
  commentCount: number;
  repostCount: number;
  likedByCurrentUser: boolean;
  repostedByCurrentUser: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ProfileDto = {
  user: {
    userId: string;
    username: string | null;
    fullName: string | null;
    dob: string | null;
    sex: string | null;
    hometown: string | null;
    livingIn: string | null;
    hobbyList: string[];
  };
  currentAvatar: { secureUrl: string | null; url: string | null } | null;
  followerCount: number;
  followingCount: number;
  friendCount: number;
  viewerFollowsUser: boolean;
  userFollowsViewer: boolean;
  friend: boolean;
  socialMedia: ProfileSocialLinkDto[];
  jobs: ProfileJobDto[];
  universities: ProfileUniversityDto[];
  highSchools: ProfileHighSchoolDto[];
  recentPosts: ProfilePostDto[];
  repostedPosts: ProfilePostDto[];
};
