import { Bell, ChevronLeft, Eye, Film, Languages, MessageCircle, Moon, Shield, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nextScreenState, useScreenLocation } from "../../../app/router/ScreenLocation";
import { useLocale } from "../../../app/providers/LocaleProvider";
import { useTheme, type AppTheme } from "../../../app/providers/ThemeProvider";
import { NotificationPermissionControl } from "../../notification";
import { ApiError } from "../../../shared/api";
import { settingsApi } from "../api/settings.api";
import type { SettingsSectionId, UserSettings } from "../model/settings.types";
import { ChoiceRow, SettingsGroup, ToggleRow } from "../sections/SettingsControls";
import "./settings-screen.css";
import "./settings-mobile-first.css";

type SaveSession = { userId: string; latest: UserSettings | null; pending: UserSettings | null; saving: boolean; attached: boolean };

const sections: Array<{ id: SettingsSectionId; label: string; icon: typeof Sun }> = [
  { id: "appearance", label: "Ngôn ngữ và giao diện", icon: Languages },
  { id: "privacy", label: "Trang cá nhân và quyền riêng tư", icon: Shield },
  { id: "posts", label: "Bài viết", icon: Film },
  { id: "feed", label: "Bảng tin và nội dung", icon: Eye },
  { id: "messages", label: "Tin nhắn", icon: MessageCircle },
  { id: "notifications", label: "Thông báo", icon: Bell },
];

