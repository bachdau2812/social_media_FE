import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StoryHighlights } from "./StoryHighlights";
import { storyApi } from "../api/story.api";

vi.mock("../api/story.api", () => ({
  storyApi: {
    highlights: vi.fn(),
    archive: vi.fn(),
    createHighlight: vi.fn(),
  },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("StoryHighlights horizontal rail", () => {
  it("places the add action first and flows highlights from left to right", async () => {
    vi.mocked(storyApi.highlights).mockResolvedValue([{
      id: "highlight-1",
      ownerId: "owner-1",
      title: "Summer",
      coverUrl: null,
      createdAt: "2026-07-29T00:00:00Z",
      updatedAt: "2026-07-29T00:00:00Z",
      stories: [],
    }]);

    const { container } = render(
      <StoryHighlights ownerId="owner-1" ownProfile onOpen={vi.fn()} />,
    );

    const item = await screen.findByRole("button", { name: /Summer/i });
    const add = container.querySelector(".story-highlight-item.add");
    const strip = container.querySelector(".story-highlights-strip");
    expect(item.closest(".story-highlights-strip")).toBeInTheDocument();
    expect(add?.closest(".story-highlights-strip")).toBeInTheDocument();
    expect(strip?.firstElementChild).toBe(add);
  });
});
