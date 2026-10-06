import { Bell, ChevronLeft, Eye, Film, Languages, MessageCircle, Moon, Shield, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nextScreenState, useScreenLocation } from "../../../app/router/ScreenLocation";
import { useLocale } from "../../../app/providers/LocaleProvider";
import { useTheme, type AppTheme } from "../../../app/providers/ThemeProvider";
import { NotificationPermissionControl } from "../../notification";
import { settingsApi } from "../api/settings.api";
import type { SettingsSectionId, UserSettings } from "../model/settings.types";
import { ChoiceRow, SettingsGroup, ToggleRow } from "../sections/SettingsControls";
import "./settings-screen.css";
import "./settings-mobile-first.css";

const sections: Array<{ id: SettingsSectionId; label: string; icon: typeof Sun }> = [
  { id: "appearance", label: "Ngôn ngữ và giao diện", icon: Languages },
  { id: "privacy", label: "Trang cá nhân và quyền riêng tư", icon: Shield },
  { id: "posts", label: "Bài viết", icon: Film },
  { id: "feed", label: "Bảng tin và nội dung", icon: Eye },
  { id: "messages", label: "Tin nhắn", icon: MessageCircle },
  { id: "notifications", label: "Thông báo", icon: Bell },
];

export function SettingsScreen({ userId }: { userId: string }) {
  const location = useScreenLocation();
  const navigate = useNavigate();
  function go(path: string) {
    if (path !== location.pathname) navigate(path, { state: nextScreenState(location) });
  }
  const section = sections.find((item) => location.pathname === `/settings/${item.id}`);
  const active: SettingsSectionId = section?.id ?? "appearance";
  const detailOpen = Boolean(section);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "error">("loading");
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const load = useCallback(async () => {
    setStatus("loading");
    try { setSettings(await settingsApi.get(userId)); setStatus("ready"); }
    catch { setStatus("error"); }
  }, [userId]);
  useEffect(() => { void load(); }, [load]);

  async function commit(next: UserSettings) {
    const previous = settings;
    setSettings(next);
    setStatus("saving");
    try {
      const saved = await settingsApi.update(userId, next);
      setSettings(saved);
      setStatus("ready");
    } catch {
      setSettings(previous);
      setStatus("error");
    }
  }
  function setValue<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    if (settings) void commit({ ...settings, [key]: value });
  }
  function toggle(key: keyof UserSettings) {
    if (settings && typeof settings[key] === "boolean") setValue(key, !settings[key] as UserSettings[typeof key]);
  }
  function selectTheme(next: AppTheme) {
    setTheme(next);
    setValue("theme", next.toUpperCase());
  }

  const activeLabel = sections.find((item) => item.id === active)?.label ?? "Cài đặt";
  return <section className="screen settings-feature"><header className="settings-feature-title"><div><span>Cài đặt</span><h2>Kiểm soát trải nghiệm của bạn</h2></div><small className={status}>{status === "saving" ? "Đang lưu..." : status === "error" ? "Không thể lưu thay đổi" : ""}</small></header><div className={`settings-feature-layout ${detailOpen ? "detail-open" : ""}`}><nav>{sections.map((item) => { const Icon = item.icon; return <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => go(`/settings/${item.id}`)}><Icon size={18} /><span>{item.label}</span></button>; })}</nav><main><header className="settings-mobile-detail-header"><button onClick={() => go("/settings")} aria-label="Quay lại danh mục cài đặt"><ChevronLeft size={21} /></button><strong>{activeLabel}</strong></header>{status === "loading" && <div className="settings-feature-loading" />}{status === "error" && !settings && <button className="settings-feature-retry" onClick={() => void load()}>Thử tải lại</button>}{settings && active === "appearance" && <><SettingsGroup title="Ngôn ngữ"><ChoiceRow label="Ngôn ngữ ứng dụng" value={locale} options={[{ value: "vi", label: "Tiếng Việt" }, { value: "en", label: "English" }]} onChange={(value) => setLocale(value as "vi" | "en")} /></SettingsGroup><SettingsGroup title="Giao diện"><ChoiceRow label="Chế độ màu" value={theme} options={[{ value: "system", label: "Theo hệ thống" }, { value: "light", label: "Sáng" }, { value: "dark", label: "Tối" }]} onChange={(value) => selectTheme(value as AppTheme)} /><ToggleRow label="Giảm chuyển động" checked={settings.reducedMotion} onChange={() => toggle("reducedMotion")} /><ToggleRow label="Tăng độ tương phản" checked={settings.highContrast} onChange={() => toggle("highContrast")} /><label className="settings-feature-range"><span>Cỡ chữ</span><input type="range" min="0.8" max="1.4" step="0.1" value={settings.textScale} onChange={(event) => setValue("textScale", Number(event.target.value))} /><strong>{settings.textScale.toFixed(1)}x</strong></label></SettingsGroup></>}{settings && active === "privacy" && <><SettingsGroup title="Quyền riêng tư"><ChoiceRow label="Tài khoản" value={settings.accountVisibility} options={[{ value: "PUBLIC", label: "Công khai" }, { value: "PRIVATE", label: "Riêng tư" }]} onChange={(value) => setValue("accountVisibility", value)} /><ChoiceRow label="Ai có thể xem Story" value={settings.storyVisibility} options={[{ value: "EVERYONE", label: "Mọi người" }, { value: "FOLLOWERS", label: "Người theo dõi" }, { value: "FRIENDS", label: "Bạn bè" }]} onChange={(value) => setValue("storyVisibility", value)} /><ToggleRow label="Hiển thị trạng thái hoạt động" checked={settings.activityStatusVisible} onChange={() => toggle("activityStatusVisible")} /><ToggleRow label="Duyệt tag trước khi hiển thị" checked={settings.tagApprovalRequired} onChange={() => toggle("tagApprovalRequired")} /></SettingsGroup></>}{settings && active === "posts" && <SettingsGroup title="Tương tác mặc định"><ChoiceRow label="Ai có thể bình luận" value={settings.commentPermission} options={[{ value: "EVERYONE", label: "Mọi người" }, { value: "FOLLOWERS", label: "Người theo dõi" }, { value: "FRIENDS", label: "Bạn bè" }, { value: "NONE", label: "Không ai" }]} onChange={(value) => setValue("commentPermission", value)} /><ChoiceRow label="Ai có thể mention" value={settings.mentionPermission} options={[{ value: "EVERYONE", label: "Mọi người" }, { value: "FOLLOWERS", label: "Người theo dõi" }, { value: "FRIENDS", label: "Bạn bè" }, { value: "NONE", label: "Không ai" }]} onChange={(value) => setValue("mentionPermission", value)} /><ToggleRow label="Luôn hiển thị caption" checked={settings.alwaysShowCaptions} onChange={() => toggle("alwaysShowCaptions")} /></SettingsGroup>}{settings && active === "feed" && <SettingsGroup title="Media và nội dung"><ChoiceRow label="Tự động phát video" value={settings.autoplayVideo} options={[{ value: "ALWAYS", label: "Luôn luôn" }, { value: "WIFI_ONLY", label: "Chỉ Wi-Fi" }, { value: "NEVER", label: "Không bao giờ" }]} onChange={(value) => setValue("autoplayVideo", value)} /><ChoiceRow label="Nội dung nhạy cảm" value={settings.sensitiveContentLevel} options={[{ value: "LESS", label: "Ít hơn" }, { value: "STANDARD", label: "Tiêu chuẩn" }, { value: "MORE", label: "Nhiều hơn" }]} onChange={(value) => setValue("sensitiveContentLevel", value)} /></SettingsGroup>}{settings && active === "messages" && <SettingsGroup title="Trạng thái tin nhắn"><ToggleRow label="Gửi trạng thái đã xem" checked={settings.readReceiptsEnabled} onChange={() => toggle("readReceiptsEnabled")} /><ToggleRow label="Thông báo tin nhắn" checked={settings.messagesEnabled} onChange={() => toggle("messagesEnabled")} /></SettingsGroup>}{settings && active === "notifications" && <><SettingsGroup title="Loại thông báo"><ToggleRow label="Lượt thích" checked={settings.likesEnabled} onChange={() => toggle("likesEnabled")} /><ToggleRow label="Bình luận" checked={settings.commentsEnabled} onChange={() => toggle("commentsEnabled")} /><ToggleRow label="Người theo dõi" checked={settings.followsEnabled} onChange={() => toggle("followsEnabled")} /><ToggleRow label="Story" checked={settings.storiesEnabled} onChange={() => toggle("storiesEnabled")} /><ToggleRow label="Push notification" checked={settings.pushEnabled} onChange={() => toggle("pushEnabled")} /></SettingsGroup><SettingsGroup title="Quyền thiết bị"><NotificationPermissionControl userId={userId} /></SettingsGroup></>}</main></div></section>;
}
