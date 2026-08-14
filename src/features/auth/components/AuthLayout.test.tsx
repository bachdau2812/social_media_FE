import { cleanup, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthLayout } from "./AuthLayout";

afterEach(cleanup);

const css = readFileSync(
  resolve(process.cwd(), "src/features/auth/styles/auth.css"),
  "utf8",
);

describe("AuthLayout", () => {
  it("keeps the brand panel mounted while auth content changes", () => {
    const { rerender } = render(
      <AuthLayout stepKey="signin" locale="vi" onLocaleChange={vi.fn()}>
        <p>Đăng nhập</p>
      </AuthLayout>,
    );
    const brand = screen.getByTestId("auth-brand-panel");

    rerender(
      <AuthLayout stepKey="register" locale="vi" onLocaleChange={vi.fn()}>
        <p>Đăng ký</p>
      </AuthLayout>,
    );

    expect(screen.getByTestId("auth-brand-panel")).toBe(brand);
    expect(screen.getByText("Đăng ký")).toBeInTheDocument();
  });

  it("uses an original editorial brand composition", () => {
    render(
      <AuthLayout stepKey="signin" locale="en" onLocaleChange={vi.fn()}>
        <p>Sign in</p>
      </AuthLayout>,
    );

    expect(screen.getByText("Closer to what matters.")).toBeInTheDocument();
    expect(screen.getByTestId("auth-editorial-collage")).toBeInTheDocument();
  });

  it("defines the desktop split and mobile-safe CSS contract", () => {
    expect(css).toMatch(/\.auth-experience\s*\{[^}]*min-height:\s*100dvh/s);
    expect(css).toMatch(/@media\s*\(min-width:\s*901px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*64fr\)\s+minmax\(360px,\s*36fr\)/s);
    expect(css).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*\.auth-brand-panel\s*\{[^}]*display:\s*none/s);
    expect(css).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*\.auth-field-control[^}]*font-size:\s*16px/s);
    expect(css).not.toMatch(/\.auth-form-wide[^}]*overflow:\s*auto/s);
  });
});
