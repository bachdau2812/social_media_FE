import { describe, expect, it } from "vitest";
import { createStoryPublicationId, storyPublicationFields } from "./storyPublication";

describe("story publication", () => {
  it("creates an opaque publication id", () => {
    expect(createStoryPublicationId()).toEqual(expect.any(String));
  });

  it("keeps one-based order and total count for a publication", () => {
    const publicationId = "publication-1";
    expect([0, 1, 2].map((index) => storyPublicationFields(publicationId, index, 3))).toEqual([
      { publicationId, publicationOrder: 1, publicationItemCount: 3 },
      { publicationId, publicationOrder: 2, publicationItemCount: 3 },
      { publicationId, publicationOrder: 3, publicationItemCount: 3 },
    ]);
  });
});
