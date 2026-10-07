import { describe, expect, it } from "vitest";
import { parseStoryUploadResult } from "./storyUploadResult";

describe("parseStoryUploadResult", () => {
  it("accepts only an approved terminal result", () => {
    expect(parseStoryUploadResult(JSON.stringify({ result: "APPROVED", message: "Story published" })))
      .toEqual({ success: true, result: "APPROVED", message: "Story published" });
    expect(parseStoryUploadResult(JSON.stringify({ result: "REJECTED", message: "Story rejected" })))
      .toEqual({ success: false, result: "REJECTED", message: "Story rejected" });
  });

  it("fails safely on malformed event payloads", () => {
    expect(parseStoryUploadResult("not-json")).toEqual({ success: false });
  });
});
