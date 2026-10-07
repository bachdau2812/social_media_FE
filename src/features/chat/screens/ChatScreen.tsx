import { ChevronLeft, MessageCircle, MoreHorizontal, PenLine, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ChatMediaViewer } from "../components/ChatMediaExperience";
import { ConversationDetailsDrawer } from "../components/ConversationDetailsDrawer";
import { ChatPresenceStatus } from "../components/ChatPresenceStatus";
import { ChatComposer } from "../components/ChatComposer";
import { ChatMessageList } from "../components/ChatMessageList";
import { NewConversationDialog } from "../components/NewConversationDialog";
import { PinnedMessagesBar } from "../components/PinnedMessagesBar";
import { useChatController } from "../hooks/useChatController";
import { useChatMediaViewer } from "../hooks/useChatMediaViewer";
import type { ChatNavigationTarget, ChatThread } from "../model/chat.types";
import { Avatar as SharedAvatar } from "../../../shared/components";

type Props = {
  userId: string;
  username: string;
  onOpenProfile: (userId: string) => Promise<void>;
  onOpenStory: (ownerId: string, storyId: string) => void;
  initialTarget?: ChatNavigationTarget | null;
  /** Full-page presentation adapter: the URL owns selection, shared controller owns messages. */
  onSelectConversation?: (conversationId: string | null) => void;
};

function Avatar({ thread, large = false }: { thread: ChatThread; large?: boolean }) {
  return <span className={`dm-avatar ${large ? "large" : ""}`}><SharedAvatar src={thread.avatarUrl} name={thread.title} alt={thread.title} /></span>;
}

export function ChatScreen({ userId, username, onOpenProfile, onOpenStory, initialTarget, onSelectConversation }: Props) {
  const controller = useChatController(userId, initialTarget);
  const { activeId, setFocused, openConversation, closeConversation } = controller;
  const targetId = initialTarget?.conversationId;
  const targetPanel = initialTarget?.panel;
  const routeControlled = Boolean(onSelectConversation);
  const [query, setQuery] = useState("");
  const [newChatOpen, setNewChatOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(Boolean(initialTarget?.panel));
  const { viewer, openViewer, closeViewer } = useChatMediaViewer(userId, controller);
  const filtered = useMemo(() => controller.threads.filter((thread) => `${thread.title} ${thread.preview}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [controller.threads, query]);

  useEffect(() => {
    setFocused(Boolean(activeId));
    return () => setFocused(false);
  }, [activeId, setFocused]);

  useEffect(() => {
    if (targetId && activeId !== targetId) openConversation(targetId);
    else if (!targetId && routeControlled && activeId) closeConversation();
  }, [targetId, activeId, routeControlled, openConversation, closeConversation]);

  useEffect(() => { setDetailsOpen(Boolean(targetPanel)); }, [targetId, targetPanel]);

  function openThread(thread: ChatThread) {
    if (onSelectConversation) onSelectConversation(thread.id);
    else controller.openConversation(thread.id);
    setDetailsOpen(false);
  }

  function closeThread() {
    if (onSelectConversation) onSelectConversation(null);
    else controller.closeConversation();
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
        {controller.hasMoreThreads && <button type="button" className="chat-load-more" onClick={() => void controller.loadMoreThreads()} disabled={controller.loadingMoreThreads}>
          {controller.loadingMoreThreads ? "Đang tải..." : controller.threadPageError ? "Thử tải lại cuộc trò chuyện" : "Tải thêm cuộc trò chuyện"}
        </button>}
      </div>
    </aside>
    <section className={`dm-conversation-panel ${detailsOpen ? "details-open" : ""}`}>
      {controller.active ? <div className="dm-conversation-thread">
        <header className="dm-conversation-header">
          <button type="button" className="dm-mobile-back" onClick={closeThread} aria-label="Quay lại hộp thư"><ChevronLeft size={20} /></button>
          <Avatar thread={controller.active} large />
          <div><strong>{controller.active.title}</strong>{controller.active.type === "DIRECT"
            ? <ChatPresenceStatus actorId={userId} conversationId={controller.active.id} conversationType={controller.active.type} />
            : <small>{controller.active.isDissolved ? "Nhóm đã giải tán" : "Cuộc trò chuyện"}</small>}</div>
          <div className="dm-header-actions"><button type="button" onClick={() => setDetailsOpen((value) => !value)} aria-label="Chi tiết cuộc trò chuyện" aria-expanded={detailsOpen}><MoreHorizontal size={20} /></button></div>
        </header>
        <PinnedMessagesBar key={`${userId}/${controller.activeId}`} controller={controller} />
        <ChatMessageList controller={controller} userId={userId} onOpenMedia={openViewer} onOpenStory={onOpenStory} />
        <ChatComposer controller={controller} />
      </div> : controller.activeId ? <div className="chat-state">{controller.conversationState === "error" ? <div role="alert">Không thể mở cuộc trò chuyện.<button onClick={controller.retryConversation}>Thử lại</button></div> : <div role="status">Đang tải cuộc trò chuyện…</div>}<button onClick={closeThread}>Quay lại hộp thư</button></div> : <div className="dm-empty-state"><span className="dm-empty-icon"><MessageCircle size={27} /></span><h2>Tin nhắn của bạn</h2><p>Chọn một cuộc trò chuyện hoặc bắt đầu tin nhắn mới.</p><button type="button" onClick={() => setNewChatOpen(true)}>Gửi tin nhắn</button></div>}
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
        onConversationRemoved={() => { closeThread(); void controller.loadThreads(); }}
        onConversationDissolved={() => void controller.loadThreads(controller.activeId || undefined)}
      />}
    </section>
    {newChatOpen && <NewConversationDialog userId={userId} onClose={() => setNewChatOpen(false)} onCreated={(thread) => { setNewChatOpen(false); openThread(thread); void controller.loadThreads(); }} />}
    {viewer && <ChatMediaViewer items={viewer.items} initialIndex={viewer.index} onClose={closeViewer} />}
  </section>;
}
