import { cleanup, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { AuthBrandPanel } from "./AuthBrandPanel";

afterEach(cleanup);

describe("AuthBrandPanel viewport composition", () => {
  it("uses a compact slogan without the former desktop brand copy", () => {
    render(<AuthBrandPanel />);

    expect(screen.queryByText("Social")).not.toBeInTheDocument();
    expect(screen.queryByText("your space")).not.toBeInTheDocument();
    expect(screen.queryByText("Made for real connection")).not.toBeInTheDocument();
    expect(screen.getByText("Closer to what matters.")).toBeInTheDocument();
  });

  it("constrains the desktop brand composition to one dynamic viewport", () => {
    const css = readFileSync(
      resolve(process.cwd(), "src/features/auth/styles/auth.css"),
      "utf8",
    );

    expect(css).toMatch(/\.auth-brand-panel\s*\{[^}]*height:\s*100dvh/s);
    expect(css).toMatch(/grid-template-rows:\s*auto\s+minmax\(0,\s*1fr\)\s+auto/s);
    expect(css).toMatch(/\.auth-editorial-collage\s*\{[^}]*min-height:\s*0/s);
  });
});
