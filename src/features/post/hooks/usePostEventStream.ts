import { useEffect, useRef } from "react";
import { publishAvatarUploadEvent, AVATAR_UPLOAD_EVENT_TYPE, type AvatarUploadResult } from "../../profile/public";
import { COMMENT_MEDIA_EVENT_TYPES, parsePostUploadEvent, POST_UPLOAD_EVENT_TYPE, publishCommentMediaEvent } from "../realtime/postUploadEvents";
import type { ContentUploadResult } from "../realtime/postUploadEvents";
import { MUSIC_FETCH_FAILED_EVENT_TYPE, MUSIC_FETCH_SUCCESS_EVENT_TYPE, parseMusicFetchEvent, publishMusicFetchEvent } from "../../../shared/music/musicFetchEvents";
import type { MusicFetchResult } from "../../../shared/music/musicCatalog";
import { STORY_UPLOAD_EVENT_TYPE } from "../../story/public";
import { subscribeAccountEvents } from "../../../shared/realtime/accountEventStream";

export type { ContentUploadResult } from "../realtime/postUploadEvents";
export type PostUploadEvent = ContentUploadResult;

type PostEventStreamHandlers = {
  onUploadResult: (event: ContentUploadResult) => void;
  /** @deprecated Use app composition for parsed story upload results. */
  onStoryUploadResult?: (payload: string) => void;
  onMusicFetchResult?: (event: MusicFetchResult) => void;
  onAvatarUploadResult?: (event: AvatarUploadResult) => void;
};

const LEGACY_POST_EVENT_TYPES = [
  POST_UPLOAD_EVENT_TYPE,
  STORY_UPLOAD_EVENT_TYPE,
  AVATAR_UPLOAD_EVENT_TYPE,
  MUSIC_FETCH_SUCCESS_EVENT_TYPE,
  MUSIC_FETCH_FAILED_EVENT_TYPE,
  ...COMMENT_MEDIA_EVENT_TYPES,
] as const;

/** Compatibility adapter for callers still using the former post-owned SSE hook. */
export function usePostEventStream(
  userId: string | null | undefined,
  handlers: PostEventStreamHandlers,
  dependencyKey?: unknown,
) {
  const handlersRef = useRef(handlers);
  useEffect(() => { handlersRef.current = handlers; }, [handlers]);

  useEffect(() => {
    if (!userId) return;
    return subscribeAccountEvents(userId, LEGACY_POST_EVENT_TYPES, (event) => {
      if (event.type === POST_UPLOAD_EVENT_TYPE) {
        handlersRef.current.onUploadResult(parsePostUploadEvent(event.data));
      } else if (event.type === STORY_UPLOAD_EVENT_TYPE) {
        handlersRef.current.onStoryUploadResult?.(event.data);
      } else if (event.type === AVATAR_UPLOAD_EVENT_TYPE) {
        const result = publishAvatarUploadEvent(event.data, userId);
        if (result) handlersRef.current.onAvatarUploadResult?.(result);
      } else if (event.type === MUSIC_FETCH_SUCCESS_EVENT_TYPE || event.type === MUSIC_FETCH_FAILED_EVENT_TYPE) {
        const result = parseMusicFetchEvent(event.type, event.data);
        if (result) {
          publishMusicFetchEvent(result);
          handlersRef.current.onMusicFetchResult?.(result);
        }
      } else if ((COMMENT_MEDIA_EVENT_TYPES as readonly string[]).includes(event.type)) {
        publishCommentMediaEvent(event.data);
      }
    });
  }, [userId, dependencyKey]);
}
