import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { profileApi } from "../../profile";
import { storyApi } from "../api/story.api";
import { StoryViewersPanel } from "./StoryViewersPanel";

vi.mock("../../profile", () => ({ profileApi: { follow: vi.fn(), unfollow: vi.fn() } }));

describe("StoryViewersPanel", () => {
  it("searches all viewer pages and ignores stale results without changing the story total", async () => {
    let resolveOld!: (value: Awaited<ReturnType<typeof storyApi.viewers>>) => void;
    vi.spyOn(storyApi, "viewers")
      .mockImplementationOnce(() => new Promise((resolve) => { resolveOld = resolve; }))
      .mockResolvedValueOnce({ content: [{ userId: "match", username: "mai", viewedAt: "2026-10-07T10:00:00Z" }], pageNumber: 0, totalElements: 1, totalPages: 1 });
    const onTotalChange = vi.fn();
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={onTotalChange} onClose={vi.fn()} onOpenProfile={vi.fn()} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Tìm kiếm người xem" }), { target: { value: "mai" } });
    await screen.findByRole("button", { name: "Xem trang cá nhân của mai" });
    expect(storyApi.viewers).toHaveBeenLastCalledWith("story-1", "owner-1", 0, 20, "mai");
    await act(async () => resolveOld({ content: [{ userId: "old", username: "old", viewedAt: "2026-10-07T09:00:00Z" }], pageNumber: 0, totalElements: 99, totalPages: 5 }));
    await waitFor(() => expect(screen.queryByText("old")).not.toBeInTheDocument());
    expect(onTotalChange).not.toHaveBeenCalled();
  });

  it("follows and unfollows through the existing profile API without opening the profile", async () => {
    vi.spyOn(storyApi, "viewers").mockResolvedValue({
      content: [{ userId: "viewer-1", username: "mai", viewedAt: "2026-10-07T10:00:00Z", viewerFollowsUser: false }],
      pageNumber: 0, totalElements: 1, totalPages: 1,
    });
    vi.mocked(profileApi.follow).mockResolvedValue(undefined);
    vi.mocked(profileApi.unfollow).mockResolvedValue(undefined);
    const onOpenProfile = vi.fn();
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={vi.fn()} onClose={vi.fn()} onOpenProfile={onOpenProfile} />);
    fireEvent.click(await screen.findByRole("button", { name: "Theo dõi mai" }));
    fireEvent.click(await screen.findByRole("button", { name: "Bỏ theo dõi mai" }));
    await screen.findByRole("button", { name: "Theo dõi mai" });
    expect(profileApi.follow).toHaveBeenCalledWith("owner-1", "viewer-1");
    expect(profileApi.unfollow).toHaveBeenCalledWith("owner-1", "viewer-1");
    expect(onOpenProfile).not.toHaveBeenCalled();
  });

  it("keeps the relationship unchanged when following fails", async () => {
    vi.spyOn(storyApi, "viewers").mockResolvedValue({
      content: [{ userId: "viewer-1", username: "mai", viewedAt: "2026-10-07T10:00:00Z", viewerFollowsUser: false }],
      pageNumber: 0, totalElements: 1, totalPages: 1,
    });
    vi.mocked(profileApi.follow).mockRejectedValueOnce(new Error("network"));
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={vi.fn()} onClose={vi.fn()} onOpenProfile={vi.fn()} />);
    fireEvent.click(await screen.findByRole("button", { name: "Theo dõi mai" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Không thể cập nhật theo dõi. Thử lại nhé.");
    expect(screen.getByRole("button", { name: "Theo dõi mai" })).toBeEnabled();
  });
  it("keeps the original viewer total during search and restores the list when cleared", async () => {
    vi.spyOn(storyApi, "viewers")
      .mockResolvedValueOnce({ content: [{ userId: "one", username: "first", viewedAt: "2026-10-07T10:00:00Z" }], pageNumber: 0, totalElements: 42, totalPages: 3 })
      .mockResolvedValueOnce({ content: [], pageNumber: 0, totalElements: 0, totalPages: 0 })
      .mockResolvedValueOnce({ content: [{ userId: "one", username: "first", viewedAt: "2026-10-07T10:00:00Z" }], pageNumber: 0, totalElements: 42, totalPages: 3 });
    const onTotalChange = vi.fn();
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={onTotalChange} onClose={vi.fn()} onOpenProfile={vi.fn()} />);
    await screen.findByRole("button", { name: "Xem trang cá nhân của first" });
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "absent" } });
    expect(screen.queryByText("first")).not.toBeInTheDocument();
    await screen.findByText("Không tìm thấy người xem phù hợp.");
    expect(screen.getByLabelText("Tổng số người xem")).toHaveTextContent("42 lượt xem");
    expect(onTotalChange).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Xóa tìm kiếm" }));
    await screen.findByRole("button", { name: "Xem trang cá nhân của first" });
    expect(storyApi.viewers).toHaveBeenLastCalledWith("story-1", "owner-1", 0, 20);
  });

  it("uses the same search query on subsequent pages", async () => {
    vi.spyOn(storyApi, "viewers")
      .mockResolvedValueOnce({ content: [], pageNumber: 0, totalElements: 0, totalPages: 0 })
      .mockResolvedValueOnce({ content: [{ userId: "one", username: "mai1", viewedAt: "2026-10-07T10:00:00Z" }], pageNumber: 0, totalElements: 21, totalPages: 2 })
      .mockResolvedValueOnce({ content: [{ userId: "two", username: "mai2", viewedAt: "2026-10-07T09:00:00Z" }], pageNumber: 1, totalElements: 21, totalPages: 2 });
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={vi.fn()} onClose={vi.fn()} onOpenProfile={vi.fn()} />);
    await screen.findByText("Chưa có ai xem Story này.");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "mai" } });
    fireEvent.click(await screen.findByRole("button", { name: "Xem thêm" }));
    await screen.findByRole("button", { name: "Xem trang cá nhân của mai2" });
    expect(storyApi.viewers).toHaveBeenLastCalledWith("story-1", "owner-1", 1, 20, "mai");
    expect(screen.getByRole("button", { name: "Xem trang cá nhân của mai1" })).toBeInTheDocument();
  });

  it("disables follow while the request is pending and prevents duplicate requests", async () => {
    vi.spyOn(storyApi, "viewers").mockResolvedValue({ content: [{ userId: "viewer", username: "mai", viewedAt: "2026-10-07T10:00:00Z", viewerFollowsUser: false }], pageNumber: 0, totalElements: 1, totalPages: 1 });
    let finish!: (value: unknown) => void;
    vi.mocked(profileApi.follow).mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={vi.fn()} onClose={vi.fn()} onOpenProfile={vi.fn()} />);
    const follow = await screen.findByRole("button", { name: "Theo dõi mai" });
    fireEvent.click(follow);
    fireEvent.click(follow);
    expect(follow).toBeDisabled();
    expect(profileApi.follow).toHaveBeenCalledOnce();
    await act(async () => finish(undefined));
    expect(screen.getByRole("button", { name: "Bỏ theo dõi mai" })).toBeEnabled();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("uses a centered activity heading and puts nickname before display name", async () => {
    vi.spyOn(storyApi, "viewers").mockResolvedValue({
      content: [{ userId: "viewer-1", username: "_maiihoaaa_", fullName: "Mai Hoa", avatarUrl: "https://cdn.example/avatar.jpg", viewedAt: "2026-10-07T10:00:00Z", reaction: "LIKE" }],
      pageNumber: 0, totalElements: 1, totalPages: 1,
    });
    const onOpenProfile = vi.fn();
    const { container } = render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={vi.fn()} onClose={vi.fn()} onOpenProfile={onOpenProfile} />);

    expect(screen.getByRole("heading", { name: "Lượt thích và lượt xem", level: 2 })).toBeInTheDocument();
    const row = await screen.findByRole("button", { name: "Xem trang cá nhân của _maiihoaaa_" });
    expect(row.querySelector("strong")).toHaveTextContent("_maiihoaaa_");
    expect(row.querySelector("small")).toHaveTextContent("Mai Hoa");
    expect(screen.getByRole("img", { name: "_maiihoaaa_" })).toHaveClass("story-viewer-avatar");
    expect(screen.getByLabelText("Tổng số người xem")).toHaveTextContent("1 lượt xem");
    expect(container.querySelector("time")).not.toBeInTheDocument();
    fireEvent.click(row);
    expect(onOpenProfile).toHaveBeenCalledWith("viewer-1");
  });

  it("keeps loading, empty and close controls available", async () => {
    let resolveViewers!: (value: Awaited<ReturnType<typeof storyApi.viewers>>) => void;
    vi.spyOn(storyApi, "viewers").mockImplementation(() => new Promise((resolve) => { resolveViewers = resolve; }));
    const onClose = vi.fn();
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={vi.fn()} onClose={onClose} onOpenProfile={vi.fn()} />);

    expect(screen.getByRole("status")).toHaveAccessibleName("Đang tải danh sách người xem");
    expect(screen.queryByLabelText("Tổng số người xem")).not.toBeInTheDocument();
    resolveViewers({ content: [], pageNumber: 0, totalElements: 0, totalPages: 0 });
    expect(await screen.findByText("Chưa có ai xem Story này.")).toBeInTheDocument();
    expect(screen.getByLabelText("Tổng số người xem")).toHaveTextContent("0 lượt xem");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("retries the page that failed to load", async () => {
    vi.spyOn(storyApi, "viewers")
      .mockResolvedValueOnce({ content: [], pageNumber: 0, totalElements: 21, totalPages: 2 })
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce({ content: [], pageNumber: 1, totalElements: 21, totalPages: 2 });
    render(<StoryViewersPanel storyId="story-1" ownerId="owner-1" onTotalChange={vi.fn()} onClose={vi.fn()} onOpenProfile={vi.fn()} />);

    await waitFor(() => expect(storyApi.viewers).toHaveBeenCalledWith("story-1", "owner-1", 0, 20));
    fireEvent.click(screen.getByRole("button", { name: "Xem thêm" }));
    fireEvent.click(await screen.findByRole("button", { name: "Thử lại" }));

    await waitFor(() => expect(storyApi.viewers).toHaveBeenNthCalledWith(3, "story-1", "owner-1", 1, 20));
  });
});
