import { beforeEach, describe, expect, it, vi } from "vitest";

const apiGet = vi.fn();

vi.mock("./apiClient", () => ({ apiGet }));

describe("uploadCloudinaryMedia", () => {
  beforeEach(() => {
    vi.resetModules();
    apiGet.mockReset();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("rejects oversized media using the backend policy before requesting a signature", async () => {
    const oneHundredMegabytes = 100 * 1024 * 1024;
    apiGet.mockImplementation(async (path: string) => path === "/media/upload-policy"
      ? { imageMaxBytes: oneHundredMegabytes, videoMaxBytes: oneHundredMegabytes, audioMaxBytes: 50 * 1024 * 1024 }
      : { signature: "signature", timestamp: 1, apiKey: "key", cloudName: "cloud" });
    const file = new File(["oversized"], "photo.jpg", { type: "image/jpeg" });
    Object.defineProperty(file, "size", { value: oneHundredMegabytes + 1 });
    const { uploadCloudinaryMedia } = await import("./uploadClient");

    await expect(uploadCloudinaryMedia(file)).rejects.toThrow("100");

    expect(apiGet).toHaveBeenCalledTimes(1);
    expect(apiGet).toHaveBeenCalledWith("/media/upload-policy");
    expect(fetch).not.toHaveBeenCalled();
  });
});
