import { Bell, Bookmark, Check, Heart, Lock, MessageCircle, MoreHorizontal, Play, Share2, Type, Users, WifiOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../../../shared/components";
import { formatRelativeTime } from "../../../shared/utils";
import { notificationApi } from "../api/notification.api";
import { refreshNotificationUnreadCount, setNotificationUnreadCount } from "../hooks/useNotificationUnreadCount";
import { notificationCategory, normalizedNotificationAction, notificationToViewItem } from "../model/notification.mapper";
import type { NotificationFilter, NotificationViewItem } from "../model/notification.types";
import { resolveNotificationRoute, type AppDestination } from "../core";

type Status = "loading" | "ready" | "error";

export function NotificationScreen({ userId, onNavigate }: {
  userId: string;
  onNavigate: (destination: AppDestination) => Promise<void> | void;
}) {
  const [filter, setFilter] = useState<NotificationFilter>("ALL");
  const [rows, setRows] = useState<NotificationViewItem[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const requestController = useRef<AbortController | null>(null);
  const requestVersion = useRef(0);
  const rowsRef = useRef<NotificationViewItem[]>([]);
  const filters: Array<{ id: NotificationFilter; label: string }> = [
    { id: "ALL", label: "Tất cả" },
    { id: "INTERACTIONS", label: "Tương tác" },
    { id: "CONNECTIONS", label: "Kết nối" },
    { id: "SYSTEM", label: "Hệ thống" },
  ];

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const load = useCallback(async (preserveRows = false) => {
    requestController.current?.abort();
    const controller = new AbortController();
    const version = ++requestVersion.current;
    const keepVisibleRows = preserveRows || rowsRef.current.length > 0;
    requestController.current = controller;
    if (!keepVisibleRows) {
      setRows([]);
      setStatus("loading");
    }
    setError("");
    try {
      const page = await notificationApi.list(userId, filter, 0, 50, controller.signal);
      if (controller.signal.aborted || version !== requestVersion.current) return;
      setRows((page.content ?? []).map(notificationToViewItem));
      setStatus("ready");
    } catch (reason) {
      if (controller.signal.aborted || version !== requestVersion.current) return;
      if (keepVisibleRows) {
        setStatus("ready");
        setError("Không thể làm mới thông báo. Dữ liệu đang hiển thị vẫn được giữ lại.");
      } else {
        setRows([]);
        setStatus("error");
        setError(reason instanceof Error ? reason.message : "Không thể tải thông báo");
      }
    }
  }, [filter, userId]);

  useEffect(() => { void load(false); }, [load]);
  useEffect(() => () => requestController.current?.abort(), []);
  useEffect(() => {
    const refresh = () => void load(true);
    window.addEventListener("notification-refresh", refresh);
    return () => window.removeEventListener("notification-refresh", refresh);
  }, [load]);

  async function markAll() {
    const previous = rows;
    setRows((current) => current.map((item) => ({ ...item, status: "READ" })));
    setError("");
    try {
      await notificationApi.markAllRead(userId);
      setNotificationUnreadCount(0);
    } catch {
      setRows(previous);
      setError("Không thể đánh dấu tất cả thông báo đã đọc. Vui lòng thử lại.");
    }
  }

  async function markRead(item: NotificationViewItem) {
    if (item.status === "READ") return;
    setRows((current) => current.map((row) => row.id === item.id ? { ...row, status: "READ" } : row));
    setError("");
    try {
      await notificationApi.markRead(item.id);
      refreshNotificationUnreadCount();
    } catch {
      setRows((current) => current.map((row) => row.id === item.id ? { ...row, status: item.status } : row));
      setError("Không thể đánh dấu thông báo đã đọc. Vui lòng thử lại.");
    }
  }

  function destinationFor(item: NotificationViewItem) {
    return resolveNotificationRoute({
      id: item.id,
      actionType: item.actionType,
      actorId: item.actorId,
      entityId: item.entityId,
      entityType: item.entityType,
      metadata: { ...(item.metadata ?? {}), ...(item.deepLink ? { deepLink: item.deepLink } : {}) },
    });
  }

  async function openNotification(item: NotificationViewItem) {
    await markRead(item);
    const destination = destinationFor(item);
    if (destination) await onNavigate(destination);
  }

  async function handleAction(item: NotificationViewItem) {
    if (item.actionLabel === "Theo dõi lại" && item.actorId) {
      await notificationApi.follow(userId, item.actorId);
      await markRead(item);
      return;
    }
    await openNotification(item);
  }

  const groups = notificationGroups(rows);
  return <section className="screen notifications-screen">
    <div className="notifications-header">
      <div><p className="eyebrow">Hoạt động</p><h2>Thông báo</h2></div>
      <button onClick={() => void markAll()} disabled={!rows.some((item) => item.status === "UNREAD")}><Check size={18} /> Đánh dấu đã đọc</button>
    </div>
    <div className="notification-filters" role="tablist" aria-label="Bộ lọc thông báo">
      {filters.map((item) => <button key={item.id} className={filter === item.id ? "active" : ""} onClick={() => setFilter(item.id)} role="tab" aria-selected={filter === item.id}>{item.label}</button>)}
    </div>
    {status === "loading" && rows.length === 0 && <NotificationSkeleton />}
    {status === "error" && <div className="notification-state"><WifiOff size={24} /><strong>Không thể tải</strong><span>{error}</span><button onClick={() => void load(false)}>Thử lại</button></div>}
    {status === "ready" && error && <div className="notification-refresh-error" role="alert">{error}<button onClick={() => void load(true)}>Thử lại</button></div>}
    {status === "ready" && rows.length === 0 && <div className="notification-state"><Bell size={24} /><strong>Chưa có thông báo</strong><span>Hoạt động mới sẽ xuất hiện tại đây.</span><button onClick={() => void load()}>Làm mới</button></div>}
    {status === "ready" && rows.length > 0 && <div className="notification-list">{groups.map((group) => group.items.length > 0 && <section key={group.title} className="notification-group"><h3>{group.title}</h3>{group.items.map((item) => <article key={item.id} className={`notification-row ${item.status === "UNREAD" ? "unread" : "read"} ${!item.entityAvailable ? "removed" : ""}`}>
      <div className="notification-avatar"><Avatar src={item.actorAvatarUrl} name={item.actor} alt={item.actor} /></div>
      <button className="notification-copy" onClick={() => void openNotification(item)}><span>{item.content || <><strong>{item.actor}</strong> {item.message}</>}</span><time>{formatRelativeTime(item.createdAt)}</time>{!item.entityAvailable && <em>Nội dung nguồn không còn tồn tại</em>}</button>
      {item.contentThumbnailUrl && item.entityAvailable ? <button className="notification-thumbnail-button" onClick={() => void openNotification(item)} aria-label="Mở nội dung"><img className="notification-thumbnail" src={item.contentThumbnailUrl} alt="" /></button> : <span className="notification-thumbnail empty"><NotificationGlyph item={item} /></span>}
      {item.actionLabel && <button className="notification-action" onClick={() => void handleAction(item)}>{item.actionLabel}</button>}
      <button className="icon-button notification-more" aria-label="Tùy chọn thông báo"><MoreHorizontal size={18} /></button>
    </article>)}</section>)}</div>}
  </section>;
}

function NotificationGlyph({ item }: { item: NotificationViewItem }) {
  const action = normalizedNotificationAction(item.actionType);
  if (notificationCategory(action) === "SYSTEM") return <Lock size={18} />;
  if (action.includes("FOLLOW") || action.includes("FRIEND")) return <Users size={18} />;
  if (action.includes("COMMENT") || action.includes("REPLY") || action.includes("MESSAGE")) return <MessageCircle size={18} />;
  if (action.includes("MENTION")) return <Type size={18} />;
  if (action.includes("TAG")) return <Bookmark size={18} />;
  if (action.includes("STORY")) return <Play size={18} />;
  if (action.includes("SHARED")) return <Share2 size={18} />;
  return <Heart size={18} />;
}

function notificationGroups(items: NotificationViewItem[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const week = today - 6 * 24 * 60 * 60 * 1000;
  return [
    { title: "Hôm nay", items: items.filter((item) => new Date(item.createdAt).getTime() >= today) },
    { title: "Tuần này", items: items.filter((item) => { const time = new Date(item.createdAt).getTime(); return time < today && time >= week; }) },
    { title: "Trước đó", items: items.filter((item) => new Date(item.createdAt).getTime() < week) },
  ];
}

function NotificationSkeleton() {
  return <div className="notification-list loading" aria-label="Đang tải thông báo">{Array.from({ length: 8 }, (_, index) => <div key={index} className="notification-row skeleton"><span /><div><i /><i /></div><b /></div>)}</div>;
}
