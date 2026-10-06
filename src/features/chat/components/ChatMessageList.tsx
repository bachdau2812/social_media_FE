import { Forward, MoreHorizontal, Pin, Reply, RotateCcw, ShieldAlert } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChatAudioPlayer, ChatImageMosaic, type ChatViewerItem } from "./ChatMediaExperience";
import type { useChatController } from "../hooks/useChatController";
import type { ChatMediaMetadata, ChatMessage } from "../model/chat.types";
import { Avatar as SharedAvatar } from "../../../shared/components";
import { StoryReplyMessage } from "./StoryReplyMessage";
import { MessageReactionPicker, MessageReactions } from "./MessageReactions";
import type { ReactionType } from "../model/chatReactions";
import { canForward } from "../model/chatMessageActions";
import { ForwardMessageDialog } from "./ForwardMessageDialog";

type Controller = ReturnType<typeof useChatController>;
type Props = {
  controller: Controller;
  userId: string;
  compact?: boolean;
  onOpenMedia: (items: ChatViewerItem[], index: number, messageId?: string) => void;
  onOpenStory: (ownerId: string, storyId: string) => void;
};

const THREE_HOURS = 3 * 60 * 60 * 1000;

function timestamp(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
}

function mediaItems(metadata?: ChatMediaMetadata | null) {
  if (!metadata) return [];
  if (metadata.items?.length) return metadata.items;
  return metadata.url ? [metadata] : [];
}

function replySummary(message: ChatMessage) {
  const reply = message.reply;
  if (!reply || reply.deleted) return "Tin nhắn gốc không còn tồn tại";
  if (reply.messageType === "IMAGE") return reply.metadata?.items?.length ? `${reply.metadata.items.length} ảnh` : "Ảnh";
  if (reply.messageType === "AUDIO") return "Tin nhắn thoại";
  return reply.content || "Tin nhắn";
}

function statusText(status?: ChatMessage["status"]) {
  if (status === "read") return "Đã xem";
  if (status === "delivered") return "Đã nhận";
  if (status === "sending") return "Đang gửi";
  if (status === "failed") return "Gửi thất bại";
  return "Đã gửi";
}

function Avatar({ message }: { message: ChatMessage }) {
  const name = message.senderDisplayName || message.senderId;
  return <span className="dm-avatar small"><SharedAvatar src={message.senderAvatarUrl} name={name} alt={name} /></span>;
}

