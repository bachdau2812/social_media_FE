import { Heart, RefreshCw, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "../../../shared/components";
import { storyApi } from "../api/story.api";
import type { StoryViewerDto } from "../model/story.dto";
import "./story-viewers-panel.css";

export function StoryViewersPanel({ storyId, ownerId, onClose, onOpenProfile }: { storyId: string; ownerId: string; onClose: () => void; onOpenProfile: (userId: string) => void }) {
  const [items, setItems] = useState<StoryViewerDto[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const load = useCallback(async (nextPage = 0) => {
    setStatus("loading");
    try {
      const result = await storyApi.viewers(storyId, ownerId, nextPage, 20);
      setItems((current) => nextPage === 0 ? result.content : [...current, ...result.content]);
      setPage(result.pageNumber);
      setTotal(result.totalElements);
      setHasMore(result.pageNumber + 1 < result.totalPages);
      setStatus("ready");
    } catch { setStatus("error"); }
  }, [ownerId, storyId]);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [onClose]);
  return <aside className="story-viewers-panel" aria-label="Danh sách người xem Story"><header><div><strong>Người xem</strong><span>{total} lượt xem</span></div><button onClick={onClose} aria-label="Đóng"><X size={19} /></button></header><div className="story-viewers-list">{items.map((item) => <button key={`${item.userId}-${item.viewedAt}`} onClick={() => onOpenProfile(item.userId)}><Avatar src={item.avatarUrl ?? ""} name={item.fullName || item.username || item.userId} alt={item.fullName || item.username || item.userId} /><span><strong>{item.fullName || item.username || item.userId}</strong><small>{item.username ? `@${item.username}` : ""}</small><time>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.viewedAt))}</time></span>{item.reaction && <em><Heart size={13} fill="currentColor" />{item.reaction}</em>}</button>)}{status === "loading" && <div className="story-viewers-loading">Đang tải...</div>}{status === "error" && <button className="story-viewers-retry" onClick={() => void load(page)}><RefreshCw size={16} />Thử lại</button>}{status === "ready" && !items.length && <p>Chưa có ai xem Story này.</p>}{hasMore && status === "ready" && <button className="story-viewers-more" onClick={() => void load(page + 1)}>Xem thêm</button>}</div></aside>;
}
