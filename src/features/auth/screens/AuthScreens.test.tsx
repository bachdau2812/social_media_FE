import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { RegistrationForm } from "../model/auth.types";
import { ForgotPasswordScreen } from "./ForgotPasswordScreen";
import { RegisterScreen } from "./RegisterScreen";
import { ResetPasswordSuccessScreen } from "./ResetPasswordSuccessScreen";
import { SignInScreen } from "./SignInScreen";
import { VerifyRegistrationScreen } from "./VerifyRegistrationScreen";
import { VerifyResetCodeScreen } from "./VerifyResetCodeScreen";

afterEach(cleanup);

const form: RegistrationForm = {
  fullName: "", email: "", phoneNumber: "", username: "", password: "",
  confirmPassword: "", dob: "", sex: "OTHER", livingIn: "", hometown: "",
  hobbyList: "", role: "USER",
};

describe("auth step screens", () => {
  it("renders the complete sign-in surface", () => {
    render(
      <SignInScreen
        locale="vi" username="" password="" onUsernameChange={vi.fn()}
        onPasswordChange={vi.fn()} onSubmit={vi.fn()} onForgot={vi.fn()}
        onRegister={vi.fn()} onOAuth={vi.fn()} busy={false} loading={false} error=""
      />,
    );
    expect(screen.getByRole("heading", { name: "Đăng nhập" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email hoặc tên đăng nhập")).toBeInTheDocument();
    expect(screen.getByLabelText("Mật khẩu")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quên mật khẩu?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Google" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Đăng ký" })).toBeInTheDocument();
  });

  it("keeps every field from the existing registration contract", () => {
    render(
      <RegisterScreen
        locale="vi" form={form} onFieldChange={vi.fn()} onSubmit={vi.fn()}
        onSignIn={vi.fn()} busy={false} error="" fieldErrors={{}}
      />,
    );
    [
      "Họ và tên", "Email", "Số điện thoại", "Tên đăng nhập", "Mật khẩu",
      "Xác nhận mật khẩu", "Ngày sinh", "Giới tính", "Đang sống tại",
      "Quê quán", "Sở thích", "Vai trò",
    ].forEach((label) => expect(screen.getByLabelText(label)).toBeInTheDocument());
    expect(screen.queryByRole("region", { name: /scroll/i })).not.toBeInTheDocument();
  });

  it("reuses OTP controls with backend-defined code lengths", () => {
    const shared = {
      locale: "vi" as const, email: "bach@example.com", code: "", onCodeChange: vi.fn(),
      onSubmit: vi.fn(), onResend: vi.fn(), onChangeEmail: vi.fn(), onBack: vi.fn(),
      busy: false, resendBusy: false, resendSeconds: 42, error: "",
    };
    const { rerender } = render(<VerifyRegistrationScreen {...shared} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(8);
    expect(screen.getByText("b***@example.com")).toBeInTheDocument();

    rerender(<VerifyResetCodeScreen {...shared} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(10);
  });

  it("renders forgot password as an email step", () => {
    render(
      <ForgotPasswordScreen
        locale="vi" email="" onEmailChange={vi.fn()} onSubmit={vi.fn()}
        onBack={vi.fn()} busy={false} error="" emailError=""
      />,
    );
    expect(screen.getByRole("heading", { name: "Quên mật khẩu" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tiếp tục" })).toBeInTheDocument();
  });

  it("matches the backend-generated password success behavior", () => {
    render(
      <ResetPasswordSuccessScreen locale="vi" email="bach@example.com" onSignIn={vi.fn()} />,
    );
    expect(screen.getByText(/mật khẩu mới đã được gửi/i)).toBeInTheDocument();
    expect(screen.getByText("b***@example.com")).toBeInTheDocument();
    expect(screen.queryByLabelText("Mật khẩu mới")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeInTheDocument();
  });
});
