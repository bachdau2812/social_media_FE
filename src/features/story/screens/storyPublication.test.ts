import { describe, expect, it, vi } from "vitest";
import { createStoryPublicationId, storyPublicationFields } from "./storyPublication";

describe("story publication payload", () => {
  it("uses one publication id with one-based order for every item", () => {
    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("11111111-1111-4111-8111-111111111111");
    const publicationId = createStoryPublicationId();

    expect([0, 1, 2].map((index) => storyPublicationFields(publicationId, index, 3))).toEqual([
      { publicationId, publicationOrder: 1, publicationItemCount: 3 },
      { publicationId, publicationOrder: 2, publicationItemCount: 3 },
      { publicationId, publicationOrder: 3, publicationItemCount: 3 },
    ]);
  });
});
