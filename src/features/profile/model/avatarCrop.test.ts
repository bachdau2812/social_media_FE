import { describe, expect, it, vi } from "vitest";
import { avatarCropRect, exportAvatarCrop } from "./avatarCrop";

describe("avatar crop", () => {
  it.each([
    [1200, 800, { x: 200, y: 0, size: 800 }],
    [800, 1200, { x: 0, y: 200, size: 800 }],
  ])("centers a square in a %s by %s image", (width, height, expected) => {
    expect(avatarCropRect(width, height, 1, { x: 0, y: 0 })).toEqual(expected);
  });
  it("bounds crop position at every edge after zooming", () => {
    expect(avatarCropRect(1200, 800, 2, { x: 1, y: -1 })).toEqual({ x: 800, y: 0, size: 400 });
    expect(avatarCropRect(1200, 800, 2, { x: -4, y: 5 })).toEqual({ x: 0, y: 400, size: 400 });
  });
  it("exports the same source rectangle as the preview to a square PNG", async () => {
    const image = Object.assign(document.createElement("img"), { width: 1200, height: 800 });
    Object.defineProperties(image, { naturalWidth: { value: 1200 }, naturalHeight: { value: 800 } });
    const drawImage = vi.fn();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({ drawImage } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation((callback) => callback(new Blob(["crop"], { type: "image/png" })));
    const file = await exportAvatarCrop(image, 2, { x: 1, y: -1 });
    expect(drawImage).toHaveBeenCalledWith(image, 800, 0, 400, 400, 0, 0, 512, 512);
    expect(file.type).toBe("image/png");
    expect(file.name).toBe("avatar.png");
  });
});
