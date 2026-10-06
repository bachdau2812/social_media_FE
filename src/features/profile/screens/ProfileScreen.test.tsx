import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "../model/profile.types";
import { ProfileScreen } from "./ProfileScreen";

vi.mock("../../story", () => ({ StoryHighlights: () => null }));
afterEach(cleanup);

const profile: Profile = {
  id: "owner", username: "bach", displayName: "Bach", avatarUrl: "https://cdn/old.jpg",
  hobbies: [], jobs: [], universities: [], highSchools: [], socialLinks: [],
  followerCount: 0, followingCount: 0, friendCount: 0, friend: false,
  viewerFollows: false, userFollowsViewer: false, posts: [], reposts: [],
};
function showProfile(viewerId: string) {
  return render(<ProfileScreen viewerId={viewerId} profile={profile} onSelectPost={vi.fn()}
    onOpenStoryHighlight={vi.fn()} onOpenArchive={vi.fn()} onOpenConnections={vi.fn()}
    onRefresh={vi.fn()} onMessage={vi.fn()} onOpenProfile={vi.fn()} />);
}

describe("profile avatar ownership", () => {
  it("shows the image picker only on the owner's profile", () => {
    showProfile("owner");
    expect(screen.getByRole("button", { name: "Đổi ảnh đại diện" })).toBeInTheDocument();
  });
  it("keeps other people's avatars read-only", () => {
    showProfile("viewer");
    expect(screen.queryByRole("button", { name: "Đổi ảnh đại diện" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "bach" })).toHaveAttribute("src", profile.avatarUrl);
  });
});
