import { apiGet, apiSend } from "../../../shared/api";

export type CommentDto = {
  id: string;
  postId: string;
  userId: string;
  parentId?: string | null;
  content?: string | null;
  commentType?: string | null;
  mediaUrl?: string | null;
  timestamp?: string | null;
  replyCount?: number;
  hasLiked?: boolean;
  username?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
};
export type CommentPage = { content: CommentDto[]; pageNumber: number; totalElements: number; totalPages: number };
export type CreateCommentRequest = {
  postId: string;
  userId: string;
  parentId: string | null;
  content: string;
  mediaList: Array<{ secureUrl: string; publicId: string; resourceType?: string }>;
};

export const commentApi = {
  pageByPost(postId: string, viewerId: string, page = 0, size = 10) {
    return apiGet<CommentPage>(`/frontend/comments/post/${encodeURIComponent(postId)}/page?viewerId=${encodeURIComponent(viewerId)}&page=${page}&size=${size}`);
  },
  byId(commentId: string) {
    return apiGet<CommentDto>(`/comments/${encodeURIComponent(commentId)}`);
  },
  replies(parentId: string, viewerId: string, page = 0, size = 10) {
    return apiGet<CommentDto[]>(`/frontend/comments/parent/${encodeURIComponent(parentId)}?viewerId=${encodeURIComponent(viewerId)}&page=${page}&size=${size}`);
  },
  create(request: CreateCommentRequest) {
    return apiSend<{ commentId: string; message?: string | null }>("/comments", "POST", request);
  },
  update(commentId: string, userId: string, content: string) {
    return apiSend<CommentDto>("/comments", "PUT", { commentId, userId, content });
  },
  toggleLike(viewerId: string, commentId: string) {
    return apiSend<{ targetId: string; targetType: string; liked: boolean; likeId?: string | null }>(
      `/likes/users/${encodeURIComponent(viewerId)}`, "POST", { targetId: commentId, targetType: "COMMENT" },
    );
  },
};
