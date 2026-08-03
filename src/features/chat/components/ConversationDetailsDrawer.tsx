import { BellOff, Check, ChevronLeft, FileText, Image as ImageIcon, LoaderCircle, Mic, MoreHorizontal, Plus, Shield, UserMinus, Users, Video, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { apiGet, apiSend } from "../../../shared/api";
import { ChatAudioPlayer, ChatMediaViewer, type ChatViewerItem } from "./ChatMediaExperience";
import { Avatar } from "../../../shared/components";
import { chatApi } from "../api/chat.api";
import type { ConversationDetailsDto, ConversationMemberDto } from "../model/chat.dto";

type ConversationMember = ConversationMemberDto;
type ConversationDetails = ConversationDetailsDto;

type UserSuggestion = { id: string; username: string; fullName?: string | null; avatar?: string | null };
type MemberRequest = {
  id: string;
  conversationId: string;
  status: string;
  requester: { userId: string; displayName: string; username?: string | null; avatarUrl?: string | null };
  target: { userId: string; displayName: string; username?: string | null; avatarUrl?: string | null };
  createdAt?: string | null;
};
type MemberRequestPage = { items: MemberRequest[]; page: number; size: number; total: number; hasNext: boolean };
type MediaMetadata = { url?: string | null; publicId?: string | null; mimeType?: string | null; fileName?: string | null; duration?: number | null };
type ConversationMedia = { messageId: string; messageSeq: number; messageType: string; media?: MediaMetadata | null; createdAt?: string | null };
type MediaPage = { items: ConversationMedia[]; nextCursor?: string | null; hasMore: boolean };
type DrawerView = "MAIN" | "MEDIA" | "ADD" | "REQUESTS";
type MediaCategory = "IMAGE" | "VIDEO" | "FILE_AUDIO";
type ConversationAction = "DELETE_DIRECT" | "LEAVE_GROUP" | "DISSOLVE_GROUP";
type MemberAdminAction = { type: "REMOVE" | "PROMOTE"; member: ConversationMember };

type Props = {
  actorId: string;
  conversationId: string;
  initialView?: DrawerView;
  conversationType: string;
  fallbackTitle: string;
  open: boolean;
  onClose: () => void;
  onOpenProfile: (userId: string) => Promise<void>;
  onNicknameUpdated?: (targetUserId: string, displayName: string) => void;
  onConversationRemoved?: (conversationId: string) => void;
  onConversationDissolved?: (conversationId: string) => void;
};

function PersonAvatar({ src, label }: { src?: string | null; label: string }) {
  return <span className="conversation-details-avatar"><Avatar src={src} name={label} alt={label} /></span>;
}

function memberDisplayName(member: ConversationMember, nickname?: string | null) {
  return nickname?.trim() || member.fullName?.trim() || member.username?.trim() || member.displayName?.trim() || "Người dùng";
}

function mediaDate(value?: string | null) {
  if (!value) return "Không rõ ngày";
  return new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function ConversationDetailsDrawer({ actorId, conversationId, conversationType, fallbackTitle, open, initialView = "MAIN", onClose, onOpenProfile, onNicknameUpdated, onConversationRemoved, onConversationDissolved }: Props) {
  const [details, setDetails] = useState<ConversationDetails | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [view, setView] = useState<DrawerView>("MAIN");
  const [muting, setMuting] = useState(false);
  const [nicknameOpen, setNicknameOpen] = useState(false);
  const [nicknameTargetId, setNicknameTargetId] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameSaving, setNicknameSaving] = useState(false);
  const [nicknameQuery, setNicknameQuery] = useState("");
  const [pendingAction, setPendingAction] = useState<ConversationAction | null>(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserSuggestion[]>([]);
  const [addState, setAddState] = useState<"idle" | "loading" | "ready" | "saving" | "error">("idle");
  const [requests, setRequests] = useState<MemberRequest[]>([]);
  const [requestState, setRequestState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [mediaCategory, setMediaCategory] = useState<MediaCategory>("IMAGE");
  const [mediaItems, setMediaItems] = useState<ConversationMedia[]>([]);
  const [mediaCursor, setMediaCursor] = useState<string | null>(null);
  const [mediaHasMore, setMediaHasMore] = useState(false);
  const [mediaState, setMediaState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [viewer, setViewer] = useState<{ items: ChatViewerItem[]; index: number } | null>(null);
  const [profileMember, setProfileMember] = useState<ConversationMember | null>(null);
  const [memberMenuId, setMemberMenuId] = useState<string | null>(null);
  const [memberAction, setMemberAction] = useState<MemberAdminAction | null>(null);
  const [memberActionBusy, setMemberActionBusy] = useState(false);
  const [memberActionError, setMemberActionError] = useState("");

  useEffect(() => {
    if (open) setView(initialView);
  }, [conversationId, initialView, open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (profileMember) setProfileMember(null);
      else if (memberAction) setMemberAction(null);
      else if (memberMenuId) setMemberMenuId(null);
      else if (pendingAction) setPendingAction(null);
      else if (nicknameOpen) setNicknameOpen(false);
      else if (view !== "MAIN") setView("MAIN");
      else onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [memberAction, memberMenuId, nicknameOpen, onClose, open, pendingAction, profileMember, view]);

  useEffect(() => {
    if (!memberMenuId) return;
    const closeMenu = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".conversation-member-admin")) setMemberMenuId(null);
    };
    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, [memberMenuId]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setState("loading");
    chatApi.details(conversationId, actorId)
      .then((result) => {
        if (cancelled) return;
        const firstTarget = result.members.find((member) => member.userId !== actorId);
        setDetails(result);
        setNicknameTargetId(firstTarget?.userId ?? "");
        setNickname(firstTarget?.nickname ?? "");
        setState("ready");
      })
      .catch(() => !cancelled && setState("error"));
    return () => { cancelled = true; };
  }, [actorId, conversationId, open, reloadKey]);

  useEffect(() => {
    if (!open || view !== "ADD") return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      setAddState("loading");
      apiGet<UserSuggestion[]>(`/user-details/chat-suggestions?viewerId=${encodeURIComponent(actorId)}&query=${encodeURIComponent(query.trim())}&limit=30`)
        .then((result) => { if (!cancelled) { setSuggestions((result ?? []).filter((user) => !details?.members.some((member) => member.userId === user.id))); setAddState("ready"); } })
        .catch(() => !cancelled && setAddState("error"));
    }, 180);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [actorId, details?.members, open, query, view]);

  useEffect(() => {
    if (!open || view !== "REQUESTS" || !details?.canManageGroup) return;
    setRequestState("loading");
    apiGet<MemberRequestPage>(`/chat/conversations/${encodeURIComponent(conversationId)}/member-requests?actorId=${encodeURIComponent(actorId)}&page=0&size=50`)
      .then((result) => { setRequests(result.items ?? []); setRequestState("ready"); })
      .catch(() => setRequestState("error"));
  }, [actorId, conversationId, details?.canManageGroup, open, view]);

  useEffect(() => {
    if (!open || view !== "MEDIA") return;
    void loadMedia(true);
  }, [mediaCategory, open, view]);

  const visibleMembers = useMemo(() => {
    const members = details?.members ?? [];
    if (conversationType === "DIRECT") {
      const peers = members.filter((member) => member.userId !== actorId);
      return peers.length ? peers : members;
    }
    return members;
  }, [actorId, conversationType, details]);
  const nicknameTargets = useMemo(() => details?.members ?? [], [details]);
  const nicknameTarget = nicknameTargets.find((member) => member.userId === nicknameTargetId) ?? nicknameTargets[0] ?? null;
  const filteredNicknameTargets = useMemo(() => {
    const normalized = nicknameQuery.trim().toLowerCase();
    if (!normalized) return nicknameTargets;
    return nicknameTargets.filter((member) => `${member.nickname ?? ""} ${member.fullName ?? ""} ${member.username ?? ""} ${member.displayName}`.toLowerCase().includes(normalized));
  }, [nicknameQuery, nicknameTargets]);
  const isGroup = conversationType === "GROUP";
  const dissolved = Boolean(details?.isDissolved);
  const isAdmin = Boolean(details?.canManageGroup);
  const activeAdminCount = visibleMembers.filter((member) => member.role === "ADMIN").length;
  const cannotLeave = isAdmin && activeAdminCount <= 1 && !dissolved;
  const groupedMedia = useMemo(() => mediaItems.reduce<Record<string, ConversationMedia[]>>((groups, item) => {
    const key = mediaDate(item.createdAt);
    (groups[key] ??= []).push(item);
    return groups;
  }, {}), [mediaItems]);

  function selectNicknameTarget(targetUserId: string) {
    const target = nicknameTargets.find((member) => member.userId === targetUserId);
    if (!target) return;
    setNicknameTargetId(target.userId);
    setNickname(target.nickname ?? "");
  }

  async function openMemberProfile() {
    if (!profileMember) return;
    const userId = profileMember.userId;
    setProfileMember(null);
    onClose();
    await onOpenProfile(userId);
  }
  async function toggleNotifications() {
    if (!details || muting) return;
    const nextMuted = !details.notificationsMuted;
    setDetails({ ...details, notificationsMuted: nextMuted });
    setMuting(true);
    try { await apiSend(`/chat/conversations/${encodeURIComponent(conversationId)}/notifications?actorId=${encodeURIComponent(actorId)}`, "PUT", { muted: nextMuted }); }
    catch { setDetails({ ...details, notificationsMuted: !nextMuted }); }
    finally { setMuting(false); }
  }

  async function saveNickname(event: FormEvent) {
    event.preventDefault();
    if (!nicknameTarget) return;
    const nextNickname = nickname.trim() || null;
    setNicknameSaving(true);
    try {
      await apiSend(`/chat/conversations/${encodeURIComponent(conversationId)}/members/${encodeURIComponent(nicknameTarget.userId)}/nickname?actorId=${encodeURIComponent(actorId)}`, "PUT", { nickname: nextNickname });
      const nextDisplayName = memberDisplayName(nicknameTarget, nextNickname);
      setNicknameOpen(false);
      setNicknameQuery("");
      setDetails((current) => current ? { ...current, members: current.members.map((member) => member.userId === nicknameTarget.userId ? { ...member, nickname: nextNickname, displayName: nextDisplayName } : member) } : current);
      onNicknameUpdated?.(nicknameTarget.userId, nextDisplayName);
    } finally { setNicknameSaving(false); }
  }

  async function confirmConversationAction() {
    if (!pendingAction || actionBusy) return;
    setActionBusy(true);
    setActionError("");
    try {
      if (pendingAction === "DELETE_DIRECT") {
        await apiSend(`/chat/conversations/${encodeURIComponent(conversationId)}/for-me?actorId=${encodeURIComponent(actorId)}`, "DELETE");
        onConversationRemoved?.(conversationId);
      } else if (pendingAction === "LEAVE_GROUP") {
        await apiSend(`/chat/conversations/${encodeURIComponent(conversationId)}/members/me/leave?actorId=${encodeURIComponent(actorId)}`, "POST");
        onConversationRemoved?.(conversationId);
      } else {
        await apiSend(`/chat/conversations/${encodeURIComponent(conversationId)}/dissolve?actorId=${encodeURIComponent(actorId)}`, "POST");
        setDetails((current) => current ? { ...current, isDissolved: true } : current);
        onConversationDissolved?.(conversationId);
      }
      setPendingAction(null);
    } catch {
      setActionError("Không thể thực hiện thao tác. Vui lòng thử lại.");
    } finally {
      setActionBusy(false);
    }
  }

  async function addSelectedMembers() {
    if (!selectedUsers.length) return;
    setAddState("saving");
    try {
      for (const user of selectedUsers) {
        await apiSend(`/chat/conversations/${encodeURIComponent(conversationId)}/members?actorId=${encodeURIComponent(actorId)}`, "POST", { targetUserId: user.id });
      }
      setSelectedUsers([]);
      setQuery("");
      setReloadKey((value) => value + 1);
      setView("MAIN");
    } catch { setAddState("error"); }
  }

  async function resolveRequest(requestId: string, action: "approve" | "reject") {
    await apiSend(`/chat/member-requests/${encodeURIComponent(requestId)}/${action}?actorId=${encodeURIComponent(actorId)}`, "POST");
    setRequests((current) => current.filter((request) => request.id !== requestId));
    if (action === "approve") setReloadKey((value) => value + 1);
  }

  async function confirmMemberAction() {
    if (!memberAction || memberActionBusy) return;
    setMemberActionBusy(true);
    setMemberActionError("");
    try {
      const target = encodeURIComponent(memberAction.member.userId);
      const base = `/chat/conversations/${encodeURIComponent(conversationId)}/members/${target}`;
      if (memberAction.type === "REMOVE") {
        await apiSend(`${base}?actorId=${encodeURIComponent(actorId)}`, "DELETE");
        setDetails((current) => current ? {
          ...current,
          members: current.members.filter((member) => member.userId !== memberAction.member.userId),
        } : current);
      } else {
        const role = "ADMIN";
        await apiSend(`${base}/role?actorId=${encodeURIComponent(actorId)}`, "PATCH", { role });
        setDetails((current) => current ? {
          ...current,
          members: current.members.map((member) => member.userId === memberAction.member.userId ? { ...member, role } : member),
        } : current);
      }
      setMemberAction(null);
      setMemberMenuId(null);
      setReloadKey((value) => value + 1);
    } catch {
      setMemberActionError("Không thể cập nhật thành viên. Hãy kiểm tra quyền quản trị và thử lại.");
    } finally {
      setMemberActionBusy(false);
    }
  }

  async function loadMedia(reset: boolean) {
    if (!reset && (!mediaHasMore || mediaState === "loading")) return;
    setMediaState("loading");
    const cursor = reset ? "" : mediaCursor ? `&beforeSeq=${encodeURIComponent(mediaCursor)}` : "";
    try {
      const page = await apiGet<MediaPage>(`/chat/conversations/${encodeURIComponent(conversationId)}/media?actorId=${encodeURIComponent(actorId)}&category=${mediaCategory}&limit=30${cursor}`);
      setMediaItems((current) => reset ? page.items ?? [] : [...current, ...(page.items ?? [])]);
      setMediaCursor(page.nextCursor ?? null);
      setMediaHasMore(Boolean(page.hasMore));
      setMediaState("ready");
    } catch { setMediaState("error"); }
  }

  function openMedia(item: ConversationMedia) {
    const viewable = mediaItems.filter((media) => media.messageType === "IMAGE" || media.messageType === "VIDEO").filter((media) => media.media?.url);
    const items: ChatViewerItem[] = viewable.map((media) => ({ url: media.media!.url!, type: media.messageType === "VIDEO" ? "VIDEO" : "IMAGE", alt: media.media?.fileName ?? "Conversation media" }));
    const index = viewable.findIndex((media) => media.messageId === item.messageId);
    if (index >= 0) setViewer({ items, index });
  }

  if (!open) return null;
  const title = view === "MEDIA" ? "Ảnh, video và đa phương tiện" : view === "ADD" ? "Thêm thành viên" : view === "REQUESTS" ? "Yêu cầu vào nhóm" : "Chi tiết";

  return <>
    <button className="conversation-details-scrim" onClick={onClose} aria-label="Đóng chi tiết cuộc trò chuyện" />
    <aside className="conversation-details-drawer" aria-label="Chi tiết cuộc trò chuyện">
      <header><button className={view === "MAIN" ? "conversation-details-mobile-back" : ""} onClick={() => view === "MAIN" ? onClose() : setView("MAIN")} aria-label={view === "MAIN" ? "Đóng" : "Quay lại"}><ChevronLeft size={20} /></button><h2>{title}</h2><button onClick={onClose} aria-label="Đóng chi tiết cuộc trò chuyện"><X size={19} /></button></header>
      <div className={`conversation-details-body view-${view.toLowerCase()}`}>
        {view === "MAIN" && <>
          <button className="conversation-notification-row" onClick={() => void toggleNotifications()} disabled={state !== "ready" || muting} aria-label="Tắt thông báo về tin nhắn" aria-pressed={details?.notificationsMuted ?? false}><BellOff size={19} /><span>Tắt thông báo về tin nhắn</span><i className={details?.notificationsMuted ? "details-toggle on" : "details-toggle"}>{muting && <LoaderCircle className="spin" size={13} />}</i></button>
          <section className="conversation-members-section" aria-labelledby="conversation-members-title">
            <h3 id="conversation-members-title">Thành viên</h3>
            {state === "loading" && <div className="conversation-details-loading"><span /><span /></div>}
            {state === "error" && <button className="conversation-details-retry" onClick={() => setReloadKey((value) => value + 1)}>Không thể tải thành viên · Thử lại</button>}
            {state === "ready" && visibleMembers.map((member) => {
              const canManageMember = isGroup && isAdmin && !dissolved
                && member.userId !== actorId && member.role === "USER";
              return <article className="conversation-member-item" key={member.userId}>
                <button className="conversation-member-row" onClick={() => setProfileMember(member)}>
                  <PersonAvatar src={member.avatarUrl} label={memberDisplayName(member)} />
                  <span><strong>{memberDisplayName(member) || fallbackTitle}</strong>{member.username && <small>@{member.username}</small>}</span>
                  {member.role === "ADMIN" && <em>Quản trị viên</em>}
                </button>
                {canManageMember && <div className="conversation-member-admin">
                  <button className="conversation-member-menu-trigger" aria-label={`Quản lý ${member.displayName}`} aria-expanded={memberMenuId === member.userId} onClick={(event) => { event.stopPropagation(); setMemberMenuId((current) => current === member.userId ? null : member.userId); }}><MoreHorizontal size={18} /></button>
                  {memberMenuId === member.userId && <div className="conversation-member-menu">
                    <button onClick={() => { setMemberActionError(""); setMemberAction({ type: "PROMOTE", member }); }}>
                      <Shield size={16} />Cấp quyền quản trị
                    </button>
                    <button className="destructive" onClick={() => { setMemberActionError(""); setMemberAction({ type: "REMOVE", member }); }}><UserMinus size={16} />Xóa khỏi nhóm</button>
                  </div>}
                </div>}
              </article>;
            })}
          </section>
          <div className="conversation-details-actions">
            {isGroup && <button onClick={() => setView("MEDIA")}><ImageIcon size={17} />Ảnh, video và đa phương tiện</button>}
            {isGroup && !dissolved && <button onClick={() => setView("ADD")}><Plus size={17} />Thêm thành viên</button>}
            {isGroup && isAdmin && !dissolved && <button onClick={() => setView("REQUESTS")}><Users size={17} />Yêu cầu vào nhóm</button>}
            {!dissolved && <button onClick={() => { setNicknameOpen(true); setNicknameQuery(""); }}>Biệt danh</button>}
            <span />
            <button className="destructive">Báo cáo</button>
            {!isGroup && <button className="destructive strong" onClick={() => { setActionError(""); setPendingAction("DELETE_DIRECT"); }}>Xóa đoạn chat</button>}
            {isGroup && <button className="destructive strong" disabled={cannotLeave} title={cannotLeave ? "Nhóm phải có ít nhất một quản trị viên" : undefined} onClick={() => { setActionError(""); setPendingAction("LEAVE_GROUP"); }}>Rời khỏi nhóm</button>}
            {isGroup && isAdmin && !dissolved && <button className="destructive strong" onClick={() => { setActionError(""); setPendingAction("DISSOLVE_GROUP"); }}>Giải tán nhóm</button>}
          </div>
        </>}
        {view === "ADD" && <section className="group-member-manager"><label><span>Tìm người dùng</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm theo username..." /></label>{selectedUsers.length > 0 && <div className="group-selected-users">{selectedUsers.map((user) => <span key={user.id}>{user.fullName || user.username}<button onClick={() => setSelectedUsers((items) => items.filter((item) => item.id !== user.id))}><X size={12} /></button></span>)}</div>}<div className="group-user-results">{addState === "loading" && <LoaderCircle className="spin" />}{suggestions.map((user) => { const selected = selectedUsers.some((item) => item.id === user.id); return <button key={user.id} className={selected ? "selected" : ""} onClick={() => setSelectedUsers((items) => selected ? items.filter((item) => item.id !== user.id) : [...items, user])}><PersonAvatar src={user.avatar} label={user.fullName || user.username} /><span><strong>{user.fullName || user.username}</strong><small>@{user.username}</small></span>{selected && <Check size={16} />}</button>; })}</div><button className="group-primary-action" disabled={!selectedUsers.length || addState === "saving"} onClick={() => void addSelectedMembers()}>{addState === "saving" ? "Đang xử lý..." : details?.canManageGroup ? "Thêm vào nhóm" : "Gửi yêu cầu"}</button>{addState === "error" && <p className="conversation-drawer-error">Không thể thêm thành viên. Vui lòng thử lại.</p>}</section>}
        {view === "REQUESTS" && <section className="group-request-list">{requestState === "loading" && <LoaderCircle className="spin" />}{requestState === "error" && <p>Không thể tải yêu cầu.</p>}{requestState === "ready" && requests.length === 0 && <p>Không có yêu cầu đang chờ.</p>}{requests.map((request) => <article key={request.id}><PersonAvatar src={request.target.avatarUrl} label={request.target.displayName} /><div><strong>{request.target.displayName}</strong><small>@{request.target.username || request.target.userId}</small><span>Được đề xuất bởi {request.requester.displayName}</span></div><div><button onClick={() => void resolveRequest(request.id, "approve")}>Duyệt</button><button onClick={() => void resolveRequest(request.id, "reject")}>Từ chối</button></div></article>)}</section>}
        {view === "MEDIA" && <section className="conversation-media-browser"><nav>{(["IMAGE", "VIDEO", "FILE_AUDIO"] as MediaCategory[]).map((category) => <button key={category} className={mediaCategory === category ? "active" : ""} onClick={() => setMediaCategory(category)}>{category === "IMAGE" ? "Ảnh" : category === "VIDEO" ? "Video" : "Tệp & âm thanh"}</button>)}</nav>{mediaState === "loading" && mediaItems.length === 0 && <LoaderCircle className="spin" />}{mediaState === "error" && <button onClick={() => void loadMedia(true)}>Không thể tải · Thử lại</button>}{mediaState === "ready" && mediaItems.length === 0 && <p>Chưa có nội dung trong mục này.</p>}{Object.entries(groupedMedia).map(([date, items]) => <div className="conversation-media-date" key={date}><h3>{date}</h3><div>{items.map((item) => item.messageType === "IMAGE" ? <button className="conversation-media-tile" key={item.messageId} onClick={() => openMedia(item)}><img src={item.media?.url ?? ""} alt={item.media?.fileName ?? "Ảnh"} /></button> : item.messageType === "VIDEO" ? <button className="conversation-media-tile video" key={item.messageId} onClick={() => openMedia(item)}><video src={item.media?.url ?? ""} preload="metadata" muted /><Video size={18} /></button> : item.messageType === "AUDIO" && item.media?.url ? <div className="conversation-media-audio" key={item.messageId}><ChatAudioPlayer src={item.media.url} durationHint={item.media.duration} /></div> : <a className="conversation-media-file" key={item.messageId} href={item.media?.url ?? undefined} target="_blank" rel="noreferrer"><FileText size={19} /><span>{item.media?.fileName || "Tệp đính kèm"}</span></a>)}</div></div>)}{mediaHasMore && <button className="conversation-media-more" onClick={() => void loadMedia(false)} disabled={mediaState === "loading"}>{mediaState === "loading" ? "Đang tải..." : "Xem thêm"}</button>}</section>}
      </div>
    </aside>
    {profileMember && <div className="conversation-action-modal" role="dialog" aria-modal="true" aria-labelledby="member-profile-title">
      <button className="conversation-action-modal-scrim" onClick={() => setProfileMember(null)} aria-label="Đóng" />
      <section className="conversation-member-profile-dialog">
        <PersonAvatar src={profileMember.avatarUrl} label={memberDisplayName(profileMember)} />
        <strong id="member-profile-title">{memberDisplayName(profileMember)}</strong>
        {profileMember.username && <small>@{profileMember.username}</small>}
        <button className="primary" onClick={() => void openMemberProfile()}>Xem trang cá nhân</button>
        <button onClick={() => setProfileMember(null)}>Đóng</button>
      </section>
    </div>}    {nicknameOpen && nicknameTarget && <div className="conversation-action-modal" role="dialog" aria-modal="true" aria-labelledby="nickname-dialog-title"><button className="conversation-action-modal-scrim" onClick={() => setNicknameOpen(false)} aria-label="Đóng" /><form className="conversation-nickname-dialog" onSubmit={saveNickname}><header><h3 id="nickname-dialog-title">Biệt danh</h3><button type="button" onClick={() => setNicknameOpen(false)} aria-label="Đóng"><X size={18} /></button></header><label className="conversation-nickname-search"><span>Tìm thành viên</span><input value={nicknameQuery} onChange={(event) => setNicknameQuery(event.target.value)} placeholder="Tìm theo tên hoặc username" /></label><div className="conversation-nickname-members">{filteredNicknameTargets.map((member) => <button type="button" key={member.userId} className={member.userId === nicknameTarget.userId ? "selected" : ""} onClick={() => selectNicknameTarget(member.userId)}><PersonAvatar src={member.avatarUrl} label={memberDisplayName(member)} /><span><strong>{member.userId === actorId ? "Bạn" : memberDisplayName(member)}</strong><small>{member.username ? `@${member.username}` : memberDisplayName(member)}</small></span>{member.userId === nicknameTarget.userId && <Check size={16} />}</button>)}</div><label className="conversation-nickname-input"><span>Đặt biệt danh cho {nicknameTarget.userId === actorId ? "bạn" : memberDisplayName(nicknameTarget)}</span><input value={nickname} maxLength={100} onChange={(event) => setNickname(event.target.value)} placeholder="Nhập biệt danh" /></label><footer><button type="button" onClick={() => setNicknameOpen(false)}>Hủy</button><button className="primary" disabled={nicknameSaving}>{nicknameSaving ? <LoaderCircle className="spin" size={16} /> : "Lưu"}</button></footer></form></div>}
    {pendingAction && <div className="conversation-action-modal" role="alertdialog" aria-modal="true" aria-labelledby="conversation-action-title"><button className="conversation-action-modal-scrim" onClick={() => !actionBusy && setPendingAction(null)} aria-label="Đóng" /><section className="conversation-confirm-dialog"><h3 id="conversation-action-title">{pendingAction === "DELETE_DIRECT" ? "Xóa đoạn chat?" : pendingAction === "LEAVE_GROUP" ? "Rời khỏi nhóm?" : "Giải tán nhóm?"}</h3><p>{pendingAction === "DELETE_DIRECT" ? "Đoạn chat chỉ bị xóa khỏi tài khoản của bạn. Tin nhắn mới sẽ làm cuộc trò chuyện xuất hiện lại." : pendingAction === "LEAVE_GROUP" ? "Bạn sẽ không còn thấy nhóm trong danh sách cuộc trò chuyện." : "Mọi thành viên vẫn xem được lịch sử nhưng không thể gửi thêm tin nhắn."}</p>{actionError && <small role="alert">{actionError}</small>}<div><button disabled={actionBusy} onClick={() => setPendingAction(null)}>Hủy</button><button className="destructive" disabled={actionBusy} onClick={() => void confirmConversationAction()}>{actionBusy ? <LoaderCircle className="spin" size={16} /> : pendingAction === "DELETE_DIRECT" ? "Xóa" : pendingAction === "LEAVE_GROUP" ? "Rời nhóm" : "Giải tán"}</button></div></section></div>}
    {memberAction && <div className="conversation-action-modal" role="alertdialog" aria-modal="true" aria-labelledby="member-action-title">
      <button className="conversation-action-modal-scrim" onClick={() => !memberActionBusy && setMemberAction(null)} aria-label="Đóng" />
      <section className="conversation-confirm-dialog">
        <PersonAvatar src={memberAction.member.avatarUrl} label={memberDisplayName(memberAction.member)} />
        <h3 id="member-action-title">{memberAction.type === "REMOVE" ? "Xóa thành viên khỏi nhóm?" : "Cấp quyền quản trị?"}</h3>
        <p>{memberAction.type === "REMOVE"
          ? `${memberAction.member.displayName} sẽ không còn thấy nhóm và chỉ đọc được tin nhắn mới nếu được thêm lại.`
          : `${memberAction.member.displayName} có thể quản lý thành viên, yêu cầu tham gia và nhóm chat.`}</p>
        {memberActionError && <small role="alert">{memberActionError}</small>}
        <div><button disabled={memberActionBusy} onClick={() => setMemberAction(null)}>Hủy</button><button className={memberAction.type === "REMOVE" ? "destructive" : "primary"} disabled={memberActionBusy} onClick={() => void confirmMemberAction()}>{memberActionBusy ? <LoaderCircle className="spin" size={16} /> : memberAction.type === "REMOVE" ? "Xóa khỏi nhóm" : "Xác nhận"}</button></div>
      </section>
    </div>}
    {viewer && <ChatMediaViewer items={viewer.items} initialIndex={viewer.index} onClose={() => setViewer(null)} />}
  </>;
}
