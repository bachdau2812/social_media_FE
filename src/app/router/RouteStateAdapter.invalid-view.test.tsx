import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RouteStateAdapter } from "./RouteStateAdapter";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

describe("RouteStateAdapter persisted view validation", () => {
  it("does not restore the transient connections modal as a durable screen", () => {
    sessionStorage.setItem("social-media-active-view", "connections");

    render(<RouteStateAdapter view="home"><span>Home</span></RouteStateAdapter>);

    expect(sessionStorage.getItem("social-media-active-view")).toBe("home");
  });
});
