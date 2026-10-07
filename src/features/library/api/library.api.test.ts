import { beforeEach, expect, it, vi } from "vitest";
import { apiGet, apiSend } from "../../../shared/api";
import { libraryApi } from "./library.api";

vi.mock("../../../shared/api", () => ({ apiGet: vi.fn(), apiSend: vi.fn() }));
beforeEach(() => vi.clearAllMocks());

it("owns post and story draft persistence", () => {
  const request = {
    id: null, draftType: "STORY" as const, thumbnailUrl: null,
    mediaCount: 1, captionPreview: "story", payload: "{}",
  };
  libraryApi.saveDraft("user/1", request);

  expect(apiSend).toHaveBeenCalledWith("/me/user%2F1/drafts", "POST", request);
});

it("owns saved post writes used by post surfaces", () => {
  libraryApi.savePost("user/1", "post/1");
  expect(apiSend).toHaveBeenCalledWith("/me/user%2F1/saved/items", "POST", { postId: "post/1" });
});

it("owns post archive writes", () => {
  const request = { contentId: "post/1", contentType: "POST" as const, thumbnailUrl: null, captionPreview: "caption" };
  libraryApi.archivePost("user/1", request);
  expect(apiSend).toHaveBeenCalledWith("/me/user%2F1/archive", "POST", request);
});

it("threads cancellation through all account-scoped reads", () => {
  const signal = new AbortController().signal;
  libraryApi.saved("user/1", 0, 30, signal);
  libraryApi.drafts("user/1", signal);
  libraryApi.archive("user/1", "POST", signal);
  libraryApi.storyArchive("user/1", 0, 100, signal);
  expect(apiGet).toHaveBeenNthCalledWith(1, "/me/user%2F1/saved?page=0&size=30", { signal });
  expect(apiGet).toHaveBeenNthCalledWith(2, "/me/user%2F1/drafts", { signal });
  expect(apiGet).toHaveBeenNthCalledWith(3, "/me/user%2F1/archive?type=POST", { signal });
  expect(apiGet).toHaveBeenNthCalledWith(4, "/profile-media/user%2F1/stories?page=0&size=100&mediaType=STORY", { signal });
});
