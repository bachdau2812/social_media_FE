import { Check, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { chatApi } from "../api/chat.api";
import { conversationToThread } from "../model/chat.mapper";
import type { ChatThread, ChatUserSuggestion } from "../model/chat.types";
import { Avatar } from "../../../shared/components";

type Props = {
  userId: string;
  onClose: () => void;
  onCreated: (thread: ChatThread) => void;
};

export function NewConversationDialog({ userId, onClose, onCreated }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChatUserSuggestion[]>([]);
  const [selected, setSelected] = useState<ChatUserSuggestion[]>([]);
  const [groupSetup, setGroupSetup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [state, setState] = useState<"loading" | "ready" | "saving" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setState("loading");
      void chatApi.suggestions(userId, query.trim()).then((items) => {
        if (controller.signal.aborted) return;
        setResults(items || []);
        setState("ready");
      }).catch(() => {
        if (!controller.signal.aborted) setState("error");
      });
    }, query ? 280 : 0);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, userId]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  const selectedIds = useMemo(() => new Set(selected.map((user) => user.id)), [selected]);

  function toggle(user: ChatUserSuggestion) {
    setSelected((current) => current.some((item) => item.id === user.id)
      ? current.filter((item) => item.id !== user.id)
      : [...current, user]);
  }

  async function submit() {
    if (!selected.length || state === "saving") return;
    if (selected.length > 1 && !groupSetup) {
      setGroupSetup(true);
      return;
    }
    if (selected.length > 1 && !groupName.trim()) return;
    setState("saving");
    try {
      const conversation = selected.length === 1
        ? await chatApi.direct(userId, selected[0].id)
        : await chatApi.group(userId, groupName.trim(), selected.map((user) => user.id));
      const thread = conversationToThread(conversation, userId);
      onCreated({
        ...thread,
        title: conversation.title || (selected.length === 1 ? selected[0].fullName || selected[0].username : groupName.trim()),
        avatarUrl: conversation.avatarUrl || (selected.length === 1 ? selected[0].avatar ?? null : null),
      });
    } catch {
      setState("error");
    }
  }

  return <div className="new-chat-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className={`new-chat-dialog ${groupSetup ? "group-setup" : ""}`} role="dialog" aria-modal="true" aria-label="Tạo cuộc trò chuyện">
      <header><h2>{groupSetup ? "Tạo nhóm chat" : "Tin nhắn mới"}</h2><button type="button" onClick={onClose} aria-label="Đóng"><X size={19} /></button></header>
      {groupSetup ? <div className="chat-group-setup">
        <div className="chat-group-members">{selected.map((user) => <span key={user.id}><Avatar src={user.avatar} name={user.fullName || user.username} alt={user.fullName || user.username} /><strong>{user.fullName || user.username}</strong></span>)}</div>
        <label><span>Tên nhóm</span><input autoFocus value={groupName} onChange={(event) => setGroupName(event.target.value)} maxLength={120} placeholder="Nhập tên nhóm..." /></label>
      </div> : <>
        <div className="new-chat-recipient-field">
          <strong>Tới:</strong>
          <div className="new-chat-recipient-input">
            {selected.length > 0 && <div className="new-chat-selected-grid">{selected.map((user) => <span key={user.id}><b>{user.fullName || user.username}</b><button type="button" onClick={() => toggle(user)} aria-label={`Bỏ ${user.fullName || user.username}`}><X size={13} /></button></span>)}</div>}
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm..." aria-label="Tìm người dùng" />
          </div>
        </div>
        <div className="new-chat-results">
          {state === "loading" && <p>Đang tìm kiếm...</p>}
          {state === "error" && <p className="new-chat-error">Không thể tải danh sách. Hãy thử lại.</p>}
          {state === "ready" && !results.length && <div className="new-chat-empty"><Search size={22} /><span>{query ? "Không tìm thấy người dùng" : "Chưa có bạn bè để hiển thị"}</span></div>}
          {results.map((user) => <button key={user.id} type="button" className={selectedIds.has(user.id) ? "selected" : ""} onClick={() => toggle(user)}>
            <span className="new-chat-avatar"><Avatar src={user.avatar} name={user.fullName || user.username} alt={user.fullName || user.username} /></span>
            <span><strong>{user.fullName || user.username}</strong><small>@{user.username}</small></span>
            <i>{selectedIds.has(user.id) && <Check size={13} />}</i>
          </button>)}
        </div>
      </>}
      <footer>{groupSetup && <button type="button" onClick={() => setGroupSetup(false)}>Quay lại</button>}<button type="button" onClick={() => void submit()} disabled={!selected.length || state === "saving" || (groupSetup && !groupName.trim())}>{state === "saving" ? "Đang tạo..." : "Chat"}</button></footer>
    </section>
  </div>;
}
