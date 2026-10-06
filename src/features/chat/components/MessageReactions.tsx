import { Heart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Avatar } from "../../../shared/components";
import { chatApi } from "../api/chat.api";
import type { MessageReactorDto } from "../model/chat.dto";
import type { ChatMessage } from "../model/chat.types";
import { REACTIONS, type ReactionType } from "../model/chatReactions";
import "../styles/chat-reactions.css";

type ReactionMessage = ChatMessage & { pending?: boolean; error?: string | null };
type PickerProps = {
  message: ReactionMessage; disabled?: boolean;
  onSelect: (reaction: ReactionType) => void | Promise<void>;
};

function supportsReactions(message: ChatMessage) {
  return !message.deleted && message.messageType !== "SYSTEM" && !["sending", "failed", "queued"].includes(message.status ?? "");
}

export function MessageReactionPicker({ message, disabled, onSelect }: PickerProps) {
  const [picker, setPicker] = useState(false);
  const root = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = REACTIONS.find((item) => item.type === message.myReaction);
  useEffect(() => {
    if (!picker) return;
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target)) setPicker(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setPicker(false); trigger.current?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [picker]);

  if (!supportsReactions(message)) return null;
  return <span ref={root} className="chat-reaction-action" onClick={(event) => event.stopPropagation()}>
    <button ref={trigger} type="button" className={`chat-reaction-trigger ${selected ? "selected" : ""}`} aria-label="Chọn cảm xúc" aria-expanded={picker} disabled={disabled || message.pending} onClick={() => setPicker((open) => !open)}>
      {selected ? <span aria-hidden="true">{selected.emoji}</span> : <Heart size={15} aria-hidden="true" />}
    </button>
    {picker && <div className="chat-reaction-picker" role="group" aria-label="Cảm xúc tin nhắn">
      {REACTIONS.map((item) => <button key={item.type} type="button" aria-label={item.label} aria-pressed={message.myReaction === item.type} title={item.label} disabled={disabled || message.pending} onClick={() => { setPicker(false); trigger.current?.focus(); void onSelect(item.type); }}>{item.emoji}</button>)}
    </div>}
  </span>;
}

export function MessageReactions({ message, actorId }: { message: ReactionMessage; actorId: string }) {
  const [reactors, setReactors] = useState(false);
  const countTrigger = useRef<HTMLButtonElement>(null);
  const counts = message.reactions ?? [];
  const total = counts.reduce((sum, item) => sum + item.count, 0);
  if (!supportsReactions(message) || (!total && !message.pending && !message.error && !reactors)) return null;
  return <div className="chat-reaction-footer" onClick={(event) => event.stopPropagation()}>
    <div className="chat-reaction-controls">
      {total > 0 && <button ref={countTrigger} type="button" className="chat-reaction-count" aria-label={`Xem ${total} cảm xúc`} onClick={() => setReactors(true)}>
        <span aria-hidden="true">{counts.slice(0, 3).map(({ type }) => REACTIONS.find((item) => item.type === type)?.emoji).join("")}</span><span>{total}</span>
      </button>}
      {message.pending && <span className="chat-reaction-pending" role="status">Đang cập nhật…</span>}
    </div>
    {message.error && <span className="chat-reaction-error" role="alert">{message.error}</span>}
    {reactors && <MessageReactors message={message} actorId={actorId} onClose={() => { setReactors(false); countTrigger.current?.focus(); }} />}
  </div>;
}

function MessageReactors({ message, actorId, onClose }: { message: ChatMessage; actorId: string; onClose: () => void }) {
  const [filter, setFilter] = useState<ReactionType | undefined>();
  const [page, setPage] = useState<{ items: MessageReactorDto[]; cursor: string | null; hasMore: boolean }>({ items: [], cursor: null, hasMore: false });
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [revision, setRevision] = useState(0);
  const generation = useRef(0);
  const request = useRef<AbortController | null>(null);
  const failedCursor = useRef<string | undefined>();
  const panel = useRef<HTMLElement>(null);
  const close = useRef(onClose);
  close.current = onClose;

  const load = useCallback(async (cursor?: string) => {
    request.current?.abort();
    const abort = new AbortController();
    request.current = abort;
    const version = ++generation.current;
    setStatus("loading");
    if (!cursor) setPage({ items: [], cursor: null, hasMore: false });
    failedCursor.current = cursor;
    try {
      const result = await chatApi.reactors(message.conversationId, actorId, message.id, filter, cursor, abort.signal);
      if (abort.signal.aborted || version !== generation.current) return;
      setPage((current) => ({
        items: cursor ? [...new Map([...current.items, ...result.items].map((item) => [item.userId, item])).values()] : result.items,
        cursor: result.nextCursor, hasMore: result.hasMore,
      }));
      setStatus("ready");
    } catch {
      if (!abort.signal.aborted && version === generation.current) setStatus("error");
    }
  }, [actorId, message.conversationId, message.id, filter]);

  useEffect(() => {
    void load();
    return () => { generation.current += 1; request.current?.abort(); };
  }, [load, revision, message.reactionVersion]);

  useEffect(() => {
    panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close.current(); }
      if (event.key !== "Tab") return;
      const nodes = Array.from(panel.current?.querySelectorAll<HTMLElement>("button:not(:disabled), [tabindex='0']") ?? []);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", keyboard);
    return () => { document.removeEventListener("keydown", keyboard); document.body.style.overflow = bodyOverflow; };
  }, []);

  return createPortal(<div className="chat-reactors-backdrop" onClick={(event) => event.stopPropagation()} onPointerDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section ref={panel} className="chat-reactors-dialog" role="dialog" aria-modal="true" aria-label="Cảm xúc tin nhắn" aria-busy={status === "loading"}>
      <header><strong>Cảm xúc tin nhắn</strong><button type="button" aria-label="Đóng danh sách cảm xúc" onClick={onClose}><X size={19} /></button></header>
      <div className="chat-reactors-tabs" role="tablist" aria-label="Lọc cảm xúc">
        <button type="button" role="tab" aria-selected={!filter} onClick={() => setFilter(undefined)}>Tất cả</button>
        {REACTIONS.map((item) => <button type="button" key={item.type} role="tab" aria-label={item.label} aria-selected={filter === item.type} title={item.label} onClick={() => setFilter(item.type)}>{item.emoji}</button>)}
      </div>
      <div className="chat-reactors-list">
        {page.items.map((user) => <div className="chat-reactor" key={user.userId}>
          <Avatar src={user.avatarUrl} name={user.displayName || user.userId} alt={user.displayName || user.userId} />
          <span>{user.displayName || user.userId}</span>
          <span aria-label={REACTIONS.find((item) => item.type === user.reaction)?.label}>{REACTIONS.find((item) => item.type === user.reaction)?.emoji}</span>
        </div>)}
        {status === "loading" && <p role="status">Đang tải…</p>}
        {status === "error" && <div role="alert"><p>Không thể tải danh sách cảm xúc.</p><button type="button" onClick={() => failedCursor.current ? void load(failedCursor.current) : setRevision((value) => value + 1)}>Thử lại</button></div>}
        {status === "ready" && !page.items.length && <p>Chưa có cảm xúc này.</p>}
        {page.hasMore && status === "ready" && <button type="button" onClick={() => void load(page.cursor ?? undefined)}>Xem thêm</button>}
      </div>
    </section>
  </div>, document.body);
}
