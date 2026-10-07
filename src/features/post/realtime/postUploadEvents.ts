export const POST_UPLOAD_EVENT_TYPE = "post_upload";
export const COMMENT_MEDIA_RESULT_EVENT = "comment-media-result";
export const COMMENT_MEDIA_EVENT_TYPES = ["comment_success_event", "comment_failed_event"] as const;

export type ContentUploadResult = {
  kind: "post";
  success: boolean;
  message?: string;
  result?: string;
};

export type CommentMediaResult = {
  commentId?: string;
  postId?: string;
  message?: string;
  result?: string;
};

export function parsePostUploadEvent(payload: string): ContentUploadResult {
  let message: string | undefined;
  let result: string | undefined;
  try {
    const value: unknown = JSON.parse(payload);
    if (value && typeof value === "object") {
      const data = value as Record<string, unknown>;
      message = typeof data.message === "string" ? data.message : undefined;
      result = typeof data.result === "string" ? data.result : undefined;
    }
  } catch { /* A malformed terminal event is surfaced as a safe failure. */ }
  return { kind: "post", success: result?.toUpperCase() === "SUCCESSED", message, result };
}

export function parseCommentMediaEvent(payload: string): CommentMediaResult | null {
  try {
    const value: unknown = JSON.parse(payload);
    if (!value || typeof value !== "object") return null;
    const data = value as Record<string, unknown>;
    return {
      commentId: typeof data.commentId === "string" ? data.commentId : undefined,
      postId: typeof data.postId === "string" ? data.postId : undefined,
      message: typeof data.message === "string" ? data.message : undefined,
      result: typeof data.result === "string" ? data.result : undefined,
    };
  } catch { return null; }
}

export function publishCommentMediaEvent(payload: string) {
  const detail = parseCommentMediaEvent(payload);
  if (detail) window.dispatchEvent(new CustomEvent<CommentMediaResult>(COMMENT_MEDIA_RESULT_EVENT, { detail }));
  return detail;
}
