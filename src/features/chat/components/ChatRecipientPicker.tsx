import { Check, Search, X } from "lucide-react";
import { Avatar } from "../../../shared/components";
import type { useChatRecipients } from "../hooks/useChatRecipients";
import type { ChatUserSuggestion } from "../model/chat.types";

export function ChatRecipientPicker({ recipients, disabled, onToggle }: {
  recipients: ReturnType<typeof useChatRecipients>; disabled?: boolean; onToggle?: (user: ChatUserSuggestion) => void;
}) {
  const toggle = onToggle ?? recipients.toggle;
  const selectedIds = new Set(recipients.selected.map((user) => user.id));
  return <div className="new-chat-recipient-step">
    <div className="new-chat-recipient-field"><strong>Tới:</strong><div className="new-chat-recipient-input">
      {recipients.selected.length > 0 && <div className="new-chat-selected-grid">{recipients.selected.map((user) => <span key={user.id}>
        <b>{user.fullName || user.username}</b><button type="button" disabled={disabled} onClick={() => toggle(user)} aria-label={`Bỏ ${user.fullName || user.username}`}><X size={13} /></button>
      </span>)}</div>}
      <input value={recipients.query} disabled={disabled} onChange={(event) => recipients.setQuery(event.target.value)} placeholder="Tìm kiếm..." aria-label="Tìm người dùng" />
    </div></div>
    <div className="new-chat-results">
      {recipients.status === "loading" && <p>Đang tìm kiếm...</p>}
      {recipients.status === "error" && <div className="new-chat-error" role="alert"><span>Không thể tải danh sách.</span><button type="button" onClick={recipients.retry}>Thử lại</button></div>}
      {recipients.status === "ready" && !recipients.results.length && <div className="new-chat-empty"><Search size={22} /><span>{recipients.query ? "Không tìm thấy người dùng" : "Chưa có bạn bè để hiển thị"}</span></div>}
      {recipients.results.map((user) => <button key={user.id} type="button" disabled={disabled} className={selectedIds.has(user.id) ? "selected" : ""} aria-pressed={selectedIds.has(user.id)} onClick={() => toggle(user)}>
        <span className="new-chat-avatar"><Avatar src={user.avatar} name={user.fullName || user.username} alt={user.fullName || user.username} /></span>
        <span><strong>{user.fullName || user.username}</strong><small>@{user.username}</small></span><i>{selectedIds.has(user.id) && <Check size={13} />}</i>
      </button>)}
    </div>
  </div>;
}
