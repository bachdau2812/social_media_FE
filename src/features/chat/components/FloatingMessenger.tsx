import { ChevronLeft, Expand, MessageCircle, PenLine, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ChatMediaViewer, type ChatViewerItem } from "./ChatMediaExperience";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageList } from "./ChatMessageList";
import { NewConversationDialog } from "./NewConversationDialog";
import { useChatController } from "../hooks/useChatController";
import type { ChatNavigationTarget, ChatThread } from "../model/chat.types";
import { Avatar } from "../../../shared/components";

type Props = {
  userId: string;
  compactLauncher?: boolean;
  onOpenFullChat: () => void;
  onOpenStory: (ownerId: string, storyId: string) => void;
  openConversationRequest?: (ChatNavigationTarget & { nonce: number }) | null;
};

function ThreadAvatar({ thread, detail = false }: { thread: ChatThread; detail?: boolean }) {
  return <span className={`floating-thread-avatar ${detail ? "detail-avatar" : ""}`}><Avatar src={thread.avatarUrl} name={thread.title} alt={thread.title} /></span>;
}

export function FloatingMessenger({ userId, compactLauncher = false, onOpenFullChat, onOpenStory, openConversationRequest }: Props) {
  const controller = useChatController(userId, openConversationRequest);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [newChatOpen, setNewChatOpen] = useState(false);
  const [viewer, setViewer] = useState<{ items: ChatViewerItem[]; index: number } | null>(null);
  const filtered = useMemo(() => controller.threads.filter((thread) => `${thread.title} ${thread.preview}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [controller.threads, query]);

  useEffect(() => {
    if (!openConversationRequest?.conversationId) return;
    setOpen(true);
    controller.openConversation(openConversationRequest.conversationId);
    if (openConversationRequest.messageSeq) void controller.focusMessage(openConversationRequest.messageSeq);
  }, [openConversationRequest?.nonce]);

  function closePanel() {
    setOpen(false);
    setNewChatOpen(false);
    controller.setFocused(false);
  }

  let surface;
  if (!open) {
    surface = <button type="button" className={`floating-message-launcher ${compactLauncher ? "icon-only" : ""}`} onClick={() => setOpen(true)} aria-label="Mở tin nhắn">
      <MessageCircle size={22} />
      {!compactLauncher && <span><strong>Tin nhắn</strong><small>{controller.unread ? `${controller.unread} tin nhắn mới` : "Mở hộp thư"}</small></span>}
      {controller.unread > 0 && <em>{controller.unread > 99 ? "99+" : controller.unread}</em>}
    </button>;
  } else if (!controller.active) {
    surface = <section className="floating-message-panel list" aria-label="Tin nhắn">
      <header className="floating-message-header"><div><strong>Tin nhắn</strong><small>{controller.threads.length} cuộc trò chuyện</small></div><span className="floating-message-tools"><button type="button" onClick={() => setNewChatOpen(true)} aria-label="Tạo cuộc trò chuyện"><PenLine size={18} /></button><button type="button" onClick={onOpenFullChat} aria-label="Mở trang tin nhắn"><Expand size={18} /></button><button type="button" onClick={closePanel} aria-label="Đóng"><X size={18} /></button></span></header>
      <div className="floating-inbox-toolbar"><label><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm cuộc trò chuyện" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Xóa tìm kiếm"><X size={14} /></button>}</label></div>
      <div className="floating-thread-list">
        {controller.threadState === "loading" && <div className="chat-state">Đang tải...</div>}
        {controller.threadState === "error" && <div className="chat-state"><strong>Không thể tải hộp thư</strong><button type="button" onClick={() => void controller.loadThreads()}>Thử lại</button></div>}
        {controller.threadState === "ready" && !filtered.length && <div className="chat-state"><MessageCircle size={22} /><strong>{query ? "Không tìm thấy cuộc trò chuyện" : "Chưa có tin nhắn"}</strong></div>}
        {filtered.map((thread) => <button type="button" key={thread.id} className={thread.unreadCount ? "unread" : ""} onClick={() => controller.openConversation(thread.id)}>
          <ThreadAvatar thread={thread} />
          <span><strong>{thread.title}</strong><small>{thread.preview}</small></span>
          {thread.unreadCount > 0 && <em>{thread.unreadCount > 99 ? "99+" : thread.unreadCount}</em>}
        </button>)}
      </div>
    </section>;
  } else {
    surface = <section
      className="floating-message-panel detail"
      aria-label={`Cuộc trò chuyện với ${controller.active.title}`}
      onPointerDown={() => controller.setFocused(true)}
      onFocusCapture={() => controller.setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) controller.setFocused(false); }}
    >
      <header className="floating-message-header">
        <button type="button" onClick={() => controller.closeConversation()} aria-label="Quay lại"><ChevronLeft size={19} /></button>
        <ThreadAvatar thread={controller.active} detail />
        <div><strong>{controller.active.title}</strong><small>{controller.active.isDissolved ? "Nhóm đã giải tán" : "Cuộc trò chuyện"}</small></div>
        <span className="floating-message-tools"><button type="button" onClick={onOpenFullChat} aria-label="Mở trang tin nhắn"><Expand size={18} /></button><button type="button" onClick={closePanel} aria-label="Đóng"><X size={18} /></button></span>
      </header>
      <ChatMessageList controller={controller} userId={userId} compact onOpenMedia={(items, index) => setViewer({ items, index })} onOpenStory={onOpenStory} />
      <ChatComposer controller={controller} compact />
      {viewer && <ChatMediaViewer items={viewer.items} initialIndex={viewer.index} onClose={() => setViewer(null)} />}
    </section>;
  }

  return <>
    {surface}
    {newChatOpen && <NewConversationDialog userId={userId} onClose={() => setNewChatOpen(false)} onCreated={(thread) => { setNewChatOpen(false); void controller.loadThreads(thread.id); }} />}
  </>;
}
