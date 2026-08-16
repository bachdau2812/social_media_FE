import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ConversationDto } from "../model/chat.dto";
import { chatApi } from "../api/chat.api";
import { NewConversationDialog } from "./NewConversationDialog";

vi.mock("../api/chat.api", () => ({
  chatApi: {
    suggestions: vi.fn(),
    direct: vi.fn(),
    group: vi.fn(),
  },
}));

const suggestions = [
  { id: "user-1", username: "an", fullName: "Nguyễn An", avatar: null },
  { id: "user-2", username: "binh", fullName: "Trần Bình", avatar: null },
];

const groupDto: ConversationDto = {
  id: "group-1",
  type: "GROUP",
  isDissolved: false,
  title: "Nhóm học WebFlux",
  avatarUrl: null,
  lastMessageSeq: 0,
  lastMessageId: null,
  lastMessageAt: null,
  lastMessageSenderId: null,
  lastMessageType: null,
  lastMessagePreview: null,
  currentUserRole: "ADMIN",
  unreadCount: 0,
  recipientDeliveredSeq: 0,
  recipientReadSeq: 0,
  createdAt: "2026-08-16T00:00:00Z",
};

beforeEach(() => {
  vi.mocked(chatApi.suggestions).mockResolvedValue(suggestions);
  vi.mocked(chatApi.group).mockResolvedValue(groupDto);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

async function renderDialog() {
  const onCreated = vi.fn();
  const onClose = vi.fn();
  const user = userEvent.setup();
  const view = render(<NewConversationDialog userId="viewer-1" onClose={onClose} onCreated={onCreated} />);
  expect(await screen.findByText("Nguyễn An")).toBeInTheDocument();
  return { ...view, user, onCreated, onClose };
}

async function selectTwoRecipients(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByText("Nguyễn An"));
  await user.click(screen.getByText("Trần Bình"));
  await user.click(screen.getByRole("button", { name: "Tiếp tục" }));
}

describe("NewConversationDialog", () => {
  it("uses the shared two-step group layout and preserves inputs when navigating back", async () => {
    const { container, user } = await renderDialog();

    await selectTwoRecipients(user);
    expect(screen.getByRole("heading", { name: "Tạo nhóm chat" })).toBeInTheDocument();
    expect(container.querySelector(".new-group-setup")).toBeInTheDocument();
    expect(container.querySelector(".new-group-members")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Tên nhóm"), "Nhóm học WebFlux");
    await user.click(screen.getByRole("button", { name: "Quay lại" }));
    await user.click(screen.getByRole("button", { name: "Tiếp tục" }));

    expect(screen.getByDisplayValue("Nhóm học WebFlux")).toBeInTheDocument();
    expect(screen.getByText("Nguyễn An")).toBeInTheDocument();
    expect(screen.getByText("Trần Bình")).toBeInTheDocument();
  });

  it("keeps group data and retries after a create failure", async () => {
    vi.mocked(chatApi.group).mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce(groupDto);
    const { user, onCreated } = await renderDialog();
    await selectTwoRecipients(user);
    await user.type(screen.getByLabelText("Tên nhóm"), "  Nhóm học WebFlux  ");

    await user.click(screen.getByRole("button", { name: "Tạo nhóm" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Không thể tạo nhóm");
    expect(screen.getByLabelText("Tên nhóm")).toHaveValue("  Nhóm học WebFlux  ");

    await user.click(screen.getByRole("button", { name: "Thử tạo lại" }));
    await waitFor(() => expect(onCreated).toHaveBeenCalledTimes(1));
    expect(chatApi.group).toHaveBeenLastCalledWith("viewer-1", "Nhóm học WebFlux", ["user-1", "user-2"]);
  });

  it("does not close or submit twice while group creation is pending", async () => {
    let resolveGroup!: (value: ConversationDto) => void;
    vi.mocked(chatApi.group).mockReturnValue(new Promise((resolve) => { resolveGroup = resolve; }));
    const { container, user, onClose } = await renderDialog();
    await selectTwoRecipients(user);
    await user.type(screen.getByLabelText("Tên nhóm"), "Nhóm mới");
    await user.click(screen.getByRole("button", { name: "Tạo nhóm" }));

    expect(await screen.findByRole("button", { name: "Đang tạo..." })).toBeDisabled();
    fireEvent.pointerDown(container.querySelector(".new-chat-backdrop") as HTMLElement);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
    expect(chatApi.group).toHaveBeenCalledTimes(1);

    resolveGroup(groupDto);
    await waitFor(() => expect(screen.queryByText("Đang tạo...")).not.toBeInTheDocument());
  });
});
