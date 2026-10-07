import { Bell, Home, ImagePlus, Library, LogOut, MessageCircle, Search, Settings, User } from "lucide-react";
import type { ViewKey } from "../router/navigation.types";

const navItems: Array<{ id: ViewKey; label: string; icon: typeof Home }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "create", label: "Create", icon: ImagePlus },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "library", label: "Library", icon: Library },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const mobileNavItems = navItems.filter((item) => ["home", "search", "create", "notifications", "chat"].includes(item.id));

type UnreadNavigationProps = {
  chatUnreadCount: number;
  notificationUnreadCount: number;
};

function unreadCountFor(view: ViewKey, counts: UnreadNavigationProps) {
  if (view === "chat") return counts.chatUnreadCount;
  if (view === "notifications") return counts.notificationUnreadCount;
  return 0;
}

function unreadBadge(count: number) {
  return count > 0 ? <em className="nav-unread-badge">{count > 99 ? "99+" : count}</em> : null;
}

export function Navigation({ active, chatUnreadCount, notificationUnreadCount, onNavigate, onReloadHome, onLogout }: { active: ViewKey; onNavigate: (view: ViewKey) => void; onReloadHome: () => void; onLogout: () => void } & UnreadNavigationProps) {
  const counts = { chatUnreadCount, notificationUnreadCount };
  return <nav className="nav-rail" aria-label="Main navigation">
    <div className="nav-list">{navItems.map((item) => {
      const Icon = item.icon;
      const unreadCount = unreadCountFor(item.id, counts);
      const unreadLabel = unreadCount > 0 ? `, ${unreadCount} unread` : "";
      return <button key={item.id} className={active === item.id ? "nav-item active" : "nav-item"} onClick={item.id === "home" ? onReloadHome : () => onNavigate(item.id)} title={item.label} aria-label={`${item.label}${unreadLabel}`}>
        <i className="nav-icon-wrap"><Icon size={20} />{unreadBadge(unreadCount)}</i>
        <span>{item.label}</span>
      </button>;
    })}</div>
    <button className="nav-item compact logout-nav" onClick={onLogout} title="Logout" aria-label="Logout"><LogOut size={20} /></button>
  </nav>;
}

export function MobileNav({ active, chatUnreadCount, notificationUnreadCount, onNavigate }: { active: ViewKey; onNavigate: (view: ViewKey) => void } & UnreadNavigationProps) {
  const counts = { chatUnreadCount, notificationUnreadCount };
  return <nav className="mobile-nav" aria-label="Mobile navigation">{mobileNavItems.map((item) => {
    const Icon = item.icon;
    const unreadCount = unreadCountFor(item.id, counts);
    const unreadLabel = unreadCount > 0 ? `, ${unreadCount} unread` : "";
    return <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => onNavigate(item.id)} aria-current={active === item.id ? "page" : undefined} aria-label={`${item.label}${unreadLabel}`}><span className="mobile-nav-icon"><Icon size={22} strokeWidth={active === item.id ? 2.5 : 1.8} />{unreadBadge(unreadCount)}</span></button>;
  })}</nav>;
}

export function InlineError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="inline-error"><span>{message}</span><button onClick={onRetry}>Retry</button></div>;
}
