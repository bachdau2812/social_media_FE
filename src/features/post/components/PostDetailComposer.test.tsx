import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef, type FormEvent } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PostDetailComposer } from "./PostDetailComposer";

const postMediaCss = readFileSync(
  resolve(process.cwd(), "src/features/post/styles/post-media.css"),
  "utf8",
);

afterEach(cleanup);

describe("PostDetailComposer", () => {
  it("gives the nested action row its own mobile-safe grid without swallowing status rows", () => {
    const file = new File(["image"], "photo.png", { type: "image/png" });
    const { container } = render(
      <PostDetailComposer
        text="Caption"
        attachment={{ file, previewUrl: "blob:photo", type: "IMAGE" }}
        replyLabel="bach"
        disabled={false}
        sending={false}
        error="Không thể gửi bình luận"
        textareaRef={createRef<HTMLTextAreaElement>()}
        fileInputRef={createRef<HTMLInputElement>()}
        onTextChange={vi.fn()}
        onFileChange={vi.fn()}
        onClearAttachment={vi.fn()}
        onCancelReply={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    const composer = container.querySelector(".detail-composer");
    const row = screen.getByTestId("comment-composer-action-row");
    const reply = container.querySelector(".detail-composer-reply");
    const attachment = container.querySelector(".comment-attachment-preview");
    const error = screen.getByRole("alert");

    expect(postMediaCss).toMatch(
      /\.detail-composer-row\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*44px 44px minmax\(0, 1fr\) auto;/s,
    );
    expect(composer?.contains(row)).toBe(true);
    expect(row.contains(reply)).toBe(false);
    expect(row.contains(attachment)).toBe(false);
    expect(row.contains(error)).toBe(false);
  });

  it("keeps comment, reply and submit actions in one mobile-safe composer", () => {
    const onTextChange = vi.fn();
    const onCancelReply = vi.fn();
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => event.preventDefault());

    render(
      <PostDetailComposer
        text=""
        attachment={null}
        replyLabel="bach"
        disabled={false}
        sending={false}
        error=""
        textareaRef={createRef<HTMLTextAreaElement>()}
        fileInputRef={createRef<HTMLInputElement>()}
        onTextChange={onTextChange}
        onFileChange={vi.fn()}
        onClearAttachment={vi.fn()}
        onCancelReply={onCancelReply}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Add a comment" }), {
      target: { value: "Xin chào" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Cancel reply" }));
    fireEvent.submit(screen.getByRole("form", { name: "Comment composer" }));

    expect(onTextChange).toHaveBeenCalledWith("Xin chào");
    expect(onCancelReply).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders a selected attachment outside the input action row", () => {
    const onClearAttachment = vi.fn();
    const file = new File(["image"], "photo.png", { type: "image/png" });

    render(
      <PostDetailComposer
        text="Caption"
        attachment={{ file, previewUrl: "blob:photo", type: "IMAGE" }}
        disabled={false}
        sending={false}
        error=""
        textareaRef={createRef<HTMLTextAreaElement>()}
        fileInputRef={createRef<HTMLInputElement>()}
        onTextChange={vi.fn()}
        onFileChange={vi.fn()}
        onClearAttachment={onClearAttachment}
        onCancelReply={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByText("photo.png")).toBeInTheDocument();
    expect(screen.getByTestId("comment-composer-action-row")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove attachment" }));
    expect(onClearAttachment).toHaveBeenCalledTimes(1);
  });
});
