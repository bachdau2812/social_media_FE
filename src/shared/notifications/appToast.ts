export const APP_TOAST_EVENT = "app-toast";
export const LEGACY_SHARED_APP_TOAST_EVENT = "shared-app-toast";

export function emitAppToast(message: string) {
  const normalizedMessage = message.trim();
  if (!normalizedMessage) return;
  window.dispatchEvent(new CustomEvent(APP_TOAST_EVENT, { detail: normalizedMessage }));
}
