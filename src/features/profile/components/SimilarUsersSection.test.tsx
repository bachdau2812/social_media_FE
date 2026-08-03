import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  SimilarUsersSection,
  clearSimilarUsersCache,
  type SimilarUser,
} from "./SimilarUsersSection";

const people: SimilarUser[] = [
  {
    id: "similar-1",
    username: "linh",
    displayName: "My Linh",
    avatarUrl: null,
    relationship: "none",
  },
  {
    id: "similar-2",
    username: "minh",
    displayName: "Quang Minh",
    avatarUrl: null,
    relationship: "follows_you",
  },
  {
    id: "similar-3",
    username: "an",
    displayName: "Bao An",
    avatarUrl: null,
    relationship: "following",
  },
  {
    id: "similar-4",
    username: "hoa",
    displayName: "Thanh Hoa",
    avatarUrl: null,
    relationship: "friends",
  },
];

beforeEach(() => {
  clearSimilarUsersCache();
});

describe("SimilarUsersSection", () => {
  it("loads lazily and reuses cached results when reopened", async () => {
    const loadUsers = vi.fn().mockResolvedValue(people);
    const props = {
      profileId: "profile-1",
      loadUsers,
      onSelectUser: vi.fn(),
      onFollow: vi.fn(),
      onUnfollow: vi.fn(),
      onClose: vi.fn(),
    };
    const { rerender } = render(<SimilarUsersSection {...props} open={false} />);
    expect(loadUsers).not.toHaveBeenCalled();

    rerender(<SimilarUsersSection {...props} open />);
    expect(await screen.findByText("My Linh")).toBeInTheDocument();
    expect(loadUsers).toHaveBeenCalledOnce();

    rerender(<SimilarUsersSection {...props} open={false} />);
    rerender(<SimilarUsersSection {...props} open />);
    await waitFor(() => expect(screen.getByText("My Linh")).toBeInTheDocument());
    expect(loadUsers).toHaveBeenCalledOnce();
  });

  it("opens the full result dialog and updates follow state immediately", async () => {
    const onFollow = vi.fn().mockResolvedValue(undefined);
    render(
      <SimilarUsersSection
        open
        profileId="profile-1"
        loadUsers={vi.fn().mockResolvedValue(people)}
        onSelectUser={vi.fn()}
        onFollow={onFollow}
        onUnfollow={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    await userEvent.click(await screen.findByRole("button", { name: "Follow My Linh" }));
    expect(onFollow).toHaveBeenCalledWith(people[0]);
    expect(screen.getByRole("button", { name: "Unfollow My Linh" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "View all similar people" }));
    expect(screen.getByRole("dialog", { name: "Similar people" })).toBeInTheDocument();
    expect(screen.getByText("Thanh Hoa")).toBeInTheDocument();
  });

  it("supports error retry and an empty state", async () => {
    const loadUsers = vi
      .fn()
      .mockRejectedValueOnce(new Error("failed"))
      .mockResolvedValueOnce([]);
    render(
      <SimilarUsersSection
        open
        profileId="profile-1"
        loadUsers={loadUsers}
        onSelectUser={vi.fn()}
        onFollow={vi.fn()}
        onUnfollow={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(await screen.findByText("Unable to load suggestions")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Retry suggestions" }));
    expect(await screen.findByText("No similar people found")).toBeInTheDocument();
  });
});
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);
