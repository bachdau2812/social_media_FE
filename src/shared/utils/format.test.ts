import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatRelativeTime } from "./format";

describe("formatRelativeTime", () => {
  const now = new Date("2026-07-29T12:00:00.000Z");

  beforeEach(() => vi.useFakeTimers({ now }));
  afterEach(() => vi.useRealTimers());

  it.each([
    [30_000, "Vừa xong"],
    [60_000, "1 phút trước"],
    [59 * 60_000, "59 phút trước"],
    [60 * 60_000, "1 giờ trước"],
    [23 * 60 * 60_000, "23 giờ trước"],
    [24 * 60 * 60_000, "1 ngày trước"],
    [7 * 24 * 60 * 60_000, "7 ngày trước"],
  ])("formats an item posted %i milliseconds ago", (elapsed, expected) => {
    expect(formatRelativeTime(new Date(now.getTime() - elapsed))).toBe(expected);
  });

  it("uses dd/MM/yyyy immediately after the seven-day limit", () => {
    expect(formatRelativeTime(new Date(now.getTime() - 7 * 24 * 60 * 60_000 - 1_000))).toBe("22/07/2026");
  });

  it("clamps future dates and hides invalid values", () => {
    expect(formatRelativeTime(new Date(now.getTime() + 10_000))).toBe("Vừa xong");
    expect(formatRelativeTime("not-a-date")).toBe("");
  });
});
