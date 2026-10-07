// @vitest-environment jsdom
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const library = vi.hoisted(() => ({
  saved: vi.fn(), drafts: vi.fn(), archive: vi.fn(), storyArchive: vi.fn(),
  removeSaved: vi.fn(), deleteDraft: vi.fn(), restoreArchive: vi.fn(), deleteArchive: vi.fn(),
}));
vi.mock("../api/library.api", () => ({ libraryApi: library }));
vi.mock("../../../app/router/ScreenLocation", () => ({
  useScreenLocation: () => ({ pathname: "/library", search: "", state: null }),
  nextScreenState: () => ({}),
}));
vi.mock("react-router-dom", async (original) => ({ ...await original<typeof import("react-router-dom")>(), useNavigate: () => vi.fn() }));

import { LibraryScreen } from "./LibraryScreen";

const props = { onOpenPost: vi.fn(), onOpenStory: vi.fn(), onResumeDraft: vi.fn() };
const pending = () => new Promise<never>(() => {});

beforeEach(() => {
  vi.clearAllMocks();
  library.saved.mockImplementation(pending);
  library.drafts.mockImplementation(pending);
  library.archive.mockImplementation(pending);
  library.storyArchive.mockImplementation(pending);
});
afterEach(() => cleanup());

it("aborts all old-account reads on account change and the new reads on unmount", async () => {
  const view = render(<LibraryScreen userId="viewer-1" {...props} />);
  await waitFor(() => expect(library.saved).toHaveBeenCalledTimes(1));
  const oldSignals = [library.saved.mock.calls[0][3], library.drafts.mock.calls[0][1], library.archive.mock.calls[0][2], library.storyArchive.mock.calls[0][3]] as AbortSignal[];
  expect(oldSignals.every((signal) => !signal.aborted)).toBe(true);

  view.rerender(<LibraryScreen userId="viewer-2" {...props} />);
  await waitFor(() => expect(library.saved).toHaveBeenCalledTimes(2));
  expect(oldSignals.every((signal) => signal.aborted)).toBe(true);
  const newSignals = [library.saved.mock.calls[1][3], library.drafts.mock.calls[1][1], library.archive.mock.calls[1][2], library.storyArchive.mock.calls[1][3]] as AbortSignal[];
  expect(newSignals.every((signal) => !signal.aborted)).toBe(true);

  view.unmount();
  expect(newSignals.every((signal) => signal.aborted)).toBe(true);
});
