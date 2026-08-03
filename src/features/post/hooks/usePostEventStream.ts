import { useEffect, useRef } from "react";
import { API_BASE_URL } from "../../../shared/api";

export type PostUploadEvent = { message?: string; result?: string };

export function usePostEventStream(
  userId: string | null | undefined,
  onPostUpload: (event: PostUploadEvent) => void,
  dependencyKey?: unknown,
) {
  const onPostUploadRef = useRef(onPostUpload);
  useEffect(() => {
    onPostUploadRef.current = onPostUpload;
  }, [onPostUpload]);

  useEffect(() => {
    if (!userId) return;
    const source = new EventSource(`${API_BASE_URL}/posts/sse/${encodeURIComponent(userId)}`, { withCredentials: true });
    source.addEventListener("post_upload", (event) => {
      try {
        onPostUploadRef.current(JSON.parse((event as MessageEvent).data) as PostUploadEvent);
      } catch {
        onPostUploadRef.current({});
      }
    });
    const forwardCommentResult = (event: Event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data) as {
          commentId?: string;
          postId?: string;
          message?: string;
          result?: string;
        };
        window.dispatchEvent(new CustomEvent("comment-media-result", { detail: data }));
      } catch {
        // Keep the SSE connection alive when one event payload is malformed.
      }
    };
    source.addEventListener("comment_success_event", forwardCommentResult);
    source.addEventListener("comment_failed_event", forwardCommentResult);
    source.onerror = () => undefined;
    return () => source.close();
  }, [userId, dependencyKey]);
}
