import { describe, expect, it } from "vitest";
import {
  moveMusicHandle,
  moveMusicWindow,
  normalizeMusicSegment,
} from "./musicSegment";

describe("music segment geometry", () => {
  it("caps a selected segment at sixty seconds", () => {
    expect(normalizeMusicSegment({ start: 0, end: 90 }, 180)).toEqual({
      start: 0,
      end: 60,
    });
  });

  it("prevents the start handle from crossing the end handle", () => {
    expect(moveMusicHandle({ start: 10, end: 30 }, "start", 40, 120)).toEqual({
      start: 29,
      end: 30,
    });
  });

  it("prevents the end handle from crossing the start handle", () => {
    expect(moveMusicHandle({ start: 10, end: 30 }, "end", 5, 120)).toEqual({
      start: 10,
      end: 11,
    });
  });

  it("moves the whole selected window while preserving its duration", () => {
    expect(moveMusicWindow({ start: 20, end: 50 }, 100, 120)).toEqual({
      start: 90,
      end: 120,
    });
    expect(moveMusicWindow({ start: 20, end: 50 }, -100, 120)).toEqual({
      start: 0,
      end: 30,
    });
  });
});
