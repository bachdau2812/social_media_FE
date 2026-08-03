import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateContentMenu } from "./CreateContentMenu";

describe("CreateContentMenu", () => {
  it("shows Post and an unavailable Reels option", () => {
    render(
      <CreateContentMenu
        open
        onClose={vi.fn()}
        onCreatePost={vi.fn()}
      />,
    );

    expect(screen.getByRole("dialog", { name: "Create content" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create post" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Create reels" })).toBeDisabled();
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("opens the existing post flow and closes the menu", async () => {
    const onClose = vi.fn();
    const onCreatePost = vi.fn();
    render(
      <CreateContentMenu
        open
        onClose={onClose}
        onCreatePost={onCreatePost}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Create post" }));
    expect(onCreatePost).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("closes on Escape and outside pointer interaction", async () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <CreateContentMenu
        open
        onClose={onClose}
        onCreatePost={vi.fn()}
      />,
    );

    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();

    onClose.mockClear();
    rerender(
      <CreateContentMenu
        open
        onClose={onClose}
        onCreatePost={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByTestId("create-content-backdrop"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders nothing while closed", () => {
    render(
      <CreateContentMenu
        open={false}
        onClose={vi.fn()}
        onCreatePost={vi.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

