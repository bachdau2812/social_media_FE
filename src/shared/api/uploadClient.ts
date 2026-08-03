import { apiGet } from "./apiClient";

export type MediaSignatureResponse = {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName?: string | null;
  folder?: string | null;
  uploadPreset?: string | null;
};

export type CloudinaryUploadResult = {
  secureUrl: string;
  publicId: string;
  resourceType: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
  fileName: string;
  mimeType: string;
};

export async function uploadCloudinaryMedia(file: File): Promise<CloudinaryUploadResult> {
  const signature = await apiGet<MediaSignatureResponse>("/media/signature");
  const cloudName = signature.cloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dpilnbfrs";
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signature.apiKey);
  form.append("timestamp", String(signature.timestamp));
  form.append("signature", signature.signature);
  if (signature.folder) form.append("folder", signature.folder);
  if (signature.uploadPreset) form.append("upload_preset", signature.uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: form,
  });
  if (!response.ok) throw new Error(`Cloudinary upload failed: ${response.status}`);
  const data = await response.json() as {
    secure_url?: string; public_id?: string; resource_type?: string; bytes?: number;
    width?: number; height?: number; duration?: number; format?: string; original_filename?: string;
  };
  if (!data.secure_url || !data.public_id) throw new Error("Cloudinary upload response is missing media identifiers");
  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type || (file.type.startsWith("video/") || file.type.startsWith("audio/") ? "video" : "image"),
    bytes: data.bytes ?? file.size,
    width: data.width,
    height: data.height,
    duration: typeof data.duration === "number" ? Math.round(data.duration * 1000) : undefined,
    format: data.format,
    fileName: data.original_filename || file.name,
    mimeType: file.type || (data.format ? `application/${data.format}` : "application/octet-stream"),
  };
}
