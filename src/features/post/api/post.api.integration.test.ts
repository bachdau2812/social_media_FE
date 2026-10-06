import { afterEach, expect, it, vi } from "vitest";
import { API_BASE_URL } from "../../../shared/api";
import { postApi } from "./post.api";

afterEach(() => vi.unstubAllGlobals());

it("accepts the server's HTTP 202 envelope with authenticated cookies", async () => {
  const request = {
    postId: "post-1", isClick: true, viewTime: 61,
    eventId: "11111111-1111-4111-8111-111111111111",
    impressionId: "22222222-2222-4222-8222-222222222222",
  };
  const accepted = { eventId: request.eventId, computedScore: 3, duplicate: false };
  const fetchRequest = vi.fn(async () => new Response(JSON.stringify({ message: "Post interaction accepted", result: accepted }), {
    status: 202, headers: { "Content-Type": "application/json" },
  }));
  vi.stubGlobal("fetch", fetchRequest);
  await expect(postApi.recordInteraction(request)).resolves.toEqual(accepted);
  expect(fetchRequest).toHaveBeenCalledWith(`${API_BASE_URL}/posts/interaction`, expect.objectContaining({
    method: "POST", credentials: "include", body: JSON.stringify(request),
  }));
});
