import { Check, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../../../shared/components";
import { chatApi } from "../api/chat.api";
import { conversationToThread } from "../model/chat.mapper";
import type { ChatThread, ChatUserSuggestion } from "../model/chat.types";

type Props = {
  userId: string;
  onClose: () => void;
  onCreated: (thread: ChatThread) => void;
};

type DialogStep = "recipients" | "group-details";
type SuggestionState = "loading" | "ready" | "error";
type CreateState = "idle" | "saving" | "error";

export function NewConversationDialog({ userId, onClose, onCreated }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChatUserSuggestion[]>([]);
  const [selected, setSelected] = useState<ChatUserSuggestion[]>([]);
  const [step, setStep] = useState<DialogStep>("recipients");
  const [groupName, setGroupName] = useState("");
  const [suggestionState, setSuggestionState] = useState<SuggestionState>("loading");
  const [createState, setCreateState] = useState<CreateState>("idle");
  const [searchRevision, setSearchRevision] = useState(0);
  const saving = createState === "saving";

  useEffect(() => {
    let disposed = false;
    const timer = window.setTimeout(() => {
      setSuggestionState("loading");
      void chatApi.suggestions(userId, query.trim()).then((items) => {
        if (disposed) return;
        setResults(items || []);
        setSuggestionState("ready");
      }).catch(() => {
        if (!disposed) setSuggestionState("error");
      });
    }, query ? 280 : 0);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
    };
  }, [query, searchRevision, userId]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose, saving]);

  const selectedIds = useMemo(() => new Set(selected.map((user) => user.id)), [selected]);
  const trimmedGroupName = groupName.trim();

  function toggle(user: ChatUserSuggestion) {
    setCreateState("idle");
    setSelected((current) => current.some((item) => item.id === user.id)
      ? current.filter((item) => item.id !== user.id)
      : [...current, user]);
  }

  function goBack() {
    if (saving) return;
    setCreateState("idle");
    setStep("recipients");
  }

  async function submit() {
    if (!selected.length || saving) return;
    if (step === "recipients" && selected.length > 1) {
      setCreateState("idle");
      setStep("group-details");
      return;
    }
    if (step === "group-details" && !trimmedGroupName) return;

    setCreateState("saving");
    try {
      const conversation = selected.length === 1
        ? await chatApi.direct(userId, selected[0].id)
        : await chatApi.group(userId, trimmedGroupName, selected.map((user) => user.id));
      const thread = conversationToThread(conversation, userId);
      setCreateState("idle");
      onCreated({
        ...thread,
        title: conversation.title || (selected.length === 1
          ? selected[0].fullName || selected[0].username
          : trimmedGroupName),
        avatarUrl: conversation.avatarUrl || (selected.length === 1 ? selected[0].avatar ?? null : null),
      });
    } catch {
      setCreateState("error");
    }
  }

  const primaryLabel = saving
    ? "Đang tạo..."
    : createState === "error" && step === "group-details"
      ? "Thử tạo lại"
      : step === "group-details"
        ? "Tạo nhóm"
        : selected.length > 1
          ? "Tiếp tục"
          : "Nhắn tin";

  return <div
    className="new-chat-backdrop"
    onPointerDown={(event) => { if (event.target === event.currentTarget && !saving) onClose(); }}
  >
    <section
      className={`new-chat-dialog ${step === "group-details" ? "group-setup" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-chat-title"
      aria-busy={saving}
    >
      <header>
        <span aria-hidden="true" />
        <h2 id="new-chat-title">{step === "group-details" ? "Tạo nhóm chat" : "Tin nhắn mới"}</h2>
        <button type="button" onClick={onClose} aria-label="Đóng" disabled={saving}><X size={19} /></button>
      </header>

      {step === "group-details" ? <div className="new-group-setup">
        <label htmlFor="new-group-name">
          <span>Tên nhóm</span>
          <input
            id="new-group-name"
            autoFocus
            value={groupName}
            onChange={(event) => { setGroupName(event.target.value); setCreateState("idle"); }}
            maxLength={120}
            placeholder="Nhập tên nhóm..."
          />
        </label>
        <div className="new-group-members" aria-label="Thành viên đã chọn">
          <p>{selected.length} thành viên</p>
          {selected.map((user) => <article key={user.id}>
            <span className="new-chat-avatar"><Avatar src={user.avatar} name={user.fullName || user.username} alt={user.fullName || user.username} /></span>
            <span><strong>{user.fullName || user.username}</strong><small>@{user.username}</small></span>
          </article>)}
        </div>
        {createState === "error" && <p className="new-chat-create-error" role="alert">Không thể tạo nhóm. Vui lòng thử lại.</p>}
      </div> : <div className="new-chat-recipient-step">
        <div className="new-chat-recipient-field">
          <strong>Tới:</strong>
          <div className="new-chat-recipient-input">
            {selected.length > 0 && <div className="new-chat-selected-grid">{selected.map((user) => <span key={user.id}>
              <b>{user.fullName || user.username}</b>
              <button type="button" onClick={() => toggle(user)} aria-label={`Bỏ ${user.fullName || user.username}`}><X size={13} /></button>
            </span>)}</div>}
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm..." aria-label="Tìm người dùng" />
          </div>
        </div>
        <div className="new-chat-results">
          {suggestionState === "loading" && <p>Đang tìm kiếm...</p>}
          {suggestionState === "error" && <div className="new-chat-error" role="alert">
            <span>Không thể tải danh sách.</span>
            <button type="button" onClick={() => setSearchRevision((value) => value + 1)}>Thử lại</button>
          </div>}
          {suggestionState === "ready" && !results.length && <div className="new-chat-empty"><Search size={22} /><span>{query ? "Không tìm thấy người dùng" : "Chưa có bạn bè để hiển thị"}</span></div>}
          {results.map((user) => <button key={user.id} type="button" className={selectedIds.has(user.id) ? "selected" : ""} onClick={() => toggle(user)}>
            <span className="new-chat-avatar"><Avatar src={user.avatar} name={user.fullName || user.username} alt={user.fullName || user.username} /></span>
            <span><strong>{user.fullName || user.username}</strong><small>@{user.username}</small></span>
            <i>{selectedIds.has(user.id) && <Check size={13} />}</i>
          </button>)}
        </div>
      </div>}

      <footer>
        {step === "group-details" && <button className="secondary" type="button" onClick={goBack} disabled={saving}>Quay lại</button>}
        <button
          type="button"
          onClick={() => void submit()}
          disabled={!selected.length || saving || (step === "group-details" && !trimmedGroupName)}
        >{primaryLabel}</button>
      </footer>
    </section>
  </div>;
}
