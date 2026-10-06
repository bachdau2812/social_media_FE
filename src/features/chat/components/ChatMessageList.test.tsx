import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { useChatController } from "../hooks/useChatController";
import type { ChatMessage } from "../model/chat.types";
import { ChatMessageList } from "./ChatMessageList";

afterEach(cleanup);

type Controller = ReturnType<typeof useChatController>;

const messagingCss = [
  readFileSync(
    resolve(process.cwd(), "src/features/chat/styles/messaging-advanced.css"),
    "utf8",
  ),
  readFileSync(
    resolve(process.cwd(), "src/shared/styles/layout-regression-fixes.css"),
    "utf8",
  ),
].join("\n");

function message(id: string, senderId: string): ChatMessage {
  return {
    id,
    conversationId: "conversation-1",
    messageSeq: Number(id),
    senderId,
    messageType: "TEXT",
    content: `message-${id}`,
    createdAt: "2026-07-30T08:00:00Z",
    status: "sent",
  };
}

function imageMessage(id: string, senderId: string): ChatMessage {
  return {
    ...message(id, senderId),
    messageType: "IMAGE",
    content: "image-caption",
    metadata: {
      items: [{
        id: `image-${id}`,
        url: `https://host/image-${id}.jpg`,
        width: 1200,
        height: 800,
      }],
    },
  };
}

function controller(messages: ChatMessage[]): Controller {
  return {
    activeMessages: messages,
    activeId: "conversation-1",
    messageState: "ready",
    highlightedSeq: null,
    hasMore: false,
    loadingOlder: false,
    loadOlder: vi.fn().mockResolvedValue(undefined),
    loadMessages: vi.fn().mockResolvedValue(undefined),
    focusMessage: vi.fn().mockResolvedValue(undefined),
    setReplyTo: vi.fn(),
  } as unknown as Controller;
}

