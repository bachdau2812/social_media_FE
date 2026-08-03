import type { MouseEvent } from "react";
import type { ChatStoryContext } from "../model/chat.types";

type Props = {
  context?: ChatStoryContext | null;
  content?: string | null;
  label: string;
  compact?: boolean;
  onOpenStory?: () => void;
};

export function StoryReplyMessage({ context, content, label, compact = false, onOpenStory }: Props) {
  const canShowPreview = context?.available === true && Boolean(context.previewUrl);

  function openStory(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onOpenStory?.();
  }

  return <div className={`story-reply-message ${compact ? "compact" : ""}`}>
    <span className="story-reply-label">{label}</span>
    {canShowPreview
      ? <button type="button" className="story-reply-preview" onClick={openStory} aria-label="Mở Story đã trả lời">
        <img src={context?.previewUrl || ""} alt="Story đã trả lời" loading="lazy" />
      </button>
      : <span className="story-reply-unavailable">Tin không hiển thị</span>}
    {content && <p className="emoji-text">{content}</p>}
  </div>;
}
