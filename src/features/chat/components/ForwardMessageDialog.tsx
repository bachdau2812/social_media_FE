import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useChatRecipients } from "../hooks/useChatRecipients";
import { canForward, messagePreview } from "../model/chatMessageActions";
import type { ChatMessage, ChatUserSuggestion } from "../model/chat.types";
import { MessageForwarding } from "../services/messageForwarding";
import { ChatRecipientPicker } from "./ChatRecipientPicker";
import "../styles/chat-message-actions.css";

export function ForwardMessageDialog({ userId, source, onClose }: { userId: string; source: ChatMessage; onClose: () => void }) {
  const recipients = useChatRecipients(userId);
  const [sending, setSending] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const [, render] = useState(0);
  const forwarding = useRef(new MessageForwarding(userId, source.conversationId, source.id));
  const alive = useRef(true);
  const close = useRef(onClose); close.current = onClose;
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    const operation = forwarding.current;
    alive.current = true;
    panel.current?.querySelector<HTMLInputElement>("input")?.focus();
    return () => { alive.current = false; queueMicrotask(() => { if (!alive.current) operation.cancel(); }); };
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && !sending) close.current(); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [sending]);
  const results = forwarding.current.results();
  const failed = results.some((item) => item.status === "error");
  function toggle(user: ChatUserSuggestion) {
    if (!recipients.selected.some((item) => item.id === user.id) && recipients.selected.length >= 20) { setLimitError(true); return; }
    setLimitError(false); recipients.toggle(user);
  }
  async function submit() {
    if (sending || !canForward(source) || !recipients.selected.length) return;
    setSending(true);
    await forwarding.current.send(recipients.selected.map((user) => user.id), () => { if (alive.current) render((version) => version + 1); });
    if (!alive.current) return;
    setSending(false);
    if (recipients.selected.every((user) => forwarding.current.results().some((item) => item.userId === user.id && item.status === "sent"))) onClose();
  }
  return createPortal(<div className="new-chat-backdrop chat-forward-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget && !sending) onClose(); }}>
    <section ref={panel} className="new-chat-dialog chat-forward-dialog" role="dialog" aria-modal="true" aria-label="Chuyển tiếp tin nhắn" aria-busy={sending}>
      <header><span /><h2>Chuyển tiếp tin nhắn</h2><button type="button" aria-label="Đóng" disabled={sending} onClick={onClose}><X size={19} /></button></header>
      <p className="chat-forward-preview">{messagePreview(source)}</p>
      <ChatRecipientPicker recipients={recipients} disabled={sending} onToggle={toggle} />
      {limitError && <p role="alert">Chọn tối đa 20 người mỗi lần.</p>}
      {!canForward(source) && <p role="alert">Tin nhắn này không còn có thể chuyển tiếp.</p>}
      {results.length > 0 && <ul className="chat-forward-results" aria-label="Kết quả chuyển tiếp">{results.filter((job) => recipients.selected.some((user) => user.id === job.userId)).map((job) => <li key={job.userId}>
        <span>{recipients.selected.find((user) => user.id === job.userId)?.fullName || recipients.selected.find((user) => user.id === job.userId)?.username}</span>
        <span>{job.status === "sent" ? "Đã gửi" : job.status === "error" ? "Gửi thất bại" : "Đang gửi…"}</span>
      </li>)}</ul>}
      {failed && <p role="alert">Một số người chưa nhận được tin. Thử lại sẽ chỉ gửi tới những người chưa gửi thành công.</p>}
      <footer><button type="button" disabled={sending || !recipients.selected.length || !canForward(source)} onClick={() => void submit()}>{sending ? "Đang gửi…" : failed ? "Thử gửi lại" : "Gửi"}</button></footer>
    </section>
  </div>, document.body);
}
