import { Heart, Send } from "lucide-react";
import type { FormEvent } from "react";

type Props = {
  name: string;
  value: string;
  permitted: boolean;
  sending: boolean;
  error?: string | null;
  liked: boolean;
  showLike: boolean;
  likePending: boolean;
  onChange: (value: string) => void;
  onLikedChange: () => void;
  onFocusChange: (focused: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function StoryReplyComposer({ name, value, permitted, sending, error, liked, showLike, likePending, onChange, onLikedChange, onFocusChange, onSubmit }: Props) {
  return <form className={permitted ? "story-reply" : "story-reply disabled"} onSubmit={onSubmit}>
    <div className="story-reply-input">
      <input
        value={value}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onChange={(event) => onChange(event.target.value)}
        disabled={!permitted || sending}
        placeholder={permitted ? `Reply to ${name}...` : "Reply disabled"}
        aria-invalid={Boolean(error)}
      />
      {error && <span className="story-reply-error" role="alert">{error}</span>}
    </div>
    {showLike && <button type="button" className={liked ? "active" : ""} onClick={onLikedChange} disabled={likePending} aria-pressed={liked} aria-label="Like story"><Heart size={19} fill={liked ? "currentColor" : "none"} /></button>}
    <button type="submit" disabled={!value.trim() || !permitted || sending} aria-label="Send reply"><Send size={19} /></button>
  </form>;
}
