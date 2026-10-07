import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { NotificationDto, Page } from "../model/notification.types";
import { NotificationScreen } from "./NotificationScreen";

const notificationApi = vi.hoisted(() => ({
  list: vi.fn(),
  markRead: vi.fn().mockResolvedValue(undefined),
  markAllRead: vi.fn().mockResolvedValue(undefined),
  follow: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../api/notification.api", () => ({ notificationApi }));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function page(actor: string, id: string): Page<NotificationDto> {
  return {
    pageNumber: 0,
    totalElements: 1,
    totalPages: 1,
    content: [{
      id,
      userId: "viewer-1",
      actorId: `actor-${id}`,
      actorUsername: actor.toLowerCase(),
      actorDisplayName: actor,
      actorAvatarUrl: null,
      actionType: "LIKE_POST",
      entityId: "post-1",
      entityType: "POST",
      contentThumbnailUrl: null,
      entityAvailable: true,
      status: "UNREAD",
      readAt: null,
      createdAt: new Date().toISOString(),
      content: null,
      metadata: null,
      deepLink: null,
    }],
  };
}

afterEach(() => {
  cleanup();
  notificationApi.list.mockReset();
  notificationApi.markRead.mockReset().mockResolvedValue(undefined);
});

describe("NotificationScreen requests", () => {
  it("ignores an older filter response", async () => {
    const first = deferred<Page<NotificationDto>>();
    const second = deferred<Page<NotificationDto>>();
    notificationApi.list.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    render(<NotificationScreen userId="viewer-1" onNavigate={vi.fn()} />);

    await userEvent.click(screen.getByRole("tab", { name: /Tương tác/ }));
    second.resolve(page("New Actor", "new"));
    expect(await screen.findByText("New Actor")).toBeInTheDocument();

    first.resolve(page("Stale Actor", "stale"));
    await waitFor(() => expect(screen.queryByText("Stale Actor")).not.toBeInTheDocument());
  });

  it("keeps rendered notifications visible while a new filter request is pending", async () => {
    const next = deferred<Page<NotificationDto>>();
    notificationApi.list
      .mockResolvedValueOnce(page("Visible Actor", "visible"))
      .mockReturnValueOnce(next.promise);
    render(<NotificationScreen userId="viewer-1" onNavigate={vi.fn()} />);
    expect(await screen.findByText("Visible Actor")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("tab", { name: /Tương tác/ }));

    expect(screen.getByText("Visible Actor")).toBeInTheDocument();
    expect(screen.queryByLabelText("Đang tải thông báo")).not.toBeInTheDocument();
  });

  it("keeps rendered notifications when a realtime refresh fails", async () => {
    notificationApi.list
      .mockResolvedValueOnce(page("Visible Actor", "visible"))
      .mockRejectedValueOnce(new Error("offline"));
    render(<NotificationScreen userId="viewer-1" onNavigate={vi.fn()} />);
    expect(await screen.findByText("Visible Actor")).toBeInTheDocument();

    fireEvent(window, new CustomEvent("notification-refresh"));

    expect(await screen.findByRole("alert")).toHaveTextContent("Không thể làm mới");
    expect(screen.getByText("Visible Actor")).toBeInTheDocument();
  });

  it("does not expose the previous account inbox while the next account loads", async () => {
    const next = deferred<Page<NotificationDto>>();
    notificationApi.list.mockResolvedValueOnce(page("Previous Actor", "previous"))
      .mockReturnValueOnce(next.promise);
    const { rerender } = render(<NotificationScreen userId="viewer-1" onNavigate={vi.fn()} />);
    expect(await screen.findByText("Previous Actor")).toBeInTheDocument();

    rerender(<NotificationScreen userId="viewer-2" onNavigate={vi.fn()} />);

    expect(screen.queryByText("Previous Actor")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Đang tải thông báo")).toBeInTheDocument();
    next.resolve(page("Next Actor", "next"));
    expect(await screen.findByText("Next Actor")).toBeInTheDocument();
  });

  it("rolls back an optimistic read state and reports a failed mark-read request", async () => {
    notificationApi.list.mockResolvedValueOnce(page("Visible Actor", "visible"));
    notificationApi.markRead.mockRejectedValueOnce(new Error("offline"));
    render(<NotificationScreen userId="viewer-1" onNavigate={vi.fn()} />);

    await userEvent.click(await screen.findByRole("button", { name: /Visible Actor/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Không thể đánh dấu");
    expect(screen.getByText("Visible Actor").closest("article")).toHaveClass("unread");
  });
});

it("retries the next notification page while preserving and deduplicating rows", async () => {
  const first = { ...page("First Actor", "first"), totalPages: 2 };
  notificationApi.list.mockResolvedValueOnce(first).mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValueOnce({ ...page("Second Actor", "second"), content: [...first.content, ...page("Second Actor", "second").content] });
  render(<NotificationScreen userId="viewer-1" onNavigate={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "Load more notifications" }));
  expect(screen.getByText("First Actor")).toBeTruthy();
  fireEvent.click(await screen.findByRole("button", { name: "Retry loading notifications" }));
  expect(await screen.findByText("Second Actor")).toBeTruthy();
  expect(screen.getAllByText("First Actor")).toHaveLength(1);
  expect(notificationApi.list.mock.calls.map(args => args[2])).toEqual([0, 1, 1]);
});
