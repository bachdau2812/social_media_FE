import { useEffect, useLayoutEffect, useRef } from "react";
import { PostCard, type Post } from "../../post";
import type { Profile } from "../model/profile.types";
import type { useProfilePostCollection } from "../hooks/useProfilePostCollection";
import "./profile-feed.css";

type Props = {
  viewerId: string; profile: Profile | null; selectedPostId: string; entryKey: string; restoring: boolean;
  collection: ReturnType<typeof useProfilePostCollection>; onReady?: () => void;
  onSelectPost: (post: Post) => void; onTogglePost: (id: string, key: "liked" | "saved" | "reposted") => void;
  onEditPost: (post: Post) => void; onArchivePost: (post: Post) => Promise<void>; onOpenProfile: (id: string) => Promise<void>;
};

export function ProfileFeedScreen({ viewerId, profile, selectedPostId, entryKey, restoring, collection,
  onReady, onSelectPost, onTogglePost, onEditPost, onArchivePost, onOpenProfile }: Props) {
  const items = useRef(new Map<string, HTMLDivElement>());
  const focusedEntry = useRef<string | null>(null);
  const previousLength = useRef(collection.posts.length);
  const prependAnchor = useRef<{ id: string; top: number } | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (collection.status !== "ready" || focusedEntry.current === entryKey) return;
    if (restoring) { focusedEntry.current = entryKey; onReady?.(); return; }
    if (!collection.selectedPostFound) { focusedEntry.current = entryKey; return; }
    const selected = items.current.get(selectedPostId);
    if (!selected) return;
    const headerHeight = document.querySelector(".mobile-app-header")?.getBoundingClientRect().height ?? 0;
    window.scrollTo({ top: Math.max(0, window.scrollY + selected.getBoundingClientRect().top - headerHeight - 8), behavior: "auto" });
    focusedEntry.current = entryKey;
  }, [collection.status, collection.posts, collection.selectedPostFound, entryKey, selectedPostId, restoring, onReady]);

  useLayoutEffect(() => {
    const anchor = prependAnchor.current;
    if (anchor && collection.posts.length !== previousLength.current) {
      const element = items.current.get(anchor.id);
      if (element) window.scrollBy({ top: element.getBoundingClientRect().top - anchor.top, behavior: "auto" });
      prependAnchor.current = null;
    }
    previousLength.current = collection.posts.length;
    if (!collection.loadingDirection) prependAnchor.current = null;
  }, [collection.posts, collection.loadingDirection]);

  const hydrate = collection.hydrate;
  useEffect(() => {
    if (collection.status !== "ready") return;
    if (typeof IntersectionObserver === "undefined") { void hydrate(selectedPostId); return; }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        const id = (entry.target as HTMLElement).dataset.profilePostId;
        if (id) { void hydrate(id); observer.unobserve(entry.target); }
      }
    }, { rootMargin: "600px 0px" });
    items.current.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [collection.status, collection.posts.length, hydrate, selectedPostId]);
  const loadNext = collection.loadNext;
  useEffect(() => {
    if (!collection.hasMore || collection.loadingDirection || collection.error || !sentinel.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) void loadNext(); }, { rootMargin: "400px 0px" });
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [collection.hasMore, collection.loadingDirection, collection.error, loadNext]);

  function previous() {
    const visible = [...items.current.entries()].find(([, element]) => element.getBoundingClientRect().bottom > 0);
    if (visible) prependAnchor.current = { id: visible[0], top: visible[1].getBoundingClientRect().top };
    void collection.loadPrevious();
  }
  return <section className="screen profile-feed-screen" aria-label="Bài viết của trang cá nhân" aria-busy={collection.status === "loading"}>
    <header className="profile-feed-desktop-title"><span>{profile?.username}</span><h1>Bài viết</h1></header>
    {collection.status === "loading" && <div className="profile-feed-loading" role="status">Đang tải bài viết…</div>}
    {collection.status === "error" && <div className="profile-feed-state" role="alert">{collection.error}<button onClick={() => void collection.retry()}>Thử lại</button></div>}
    {collection.status === "ready" && <>
      {!collection.selectedPostFound && <p className="profile-feed-state" role="status">Bài viết đã chọn không còn tồn tại hoặc bạn không có quyền xem.</p>}
      {collection.hasPrevious && <button className="profile-feed-page-action" disabled={Boolean(collection.loadingDirection)} onClick={previous}>{collection.loadingDirection === "previous" ? "Đang tải…" : "Tải bài viết trước"}</button>}
      {!collection.posts.length && <p className="profile-feed-state">Chưa có bài viết.</p>}
      {collection.posts.map((post, index) => <div key={post.id} data-profile-post-id={post.id} className="profile-feed-item" ref={element => { if (element) items.current.set(post.id, element); else items.current.delete(post.id); }}>
        <PostCard post={post} index={index + 1} viewerId={viewerId} onOpen={() => onSelectPost(post)} onToggle={onTogglePost}
          onEdit={() => onEditPost(post)} onArchive={() => onArchivePost(post)} onOpenProfile={onOpenProfile} />
        {collection.hydrationErrors[post.id] && <div className="profile-feed-media-error" role="alert"><span>{collection.hydrationErrors[post.id]}</span><button onClick={() => void hydrate(post.id)}>Thử tải lại media</button></div>}
      </div>)}
      {collection.error && <p className="profile-feed-state" role="alert">{collection.error}</p>}
      <div ref={sentinel} className="profile-feed-sentinel" />
      {collection.hasMore && <button className="profile-feed-page-action" disabled={Boolean(collection.loadingDirection)} onClick={() => void loadNext()}>{collection.loadingDirection === "next" ? "Đang tải…" : "Tải thêm bài viết"}</button>}
    </>}
  </section>;
}
