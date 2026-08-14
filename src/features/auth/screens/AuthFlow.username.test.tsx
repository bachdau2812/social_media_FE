import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "../../../app/providers/LocaleProvider";
import { preRegister } from "../api/auth.api";
import { AuthFlow } from "./AuthFlow";

vi.mock("../api/auth.api", () => ({
  preRegister: vi.fn(), verifyRegistration: vi.fn(),
  requestPasswordReset: vi.fn(), verifyPasswordReset: vi.fn(),
}));

afterEach(cleanup);
beforeEach(() => {
  localStorage.setItem("social-media-locale", "vi");
  vi.mocked(preRegister).mockResolvedValue("ok");
});

describe("AuthFlow username validation", () => {
  it("does not invent backend availability results from the username text", async () => {
    render(<LocaleProvider><AuthFlow errorText="" loading={false} onLogin={vi.fn()} /></LocaleProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Đăng ký" }));
    fireEvent.change(screen.getByLabelText("Họ và tên"), { target: { value: "An Nguyen" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "an@example.com" } });
    fireEvent.change(screen.getByLabelText("Tên đăng nhập"), { target: { value: "undertaken" } });
    fireEvent.change(screen.getByLabelText("Mật khẩu"), { target: { value: "Secret123!" } });
    fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), { target: { value: "Secret123!" } });
    fireEvent.click(screen.getByRole("button", { name: "Tạo tài khoản" }));

    await waitFor(() => expect(preRegister).toHaveBeenCalledTimes(1));
  });
});
