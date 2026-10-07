import { useEffect, useRef } from "react";
import { publishAvatarUploadEvent, AVATAR_UPLOAD_EVENT_TYPE } from "../../features/profile/avatar/avatarEvents";
import type { AvatarUploadResult } from "../../features/profile/model/avatarUpload";
import { parsePostUploadEvent, POST_UPLOAD_EVENT_TYPE, publishCommentMediaEvent, COMMENT_MEDIA_EVENT_TYPES } from "../../features/post/realtime/postUploadEvents";
import type { ContentUploadResult } from "../../features/post/realtime/postUploadEvents";
import { parseStoryUploadEvent, STORY_UPLOAD_EVENT_TYPE } from "../../features/story/realtime/storyUploadEvents";
import type { StoryUploadResult } from "../../features/story/model/storyUploadResult";
import { MUSIC_FETCH_FAILED_EVENT_TYPE, MUSIC_FETCH_SUCCESS_EVENT_TYPE, parseMusicFetchEvent, publishMusicFetchEvent } from "../../shared/music/musicFetchEvents";
import type { MusicFetchResult } from "../../shared/music/musicCatalog";
import { subscribeAccountEvents } from "../../shared/realtime/accountEventStream";

export type AccountRealtimeHandlers = {
  onPostUploadResult?: (event: ContentUploadResult) => void;
  onStoryUploadResult?: (event: StoryUploadResult) => void;
  onAvatarUploadResult?: (event: AvatarUploadResult) => void;
  onMusicFetchResult?: (event: MusicFetchResult) => void;
};

const ACCOUNT_EVENT_TYPES = [
  POST_UPLOAD_EVENT_TYPE,
  STORY_UPLOAD_EVENT_TYPE,
  AVATAR_UPLOAD_EVENT_TYPE,
  MUSIC_FETCH_SUCCESS_EVENT_TYPE,
  MUSIC_FETCH_FAILED_EVENT_TYPE,
  ...COMMENT_MEDIA_EVENT_TYPES,
] as const;

/** App-level event composition; each domain parser and side effect stays with its owner. */
export function useAccountRealtime(userId: string | null | undefined, handlers: AccountRealtimeHandlers) {
  const handlersRef = useRef(handlers);
  useEffect(() => { handlersRef.current = handlers; }, [handlers]);

  useEffect(() => {
    if (!userId) return;
    return subscribeAccountEvents(userId, ACCOUNT_EVENT_TYPES, (event) => {
      if (event.type === POST_UPLOAD_EVENT_TYPE) {
        handlersRef.current.onPostUploadResult?.(parsePostUploadEvent(event.data));
      } else if (event.type === STORY_UPLOAD_EVENT_TYPE) {
        handlersRef.current.onStoryUploadResult?.(parseStoryUploadEvent(event.data));
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
  }, [userId]);
}
