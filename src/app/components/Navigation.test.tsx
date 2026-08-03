import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MobileNav } from "./Navigation";
import { MobileAppHeader } from "./MobileAppHeader";

afterEach(cleanup);

describe("mobile application navigation", () => {
  it("shows Chat in the bottom navigation with the shared unread count", () => {
    const onNavigate = vi.fn();
    render(<MobileNav active="home" chatUnreadCount={12} onNavigate={onNavigate} />);

    expect(screen.getByRole("button", { name: "Chat, 12 unread" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Library" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Chat, 12 unread" }));
    expect(onNavigate).toHaveBeenCalledWith("chat");
  });

  it("exposes Profile, Library, and Settings through the mobile More menu", () => {
    const onNavigate = vi.fn();
    render(<MobileAppHeader title="Home" canGoBack={false} onBack={vi.fn()} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole("button", { name: "Mở menu khác" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Trang cá nhân" }));
    expect(onNavigate).toHaveBeenCalledWith("profile");

    fireEvent.click(screen.getByRole("button", { name: "Mở menu khác" }));
    expect(screen.getByRole("menuitem", { name: "Thư viện" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Cài đặt" })).toBeInTheDocument();
  });
});
