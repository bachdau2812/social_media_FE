import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ApiError } from "../../../shared/api";
import { settingsApi } from "../api/settings.api";
import type { UserSettings } from "../model/settings.types";
import { SettingsScreen } from "./SettingsScreen";

vi.mock("../../../app/providers/ThemeProvider", () => ({ useTheme: () => ({ theme: "light", setTheme: vi.fn() }) }));
vi.mock("../../../app/providers/LocaleProvider", () => ({ useLocale: () => ({ locale: "vi", setLocale: vi.fn() }) }));
vi.mock("../api/settings.api", () => ({ settingsApi: { get: vi.fn(() => new Promise(() => undefined)), update: vi.fn() } }));

describe("SettingsScreen mobile navigation", () => {
  it("opens a category as a subpage and provides an in-page back action", () => {
    const { container } = render(<MemoryRouter initialEntries={["/settings"]}><SettingsScreen userId="me" /></MemoryRouter>);
    const layout = container.querySelector(".settings-feature-layout");

    expect(layout).not.toHaveClass("detail-open");
    fireEvent.click(screen.getByRole("button", { name: "Bài viết" }));

    expect(layout).toHaveClass("detail-open");
    expect(screen.getByRole("button", { name: "Quay lại danh mục cài đặt" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Quay lại danh mục cài đặt" }));
    expect(layout).not.toHaveClass("detail-open");
  });
});

afterEach(() => { cleanup(); vi.clearAllMocks(); });
it("serializes pending changes and keeps the newest optimistic snapshot", async () => {
  const initial = { textScale: 1, reducedMotion: false, highContrast: false, theme: "LIGHT" } as UserSettings;
  vi.mocked(settingsApi.get).mockResolvedValueOnce(initial);
  let finish!: (value: UserSettings) => void;
  vi.mocked(settingsApi.update).mockImplementationOnce(() => new Promise(resolve => { finish = resolve; })).mockImplementation(async (_id, value) => value);
  render(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="me" /></MemoryRouter>);
  const toggles = await screen.findAllByRole("checkbox");
  fireEvent.click(toggles[0]); fireEvent.click(toggles[1]);
  expect(settingsApi.update).toHaveBeenCalledTimes(1);
  expect(toggles[0]).toBeChecked(); expect(toggles[1]).toBeChecked();
  await act(async () => { finish({ ...initial, reducedMotion: true }); });
  await waitFor(() => expect(settingsApi.update).toHaveBeenCalledTimes(2));
  expect(settingsApi.update).toHaveBeenLastCalledWith("me", expect.objectContaining({ reducedMotion: true, highContrast: true }));
  expect(toggles[1]).toBeChecked();
});

it("coalesces range changes until release instead of saving each drag event", async () => {
 vi.mocked(settingsApi.get).mockResolvedValueOnce({ textScale: 1, reducedMotion: false, highContrast: false } as UserSettings);
 vi.mocked(settingsApi.update).mockImplementation(async (_id, value) => value);
 render(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="me" /></MemoryRouter>);
 const range = await screen.findByRole("slider");
 fireEvent.change(range, { target: { value: "1.1" } });
 fireEvent.change(range, { target: { value: "1.2" } });
 expect(settingsApi.update).not.toHaveBeenCalled();
 fireEvent.pointerUp(range);
 await waitFor(() => expect(settingsApi.update).toHaveBeenCalledTimes(1));
 expect(settingsApi.update).toHaveBeenCalledWith("me", expect.objectContaining({ textScale: 1.2 }));
});
it("retains the latest edited settings when an older save fails", async () => {
 const initial = { textScale: 1, reducedMotion: false, highContrast: false } as UserSettings;
 vi.mocked(settingsApi.get).mockResolvedValueOnce(initial);
 let fail!: (reason: Error) => void;
 vi.mocked(settingsApi.update).mockImplementationOnce(() => new Promise((_resolve, reject) => { fail = reject; })).mockImplementation(async (_id, value) => value);
 render(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="me" /></MemoryRouter>);
 const toggles = await screen.findAllByRole("checkbox");
 fireEvent.click(toggles[0]); fireEvent.click(toggles[1]);
 await act(async () => { fail(new Error("offline")); });
 await waitFor(() => expect(settingsApi.update).toHaveBeenCalledTimes(2));
 expect(toggles[0]).toBeChecked(); expect(toggles[1]).toBeChecked();
});

it("persists the latest queued snapshot after leaving Settings", async () => {
 const initial = { textScale: 1, reducedMotion: false, highContrast: false } as UserSettings;
 vi.mocked(settingsApi.get).mockResolvedValueOnce(initial);
 let finish!: (value: UserSettings) => void;
 vi.mocked(settingsApi.update).mockImplementationOnce(() => new Promise(resolve => { finish = resolve; })).mockImplementation(async (_id, value) => value);
 const { unmount } = render(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="me" /></MemoryRouter>);
 const toggles = await screen.findAllByRole("checkbox");
 fireEvent.click(toggles[0]); fireEvent.click(toggles[1]); unmount();
 await act(async () => { finish({ ...initial, reducedMotion: true }); });
 expect(settingsApi.update).toHaveBeenCalledTimes(2);
 expect(settingsApi.update).toHaveBeenLastCalledWith("me", expect.objectContaining({ reducedMotion: true, highContrast: true }));
});
it("flushes an unreleased range edit when leaving Settings", async () => {
 vi.mocked(settingsApi.get).mockResolvedValueOnce({ textScale: 1, reducedMotion: false, highContrast: false } as UserSettings);
 vi.mocked(settingsApi.update).mockImplementation(async (_id, value) => value);
 const { unmount } = render(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="me" /></MemoryRouter>);
 fireEvent.change(await screen.findByRole("slider"), { target: { value: "1.3" } });
 unmount();
 expect(settingsApi.update).toHaveBeenCalledOnce();
 expect(settingsApi.update).toHaveBeenCalledWith("me", expect.objectContaining({ textScale: 1.3 }));
});

it("does not drain the old account queue into a new viewer session", async () => {
 const initial = { textScale: 1, reducedMotion: false, highContrast: false } as UserSettings;
 vi.mocked(settingsApi.get).mockResolvedValue(initial);
 let finish!: (value: UserSettings) => void;
 vi.mocked(settingsApi.update).mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
 const { rerender } = render(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="old" /></MemoryRouter>);
 const toggles = await screen.findAllByRole("checkbox");
 fireEvent.click(toggles[0]); fireEvent.click(toggles[1]);
 rerender(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="new" /></MemoryRouter>);
 await act(async () => { finish({ ...initial, reducedMotion: true }); });
 expect(settingsApi.update).toHaveBeenCalledOnce();
 expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
});
it("stops detached queued writes after the session rejects authentication", async () => {
 const initial = { textScale: 1, reducedMotion: false, highContrast: false } as UserSettings;
 vi.mocked(settingsApi.get).mockResolvedValueOnce(initial);
 let fail!: (reason: Error) => void;
 vi.mocked(settingsApi.update).mockImplementationOnce(() => new Promise((_resolve, reject) => { fail = reject; }));
 const { unmount } = render(<MemoryRouter initialEntries={["/settings/appearance"]}><SettingsScreen userId="me" /></MemoryRouter>);
 const toggles = await screen.findAllByRole("checkbox");
 fireEvent.click(toggles[0]); fireEvent.click(toggles[1]); unmount();
 await act(async () => { fail(new ApiError("PATCH", "/me/me/settings", 401)); });
 expect(settingsApi.update).toHaveBeenCalledOnce();
});