describe("ChatMessageList", () => {
  it.each([false, true])("keeps the reaction picker beside text, image, audio and reply bubbles and counts below (compact=%s)", (compact) => {
    const text: ChatMessage = { ...message("10", "me"), reactions: [{ type: "HEART", count: 1 }] };
    const audio: ChatMessage = { ...message("12", "other"), messageType: "AUDIO", metadata: { url: "https://host/audio.mp3" } };
    const reply: ChatMessage = { ...message("13", "me"), replyToSeq: 10, reply: { messageSeq: 10, content: "quoted", messageType: "TEXT" } };
    const current = controller([text, imageMessage("11", "me"), audio, reply]);
    const select = vi.fn();
    current.selectReaction = select;
    render(<ChatMessageList controller={current} userId="me" compact={compact} onOpenMedia={vi.fn()} onOpenStory={vi.fn()} />);
    const triggers = screen.getAllByRole("button", { name: "Chọn cảm xúc" });
    expect(triggers).toHaveLength(4);
    triggers.forEach((trigger) => {
      expect(trigger.closest(".dm-bubble,.floating-bubble")).toBeNull();
      expect(trigger.closest(".dm-message-actions")).not.toBeNull();
      expect(trigger.closest(".chat-message-stack")).toBeNull();
    });
    const count = screen.getByRole("button", { name: "Xem 1 cảm xúc" });
    expect(count.closest(".chat-message-stack")).not.toBeNull();
    expect(count.closest(".dm-bubble,.floating-bubble,.dm-message-actions")).toBeNull();
    fireEvent.click(triggers[2]);
    fireEvent.click(screen.getByRole("button", { name: "Wow" }));
    expect(select).toHaveBeenCalledWith("conversation-1", audio, "WOW");
  });
  it("preserves outgoing and incoming alignment on both chat surfaces", () => {
    const messages = [message("1", "me"), message("2", "other")];
    const common = { controller: controller(messages), userId: "me", onOpenMedia: vi.fn(), onOpenStory: vi.fn() };
    const { container, rerender } = render(<ChatMessageList {...common} compact />);

    const outgoing = container.querySelector<HTMLElement>(".floating-bubble-row.outgoing .floating-message-content");
    expect(outgoing).toHaveClass("outgoing");
    expect(container.querySelector(".floating-bubble-row.incoming .floating-message-content")).toHaveClass("incoming");

    rerender(<ChatMessageList {...common} compact={false} />);
    expect(container.querySelector(".dm-bubble-row.outgoing .dm-message-content")).toHaveClass("outgoing");
    expect(container.querySelector(".dm-bubble-row.incoming .dm-message-content")).toHaveClass("incoming");
  });

  it("keeps image media and captions on the same horizontal content edge in both chat surfaces", () => {
    const messages = [imageMessage("5", "me"), imageMessage("6", "other")];
    const common = {
      controller: controller(messages),
      userId: "me",
      onOpenMedia: vi.fn(),
      onOpenStory: vi.fn(),
    };
    const { container, rerender } = render(<ChatMessageList {...common} compact={false} />);

    expect(container.querySelectorAll(".dm-bubble.image-message .chat-media-group.media-card")).toHaveLength(2);

    rerender(<ChatMessageList {...common} compact />);

    expect(container.querySelectorAll(".floating-bubble.image-message .chat-media-group.media-card")).toHaveLength(2);
    expect(messagingCss).not.toMatch(
      /\.chat-media-group\.media-card \.chat-media-mosaic\s*\{[^}]*padding-inline:\s*10px;/s,
    );
    expect(messagingCss).toMatch(
      /\.dm-bubble-row\.outgoing \.dm-message-content\s*\{[^}]*flex-direction:\s*row;[^}]*justify-content:\s*flex-end;/s,
    );
    expect(messagingCss).toMatch(
      /\.chat-media-group\.media-card > figcaption,[\s\S]*?\{[^}]*padding:\s*8px 10px;/s,
    );
  });

  it("uses the shared Story reply renderer in full and compact surfaces", () => {
    const storyReply: ChatMessage = {
      ...message("3", "other"),
      senderDisplayName: "An",
      messageType: "STORY_REPLY",
      content: "hello",
      storyContext: {
        storyId: "story-1",
        storyOwnerId: "owner-1",
        mediaType: "IMAGE",
        previewAtMs: 0,
        expiresAt: "2026-08-01T00:00:00Z",
        available: true,
        previewUrl: "https://host/story.jpg",
      },
    };
    const onOpenStory = vi.fn();
    const common = { controller: controller([storyReply]), userId: "me", onOpenMedia: vi.fn(), onOpenStory };
    const { container, rerender } = render(<ChatMessageList {...common} compact={false} />);

    const fullLabel = screen.getByText("An đã trả lời tin của bạn");
    const fullImage = container.querySelector(".story-reply-message:not(.compact) img")!;
    expect(fullLabel.compareDocumentPosition(fullImage) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector(".story-reply-message:not(.compact) img")).toHaveAttribute(
      "src", "https://host/story.jpg");
    fireEvent.click(screen.getByRole("button", { name: "Mở Story đã trả lời" }));
    expect(onOpenStory).toHaveBeenLastCalledWith("owner-1", "story-1");

    rerender(<ChatMessageList {...common} compact />);
    expect(screen.getByText("An đã trả lời tin của bạn")).toBeInTheDocument();
    expect(container.querySelector(".story-reply-message.compact img")).toHaveAttribute(
      "src", "https://host/story.jpg");
    fireEvent.click(screen.getByRole("button", { name: "Mở Story đã trả lời" }));
    expect(onOpenStory).toHaveBeenCalledTimes(2);
  });

  it("renders the stable unavailable state after the Story is removed", () => {
    const unavailable: ChatMessage = {
      ...message("4", "other"),
      messageType: "STORY_REPLY",
      content: "hello",
      storyContext: {
        storyId: "story-1",
        storyOwnerId: "owner-1",
        mediaType: "IMAGE",
        previewAtMs: 0,
        expiresAt: "2026-08-01T00:00:00Z",
        available: false,
        previewUrl: null,
      },
    };

    render(<ChatMessageList controller={controller([unavailable])} userId="me" onOpenMedia={vi.fn()} onOpenStory={vi.fn()} />);

    expect(screen.queryByRole("button", { name: "Mở Story đã trả lời" })).not.toBeInTheDocument();

    expect(screen.getByText("Tin không hiển thị")).toBeInTheDocument();
  });
});
