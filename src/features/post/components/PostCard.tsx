import { Archive, Check, ChevronLeft, ChevronRight, MessageCircle, MoreHorizontal, PenLine, Repeat2, Volume2, VolumeX, X } from "lucide-react";
import { type MouseEvent, type RefCallback, useCallback, useEffect, useId, useRef, useState } from "react";
import { Avatar as SharedAvatar } from "../../../shared/components";
import type { Post } from "../model/post.types";
import { postMediaRatioValue } from "../model/postMediaRatio";
import { FEED_MUSIC_SUSPEND_EVENT, reportFeedMusicVisibility, subscribeFeedMusicOwner } from "../model/feedMusicCoordinator";
import { formatRelativeTime } from "../../../shared/utils";
import { PostVideoPlayer } from "./PostVideoPlayer";
import { AdjacentPostMediaPreloads } from "./AdjacentPostMediaPreloads";
import { usePostInteraction } from "../hooks/usePostInteraction";
import { useForegroundOverlay } from "../../../shared/overlays/useForegroundOverlay";
import { ActionBar, EngagementListModal } from "./PostEngagement";
import { useSheetHistoryRestore } from '../../../shared/overlays/useLocalSheetHistory';
function Avatar({ src, label }: { src?: string; label: string }) { return <SharedAvatar src={src} name={label} alt={label} />; }
function MusicIcon() { return <Volume2 size={18} />; }
function activeMediaSupportsMusic(media: Post["media"][number]) { return media.type !== "VIDEO"; }

