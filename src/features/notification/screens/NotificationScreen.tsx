import { Bell, Bookmark, Check, Heart, Lock, MessageCircle, MoreHorizontal, Play, Share2, Type, Users, WifiOff } from "lucide-react";

import { Avatar } from "../../../shared/components";
import { formatRelativeTime } from "../../../shared/utils";
import { useNotificationInbox } from "../hooks/useNotificationInbox";

import { notificationCategory, normalizedNotificationAction } from "../model/notification.mapper";
import type { NotificationFilter, NotificationViewItem } from "../model/notification.types";
import type { AppDestination } from "../core";



export function NotificationScreen({ userId, onNavigate }: {
  userId: string;
  onNavigate: (destination: AppDestination) => Promise<void> | void;
}) {
  const { filter, setFilter, rows, status, error, load, markAll, openNotification, handleAction } =
    useNotificationInbox(userId, onNavigate);
  const filters: Array<{ id: NotificationFilter; label: string }> = [
    { id: "ALL", label: "Tất cả" },
    { id: "INTERACTIONS", label: "Tương tác" },
    { id: "CONNECTIONS", label: "Kết nối" },
    { id: "SYSTEM", label: "Hệ thống" },
  ];


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
