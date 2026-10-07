import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { StoryItem } from "../model/story.types";
import { StoryHeader } from "./StoryHeader";

const story: StoryItem = {
  id: "story-1",
  userId: "user-1",
  name: "Full Name",
  username: "nickname",
  avatarUrl: "https://cdn.example.test/avatar.jpg",
  createdAt: "2026-10-07T08:00:00.000Z",
  musicName: "Song title",
  totalItems: 1,
  seenItems: 0,
  state: "unseen",
};

describe("StoryHeader", () => {
  it("shows the nickname instead of the full name and uses a round story avatar", () => {
    const { container } = render(<StoryHeader story={story} onOpenProfile={async () => undefined} />);

    expect(screen.getByText("nickname")).toBeInTheDocument();
    expect(screen.queryByText("Full Name")).not.toBeInTheDocument();
    expect(screen.getByText("Song title")).toBeInTheDocument();
    expect(container.querySelector(".story-header-avatar")).toBeInTheDocument();
  });
});