export function PostCard({ post, index, viewerId, onOpen, onToggle, onEdit, onArchive, onOpenProfile }: { post: Post; index: number; viewerId: string; onOpen: () => void; onToggle: (postId: string, key: "liked" | "saved" | "reposted") => void; onEdit: () => void; onArchive: () => Promise<void>; onOpenProfile: (userId: string) => Promise<void> }) {
  const [expanded, setExpanded] = useState(false);
  const engagementOwnerId = useId();
  const [engagementKind, setEngagementKind] = useState<"LIKES" | "REPOSTS" | null>(null);
  useSheetHistoryRestore(id => { if (id === `post-${post.id}-card-${engagementOwnerId}-LIKES`) setEngagementKind('LIKES'); if (id === `post-${post.id}-card-${engagementOwnerId}-REPOSTS`) setEngagementKind('REPOSTS'); });
  const [menuOpen, setMenuOpen] = useState(false);
  const interaction = usePostInteraction(post.id, viewerId, "feed", Boolean(engagementKind));
  useForegroundOverlay(Boolean(engagementKind));
  function openPost() { interaction.click(); onOpen(); }
  const captionLimit = 180;
  const captionNeedsExpansion = post.caption.length > captionLimit;
  const rawCaptionPreview = post.caption.slice(0, captionLimit).trim();
  const wordSafePreview = rawCaptionPreview.replace(/\s+\S*$/, "").trim();
  const caption = expanded || !captionNeedsExpansion ? post.caption : `${wordSafePreview || rawCaptionPreview}...`;
  const repostActivity = post.feedActivity?.type === "REPOST" && post.feedActivity.actor
    ? post.feedActivity
    : undefined;
  useEffect(() => setExpanded(false), [post.id]);
  function openAuthor(event: MouseEvent<HTMLButtonElement>) { event.stopPropagation(); void onOpenProfile(post.author.id); }
  function openReposter(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (repostActivity?.actor) void onOpenProfile(repostActivity.actor.id);
  }
  return <article className={`post-card ${post.layoutVariant.toLowerCase()}`}>
    <div className="post-index">{String(index).padStart(2, "0")}</div>
    {repostActivity && <div className="post-repost-context">
      <button
        type="button"
        aria-label={`${repostActivity.actor?.displayName} đã đăng lại bài viết`}
        onClick={openReposter}
      >
        <Repeat2 size={15} aria-hidden="true" />
        <strong>{repostActivity.actor?.displayName}</strong>
        <span>đã đăng lại bài viết</span>
      </button>
      <time dateTime={repostActivity.occurredAt}>{formatRelativeTime(repostActivity.occurredAt)}</time>
    </div>}
    <header className="post-author"><button className="author-button" onClick={openAuthor}><Avatar src={post.author.avatarUrl} label={post.author.username} /><span><strong>{post.author.username} <small className="post-author-time">• {formatRelativeTime(post.createdAt)}</small></strong>{post.music && <small className="post-author-music"><MusicIcon /> {post.music.displayName}</small>}</span>{post.author.relationship === "FRIEND" && <Check className="verified-badge" size={14} />}</button><span className="post-menu-anchor"><button className="icon-button" aria-label="Post menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><MoreHorizontal size={20} /></button>{menuOpen && <span className="post-menu-popover">{post.author.id === viewerId && <><button type="button" onClick={() => { setMenuOpen(false); onEdit(); }}><PenLine size={16} /> Chỉnh sửa</button><button type="button" onClick={() => { setMenuOpen(false); void onArchive(); }}><Archive size={16} /> Kho lưu trữ</button></>}<button type="button" onClick={() => setMenuOpen(false)}><X size={16} /> Đóng</button></span>}</span></header>
    <PostMediaCarousel post={post} onOpen={openPost} interactionRef={interaction.ref} />
    <ActionBar post={post} onToggle={onToggle} onComment={openPost} onOpenEngagement={setEngagementKind} />
    <div className="post-content">
      {post.caption && <p className={expanded ? "feed-caption expanded" : "feed-caption collapsed"}><button onClick={openAuthor}>@{post.author.username}</button> {caption}{captionNeedsExpansion && <button className="text-action" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "Less" : "More"}</button>}</p>}
      {Boolean(post.hashtags?.length) && <div className="hashtag-row">{post.hashtags?.slice(0, 5).map((tag) => <span key={tag}>#{tag}</span>)}</div>}
      {post.comments[0] && <button className="comment-preview" onClick={openPost}><strong>@{post.comments[0].author}</strong> {post.comments[0].text}</button>}
      <div className="post-meta"><time>{formatRelativeTime(post.createdAt)}</time></div>
    </div>
    {engagementKind && <EngagementListModal postId={post.id} kind={engagementKind} viewerId={viewerId} sheetId={`post-${post.id}-card-${engagementOwnerId}-${engagementKind}`} onClose={() => setEngagementKind(null)} onOpenProfile={onOpenProfile} />}
  </article>;
}

function FeedMediaLayer({ media, className, interactive = false, playbackEligible = false }: { media: Post["media"][number]; className: string; interactive?: boolean; playbackEligible?: boolean }) {
  return <span className={className} aria-hidden={interactive ? undefined : true}>
    {media.type === "VIDEO"
      ? <PostVideoPlayer source={media.url} eligible={interactive && playbackEligible} preload={interactive && playbackEligible ? "auto" : "none"} />
      : <img src={media.url} alt={interactive ? media.alt : ""} draggable={false} loading="lazy" decoding="async" />}
  </span>;
}

function PostMediaCarousel({ post, onOpen, interactionRef }: { post: Post; onOpen: () => void; interactionRef: RefCallback<HTMLElement> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousMediaIndex, setPreviousMediaIndex] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "previous">("next");
  const [playbackActive, setPlaybackActive] = useState(false);
  const [feedSuspended, setFeedSuspended] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<{ x: number; y: number; axis: 'x' | 'y' | null } | null>(null);
  const suppressClickRef = useRef(false);
  const setFrameRef = useCallback((node: HTMLDivElement | null) => {
    frameRef.current = node;
    interactionRef(node);
  }, [interactionRef]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackKeyRef = useRef<string | null>(null);
  const playbackPositions = useRef<Map<string, number>>(new Map());
  const transitionTimerRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);
  const activeMedia = post.media[activeIndex];
  const previousMedia = previousMediaIndex === null ? null : post.media[previousMediaIndex];
  const activeMusic = post.music ?? activeMedia?.music ?? null;
  const playbackKey = activeMusic
    ? (post.music ? `post:${post.id}:${activeMusic.id}` : `item:${activeMedia?.id}:${activeMusic.id}`)
    : null;
  const hasMany = post.media.length > 1;
  const canPlayMusic = Boolean(activeMusic && activeMedia && activeMediaSupportsMusic(activeMedia));
  const frameAspectRatio = postMediaRatioValue(post.mediaRatio);

  useEffect(() => {
    const handleSuspend = (event: Event) => setFeedSuspended((event as CustomEvent<boolean>).detail);
    window.addEventListener(FEED_MUSIC_SUSPEND_EVENT, handleSuspend);
    return () => window.removeEventListener(FEED_MUSIC_SUSPEND_EVENT, handleSuspend);
  }, []);

  useEffect(() => {
    const target = frameRef.current;
    const unsubscribe = subscribeFeedMusicOwner((ownerId) => setPlaybackActive(ownerId === post.id));
    if (!target || typeof IntersectionObserver === "undefined") {
      setPlaybackActive(true);
      return unsubscribe;
    }
    const observer = new IntersectionObserver(([entry]) => {
      reportFeedMusicVisibility(post.id, entry?.isIntersecting ? entry.intersectionRatio : 0);
    }, { threshold: [0, 0.35, 0.55, 0.6, 0.8, 1] });
    observer.observe(target);
    return () => {
      observer.disconnect();
      unsubscribe();
      reportFeedMusicVisibility(post.id, 0);
    };
  }, [post.id]);
  useEffect(() => {
    const target = frameRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') { setNearViewport(true); return; }
    const observer = new IntersectionObserver(([entry]) => setNearViewport(Boolean(entry?.isIntersecting)), { rootMargin: '400px 0px' });
    observer.observe(target); return () => observer.disconnect();
  }, [post.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    return () => audio.pause();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playbackKeyRef.current === playbackKey) return;
    const previousKey = playbackKeyRef.current;
    if (previousKey && Number.isFinite(audio.currentTime)) playbackPositions.current.set(previousKey, audio.currentTime);
    audio.pause();
    playbackKeyRef.current = playbackKey;
    if (!playbackKey || !activeMusic?.playbackUrl) {
      audio.removeAttribute("src");
      audio.load();
      return;
    }
    audio.src = activeMusic.playbackUrl;
    audio.load();
    const resume = () => {
      const savedPosition = playbackPositions.current.get(playbackKey) ?? 0;
      audio.currentTime = Number.isFinite(savedPosition) && savedPosition < audio.duration ? savedPosition : 0;
      if (playbackActive && !feedSuspended && canPlayMusic) void audio.play().catch(() => undefined);
    };
    audio.addEventListener("loadedmetadata", resume, { once: true });
    return () => audio.removeEventListener("loadedmetadata", resume);
  }, [playbackKey, activeMusic?.playbackUrl, playbackActive, feedSuspended, canPlayMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = musicMuted;
  }, [musicMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playbackKey || !activeMusic?.playbackUrl || !playbackActive || feedSuspended || !canPlayMusic) {
      if (audio && playbackKeyRef.current && Number.isFinite(audio.currentTime)) playbackPositions.current.set(playbackKeyRef.current, audio.currentTime);
      audio?.pause();
      return;
    }
    void audio.play().catch(() => undefined);
  }, [playbackActive, feedSuspended, canPlayMusic, playbackKey, activeMusic?.playbackUrl]);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
    const audio = audioRef.current;
    const key = playbackKeyRef.current;
    if (audio && key && Number.isFinite(audio.currentTime)) playbackPositions.current.set(key, audio.currentTime);
  }, []);

  function move(delta: number) {
    if (transitioningRef.current) return;
    const nextIndex = Math.min(post.media.length - 1, Math.max(0, activeIndex + delta));
    if (nextIndex === activeIndex) return;
    transitioningRef.current = true;
    setTransitionDirection(delta > 0 ? "next" : "previous");
    setPreviousMediaIndex(activeIndex);
    setActiveIndex(nextIndex);
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(() => {
      setPreviousMediaIndex(null);
      transitioningRef.current = false;
    }, 320);
  }

  function toggleMusicMuted() {
    setMusicMuted((value) => !value);
    if (audioRef.current?.paused && canPlayMusic && !feedSuspended) void audioRef.current.play().catch(() => undefined);
  }

  if (!post.media.length) return <button ref={interactionRef} className="media-button text-media" onClick={onOpen}><div className="text-post" title={post.caption || "No caption"}>{post.caption || "No caption"}</div></button>;
  return <div ref={setFrameRef} className="post-media-frame" style={{ aspectRatio: frameAspectRatio, touchAction: 'pan-y pinch-zoom' }} tabIndex={0} onTouchStart={event => {
    suppressClickRef.current = false;
    const touch = event.touches[0];
    swipeRef.current = touch && event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY, axis: null } : null;
  }} onTouchMove={event => {
    const start = swipeRef.current, touch = event.touches[0];
    if (!start || !touch) return;
    const dx = Math.abs(touch.clientX - start.x), dy = Math.abs(touch.clientY - start.y);
    if (!start.axis && Math.max(dx, dy) > 12) start.axis = dx > dy * 1.4 ? 'x' : 'y';
    if (start.axis === 'x') { suppressClickRef.current = true; event.stopPropagation(); }
  }} onTouchCancel={() => { swipeRef.current = null; }} onTouchEnd={event => {
    const start = swipeRef.current, touch = event.changedTouches[0]; swipeRef.current = null;
    if (!start || !touch || start.axis !== 'x') return;
    event.stopPropagation();
    if (Math.abs(touch.clientX - start.x) > 48) move(touch.clientX < start.x ? 1 : -1);
  }} onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}>
    <div className="media-surface feed-media-stage" role="button" tabIndex={0} onClick={() => { if (suppressClickRef.current) { suppressClickRef.current = false; return; } onOpen(); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(); }}>
      {previousMedia && <FeedMediaLayer media={previousMedia} className={"feed-media-content exiting slide-" + transitionDirection} />}
      <FeedMediaLayer key={activeMedia.id} media={activeMedia} className={previousMedia ? "feed-media-content entering slide-" + transitionDirection : "feed-media-content"} interactive playbackEligible={playbackActive && !feedSuspended} />
    </div>

    {activeMedia.caption && <div key={`feed-caption-${activeMedia.id}`} className={`item-caption-thought feed-item-caption ${activeMedia.caption.length > 180 ? "long" : ""}`} tabIndex={0} role="button" aria-label={`View media caption: ${activeMedia.caption}`}><MessageCircle className="caption-trigger-icon" size={18} aria-hidden="true" /><p>{activeMedia.caption}</p></div>}
    {canPlayMusic && <button type="button" className="feed-music-mute" onClick={toggleMusicMuted} aria-label={musicMuted ? "Unmute music" : "Mute music"} aria-pressed={musicMuted}>{musicMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button>}
    {hasMany && <><button className="carousel-control previous" onClick={() => move(-1)} disabled={activeIndex === 0 || previousMediaIndex !== null} aria-label="Previous media"><ChevronLeft size={19} /></button><button className="carousel-control next" onClick={() => move(1)} disabled={activeIndex === post.media.length - 1 || previousMediaIndex !== null} aria-label="Next media"><ChevronRight size={19} /></button><span className="media-counter">{String(activeIndex + 1).padStart(2, "0")} / {String(post.media.length).padStart(2, "0")}</span><span className="media-progress"><i style={{ width: `${((activeIndex + 1) / post.media.length) * 100}%` }} /></span></>}
    <audio ref={audioRef} preload="metadata" muted={musicMuted} />
    <AdjacentPostMediaPreloads media={post.media} activeIndex={activeIndex} enabled={nearViewport && !feedSuspended} />
  </div>;
}

