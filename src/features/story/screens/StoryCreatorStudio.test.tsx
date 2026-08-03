import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiGet } from "../../../shared/api";
import { StoryCreatorStudio } from "./StoryCreatorStudio";

vi.mock("../../../shared/api", () => ({
  apiGet: vi.fn(),
  apiSend: vi.fn(),
  uploadCloudinaryMedia: vi.fn(),
}));

class AudioStub {
  static instances: AudioStub[] = [];
  currentTime = 0;
  paused = true;
  preload = "";
  listeners = new Map<string, () => void>();
  play = vi.fn(async () => {
    this.paused = false;
  });
  pause = vi.fn(() => {
    this.paused = true;
  });
  addEventListener = vi.fn((name: string, listener: () => void) => {
    this.listeners.set(name, listener);
  });
  removeEventListener = vi.fn((name: string) => {
    this.listeners.delete(name);
  });

  constructor(public src: string) {
    AudioStub.instances.push(this);
  }
}

describe("StoryCreatorStudio", () => {
  beforeEach(() => {
    AudioStub.instances = [];
    vi.stubGlobal("Audio", AudioStub);
    vi.mocked(apiGet).mockResolvedValue({
      content: [{
        id: "music-1",
        displayName: "Demo track",
        singleName: "Demo artist",
        duration: 120,
        songUrl: "/demo.mp3",
      }],
      pageNumber: 0,
      totalPages: 1,
    });
    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.hasPointerCapture = vi.fn(() => true);
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("opens and closes the mobile editing tools without replacing the canvas", async () => {
    const { container } = render(
      <StoryCreatorStudio
        userId="me"
        onClose={vi.fn()}
        onPublished={vi.fn()}
        initialDraft={{
          id: "draft-1",
          draftType: "STORY",
          payload: JSON.stringify([{ id: "story-1", secureUrl: "https://cdn.example/story.jpg", fileName: "story.jpg", mediaType: "IMAGE" }]),
        }}
      />,
    );

    await waitFor(() => expect(screen.getByAltText("story.jpg")).toBeInTheDocument());
    const canvas = container.querySelector(".story-studio-media");
    const tools = container.querySelector(".story-studio-tools");
    const trigger = screen.getByRole("button", { name: "Mở công cụ chỉnh sửa" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(tools).not.toHaveClass("is-open");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(tools).toHaveClass("is-open");
    expect(container.querySelector(".story-studio-media")).toBe(canvas);

    fireEvent.click(screen.getByRole("button", { name: "Đóng công cụ chỉnh sửa" }));
    expect(tools).not.toHaveClass("is-open");
  });

  it("uses a thirty second segment and previews only after the end handle is released", async () => {
    const { container } = render(
      <StoryCreatorStudio
        userId="me"
        onClose={vi.fn()}
        onPublished={vi.fn()}
        initialDraft={{
          id: "draft-1",
          draftType: "STORY",
          payload: JSON.stringify([{
            id: "story-1",
            secureUrl: "https://cdn.example/story.jpg",
            fileName: "story.jpg",
            mediaType: "IMAGE",
          }]),
        }}
      />,
    );

    await waitFor(() => expect(screen.getByAltText("story.jpg")).toBeInTheDocument());
    fireEvent.click(container.querySelector(".story-add-music") as HTMLElement);
    await waitFor(() => expect(screen.getByText("Demo track")).toBeInTheDocument());
    fireEvent.click(screen.getByText("Demo track").closest("button") as HTMLElement);

    const editor = within(container);
    const start = await editor.findByRole("slider", { name: "Music segment start" });
    const end = editor.getByRole("slider", { name: "Music segment end" });
    expect(start).toHaveAttribute("aria-valuenow", "0");
    expect(end).toHaveAttribute("aria-valuenow", "30");

    const rail = container.querySelector(".music-segment-editor__rail") as HTMLElement;
    rail.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 120,
      bottom: 8,
      width: 120,
      height: 8,
      toJSON: () => undefined,
    });

    fireEvent.pointerDown(end, { pointerId: 1, clientX: 30 });
    fireEvent.pointerMove(end, { pointerId: 1, clientX: 60 });
    expect(end).toHaveAttribute("aria-valuenow", "60");
    expect(AudioStub.instances).toHaveLength(0);

    fireEvent.pointerUp(end, { pointerId: 1, clientX: 60 });
    await waitFor(() => expect(AudioStub.instances).toHaveLength(1));
    expect(AudioStub.instances[0].play).toHaveBeenCalledOnce();
    expect(AudioStub.instances[0].currentTime).toBe(0);
  });
});
