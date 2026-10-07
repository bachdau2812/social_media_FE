import { AVATAR_UPLOAD_RESULT_EVENT, isAvatarUploadResult, type AvatarUploadResult } from "../model/avatarUpload";

export const AVATAR_UPLOAD_EVENT_TYPE = "avatar_upload_event";

export function publishAvatarUploadEvent(payload: string, userId: string): AvatarUploadResult | null {
  try {
    const value: unknown = JSON.parse(payload);
    if (!isAvatarUploadResult(value) || value.userId !== userId) return null;
    window.dispatchEvent(new CustomEvent<AvatarUploadResult>(AVATAR_UPLOAD_RESULT_EVENT, { detail: value }));
    return value;
  } catch { return null; }
}
