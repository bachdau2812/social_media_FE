import { beforeEach, expect, it, vi } from "vitest";
import { apiGet, apiSend } from "../../../shared/api";
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

it("owns post creation and engagement actor routes", async () => {
  const request = {
    userId: "user-1", content: "hello", hashtags: [], mediaRatio: "4:3",
    musicId: null, musicStart: null, musicEnd: null, items: [],
  };
  vi.mocked(apiSend).mockResolvedValue({ postId: "post-1" });
  vi.mocked(apiGet).mockResolvedValue({ content: [], pageNumber: 0, totalElements: 0, totalPages: 0 });

  postApi.create(request);
  await postApi.engagementActors("post/1", "LIKES");
  await postApi.engagementActors("post/1", "REPOSTS");

  expect(apiSend).toHaveBeenNthCalledWith(1, "/posts", "POST", request);
  expect(apiGet).toHaveBeenNthCalledWith(1, "/likes/targets/post%2F1/actors?targetType=POST&page=0&size=40");
  expect(apiGet).toHaveBeenNthCalledWith(2, "/posts/post%2F1/reposts/actors?page=0&size=40");
});

it("owns post like and repost commands with encoded user ids", () => {
  postApi.like("user/1", "post/1");
  postApi.repost("user/1", "post/1", false);
  expect(apiSend).toHaveBeenNthCalledWith(1, "/likes/users/user%2F1", "POST", { targetId: "post/1", targetType: "POST" });
  expect(apiSend).toHaveBeenNthCalledWith(2, "/posts/post%2F1/repost?actorId=user%2F1", "DELETE");
});
