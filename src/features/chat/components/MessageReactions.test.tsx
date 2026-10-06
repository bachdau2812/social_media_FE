import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ChatMessage } from "../model/chat.types";
import { MessageReactionPicker, MessageReactions as Component } from "./MessageReactions";

const api = vi.hoisted(() => ({ reactors: vi.fn() }));
vi.mock("../api/chat.api", () => ({ chatApi: api }));
afterEach(() => { cleanup(); api.reactors.mockReset(); });
const message: ChatMessage = { id: "m", conversationId: "c", messageSeq: 1, senderId: "other", messageType: "TEXT", content: "Hi", myReaction: "HEART", reactions: [{ type: "HEART", count: 2 }, { type: "HAHA", count: 1 }], likeCount: 2 };

describe("message reaction footer", () => {
  it("offers all six reactions and lets the shared action handle replacement", () => {
    const onSelect = vi.fn();
    render(<MessageReactionPicker message={message} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Chọn cảm xúc" }));
    const picker = screen.getByRole("group", { name: "Cảm xúc tin nhắn" });
    expect(within(picker).getAllByRole("button")).toHaveLength(6);
    fireEvent.click(within(picker).getByRole("button", { name: "Haha" }));
    expect(onSelect).toHaveBeenCalledWith("HAHA");
    expect(screen.queryByRole("group", { name: "Cảm xúc tin nhắn" })).not.toBeInTheDocument();
  });

  it("disables pending mutations and hides reactions for deleted/unsaved/system messages", () => {
    const common = { onSelect: vi.fn() };
    const { rerender } = render(<MessageReactionPicker {...common} message={{ ...message, pending: true }} />);
    expect(screen.getByRole("button", { name: "Chọn cảm xúc" })).toBeDisabled();
    const hiddenMessages: ChatMessage[] = [{ ...message, deleted: true }, { ...message, status: "sending" }, { ...message, messageType: "SYSTEM" }];
    for (const item of hiddenMessages) {
      rerender(<MessageReactionPicker {...common} message={item} />);
      expect(screen.queryByRole("button", { name: "Chọn cảm xúc" })).not.toBeInTheDocument();
    }
  });

  it("opens a paginated reactors list, filters by reaction and keeps clicks outside the bubble", async () => {
    api.reactors.mockResolvedValueOnce({ items: [{ userId: "a", displayName: "An", avatarUrl: null, reaction: "HEART", reactedAt: "2026-10-06T08:00:00Z" }], hasMore: true, nextCursor: "cursor" });
    const outer = vi.fn();
    render(<div onClick={outer}><Component message={message} actorId="me" /></div>);
    fireEvent.click(screen.getByRole("button", { name: "Xem 3 cảm xúc" }));
    expect(await screen.findByText("An")).toBeInTheDocument();
    expect(outer).not.toHaveBeenCalled();
    api.reactors.mockResolvedValueOnce({ items: [{ userId: "b", displayName: "Bình", avatarUrl: null, reaction: "HAHA", reactedAt: "2026-10-06T08:00:00Z" }], hasMore: false, nextCursor: null });
    fireEvent.click(screen.getByRole("button", { name: "Xem thêm" }));
    expect(await screen.findByText("Bình")).toBeInTheDocument();
    expect(api.reactors.mock.calls[1].slice(0, 5)).toEqual(["c", "me", "m", undefined, "cursor"]);
    api.reactors.mockResolvedValueOnce({ items: [], hasMore: false, nextCursor: null });
    fireEvent.click(screen.getByRole("tab", { name: "Haha" }));
    await waitFor(() => expect(api.reactors.mock.calls[2].slice(0, 4)).toEqual(["c", "me", "m", "HAHA"]));
    expect(await screen.findByText("Chưa có cảm xúc này.")).toBeInTheDocument();
  });

  it("shows a retry action when the reactors request fails", async () => {
    api.reactors.mockRejectedValueOnce(new Error("offline"));
    render(<Component message={message} actorId="me" />);
    fireEvent.click(screen.getByRole("button", { name: "Xem 3 cảm xúc" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Không thể tải");
    api.reactors.mockResolvedValueOnce({ items: [], nextCursor: null, hasMore: false });
    fireEvent.click(screen.getByRole("button", { name: "Thử lại" }));
    expect(await screen.findByText("Chưa có cảm xúc này.")).toBeInTheDocument();
  });
});
