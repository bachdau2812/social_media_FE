import { useCallback, useEffect, useRef, useState } from "react";
import { notificationApi } from "../api/notification.api";
import { refreshNotificationUnreadCount, setNotificationUnreadCount } from "./useNotificationUnreadCount";
import { notificationToViewItem } from "../model/notification.mapper";
import type { NotificationFilter, NotificationViewItem } from "../model/notification.types";
import { resolveNotificationRoute, type AppDestination } from "../core";

type InboxStatus = "loading" | "ready" | "error";
type InboxState = { userId: string; rows: NotificationViewItem[] };

export function useNotificationInbox(
  userId: string,
  onNavigate: (destination: AppDestination) => Promise<void> | void,
) {
  const [filter, setFilter] = useState<NotificationFilter>("ALL");
  const [inbox, setInbox] = useState<InboxState>(() => ({ userId, rows: [] }));
  const [status, setStatus] = useState<InboxStatus>("loading");
  const [error, setError] = useState("");
  const requestController = useRef<AbortController | null>(null);
  const requestVersion = useRef(0);
  const inboxRef = useRef(inbox);
  const rows = inbox.userId === userId ? inbox.rows : [];

  const replaceRows = useCallback((nextRows: NotificationViewItem[]) => {
    const nextInbox = { userId, rows: nextRows };
    inboxRef.current = nextInbox;
    setInbox(nextInbox);
  }, [userId]);
  const updateRows = useCallback((update: (current: NotificationViewItem[]) => NotificationViewItem[]) => {
    if (inboxRef.current.userId !== userId) return;
    const current = inboxRef.current.rows;
    replaceRows(update(current));
  }, [replaceRows, userId]);

  const load = useCallback(async (preserveRows = false) => {
    requestController.current?.abort();
    const controller = new AbortController();
    const version = ++requestVersion.current;
    const sameAccount = inboxRef.current.userId === userId;
    const keepVisibleRows = sameAccount && (preserveRows || inboxRef.current.rows.length > 0);
    requestController.current = controller;
    if (!keepVisibleRows) {
      replaceRows([]);
      setStatus("loading");
    }
    setError("");
    try {
      const page = await notificationApi.list(userId, filter, 0, 50, controller.signal);
      if (controller.signal.aborted || version !== requestVersion.current) return;
      replaceRows((page.content ?? []).map(notificationToViewItem));
      setStatus("ready");
    } catch (reason) {
      if (controller.signal.aborted || version !== requestVersion.current) return;
      if (keepVisibleRows) {
        setStatus("ready");
        setError("Không thể làm mới thông báo. Dữ liệu đang hiển thị vẫn được giữ lại.");
      } else {
        replaceRows([]);
        setStatus("error");
        setError(reason instanceof Error ? reason.message : "KhÃ´ng thá»ƒ táº£i thÃ´ng bÃ¡o");
      }
    }
  }, [filter, replaceRows, userId]);

  useEffect(() => { void load(false); }, [load]);
  useEffect(() => () => requestController.current?.abort(), []);
  useEffect(() => {
    const refresh = () => void load(true);
    window.addEventListener("notification-refresh", refresh);
    return () => window.removeEventListener("notification-refresh", refresh);
  }, [load]);

  const markAll = useCallback(async () => {
    const previous = inboxRef.current.userId === userId ? inboxRef.current.rows : [];
    updateRows((current) => current.map((item) => ({ ...item, status: "READ" })));
    setError("");
    try {
      await notificationApi.markAllRead(userId);
      setNotificationUnreadCount(0);
    } catch {
      if (inboxRef.current.userId !== userId) return;
      replaceRows(previous);
      setError("Không thể đánh dấu tất cả thông báo đã đọc. Vui lòng thử lại.");
    }
  }, [replaceRows, updateRows, userId]);

  const markRead = useCallback(async (item: NotificationViewItem) => {
    if (item.status === "READ") return;
    updateRows((current) => current.map((row) => row.id === item.id ? { ...row, status: "READ" } : row));
    setError("");
    try {
      await notificationApi.markRead(item.id);
      refreshNotificationUnreadCount();
    } catch {
      if (inboxRef.current.userId !== userId) return;
      updateRows((current) => current.map((row) => row.id === item.id ? { ...row, status: item.status } : row));
      setError("Không thể đánh dấu thông báo đã đọc. Vui lòng thử lại.");
    }
  }, [updateRows, userId]);

  const destinationFor = useCallback((item: NotificationViewItem) => resolveNotificationRoute({
    id: item.id,
    actionType: item.actionType,
    actorId: item.actorId,
    entityId: item.entityId,
    entityType: item.entityType,
    metadata: { ...(item.metadata ?? {}), ...(item.deepLink ? { deepLink: item.deepLink } : {}) },
  }), []);

  const openNotification = useCallback(async (item: NotificationViewItem) => {
    await markRead(item);
    const destination = destinationFor(item);
    if (destination) await onNavigate(destination);
  }, [destinationFor, markRead, onNavigate]);

  const handleAction = useCallback(async (item: NotificationViewItem) => {
    if (item.actionLabel === "Theo dÃµi láº¡i" && item.actorId) {
      await notificationApi.follow(userId, item.actorId);
      await markRead(item);
      return;
    }
    await openNotification(item);
  }, [markRead, openNotification, userId]);

  return {
    filter,
    setFilter,
    rows,
    status: inbox.userId === userId ? status : "loading",
    error,
    load,
    markAll,
    openNotification,
    handleAction,
  };
}
