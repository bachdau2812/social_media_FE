import { MessageCircle, RefreshCw, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";
import { Avatar, EmptyState, ErrorState, Spinner } from "../../../shared/components";
import { useSuggestedFriendsController } from "../hooks/useSuggestedFriendsController";
import "./suggested-friends.css";

export function SuggestedFriendsPanel({ viewerId, onOpenProfile, onOpenChat }: {
  viewerId: string;
  onOpenProfile: (userId: string) => Promise<void>;
  onOpenChat: (userId: string) => Promise<void> | void;
}) {
  const [showAll, setShowAll] = useState(false);
  const { users, state, followingIds, actionError, refresh, follow, hide } = useSuggestedFriendsController(viewerId);

  return (
    <section className="suggested-friends-panel">
      <header><div><strong>Gợi ý cho bạn</strong><span>Dựa trên hồ sơ và kết nối chung</span></div><button type="button" onClick={() => void refresh()} aria-label="Làm mới gợi ý"><RefreshCw size={17} /></button></header>
      {actionError && <div role="alert">{actionError}</div>}
      {state === "loading" ? <div className="suggestion-loading"><Spinner label="Đang tải gợi ý bạn bè" /></div> : null}
      {state === "error" ? <ErrorState message="Không thể tải gợi ý" onRetry={() => void refresh()} /> : null}
      {state === "ready" && users.length === 0 ? <EmptyState title="Chưa có gợi ý phù hợp" /> : null}
      {state === "ready" && users.length ? <div className="suggested-friends-list">{users.slice(0, 5).map((user) => <article key={user.userId}>
        <button type="button" className="suggested-user" onClick={() => void onOpenProfile(user.userId)}><Avatar src={user.avatarUrl} name={user.fullName || user.username} alt={user.fullName || user.username} /><span><strong>{user.fullName || user.username}</strong><small>@{user.username}</small></span></button>
        <div>{user.viewerFollowsUser ? <button type="button" aria-label="Nhắn tin" onClick={() => void onOpenChat(user.userId)}><MessageCircle size={17} /></button> : <button type="button" onClick={() => void follow(user)} disabled={followingIds.has(user.userId)}><UserPlus size={16} />{user.userFollowsViewer ? "Theo dõi lại" : "Theo dõi"}</button>}<button type="button" aria-label="Ẩn gợi ý" onClick={() => hide(user.userId)}><X size={15} /></button></div>
      </article>)}</div> : null}
      {users.length > 5 ? <button type="button" className="suggestions-see-all" onClick={() => setShowAll(true)}><Users size={16} /> Xem tất cả</button> : null}
      {showAll ? <div className="suggestions-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAll(false); }}><section className="suggestions-dialog" role="dialog" aria-modal="true" aria-labelledby="suggestions-title"><header><strong id="suggestions-title">Người dùng tương tự</strong><button type="button" onClick={() => setShowAll(false)} aria-label="Đóng"><X size={18} /></button></header><div className="suggested-friends-list">{users.map((user) => <article key={user.userId}><button type="button" className="suggested-user" onClick={() => { setShowAll(false); void onOpenProfile(user.userId); }}><Avatar src={user.avatarUrl} name={user.fullName || user.username} alt={user.fullName || user.username} /><span><strong>{user.fullName || user.username}</strong><small>@{user.username}</small></span></button><div>{user.viewerFollowsUser ? <button type="button" aria-label="Nhắn tin" onClick={() => void onOpenChat(user.userId)}><MessageCircle size={17} /></button> : <button type="button" onClick={() => void follow(user)} disabled={followingIds.has(user.userId)}><UserPlus size={16} />{user.userFollowsViewer ? "Theo dõi lại" : "Theo dõi"}</button>}<button type="button" aria-label="Ẩn gợi ý" onClick={() => hide(user.userId)}><X size={15} /></button></div></article>)}</div></section></div> : null}
    </section>
  );
}
