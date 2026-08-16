// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MUSIC_FETCH_RESULT_EVENT, type MusicDto } from "../../../shared/music";
import { APP_TOAST_EVENT } from "../../../shared/notifications/appToast";
import { PostCreationStudio } from "./PostCreationStudio";

const apiGet = vi.fn();
const apiSend = vi.fn();

vi.mock("../../../shared/api", () => ({
  apiGet: (...args: unknown[]) => apiGet(...args),
  apiSend: (...args: unknown[]) => apiSend(...args),
  uploadCloudinaryMedia: vi.fn(),
}));

function track(id: string, displayName: string, fetched: boolean): MusicDto {
  return {
    id,
    slugName: null,
    displayName,
    descriptions: null,
    displayImages: null,
    singleName: "Artist",
    songUrl: fetched ? `https://host/${id}.flac` : null,
    duration: 180,
    category: null,
    releaseYear: 2024,
    albumName: "Album",
    fetched,
  };
}

const unfetched = track("1Gqm6KaobG2A1mFVjGnJsS", "Unfetched Song", false);
const failed = track("2plbrEY59IikOBgBGLjaoe", "Failed Song", false);
const ready = track("3n3Ppam7vgaVa1iaRUc9Lp", "Ready Song", true);

let toastMessages: string[] = [];
const captureToast = (event: Event) => toastMessages.push((event as CustomEvent<string>).detail);

afterEach(() => {
  window.removeEventListener(APP_TOAST_EVENT, captureToast);
  cleanup();
});

beforeEach(() => {
  apiGet.mockReset();
  apiSend.mockReset();
  toastMessages = [];
  window.addEventListener(APP_TOAST_EVENT, captureToast);
  apiGet.mockResolvedValue({ content: [unfetched, failed, ready], pageNumber: 0, totalPages: 1 });
  apiSend.mockResolvedValue({ trackId: unfetched.id, status: "STARTED" });
});

function renderStudio(callbacks: { onPublished?: () => void; onClose?: () => void } = {}) {
  return render(<PostCreationStudio
    userId="user-1"
    onBack={vi.fn()}
    onClose={callbacks.onClose ?? vi.fn()}
    onDraftSaved={vi.fn()}
    onPublished={callbacks.onPublished ?? vi.fn()}
    initialDraft={{
      id: "draft-1",
      draftType: "POST",
      payload: JSON.stringify({
        media: [{ id: "media-1", fileName: "photo.jpg", type: "IMAGE", secureUrl: "https://host/photo.jpg" }],
      }),
    }}
  />);
}

async function openMusicBrowser() {
  fireEvent.click(await screen.findByRole("button", { name: /photo\.jpg/i }));
  await screen.findByText("Unfetched Song");
}

describe("PostCreationStudio Spotify fetch", () => {
  it("gates unfetched tracks, suppresses duplicate fetches, and enables a successful track", async () => {
    renderStudio();
    await openMusicBrowser();

    const fetchButton = screen.getByRole("button", { name: "Fetch Unfetched Song" });
    expect(screen.queryByRole("button", { name: "Select Unfetched Song" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Select Ready Song" })).toBeEnabled();

    fireEvent.click(fetchButton);
    fireEvent.click(fetchButton);
    await waitFor(() => expect(apiSend).toHaveBeenCalledTimes(1));
    expect(toastMessages).toContain("Đang tải bài hát Unfetched Song...");
    expect(screen.getByRole("button", { name: "Processing Unfetched Song" })).toBeDisabled();

    const fetched = { ...unfetched, fetched: true, songUrl: "https://host/fetched.flac" };
    window.dispatchEvent(new CustomEvent(MUSIC_FETCH_RESULT_EVENT, {
      detail: { kind: "success", music: fetched },
    }));

    expect(await screen.findByRole("button", { name: "Select Unfetched Song" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "Fetch Unfetched Song" })).not.toBeInTheDocument();
  });

  it("restores Fetch and surfaces a safe toast after a failed event", async () => {
    renderStudio();
    await openMusicBrowser();

    fireEvent.click(screen.getByRole("button", { name: "Fetch Failed Song" }));
    window.dispatchEvent(new CustomEvent(MUSIC_FETCH_RESULT_EVENT, {
      detail: { kind: "failure", trackId: failed.id, message: "Không thể tải bài hát." },
    }));

    expect(await screen.findByRole("button", { name: "Fetch Failed Song" })).toBeEnabled();
  });

  it("emits accepted and immediate failure toasts when publishing a post", async () => {
    const onPublished = vi.fn();
    const onClose = vi.fn();
    apiSend.mockResolvedValueOnce({ postId: "post-1", message: "Post is being reviewed" });
    const { unmount } = renderStudio({ onPublished, onClose });
    await screen.findByRole("button", { name: /photo\.jpg/i });
    fireEvent.click(screen.getByRole("button", { name: "Go to step 4" }));
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => expect(onPublished).toHaveBeenCalledOnce());
    expect(toastMessages).toContain("Post is being reviewed");
    expect(onClose).toHaveBeenCalledOnce();
    unmount();

    toastMessages = [];
    apiSend.mockRejectedValueOnce(new Error("Backend unavailable"));
    renderStudio();
    await screen.findByRole("button", { name: /photo\.jpg/i });
    fireEvent.click(screen.getByRole("button", { name: "Go to step 4" }));
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => expect(toastMessages).toContain("Backend unavailable"));
  });
});
