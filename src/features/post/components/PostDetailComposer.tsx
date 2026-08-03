import { Paperclip, X } from "lucide-react";
import type { ChangeEvent, FormEvent, RefObject } from "react";
import { EmojiPickerControl } from "../../chat";

export type CommentMediaSelection = {
  file: File;
  previewUrl: string;
  type: "IMAGE" | "VIDEO";
};

type PostDetailComposerProps = {
  text: string;
  attachment: CommentMediaSelection | null;
  replyLabel?: string;
  disabled: boolean;
  sending: boolean;
  error: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  onTextChange: (value: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearAttachment: () => void;
  onCancelReply: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PostDetailComposer({
  text,
  attachment,
  replyLabel,
  disabled,
  sending,
  error,
  textareaRef,
  fileInputRef,
  onTextChange,
  onFileChange,
  onClearAttachment,
  onCancelReply,
  onSubmit,
}: PostDetailComposerProps) {
  return (
    <form
      className={attachment ? "detail-composer has-attachment" : "detail-composer"}
      aria-label="Comment composer"
      aria-busy={sending}
      onSubmit={onSubmit}
    >
      <input
        ref={fileInputRef}
        className="comment-file-input"
        type="file"
        accept="image/*,video/*"
        onChange={onFileChange}
        disabled={disabled}
      />

      {attachment && (
        <div className="comment-attachment-preview">
          {attachment.type === "VIDEO" ? (
            <video src={attachment.previewUrl} muted playsInline />
          ) : (
            <img src={attachment.previewUrl} alt="Selected comment attachment" />
          )}
          <span>
            <strong>{attachment.file.name}</strong>
            <small>{attachment.type === "VIDEO" ? "Video" : "Image"} · {formatFileSize(attachment.file.size)}</small>
          </span>
          <button type="button" onClick={onClearAttachment} aria-label="Remove attachment">
            <X size={16} />
          </button>
        </div>
      )}

      {replyLabel && (
        <div className="detail-composer-reply" role="status">
          <span>Replying to <strong>@{replyLabel}</strong></span>
          <button type="button" onClick={onCancelReply} aria-label="Cancel reply">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="detail-composer-row" data-testid="comment-composer-action-row">
        <button
          type="button"
          className="comment-attachment"
          aria-label="Attach an image or video"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Paperclip size={19} />
        </button>
        <EmojiPickerControl
          textareaRef={textareaRef}
          value={text}
          onChange={onTextChange}
          disabled={disabled}
          iconSize={19}
        />
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          disabled={disabled}
          aria-label="Add a comment"
          placeholder={replyLabel ? `Reply to ${replyLabel}...` : "Add a comment..."}
        />
        <button type="submit" disabled={(!text.trim() && !attachment) || disabled}>
          {sending ? (attachment ? "Uploading" : "Sending") : "Post"}
        </button>
      </div>

      {error && <span className="composer-error" role="alert">{error}</span>}
    </form>
  );
}
