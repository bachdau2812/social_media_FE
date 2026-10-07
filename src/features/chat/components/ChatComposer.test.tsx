import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatComposer } from "./ChatComposer";

afterEach(cleanup);

function controller() {
  return {
    replyTo: null,
    sending: false,
    active: { isDissolved: false },
    sendError: null as string | null,
    draft: "",
    setDraft: vi.fn(),
    setReplyTo: vi.fn(),
    send: vi.fn(),
    mediaComposer: {
      images: [],
      audioAttachment: null,
      recording: false,
      recordingElapsed: 0,
      error: "",
      selectImages: vi.fn(),
      removeImage: vi.fn(),
      moveImage: vi.fn(),
      updateImageState: vi.fn(),
      clearImages: vi.fn(),
      cancelRecording: vi.fn(),
      stopRecording: vi.fn(),
      clearAudio: vi.fn(),
      startRecording: vi.fn(),
    },
  };
}

describe("ChatComposer layout parity", () => {
  it.each([
    [false, "full"],
    [true, "compact"],
  ])("uses one six-control action row for the %s surface", (compact, surface) => {
    const { container } = render(<ChatComposer controller={controller() as never} compact={compact as boolean} />);
    const row = container.querySelector(".chat-composer-actions");

    expect(row).toHaveClass(surface);
    expect(within(row as HTMLElement).getByRole("button", { name: "Đính kèm ảnh" })).toBeInTheDocument();
    expect(within(row as HTMLElement).getByRole("button", { name: "Chọn emoji" })).toBeInTheDocument();
    expect(within(row as HTMLElement).getByRole("textbox", { name: "Nội dung tin nhắn" })).toBeInTheDocument();
    expect(within(row as HTMLElement).getByRole("button", { name: "Thêm ảnh" })).toBeInTheDocument();
    expect(within(row as HTMLElement).getByRole("button", { name: "Ghi âm" })).toBeInTheDocument();
    expect(within(row as HTMLElement).getByRole("button", { name: "Gửi tin nhắn" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nội dung tin nhắn" })).toHaveAttribute("rows", "1");
  });

  it.each([
    [false, "full"],
    [true, "compact"],
  ])("renders the shared send error in %s mode", (compact) => {
    const fixture = controller();
    fixture.sendError = "Không thể gửi tin nhắn thoại. Bản ghi vẫn được giữ lại để bạn thử lại.";

    render(<ChatComposer controller={fixture as never} compact={compact as boolean} />);

    expect(screen.getByRole("alert")).toHaveTextContent(fixture.sendError);
  });
});

 it.each([false, true])("keeps mobile Enter as a newline on both surfaces (%s)", (compact) => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  const fixture = controller(); fixture.draft = "hello";
  render(<ChatComposer controller={fixture as never} compact={compact} />);
  fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
  expect(fixture.send).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});

it.each([false, true])("sends desktop Enter while leaving Shift and IME composition alone (%s)", (compact) => {
 vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
 const fixture = controller(); fixture.draft = "hello";
 render(<ChatComposer controller={fixture as never} compact={compact} />);
 const input = screen.getByRole("textbox");
 fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
 fireEvent.keyDown(input, { key: "Enter", isComposing: true });
 fireEvent.keyDown(input, { key: "Enter", keyCode: 229 });
 expect(fixture.send).not.toHaveBeenCalled();
 fireEvent.keyDown(input, { key: "Enter" });
 expect(fixture.send).toHaveBeenCalledOnce();
 vi.unstubAllGlobals();
});
