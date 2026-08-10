import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { enablePostVideoSound } from "../model/postVideoPlaybackCoordinator";
import { PostVideoPlayer } from "./PostVideoPlayer";

describe("PostVideoPlayer", () => {
  beforeEach(() => {
    enablePostVideoSound();
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
  });

  it("loops, exposes sound control, and reports buffering without blocking controls", () => {
    const { container } = render(
      <PostVideoPlayer
        source="https://cdn.example.test/video.mp4"
        eligible={false}
        preload="auto"
        controls
      />,
    );
    const video = container.querySelector("video") as HTMLVideoElement;

    expect(video.loop).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video.preload).toBe("auto");
    expect(video.controls).toBe(true);

    fireEvent.waiting(video);
    expect(screen.getByLabelText("Buffering video")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mute video" })).toBeEnabled();

    fireEvent.canPlay(video);
    expect(screen.queryByLabelText("Buffering video")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Mute video" }));
    expect(screen.getByRole("button", { name: "Unmute video" })).toBeInTheDocument();
  });
});
