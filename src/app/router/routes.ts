export const routes = {
  home: "/",
  search: "/search",
  notifications: "/notifications",
  library: "/library",
  settings: "/settings",
  chat: "/chat",
  profile: (userId: string) => `/profile/${encodeURIComponent(userId)}`,
  post: (postId: string) => `/post/${encodeURIComponent(postId)}`,
  story: (ownerId: string, storyId?: string) => `/story/${encodeURIComponent(ownerId)}${storyId ? `/${encodeURIComponent(storyId)}` : ""}`,
  createPost: "/create/post",
  createStory: "/create/story",
  createReel: "/create/reel",
} as const;
