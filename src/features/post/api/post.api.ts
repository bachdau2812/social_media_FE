import { apiGet, apiSend } from "../../../shared/api";
import type { PostDetailsDto, PostUpdateRequest } from "../model/post.dto";

export const postApi = {
  getDetail(postId: string, viewerId?: string) {
    const query = viewerId ? `?viewerId=${encodeURIComponent(viewerId)}` : "";
    return apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(postId)}${query}`);
  },
  update(request: PostUpdateRequest) {
    return apiSend<PostDetailsDto>("/posts", "PUT", request);
  },
};
