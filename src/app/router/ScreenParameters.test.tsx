import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import { SearchScreen } from "../../features/search/screens/SearchScreen";
import { LibraryScreen } from "../../features/library/screens/LibraryScreen";
import { SettingsScreen } from "../../features/settings/screens/SettingsScreen";
import { ScreenLocationProvider } from "./ScreenLocation";
import { useAppNavigation } from "./useAppNavigation";

vi.mock("../../features/search/components/SearchWorkspace", () => ({ SearchWorkspace: ({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) => <input aria-label="query" value={query} onChange={(event) => onQueryChange(event.target.value)} /> }));
vi.mock("../../features/library/api/library.api", () => ({ libraryApi: {
  saved: vi.fn().mockResolvedValue({ content: [] }), drafts: vi.fn().mockResolvedValue([]),
  archive: vi.fn().mockResolvedValue([]), storyArchive: vi.fn().mockResolvedValue({ content: [] }),
} }));
vi.mock("../providers/ThemeProvider", () => ({ useTheme: () => ({ theme: "light", setTheme: vi.fn() }) }));
vi.mock("../providers/LocaleProvider", () => ({ useLocale: () => ({ locale: "vi", setLocale: vi.fn() }) }));
vi.mock("../../features/settings/api/settings.api", () => ({ settingsApi: { get: vi.fn(() => new Promise(() => undefined)) } }));
function History() {
  const location = useLocation();
  const navigate = useNavigate();
  return <><output data-testid="url">{location.pathname}{location.search}</output><button onClick={() => navigate(-1)}>History back</button><button onClick={() => navigate(1)}>History forward</button></>;
}
afterEach(cleanup);
function Background() {
  const navigation = useAppNavigation();
  return <><button onClick={() => navigation.openResource("/post/p")}>Open resource</button><button onClick={navigation.closeResource}>Close resource</button><ScreenLocationProvider location={navigation.screenLocation}><SearchScreen viewerId="me" onSelectPost={vi.fn()} onOpenProfile={vi.fn()} /></ScreenLocationProvider></>;
}
it("retains the search query while a resource URL overlays the search screen", () => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  render(<MemoryRouter initialEntries={["/search?q=hello"]}><History /><Background /></MemoryRouter>);
  fireEvent.click(screen.getByText("Open resource"));
  expect(screen.getByTestId("url")).toHaveTextContent("/post/p");
  expect(screen.getByLabelText("query")).toHaveValue("hello");
  fireEvent.click(screen.getByText("Close resource"));
  expect(screen.getByLabelText("query")).toHaveValue("hello");
});
it("loads and replaces the search query in the URL, including Unicode", () => {
  render(<MemoryRouter initialEntries={["/search?q=hello"]}><History /><SearchScreen viewerId="me" onSelectPost={vi.fn()} onOpenProfile={vi.fn()} /></MemoryRouter>);
  expect(screen.getByLabelText("query")).toHaveValue("hello");
  fireEvent.change(screen.getByLabelText("query"), { target: { value: "bài viết" } });
  expect(screen.getByTestId("url")).toHaveTextContent("/search?q=b%C3%A0i+vi%E1%BA%BFt");
  fireEvent.change(screen.getByLabelText("query"), { target: { value: "" } });
  expect(screen.getByTestId("url")).toHaveTextContent(/^\/search$/);
});
it("loads the library tab and restores it with browser history", async () => {
  const { container } = render(<MemoryRouter initialEntries={["/library?tab=drafts"]}><History /><LibraryScreen userId="me" onOpenPost={vi.fn()} onOpenStory={vi.fn()} onResumeDraft={vi.fn()} /></MemoryRouter>);
  await screen.findByText("Chưa có bản nháp");
  expect(container.querySelectorAll(".feature-library-tabs button")[1]).toHaveClass("active");
  fireEvent.click(screen.getByRole("button", { name: "Kho lưu trữ" }));
  expect(screen.getByTestId("url")).toHaveTextContent("/library?tab=archive");
  fireEvent.click(screen.getByText("History back"));
  expect(container.querySelectorAll(".feature-library-tabs button")[1]).toHaveClass("active");
});
it("loads a settings section and synchronizes category selection and Back", () => {
  const { container } = render(<MemoryRouter initialEntries={["/settings/privacy"]}><History /><SettingsScreen userId="me" /></MemoryRouter>);
  expect(container.querySelector(".settings-feature-layout")).toHaveClass("detail-open");
  expect(screen.getByRole("button", { name: "Trang cá nhân và quyền riêng tư" })).toHaveClass("active");
  fireEvent.click(screen.getByRole("button", { name: "Bài viết" }));
  expect(screen.getByTestId("url")).toHaveTextContent("/settings/posts");
  fireEvent.click(screen.getByText("History back"));
  expect(screen.getByRole("button", { name: "Trang cá nhân và quyền riêng tư" })).toHaveClass("active");
  fireEvent.click(screen.getByRole("button", { name: "Quay lại danh mục cài đặt" }));
  expect(screen.getByTestId("url")).toHaveTextContent(/^\/settings$/);
});
