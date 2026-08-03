import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FloatingMessenger } from "./FloatingMessenger";
import { useChatController } from "../hooks/useChatController";

vi.mock("../hooks/useChatController", () => ({
  useChatController: vi.fn(),
}));

vi.mock("../api/chat.api", () => ({
  chatApi: {
    suggestions: vi.fn().mockResolvedValue([]),
  },
}));

const controller = {
  unread: 0,
  threads: [],
  active: null,
  threadState: "ready",
  loadThreads: vi.fn(),
  setFocused: vi.fn(),
  openConversation: vi.fn(),
};

beforeEach(() => {
  vi.mocked(useChatController).mockReturnValue(
    controller as unknown as ReturnType<typeof useChatController>,
  );
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function openThreadList() {
  const { container } = render(
    <FloatingMessenger userId="viewer-1" onOpenFullChat={vi.fn()} onOpenStory={vi.fn()} />,
  );
  fireEvent.click(container.querySelector(".floating-message-launcher") as HTMLButtonElement);
  return container;
}

describe("FloatingMessenger conversation creation", () => {
  it("keeps only the compose action in the header", () => {
    const container = openThreadList();

    expect(container.querySelector(".floating-message-tools button")).toBeInTheDocument();
    expect(container.querySelector(".floating-compose")).not.toBeInTheDocument();
  });

  it("mounts the shared new-conversation dialog outside the clipped panel", () => {
    const container = openThreadList();
    const panel = container.querySelector(".floating-message-panel");
    fireEvent.click(container.querySelector(".floating-message-tools button") as HTMLButtonElement);

    const dialog = screen.getByRole("dialog");
    expect(panel).not.toContainElement(dialog);
  });
});
