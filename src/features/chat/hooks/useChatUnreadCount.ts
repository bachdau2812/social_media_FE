import { useEffect, useState } from "react";
import { chatApi } from "../api/chat.api";
import { chatRealtime } from "../services/chatRealtime";

export function useChatUnreadCount(userId?: string | null) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) {
      setCount(0);
      return;
    }
    let disposed = false;
    void chatApi.conversations(userId, 100)
      .then((page) => {
        if (!disposed) setCount((page.items ?? []).reduce((sum, item) => sum + (item.unreadCount ?? 0), 0));
      })
      .catch(() => undefined);

    const unsubscribe = chatRealtime.subscribe(userId, (event) => {
      if (event.type === "MESSAGE_CREATED" && event.message?.senderId !== userId) {
        setCount((current) => current + 1);
      }
    });
    const synchronize = (event: Event) => {
      const next = Number((event as CustomEvent<number>).detail);
      if (Number.isFinite(next)) setCount(Math.max(0, next));
    };
    window.addEventListener("chat-unread-count", synchronize);
    return () => {
      disposed = true;
      unsubscribe();
      window.removeEventListener("chat-unread-count", synchronize);
    };
  }, [userId]);

  return count;
}
