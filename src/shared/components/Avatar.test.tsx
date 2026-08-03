import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Avatar, avatarInitials } from "./Avatar";

afterEach(cleanup);

describe("Avatar", () => {
  it("builds two uppercase initials without Vietnamese diacritics", () => {
    expect(avatarInitials("Đặng Bá")).toBe("DA");
    expect(avatarInitials("  Nguyễn Văn An  ")).toBe("NG");
    expect(avatarInitials("---")).toBe("U");
  });

  it("renders initials when the avatar URL is missing", () => {
    const { container } = render(<Avatar name="Đặng Bá" alt="Đặng Bá" />);

    expect(screen.getByText("DA")).toHaveClass("avatar-fallback");
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("replaces a broken avatar image with initials", () => {
    const { container } = render(<Avatar src="https://cdn.example/broken.jpg" name="Đặng Bá" alt="Đặng Bá" />);

    fireEvent.error(screen.getByRole("img"));

    expect(screen.getByText("DA")).toHaveClass("avatar-fallback");
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("supports a surface-specific fallback class without applying image sizing classes", () => {
    render(<Avatar name="Nguyen An" className="image-size" fallbackClassName="fallback-size" />);

    expect(screen.getByText("NG")).toHaveClass("avatar-fallback", "fallback-size");
    expect(screen.getByText("NG")).not.toHaveClass("image-size");
  });
});
