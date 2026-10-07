import { describe, expect, it } from "vitest";
import { toDraftResumeIntent, type ContentDraft } from "./library.types";

const draft = (draftType: "POST" | "STORY"): ContentDraft => ({
  id: "draft-1", userId: "viewer-1", draftType, mediaCount: 1, createdAt: "", updatedAt: "",
});

describe("toDraftResumeIntent", () => {
  it.each(["POST", "STORY"] as const)("preserves the %s creator intent", (kind) => {
    expect(toDraftResumeIntent(draft(kind))).toEqual({ kind, draft: draft(kind) });
  });
});
