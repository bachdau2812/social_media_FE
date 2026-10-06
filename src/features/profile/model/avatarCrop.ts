export type AvatarCropPosition = { x: number; y: number };

export function avatarCropRect(width: number, height: number, zoom: number, position: AvatarCropPosition) {
  const size = Math.min(width, height) / Math.max(1, zoom);
  const clamp = (value: number) => Math.max(-1, Math.min(1, value));
  return {
    x: (width - size) * (clamp(position.x) + 1) / 2,
    y: (height - size) * (clamp(position.y) + 1) / 2,
    size,
  };
}

export async function exportAvatarCrop(image: HTMLImageElement, zoom: number, position: AvatarCropPosition): Promise<File> {
  if (!image.naturalWidth || !image.naturalHeight) throw new Error("Không thể đọc ảnh đã chọn.");
  const { x, y, size } = avatarCropRect(image.naturalWidth, image.naturalHeight, zoom, position);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Trình duyệt không hỗ trợ cắt ảnh.");
  context.drawImage(image, x, y, size, size, 0, 0, 512, 512);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Không thể lưu ảnh đã cắt.")), "image/png");
  });
  return new File([blob], "avatar.png", { type: "image/png" });
}
