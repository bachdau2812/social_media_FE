import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";

afterEach(cleanup);

describe("PasswordInput", () => {
  it("toggles password visibility without owning the field value", () => {
    const onChange = vi.fn();
    render(
      <PasswordInput
        label="Mật khẩu"
        value="Secret123!"
        onChange={onChange}
        showLabel="Hiện mật khẩu"
        hideLabel="Ẩn mật khẩu"
      />,
    );

    const input = screen.getByLabelText("Mật khẩu");
    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByRole("button", { name: "Hiện mật khẩu" }));
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Ẩn mật khẩu" })).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Changed123!" } });
    expect(onChange).toHaveBeenCalledWith("Changed123!");
  });

  it("shows all password requirements as satisfied for a strong password", () => {
    render(<PasswordStrength value="Secret123!" locale="vi" />);

    expect(screen.getAllByTestId("password-requirement-met")).toHaveLength(4);
    expect(screen.getByText("Mạnh")).toBeInTheDocument();
  });
});
