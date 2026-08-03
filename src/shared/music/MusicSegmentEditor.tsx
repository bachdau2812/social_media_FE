import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { useRef } from "react";
import {
  moveMusicHandle,
  moveMusicWindow,
  normalizeMusicSegment,
  type MusicHandle,
  type MusicSegment,
} from "./musicSegment";
import "./music-segment-editor.css";

export type MusicSegmentEditorProps = {
  duration: number;
  value: MusicSegment;
  onChange(value: MusicSegment): void;
  onCommit(value: MusicSegment): void;
  onInteractionStart?(): void;
};

type DragState = {
  kind: MusicHandle | "window";
  pointerId: number;
  startX: number;
  origin: MusicSegment;
  latest: MusicSegment;
};

function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function MusicSegmentEditor({
  duration,
  value,
  onChange,
  onCommit,
  onInteractionStart,
}: MusicSegmentEditorProps) {
  const safeDuration = Math.max(1, Math.round(duration));
  const segment = normalizeMusicSegment(value, safeDuration);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const startPercent = segment.start / safeDuration * 100;
  const endPercent = segment.end / safeDuration * 100;
  const style = {
    "--music-segment-start": `${startPercent}%`,
    "--music-segment-end": `${endPercent}%`,
    "--music-segment-width": `${endPercent - startPercent}%`,
  } as CSSProperties;

  const releasePointer = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const beginPointer = (
    kind: MusicHandle | "window",
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    if (!trackRef.current) return;
    onInteractionStart?.();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      kind,
      pointerId: event.pointerId,
      startX: event.clientX,
      origin: segment,
      latest: segment,
    };
  };

  const movePointer = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;
    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = drag.kind === "window"
      ? moveMusicWindow(
        drag.origin,
        (event.clientX - drag.startX) / rect.width * safeDuration,
        safeDuration,
      )
      : moveMusicHandle(
        drag.origin,
        drag.kind,
        (event.clientX - rect.left) / rect.width * safeDuration,
        safeDuration,
      );
    drag.latest = next;
    onChange(next);
  };

  const finishPointer = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    releasePointer(event);
    onCommit(drag.latest);
  };

  const cancelPointer = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    releasePointer(event);
  };

  const changeHandleWithKeyboard = (
    handle: MusicHandle,
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    const step = event.shiftKey ? 5 : 1;
    let nextValue: number | null = null;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextValue = segment[handle] - step;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextValue = segment[handle] + step;
    } else if (event.key === "Home") {
      nextValue = 0;
    } else if (event.key === "End") {
      nextValue = safeDuration;
    }
    if (nextValue == null) return;
    event.preventDefault();
    onInteractionStart?.();
    const next = moveMusicHandle(segment, handle, nextValue, safeDuration);
    onChange(next);
    onCommit(next);
  };

  const moveWindowWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    const direction = event.key === "ArrowLeft" || event.key === "ArrowDown"
      ? -1
      : event.key === "ArrowRight" || event.key === "ArrowUp"
        ? 1
        : 0;
    if (!direction) return;
    event.preventDefault();
    onInteractionStart?.();
    const next = moveMusicWindow(segment, direction * (event.shiftKey ? 5 : 1), safeDuration);
    onChange(next);
    onCommit(next);
  };

  return (
    <div className="music-segment-editor" style={style}>
      <div className="music-segment-editor__summary" aria-live="polite">
        <span>{formatSeconds(segment.start)}</span>
        <strong>{segment.end - segment.start}s</strong>
        <span>{formatSeconds(segment.end)}</span>
      </div>
      <div className="music-segment-editor__rail-wrap">
        <div ref={trackRef} className="music-segment-editor__rail">
          <div className="music-segment-editor__selection" aria-hidden="true" />
          <button
            type="button"
            className="music-segment-editor__window"
            aria-label="Move selected music range"
            onPointerDown={(event) => beginPointer("window", event)}
            onPointerMove={movePointer}
            onPointerUp={finishPointer}
            onPointerCancel={cancelPointer}
            onKeyDown={moveWindowWithKeyboard}
          />
          <button
            type="button"
            role="slider"
            className="music-segment-editor__handle music-segment-editor__handle--start"
            aria-label="Music segment start"
            aria-valuemin={Math.max(0, segment.end - 60)}
            aria-valuemax={segment.end - 1}
            aria-valuenow={segment.start}
            aria-valuetext={formatSeconds(segment.start)}
            onPointerDown={(event) => beginPointer("start", event)}
            onPointerMove={movePointer}
            onPointerUp={finishPointer}
            onPointerCancel={cancelPointer}
            onKeyDown={(event) => changeHandleWithKeyboard("start", event)}
          />
          <button
            type="button"
            role="slider"
            className="music-segment-editor__handle music-segment-editor__handle--end"
            aria-label="Music segment end"
            aria-valuemin={segment.start + 1}
            aria-valuemax={Math.min(safeDuration, segment.start + 60)}
            aria-valuenow={segment.end}
            aria-valuetext={formatSeconds(segment.end)}
            onPointerDown={(event) => beginPointer("end", event)}
            onPointerMove={movePointer}
            onPointerUp={finishPointer}
            onPointerCancel={cancelPointer}
            onKeyDown={(event) => changeHandleWithKeyboard("end", event)}
          />
        </div>
      </div>
    </div>
  );
}
