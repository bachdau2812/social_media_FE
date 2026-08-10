import { Volume2, VolumeX } from "lucide-react";
import type { CSSProperties } from "react";
import { usePostVideoPlayback } from "../hooks/usePostVideoPlayback";

export type PostVideoPlayerProps = {
  source: string;
  eligible: boolean;
  preload?: "none" | "metadata" | "auto";
  controls?: boolean;
  className?: string;
  style?: CSSProperties;
  onLoadedMetadata?: (video: HTMLVideoElement) => void;
};

export function PostVideoPlayer({
  source,
  eligible,
  preload = "metadata",
  controls = false,
  className = "",
  style,
  onLoadedMetadata,
}: PostVideoPlayerProps) {
  const playback = usePostVideoPlayback({ source, eligible });

  return <span className={`post-video-player ${className}`.trim()}>
    <video
      ref={playback.videoRef}
      src={source}
      muted={playback.muted}
      loop
      playsInline
      controls={controls}
      preload={preload}
      style={style}
      onWaiting={() => playback.setBuffering(true)}
      onCanPlay={() => playback.setBuffering(false)}
      onPlaying={() => playback.setBuffering(false)}
      onError={() => playback.setBuffering(false)}
      onLoadedMetadata={(event) => onLoadedMetadata?.(event.currentTarget)}
    />
    {playback.buffering && <span className="post-video-buffering" aria-label="Buffering video" />}
    <button
      type="button"
      className="post-video-sound"
      aria-label={playback.muted ? "Unmute video" : "Mute video"}
      aria-pressed={playback.muted}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        playback.toggleSound();
      }}
    >
      {playback.muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
    </button>
  </span>;
}
