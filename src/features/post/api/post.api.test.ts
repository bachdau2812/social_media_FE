import { beforeEach, expect, it, vi } from "vitest";
import { apiSend } from "../../../shared/api";
import { postApi } from "./post.api";

vi.mock("../../../shared/api", () => ({ apiGet: vi.fn(), apiSend: vi.fn() }));
beforeEach(() => vi.clearAllMocks());

it("sends the interaction contract through the authenticated API client", async () => {
  const request = {
    postId: "post-1", isClick: true, viewTime: 31,
    eventId: "11111111-1111-4111-8111-111111111111",
    impressionId: "22222222-2222-4222-8222-222222222222",
  };
  const accepted = { eventId: request.eventId, computedScore: 2, duplicate: false };
  vi.mocked(apiSend).mockResolvedValue(accepted);
  const signal = new AbortController().signal;
  expect(await postApi.recordInteraction(request, { signal })).toEqual(accepted);
  expect(apiSend).toHaveBeenCalledWith("/posts/interaction", "POST", request, { signal });
});
