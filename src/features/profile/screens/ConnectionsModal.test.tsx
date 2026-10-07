import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ConnectionsModal } from "./ProfileScreen";
import type { Profile } from "../model/profile.types";
import { profileApi } from "../api/profile.api";
vi.mock("../../story", () => ({ StoryHighlights: () => null }));
vi.mock("../api/profile.api", async original => { const actual = await original<typeof import("../api/profile.api")>(); return { ...actual, profileApi: { ...actual.profileApi, getConnections: vi.fn() } }; });
afterEach(cleanup);
it("keeps connections open when Escape cancels a removal confirmation", async () => {
  vi.mocked(profileApi.getConnections).mockResolvedValue({ users: [{ id: "edge", userId: "other", username: "other", displayName: "Other", relationshipAction: "Following" }], hasNextPage: false } as Awaited<ReturnType<typeof profileApi.getConnections>>);
  const close = vi.fn();
  render(<ConnectionsModal viewerId="owner" profile={{ id: "owner", username: "owner", displayName: "Owner" } as Profile} activeTab="FOLLOWING" onTabChange={vi.fn()} onClose={close} onOpenProfile={vi.fn()} onRelationshipRemoved={vi.fn()} />);
  await waitFor(() => expect(screen.getByText("Other")).toBeInTheDocument());
  fireEvent.click(document.querySelector('.relationship-action')!);
  expect(screen.getByRole("alertdialog").querySelector("button")).toHaveFocus();
  fireEvent.keyDown(screen.getByRole("alertdialog"), { key: "Escape" });
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  expect(close).not.toHaveBeenCalled();
});
