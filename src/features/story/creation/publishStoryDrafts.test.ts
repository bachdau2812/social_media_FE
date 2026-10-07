import { describe, expect, it, vi } from "vitest";
import { publishStoryDrafts } from "./publishStoryDrafts";
import type { StoryDraft } from "./storyDraft";

const draft = (id: string, status: StoryDraft["status"] = "ready"): StoryDraft => ({
  id,
  file: null,
  previewUrl: `/story/${id}.jpg`,
  secureUrl: `https://cdn.example/${id}.jpg`,
  fileName: `${id}.jpg`,
  mediaType: "IMAGE",
  status,
  fit: "contain",
  background: "black",
  muted: false,
  music: null,
  musicStart: null,
  musicEnd: null,
});

describe("publishStoryDrafts", () => {
  it("keeps publication ordering and skips items already accepted by the server", async () => {
    const createStory = vi.fn().mockResolvedValue(undefined);
    const updateDraft = vi.fn();
    const result = await publishStoryDrafts("user-1", [draft("first"), draft("accepted", "published"), draft("third")], "batch-1", {
      uploadDraft: async (item) => ({ secureUrl: item.secureUrl! }),
      createStory,
      updateDraft,
    });

    expect(result).toEqual({ failedCount: 0, firstFailureMessage: "" });
    expect(createStory.mock.calls.map(([request]) => request)).toEqual([
      expect.objectContaining({ publicationId: "batch-1", publicationOrder: 1, publicationItemCount: 3 }),
      expect.objectContaining({ publicationId: "batch-1", publicationOrder: 3, publicationItemCount: 3 }),
    ]);
    expect(updateDraft).toHaveBeenCalledWith("first", { status: "published", error: undefined });
    expect(updateDraft).not.toHaveBeenCalledWith("accepted", expect.anything());
  });

  it("records a failed item and continues with the rest of the batch", async () => {
    const createStory = vi.fn()
      .mockRejectedValueOnce(new Error("server unavailable"))
      .mockResolvedValueOnce(undefined);
    const updateDraft = vi.fn();
    const result = await publishStoryDrafts("user-1", [draft("failed"), draft("retry")], "batch-2", {
      uploadDraft: async (item) => ({ secureUrl: item.secureUrl! }),
      createStory,
      updateDraft,
    });

    expect(result).toEqual({ failedCount: 1, firstFailureMessage: "server unavailable" });
    expect(updateDraft).toHaveBeenCalledWith("failed", { status: "failed", error: "server unavailable" });
    expect(updateDraft).toHaveBeenCalledWith("retry", { status: "published", error: undefined });
  });
});
