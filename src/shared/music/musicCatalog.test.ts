import { afterEach, describe, expect, it, vi } from "vitest";
import { API_BASE_URL } from "../api";
import { requestMusicFetch } from "./musicCatalog";

const TRACK_ID = "1Gqm6KaobG2A1mFVjGnJsS";

afterEach(() => vi.unstubAllGlobals());

describe("requestMusicFetch", () => {
  it("starts an authenticated Spotify music fetch without a request body", async () => {
    const fetchRequest = vi.fn(async () => new Response(JSON.stringify({
      result: { trackId: TRACK_ID, status: "STARTED" },
    }), {
      status: 202,
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", fetchRequest);

    await expect(requestMusicFetch(TRACK_ID)).resolves.toEqual({
      trackId: TRACK_ID,
      status: "STARTED",
    });
    expect(fetchRequest).toHaveBeenCalledWith(
      `${API_BASE_URL}/musics/${TRACK_ID}/fetch`,
      expect.objectContaining({ method: "POST", credentials: "include", body: undefined }),
    );
  });
});
