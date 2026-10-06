import { apiGet, apiSend, type ApiRequestOptions } from "../../../shared/api";
import type { PostDetailsDto, PostInteractionAcceptedResponse, PostInteractionRequest, PostUpdateRequest } from "../model/post.dto";

export const postApi = {
  recordInteraction(request: PostInteractionRequest, options: ApiRequestOptions = {}) {
    return apiSend<PostInteractionAcceptedResponse>("/posts/interaction", "POST", request, options);
  },
  getDetail(postId: string, viewerId?: string) {
    const query = viewerId ? `?viewerId=${encodeURIComponent(viewerId)}` : "";
    return apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(postId)}${query}`);
  },
  update(request: PostUpdateRequest) {
    return apiSend<PostDetailsDto>("/posts", "PUT", request);
  },
};
