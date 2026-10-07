import { beforeEach, expect, it, vi } from "vitest";
import { apiGet, apiSend } from "../../../shared/api";
import { commentApi } from "./comment.api";

vi.mock("../../../shared/api", () => ({ apiGet: vi.fn(), apiSend: vi.fn() }));
beforeEach(() => vi.clearAllMocks());

it("owns comment query routes", () => {
  commentApi.pageByPost("post/1", "viewer/1", 2, 5);
  commentApi.byId("comment/1");
  commentApi.replies("parent/1", "viewer/1");

  expect(apiGet).toHaveBeenNthCalledWith(1, "/frontend/comments/post/post%2F1/page?viewerId=viewer%2F1&page=2&size=5");
  expect(apiGet).toHaveBeenNthCalledWith(2, "/comments/comment%2F1");
  expect(apiGet).toHaveBeenNthCalledWith(3, "/frontend/comments/parent/parent%2F1?viewerId=viewer%2F1&page=0&size=10");
});

it("owns comment create, edit, and like requests", () => {
  const create = { postId: "post-1", userId: "user-1", parentId: null, content: "hello", mediaList: [] };
  commentApi.create(create);
  commentApi.update("comment-1", "user-1", "edited");
  commentApi.toggleLike("user/1", "comment/1");

  expect(apiSend).toHaveBeenNthCalledWith(1, "/comments", "POST", create);
  expect(apiSend).toHaveBeenNthCalledWith(2, "/comments", "PUT", { commentId: "comment-1", userId: "user-1", content: "edited" });
  expect(apiSend).toHaveBeenNthCalledWith(3, "/likes/users/user%2F1", "POST", { targetId: "comment/1", targetType: "COMMENT" });
});
