import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ResponsiveAppShell } from "./ResponsiveAppShell";

afterEach(cleanup);

describe("ResponsiveAppShell", () => {
  it("mounts only mobile navigation on a mobile viewport", () => {
    render(
      <ResponsiveAppShell
        viewportMode="mobile"
        className="home-shell"
        desktopNavigation={<nav aria-label="Desktop navigation" />}
        mobileHeader={<header aria-label="Mobile header" />}
        mobileNavigation={<nav aria-label="Mobile navigation" />}
      >
        <p>Feed</p>
      </ResponsiveAppShell>,
    );

    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
    expect(screen.getByRole("banner", { name: "Mobile header" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Desktop navigation" })).not.toBeInTheDocument();
  });

  it("mounts only desktop navigation and the optional right rail on desktop", () => {
    render(
      <ResponsiveAppShell
        viewportMode="desktop"
        desktopNavigation={<nav aria-label="Desktop navigation" />}
        mobileHeader={<header aria-label="Mobile header" />}
        mobileNavigation={<nav aria-label="Mobile navigation" />}
        rightRail={<aside aria-label="Suggestions" />}
      >
        <p>Feed</p>
      </ResponsiveAppShell>,
    );

    expect(screen.getByRole("navigation", { name: "Desktop navigation" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Suggestions" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(screen.queryByRole("banner", { name: "Mobile header" })).not.toBeInTheDocument();
  });
});
