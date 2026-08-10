import { useEffect, useRef, useState } from "react";
import {
  disablePostVideoSound,
  enablePostVideoSound,
  getPostVideoSoundEnabled,
  reportAudibleAutoplayBlocked,
  subscribePostVideoSound,
} from "../model/postVideoPlaybackCoordinator";

export type PostVideoPlaybackOptions = {
  source: string;
  eligible: boolean;
};

export function usePostVideoPlayback({ source, eligible }: PostVideoPlaybackOptions) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const eligibleRef = useRef(eligible);
  const soundEnabledRef = useRef(getPostVideoSoundEnabled());
  const [soundEnabled, setSoundEnabled] = useState(getPostVideoSoundEnabled);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    eligibleRef.current = eligible;
  }, [eligible]);

  useEffect(() => subscribePostVideoSound((enabled) => {
    const wasEnabled = soundEnabledRef.current;
    soundEnabledRef.current = enabled;
    setSoundEnabled(enabled);
    const video = videoRef.current;
    if (!video) return;
    video.muted = !enabled;
    if (enabled && !wasEnabled && eligibleRef.current) {
      void video.play().catch(() => undefined);
    }
  }), []);

  useEffect(() => {
    if (soundEnabled) return;
    const activate = () => enablePostVideoSound();
    window.addEventListener("pointerdown", activate, { once: true, capture: true });
    window.addEventListener("keydown", activate, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", activate, true);
      window.removeEventListener("keydown", activate, true);
    };
  }, [soundEnabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !getPostVideoSoundEnabled();
    if (!eligible) {
      video.pause();
      setBuffering(false);
      return;
    }

    let cancelled = false;
    if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) setBuffering(true);
    void video.play().catch(async (error: unknown) => {
      if (cancelled || video.muted || !(error instanceof DOMException) || error.name !== "NotAllowedError") {
        setBuffering(false);
        return;
      }
      video.muted = true;
      reportAudibleAutoplayBlocked();
      try {
        await video.play();
      } catch {
        if (!cancelled) setBuffering(false);
      }
    });

    return () => {
      cancelled = true;
      video.pause();
    };
  }, [eligible, source]);

  return {
    videoRef,
    muted: !soundEnabled,
    buffering,
    setBuffering,
    toggleSound: () => soundEnabled ? disablePostVideoSound() : enablePostVideoSound(),
  };
}
