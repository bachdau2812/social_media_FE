import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OTPInput } from "./OTPInput";

afterEach(cleanup);

describe("OTPInput positional editing", () => {
  it("keeps later characters in place when a middle cell is deleted", () => {
    const onValue = vi.fn();
    function Harness() {
      const [value, setValue] = useState("AB12CD34");
      return <OTPInput ariaLabel="Code" value={value} length={8} onChange={(next) => { setValue(next); onValue(next); }} />;
    }
    render(<Harness />);
    const cells = screen.getAllByRole("textbox") as HTMLInputElement[];

    fireEvent.keyDown(cells[2], { key: "Backspace" });

    expect(cells[2]).toHaveValue("");
    expect(cells[3]).toHaveValue("2");
    expect(onValue).toHaveBeenLastCalledWith("AB 2CD34");
  });
});
