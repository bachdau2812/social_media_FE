import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StoryItem } from "../model/story.types";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { StoryRail, StoryViewer } from "./StoryViewer";
import { storyApi } from "../api/story.api";

function story(id: string, userId: string): StoryItem {
  return { id, userId, name: `Name ${id}`, username: `user_${id}`, avatarUrl: "", createdAt: new Date().toISOString(), totalItems: 1, seenItems: 0, state: "unseen" };
}

describe("StoryViewer", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("copies a directly resolvable story URL with owner and encoded story ID", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<StoryViewer stories={[story("story/one", "me")]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    fireEvent.click(screen.getByRole("button", { name: "More options" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/story/me/story%2Fone`);
  });

  it("keeps Add Story at the left edge before the Story items", () => {
    const items = [story("first", "u1"), story("second", "u2")];
    const { container } = render(<StoryRail userId="me" items={items} onCreate={vi.fn()} onSelect={vi.fn()} />);
    const strip = container.querySelector(".story-strip");

    expect(strip).toHaveClass("story-strip-left");
    const railActions = within(strip as HTMLElement).getAllByRole("button");
    expect(railActions[0]).toHaveAccessibleName("Add story");
    expect(railActions[1]).toHaveTextContent("Name first");
    expect(railActions[2]).toHaveTextContent("Name second");
  });

  it("shows rail arrows only when horizontal Story overflow can be scrolled", () => {
    const items = [story("first", "u1"), story("second", "u2"), story("third", "u3")];
    const { container } = render(<StoryRail userId="me" items={items} onCreate={vi.fn()} onSelect={vi.fn()} />);
    const strip = container.querySelector(".story-strip") as HTMLDivElement;
    const previous = container.querySelector(".story-scroll-button.previous");
    const next = container.querySelector(".story-scroll-button.next");
    Object.defineProperties(strip, {
      scrollWidth: { configurable: true, value: 600 },
      clientWidth: { configurable: true, value: 300 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });

    fireEvent.resize(window);
    expect(previous).toHaveAttribute("hidden");
    expect(next).not.toHaveAttribute("hidden");

    strip.scrollLeft = 300;
    fireEvent.scroll(strip);
    expect(previous).not.toHaveAttribute("hidden");
    expect(next).toHaveAttribute("hidden");
  });

  it("keeps the body locked when another overlay closes before the viewer", () => {
    const item = story("locked", "other");
    function PeerLock() {
      useBodyScrollLock(true);
      return null;
    }
    const viewer = <StoryViewer stories={[item]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />;
    const { rerender, unmount } = render(<><PeerLock />{viewer}</>);

    expect(document.body.style.overflow).toBe("hidden");
    rerender(viewer);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("renders a fixed three-slide track and commits only after transitionend", async () => {
    const stories = [story("a", "u1"), story("b", "u2"), story("c", "u3")];
    const onSelectIndex = vi.fn();
    const { container } = render(<StoryViewer stories={stories} index={1} currentUserId="me" onClose={vi.fn()} onSelectIndex={onSelectIndex} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);

    expect(container.querySelectorAll(".story-slide")).toHaveLength(3);
    expect(container.querySelector(".story-header-nickname")).toHaveTextContent("user_b");
    fireEvent.click(container.querySelector(".story-external-arrow.next")!);
    await waitFor(() => expect(container.querySelector(".story-track")).toHaveClass("is-animating"));
    expect(onSelectIndex).not.toHaveBeenCalled();
    expect(container.querySelector(".story-header-nickname")).toHaveTextContent("user_b");

    fireEvent.transitionEnd(container.querySelector(".story-track")!, { propertyName: "transform" });
    expect(onSelectIndex).toHaveBeenCalledWith(2);
  });

  it("moves the active progress segment when slide animation starts", async () => {
    const stories = [story("a", "u1"), story("b", "u1")];
    const { container } = render(
      <StoryViewer
        stories={stories}
        index={0}
        currentUserId="me"
        onClose={vi.fn()}
        onSelectIndex={vi.fn()}
        onViewed={vi.fn()}
        onOpenProfile={vi.fn().mockResolvedValue(undefined)}
      />,
    );
    const progressSegments = () => [...container.querySelectorAll(".story-segments > span")];
    expect(progressSegments()[0]).toHaveClass("active");

    fireEvent.click(container.querySelector(".story-external-arrow.next")!);
    await waitFor(() => expect(container.querySelector(".story-track")).toHaveClass("is-animating"));

    expect(progressSegments()[1]).toHaveClass("active");
    expect(container.querySelector(".story-header-nickname")).toHaveTextContent("user_a");
  });

  it("shows the three-dot menu trigger only for the current user's story", () => {
    const mine = story("mine", "me");
    const { rerender } = render(<StoryViewer stories={[mine]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    expect(screen.getByRole("button", { name: "More options" })).toBeInTheDocument();
    expect(screen.queryByText("Delete story")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "More options" }));
    expect(screen.getByText("Delete story")).toBeInTheDocument();

    rerender(<StoryViewer stories={[{ ...mine, userId: "other" }]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    expect(screen.queryByRole("button", { name: "More options" })).not.toBeInTheDocument();
  });

  it("rolls back an optimistic Story Like when the request fails", async () => {
    const like = vi.spyOn(storyApi, "like").mockRejectedValue(new Error("network"));
    const item = { ...story("like-me", "other"), viewerReaction: null };
    render(<StoryViewer stories={[item]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);

    const control = screen.getByRole("button", { name: "Like story" });
    fireEvent.click(control);
    expect(control).toHaveClass("active");
    await waitFor(() => expect(control).not.toHaveClass("active"));
    expect(screen.getByRole("alert")).toHaveTextContent("Không thể cập nhật lượt thích");
    expect(like).toHaveBeenCalledWith("like-me");
  });

  it("does not render a Like control on the current user's own Story", () => {
    render(<StoryViewer stories={[story("mine", "me")]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);

    expect(screen.queryByRole("button", { name: "Like story" })).not.toBeInTheDocument();
  });

  it("does not capture pointer gestures that start from Like or Viewers controls", () => {
    const { container, rerender } = render(<StoryViewer stories={[story("theirs", "other")]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    const viewport = container.querySelector<HTMLElement>(".story-viewport")!;
    const capture = vi.fn();
    viewport.setPointerCapture = capture;

    fireEvent.pointerDown(screen.getByRole("button", { name: "Like story" }), { pointerId: 1, button: 0 });
    expect(capture).not.toHaveBeenCalled();

    rerender(<StoryViewer stories={[story("mine", "me")]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Xem người xem" }), { pointerId: 2, button: 0 });
    expect(capture).not.toHaveBeenCalled();

    fireEvent.pointerDown(viewport, { pointerId: 3, button: 0 });
    expect(capture).toHaveBeenCalledWith(3);
  });

  it("sends an image Story reply with preview zero and clears only after success", async () => {
    const reply = vi.spyOn(storyApi, "reply").mockResolvedValue({
      conversationId: "conversation-1", messageId: "message-1", messageSeq: 1,
    });
    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("11111111-1111-4111-8111-111111111111");
    const item = { ...story("reply-image", "other"), mediaType: "IMAGE" as const, mediaUrl: "https://host/story.jpg" };
    const { container } = render(<StoryViewer stories={[item]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(container.querySelector(".story-viewer")).toHaveClass("paused");
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send reply" }));

    await waitFor(() => expect(reply).toHaveBeenCalledWith("reply-image", {
      content: "hello",
      clientMessageId: "11111111-1111-4111-8111-111111111111",
      previewAtMs: 0,
    }));
    await waitFor(() => expect(input).toHaveValue(""));
    expect(container.querySelector(".story-viewer")).not.toHaveClass("paused");
  });

  it("captures the current video frame and preserves the draft when sending fails", async () => {
    const reply = vi.spyOn(storyApi, "reply").mockRejectedValue(new Error("network"));
    const item = { ...story("reply-video", "other"), mediaType: "VIDEO" as const, mediaUrl: "https://host/story.mp4" };
    const { container } = render(<StoryViewer stories={[item]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    const video = container.querySelector<HTMLVideoElement>("video.story-media")!;
    video.currentTime = 12.4;
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "video reply" } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => expect(reply).toHaveBeenCalledWith("reply-video", expect.objectContaining({
      content: "video reply", previewAtMs: 12400,
    })));
    expect(input).toHaveValue("video reply");
    expect(screen.getByRole("alert")).toHaveTextContent("Không thể gửi trả lời");
  });

  it("locks duplicate Story reply submissions while the first request is pending", async () => {
    let resolveReply!: (value: { conversationId: string; messageId: string; messageSeq: number }) => void;
    vi.spyOn(storyApi, "reply").mockImplementation(() => new Promise((resolve) => { resolveReply = resolve; }));
    const item = { ...story("reply-once", "other"), mediaType: "IMAGE" as const, mediaUrl: "https://host/story.jpg" };
    render(<StoryViewer stories={[item]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "once" } });
    const form = input.closest("form")!;
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(storyApi.reply).toHaveBeenCalledTimes(1);
    resolveReply({ conversationId: "conversation-1", messageId: "message-1", messageSeq: 1 });
    await waitFor(() => expect(input).toHaveValue(""));
  });

  it("does not render a reply composer on the current user's own Story", () => {
    render(<StoryViewer stories={[story("own-reply", "me")]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("pauses playback while the owner viewers sheet is open and resumes when it closes", async () => {
    vi.spyOn(storyApi, "viewers").mockResolvedValue({ content: [], pageNumber: 0, totalElements: 7, totalPages: 1 });
    const { container } = render(<StoryViewer stories={[story("mine", "me")]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);

    fireEvent.click(screen.getByRole("button", { name: "Xem người xem" }));
    expect(screen.getByRole("dialog", { name: "Danh sách người xem Story" })).toBeInTheDocument();
    expect(container.querySelector(".story-viewer")).toHaveClass("paused");
    const viewersSheet = screen.getByRole("dialog", { name: "Danh sách người xem Story" });
    expect(await within(viewersSheet).findByText(/7\s*lượt xem/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Xem người xem" })).toHaveTextContent("7 lượt xem");

    fireEvent.click(screen.getByRole("button", { name: "Đóng danh sách người xem" }));
    expect(container.querySelector(".story-viewer")).not.toHaveClass("paused");
    await waitFor(() => expect(storyApi.viewers).toHaveBeenCalledWith("mine", "me", 0, 20));
  });

  it("renders a stable unavailable frame for an expired single-Story destination", () => {
    const item = { ...story("expired", "other"), status: "EXPIRED" };
    render(<StoryViewer stories={[item]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);

    expect(screen.getByText("Tin không hiển thị")).toBeInTheDocument();
  });

  it("records each story only once even when the callback identity changes", async () => {
    const item = story("seen", "other");
    const onViewed = vi.fn();
    const common = { stories: [item], index: 0, currentUserId: "me", onClose: vi.fn(), onSelectIndex: vi.fn(), onOpenProfile: vi.fn().mockResolvedValue(undefined) };
    const { rerender } = render(<StoryViewer {...common} onViewed={onViewed} />);
    await waitFor(() => expect(onViewed).toHaveBeenCalledTimes(1));

    rerender(<StoryViewer {...common} onViewed={(id) => onViewed(id)} />);
    await waitFor(() => expect(onViewed).toHaveBeenCalledTimes(1));
  });

  it("keeps music audible when the user retries playback after unmuting", async () => {
    let playbackAllowed = false;
    const instances: FakeAudio[] = [];
    class FakeAudio extends EventTarget {
      muted = false;
      currentTime = 0;
      duration = 30;
      loop = false;
      preload = "";
      play = vi.fn(() => playbackAllowed ? Promise.resolve() : Promise.reject(new Error("blocked")));
      pause = vi.fn();
      load = vi.fn();
      constructor(public src: string) {
        super();
        instances.push(this);
      }
    }
    vi.stubGlobal("Audio", FakeAudio);
    const item = { ...story("music", "other"), musicUrl: "https://cdn.example.test/music.mp3" };
    const { container } = render(<StoryViewer stories={[item]} index={0} currentUserId="me" onClose={vi.fn()} onSelectIndex={vi.fn()} onViewed={vi.fn()} onOpenProfile={vi.fn().mockResolvedValue(undefined)} />);

    await screen.findByRole("button", { name: "Tap to play" });
    const soundControl = container.querySelector(".story-control")!;
    fireEvent.pointerDown(soundControl, { pointerId: 1, clientX: 20, clientY: 20 });
    expect(container.querySelector(".story-viewer")).not.toHaveClass("paused");
    fireEvent.pointerUp(soundControl, { pointerId: 1, clientX: 20, clientY: 20 });
    fireEvent.click(soundControl);
    expect(soundControl).toHaveAttribute("aria-label", "Bật âm thanh");
    fireEvent.click(soundControl);
    expect(soundControl).toHaveAttribute("aria-label", "Tắt âm thanh");
    await screen.findByRole("button", { name: "Tap to play" });
    playbackAllowed = true;
    fireEvent.click(screen.getByRole("button", { name: "Tap to play" }));

    const playbackAudio = instances.find((audio) => audio.play.mock.calls.length > 0);
    await waitFor(() => expect(playbackAudio?.play).toHaveBeenCalled());
    expect(playbackAudio?.muted).toBe(false);
  });

  it("closes automatically after the final story completes", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const item = { ...story("final", "other"), durationSeconds: 0.1 };
    const { container } = render(
      <StoryViewer
        stories={[item]}
        index={0}
        currentUserId="me"
        onClose={onClose}
        onSelectIndex={vi.fn()}
        onViewed={vi.fn()}
        onOpenProfile={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });

    expect(onClose).toHaveBeenCalledOnce();
    expect(container.querySelector(".story-end-state")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
