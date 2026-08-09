import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage, type MessagePayload, type Unsubscribe } from "firebase/messaging";
import { apiSend } from "../../../shared/api";
import {
  createForegroundNotificationGate,
  normalizeForegroundPushPayload,
  type AppDestination,
  type ForegroundPushNotification,
  type ForegroundSuppressionReason,
} from "../core";

const firebaseConfig = {
  apiKey: "AIzaSyAsiXfRJfpT_CJjqHwXLJLyOnuCAtZDbDw",
  authDomain: "social-app-4d91f.firebaseapp.com",
  projectId: "social-app-4d91f",
  storageBucket: "social-app-4d91f.firebasestorage.app",
  messagingSenderId: "294570923858",
  appId: "1:294570923858:web:da82fe629f87b7aecacc8b",
};

const DEVICE_ID_KEY = "social-media-push-device-id";
let foregroundMessageUnsubscribe: Unsubscribe | null = null;
let foregroundStartPromise: Promise<void> | null = null;
let foregroundGate = createForegroundNotificationGate();

export interface ForegroundPushOptions {
  getActiveDestination?: () => AppDestination | null;
  shouldSuppress?: (
    notification: ForegroundPushNotification,
    activeDestination: AppDestination | null,
  ) => boolean | Promise<boolean>;
  onReceived?: (notification: ForegroundPushNotification) => void;
  onSuppressed?: (
    notification: ForegroundPushNotification,
    reason: ForegroundSuppressionReason,
  ) => void;
  onDisplayed?: (notification: ForegroundPushNotification) => void;
  onDisplayError?: (error: unknown, notification: ForegroundPushNotification) => void;
}

let foregroundOptions: ForegroundPushOptions = {};

function getDeviceId() {
  const existing = window.localStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;
  const generated = crypto.randomUUID();
  window.localStorage.setItem(DEVICE_ID_KEY, generated);
  return generated;
}

export function currentNotificationPermission(): NotificationPermission | "unsupported" {
  return typeof window === "undefined" || !("Notification" in window) || !("serviceWorker" in navigator)
    ? "unsupported"
    : Notification.permission;
}

async function registerPushDevice(userId: string) {
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY?.trim();
  const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", { scope: "/" });
  await navigator.serviceWorker.ready;
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const tokenOptions = vapidKey
    ? { serviceWorkerRegistration: registration, vapidKey }
    : { serviceWorkerRegistration: registration };
  const deviceToken = await getToken(messaging, tokenOptions);
  if (!deviceToken) throw new Error("Firebase did not return a messaging token.");
  await apiSend("/notifications/push-tokens", "POST", { userId, deviceId: getDeviceId(), deviceToken });
  return deviceToken;
}

export async function requestAndRegisterPushNotifications(userId: string) {
  if (currentNotificationPermission() === "unsupported" || !(await isSupported())) {
    throw new Error("Push notifications are not supported by this browser.");
  }
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error(permission === "denied" ? "Notification permission was blocked in browser settings." : "Notification permission was not granted.");
  }
  return registerPushDevice(userId);
}

export async function syncGrantedPushRegistration(userId: string): Promise<boolean> {
  if (currentNotificationPermission() !== "granted" || !(await isSupported())) return false;
  await registerPushDevice(userId);
  return true;
}

async function handleForegroundMessage(payload: MessagePayload) {
  if (Notification.permission !== "granted") return;

  const notification = normalizeForegroundPushPayload(payload);
  const options = foregroundOptions;
  const activeDestination = options.getActiveDestination?.() ?? null;
  options.onReceived?.(notification);

  const gateResult = foregroundGate.evaluate(notification, activeDestination);
  if (!gateResult.display) {
    options.onSuppressed?.(notification, gateResult.reason);
    return;
  }

  if (await options.shouldSuppress?.(notification, activeDestination)) {
    options.onSuppressed?.(notification, "custom");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(notification.title, {
      body: notification.body,
      icon: notification.icon,
      tag: notification.notificationId,
      data: {
        ...notification.data,
        ...(notification.url ? { url: notification.url } : {}),
        ...(notification.notificationId ? { notificationId: notification.notificationId } : {}),
      },
    });
    options.onDisplayed?.(notification);
  } catch (error) {
    options.onDisplayError?.(error, notification);
  }
}

export function startForegroundPushNotifications(options: ForegroundPushOptions = {}) {
  foregroundOptions = options;
  if (foregroundMessageUnsubscribe) return Promise.resolve();
  if (foregroundStartPromise) return foregroundStartPromise;

  foregroundStartPromise = (async () => {
    if (currentNotificationPermission() !== "granted" || !(await isSupported())) return;
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    foregroundMessageUnsubscribe = onMessage(messaging, (payload) => {
      void handleForegroundMessage(payload);
    });
  })().finally(() => {
    foregroundStartPromise = null;
  });

  return foregroundStartPromise;
}

export function stopForegroundPushNotifications() {
  foregroundMessageUnsubscribe?.();
  foregroundMessageUnsubscribe = null;
  foregroundStartPromise = null;
  foregroundOptions = {};
  foregroundGate = createForegroundNotificationGate();
}
