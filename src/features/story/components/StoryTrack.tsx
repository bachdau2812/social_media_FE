import type { CSSProperties, ReactNode, TransitionEventHandler } from "react";

export function StoryTrack({ children, transform, animating, dragging, snapping, onTransitionEnd }: { children: ReactNode; transform: string; animating: boolean; dragging: boolean; snapping: boolean; onTransitionEnd: TransitionEventHandler<HTMLDivElement> }) {
  const style = { transform } as CSSProperties;
  return <div className={`story-track ${animating ? "is-animating" : ""} ${dragging ? "is-dragging" : ""} ${snapping ? "is-snapping" : ""}`.trim()} style={style} onTransitionEnd={(event) => {
    if (event.currentTarget === event.target && event.propertyName === "transform") onTransitionEnd(event);
  }}>{children}</div>;
}
