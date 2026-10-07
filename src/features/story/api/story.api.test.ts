import { afterEach, describe, expect, it, vi } from "vitest";
import { apiGet } from "../../../shared/api";
import { storyApi } from "./story.api";

vi.mock("../../../shared/api", () => ({ apiGet: vi.fn(), apiSend: vi.fn() }));

describe("story viewers API", () => {
  afterEach(() => vi.clearAllMocks());

  it("keeps the existing unfiltered request compatible", () => {
    storyApi.viewers("story/1", "owner", 1, 20);
    expect(apiGet).toHaveBeenCalledWith("/profile-media/stories/story%2F1/viewers?ownerId=owner&page=1&size=20");
  });

  it("encodes a search query and sends it with pagination", () => {
    storyApi.viewers("story", "owner", 0, 20, "Mai & Hoa");
    expect(apiGet).toHaveBeenCalledWith("/profile-media/stories/story/viewers?ownerId=owner&page=0&size=20&query=Mai%20%26%20Hoa");
  });
});