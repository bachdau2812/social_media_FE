import { Check, Music2, Pause, Play, Search, X } from "lucide-react";
import type { MusicDto } from "./musicCatalog";
import "./MusicTrackBrowser.css";

export type MusicTrackBrowserProps = {
  tracks: MusicDto[];
  query: string;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  selectedId: string | null;
  previewingId: string | null;
  fetchingTrackIds: Set<string>;
  onFetch: (track: MusicDto) => void;
  onQueryChange: (value: string) => void;
  onLoadMore: () => void;
  onPreview: (track: MusicDto) => void;
  onSelect: (track: MusicDto) => void;
  onClose: () => void;
};

function formatTime(seconds: number | null) {
  const safe = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds ?? 0 : 0));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function TrackArtwork({ track }: { track: MusicDto }) {
  return track.displayImages
    ? <img className="music-artwork" src={track.displayImages} alt="" />
    : <span className="music-artwork fallback"><Music2 size={18} /></span>;
}

export function MusicTrackBrowser({
  tracks,
  query,
  loading,
  loadingMore,
  hasMore,
  selectedId,
  previewingId,
  fetchingTrackIds,
  onFetch,
  onQueryChange,
  onLoadMore,
  onPreview,
  onSelect,
  onClose,
}: MusicTrackBrowserProps) {
  return <section className="track-browser">
    <header>
      <strong>{query ? "Search results" : "Suggested tracks"}</strong>
      <button type="button" onClick={onClose} aria-label="Close music browser"><X size={17} /></button>
    </header>
    <label className="track-search">
      <Search size={17} />
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search tracks or artists" autoFocus />
      {query && <button type="button" onClick={() => onQueryChange("")} aria-label="Clear search"><X size={15} /></button>}
    </label>
    {loading
      ? <div className="track-browser-state" aria-label="Loading tracks"><span /><span /><span /></div>
      : tracks.length
        ? <div className="track-results">
          {tracks.map((track) => {
            const selected = selectedId === track.id;
            const playing = previewingId === track.id;
            const fetching = fetchingTrackIds.has(track.id);
            const ready = track.fetched && Boolean(track.songUrl);
            const artist = track.singleName || track.category || "Unknown artist";
            return <article key={track.id} className={selected ? "selected" : ""}>
              <TrackArtwork track={track} />
              <span><strong>{track.displayName}</strong><small>{artist} · {formatTime(track.duration)}</small></span>
              {ready ? <>
                <button type="button" onClick={() => onPreview(track)} aria-label={`${playing ? "Pause" : "Preview"} ${track.displayName}`}>
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button type="button" className="track-select" onClick={() => onSelect(track)} aria-label={`Select ${track.displayName}`}>
                  {selected ? <Check size={16} /> : "Select"}
                </button>
              </> : <button
                type="button"
                className="track-fetch"
                onClick={() => onFetch(track)}
                disabled={fetching}
                aria-label={`${fetching ? "Processing" : "Fetch"} ${track.displayName}`}
              >{fetching ? "Processing…" : "Fetch"}</button>}
            </article>;
          })}
          {hasMore && <button type="button" className="track-load-more" onClick={onLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading more..." : "Load more"}
          </button>}
        </div>
        : <div className="track-empty"><Music2 size={20} /><strong>No tracks found</strong><span>Try another title or artist.</span></div>}
  </section>;
}
