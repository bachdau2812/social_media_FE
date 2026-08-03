import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MusicSegmentEditor } from "./MusicSegmentEditor";

describe("MusicSegmentEditor", () => {
  it("moves only the focused handle and commits the same value", () => {
    const onChange = vi.fn();
    const onCommit = vi.fn();
    const onInteractionStart = vi.fn();
    const { container } = render(
      <MusicSegmentEditor
        duration={120}
        value={{ start: 10, end: 30 }}
        onChange={onChange}
        onCommit={onCommit}
        onInteractionStart={onInteractionStart}
      />,
    );

    fireEvent.keyDown(within(container).getByRole("slider", { name: "Music segment start" }), {
      key: "ArrowRight",
    });

    expect(onInteractionStart).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith({ start: 11, end: 30 });
    expect(onCommit).toHaveBeenCalledWith({ start: 11, end: 30 });
  });

  it("moves the whole selected window by the same delta", () => {
    const onChange = vi.fn();
    const onCommit = vi.fn();
    const { container } = render(
      <MusicSegmentEditor
        duration={120}
        value={{ start: 20, end: 50 }}
        onChange={onChange}
        onCommit={onCommit}
      />,
    );

    fireEvent.keyDown(within(container).getByRole("button", { name: "Move selected music range" }), {
      key: "ArrowRight",
    });

    expect(onChange).toHaveBeenCalledWith({ start: 21, end: 51 });
    expect(onCommit).toHaveBeenCalledWith({ start: 21, end: 51 });
  });
});
