import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useChatController } from "../hooks/useChatController";
import { ChatScreen } from "./ChatScreen";
import type { ChatThread } from "../model/chat.types";

vi.mock("../hooks/useChatController", () => ({ useChatController: vi.fn() }));
vi.mock("../components/ChatComposer", () => ({ ChatComposer: () => null }));
vi.mock("../components/ConversationDetailsDrawer", () => ({ ConversationDetailsDrawer: () => null }));
vi.mock("../components/ChatMessageList", () => ({ ChatMessageList: ({ onOpenMedia }: { onOpenMedia: (items: unknown[], index: number, messageId: string) => void }) => <button onClick={() => onOpenMedia([{ url: "private.jpg" }], 0, "private-message")}>Open media</button> }));
vi.mock("../components/ChatMediaExperience", () => ({ ChatMediaViewer: () => <div role="dialog" aria-label="Media viewer">Private media</div> }));
vi.mock("../api/chat.api", () => ({
  chatApi: { suggestions: vi.fn().mockResolvedValue([]) },
}));

const controller = {
  active: null,
  activeId: null,
  threads: [],
  threadState: "ready",
  setFocused: vi.fn(),
  closeConversation: vi.fn(),
  openConversation: vi.fn(),
  focusMessage: vi.fn(),
  loadThreads: vi.fn(),
};

beforeEach(() => {
  vi.mocked(useChatController).mockReturnValue(controller as unknown as ReturnType<typeof useChatController>);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ChatScreen conversation creation", () => {
  it("opens the same shared new-conversation dialog as mini-chat", () => {
    render(<ChatScreen
      userId="viewer-1"
      username="viewer"
      onOpenProfile={vi.fn()}
      onOpenStory={vi.fn()}
    />);

    fireEvent.click(screen.getByRole("button", { name: "Tạo cuộc trò chuyện" }));
    expect(screen.getByRole("dialog", { name: "Tin nhắn mới" })).toBeInTheDocument();
  });
});

it("delegates thread selection to the URL adapter and opens the URL target through the shared controller", () => {
  const thread = { id: "room", title: "Room", preview: "Hello", unreadCount: 0 } as ChatThread;
  const current = { ...controller, activeId: null as string | null, threads: [thread] };
  vi.mocked(useChatController).mockReturnValue(current as unknown as ReturnType<typeof useChatController>);
  const onSelectConversation = vi.fn();
  const { rerender } = render(<ChatScreen userId="me" username="me" onOpenProfile={vi.fn()} onOpenStory={vi.fn()} initialTarget={null} onSelectConversation={onSelectConversation} />);
  fireEvent.click(screen.getByRole("button", { name: /Room.*Hello/ }));
  expect(onSelectConversation).toHaveBeenCalledWith("room");
  expect(controller.openConversation).not.toHaveBeenCalled();
  rerender(<ChatScreen userId="me" username="me" onOpenProfile={vi.fn()} onOpenStory={vi.fn()} initialTarget={{ conversationId: "room" }} onSelectConversation={onSelectConversation} />);
  expect(controller.openConversation).toHaveBeenCalledWith("room");
  current.activeId = "room";
  rerender(<ChatScreen userId="me" username="me" onOpenProfile={vi.fn()} onOpenStory={vi.fn()} initialTarget={null} onSelectConversation={onSelectConversation} />);
  expect(controller.closeConversation).toHaveBeenCalled();
});

it("shows a resource error and routes the inbox action when a conversation is unavailable", () => {
  const current = { ...controller, activeId: "missing", conversationState: "error", retryConversation: vi.fn() };
  vi.mocked(useChatController).mockReturnValue(current as unknown as ReturnType<typeof useChatController>);
  const onSelectConversation = vi.fn();
  render(<ChatScreen userId="me" username="me" onOpenProfile={vi.fn()} onOpenStory={vi.fn()} initialTarget={{ conversationId: "missing" }} onSelectConversation={onSelectConversation} />);
  expect(screen.getByRole("alert")).toHaveTextContent("Không thể mở cuộc trò chuyện.");
  fireEvent.click(screen.getByText("Thử lại"));
  expect(current.retryConversation).toHaveBeenCalled();
  fireEvent.click(screen.getByText("Quay lại hộp thư"));
  expect(onSelectConversation).toHaveBeenCalledWith(null);
});

it("closes source media when the active conversation disappears after membership removal", () => {
  const current = { ...controller, active: { id: "room", title: "Room", isDissolved: false } as ChatThread | null, activeId: "room" as string | null, isMessageDeleted: vi.fn(() => false), version: 0 };
  vi.mocked(useChatController).mockReturnValue(current as unknown as ReturnType<typeof useChatController>);
  const props = { userId: "me", username: "me", onOpenProfile: vi.fn(), onOpenStory: vi.fn() };
  const { rerender } = render(<ChatScreen {...props} />);
  fireEvent.click(screen.getByText("Open media"));
  expect(screen.getByRole("dialog", { name: "Media viewer" })).toBeInTheDocument();
  current.active = null; current.activeId = null;
  rerender(<ChatScreen {...props} />);
  expect(screen.queryByRole("dialog", { name: "Media viewer" })).not.toBeInTheDocument();
});
