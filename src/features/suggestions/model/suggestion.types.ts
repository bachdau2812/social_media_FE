export type SuggestedUser = {
  userId: string;
  username: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  viewerFollowsUser: boolean;
  userFollowsViewer: boolean;
  friend: boolean;
  relationship?: string | null;
};

export type SuggestionPage = {
  content: SuggestedUser[];
  pageNumber: number;
  totalElements: number;
  totalPages: number;
};
