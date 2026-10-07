import { describe, expect, it } from "vitest";
import { normalizeForegroundPushPayload } from "./pushPayload";

describe("normalizeForegroundPushPayload", () => {
  it.each(["data", "notification"] as const)("preserves group title and message body from %s fields", (source) => {
    const title = "Nhóm dự án";
    const body = 'An đã gửi một tin nhắn: "Xin chào"';
    const payload = { title, body };
    const notification = normalizeForegroundPushPayload({
      ...(source === "notification" ? { notification: payload } : {}),
      data: {
        ...(source === "data" ? payload : {}),
        url: "/messages?conversationId=group-1&messageId=message-1&messageSeq=7",
      },
    });

    expect(notification.title).toBe(title);
    expect(notification.body).toBe(body);
    expect(notification.destination).toEqual({
      kind: "conversation", conversationId: "group-1", messageId: "message-1", messageSeq: 7,
    });
  });

  it("normalizes a canonical data-only payload", () => {
    const notification = normalizeForegroundPushPayload({
      data: {
        notificationId: "notification-1",
        title: "Tin nhắn mới",
        body: "An đã gửi cho bạn một tin nhắn",
        icon: "/avatar.png",
        url: "/?notificationTarget=conversation&conversationId=conversation-1&messageId=message-2",
      },
    });

    expect(notification).toEqual({
      notificationId: "notification-1",
      title: "Tin nhắn mới",
      body: "An đã gửi cho bạn một tin nhắn",
      icon: "/avatar.png",
      url: "/?notificationTarget=conversation&conversationId=conversation-1&messageId=message-2",
      destination: {
        kind: "conversation",
        conversationId: "conversation-1",
        messageId: "message-2",
      },
      data: {
        notificationId: "notification-1",
        title: "Tin nhắn mới",
        body: "An đã gửi cho bạn một tin nhắn",
        icon: "/avatar.png",
        url: "/?notificationTarget=conversation&conversationId=conversation-1&messageId=message-2",
      },
    });
  });

  it("uses Firebase notification fields as display fallbacks", () => {
    const notification = normalizeForegroundPushPayload({
      notification: {
        title: "Thông báo mới",
        body: "Bạn có một thông báo mới.",
        icon: "/favicon.ico",
      },
      data: {},
    });

    expect(notification.title).toBe("Thông báo mới");
    expect(notification.body).toBe("Bạn có một thông báo mới.");
    expect(notification.icon).toBe("/favicon.ico");
    expect(notification.destination).toBeNull();
  });

  it("does not treat a noncanonical URL as a destination", () => {
    const notification = normalizeForegroundPushPayload({
      data: { url: "/messages/conversation-1" },
    });

    expect(notification.url).toBe("/messages/conversation-1");
    expect(notification.destination).toBeNull();
  });
});
