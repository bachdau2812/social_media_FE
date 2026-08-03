import EmojiPicker, { EmojiStyle, Theme, type EmojiClickData } from "emoji-picker-react";
import { Smile, X } from "lucide-react";
import {
  type RefObject,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type EmojiPickerControlProps = {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  iconSize?: number;
  className?: string;
};

type PickerPosition = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const PICKER_OPEN_EVENT = "social-media:emoji-picker-open";
const MOBILE_BREAKPOINT = 768;
const DESKTOP_WIDTH = 350;
const DESKTOP_HEIGHT = 420;
const VIEWPORT_GAP = 12;

export function EmojiPickerControl({
  textareaRef,
  value,
  onChange,
  disabled = false,
  iconSize = 18,
  className = "",
}: EmojiPickerControlProps) {
  const instanceId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectionRef = useRef({ start: value.length, end: value.length });
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [position, setPosition] = useState<PickerPosition>({
    left: VIEWPORT_GAP,
    top: VIEWPORT_GAP,
    width: DESKTOP_WIDTH,
    height: DESKTOP_HEIGHT,
  });

  function rememberSelection() {
    const input = textareaRef.current;
    if (!input) {
      selectionRef.current = { start: value.length, end: value.length };
      return;
    }
    selectionRef.current = {
      start: input.selectionStart ?? value.length,
      end: input.selectionEnd ?? value.length,
    };
  }

  function restoreInputFocus(caret?: number) {
    window.requestAnimationFrame(() => {
      const input = textareaRef.current;
      if (!input) return;
      input.focus();
      if (typeof caret === "number") input.setSelectionRange(caret, caret);
    });
  }

  function closePicker(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) restoreInputFocus(selectionRef.current.start);
  }

  function updatePosition() {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setMobile(isMobile);
    if (isMobile) return;

    const trigger = triggerRef.current?.getBoundingClientRect();
    if (!trigger) return;
    const width = Math.min(DESKTOP_WIDTH, window.innerWidth - VIEWPORT_GAP * 2);
    const height = Math.min(DESKTOP_HEIGHT, window.innerHeight - VIEWPORT_GAP * 2);
    const left = Math.min(
      Math.max(VIEWPORT_GAP, trigger.left + trigger.width / 2 - width / 2),
      window.innerWidth - width - VIEWPORT_GAP,
    );
    const preferredTop = trigger.top - height - 10;
    const top = preferredTop >= VIEWPORT_GAP
      ? preferredTop
      : Math.min(trigger.bottom + 10, window.innerHeight - height - VIEWPORT_GAP);

    setPosition({ left, top, width, height });
  }

  function togglePicker() {
    if (open) {
      closePicker();
      return;
    }
    rememberSelection();
    window.dispatchEvent(new CustomEvent(PICKER_OPEN_EVENT, { detail: instanceId }));
    setOpen(true);
  }

  function insertEmojiAtCaret(emojiData: EmojiClickData) {
    const rawStart = Math.min(selectionRef.current.start, value.length);
    const rawEnd = Math.min(selectionRef.current.end, value.length);
    const start = Math.min(rawStart, rawEnd);
    const end = Math.max(rawStart, rawEnd);
    const nextValue = `${value.slice(0, start)}${emojiData.emoji}${value.slice(end)}`;
    const nextCaret = start + emojiData.emoji.length;

    selectionRef.current = { start: nextCaret, end: nextCaret };
    onChange(nextValue);
    setOpen(false);
    restoreInputFocus(nextCaret);
  }

  useEffect(() => {
    const handleOtherPicker = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail !== instanceId) setOpen(false);
    };
    window.addEventListener(PICKER_OPEN_EVENT, handleOtherPicker);
    return () => window.removeEventListener(PICKER_OPEN_EVENT, handleOtherPicker);
  }, [instanceId]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closePicker();
    };
    const handleViewportChange = () => updatePosition();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open, value]);

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`emoji-picker-trigger ${className}`.trim()}
        aria-label="Chọn emoji"
        aria-haspopup="dialog"
        aria-expanded={open}
        disabled={disabled}
        onPointerDown={rememberSelection}
        onClick={togglePicker}
      >
        <Smile size={iconSize} />
      </button>
      {open && createPortal(
        <div
          className={`emoji-picker-layer${mobile ? " mobile" : ""}`}
          role="presentation"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closePicker();
          }}
        >
          <section
            className="emoji-picker-panel"
            role="dialog"
            aria-label="Chọn emoji"
            style={mobile ? undefined : position}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <header className="emoji-picker-mobile-header">
              <strong>Emoji</strong>
              <button type="button" onClick={() => closePicker()} aria-label="Đóng bộ chọn emoji">
                <X size={18} />
              </button>
            </header>
            <div className="emoji-picker-body">
              <EmojiPicker
                width="100%"
                height="100%"
                theme={Theme.LIGHT}
                emojiStyle={EmojiStyle.NATIVE}
                searchPlaceholder="Tìm kiếm emoji"
                lazyLoadEmojis
                previewConfig={{ showPreview: false }}
                onEmojiClick={insertEmojiAtCaret}
              />
            </div>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}

