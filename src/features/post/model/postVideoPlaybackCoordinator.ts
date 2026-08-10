let soundEnabled = true;
const listeners = new Set<(enabled: boolean) => void>();

export function getPostVideoSoundEnabled() {
  return soundEnabled;
}

export function subscribePostVideoSound(listener: (enabled: boolean) => void) {
  listeners.add(listener);
  listener(soundEnabled);
  return () => {
    listeners.delete(listener);
  };
}

function setSoundEnabled(value: boolean) {
  if (soundEnabled === value) return;
  soundEnabled = value;
  listeners.forEach((listener) => listener(value));
}

export function reportAudibleAutoplayBlocked() {
  setSoundEnabled(false);
}

export function enablePostVideoSound() {
  setSoundEnabled(true);
}

export function disablePostVideoSound() {
  setSoundEnabled(false);
}
