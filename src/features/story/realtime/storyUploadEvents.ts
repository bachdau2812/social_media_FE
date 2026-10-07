import { parseStoryUploadResult, type StoryUploadResult } from "../model/storyUploadResult";

export const STORY_UPLOAD_EVENT_TYPE = "story_upload_event";

export function parseStoryUploadEvent(payload: string): StoryUploadResult {
  return parseStoryUploadResult(payload);
}
