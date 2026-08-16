import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useChatController } from "../hooks/useChatController";
import { ChatScreen } from "./ChatScreen";

vi.mock("../hooks/useChatController", () => ({ useChatController: vi.fn() }));
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
