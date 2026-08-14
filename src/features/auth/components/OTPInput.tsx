import { type CSSProperties, type ClipboardEvent, type KeyboardEvent, useRef } from "react";

type OTPInputProps = {
  value: string;
  length: number;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  ariaLabel: string;
};

export function compactOTP(value: string, length?: number) {
  const compact = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return length === undefined ? compact : compact.slice(0, length);
}

function cellsFromValue(value: string, length: number) {
  const cells = Array<string>(length).fill("");
  let position = 0;
  for (const rawCharacter of value) {
    if (position >= length) break;
    if (rawCharacter === " ") {
      position += 1;
      continue;
    }
    const character = compactOTP(rawCharacter, 1);
    if (character) {
      cells[position] = character;
      position += 1;
    }
  }
  return cells;
}

function positionalValue(cells: string[]) {
  return cells.map((character) => character || " ").join("").trimEnd();
}

export function OTPInput({
  value,
  length,
  onChange,
  disabled = false,
  invalid = false,
  autoFocus = false,
  ariaLabel,
}: OTPInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const cells = cellsFromValue(value, length);

  function focus(index: number) {
    refs.current[Math.max(0, Math.min(length - 1, index))]?.focus();
  }

  function replaceAt(index: number, nextValue: string) {
    const characters = compactOTP(nextValue, length - index);
    if (!characters) return;
    const next = [...cells];
    characters.split("").forEach((character, offset) => {
      next[index + offset] = character;
    });
    onChange(positionalValue(next));
    focus(index + characters.length);
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>, index: number) {
    event.preventDefault();
    const pasted = compactOTP(event.clipboardData.getData("text"), length - index);
    if (!pasted) return;
    const next = [...cells];
    pasted.split("").forEach((character, offset) => {
      next[index + offset] = character;
    });
    onChange(positionalValue(next));
    focus(Math.min(index + pasted.length, length - 1));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focus(index - 1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focus(index + 1);
      return;
    }
    if (event.key !== "Backspace") return;
    event.preventDefault();
    const next = [...cells];
    if (next[index]) {
      next[index] = "";
      onChange(positionalValue(next));
      return;
    }
    if (index > 0) {
      next[index - 1] = "";
      onChange(positionalValue(next));
      focus(index - 1);
    }
  }

  return (
    <div
      className="auth-otp"
      role="group"
      aria-label={ariaLabel}
      aria-invalid={invalid}
      style={{ "--otp-length": length } as CSSProperties}
    >
      {cells.map((character, index) => (
        <input
          key={index}
          ref={(node) => { refs.current[index] = node; }}
          className="auth-otp-cell"
          type="text"
          value={character}
          maxLength={1}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoCapitalize="characters"
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          aria-label={`${ariaLabel} ${index + 1}`}
          aria-invalid={invalid}
          onChange={(event) => replaceAt(index, event.target.value)}
          onPaste={(event) => onPaste(event, index)}
          onKeyDown={(event) => onKeyDown(event, index)}
          onFocus={(event) => event.currentTarget.select()}
        />
      ))}
    </div>
  );
}
