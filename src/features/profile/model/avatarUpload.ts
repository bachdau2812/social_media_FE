export const AVATAR_UPLOAD_RESULT_EVENT = "avatar-upload-result";

export type AvatarUploadResult = {
  userId: string;
  publicId: string;
  mediaUrl: string;
  result: "APPROVED" | "REJECTED";
  message?: string;
};

export function isAvatarUploadResult(value: unknown): value is AvatarUploadResult {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Partial<AvatarUploadResult>;
  return typeof data.userId === "string" && data.userId.length > 0
    && typeof data.publicId === "string" && data.publicId.length > 0
    && typeof data.mediaUrl === "string" && data.mediaUrl.length > 0
    && (data.result === "APPROVED" || data.result === "REJECTED")
    && (data.message === undefined || typeof data.message === "string");
}
