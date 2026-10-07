import { apiGet, apiSend, type ApiRequestOptions } from "../../../shared/api";
import type { CreatePostRequest, PostDetailsDto, PostInteractionAcceptedResponse, PostInteractionRequest, PostUpdateRequest, RepostToggleResponse } from "../model/post.dto";

export type Page<T> = { content: T[]; pageNumber: number; totalElements: number; totalPages: number };
const surfaceDetails = new Map<string, { promise: Promise<PostDetailsDto>; expires: number }>();
function surfaceDetail(postId: string) {
  const cached = surfaceDetails.get(postId);
  if (cached && cached.expires > Date.now()) return cached.promise;
  const entry = { promise: apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(postId)}?mediaType=POST`, {}), expires: Date.now() + 10_000 };
  surfaceDetails.set(postId, entry);
  void entry.promise.catch(() => { if (surfaceDetails.get(postId) === entry) surfaceDetails.delete(postId); });
  if (surfaceDetails.size > 40) surfaceDetails.delete(surfaceDetails.keys().next().value!);
  return entry.promise;
}
function abortable<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(new DOMException('Aborted', 'AbortError'));
  return new Promise((resolve, reject) => {
    const abort = () => reject(new DOMException('Aborted', 'AbortError'));
    signal.addEventListener('abort', abort, { once: true });
    promise.then(value => { signal.removeEventListener('abort', abort); if (!signal.aborted) resolve(value); }, error => { signal.removeEventListener('abort', abort); reject(error); });
  });
}
export const postApi = {
  clearSurfaceDetailCache() { surfaceDetails.clear(); },
  invalidateSurfaceDetail(postId: string) { surfaceDetails.delete(postId); },
  recordInteraction(request: PostInteractionRequest, options: ApiRequestOptions = {}) {
    return apiSend<PostInteractionAcceptedResponse>("/posts/interaction", "POST", request, options);
  },
  getDetail(postId: string, viewerId?: string) {
    const query = viewerId ? `?viewerId=${encodeURIComponent(viewerId)}` : "";
    return apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(postId)}${query}`);
  },
  getSurfaceDetail(postId: string) {
    return surfaceDetail(postId);
  },
  getRouteDetail(postId: string, signal: AbortSignal) {
    return abortable(surfaceDetail(postId), signal);
  },
  update(request: PostUpdateRequest) {
    surfaceDetails.clear();
    return apiSend<PostDetailsDto>("/posts", "PUT", request);
  },
  create(request: CreatePostRequest) {
    surfaceDetails.clear();
    return apiSend<{ postId: string; message?: string }>("/posts", "POST", request);
  },
  like(userId: string, postId: string) {
    surfaceDetails.delete(postId);
    return apiSend(`/likes/users/${encodeURIComponent(userId)}`, "POST", { targetId: postId, targetType: "POST" });
  },
  repost(userId: string, postId: string, active: boolean) {
    surfaceDetails.delete(postId);
    return apiSend<RepostToggleResponse>(`/posts/${encodeURIComponent(postId)}/repost?actorId=${encodeURIComponent(userId)}`, active ? "POST" : "DELETE");
  },
  engagementActors(postId: string, kind: "LIKES" | "REPOSTS", page = 0, size = 40, options: ApiRequestOptions = {}) {
    const endpoint = kind === "LIKES"
      ? `/likes/targets/${encodeURIComponent(postId)}/actors?targetType=POST&page=${page}&size=${size}`
      : `/posts/${encodeURIComponent(postId)}/reposts/actors?page=${page}&size=${size}`;
    return options.signal ? apiGet<Page<string>>(endpoint, options) : apiGet<Page<string>>(endpoint);
  },
};
