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
    setCount(0);
    const controller = new AbortController();
    let disposed = false;
    let eventVersion = 0;
    let requestVersion = 0;
    const refresh = async () => {
      const request = ++requestVersion;
      const versionAtStart = eventVersion;
      let total = 0;
      let cursor: string | undefined;
      const seenCursors = new Set<string>();
      try {
        while (!disposed && !controller.signal.aborted) {
          const page = await chatApi.conversations(userId, cursor, 100, controller.signal);
          total += (page.items ?? []).reduce((sum, item) => sum + (item.unreadCount ?? 0), 0);
          const nextCursor = page.nextCursor || undefined;
          if (!page.hasMore || !nextCursor || seenCursors.has(nextCursor)) break;
          seenCursors.add(nextCursor);
          cursor = nextCursor;
        }
        if (disposed || controller.signal.aborted || request !== requestVersion) return;
        if (versionAtStart !== eventVersion) { queueMicrotask(() => void refresh()); return; }
        setCount(total);
      } catch {
        // Keep the last confirmed badge while offline or while a page is unavailable.
      }
    };
    void refresh();

    const unsubscribe = chatRealtime.subscribe(userId, (event) => {
      if (event.type === "MESSAGE_CREATED" && event.message?.senderId !== userId) {
        eventVersion += 1;
        setCount((current) => current + 1);
      } else if (event.type === "CURSOR_UPDATED" && event.actorId === userId) {
        eventVersion += 1;
        void refresh();
      } else if (["GROUP_CREATED", "MEMBER_ADDED", "MEMBER_REMOVED"].includes(event.type)
        && (event.type === "GROUP_CREATED" || event.targetUserId === userId)) {
        eventVersion += 1;
        void refresh();
      }
    });
    const synchronize = (event: Event) => {
      const next = Number((event as CustomEvent<number>).detail);
      if (Number.isFinite(next)) { eventVersion += 1; setCount(Math.max(0, next)); }
    };
    window.addEventListener("chat-unread-count", synchronize);
    return () => {
      disposed = true;
      requestVersion += 1;
      controller.abort();
      unsubscribe();
      window.removeEventListener("chat-unread-count", synchronize);
    };
  }, [userId]);

  return count;
}
