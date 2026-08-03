importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAsiXfRJfpT_CJjqHwXLJLyOnuCAtZDbDw",
  authDomain: "social-app-4d91f.firebaseapp.com",
  projectId: "social-app-4d91f",
  storageBucket: "social-app-4d91f.firebasestorage.app",
  messagingSenderId: "294570923858",
  appId: "1:294570923858:web:da82fe629f87b7aecacc8b",
});

const messaging = firebase.messaging();
const NOTIFICATION_NAVIGATE_MESSAGE = "SOCIAL_NOTIFICATION_NAVIGATE";

messaging.onBackgroundMessage((payload) => {
  // Firebase auto-displays notification payloads in the background. Manually
  // display data-only payloads so one event never creates two notifications.
  if (payload?.notification) return;

  const data = payload?.data || {};
  if (!data.url) return;

  const title = data.title || "Th\u00f4ng b\u00e1o m\u1edbi";
  return self.registration.showNotification(title, {
    body: data.body || "B\u1ea1n c\u00f3 m\u1ed9t th\u00f4ng b\u00e1o m\u1edbi.",
    icon: data.icon || "/favicon.ico",
    tag: data.notificationId,
    data,
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification?.data || {};
  const targetUrl = data.url || "/";
  const navigationMessage = {
    type: NOTIFICATION_NAVIGATE_MESSAGE,
    url: targetUrl,
    ...(data.notificationId ? { notificationId: data.notificationId } : {}),
  };

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (clientList) => {
      const existingClient = clientList.find((client) => client.visibilityState === "visible")
        || clientList[0];

      if (existingClient) {
        const focusedClient = "focus" in existingClient
          ? await existingClient.focus()
          : existingClient;
        (focusedClient || existingClient).postMessage(navigationMessage);
        return;
      }

      if (clients.openWindow) await clients.openWindow(targetUrl);
    }),
  );
});