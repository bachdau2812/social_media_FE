import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MusicTrackBrowser } from "./MusicTrackBrowser";
import type { MusicDto } from "./musicCatalog";

function track(id: string, fetched: boolean): MusicDto {
  return {
    id,
    slugName: id,
    displayName: `Track ${id}`,
    descriptions: null,
    displayImages: null,
    singleName: "Artist",
    songUrl: fetched ? `https://cdn/${id}.mp3` : null,
    duration: 90,
    category: null,
    releaseYear: null,
    albumName: null,
    fetched,
  };
}

describe("MusicTrackBrowser", () => {
  it("shares ready, fetch and search behavior across creation surfaces", () => {
    const onPreview = vi.fn();
    const onSelect = vi.fn();
    const onFetch = vi.fn();
    const onQueryChange = vi.fn();
    const tracks = [track("ready", true), track("pending", false)];

    render(<MusicTrackBrowser
      tracks={tracks}
      query=""
      loading={false}
      loadingMore={false}
      hasMore
      selectedId={null}
      previewingId={null}
      fetchingTrackIds={new Set()}
      onFetch={onFetch}
      onQueryChange={onQueryChange}
      onLoadMore={vi.fn()}
      onPreview={onPreview}
      onSelect={onSelect}
      onClose={vi.fn()}
    />);

    fireEvent.change(screen.getByPlaceholderText("Search tracks or artists"), { target: { value: "song" } });
    fireEvent.click(screen.getByRole("button", { name: "Preview Track ready" }));
    fireEvent.click(screen.getByRole("button", { name: "Select Track ready" }));
    fireEvent.click(screen.getByRole("button", { name: "Fetch Track pending" }));

    expect(onQueryChange).toHaveBeenCalledWith("song");
    expect(onPreview).toHaveBeenCalledWith(tracks[0]);
    expect(onSelect).toHaveBeenCalledWith(tracks[0]);
    expect(onFetch).toHaveBeenCalledWith(tracks[1]);
  });
});
