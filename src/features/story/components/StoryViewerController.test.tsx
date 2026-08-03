import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StoryItem } from "../model/story.types";

const mocks = vi.hoisted(() => ({
  ensureReady: vi.fn(async () => true),
  getState: vi.fn(() => "ready" as const),
  markState: vi.fn(),
  preloadAround: vi.fn(async () => undefined),
  retry: vi.fn(async () => undefined),
  move: vi.fn(async () => undefined),
  retryPlay: vi.fn(),
}));

vi.mock("../hooks/useStoryPreloader", () => ({
  useStoryPreloader: () => ({
    ensureReady: mocks.ensureReady,
    getState: mocks.getState,
    markState: mocks.markState,
    preloadAround: mocks.preloadAround,
    retry: mocks.retry,
  }),
}));
vi.mock("../hooks/useStoryNavigation", () => ({
  useStoryNavigation: () => ({
    committedIndex: 0,
    pendingIndex: null,
    direction: null,
    transitionState: "idle",
    isPreparing: false,
    isDragging: false,
    isSnapping: false,
    trackTransform: "translate3d(-100%, 0, 0)",
    move: mocks.move,
    moveTo: mocks.move,
    pointerHandlers: {},
    onTransitionEnd: vi.fn(),
    consumeSuppressedClick: () => false,
  }),
}));
vi.mock("../hooks/useStoryPlayback", () => ({
  useStoryPlayback: () => ({
    progress: 0,
    playBlocked: false,
    retryPlay: mocks.retryPlay,
    videoRef: () => undefined,
    currentVideoTimeMs: () => 0,
  }),
}));
vi.mock("../../../shared/overlays/useBodyScrollLock", () => ({ useBodyScrollLock: () => undefined }));
vi.mock("../api/story.api", () => ({ storyApi: { like: vi.fn(), unlike: vi.fn(), reply: vi.fn() } }));
vi.mock("./StoryHeader", () => ({ StoryHeader: () => null }));
vi.mock("./StoryProgress", () => ({ StoryProgress: () => null }));
vi.mock("./StoryReplyComposer", () => ({ StoryReplyComposer: () => null }));
vi.mock("./StorySlide", () => ({ StorySlide: () => null }));
vi.mock("./StoryViewersPanel", () => ({ StoryViewersPanel: () => null }));
vi.mock("./StoryTrack", () => ({ StoryTrack: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("./StoryViewport", () => ({ StoryViewport: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));

import { StoryViewerController } from "./StoryViewerController";

const story: StoryItem = {
  id: "story-1",
  userId: "owner-1",
  name: "Owner",
  username: "owner",
  avatarUrl: "",
  mediaUrl: "https://cdn.example.test/story.jpg",
  mediaType: "IMAGE",
  musicUrl: "https://cdn.example.test/music.mp3",
  durationSeconds: 5,
  totalItems: 1,
  seenItems: 0,
  state: "unseen",
};

const props = {
  stories: [story],
  index: 0,
  currentUserId: "viewer-1",
  onClose: vi.fn(),
  onSelectIndex: vi.fn(),
  onViewed: vi.fn(),
  onDelete: vi.fn(),
  onOpenProfile: vi.fn(async () => undefined),
};

afterEach(() => vi.clearAllMocks());

describe("StoryViewerController audio defaults", () => {
  it("starts every newly mounted Viewer unmuted", () => {
    const first = render(<StoryViewerController {...props} />);
    expect(screen.getByRole("button", { name: "Tắt âm thanh" })).toBeInTheDocument();
    first.unmount();

    render(<StoryViewerController {...props} />);
    expect(screen.getByRole("button", { name: "Tắt âm thanh" })).toBeInTheDocument();
  });
});
