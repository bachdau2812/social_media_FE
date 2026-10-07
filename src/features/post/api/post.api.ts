import { apiGet, apiSend, type ApiRequestOptions } from "../../../shared/api";
import type { CreatePostRequest, PostDetailsDto, PostInteractionAcceptedResponse, PostInteractionRequest, PostUpdateRequest, RepostToggleResponse } from "../model/post.dto";

export type Page<T> = { content: T[]; pageNumber: number; totalElements: number; totalPages: number };
export const postApi = {
  recordInteraction(request: PostInteractionRequest, options: ApiRequestOptions = {}) {
    return apiSend<PostInteractionAcceptedResponse>("/posts/interaction", "POST", request, options);
  },
  getDetail(postId: string, viewerId?: string) {
    const query = viewerId ? `?viewerId=${encodeURIComponent(viewerId)}` : "";
    return apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(postId)}${query}`);
  },
  getSurfaceDetail(postId: string) {
    return apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(postId)}?mediaType=POST`);
  },
  getRouteDetail(postId: string, signal: AbortSignal) {
    return apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(postId)}?mediaType=POST`, { signal });
  },
  update(request: PostUpdateRequest) {
    return apiSend<PostDetailsDto>("/posts", "PUT", request);
  },
  create(request: CreatePostRequest) {
    return apiSend<{ postId: string; message?: string }>("/posts", "POST", request);
  },
  like(userId: string, postId: string) {
    return apiSend(`/likes/users/${encodeURIComponent(userId)}`, "POST", { targetId: postId, targetType: "POST" });
  },
  repost(userId: string, postId: string, active: boolean) {
    return apiSend<RepostToggleResponse>(`/posts/${encodeURIComponent(postId)}/repost?actorId=${encodeURIComponent(userId)}`, active ? "POST" : "DELETE");
  },
  engagementActors(postId: string, kind: "LIKES" | "REPOSTS") {
    const endpoint = kind === "LIKES"
      ? `/likes/targets/${encodeURIComponent(postId)}/actors?targetType=POST&page=0&size=40`
      : `/posts/${encodeURIComponent(postId)}/reposts/actors?page=0&size=40`;
    return apiGet<Page<string>>(endpoint);
  },
};
