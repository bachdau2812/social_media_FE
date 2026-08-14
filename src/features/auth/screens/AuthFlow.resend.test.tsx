import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "../../../app/providers/LocaleProvider";
import { requestPasswordReset } from "../api/auth.api";
import { AuthFlow } from "./AuthFlow";

vi.mock("../api/auth.api", () => ({
  preRegister: vi.fn(),
  verifyRegistration: vi.fn(),
  requestPasswordReset: vi.fn(),
  verifyPasswordReset: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

beforeEach(() => {
  localStorage.setItem("social-media-locale", "vi");
  vi.mocked(requestPasswordReset).mockResolvedValue("ok");
});

describe("AuthFlow resend deadline", () => {
  it("derives remaining time from a deadline after timer throttling", async () => {
    vi.useFakeTimers();
    const startedAt = new Date("2026-08-07T00:00:00Z");
    vi.setSystemTime(startedAt);

    render(
      <LocaleProvider>
        <AuthFlow errorText="" loading={false} onLogin={vi.fn()} />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Quên mật khẩu?" }));
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "bach@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Tiếp tục" }));

    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByRole("button", { name: /01:00/ })).toBeDisabled();

    vi.setSystemTime(new Date(startedAt.getTime() + 61_000));
    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    const resend = screen.getByRole("button", { name: "Gửi lại mã" });
    expect(resend).toBeEnabled();
    fireEvent.click(resend);

    await act(async () => {
      await Promise.resolve();
    });
    expect(requestPasswordReset).toHaveBeenLastCalledWith("bach@example.com");
    expect(requestPasswordReset).toHaveBeenCalledTimes(2);
  });
});
