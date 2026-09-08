import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "../../../app/providers/LocaleProvider";
import {
  preRegister,
  requestPasswordReset,
  verifyPasswordReset,
  verifyRegistration,
} from "../api/auth.api";
import { AuthFlow } from "./AuthFlow";

vi.mock("../api/auth.api", () => ({
  preRegister: vi.fn(),
  verifyRegistration: vi.fn(),
  requestPasswordReset: vi.fn(),
  verifyPasswordReset: vi.fn(),
}));

function renderFlow(onLogin = vi.fn().mockResolvedValue(undefined)) {
  return {
    onLogin,
    ...render(
      <LocaleProvider>
        <AuthFlow errorText="" loading={false} onLogin={onLogin} />
      </LocaleProvider>,
    ),
  };
}

afterEach(cleanup);

beforeEach(() => {
  localStorage.setItem("social-media-locale", "vi");
  vi.mocked(preRegister).mockResolvedValue("ok");
  vi.mocked(verifyRegistration).mockResolvedValue("ok");
  vi.mocked(requestPasswordReset).mockResolvedValue("ok");
  vi.mocked(verifyPasswordReset).mockResolvedValue("ok");
});

describe("AuthFlow", () => {
  it("preserves the existing login callback", async () => {
    const user = userEvent.setup();
    const { onLogin } = renderFlow();

    await user.type(screen.getByLabelText("Email hoặc tên đăng nhập"), "bach");
    await user.type(screen.getByLabelText("Mật khẩu"), "secret");
    await user.click(screen.getByRole("button", { name: "Đăng nhập" }));

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith("bach", "secret"));
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it("submits every existing registration field and preserves it when returning", async () => {
    const user = userEvent.setup();
    renderFlow();
    await user.click(screen.getByRole("button", { name: "Đăng ký" }));

    await user.type(screen.getByLabelText("Họ và tên"), "An Nguyen");
    await user.type(screen.getByLabelText("Email"), "an@example.com");
    await user.type(screen.getByLabelText("Số điện thoại"), "0901234567");
    await user.type(screen.getByLabelText("Tên đăng nhập"), "annguyen");
    await user.type(screen.getByLabelText("Mật khẩu"), "Secret123!");
    await user.type(screen.getByLabelText("Xác nhận mật khẩu"), "Secret123!");
    fireEvent.change(screen.getByLabelText("Ngày sinh"), { target: { value: "2000-01-02" } });
    await user.selectOptions(screen.getByLabelText("Giới tính"), "FEMALE");
    await user.type(screen.getByLabelText("Đang sống tại"), "Da Nang");
    await user.type(screen.getByLabelText("Quê quán"), "Hue");
    await user.type(screen.getByLabelText("Sở thích"), "music, travel");
    await user.click(screen.getByRole("button", { name: "Tạo tài khoản" }));

    await waitFor(() => expect(preRegister).toHaveBeenCalledWith({
      fullName: "An Nguyen",
      email: "an@example.com",
      phoneNumber: "0901234567",
      username: "annguyen",
      password: "Secret123!",
      dob: "2000-01-02",
      sex: "FEMALE",
      livingIn: "Da Nang",
      hometown: "Hue",
      hobbyList: ["music", "travel"],
      role: "USER",
    }));
    expect(screen.getAllByRole("textbox")).toHaveLength(8);
    expect(screen.getByText("a***@example.com")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Quay lại đăng ký" }));
    expect(screen.getByLabelText("Họ và tên")).toHaveValue("An Nguyen");
    expect(screen.getByLabelText("Sở thích")).toHaveValue("music, travel");
  });

  it("verifies registration with the exact email and eight-character code", async () => {
    const user = userEvent.setup();
    renderFlow();
    await user.click(screen.getByRole("button", { name: "Đăng ký" }));
    await user.type(screen.getByLabelText("Họ và tên"), "An Nguyen");
    await user.type(screen.getByLabelText("Email"), "an@example.com");
    await user.type(screen.getByLabelText("Tên đăng nhập"), "annguyen");
    await user.type(screen.getByLabelText("Mật khẩu"), "Secret123!");
    await user.type(screen.getByLabelText("Xác nhận mật khẩu"), "Secret123!");
    await user.click(screen.getByRole("button", { name: "Tạo tài khoản" }));
    await screen.findByRole("heading", { name: "Xác minh tài khoản" });

    const cells = screen.getAllByRole("textbox");
    fireEvent.paste(cells[0], { clipboardData: { getData: () => "aB12cD34" } });
    await user.click(screen.getByRole("button", { name: "Xác minh" }));

    await waitFor(() => expect(verifyRegistration).toHaveBeenCalledWith("an@example.com", "aB12cD34"));
    expect(screen.getByRole("heading", { name: "Đăng nhập" })).toBeInTheDocument();
  });

  it("uses the existing forgot-password endpoints and ends in email success", async () => {
    const user = userEvent.setup();
    renderFlow();
    await user.click(screen.getByRole("button", { name: "Quên mật khẩu?" }));
    await user.type(screen.getByLabelText("Email"), "bach@example.com");
    await user.click(screen.getByRole("button", { name: "Tiếp tục" }));

    await waitFor(() => expect(requestPasswordReset).toHaveBeenCalledWith("bach@example.com"));
    const cells = screen.getAllByRole("textbox");
    expect(cells).toHaveLength(10);
    fireEvent.paste(cells[0], { clipboardData: { getData: () => "ab12cd34ef" } });
    await user.click(screen.getByRole("button", { name: "Xác minh" }));

    await waitFor(() => expect(verifyPasswordReset).toHaveBeenCalledWith("bach@example.com", "ab12cd34ef"));
    expect(screen.getByText(/mật khẩu mới đã được gửi/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Mật khẩu mới")).not.toBeInTheDocument();
  });
});
