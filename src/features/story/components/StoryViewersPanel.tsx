import { Heart, RefreshCw, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Spinner } from "../../../shared/components";
import { profileApi } from "../../profile";
import { storyApi } from "../api/story.api";
import type { StoryViewerDto } from "../model/story.dto";
import "./story-viewers-panel.css";
import { MobileSheet } from '../../../shared/overlays/MobileSheet';
import { useLocalSheetHistory } from '../../../shared/overlays/useLocalSheetHistory';
import { useViewportMode } from '../../../shared/hooks/useViewportMode';

type Props = {
  storyId: string;
  ownerId: string;
  onTotalChange: (total: number) => void;
  onClose: () => void;
  onOpenProfile: (userId: string) => void;
};

export function StoryViewersPanel({ storyId, ownerId, onTotalChange, onClose, onOpenProfile }: Props) {
  const mobile = useViewportMode() === 'mobile';
  const dismiss = useLocalSheetHistory(`story-viewers-${storyId}`, onClose, mobile);
  const [items, setItems] = useState<StoryViewerDto[]>([]);
  const [search, setSearch] = useState("");
  const query = search.trim();
  const [page, setPage] = useState(0);
  const [failedPage, setFailedPage] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [matches, setMatches] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [pendingFollows, setPendingFollows] = useState<Set<string>>(new Set());
  const [followErrors, setFollowErrors] = useState<Record<string, string>>({});
  const loadingRef = useRef(false);
  const mountedRef = useRef(false);
  const requestRef = useRef(0);
  const followingRef = useRef(new Map<string, boolean>());
  const pendingFollowRef = useRef(new Set<string>());
  const onTotalChangeRef = useRef(onTotalChange);

  useEffect(() => { onTotalChangeRef.current = onTotalChange; }, [onTotalChange]);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
      loadingRef.current = false;
    };
  }, []);

  const load = useCallback(async (nextPage = 0) => {
    if (loadingRef.current) return;
    const request = ++requestRef.current;
    loadingRef.current = true;
    setStatus("loading");
    try {
      const result = query
        ? await storyApi.viewers(storyId, ownerId, nextPage, 20, query)
        : await storyApi.viewers(storyId, ownerId, nextPage, 20);
      if (!mountedRef.current || request !== requestRef.current) return;
      const content = result.content.map((item) => followingRef.current.has(item.userId)
        ? { ...item, viewerFollowsUser: followingRef.current.get(item.userId) }
        : item);
      setItems((current) => nextPage === 0 ? content : [...current, ...content.filter((item) => !current.some((existing) => existing.userId === item.userId))]);
      setPage(result.pageNumber);
      setFailedPage(null);
      setMatches(result.totalElements);
      setHasMore(result.pageNumber + 1 < result.totalPages);
      if (!query) {
        setTotal(result.totalElements);
        onTotalChangeRef.current(result.totalElements);
      }
      setStatus("ready");
    } catch {
      if (!mountedRef.current || request !== requestRef.current) return;
      setFailedPage(nextPage);
      setStatus("error");
    } finally {
      if (request === requestRef.current) loadingRef.current = false;
    }
  }, [ownerId, storyId, query]);

  useEffect(() => {
    requestRef.current += 1;
    loadingRef.current = false;
    setItems([]);
    setMatches(null);
    setHasMore(false);
    setFailedPage(null);
    setStatus("loading");
    if (!query) {
      void load();
      return;
    }
    const timer = window.setTimeout(() => void load(), 250);
    return () => window.clearTimeout(timer);
  }, [load, query]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [dismiss, mobile]);

  const changeSearch = (value: string) => {
    setSearch(value);
    if (value.trim() === query) return;
    // Invalidate immediately: an old response must not populate a new search.
    requestRef.current += 1;
    loadingRef.current = false;
    setItems([]);
    setStatus("loading");
    setMatches(null);
    setHasMore(false);
  };

  const toggleFollow = async (item: StoryViewerDto) => {
    if (pendingFollowRef.current.has(item.userId) || typeof item.viewerFollowsUser !== "boolean") return;
    pendingFollowRef.current.add(item.userId);
    setPendingFollows(new Set(pendingFollowRef.current));
    setFollowErrors((current) => ({ ...current, [item.userId]: "" }));
    const following = !item.viewerFollowsUser;
    try {
      if (following) await profileApi.follow(ownerId, item.userId);
      else await profileApi.unfollow(ownerId, item.userId);
      if (!mountedRef.current) return;
      followingRef.current.set(item.userId, following);
      setItems((current) => current.map((viewer) => viewer.userId === item.userId ? { ...viewer, viewerFollowsUser: following } : viewer));
    } catch {
      if (mountedRef.current) setFollowErrors((current) => ({ ...current, [item.userId]: "Không thể cập nhật theo dõi. Thử lại nhé." }));
    } finally {
      pendingFollowRef.current.delete(item.userId);
      if (mountedRef.current) setPendingFollows(new Set(pendingFollowRef.current));
    }
  };

  const content = <div
    className="story-viewers-backdrop"
    onPointerDown={(event) => event.stopPropagation()}
    onKeyDown={(event) => { if (event.key !== "Escape") event.stopPropagation(); }}
    onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}
  >
    <aside className="story-viewers-panel" role={mobile ? undefined : 'dialog'} aria-modal={mobile ? undefined : true} aria-label="Danh sách người xem Story">
      {!mobile && <div className="story-viewers-handle" aria-hidden="true" />}
      {!mobile && <header className="story-viewers-header">
        <h2>Lượt thích và lượt xem</h2>
        <button type="button" onClick={onClose} aria-label="Đóng danh sách người xem"><X size={20} aria-hidden="true" /></button>
      </header>}
      <div className="story-viewers-toolbar">
        <div className="story-viewers-section-title">
          <h3>Người xem</h3>
          {total !== null && <span aria-label="Tổng số người xem">{total} lượt xem</span>}
        </div>
        <div className="story-viewers-search">
          <Search size={18} aria-hidden="true" />
          <input type="search" aria-label="Tìm kiếm người xem" placeholder="Tìm kiếm" value={search} onChange={(event) => changeSearch(event.target.value)} />
          {search && <button type="button" aria-label="Xóa tìm kiếm" onClick={() => changeSearch("")}><X size={16} aria-hidden="true" /></button>}
        </div>
        {query && matches !== null && <small className="story-viewers-match-count" role="status">{matches} kết quả</small>}
      </div>
      <div className="story-viewers-list" aria-busy={status === "loading"}>
        {items.map((item) => {
          const name = item.username || item.fullName || item.userId;
          const following = item.viewerFollowsUser;
          const pending = pendingFollows.has(item.userId);
          return <div className="story-viewer-row" key={item.userId}>
            <button type="button" className="story-viewer-profile" aria-label={`Xem trang cá nhân của ${name}`} onClick={() => dismiss(() => onOpenProfile(item.userId))}>
              <Avatar className="story-viewer-avatar" src={item.avatarUrl ?? ""} name={name} alt={name} />
              <span className="story-viewer-identity">
                <strong>{name}</strong>
                {item.fullName && item.fullName !== name && <small>{item.fullName}</small>}
              </span>
              {item.reaction && <span className="story-viewer-reaction" role="img" aria-label={`Phản ứng: ${item.reaction}`}><Heart size={16} fill="currentColor" aria-hidden="true" /></span>}
            </button>
            {item.userId !== ownerId && typeof following === "boolean" && <button
              type="button" className={`story-viewer-follow${following ? " is-following" : ""}`}
              aria-label={`${following ? "Bỏ theo dõi" : "Theo dõi"} ${name}`}
              disabled={pending} onClick={() => void toggleFollow(item)}
            >{pending ? <Spinner label="Đang cập nhật theo dõi" /> : following ? "Đang theo dõi" : "Theo dõi"}</button>}
            {followErrors[item.userId] && <small className="story-viewer-follow-error" role="alert">{followErrors[item.userId]}</small>}
          </div>;
        })}
        {status === "loading" && <div className="story-viewers-loading"><Spinner label="Đang tải danh sách người xem" /></div>}
        {status === "error" && <div className="story-viewers-error" role="alert">
          <span>Không thể tải danh sách người xem.</span>
          <button type="button" className="story-viewers-retry" onClick={() => void load(failedPage ?? 0)}><RefreshCw size={16} />Thử lại</button>
        </div>}
        {status === "ready" && !items.length && <p>{query ? "Không tìm thấy người xem phù hợp." : "Chưa có ai xem Story này."}</p>}
        {hasMore && status === "ready" && <button type="button" className="story-viewers-more" onClick={() => void load(page + 1)}>Xem thêm</button>}
      </div>
    </aside>
  </div>;
  return mobile ? <MobileSheet title="Lượt thích và lượt xem" ariaLabel="Danh sách người xem Story" closeLabel="Đóng danh sách người xem" onClose={dismiss} className="story-viewers-sheet">{content}</MobileSheet> : content;
}
