import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { enablePostVideoSound } from "../model/postVideoPlaybackCoordinator";
import { usePostVideoPlayback } from "./usePostVideoPlayback";

function Harness({ eligible = true }: { eligible?: boolean }) {
  const playback = usePostVideoPlayback({
    source: "https://cdn.example.test/video.mp4",
    eligible,
  });
  return <video ref={playback.videoRef} data-muted={playback.muted} />;
}

describe("usePostVideoPlayback", () => {
  beforeEach(() => {
    enablePostVideoSound();
  });

  it("falls back to muted autoplay, restores sound after interaction, and pauses when inactive", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play")
      .mockRejectedValueOnce(new DOMException("blocked", "NotAllowedError"))
      .mockResolvedValue(undefined);
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);

    const { container, rerender } = render(<Harness />);
    const video = container.querySelector("video") as HTMLVideoElement;

    await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
    expect(video.muted).toBe(true);
    expect(video.dataset.muted).toBe("true");

    act(() => window.dispatchEvent(new PointerEvent("pointerdown")));
    await waitFor(() => expect(video.muted).toBe(false));
    expect(play).toHaveBeenCalledTimes(3);

    rerender(<Harness eligible={false} />);
    expect(pause).toHaveBeenCalled();
  });
});
