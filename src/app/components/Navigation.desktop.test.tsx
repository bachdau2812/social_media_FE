import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "./Navigation";

afterEach(cleanup);

describe("desktop application navigation", () => {
  it("keeps logout accessible without showing a text label in the expanded rail", () => {
    render(
      <Navigation
        active="home"
        chatUnreadCount={0}
        notificationUnreadCount={4}
        onNavigate={vi.fn()}
        onReloadHome={vi.fn()}
        onLogout={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Alerts, 4 unread" })).toHaveTextContent("4");
    expect(screen.getByRole("button", { name: "Logout" })).not.toHaveTextContent("Logout");
  });
});