function MessageActions({ own, message, disabled, onReply, onReact, controller, onForward }: {
  own: boolean; message: ChatMessage; disabled?: boolean; onReply: () => void;
  onReact: (reaction: ReactionType) => void | Promise<void>;
  controller: Controller; onForward: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const state = controller.messageActionState?.(message);
  const persisted = !message.deleted && !["sending", "failed", "queued"].includes(message.status ?? "");
  const pinned = controller.pins?.items.some((item) => item.message.id === message.id);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <span className="dm-message-actions">
    <MessageReactionPicker message={message} disabled={disabled} onSelect={onReact} />
    <button type="button" onClick={onReply} aria-label="Trả lời"><Reply size={15} /></button>
    <span ref={rootRef}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Thao tác khác" aria-expanded={open}><MoreHorizontal size={16} /></button>
      {open && <span className={`dm-message-menu ${own ? "outgoing" : "incoming"}`} role="menu">
        {canForward(message) && <button type="button" role="menuitem" onClick={() => { setOpen(false); onForward(); }}><Forward size={14} /> Chuyển tiếp</button>}
        {persisted && !disabled && controller.pins?.canManage && <button type="button" role="menuitem" disabled={state?.pending} onClick={() => { setOpen(false); void controller.pinMessage(message, !!pinned); }}><Pin size={14} /> {pinned ? "Bỏ ghim" : "Ghim"}</button>}
        {own ? persisted && !disabled && <button type="button" role="menuitem" className="destructive" disabled={state?.pending} onClick={() => { setOpen(false); void controller.recallMessage(message); }}><RotateCcw size={14} /> Thu hồi</button> : <button type="button" role="menuitem" className="destructive"><ShieldAlert size={14} /> Báo cáo</button>}
      </span>}
    </span>
  </span>;
}

function Bubble({ message, controller, userId, compact, latestOutgoing, onOpenMedia, onOpenStory }: {
  message: ChatMessage;
  controller: Controller;
  userId: string;
  compact: boolean;
  latestOutgoing: boolean;
  onOpenMedia: Props["onOpenMedia"];
  onOpenStory: Props["onOpenStory"];
}) {
  const own = message.senderId === userId;
  const [statusOpen, setStatusOpen] = useState(false);
  const [forward, setForward] = useState(false);
  const typeClass = message.messageType === "IMAGE" ? "image-message" : message.messageType === "AUDIO" ? "audio-message" : message.messageType === "STORY_REPLY" ? "story-reply-bubble" : "text-message";
  const images = mediaItems(message.metadata);
  const audioUrl = message.metadata?.url || message.metadata?.items?.[0]?.url || "";
  const main = message.deleted ? <p>Tin nhắn đã được thu hồi</p>
    : message.messageType === "STORY_REPLY" ? <StoryReplyMessage
      context={message.storyContext}
      content={message.content}
      label={own
        ? "Bạn đã trả lời tin"
        : `${message.senderDisplayName || "Người dùng"} đã trả lời tin của bạn`}
      compact={compact}
      onOpenStory={message.storyContext?.available
        ? () => onOpenStory(message.storyContext!.storyOwnerId, message.storyContext!.storyId)
        : undefined}
    />
      : message.messageType === "IMAGE" ? <ChatImageMosaic items={images} caption={message.content} onOpen={(items, index) => onOpenMedia(items, index, message.id)} />
      : message.messageType === "AUDIO" ? <ChatAudioPlayer src={audioUrl || ""} durationHint={message.metadata?.duration} compact={compact} />
        : <p className="emoji-text">{message.content}</p>;
  const bubble = <article
    className={`${compact ? "floating-bubble" : "dm-bubble"} ${own ? "outgoing" : "incoming"} ${typeClass}`}
    tabIndex={own ? 0 : undefined}
    onClick={() => { if (own) setStatusOpen((value) => !value); }}
  >
    <div className={`${compact ? "floating-bubble-cluster" : "dm-bubble-cluster"} ${message.reply ? "has-reply" : ""}`}>
      {message.reply && <button type="button" className="chat-reply-quote" onClick={(event) => { event.stopPropagation(); void controller.focusMessage(message.reply!.messageSeq); }}>
        <span><Reply size={13} /> {message.reply.senderDisplayName || "Tin nhắn được trả lời"}</span>
        <small>{replySummary(message)}</small>
      </button>}
      <div className={compact ? "floating-bubble-main" : "dm-bubble-main"}>{main}</div>
    </div>
    {own && (latestOutgoing || statusOpen) && <span className={compact ? "floating-delivery-status" : "dm-delivery-status"}>{statusText(message.status)}</span>}
  </article>;
  const actions = <MessageActions own={own} message={message} disabled={controller.active?.isDissolved}
    controller={controller} onForward={() => setForward(true)}
    onReply={() => controller.setReplyTo(message)}
    onReact={(reaction) => controller.selectReaction?.(message.conversationId, message, reaction)} />;
  return <div className={`${compact ? "floating-message-content" : "dm-message-content"} ${own ? "outgoing" : "incoming"}`}>
    {own && actions}
    <div className="chat-message-stack">
      {message.forwarded && !message.deleted && <span className="chat-forwarded-label">Đã chuyển tiếp</span>}
      {bubble}
      <MessageReactions message={message} actorId={userId} />
      {controller.messageActionState?.(message).error && <span className="chat-message-action-error" role="alert">{controller.messageActionState(message).error}</span>}
    </div>
    {!own && actions}
    {forward && <ForwardMessageDialog key={`${userId}/${message.id}`} source={message} userId={userId} onClose={() => setForward(false)} />}
  </div>;
}

export function ChatMessageList({ controller, userId, compact = false, onOpenMedia, onOpenStory }: Props) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef<string | null>(null);
  const nearBottomRef = useRef(true);
  const messages = controller.activeMessages;
  const latestOutgoing = useMemo(() => [...messages].reverse().find((message) => message.senderId === userId)?.messageSeq, [messages, userId]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !controller.activeId || controller.messageState !== "ready") return;
    if (initializedRef.current !== controller.activeId) {
      list.scrollTop = list.scrollHeight;
      initializedRef.current = controller.activeId;
      nearBottomRef.current = true;
    }
  }, [controller.activeId, controller.messageState]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !nearBottomRef.current) return;
    list.scrollTop = list.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    if (controller.highlightedSeq == null) return;
    const frame = window.requestAnimationFrame(() => {
      listRef.current?.querySelector<HTMLElement>(`[data-chat-seq="${controller.highlightedSeq}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [controller.highlightedSeq, messages.length]);

  async function onScroll() {
    const list = listRef.current;
    if (!list) return;
    nearBottomRef.current = list.scrollHeight - list.scrollTop - list.clientHeight < 72;
    if (list.scrollTop > 56 || !controller.hasMore || controller.loadingOlder) return;
    const beforeHeight = list.scrollHeight;
    const beforeTop = list.scrollTop;
    await controller.loadOlder();
    window.requestAnimationFrame(() => {
      list.scrollTop = list.scrollHeight - beforeHeight + beforeTop;
    });
  }

  if (controller.messageState === "loading" && !messages.length) return <div className="chat-state">Đang tải tin nhắn...</div>;
  if (controller.messageState === "error" && !messages.length) return <div className="chat-state"><strong>Không thể tải tin nhắn</strong><button type="button" onClick={() => controller.activeId && void controller.loadMessages(controller.activeId)}>Thử lại</button></div>;

  return <div ref={listRef} className={compact ? "floating-message-stream" : "dm-message-history"} onScroll={() => void onScroll()}>
    {controller.loadingOlder && <span className={`chat-history-page-loader ${compact ? "compact" : ""}`}>Đang tải tin nhắn cũ...</span>}
    {!messages.length && <div className="chat-state">Chưa có tin nhắn. Hãy bắt đầu cuộc trò chuyện.</div>}
    {messages.map((message, index) => {
      if (message.messageType === "SYSTEM") return <p key={message.id} data-chat-seq={message.messageSeq} className={`chat-system-message ${compact ? "floating" : ""}`}>{message.content}</p>;
      const previous = messages[index - 1];
      const next = messages[index + 1];
      const own = message.senderId === userId;
      const showTime = index === 0 || (new Date(message.createdAt || 0).getTime() - new Date(previous?.createdAt || 0).getTime()) > THREE_HOURS;
      const grouped = Boolean(previous && previous.senderId === message.senderId && !showTime && previous.messageType !== "SYSTEM");
      const lastInGroup = !next || next.senderId !== message.senderId || next.messageType === "SYSTEM" || (new Date(next.createdAt || 0).getTime() - new Date(message.createdAt || 0).getTime()) > THREE_HOURS;
      return <div key={message.id} className="floating-message-block">
        {showTime && <time className={compact ? "floating-time-separator" : "dm-date-separator"}>{timestamp(message.createdAt)}</time>}
        <div data-chat-seq={message.messageSeq} className={`${compact ? "floating-bubble-row" : "dm-bubble-row"} ${own ? "outgoing" : "incoming"} ${grouped ? "grouped" : ""} ${message.messageType === "IMAGE" ? "image-message" : ""} ${controller.highlightedSeq === message.messageSeq ? "reply-target-active" : ""}`}>
          {!compact && !own && (lastInGroup ? <Avatar message={message} /> : <span className="dm-avatar-spacer" />)}
          <Bubble message={message} controller={controller} userId={userId} compact={compact} latestOutgoing={message.messageSeq === latestOutgoing} onOpenMedia={onOpenMedia} onOpenStory={onOpenStory} />
        </div>
      </div>;
    })}
  </div>;
}
