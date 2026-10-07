export { MusicSegmentEditor, type MusicSegmentEditorProps } from "./MusicSegmentEditor";
export { MusicTrackBrowser, type MusicTrackBrowserProps } from "./MusicTrackBrowser";
export { musicCatalogApi, type MusicPage } from "./music.api";
export {
  DEFAULT_SEGMENT_SECONDS,
  MAX_SEGMENT_SECONDS,
  MIN_SEGMENT_SECONDS,
  moveMusicHandle,
  moveMusicWindow,
  normalizeMusicSegment,
  type MusicHandle,
  type MusicSegment,
} from "./musicSegment";
export {
  useMusicSegmentPreview,
  type MusicPreviewTrack,
} from "./useMusicSegmentPreview";
export { useMusicFetchController, type MusicFetchControllerOptions } from "./useMusicFetchController";
export {
  MUSIC_FETCH_RESULT_EVENT,
  isMusicDto,
  isMusicFetchFailedEvent,
  requestMusicFetch,
  type MusicDto,
  type MusicFetchAcceptedResponse,
  type MusicFetchFailedEvent,
  type MusicFetchResult,
  type MusicFetchStatus,
} from "./musicCatalog";
