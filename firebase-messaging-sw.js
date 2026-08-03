/*
 * Firebase Messaging Service Worker
 *
 * Đặt file này cùng thư mục với media-api-tester-fixed-sse-push.html.
 * Sau đó thay firebaseConfig bên dưới bằng config thật trong Firebase Console.
 */

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

const firebaseConfig = {
  "apiKey": "AIzaSyAsiXfRJfpT_CJjqHwXLJLyOnuCAtZDbDw",
  "authDomain": "social-app-4d91f.firebaseapp.com",
  "projectId": "social-app-4d91f",
  "storageBucket": "social-app-4d91f.firebasestorage.app",
  "messagingSenderId": "294570923858",
  "appId": "1:294570923858:web:da82fe629f87b7aecacc8b"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message received:", payload);

  const notificationTitle = payload?.notification?.title || "Thông báo mới";

  const notificationOptions = {
    body: payload?.notification?.body || "Bạn có một thông báo mới.",
    icon: payload?.notification?.icon || "/favicon.ico",
    data: payload?.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    event.notification?.data?.url ||
    event.notification?.data?.link ||
    "/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});