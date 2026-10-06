import { ChevronLeft, FileText, Image as ImageIcon, LoaderCircle, Video, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { apiGet } from "../../../shared/api";
import { ChatAudioPlayer, ChatMediaViewer, type ChatViewerItem } from "./ChatMediaExperience";
import "../styles/messaging-advanced.css";

type MediaMetadata = { url?: string | null; publicId?: string | null; mimeType?: string | null; fileName?: string | null; duration?: number | null };
type ConversationMedia = { messageId: string; messageSeq: number; messageType: string; media?: MediaMetadata | null; createdAt?: string | null };
type MediaPage = { items: ConversationMedia[]; nextCursor?: string | null; hasMore: boolean };
type MediaCategory = "IMAGE" | "VIDEO" | "FILE_AUDIO";

function mediaDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Không rõ ngày";
}

export function ConversationMediaBrowser({ actorId, conversationId }: { actorId: string; conversationId: string }) {
  const [category, setCategory] = useState<MediaCategory>("IMAGE");
  const [items, setItems] = useState<ConversationMedia[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [viewer, setViewer] = useState<{ items: ChatViewerItem[]; index: number } | null>(null);
  const requestVersion = useRef(0);
  const cursorRef = useRef<string | null>(null);
  const hasMoreRef = useRef(false);
  const loadingRef = useRef(false);

  const load = useCallback(async (reset: boolean) => {
    if (!reset && (!hasMoreRef.current || loadingRef.current)) return;
    if (reset) {
      cursorRef.current = null;
      hasMoreRef.current = false;
      setItems([]);
      setHasMore(false);
      setViewer(null);
    }
    const version = ++requestVersion.current;
    loadingRef.current = true;
    setState("loading");
    const before = reset ? "" : cursorRef.current ? `&beforeSeq=${encodeURIComponent(cursorRef.current)}` : "";
    try {
      const page = await apiGet<MediaPage>(`/chat/conversations/${encodeURIComponent(conversationId)}/media?actorId=${encodeURIComponent(actorId)}&category=${category}&limit=30${before}`);
      if (version !== requestVersion.current) return;
      loadingRef.current = false;
      setItems((current) => reset ? page.items ?? [] : [...current, ...(page.items ?? [])]);
      cursorRef.current = page.nextCursor ?? null;
      hasMoreRef.current = Boolean(page.hasMore);
      setHasMore(hasMoreRef.current);
      setState("ready");
    } catch {
      if (version === requestVersion.current) { loadingRef.current = false; setState("error"); }
    }
  }, [actorId, category, conversationId]);

  useEffect(() => {
    void load(true);
    return () => { requestVersion.current += 1; };
  }, [load]);

  const grouped = useMemo(() => items.reduce<Record<string, ConversationMedia[]>>((groups, item) => {
    const date = mediaDate(item.createdAt);
    (groups[date] ??= []).push(item);
    return groups;
  }, {}), [items]);

  function openMedia(item: ConversationMedia) {
    const viewable = items.filter((media) => (media.messageType === "IMAGE" || media.messageType === "VIDEO") && media.media?.url);
    const viewerItems: ChatViewerItem[] = viewable.map((media) => ({
      url: media.media!.url!,
      type: media.messageType === "VIDEO" ? "VIDEO" : "IMAGE",
      alt: media.media?.fileName || "Ảnh, video trong cuộc trò chuyện",
    }));
    const index = viewable.findIndex((media) => media.messageId === item.messageId);
    if (index >= 0) setViewer({ items: viewerItems, index });
  }

  return <>
    <section className="conversation-media-browser">
      <nav aria-label="Lọc nội dung đa phương tiện">{(["IMAGE", "VIDEO", "FILE_AUDIO"] as MediaCategory[]).map((value) => <button type="button" key={value} className={category === value ? "active" : ""} aria-pressed={category === value} onClick={() => setCategory(value)}>{value === "IMAGE" ? "Ảnh" : value === "VIDEO" ? "Video" : "Tệp & âm thanh"}</button>)}</nav>
      {state === "loading" && items.length === 0 && <LoaderCircle className="spin" aria-label="Đang tải nội dung" />}
      {state === "error" && <button type="button" onClick={() => void load(true)}>Không thể tải · Thử lại</button>}
      {state === "ready" && items.length === 0 && <p>Chưa có nội dung trong mục này.</p>}
      {Object.entries(grouped).map(([date, datedItems]) => <div className="conversation-media-date" key={date}><h3>{date}</h3><div>{datedItems.map((item) => item.messageType === "IMAGE" ? <button type="button" className="conversation-media-tile" key={item.messageId} onClick={() => openMedia(item)} aria-label={`Mở ảnh ${item.media?.fileName || "trong cuộc trò chuyện"}`}><img src={item.media?.url ?? ""} alt={item.media?.fileName ?? "Ảnh"} /></button> : item.messageType === "VIDEO" ? <button type="button" className="conversation-media-tile video" key={item.messageId} onClick={() => openMedia(item)} aria-label={`Phát video ${item.media?.fileName || "trong cuộc trò chuyện"}`}><video src={item.media?.url ?? ""} preload="metadata" muted /><Video size={18} /></button> : item.messageType === "AUDIO" && item.media?.url ? <div className="conversation-media-audio" key={item.messageId}><ChatAudioPlayer src={item.media.url} durationHint={item.media.duration} /></div> : <a className="conversation-media-file" key={item.messageId} href={item.media?.url ?? undefined} target="_blank" rel="noreferrer"><FileText size={19} /><span>{item.media?.fileName || "Tệp đính kèm"}</span></a>)}</div></div>)}
      {hasMore && <button type="button" className="conversation-media-more" onClick={() => void load(false)} disabled={state === "loading"}>{state === "loading" ? "Đang tải..." : "Xem thêm"}</button>}
    </section>
    {viewer && <ChatMediaViewer items={viewer.items} initialIndex={viewer.index} onClose={() => setViewer(null)} />}
  </>;
}

export function ConversationMediaDialog({ actorId, conversationId, title, onClose }: {
  actorId: string; conversationId: string; title: string; onClose: () => void;
}) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return createPortal(<div className="conversation-media-dialog-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="conversation-media-dialog" role="dialog" aria-modal="true" aria-label="Ảnh, video và đa phương tiện">
      <header><button type="button" onClick={onClose} aria-label="Quay lại"><ChevronLeft size={20} /></button><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Đóng"><X size={19} /></button></header>
      <ConversationMediaBrowser actorId={actorId} conversationId={conversationId} />
    </section>
  </div>, document.body);
}
