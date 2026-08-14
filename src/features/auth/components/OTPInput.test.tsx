import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OTPInput } from "./OTPInput";

afterEach(cleanup);

function Harness({ length = 8, onValue }: { length?: number; onValue?: (value: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <OTPInput
      ariaLabel="Mã xác minh"
      value={value}
      length={length}
      onChange={(next) => {
        setValue(next);
        onValue?.(next);
      }}
    />
  );
}

describe("OTPInput", () => {
  it("renders the configured registration and reset code lengths", () => {
    const { rerender } = render(<Harness length={8} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(8);

    rerender(<Harness length={10} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(10);
  });

  it("normalizes input and advances focus", () => {
    const onValue = vi.fn();
    render(<Harness onValue={onValue} />);
    const cells = screen.getAllByRole("textbox");

    fireEvent.change(cells[0], { target: { value: "a" } });
    expect(onValue).toHaveBeenLastCalledWith("A");
    expect(cells[1]).toHaveFocus();

    fireEvent.change(cells[1], { target: { value: "!" } });
    expect(onValue).toHaveBeenLastCalledWith("A");
  });

  it("pastes a full alphanumeric code across cells", () => {
    const onValue = vi.fn();
    render(<Harness onValue={onValue} />);
    const cells = screen.getAllByRole("textbox");

    fireEvent.paste(cells[0], {
      clipboardData: { getData: () => "a1B2c3D4" },
    });

    expect(onValue).toHaveBeenLastCalledWith("A1B2C3D4");
    expect(cells.map((cell) => (cell as HTMLInputElement).value).join(""))
      .toBe("A1B2C3D4");
  });

  it("supports arrow navigation and backspace to the previous cell", () => {
    render(<Harness />);
    const cells = screen.getAllByRole("textbox");

    cells[3].focus();
    fireEvent.keyDown(cells[3], { key: "ArrowLeft" });
    expect(cells[2]).toHaveFocus();
    fireEvent.keyDown(cells[2], { key: "ArrowRight" });
    expect(cells[3]).toHaveFocus();
    fireEvent.keyDown(cells[3], { key: "Backspace" });
    expect(cells[2]).toHaveFocus();
  });

  it("exposes disabled and invalid state without changing the value", () => {
    render(
      <OTPInput
        ariaLabel="Mã xác minh"
        value="AB"
        length={8}
        onChange={vi.fn()}
        disabled
        invalid
      />,
    );

    expect(screen.getByRole("group", { name: "Mã xác minh" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getAllByRole("textbox").every((cell) => (cell as HTMLInputElement).disabled)).toBe(true);
  });
});
