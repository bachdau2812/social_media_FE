import { useCallback } from "react";
import { postApi } from "../api/post.api";
import type { Post } from "../model/post.types";

export type PostMutationKey = "liked" | "saved" | "reposted";
type PostUpdater = (post: Post) => Post;

export type PostMutationAdapters = {
  userId?: string;
  getPost: (postId: string) => Post | undefined;
  updatePost: (postId: string, update: PostUpdater) => void;
  onError: (message: string) => void;
  savePost: (userId: string, postId: string) => Promise<unknown>;
};

export function usePostMutationController({ userId, getPost, updatePost, onError, savePost }: PostMutationAdapters) {
  const togglePost = useCallback(async (postId: string, key: PostMutationKey) => {
    if (!userId) return;
    const post = getPost(postId);
    if (!post) return;
    const previous = post.viewerState[key];
    const active = !previous;
    const patchState = (nextActive: boolean) => updatePost(postId, (current) => {
      if (current.viewerState[key] === nextActive) return current;
      const next: Post = { ...current, viewerState: { ...current.viewerState, [key]: nextActive } };
      if (key === "liked") next.engagement = { ...next.engagement, likes: Math.max(0, next.engagement.likes + (nextActive ? 1 : -1)) };
      if (key === "reposted") next.engagement = { ...next.engagement, reposts: Math.max(0, next.engagement.reposts + (nextActive ? 1 : -1)) };
      return next;
    });

    patchState(active);
    try {
      if (key === "liked") await postApi.like(userId, postId);
      else if (key === "saved") await savePost(userId, postId);
      else {
        const response = await postApi.repost(userId, postId, active);
        updatePost(postId, (current) => ({
          ...current,
          viewerState: { ...current.viewerState, reposted: response.reposted },
          engagement: { ...current.engagement, reposts: response.repostCount },
        }));
      }
    } catch {
      patchState(previous);
      onError("Không thể cập nhật bài viết. Vui lòng thử lại.");
    }
  }, [userId, getPost, updatePost, onError, savePost]);

  const incrementCommentCount = useCallback((postId: string) => updatePost(postId, (post) => ({
    ...post,
    engagement: { ...post.engagement, comments: post.engagement.comments + 1 },
  })), [updatePost]);

  const applyEditedPost = useCallback((updated: Post) => updatePost(updated.id, (post) => ({ ...post, ...updated })), [updatePost]);

  return { togglePost, incrementCommentCount, applyEditedPost };
}
