import { useEffect, useRef } from "react";
import { API_BASE_URL } from "../../../shared/api";
import {
  MUSIC_FETCH_RESULT_EVENT,
  isMusicDto,
  isMusicFetchFailedEvent,
  type MusicFetchResult,
} from "../../../shared/music";

export type ContentUploadResult = {
  kind: "post" | "story";
  success: boolean;
  message?: string;
  result?: string;
};

export type PostUploadEvent = ContentUploadResult;

type PostEventStreamHandlers = {
  onUploadResult: (event: ContentUploadResult) => void;
  onMusicFetchResult?: (event: MusicFetchResult) => void;
};

export function usePostEventStream(
  userId: string | null | undefined,
  handlers: PostEventStreamHandlers,
  dependencyKey?: unknown,
) {
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    if (!userId) return;
    const source = new EventSource(`${API_BASE_URL}/posts/sse/${encodeURIComponent(userId)}`, { withCredentials: true });
    const forwardUploadResult = (kind: ContentUploadResult["kind"]) => (event: Event) => {
      let message: string | undefined;
      let result: string | undefined;
      try {
        const data = JSON.parse((event as MessageEvent).data) as { message?: unknown; result?: unknown };
        message = typeof data.message === "string" ? data.message : undefined;
        result = typeof data.result === "string" ? data.result : undefined;
      } catch {
        // A malformed terminal event is still reported as a safe failure.
      }
      const normalizedResult = result?.toUpperCase();
      handlersRef.current.onUploadResult({
        kind,
        success: kind === "post" ? normalizedResult === "SUCCESSED" : normalizedResult === "APPROVED",
        message,
        result,
      });
    };
    source.addEventListener("post_upload", forwardUploadResult("post"));
    source.addEventListener("story_upload_event", forwardUploadResult("story"));
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
    const forwardMusicResult = (kind: MusicFetchResult["kind"]) => (event: Event) => {
      try {
        const data: unknown = JSON.parse((event as MessageEvent).data);
        const detail: MusicFetchResult | null = kind === "success"
          ? isMusicDto(data) ? { kind, music: data } : null
          : isMusicFetchFailedEvent(data) ? { kind, ...data } : null;
        if (detail) {
          window.dispatchEvent(new CustomEvent<MusicFetchResult>(MUSIC_FETCH_RESULT_EVENT, { detail }));
          handlersRef.current.onMusicFetchResult?.(detail);
        }
      } catch {
        // Ignore one malformed music event without interrupting the shared SSE connection.
      }
    };
    source.addEventListener("music_fetch_success", forwardMusicResult("success"));
    source.addEventListener("music_fetch_failed", forwardMusicResult("failure"));
    source.onerror = () => undefined;
    return () => source.close();
  }, [userId, dependencyKey]);
}
