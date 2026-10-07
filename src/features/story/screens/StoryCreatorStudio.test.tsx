import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiGet, apiSend } from "../../../shared/api";
import { MUSIC_FETCH_RESULT_EVENT, type MusicDto } from "../../../shared/music";
import { APP_TOAST_EVENT } from "../../../shared/notifications/appToast";
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
  it('protects an unpublished Story on reload and permits explicit discard', async () => {
    const onClose = vi.fn();
    render(<StoryCreatorStudio userId="v" onClose={onClose} onPublished={vi.fn()} initialDraft={{ id: 'story-guard', draftType: 'STORY', payload: JSON.stringify([{ id: 'draft-media', secureUrl: '/draft.jpg', fileName: 'draft.jpg', mediaType: 'IMAGE' }]) }} />);
    await waitFor(() => { const event = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(event); expect(event.defaultPrevented).toBe(true); });
    fireEvent.click(screen.getByRole('button', { name: 'Đóng trình tạo Story' }));
    fireEvent.click(screen.getByRole('button', { name: 'Bỏ bản nháp' }));
    expect(onClose).toHaveBeenCalledOnce();
    const event = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(event); expect(event.defaultPrevented).toBe(false);
  });
  it('removes closed mobile editing tools from keyboard navigation', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
    const { container } = render(<StoryCreatorStudio userId="v" onClose={vi.fn()} onPublished={vi.fn()} />);
    expect(container.querySelector('#story-studio-tools')).toHaveAttribute('hidden');
  });
  let toastMessages: string[];
  const captureToast = (event: Event) => toastMessages.push((event as CustomEvent<string>).detail);

  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
    AudioStub.instances = [];
    vi.stubGlobal("Audio", AudioStub);
    vi.mocked(apiGet).mockReset();
    vi.mocked(apiSend).mockReset();
    vi.mocked(apiSend).mockResolvedValue({ trackId: "1Gqm6KaobG2A1mFVjGnJsS", status: "STARTED" });
    toastMessages = [];
    window.addEventListener(APP_TOAST_EVENT, captureToast);
    vi.mocked(apiGet).mockResolvedValue({
      content: [{
        id: "music-1",
        slugName: null,
        displayName: "Demo track",
        singleName: "Demo artist",
        duration: 120,
        songUrl: "/demo.mp3",
        descriptions: null,
        displayImages: null,
        category: null,
        releaseYear: 2024,
        albumName: "Album",
        fetched: true,
      }],
      pageNumber: 0,
      totalPages: 1,
    });
    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.hasPointerCapture = vi.fn(() => true);
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  afterEach(() => {
    window.removeEventListener(APP_TOAST_EVENT, captureToast);
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
    fireEvent.click(screen.getByRole("button", { name: "Select Demo track" }));

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
  it("keeps unfetched Story tracks gated until the shared SSE success arrives", async () => {
    const unfetched: MusicDto = {
      id: "1Gqm6KaobG2A1mFVjGnJsS",
      slugName: null,
      displayName: "Unfetched Story Song",
      descriptions: null,
      displayImages: null,
      singleName: "Artist",
      songUrl: null,
      duration: 180,
      category: null,
      releaseYear: 2024,
      albumName: "Album",
      fetched: false,
    };
    const ready: MusicDto = {
      ...unfetched,
      id: "3n3Ppam7vgaVa1iaRUc9Lp",
      displayName: "Ready Story Song",
      fetched: true,
      songUrl: "https://host/ready.flac",
    };
    vi.mocked(apiGet).mockResolvedValue({ content: [unfetched, ready], pageNumber: 0, totalPages: 1 });

    const { container } = render(
      <StoryCreatorStudio
        userId="me"
        onClose={vi.fn()}
        onPublished={vi.fn()}
        initialDraft={{
          id: "draft-fetch",
          draftType: "STORY",
          payload: JSON.stringify([{ id: "story-fetch", secureUrl: "https://cdn.example/story.jpg", fileName: "story.jpg", mediaType: "IMAGE" }]),
        }}
      />,
    );

    await waitFor(() => expect(screen.getByAltText("story.jpg")).toBeInTheDocument());
    fireEvent.click(container.querySelector(".story-add-music") as HTMLElement);
    const fetchButton = await screen.findByRole("button", { name: "Fetch Unfetched Story Song" });
    expect(screen.queryByRole("button", { name: "Select Unfetched Story Song" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Select Ready Story Song" })).toBeEnabled();

    fireEvent.click(fetchButton);
    fireEvent.click(fetchButton);
    await waitFor(() => expect(apiSend).toHaveBeenCalledTimes(1));
    expect(toastMessages).toContain("Đang tải bài hát Unfetched Story Song...");
    expect(screen.getByRole("button", { name: "Processing Unfetched Story Song" })).toBeDisabled();

    const fetched = { ...unfetched, fetched: true, songUrl: "https://host/fetched.flac" };
    window.dispatchEvent(new CustomEvent(MUSIC_FETCH_RESULT_EVENT, {
      detail: { kind: "success", music: fetched },
    }));

    expect(await screen.findByRole("button", { name: "Select Unfetched Story Song" })).toBeEnabled();
  });

  it("restores the Story Fetch action after a failed event", async () => {
    const unfetched: MusicDto = {
      id: "2plbrEY59IikOBgBGLjaoe",
      slugName: null,
      displayName: "Failed Story Song",
      descriptions: null,
      displayImages: null,
      singleName: "Artist",
      songUrl: null,
      duration: 180,
      category: null,
      releaseYear: 2024,
      albumName: "Album",
      fetched: false,
    };
    vi.mocked(apiGet).mockResolvedValue({ content: [unfetched], pageNumber: 0, totalPages: 1 });

    const { container } = render(
      <StoryCreatorStudio
        userId="me"
        onClose={vi.fn()}
        onPublished={vi.fn()}
        initialDraft={{
          id: "draft-failure",
          draftType: "STORY",
          payload: JSON.stringify([{ id: "story-failure", secureUrl: "https://cdn.example/story.jpg", fileName: "story.jpg", mediaType: "IMAGE" }]),
        }}
      />,
    );

    await waitFor(() => expect(screen.getByAltText("story.jpg")).toBeInTheDocument());
    fireEvent.click(container.querySelector(".story-add-music") as HTMLElement);
    fireEvent.click(await screen.findByRole("button", { name: "Fetch Failed Story Song" }));
    window.dispatchEvent(new CustomEvent(MUSIC_FETCH_RESULT_EVENT, {
      detail: { kind: "failure", trackId: unfetched.id, message: "Không thể tải bài hát." },
    }));

    expect(await screen.findByRole("button", { name: "Fetch Failed Story Song" })).toBeEnabled();
  });

  it("emits the accepted toast before waiting for feed refresh", async () => {
    let resolvePublished: (() => void) | undefined;
    const onPublished = vi.fn(() => new Promise<void>((resolve) => { resolvePublished = resolve; }));
    render(
      <StoryCreatorStudio
        userId="me"
        onClose={vi.fn()}
        onPublished={onPublished}
        initialDraft={{
          id: "draft-publish",
          draftType: "STORY",
          payload: JSON.stringify([{ id: "story-publish", secureUrl: "https://cdn.example/story.jpg", fileName: "story.jpg", mediaType: "IMAGE" }]),
        }}
      />,
    );

    await screen.findByAltText("story.jpg");
    fireEvent.click(screen.getByRole("button", { name: "Đăng Story" }));
    await waitFor(() => expect(onPublished).toHaveBeenCalledOnce());
    expect(toastMessages).toContain("Story đang được xử lý và sẽ sớm hiển thị.");
    resolvePublished?.();
  });

  it("emits an immediate toast when a Story cannot be submitted", async () => {
    vi.mocked(apiSend).mockRejectedValueOnce(new Error("Story backend unavailable"));
    render(
      <StoryCreatorStudio
        userId="me"
        onClose={vi.fn()}
        onPublished={vi.fn()}
        initialDraft={{
          id: "draft-rejected",
          draftType: "STORY",
          payload: JSON.stringify([{ id: "story-rejected", secureUrl: "https://cdn.example/story.jpg", fileName: "story.jpg", mediaType: "IMAGE" }]),
        }}
      />,
    );

    await screen.findByAltText("story.jpg");
    fireEvent.click(screen.getByRole("button", { name: "Đăng Story" }));

    await waitFor(() => expect(toastMessages).toContain("Story backend unavailable"));
  });
});
