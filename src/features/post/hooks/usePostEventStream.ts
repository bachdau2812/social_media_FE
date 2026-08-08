import { useEffect, useRef } from "react";
import { API_BASE_URL } from "../../../shared/api";
import {
  MUSIC_FETCH_RESULT_EVENT,
  isMusicDto,
  isMusicFetchFailedEvent,
  type MusicFetchResult,
} from "../../../shared/music";

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
    const forwardMusicResult = (kind: MusicFetchResult["kind"]) => (event: Event) => {
      try {
        const data: unknown = JSON.parse((event as MessageEvent).data);
        const detail: MusicFetchResult | null = kind === "success"
          ? isMusicDto(data) ? { kind, music: data } : null
          : isMusicFetchFailedEvent(data) ? { kind, ...data } : null;
        if (detail) {
          window.dispatchEvent(new CustomEvent<MusicFetchResult>(MUSIC_FETCH_RESULT_EVENT, { detail }));
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
