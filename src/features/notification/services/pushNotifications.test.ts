import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const firebaseMocks = vi.hoisted(() => ({
  apiSend: vi.fn(),
  getApp: vi.fn(() => ({ name: "app" })),
  getApps: vi.fn(() => [{ name: "app" }]),
  getMessaging: vi.fn(() => ({ name: "messaging" })),
  getToken: vi.fn(async () => "device-token"),
  initializeApp: vi.fn(() => ({ name: "app" })),
  isSupported: vi.fn(async () => true),
  onMessage: vi.fn(),
}));

vi.mock("firebase/app", () => ({
  getApp: firebaseMocks.getApp,
  getApps: firebaseMocks.getApps,
  initializeApp: firebaseMocks.initializeApp,
}));

vi.mock("firebase/messaging", () => ({
  getMessaging: firebaseMocks.getMessaging,
  getToken: firebaseMocks.getToken,
  isSupported: firebaseMocks.isSupported,
  onMessage: firebaseMocks.onMessage,
}));

vi.mock("../../../shared/api", () => ({ apiSend: firebaseMocks.apiSend }));

import { syncGrantedPushRegistration } from "./pushNotifications";

describe("syncGrantedPushRegistration", () => {
  const registration = { showNotification: vi.fn() };
  const register = vi.fn(async () => registration);
  const requestPermission = vi.fn(async () => "granted" as NotificationPermission);

  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    vi.stubEnv("VITE_FIREBASE_VAPID_KEY", "public-vapid-key");
    vi.stubGlobal("Notification", { permission: "granted", requestPermission });
    vi.stubGlobal("navigator", {
      serviceWorker: { register, ready: Promise.resolve(registration) },
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("registers the current device without prompting again when permission is already granted", async () => {
    await expect(syncGrantedPushRegistration("user-1")).resolves.toBe(true);

    expect(requestPermission).not.toHaveBeenCalled();
    expect(register).toHaveBeenCalledWith("/firebase-messaging-sw.js", { scope: "/" });
    expect(firebaseMocks.getToken).toHaveBeenCalledWith(
      { name: "messaging" },
      { serviceWorkerRegistration: registration, vapidKey: "public-vapid-key" },
    );
    expect(firebaseMocks.apiSend).toHaveBeenCalledWith("/notifications/push-tokens", "POST", {
      userId: "user-1",
      deviceId: expect.any(String),
      deviceToken: "device-token",
    });
  });

  it("uses Firebase's default Web Push key when no custom VAPID key is configured", async () => {
    vi.stubEnv("VITE_FIREBASE_VAPID_KEY", "");

    await expect(syncGrantedPushRegistration("user-1")).resolves.toBe(true);

    expect(firebaseMocks.getToken).toHaveBeenCalledWith(
      { name: "messaging" },
      { serviceWorkerRegistration: registration },
    );
    expect(firebaseMocks.apiSend).toHaveBeenCalledWith("/notifications/push-tokens", "POST", {
      userId: "user-1",
      deviceId: expect.any(String),
      deviceToken: "device-token",
    });
  });

  it("does nothing and never prompts when permission has not been granted", async () => {
    vi.stubGlobal("Notification", { permission: "default", requestPermission });

    await expect(syncGrantedPushRegistration("user-1")).resolves.toBe(false);

    expect(requestPermission).not.toHaveBeenCalled();
    expect(register).not.toHaveBeenCalled();
    expect(firebaseMocks.getToken).not.toHaveBeenCalled();
    expect(firebaseMocks.apiSend).not.toHaveBeenCalled();
  });
});
