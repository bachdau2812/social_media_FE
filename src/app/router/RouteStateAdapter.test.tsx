import { lazy, Suspense } from "react";
import { cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RouteStateAdapter } from "./RouteStateAdapter";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.restoreAllMocks();
});

describe("RouteStateAdapter", () => {
  it("does not mutate browser storage during render", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");

    renderToString(<RouteStateAdapter view="search"><span>Search</span></RouteStateAdapter>);

    expect(setItem).not.toHaveBeenCalled();
  });

  it("synchronizes route state after the client render commits", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");

    render(<RouteStateAdapter view="profile" profileUserId="user-7"><span>Profile</span></RouteStateAdapter>);

    expect(setItem).toHaveBeenCalledWith("social-media-active-view", "profile");
    expect(setItem).toHaveBeenCalledWith("social-media-profile-user", "user-7");
  });

  it("keeps the persisted view while the root route lazy application is loading", () => {
    sessionStorage.setItem("social-media-active-view", "search");
    const PendingApplication = lazy(
      () => new Promise<{ default: () => null }>(() => undefined),
    );

    render(
      <RouteStateAdapter view="home">
        <Suspense fallback={<span>Loading</span>}>
          <PendingApplication />
        </Suspense>
      </RouteStateAdapter>,
    );

    expect(sessionStorage.getItem("social-media-active-view")).toBe("search");
  });
});
