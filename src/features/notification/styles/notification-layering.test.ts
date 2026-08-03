import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const tokensCss = readFileSync(resolve(process.cwd(), "src/shared/styles/tokens.css"), "utf8");
const postDetailCss = readFileSync(
  resolve(process.cwd(), "src/features/post/styles/post-detail-foundation.css"),
  "utf8",
);
const notificationCss = readFileSync(
  resolve(process.cwd(), "src/features/notification/styles/notification.css"),
  "utf8",
);

function tokenValue(name: string): number {
  const match = tokensCss.match(new RegExp(`${name}:\\s*(\\d+)`));
  if (!match?.[1]) throw new Error(`Missing numeric token ${name}`);
  return Number(match[1]);
}

describe("Notification and Post Detail layering", () => {
  it("keeps Post Detail on the overlay layer above sticky Notification filters", () => {
    const sticky = tokenValue("--app-z-sticky");
    const overlay = tokenValue("--app-z-overlay");

    expect(notificationCss).toMatch(
      /\.notification-filters\s*\{[^}]*z-index:\s*calc\(var\(--app-z-sticky\) - 1\);/s,
    );
    expect(postDetailCss).toMatch(
      /\.post-detail-backdrop\s*\{[^}]*z-index:\s*var\(--app-z-overlay\);/s,
    );
    expect(overlay).toBeGreaterThan(sticky);
  });
});
