// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const route = vi.hoisted(() => ({ search: "" }));
const library = vi.hoisted(() => ({
  saved: vi.fn(), drafts: vi.fn(), archive: vi.fn(), storyArchive: vi.fn(),
  removeSaved: vi.fn(), deleteDraft: vi.fn(), restoreArchive: vi.fn(), deleteArchive: vi.fn(),
}));
vi.mock("../api/library.api", () => ({ libraryApi: library }));
vi.mock("../../../app/router/ScreenLocation", () => ({
  useScreenLocation: () => ({ pathname: "/library", search: route.search, state: null }),
  nextScreenState: () => ({}),
}));
vi.mock("react-router-dom", async (original) => ({ ...await original<typeof import("react-router-dom")>(), useNavigate: () => vi.fn() }));

import { LibraryScreen } from "./LibraryScreen";

const props = { onOpenPost: vi.fn(), onOpenStory: vi.fn(), onResumeDraft: vi.fn() };
const pending = () => new Promise<never>(() => {});

beforeEach(() => {
  vi.clearAllMocks();
  route.search = "";
  library.saved.mockImplementation(pending);
  library.drafts.mockImplementation(pending);
  library.archive.mockImplementation(pending);
  library.storyArchive.mockImplementation(pending);
});
afterEach(() => cleanup());

it("aborts all old-account reads on account change and the new reads on unmount", async () => {
  const view = render(<LibraryScreen userId="viewer-1" {...props} />);
  await waitFor(() => expect(library.saved).toHaveBeenCalledTimes(1));
  const oldSignals = [library.saved.mock.calls[0][3]] as AbortSignal[];
  expect(library.drafts).not.toHaveBeenCalled();
  expect(library.archive).not.toHaveBeenCalled();
  expect(library.storyArchive).not.toHaveBeenCalled();
  expect(oldSignals.every((signal) => !signal.aborted)).toBe(true);

  view.rerender(<LibraryScreen userId="viewer-2" {...props} />);
  await waitFor(() => expect(library.saved).toHaveBeenCalledTimes(2));
  expect(oldSignals.every((signal) => signal.aborted)).toBe(true);
  const newSignals = [library.saved.mock.calls[1][3]] as AbortSignal[];
  expect(newSignals.every((signal) => !signal.aborted)).toBe(true);

  view.unmount();
  expect(newSignals.every((signal) => signal.aborted)).toBe(true);
});

it("loads tabs on demand and reuses their cached collection", async () => {
  library.saved.mockResolvedValue({ content: [], totalPages: 1 });
  library.drafts.mockResolvedValue([]);
  const view = render(<LibraryScreen userId="viewer" {...props} />);
  await waitFor(() => expect(library.saved).toHaveBeenCalledTimes(1));
  expect(library.drafts).not.toHaveBeenCalled();
  route.search = "?tab=drafts";
  view.rerender(<LibraryScreen userId="viewer" {...props} />);
  await waitFor(() => expect(library.drafts).toHaveBeenCalledTimes(1));
  route.search = "";
  view.rerender(<LibraryScreen userId="viewer" {...props} />);
  await waitFor(() => expect(screen.queryByRole("button", { name: "Load more" })).toBeNull());
  expect(library.saved).toHaveBeenCalledTimes(1);
});

it("retries the same next page without dropping saved items or duplicating them", async () => {
  const item = { id: "saved-1", postId: "post-1", userId: "viewer", createdAt: "" };
  library.saved.mockResolvedValueOnce({ content: [item], totalPages: 2 })
    .mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValueOnce({ content: [item, { ...item, id: "saved-2", postId: "post-2" }], totalPages: 2 });
  render(<LibraryScreen userId="viewer" {...props} />);
  fireEvent.click(await screen.findByRole("button", { name: "Load more" }));
  fireEvent.click(await screen.findByRole("button", { name: "Retry loading more" }));
  await waitFor(() => expect(screen.getAllByText("post-1")).toHaveLength(1));
  expect(await screen.findByText("post-2")).toBeTruthy();
  expect(library.saved.mock.calls.map((args) => args[1])).toEqual([0, 1, 1]);
});

it("loads the story archive only when selected and requests its next page", async () => {
  route.search = "?tab=archive";
  library.archive.mockResolvedValue([]);
  const story = { id: "story-1", userId: "viewer" };
  library.storyArchive.mockResolvedValueOnce({ content: [story], totalPages: 2 })
    .mockResolvedValueOnce({ content: [story, { ...story, id: "story-2" }], totalPages: 2 });
  render(<LibraryScreen userId="viewer" {...props} />);
  expect(library.saved).not.toHaveBeenCalled();
  expect(library.storyArchive).not.toHaveBeenCalled();
  fireEvent.click(await screen.findByRole("button", { name: "Story" }));
  fireEvent.click(await screen.findByRole("button", { name: "Load more" }));
  expect(await screen.findByText("story-2")).toBeTruthy();
  expect(screen.getAllByText("story-1")).toHaveLength(1);
  expect(library.storyArchive.mock.calls.map(args => args[1])).toEqual([0, 1]);
});
