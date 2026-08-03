import { ChevronLeft, MessageCircle, MoreHorizontal, PenLine, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ChatMediaViewer, type ChatViewerItem } from "../components/ChatMediaExperience";
import { ConversationDetailsDrawer } from "../components/ConversationDetailsDrawer";
import { ChatComposer } from "../components/ChatComposer";
import { ChatMessageList } from "../components/ChatMessageList";
import { NewConversationDialog } from "../components/NewConversationDialog";
import { useChatController } from "../hooks/useChatController";
import type { ChatNavigationTarget, ChatThread } from "../model/chat.types";
import { Avatar as SharedAvatar } from "../../../shared/components";

type Props = {
  userId: string;
  username: string;
  onOpenProfile: (userId: string) => Promise<void>;
  onOpenStory: (ownerId: string, storyId: string) => void;
  initialTarget?: ChatNavigationTarget | null;
};

function Avatar({ thread, large = false }: { thread: ChatThread; large?: boolean }) {
  return <span className={`dm-avatar ${large ? "large" : ""}`}><SharedAvatar src={thread.avatarUrl} name={thread.title} alt={thread.title} /></span>;
}

export function ChatScreen({ userId, username, onOpenProfile, onOpenStory, initialTarget }: Props) {
  const controller = useChatController(userId, initialTarget);
  const [query, setQuery] = useState("");
  const [newChatOpen, setNewChatOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(Boolean(initialTarget?.panel));
  const [viewer, setViewer] = useState<{ items: ChatViewerItem[]; index: number } | null>(null);
  const filtered = useMemo(() => controller.threads.filter((thread) => `${thread.title} ${thread.preview}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [controller.threads, query]);

  useEffect(() => {
    controller.setFocused(Boolean(controller.activeId));
    return () => controller.setFocused(false);
  }, [controller.activeId]);

  useEffect(() => {
    if (!initialTarget?.conversationId) return;
    controller.openConversation(initialTarget.conversationId);
    if (initialTarget.panel) setDetailsOpen(true);
    if (initialTarget.messageSeq) void controller.focusMessage(initialTarget.messageSeq);
  }, [initialTarget?.conversationId, initialTarget?.messageSeq, initialTarget?.panel]);

  function openThread(thread: ChatThread) {
    controller.openConversation(thread.id);
    setDetailsOpen(false);
  }

  return <section className={`direct-messaging-page ${controller.active ? "pane-conversation" : "pane-inbox"}`}>
    <aside className="dm-sidebar">
      <header className="dm-sidebar-header">
        <div className="dm-account-switch"><span><strong>{username}</strong></span></div>
        <button type="button" className="dm-compose-action" onClick={() => setNewChatOpen(true)} aria-label="Tạo cuộc trò chuyện"><PenLine size={19} /></button>
      </header>
      <div className="dm-inbox-controls">
        <label className="dm-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm cuộc trò chuyện" aria-label="Tìm cuộc trò chuyện" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Xóa tìm kiếm"><X size={15} /></button>}</label>
      </div>
      <div className="dm-section-title"><strong>Tin nhắn</strong><span>{filtered.length}</span></div>
      <div className="dm-thread-list">
        {controller.threadState === "loading" && <div className="chat-state">Đang tải...</div>}
        {controller.threadState === "error" && <div className="chat-state"><strong>Không thể tải hộp thư</strong><button type="button" onClick={() => void controller.loadThreads()}>Thử lại</button></div>}
        {controller.threadState === "ready" && !filtered.length && <div className="chat-state"><MessageCircle size={24} /><strong>{query ? "Không tìm thấy cuộc trò chuyện" : "Chưa có tin nhắn"}</strong></div>}
        {filtered.map((thread) => <button type="button" key={thread.id} className={`${controller.activeId === thread.id ? "active" : ""} ${thread.unreadCount ? "unread" : ""}`} onClick={() => openThread(thread)}>
          <Avatar thread={thread} />
          <span><strong>{thread.title}</strong><small>{thread.preview}</small></span>
          {thread.unreadCount > 0 && <em>{thread.unreadCount > 99 ? "99+" : thread.unreadCount}</em>}
        </button>)}
      </div>
    </aside>
    <section className={`dm-conversation-panel ${detailsOpen ? "details-open" : ""}`}>
      {controller.active ? <div className="dm-conversation-thread">
        <header className="dm-conversation-header">
          <button type="button" className="dm-mobile-back" onClick={() => controller.closeConversation()} aria-label="Quay lại hộp thư"><ChevronLeft size={20} /></button>
          <Avatar thread={controller.active} large />
          <div><strong>{controller.active.title}</strong><small>{controller.active.isDissolved ? "Nhóm đã giải tán" : "Cuộc trò chuyện"}</small></div>
          <div className="dm-header-actions"><button type="button" onClick={() => setDetailsOpen((value) => !value)} aria-label="Chi tiết cuộc trò chuyện" aria-expanded={detailsOpen}><MoreHorizontal size={20} /></button></div>
        </header>
        <ChatMessageList controller={controller} userId={userId} onOpenMedia={(items, index) => setViewer({ items, index })} onOpenStory={onOpenStory} />
        <ChatComposer controller={controller} />
      </div> : <div className="dm-empty-state"><span className="dm-empty-icon"><MessageCircle size={27} /></span><h2>Tin nhắn của bạn</h2><p>Chọn một cuộc trò chuyện hoặc bắt đầu tin nhắn mới.</p><button type="button" onClick={() => setNewChatOpen(true)}>Gửi tin nhắn</button></div>}
      {controller.active && <ConversationDetailsDrawer
        actorId={userId}
        conversationId={controller.active.id}
        conversationType={controller.active.type}
        fallbackTitle={controller.active.title}
        open={detailsOpen}
        initialView={initialTarget?.panel === "requests" ? "REQUESTS" : "MAIN"}
        onClose={() => setDetailsOpen(false)}
        onOpenProfile={onOpenProfile}
        onNicknameUpdated={() => void controller.loadThreads(controller.activeId || undefined)}
        onConversationRemoved={() => { controller.closeConversation(); void controller.loadThreads(); }}
        onConversationDissolved={() => void controller.loadThreads(controller.activeId || undefined)}
      />}
    </section>
    {newChatOpen && <NewConversationDialog userId={userId} onClose={() => setNewChatOpen(false)} onCreated={(thread) => { setNewChatOpen(false); void controller.loadThreads(thread.id); }} />}
    {viewer && <ChatMediaViewer items={viewer.items} initialIndex={viewer.index} onClose={() => setViewer(null)} />}
  </section>;
}
