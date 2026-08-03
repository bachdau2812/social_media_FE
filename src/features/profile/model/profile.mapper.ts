import { musicDtoToPostMusic, postItemDtosToMedia, normalizePostMediaRatio, type Post } from "../../post";
import type { ProfileDto, ProfilePostDto } from "./profile.dto";
import type { Profile } from "./profile.types";

export function profileToIdentity(data: ProfileDto) {
  return {
    username: data.user.username?.trim() || "",
    fullName: data.user.fullName?.trim() || "",
    avatarUrl: data.currentAvatar?.secureUrl || data.currentAvatar?.url || "",
  };
}

function profilePostToPost(item: ProfilePostDto): Post {
  const media = postItemDtosToMedia(item.postId, item.firstItem ? [item.firstItem] : []);
  const username = item.authorUsername?.trim() || "";
  return {
    id: item.postId,
    author: {
      id: item.userId,
      username,
      displayName: item.authorFullName?.trim() || username || "Người dùng",
      avatarUrl: item.authorAvatarUrl || "",
    },
    createdAt: item.createdAt || "",
    layoutVariant: media.length ? "STANDARD" : "TEXT",
    mediaRatio: normalizePostMediaRatio(item.mediaRatio),
    caption: item.content || "",
    hashtags: item.hashtags ?? [],
    music: musicDtoToPostMusic(item.music),
    media,
    engagement: {
      likes: item.likeCount,
      comments: item.commentCount,
      reposts: item.repostCount,
      shares: 0,
      saves: 0,
    },
    viewerState: {
      liked: item.likedByCurrentUser,
      saved: false,
      reposted: item.repostedByCurrentUser,
    },
    comments: [],
  };
}

export function profileToView(data: ProfileDto): Profile {
  const identity = profileToIdentity(data);
  const username = identity.username;
  const posts = data.recentPosts.map(profilePostToPost);
  const reposts = data.repostedPosts.map(profilePostToPost).map((post) => ({
    ...post,
    viewerState: { ...post.viewerState, reposted: true },
    engagement: { ...post.engagement, reposts: Math.max(1, post.engagement.reposts) },
  }));
  return {
    id: data.user.userId,
    username,
    displayName: identity.fullName || username || "Người dùng",
    avatarUrl: identity.avatarUrl,
    currentCity: data.user.livingIn?.trim() || undefined,
    hometown: data.user.hometown?.trim() || undefined,
    hobbies: data.user.hobbyList.map((item) => item.trim()).filter(Boolean),
    jobs: data.jobs.map((item) => ({ ...item, isPublic: item.public })),
    universities: data.universities.map((item) => ({
      ...item,
      isGraduate: item.graduate,
      isPublic: item.public,
    })),
    highSchools: data.highSchools.map((item) => ({
      ...item,
      isGraduate: item.graduate,
      isPublic: item.public,
    })),
    socialLinks: data.socialMedia
      .filter((item) => Boolean(item.link?.trim()))
      .map((item) => ({ id: item.id, link: item.link!.trim() })),
    followerCount: data.followerCount,
    followingCount: data.followingCount,
    friendCount: data.friendCount,
    friend: data.friend,
    viewerFollows: data.viewerFollowsUser,
    userFollowsViewer: data.userFollowsViewer,
    posts,
    reposts,
  };
}
