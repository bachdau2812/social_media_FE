import { useEffect, useState } from "react";
import type { ConversationType } from "../model/chat.dto";
import { chatApi } from "../api/chat.api";
import "../styles/messaging-advanced.css";

type Presence = { online: boolean; lastActiveAt: string | null };
type PresenceView = { actorId: string; key: string; state: "loading" | "ready" | "error"; presence?: Presence };

function formatLastActive(value: string | null) {
  if (!value) return "Ngoại tuyến";
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return "Ngoại tuyến";
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60_000));
  if (minutes === 0) return "Hoạt động vừa xong";
  if (minutes < 60) return `Hoạt động ${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hoạt động ${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Hoạt động ${days} ngày trước`;
  return `Hoạt động ngày ${new Date(timestamp).toLocaleDateString("vi-VN")}`;
}

export function ChatPresenceStatus({ actorId, conversationId, conversationType }: {
  actorId: string;
  conversationId: string;
  conversationType: ConversationType;
}) {
  const key = `${actorId}/${conversationId}`;
  const [view, setView] = useState<PresenceView | null>(null);

  useEffect(() => {
    if (conversationType !== "DIRECT") return;
    const controller = new AbortController();
    let mounted = true;
    let refreshing = false;
    let peerId = "";
    let timer = 0;

    const refresh = async () => {
      if (!peerId || refreshing || document.visibilityState !== "visible") return;
      refreshing = true;
      try {
        const presence = await chatApi.presence(peerId, controller.signal);
        if (mounted) setView({ actorId, key, state: "ready", presence });
      } catch {
        if (mounted && !controller.signal.aborted) setView((current) => current?.actorId === actorId && current.state === "ready"
          ? current
          : { actorId, key, state: "error" });
      } finally {
        refreshing = false;
      }
    };
    const refreshWhenVisible = () => { if (document.visibilityState === "visible") void refresh(); };

    setView((current) => current?.actorId === actorId && current.state === "ready"
      ? current
      : { actorId, key, state: "loading" });
    void chatApi.details(conversationId, actorId, controller.signal)
      .then((details) => {
        if (!mounted) return;
        peerId = details.members.find((member) => member.userId !== actorId)?.userId ?? "";
        if (!peerId) {
          setView((current) => current?.actorId === actorId && current.state === "ready"
            ? current
            : { actorId, key, state: "error" });
          return;
        }
        void refresh();
        timer = window.setInterval(() => void refresh(), 30_000);
        document.addEventListener("visibilitychange", refreshWhenVisible);
      })
      .catch(() => {
        if (mounted && !controller.signal.aborted) setView((current) => current?.actorId === actorId && current.state === "ready"
          ? current
          : { actorId, key, state: "error" });
      });

    return () => {
      mounted = false;
      controller.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [actorId, conversationId, conversationType, key]);

  if (conversationType !== "DIRECT") return null;
  const current = view?.actorId === actorId && (view.state === "ready" || view.key === key) ? view : null;
  if (!current || current.state === "loading") return <small>Cuộc trò chuyện</small>;
  const online = current?.state === "ready" && current.presence?.online === true;
  const label = current.state === "error"
    ? "Không thể tải trạng thái hoạt động"
    : current.state === "ready" && current.presence
      ? online ? "Đang hoạt động" : formatLastActive(current.presence.lastActiveAt)
      : "Ngoại tuyến";

  return <small className={`chat-presence-status ${online ? "online" : "offline"}`} aria-live="polite">
    <i aria-hidden="true" />{label}
  </small>;
}
