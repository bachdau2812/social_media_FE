// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

const detail = vi.hoisted(() => ({ getSurfaceDetail: vi.fn(), map: vi.fn(value => value) }));
vi.mock("../../post", () => ({ postApi: detail, postDetailsToPost: detail.map }));
const router = vi.hoisted(() => ({ navigate: vi.fn() }));
const search = vi.hoisted(() => ({
  users: vi.fn(),
  posts: vi.fn(),
}));
vi.mock("../../../app/router/ScreenLocation", () => ({
  useScreenLocation: () => ({ pathname: "/search", search: "?q=bach", state: null }),
}));
vi.mock("react-router-dom", async (original) => ({ ...await original<typeof import("react-router-dom")>(), useNavigate: () => router.navigate }));
vi.mock("../api/search.api", () => ({ searchApi: search }));

import { SearchScreen } from "./SearchScreen";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.clearAllMocks(); });

it("keeps the active debounced request stable across parent renders", async () => {
  vi.useFakeTimers();
  search.users.mockResolvedValue({ content: [], pageNumber: 0, totalElements: 0, totalPages: 0 });
  const props = { viewerId: "viewer-1", onSelectPost: vi.fn(), onOpenProfile: vi.fn(async () => {}) };
  const view = render(<SearchScreen {...props} />);

  await act(async () => { vi.advanceTimersByTime(200); });
  view.rerender(<SearchScreen {...props} />);
  await act(async () => { vi.advanceTimersByTime(149); });
  expect(search.users).not.toHaveBeenCalled();
  await act(async () => { vi.advanceTimersByTime(1); });

  expect(search.users).toHaveBeenCalledOnce();
  expect(search.users).toHaveBeenCalledWith("viewer-1", "bach", expect.any(AbortSignal), 0);
});

it("opens search results through the shared surface detail request", async () => {
  search.users.mockResolvedValue({ content: [], totalPages: 1 });
  search.posts.mockResolvedValue({ content: [{ postId: "post-1", userId: "author", items: [], authorFullName: "Author", hashtags: [] }], totalPages: 1 });
  const hydrated = { id: "post-1" };
  detail.getSurfaceDetail.mockResolvedValue(hydrated);
  const onSelectPost = vi.fn();
  render(<SearchScreen viewerId="viewer" onSelectPost={onSelectPost} onOpenProfile={vi.fn()} />);
  fireEvent.click(screen.getByRole("tab", { name: "Posts" }));
  fireEvent.click(await screen.findByRole("button", { name: /Open post by/ }));
  await act(async () => {});
  expect(detail.getSurfaceDetail).toHaveBeenCalledWith("post-1");
  expect(onSelectPost).toHaveBeenCalledWith(hydrated);
});
