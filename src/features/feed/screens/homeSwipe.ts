const HORIZONTAL_GESTURE_OWNER = [
  ".story-strip",
  ".post-media-frame",
  "[data-horizontal-scroll]",
  "input",
  "textarea",
  "button",
  "a",
  "[role='button']",
].join(",");

export function shouldStartFeedTabSwipe(target: EventTarget | null) {
  return target instanceof Element && !target.closest(HORIZONTAL_GESTURE_OWNER);
}
