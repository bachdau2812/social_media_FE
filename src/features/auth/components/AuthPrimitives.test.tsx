import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthError, AuthInput, AuthPrimaryButton } from "./AuthPrimitives";

afterEach(cleanup);

describe("auth primitives", () => {
  it("connects field errors to the shared input", () => {
    render(<AuthInput label="Email" value="bad" onChange={vi.fn()} error="Email lỗi" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Email lỗi");
  });

  it("renders safe errors and an action-specific busy button", () => {
    render(
      <>
        <AuthError message="Không thể kết nối" />
        <AuthPrimaryButton busy busyLabel="Đang xử lý">Tiếp tục</AuthPrimaryButton>
      </>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Không thể kết nối");
    const button = screen.getByRole("button", { name: "Đang xử lý" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });
});
