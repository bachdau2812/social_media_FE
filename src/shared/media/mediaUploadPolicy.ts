import { apiGet } from "../api/apiClient";

const MEBIBYTE = 1024 * 1024;

export type MediaUploadPolicy = {
  imageMaxBytes: number;
  videoMaxBytes: number;
  audioMaxBytes: number;
};

export type MediaUploadKind = "IMAGE" | "VIDEO" | "AUDIO";

export const DEFAULT_MEDIA_UPLOAD_POLICY: Readonly<MediaUploadPolicy> = Object.freeze({
  imageMaxBytes: 100 * MEBIBYTE,
  videoMaxBytes: 100 * MEBIBYTE,
  audioMaxBytes: 50 * MEBIBYTE,
});

let currentPolicy: MediaUploadPolicy = DEFAULT_MEDIA_UPLOAD_POLICY;
let policyRequest: Promise<MediaUploadPolicy> | null = null;

function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isMediaUploadPolicy(value: unknown): value is MediaUploadPolicy {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<MediaUploadPolicy>;
  return isPositiveFiniteNumber(candidate.imageMaxBytes)
    && isPositiveFiniteNumber(candidate.videoMaxBytes)
    && isPositiveFiniteNumber(candidate.audioMaxBytes);
}

export function getMediaUploadPolicy(): Promise<MediaUploadPolicy> {
  if (policyRequest) return policyRequest;
  policyRequest = apiGet<MediaUploadPolicy>("/media/upload-policy")
    .then((value) => isMediaUploadPolicy(value) ? value : DEFAULT_MEDIA_UPLOAD_POLICY)
    .catch(() => DEFAULT_MEDIA_UPLOAD_POLICY)
    .then((value) => {
      currentPolicy = value;
      return value;
    });
  return policyRequest;
}

export function currentMediaUploadPolicy(): MediaUploadPolicy {
  void getMediaUploadPolicy();
  return currentPolicy;
}

function maxBytesFor(kind: MediaUploadKind, policy: MediaUploadPolicy): number {
  if (kind === "VIDEO") return policy.videoMaxBytes;
  if (kind === "AUDIO") return policy.audioMaxBytes;
  return policy.imageMaxBytes;
}

function mediaLabel(kind: MediaUploadKind): string {
  if (kind === "VIDEO") return "Video";
  if (kind === "AUDIO") return "Âm thanh";
  return "Ảnh";
}

function displayMegabytes(bytes: number): string {
  const megabytes = bytes / MEBIBYTE;
  return Number.isInteger(megabytes) ? String(megabytes) : megabytes.toFixed(1);
}

export function validateMediaFile(
  file: Pick<File, "size">,
  kind: MediaUploadKind,
  policy: MediaUploadPolicy = currentMediaUploadPolicy(),
): string | null {
  const maxBytes = maxBytesFor(kind, policy);
  return file.size <= maxBytes
    ? null
    : `${mediaLabel(kind)} không được vượt quá ${displayMegabytes(maxBytes)} MB.`;
}
