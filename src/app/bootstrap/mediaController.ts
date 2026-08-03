export function installPageVisibilityMediaController() {
  const resumeWhenVisible = new Set<HTMLMediaElement>();
  const shouldSuspend = () => document.hidden || !document.hasFocus() || !navigator.onLine;

  function suspend(media: HTMLMediaElement) {
    if (!media.paused && !media.ended) resumeWhenVisible.add(media);
    media.pause();
  }

  function synchronize() {
    if (shouldSuspend()) {
      document.querySelectorAll<HTMLMediaElement>("audio, video").forEach(suspend);
      return;
    }
    const resumable = [...resumeWhenVisible];
    resumeWhenVisible.clear();
    resumable.forEach((media) => {
      if (document.contains(media) && !media.ended) void media.play().catch(() => undefined);
    });
  }

  function blockPlaybackWhileSuspended(event: Event) {
    if (!shouldSuspend() || !(event.target instanceof HTMLMediaElement)) return;
    resumeWhenVisible.add(event.target);
    event.target.pause();
  }

  document.addEventListener("visibilitychange", synchronize);
  document.addEventListener("play", blockPlaybackWhileSuspended, true);
  window.addEventListener("blur", synchronize);
  window.addEventListener("focus", synchronize);
  window.addEventListener("online", synchronize);
  window.addEventListener("offline", synchronize);
  if (shouldSuspend()) synchronize();

  return () => {
    document.removeEventListener("visibilitychange", synchronize);
    document.removeEventListener("play", blockPlaybackWhileSuspended, true);
    window.removeEventListener("blur", synchronize);
    window.removeEventListener("focus", synchronize);
    window.removeEventListener("online", synchronize);
    window.removeEventListener("offline", synchronize);
    resumeWhenVisible.clear();
  };
}