export function SettingsScreen({ userId, headerOwnedByShell = false }: { userId: string; headerOwnedByShell?: boolean }) {
  const location = useScreenLocation();
  const navigate = useNavigate();
  function go(path: string) {
    if (path !== location.pathname) navigate(path, { state: { ...nextScreenState(location), settingsCategoryOrigin: location.pathname === "/settings" } });
  }
  const section = sections.find((item) => location.pathname === `/settings/${item.id}`);
  const active: SettingsSectionId = section?.id ?? "appearance";
  const detailOpen = Boolean(section);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "error">("loading");
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const viewerRef = useRef(userId);
  viewerRef.current = userId;
  const writesRef = useRef<SaveSession>({ userId, latest: null, pending: null, saving: false, attached: true });
  const sessionRef = useRef(0);
  const rangeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const load = useCallback(async () => {
    const session = ++sessionRef.current;
    const writes: SaveSession = { userId, latest: null, pending: null, saving: false, attached: true };
    writesRef.current = writes;
    setSettings(null); setStatus("loading");
    try {
      const value = await settingsApi.get(userId);
      if (session !== sessionRef.current) return;
      writes.latest = value; setSettings(value); setStatus("ready");
    } catch { if (session === sessionRef.current) setStatus("error"); }
  }, [userId]);
  useEffect(() => {
    void load();
    return () => {
      const writes = writesRef.current;
      sessionRef.current++;
      writes.attached = false;
      // Leaving a screen detaches its UI, not its captured account's finite save queue.
      if (rangeTimerRef.current) {
        clearTimeout(rangeTimerRef.current); rangeTimerRef.current = null;
        writes.pending = writes.latest;
      }
      void drain(writes);
    };
  }, [load]);

  async function drain(writes = writesRef.current) {
    if (writes.saving) return;
    writes.saving = true;
    const canUpdateUI = () => writes.attached && writesRef.current === writes;
    // /me/:user/settings uses current session cookies. Always retain the original
    // path identity, stop on an account switch or auth failure, and never auto-retry.
    while (writes.pending && viewerRef.current === writes.userId) {
      const next = writes.pending; writes.pending = null;
      if (canUpdateUI()) setStatus("saving");
      try {
        const saved = await settingsApi.update(writes.userId, next);
        if (writes.latest === next) {
          writes.latest = saved;
          if (canUpdateUI()) setSettings(saved);
        }
        if (!writes.pending && canUpdateUI()) setStatus("ready");
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) writes.pending = null;
        // Keep edited controls retryable; detached queues have no retry loop.
        if (!writes.pending && canUpdateUI()) setStatus("error");
      }
    }
    writes.saving = false;
  }
  function setValue<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    if (!writesRef.current.latest) return;
    const next = { ...writesRef.current.latest, [key]: value };
    writesRef.current.latest = next; setSettings(next);
    // Dragging a range updates locally; blur/pointer release or inactivity commits it.
    if (key === "textScale") {
      if (rangeTimerRef.current) clearTimeout(rangeTimerRef.current);
      rangeTimerRef.current = setTimeout(() => { rangeTimerRef.current = null; writesRef.current.pending = writesRef.current.latest; void drain(); }, 300);
    } else { writesRef.current.pending = next; void drain(); }
  }
  function flushRange() {
    if (!rangeTimerRef.current) return;
    clearTimeout(rangeTimerRef.current); rangeTimerRef.current = null;
    writesRef.current.pending = writesRef.current.latest; void drain();
  }
  function backToCategories() {
    if (location.state?.settingsCategoryOrigin) navigate(-1);
    else navigate("/settings", { replace: true, state: { ...location.state, settingsCategoryOrigin: false } });
  }
  function toggle(key: keyof UserSettings) {
    if (writesRef.current.latest && typeof writesRef.current.latest[key] === "boolean") setValue(key, !writesRef.current.latest[key] as UserSettings[typeof key]);
  }
  function selectTheme(next: AppTheme) {
    setTheme(next);
    setValue("theme", next.toUpperCase());
  }

  const activeLabel = sections.find((item) => item.id === active)?.label ?? "Cài đặt";
  return <section className={`screen settings-feature ${headerOwnedByShell ? "shell-header-owned" : ""}`}><header className="settings-feature-title"><div><span>Cài đặt</span><h2>Kiểm soát trải nghiệm của bạn</h2></div><small className={status} role="status">{status === "saving" ? "Đang lưu..." : status === "error" ? "Không thể lưu thay đổi" : ""}</small></header>{status === "error" && settings && <button className="settings-feature-retry" onClick={() => { writesRef.current.pending = writesRef.current.latest; void drain(); }}>Thử lưu lại</button>}<div className={`settings-feature-layout ${detailOpen ? "detail-open" : ""}`}><nav>{sections.map((item) => { const Icon = item.icon; return <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => go(`/settings/${item.id}`)}><Icon size={18} /><span>{item.label}</span></button>; })}</nav><main><header className="settings-mobile-detail-header"><button onClick={backToCategories} aria-label="Quay lại danh mục cài đặt"><ChevronLeft size={21} /></button><strong>{activeLabel}</strong></header>{status === "loading" && <div className="settings-feature-loading" />}{status === "error" && !settings && <button className="settings-feature-retry" onClick={() => void load()}>Thử tải lại</button>}{settings && active === "appearance" && <><SettingsGroup title="Ngôn ngữ"><ChoiceRow label="Ngôn ngữ ứng dụng" value={locale} options={[{ value: "vi", label: "Tiếng Việt" }, { value: "en", label: "English" }]} onChange={(value) => setLocale(value as "vi" | "en")} /></SettingsGroup><SettingsGroup title="Giao diện"><ChoiceRow label="Chế độ màu" value={theme} options={[{ value: "system", label: "Theo hệ thống" }, { value: "light", label: "Sáng" }, { value: "dark", label: "Tối" }]} onChange={(value) => selectTheme(value as AppTheme)} /><ToggleRow label="Giảm chuyển động" checked={settings.reducedMotion} onChange={() => toggle("reducedMotion")} /><ToggleRow label="Tăng độ tương phản" checked={settings.highContrast} onChange={() => toggle("highContrast")} /><label className="settings-feature-range"><span>Cỡ chữ</span><input type="range" onPointerUp={flushRange} onBlur={flushRange} min="0.8" max="1.4" step="0.1" value={settings.textScale} onChange={(event) => setValue("textScale", Number(event.target.value))} /><strong>{settings.textScale.toFixed(1)}x</strong></label></SettingsGroup></>}{settings && active === "privacy" && <><SettingsGroup title="Quyền riêng tư"><ChoiceRow label="Tài khoản" value={settings.accountVisibility} options={[{ value: "PUBLIC", label: "Công khai" }, { value: "PRIVATE", label: "Riêng tư" }]} onChange={(value) => setValue("accountVisibility", value)} /><ChoiceRow label="Ai có thể xem Story" value={settings.storyVisibility} options={[{ value: "EVERYONE", label: "Mọi người" }, { value: "FOLLOWERS", label: "Người theo dõi" }, { value: "FRIENDS", label: "Bạn bè" }]} onChange={(value) => setValue("storyVisibility", value)} /><ToggleRow label="Hiển thị trạng thái hoạt động" checked={settings.activityStatusVisible} onChange={() => toggle("activityStatusVisible")} /><ToggleRow label="Duyệt tag trước khi hiển thị" checked={settings.tagApprovalRequired} onChange={() => toggle("tagApprovalRequired")} /></SettingsGroup></>}{settings && active === "posts" && <SettingsGroup title="Tương tác mặc định"><ChoiceRow label="Ai có thể bình luận" value={settings.commentPermission} options={[{ value: "EVERYONE", label: "Mọi người" }, { value: "FOLLOWERS", label: "Người theo dõi" }, { value: "FRIENDS", label: "Bạn bè" }, { value: "NONE", label: "Không ai" }]} onChange={(value) => setValue("commentPermission", value)} /><ChoiceRow label="Ai có thể mention" value={settings.mentionPermission} options={[{ value: "EVERYONE", label: "Mọi người" }, { value: "FOLLOWERS", label: "Người theo dõi" }, { value: "FRIENDS", label: "Bạn bè" }, { value: "NONE", label: "Không ai" }]} onChange={(value) => setValue("mentionPermission", value)} /><ToggleRow label="Luôn hiển thị caption" checked={settings.alwaysShowCaptions} onChange={() => toggle("alwaysShowCaptions")} /></SettingsGroup>}{settings && active === "feed" && <SettingsGroup title="Media và nội dung"><ChoiceRow label="Tự động phát video" value={settings.autoplayVideo} options={[{ value: "ALWAYS", label: "Luôn luôn" }, { value: "WIFI_ONLY", label: "Chỉ Wi-Fi" }, { value: "NEVER", label: "Không bao giờ" }]} onChange={(value) => setValue("autoplayVideo", value)} /><ChoiceRow label="Nội dung nhạy cảm" value={settings.sensitiveContentLevel} options={[{ value: "LESS", label: "Ít hơn" }, { value: "STANDARD", label: "Tiêu chuẩn" }, { value: "MORE", label: "Nhiều hơn" }]} onChange={(value) => setValue("sensitiveContentLevel", value)} /></SettingsGroup>}{settings && active === "messages" && <SettingsGroup title="Trạng thái tin nhắn"><ToggleRow label="Gửi trạng thái đã xem" checked={settings.readReceiptsEnabled} onChange={() => toggle("readReceiptsEnabled")} /><ToggleRow label="Thông báo tin nhắn" checked={settings.messagesEnabled} onChange={() => toggle("messagesEnabled")} /></SettingsGroup>}{settings && active === "notifications" && <><SettingsGroup title="Loại thông báo"><ToggleRow label="Lượt thích" checked={settings.likesEnabled} onChange={() => toggle("likesEnabled")} /><ToggleRow label="Bình luận" checked={settings.commentsEnabled} onChange={() => toggle("commentsEnabled")} /><ToggleRow label="Người theo dõi" checked={settings.followsEnabled} onChange={() => toggle("followsEnabled")} /><ToggleRow label="Story" checked={settings.storiesEnabled} onChange={() => toggle("storiesEnabled")} /><ToggleRow label="Push notification" checked={settings.pushEnabled} onChange={() => toggle("pushEnabled")} /></SettingsGroup><SettingsGroup title="Quyền thiết bị"><NotificationPermissionControl userId={userId} /></SettingsGroup></>}</main></div></section>;
}
