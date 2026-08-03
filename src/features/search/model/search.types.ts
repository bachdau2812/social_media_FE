export type SearchRelationship = "none" | "follows_you" | "following" | "friends";

export type UserSearchResult = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  relationship: SearchRelationship;
  metadata?: string;
};

export type PostSearchMedia = {
  id: string;
  thumbnailUrl: string;
  mediaType: "IMAGE" | "VIDEO";
};

export type PostSearchResult = {
  id: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  caption: string;
  hashtags: string[];
  mediaRatio: string | null;
  createdAt: string | null;
  media: PostSearchMedia[];
  totalMediaItems: number;
};
