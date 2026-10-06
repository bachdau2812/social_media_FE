import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
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
