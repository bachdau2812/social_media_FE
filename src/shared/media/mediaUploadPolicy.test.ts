import { beforeEach, describe, expect, it, vi } from "vitest";

const apiGet = vi.fn();

vi.mock("../api/apiClient", () => ({ apiGet }));

describe("mediaUploadPolicy", () => {
  beforeEach(() => {
    vi.resetModules();
    apiGet.mockReset();
  });

  it("loads a valid backend policy once and caches it", async () => {
    apiGet.mockResolvedValue({
      imageMaxBytes: 123,
      videoMaxBytes: 456,
      audioMaxBytes: 78,
    });
    const policy = await import("./mediaUploadPolicy");

    await expect(policy.getMediaUploadPolicy()).resolves.toEqual({
      imageMaxBytes: 123,
      videoMaxBytes: 456,
      audioMaxBytes: 78,
    });
    await policy.getMediaUploadPolicy();

    expect(apiGet).toHaveBeenCalledOnce();
    expect(apiGet).toHaveBeenCalledWith("/media/upload-policy");
    expect(policy.currentMediaUploadPolicy()).toEqual({
      imageMaxBytes: 123,
      videoMaxBytes: 456,
      audioMaxBytes: 78,
    });
  });

  it.each([
    ["malformed response", { imageMaxBytes: 100, videoMaxBytes: 0, audioMaxBytes: 50 }],
    ["request failure", new Error("offline")],
  ])("uses safe defaults after %s", async (_label, backendResult) => {
    if (backendResult instanceof Error) apiGet.mockRejectedValue(backendResult);
    else apiGet.mockResolvedValue(backendResult);
    const policy = await import("./mediaUploadPolicy");

    await expect(policy.getMediaUploadPolicy()).resolves.toEqual(
      policy.DEFAULT_MEDIA_UPLOAD_POLICY,
    );
  });

  it("accepts exact limits and rejects a file one byte over", async () => {
    const policy = await import("./mediaUploadPolicy");
    const limits = policy.DEFAULT_MEDIA_UPLOAD_POLICY;

    expect(policy.validateMediaFile({ size: limits.imageMaxBytes }, "IMAGE", limits)).toBeNull();
    expect(policy.validateMediaFile({ size: limits.videoMaxBytes }, "VIDEO", limits)).toBeNull();
    expect(policy.validateMediaFile({ size: limits.audioMaxBytes }, "AUDIO", limits)).toBeNull();
    expect(policy.validateMediaFile({ size: limits.imageMaxBytes + 1 }, "IMAGE", limits)).toContain("100 MB");
    expect(policy.validateMediaFile({ size: limits.videoMaxBytes + 1 }, "VIDEO", limits)).toContain("100 MB");
    expect(policy.validateMediaFile({ size: limits.audioMaxBytes + 1 }, "AUDIO", limits)).toContain("50 MB");
  });
});
