import { Archive, Bookmark, Check, ChevronLeft, ChevronRight, Heart, Home, Lock, MessageCircle, MoreHorizontal, Pause, PenLine, Play, RefreshCw, Repeat2, Reply, Send, Users, Volume2, VolumeX, WifiOff, X } from "lucide-react";
import { type ChangeEvent, type FormEvent, type MouseEvent, type RefCallback, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { apiGet, apiSend, uploadCloudinaryMedia } from "../../../shared/api";
import { Avatar as SharedAvatar } from "../../../shared/components";
import { validateMediaFile } from "../../../shared/media";
import type { Post } from "../model/post.types";
import type { PostDetailsDto } from "../model/post.dto";
import { mergePostDetail } from "../model/post.mapper";
import { postMediaRatioValue } from "../model/postMediaRatio";
import { FEED_MUSIC_SUSPEND_EVENT, reportFeedMusicVisibility, subscribeFeedMusicOwner } from "../model/feedMusicCoordinator";
import { formatRelativeTime } from "../../../shared/utils";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { PostDetailComposer, type CommentMediaSelection } from "./PostDetailComposer";
import { AdjacentPostMediaPreloads } from "./AdjacentPostMediaPreloads";
import { PostVideoPlayer } from "./PostVideoPlayer";
import { usePostInteraction } from "../hooks/usePostInteraction";
import { useForegroundOverlay } from "../../../shared/overlays/useForegroundOverlay";
type Page<T> = { content: T[]; pageNumber: number; totalElements: number; totalPages: number };
type PostDetails = PostDetailsDto;
type CommentDto = { id: string; postId: string; userId: string; parentId?: string | null; content?: string | null; commentType?: string | null; mediaUrl?: string | null; timestamp?: string | null; replyCount?: number; hasLiked?: boolean; username?: string | null; fullName?: string | null; avatarUrl?: string | null };
type CommentCreateResponse = { commentId: string; message?: string | null };
type CommentMediaViewer = { url: string; video: boolean };
type LikeToggleResponse = { targetId: string; targetType: string; liked: boolean; likeId?: string | null };
type CommentNode = CommentDto & { replies: CommentNode[] };
type EngagementProfileDto = { user: { userId: string; username?: string | null; fullName?: string | null }; currentAvatar?: { secureUrl?: string | null; url?: string | null } | null };
type EngagementPerson = { id: string; username: string; displayName: string; avatarUrl: string };

function Avatar({ src, label }: { src?: string; label: string }) { return <SharedAvatar src={src} name={label} alt={label} />; }
function MusicIcon() { return <Volume2 size={18} />; }
function createClientMessageId() { return window.crypto.randomUUID(); }
function formatCount(value: number) { return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : String(value); }
function sortComments(items: CommentDto[], mode: "RELEVANT" | "RECENT") { return [...items].sort((left, right) => { if (mode === "RELEVANT") { const leftReplies = items.filter((item) => item.parentId === left.id).length; const rightReplies = items.filter((item) => item.parentId === right.id).length; if (leftReplies !== rightReplies) return rightReplies - leftReplies; } return new Date(right.timestamp ?? 0).getTime() - new Date(left.timestamp ?? 0).getTime(); }); }
function buildCommentTree(items: CommentDto[], mode: "RELEVANT" | "RECENT") { const nodes = new Map<string, CommentNode>(); sortComments(items, mode).forEach((item) => nodes.set(item.id, { ...item, replies: [] })); const roots: CommentNode[] = []; nodes.forEach((node) => { if (node.parentId && nodes.has(node.parentId)) nodes.get(node.parentId)?.replies.push(node); else roots.push(node); }); return roots; }
function isVideoMediaUrl(url: string) { return /\/video\/upload\/|\.(mp4|webm|mov|m4v)(?:$|\?)/i.test(url); }
export function PostCard({ post, index, viewerId, onOpen, onToggle, onEdit, onArchive, onOpenProfile }: { post: Post; index: number; viewerId: string; onOpen: () => void; onToggle: (postId: string, key: "liked" | "saved" | "reposted") => void; onEdit: () => void; onArchive: () => Promise<void>; onOpenProfile: (userId: string) => Promise<void> }) {
  const [expanded, setExpanded] = useState(false);
  const [engagementKind, setEngagementKind] = useState<"LIKES" | "REPOSTS" | null>(null);
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
    {engagementKind && <EngagementListModal postId={post.id} kind={engagementKind} viewerId={viewerId} onClose={() => setEngagementKind(null)} onOpenProfile={onOpenProfile} />}
  </article>;
}

function FeedMediaLayer({ media, className, interactive = false, playbackEligible = false }: { media: Post["media"][number]; className: string; interactive?: boolean; playbackEligible?: boolean }) {
  return <span className={className} aria-hidden={interactive ? undefined : true}>
    {media.type === "VIDEO"
      ? <PostVideoPlayer source={media.url} eligible={interactive && playbackEligible} preload={interactive ? "auto" : "metadata"} />
      : <img src={media.url} alt={interactive ? media.alt : ""} draggable={false} />}
  </span>;
}function PostMediaCarousel({ post, onOpen, interactionRef }: { post: Post; onOpen: () => void; interactionRef: RefCallback<HTMLElement> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousMediaIndex, setPreviousMediaIndex] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "previous">("next");
  const [playbackActive, setPlaybackActive] = useState(false);
  const [feedSuspended, setFeedSuspended] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  const frameRef = useRef<HTMLDivElement | null>(null);
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
  return <div ref={setFrameRef} className="post-media-frame" style={{ aspectRatio: frameAspectRatio }} tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}>
    <div className="media-surface feed-media-stage" role="button" tabIndex={0} onClick={onOpen} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(); }}>
      {previousMedia && <FeedMediaLayer media={previousMedia} className={"feed-media-content exiting slide-" + transitionDirection} />}
      <FeedMediaLayer key={activeMedia.id} media={activeMedia} className={previousMedia ? "feed-media-content entering slide-" + transitionDirection : "feed-media-content"} interactive playbackEligible={playbackActive && !feedSuspended} />
    </div>

    {activeMedia.caption && <div key={`feed-caption-${activeMedia.id}`} className={`item-caption-thought feed-item-caption ${activeMedia.caption.length > 180 ? "long" : ""}`} tabIndex={0} role="button" aria-label={`View media caption: ${activeMedia.caption}`}><MessageCircle className="caption-trigger-icon" size={18} aria-hidden="true" /><p>{activeMedia.caption}</p></div>}
    {canPlayMusic && <button type="button" className="feed-music-mute" onClick={toggleMusicMuted} aria-label={musicMuted ? "Unmute music" : "Mute music"} aria-pressed={musicMuted}>{musicMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button>}
    {hasMany && <><button className="carousel-control previous" onClick={() => move(-1)} disabled={activeIndex === 0 || previousMediaIndex !== null} aria-label="Previous media"><ChevronLeft size={19} /></button><button className="carousel-control next" onClick={() => move(1)} disabled={activeIndex === post.media.length - 1 || previousMediaIndex !== null} aria-label="Next media"><ChevronRight size={19} /></button><span className="media-counter">{String(activeIndex + 1).padStart(2, "0")} / {String(post.media.length).padStart(2, "0")}</span><span className="media-progress"><i style={{ width: `${((activeIndex + 1) / post.media.length) * 100}%` }} /></span></>}
    <audio ref={audioRef} preload="metadata" muted={musicMuted} />
    <AdjacentPostMediaPreloads media={post.media} activeIndex={activeIndex} />
  </div>;
}function ActionBar({ post, onToggle, onComment, onOpenEngagement, showCounts = true }: { post: Post; onToggle: (postId: string, key: "liked" | "saved" | "reposted") => void; onComment?: () => void; onOpenEngagement?: (kind: "LIKES" | "REPOSTS") => void; showCounts?: boolean }) {
  return <div className="action-bar">
    <div className="engagement-action"><button className={post.viewerState.liked ? "active like-active" : "like-action"} onClick={() => onToggle(post.id, "liked")} aria-label="Like"><Heart size={21} fill={post.viewerState.liked ? "currentColor" : "none"} /></button>{showCounts && <button className="engagement-count" onClick={() => onOpenEngagement?.("LIKES")} aria-label={`View ${post.engagement.likes} likes`}>{formatCount(post.engagement.likes)}</button>}</div>
    <div className="engagement-action"><button onClick={onComment} aria-label="Comment"><MessageCircle size={21} /></button>{showCounts && <button className="engagement-count" onClick={onComment} aria-label={`Open ${post.engagement.comments} comments`}>{formatCount(post.engagement.comments)}</button>}</div>
    <div className="engagement-action"><button className={post.viewerState.reposted ? "active repost-active" : "repost-action"} onClick={() => onToggle(post.id, "reposted")} aria-label="Repost"><RefreshCw size={21} /></button>{showCounts && <button className="engagement-count" onClick={() => onOpenEngagement?.("REPOSTS")} aria-label={`View ${post.engagement.reposts} reposts`}>{formatCount(post.engagement.reposts)}</button>}</div>
    <button className={post.viewerState.saved ? "active save-action" : "save-action"} onClick={() => onToggle(post.id, "saved")} aria-label="Save"><Bookmark size={21} fill={post.viewerState.saved ? "currentColor" : "none"} /></button>
  </div>;
}
function EngagementListModal({ postId, kind, viewerId, onClose, onOpenProfile }: { postId: string; kind: "LIKES" | "REPOSTS"; viewerId: string; onClose: () => void; onOpenProfile: (userId: string) => Promise<void> }) {
  const [people, setPeople] = useState<EngagementPerson[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let active = true;
    const endpoint = kind === "LIKES"
      ? `/likes/targets/${encodeURIComponent(postId)}/actors?targetType=POST&page=0&size=40`
      : `/posts/${encodeURIComponent(postId)}/reposts/actors?page=0&size=40`;
    setState("loading");
    apiGet<Page<string>>(endpoint)
      .then((page) => Promise.all((page.content ?? []).map((userId) => apiGet<EngagementProfileDto>(`/profiles/${encodeURIComponent(userId)}/summary?viewerId=${encodeURIComponent(viewerId)}&postLimit=1`).catch(() => null))))
      .then((profiles) => { if (active) { setPeople(profiles.filter((item): item is EngagementProfileDto => Boolean(item)).map((item) => ({ id: item.user.userId, username: item.user.username || item.user.userId, displayName: item.user.fullName || item.user.username || item.user.userId, avatarUrl: item.currentAvatar?.secureUrl || item.currentAvatar?.url || "" }))); setState("ready"); } })
      .catch(() => { if (active) setState("error"); });
    return () => { active = false; };
  }, [kind, postId, viewerId]);
  return <div className="engagement-modal-backdrop" role="dialog" aria-modal="true" aria-label={kind === "LIKES" ? "People who liked this post" : "People who reposted this post"} onClick={onClose}>
    <section className="engagement-modal" onClick={(event) => event.stopPropagation()}>
      <header><strong>{kind === "LIKES" ? "Likes" : "Reposts"}</strong><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></header>
      <div className="engagement-people-list">
        {state === "loading" && <div className="engagement-list-loading"><span /><span /><span /></div>}
        {state === "error" && <div className="engagement-list-state"><WifiOff size={20} /><strong>Could not load people</strong></div>}
        {state === "ready" && people.length === 0 && <div className="engagement-list-state"><Users size={20} /><strong>No people yet</strong></div>}
        {state === "ready" && people.map((person) => <button key={person.id} className="engagement-person" onClick={() => { onClose(); void onOpenProfile(person.id); }}><Avatar src={person.avatarUrl} label={person.username} /><span><strong>{person.displayName}</strong><small>@{person.username}</small></span><ChevronRight size={16} /></button>)}
      </div>
    </section>
  </div>;
}function FeedState({ icon: Icon, title, detail }: { icon: typeof Home; title: string; detail: string }) { return <div className="feed-state"><Icon size={24} /><strong>{title}</strong><span>{detail}</span></div>; }
export function PostDetail({ post, viewerId, targetCommentId, onClose, onTogglePost, onCommentCreated, onEdit, onArchive, onOpenProfile }: { post: Post; viewerId: string; targetCommentId?: string | null; onClose: () => void; onTogglePost: (postId: string, key: "liked" | "saved" | "reposted") => void; onCommentCreated: (postId: string) => void; onEdit: () => void; onArchive: () => void; onOpenProfile: (userId: string) => Promise<void> }) {
  useBodyScrollLock(true);
  const [detailPost, setDetailPost] = useState(post);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [commentState, setCommentState] = useState<"loading" | "ready" | "error">("loading");
  const [detailMediaReady, setDetailMediaReady] = useState(false);
  const [engagementKind, setEngagementKind] = useState<"LIKES" | "REPOSTS" | null>(null);
  const [expandedCommentMedia, setExpandedCommentMedia] = useState<CommentMediaViewer | null>(null);
  const interactionOverlayOpen = Boolean(engagementKind || expandedCommentMedia);
  const interaction = usePostInteraction(post.id, viewerId, "detail", interactionOverlayOpen);
  useForegroundOverlay(interactionOverlayOpen);
  const [commentRevision, setCommentRevision] = useState(0);
  const [commentPage, setCommentPage] = useState(0);
  const [commentHasMore, setCommentHasMore] = useState(false);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [previousMediaIndex, setPreviousMediaIndex] = useState<number | null>(null);
  const [mediaTransition, setMediaTransition] = useState<"next" | "previous">("next");
  const [musicMuted, setMusicMuted] = useState(false);
  const [replyTarget, setReplyTarget] = useState<CommentDto | null>(null);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [commentMedia, setCommentMedia] = useState<CommentMediaSelection | null>(null);
  const [commentReloadToken, setCommentReloadToken] = useState(0);
  const [commentFocusChain, setCommentFocusChain] = useState<string[]>([]);
  const [highlightedCommentId, setHighlightedCommentId] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);


  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackPositions = useRef<Map<string, number>>(new Map());
  const playbackKeyRef = useRef<string | null>(null);
  const mediaTransitionTimerRef = useRef<number | null>(null);
  const mediaTransitioningRef = useRef(false);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const commentFileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingMediaCommentIds = useRef<Set<string>>(new Set());
  const commentFocusResolvedRef = useRef("");
  const commentsRestricted = false;
  const activeMedia = detailPost.media[activeMediaIndex];
  const activeMusic = detailPost.music ?? activeMedia?.music ?? null;
  const playbackKey = activeMusic ? (detailPost.music ? "post:" + detailPost.id + ":" + activeMusic.id : "item:" + activeMedia?.id + ":" + activeMusic.id) : null;
  const roots: CommentNode[] = comments.map((item) => ({ ...item, replies: [] }));

  function moveMedia(delta: number) {
    if (!detailPost.media.length || mediaTransitioningRef.current) return;
    const nextIndex = Math.min(detailPost.media.length - 1, Math.max(0, activeMediaIndex + delta));
    if (nextIndex === activeMediaIndex) return;
    mediaTransitioningRef.current = true;
    setMediaTransition(delta > 0 ? "next" : "previous");
    setPreviousMediaIndex(activeMediaIndex);
    setActiveMediaIndex(nextIndex);
    if (mediaTransitionTimerRef.current !== null) window.clearTimeout(mediaTransitionTimerRef.current);
    mediaTransitionTimerRef.current = window.setTimeout(() => {
      setPreviousMediaIndex(null);
      mediaTransitioningRef.current = false;
    }, 320);
  }

  useEffect(() => {
    let active = true;
    setDetailPost(post);
    setActiveMediaIndex(0);
    setPreviousMediaIndex(null);
    mediaTransitioningRef.current = false;
    setDetailMediaReady(false);
    apiGet<PostDetails>("/posts/" + encodeURIComponent(post.id) + "?mediaType=POST")
      .then((detail) => {
        const hydrated = mergePostDetail(post, detail);
        if (active) {
          setDetailPost(hydrated);
          setDetailMediaReady(true);
        }
      })
      .catch(() => { if (active) setDetailMediaReady(true); });
    return () => { active = false; };
  }, [post.id]);

  useEffect(() => {
    setDetailPost((current) => ({ ...current, engagement: post.engagement, viewerState: post.viewerState }));
  }, [post.engagement.likes, post.engagement.comments, post.engagement.reposts, post.viewerState.liked, post.viewerState.saved, post.viewerState.reposted]);

  useEffect(() => {
    let active = true;
    setCommentState("loading");
    setCommentPage(0);
    apiGet<Page<CommentDto>>("/frontend/comments/post/" + encodeURIComponent(post.id) + "/page?viewerId=" + encodeURIComponent(viewerId) + "&page=0&size=10")
      .then((page) => {
        if (active) {
          setComments(page.content ?? []);
          setCommentHasMore(page.pageNumber + 1 < page.totalPages);
          setCommentState("ready");
        }
      })
      .catch(() => { if (active) setCommentState("error"); });
    return () => { active = false; };
  }, [post.id, viewerId, commentReloadToken]);
  useEffect(() => {
    if (!targetCommentId || commentState !== "ready") return;
    const focusKey = `${post.id}:${targetCommentId}`;
    if (commentFocusResolvedRef.current === focusKey) return;
    commentFocusResolvedRef.current = focusKey;
    let cancelled = false;

    void (async () => {
      try {
        const chain: string[] = [];
        let current = await apiGet<CommentDto>(`/comments/${encodeURIComponent(targetCommentId)}`);
        if (current.postId !== post.id) throw new Error("Comment does not belong to this post");
        chain.push(current.id);
        for (let depth = 0; depth < 2 && current.parentId; depth += 1) {
          current = await apiGet<CommentDto>(`/comments/${encodeURIComponent(current.parentId)}`);
          chain.push(current.id);
        }
        if (cancelled) return;

        const rootId = chain[chain.length - 1];
        let merged = [...comments];
        let nextPage = commentPage + 1;
        let hasMore = commentHasMore;
        while (!merged.some((item) => item.id === rootId) && hasMore) {
          const page = await apiGet<Page<CommentDto>>(`/frontend/comments/post/${encodeURIComponent(post.id)}/page?viewerId=${encodeURIComponent(viewerId)}&page=${nextPage}&size=10`);
          merged = [...merged, ...(page.content ?? [])].filter((item, index, values) => values.findIndex((candidate) => candidate.id === item.id) === index);
          nextPage = page.pageNumber + 1;
          hasMore = nextPage < page.totalPages;
        }
        if (!merged.some((item) => item.id === rootId)) throw new Error("Comment root is unavailable");
        if (cancelled) return;
        setComments(merged);
        setCommentPage(Math.max(commentPage, nextPage - 1));
        setCommentHasMore(hasMore);
        setCommentFocusChain(chain);
      } catch {
        if (!cancelled) {
          setCommentFocusChain([]);
          window.dispatchEvent(new CustomEvent("app-toast", { detail: "Bình luận không còn tồn tại" }));
        }
      }
    })();

    return () => { cancelled = true; };
  }, [commentHasMore, commentPage, commentState, comments, post.id, targetCommentId, viewerId]);

  useEffect(() => {
    if (!targetCommentId || !commentFocusChain.includes(targetCommentId)) return;
    let cancelled = false;
    let attempts = 0;
    let clearTimer = 0;
    const reveal = () => {
      if (cancelled) return;
      const target = document.querySelector<HTMLElement>(`[data-comment-id="${CSS.escape(targetCommentId)}"]`);
      if (target) {
        target.scrollIntoView({ block: "center", behavior: attempts > 8 ? "auto" : "smooth" });
        setHighlightedCommentId(targetCommentId);
        clearTimer = window.setTimeout(() => setHighlightedCommentId(null), 4200);
        return;
      }
      attempts += 1;
      if (attempts < 35) window.setTimeout(reveal, 100);
    };
    reveal();
    return () => {
      cancelled = true;
      if (clearTimer) window.clearTimeout(clearTimer);
    };
  }, [commentFocusChain, targetCommentId]);

  useEffect(() => () => {
    if (commentMedia?.previewUrl) URL.revokeObjectURL(commentMedia.previewUrl);
  }, [commentMedia]);

  useEffect(() => () => {
    if (mediaTransitionTimerRef.current !== null) window.clearTimeout(mediaTransitionTimerRef.current);
  }, []);

  useEffect(() => {
    function handleCommentMediaResult(event: Event) {
      const detail = (event as CustomEvent<{ commentId?: string; postId?: string; message?: string; result?: string }>).detail;
      if (!detail?.commentId || detail.postId !== post.id || !pendingMediaCommentIds.current.has(detail.commentId)) return;
      pendingMediaCommentIds.current.delete(detail.commentId);
      window.dispatchEvent(new CustomEvent("app-toast", { detail: detail.message || (detail.result === "FAILED" ? "Media comment was rejected." : "Comment published.") }));
      if (detail.result !== "FAILED") {
        setCommentReloadToken((value) => value + 1);
        setCommentRevision((value) => value + 1);
        onCommentCreated(post.id);
      }
    }
    window.addEventListener("comment-media-result", handleCommentMediaResult);
    return () => window.removeEventListener("comment-media-result", handleCommentMediaResult);
  }, [onCommentCreated, post.id]);

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
      if (activeMedia?.type !== "VIDEO") {
        void audio.play().catch(() => undefined);
      }
    };
    audio.addEventListener("loadedmetadata", resume, { once: true });
    return () => {
      audio.removeEventListener("loadedmetadata", resume);
      if (playbackKeyRef.current === playbackKey && Number.isFinite(audio.currentTime)) playbackPositions.current.set(playbackKey, audio.currentTime);
    };
  }, [playbackKey, activeMusic?.playbackUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playbackKey || !activeMusic?.playbackUrl) return;
    if (activeMedia?.type === "VIDEO") {
      if (Number.isFinite(audio.currentTime)) playbackPositions.current.set(playbackKey, audio.currentTime);
      audio.pause();
        return;
    }
    void audio.play().catch(() => undefined);
  }, [activeMedia?.type, playbackKey, activeMusic?.playbackUrl]);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (expandedCommentMedia) {
        if (event.key === "Escape") setExpandedCommentMedia(null);
        return;
      }
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") moveMedia(-1);
      if (event.key === "ArrowRight") moveMedia(1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaIndex, detailPost.media.length, expandedCommentMedia, onClose]);

  function handleSwipeEnd(value: number) {
    if (touchStart === null) return;
    const delta = touchStart - value;
    if (Math.abs(delta) > 52) moveMedia(delta > 0 ? 1 : -1);
    setTouchStart(null);
  }

  async function loadMoreComments() {
    if (loadingMoreComments || !commentHasMore) return;
    const nextPage = commentPage + 1;
    setLoadingMoreComments(true);
    try {
      const page = await apiGet<Page<CommentDto>>(`/frontend/comments/post/${encodeURIComponent(post.id)}/page?viewerId=${encodeURIComponent(viewerId)}&page=${nextPage}&size=10`);
      setComments((current) => {
        const merged = [...current, ...(page.content ?? [])];
        return merged.filter((item, index) => merged.findIndex((candidate) => candidate.id === item.id) === index);
      });
      setCommentPage(page.pageNumber);
      setCommentHasMore(page.pageNumber + 1 < page.totalPages);
    } finally {
      setLoadingMoreComments(false);
    }
  }
  async function toggleCommentLike(id: string) {
    const response = await apiSend<LikeToggleResponse>(`/likes/users/${encodeURIComponent(viewerId)}`, "POST", { targetId: id, targetType: "COMMENT" });
    return response.liked;
  }

  function clearCommentMedia() {
    setCommentMedia(null);
    if (commentFileInputRef.current) commentFileInputRef.current.value = "";
  }

  function selectCommentMedia(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) {
      setSubmitError("Comments only support one image or video.");
      return;
    }
    const sizeError = validateMediaFile(file, isVideo ? "VIDEO" : "IMAGE");
    if (sizeError) {
      setSubmitError(sizeError);
      return;
    }
    setSubmitError("");
    setCommentMedia({ file, previewUrl: URL.createObjectURL(file), type: isVideo ? "VIDEO" : "IMAGE" });
  }

  async function submitComment(event: FormEvent) {
    event.preventDefault();
    const content = commentText.trim();
    const selectedMedia = commentMedia;
    if ((!content && !selectedMedia) || sending || commentsRestricted) return;
    setSending(true);
    setSubmitError("");
    try {
      const uploaded = selectedMedia ? await uploadCloudinaryMedia(selectedMedia.file) : null;
      const response = await apiSend<CommentCreateResponse>("/comments", "POST", {
        postId: post.id,
        userId: viewerId,
        parentId: replyTarget?.id ?? null,
        content: content || "",
        mediaList: uploaded ? [{
          secureUrl: uploaded.secureUrl,
          publicId: uploaded.publicId,
          resourceType: uploaded.resourceType || selectedMedia?.type.toLowerCase(),
        }] : [],
      });
      if (selectedMedia) {
        pendingMediaCommentIds.current.add(response.commentId);
        window.dispatchEvent(new CustomEvent("app-toast", { detail: response.message || "Media is being reviewed." }));
        setCommentText("");
        clearCommentMedia();
        setReplyTarget(null);
        return;
      }
      setCommentReloadToken((value) => value + 1);
      setCommentRevision((value) => value + 1);
      onCommentCreated(post.id);
      setCommentText("");
      setReplyTarget(null);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit comment.");
    } finally {
      setSending(false);
    }
  }

  const mediaViewer = <DetailMediaViewer loading={!detailMediaReady} post={detailPost} activeIndex={activeMediaIndex} previousIndex={previousMediaIndex} transitionDirection={mediaTransition} musicMuted={musicMuted} onToggleMusicMuted={() => setMusicMuted((value) => !value)} onMove={moveMedia} onTouchStart={setTouchStart} onTouchEnd={handleSwipeEnd} />;

  return (
    <div className="modal-backdrop post-detail-backdrop" role="dialog" aria-modal="true" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={interaction.ref} className="post-detail" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button close detail-close" onClick={onClose} aria-label="Close"><X size={22} /></button>
        <div className="detail-media">{mediaViewer}</div>
        <aside className="detail-panel">
          <header className="detail-author">
            <button className="detail-author-profile" onClick={() => void onOpenProfile(detailPost.author.id)} aria-label={"Open profile for " + detailPost.author.username}><Avatar src={detailPost.author.avatarUrl} label={detailPost.author.username} /></button>
            <div className="detail-author-copy">
              <button className="detail-author-name" onClick={() => void onOpenProfile(detailPost.author.id)}>
                <span><strong>{detailPost.author.displayName || detailPost.author.username}</strong>{detailPost.author.relationship === "FRIEND" && <Check className="verified-badge" size={13} />}</span>
                <small>@{detailPost.author.username}</small>
              </button>

            </div>
            {detailPost.author.id === viewerId ? <span className="detail-owner-actions"><button className="icon-button" onClick={onEdit} aria-label="Chỉnh sửa bài viết" title="Chỉnh sửa"><PenLine size={18} /></button><button className="icon-button" onClick={onArchive} aria-label="Chuyển bài viết vào Kho lưu trữ" title="Kho lưu trữ"><Archive size={18} /></button></span> : <button className="icon-button detail-author-more" aria-label="Post options"><MoreHorizontal size={19} /></button>}
          </header>
          <div className="detail-scroll detail-sidebar-body">
            <PostDiscussionIntro post={detailPost} />
{commentsRestricted && <CommentState icon={Lock} title="Restricted comments" detail="Only selected people can comment on this post." />}
            {!commentsRestricted && commentState === "loading" && <div className="comments-loading"><span /><span /><span /></div>}
            {!commentsRestricted && commentState === "error" && <CommentState icon={WifiOff} title="Could not load comments" detail="Check the backend connection and try again." />}
            {!commentsRestricted && commentState === "ready" && roots.length === 0 && <CommentState icon={MessageCircle} title="No comments yet" detail="Be the first to share a reply." />}
            {!commentsRestricted && commentState === "ready" && roots.length > 0 && <div className="detail-comments">{roots.map((item) => <CommentThread key={item.id} item={item} depth={0} viewerId={viewerId} postAuthorId={detailPost.author.id} reloadToken={commentRevision} focusChain={commentFocusChain} focusedCommentId={highlightedCommentId} onLike={toggleCommentLike} onReply={setReplyTarget} onOpenMedia={(url, video) => setExpandedCommentMedia({ url, video })} onOpenProfile={onOpenProfile} />)}</div>}
            {!commentsRestricted && commentState === "ready" && commentHasMore && <button className="load-more-comments" onClick={() => void loadMoreComments()} disabled={loadingMoreComments}>{loadingMoreComments ? "Loading..." : "Load more comments"}</button>}
          </div>
          <section className="detail-engagement-footer" aria-label="Post engagement">
            <ActionBar post={detailPost} onToggle={onTogglePost} onComment={() => composerRef.current?.focus()} onOpenEngagement={setEngagementKind} showCounts={false} />
            <div className="detail-engagement-summary"><strong>{formatCount(detailPost.engagement.likes)} lượt thích</strong><time>{formatRelativeTime(detailPost.createdAt)}</time></div>
          </section>
          <PostDetailComposer
            text={commentText}
            attachment={commentMedia}
            replyLabel={replyTarget?.username || undefined}
            disabled={commentsRestricted || sending}
            sending={sending}
            error={submitError}
            textareaRef={composerRef}
            fileInputRef={commentFileInputRef}
            onTextChange={setCommentText}
            onFileChange={selectCommentMedia}
            onClearAttachment={clearCommentMedia}
            onCancelReply={() => setReplyTarget(null)}
            onSubmit={submitComment}
          />
        </aside>
        <audio ref={audioRef} className="detail-music-audio" preload="metadata" muted={musicMuted} />
        {engagementKind && <EngagementListModal postId={detailPost.id} kind={engagementKind} viewerId={viewerId} onClose={() => setEngagementKind(null)} onOpenProfile={onOpenProfile} />}
        {expandedCommentMedia && createPortal(<div className="comment-media-lightbox" role="dialog" aria-modal="true" aria-label="Comment media viewer" onClick={() => setExpandedCommentMedia(null)}>
          <button type="button" className="comment-media-lightbox-close" onClick={() => setExpandedCommentMedia(null)} aria-label="Close media viewer"><X size={22} /></button>
          <div className="comment-media-lightbox-content" onClick={(event) => event.stopPropagation()}>
            {expandedCommentMedia.video ? <video src={expandedCommentMedia.url} controls autoPlay playsInline /> : <img src={expandedCommentMedia.url} alt="Expanded comment attachment" />}
          </div>
        </div>, document.body)}
      </section>
    </div>
  );
}
function PostDiscussionIntro({ post }: { post: Post }) {
  const hashtags = (post.hashtags ?? []).map((tag) => "#" + tag).join(" ");
  if (!post.caption && !hashtags) return null;
  return (
    <div className="post-discussion-intro">
      <article className="discussion-caption-row common-caption-row">
        <Avatar src={post.author.avatarUrl} label={post.author.username} />
        <div><DiscussionCaptionText username={post.author.username} text={post.caption} hashtags={hashtags} lines={4} /></div>
      </article>
    </div>
  );
}
function DiscussionCaptionText({ username, text, hashtags, lines }: { username: string; text: string; hashtags: string; lines: number }) {
  const [expanded, setExpanded] = useState(false);
  const expandable = text.length > 190;
  return (
    <div className="discussion-caption-copy">
      {text && <p className={expanded ? "expanded" : ""} style={expanded ? undefined : { WebkitLineClamp: lines }}><strong>@{username}</strong>{" "}{text}</p>}
      {expandable && <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>{expanded ? "Less" : "More"}</button>}
      {hashtags && <p className="discussion-hashtags">{hashtags}</p>}
    </div>
  );
}

function ExpandableDetailText({ text, lines, compact = false }: { text: string; lines: number; compact?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const expandable = text.length > (compact ? 120 : 170);
  return <div className={"expandable-detail-copy" + (compact ? " compact" : "")}><p className={expanded ? "expanded" : ""} style={expanded ? undefined : { WebkitLineClamp: lines }}>{text}</p>{expandable && <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>{expanded ? "Less" : "More"}</button>}</div>;
}

function formatMusicTime(seconds?: number | null) {
  const safe = Math.max(0, Math.floor(seconds ?? 0));
  return String(Math.floor(safe / 60)).padStart(2, "0") + ":" + String(safe % 60).padStart(2, "0");
}
function DetailMediaLayer({ media, className, active = false }: { media: Post["media"][number]; className: string; active?: boolean }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const naturalSizeRef = useRef<{ width: number; height: number } | null>(null);
  const [fitSize, setFitSize] = useState<{ width: number; height: number } | null>(null);
  const orientation = media.aspectRatio >= 1 ? "portrait" : "landscape";

  function updateFitSize() {
    const natural = naturalSizeRef.current;
    const container = contentRef.current;
    if (!natural || !container || natural.width <= 0 || natural.height <= 0) return;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    if (containerWidth <= 0 || containerHeight <= 0) return;
    const scale = Math.min(containerWidth / natural.width, containerHeight / natural.height);
    setFitSize({ width: Math.max(1, Math.round(natural.width * scale)), height: Math.max(1, Math.round(natural.height * scale)) });
  }

  useEffect(() => {
    const target = contentRef.current;
    if (!target) return;
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateFitSize);
    observer?.observe(target);
    updateFitSize();
    return () => observer?.disconnect();
  }, [media.id]);

  function setNaturalSize(width: number, height: number) {
    if (width <= 0 || height <= 0) return;
    naturalSizeRef.current = { width, height };
    updateFitSize();
  }

  const mediaStyle = fitSize ? { width: `${fitSize.width}px`, height: `${fitSize.height}px` } : undefined;
  return <div ref={contentRef} className={className + " " + orientation} aria-hidden={active ? undefined : true}>
    {media.type === "VIDEO"
      ? <PostVideoPlayer source={media.url} eligible={active} controls={active} preload={active ? "auto" : "metadata"} style={mediaStyle} onLoadedMetadata={(video) => setNaturalSize(video.videoWidth, video.videoHeight)} />
      : <img src={media.url} alt={active ? media.alt : ""} draggable={false} style={mediaStyle} onLoad={(event) => setNaturalSize(event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)} />}
  </div>;
}
function DetailMediaViewer({ loading, post, activeIndex, previousIndex, transitionDirection, musicMuted, onToggleMusicMuted, onMove, onTouchStart, onTouchEnd }: { loading: boolean; post: Post; activeIndex: number; previousIndex: number | null; transitionDirection: "next" | "previous"; musicMuted: boolean; onToggleMusicMuted: () => void; onMove: (delta: number) => void; onTouchStart: (value: number | null) => void; onTouchEnd: (value: number) => void }) {
  const media = post.media[activeIndex];
  const previousMedia = previousIndex === null ? null : post.media[previousIndex];
  if (loading) return <div className="detail-media-loading" aria-label="Loading post media"><span /></div>;
  const hasMany = post.media.length > 1;
  const music = post.music ?? media?.music ?? null;
  const canPlayMusic = Boolean(music && media && activeMediaSupportsMusic(media));
  if (!media) return <div className="detail-empty-media text-only-media"><div className="text-post" title={post.caption || "Media unavailable"}>{post.caption || "Media unavailable"}</div></div>;
  return (
    <div className="detail-media-viewer" tabIndex={0} onTouchStart={(event) => onTouchStart(event.touches[0]?.clientX ?? null)} onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}>
      {previousMedia && <DetailMediaLayer media={previousMedia} className={"detail-media-content exiting slide-" + transitionDirection} />}
      <DetailMediaLayer key={media.id} media={media} className={previousMedia ? "detail-media-content entering slide-" + transitionDirection : "detail-media-content"} active />
      {media.caption && <div key={"caption-" + media.id} className="item-caption-thought" tabIndex={0} aria-label={`View media caption: ${media.caption}`}><MessageCircle className="caption-trigger-icon" size={20} aria-hidden="true" /><p>{media.caption}</p></div>}
      {canPlayMusic && <button type="button" className="detail-music-mute" onClick={onToggleMusicMuted} aria-label={musicMuted ? "Unmute music" : "Mute music"} aria-pressed={musicMuted}>{musicMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>}
      {canPlayMusic && <div className="detail-music-attribution"><span><strong>{music?.displayName}</strong>{music?.artist && <small>{music.artist}</small>}</span></div>}
      {hasMany && <><button className="carousel-control previous" onClick={() => onMove(-1)} disabled={activeIndex === 0 || previousIndex !== null} aria-label="Previous media"><ChevronLeft size={20} /></button><button className="carousel-control next" onClick={() => onMove(1)} disabled={activeIndex === post.media.length - 1 || previousIndex !== null} aria-label="Next media"><ChevronRight size={20} /></button><span className="media-counter">{String(activeIndex + 1).padStart(2, "0")} / {String(post.media.length).padStart(2, "0")}</span><span className="media-progress"><i style={{ width: (((activeIndex + 1) / post.media.length) * 100) + "%" }} /></span></>}
      <AdjacentPostMediaPreloads media={post.media} activeIndex={activeIndex} />
    </div>
  );
}function activeMediaSupportsMusic(media: Post["media"][number]) { return media.type !== "VIDEO"; }
function CommentThread({ item, depth, viewerId, postAuthorId, reloadToken, focusChain = [], focusedCommentId, onLike, onReply, onOpenMedia, onOpenProfile }: { item: CommentNode; depth: number; viewerId: string; postAuthorId: string; reloadToken: number; focusChain?: string[]; focusedCommentId?: string | null; onLike: (id: string) => Promise<boolean>; onReply: (item: CommentDto) => void; onOpenMedia: (url: string, video: boolean) => void; onOpenProfile: (userId: string) => Promise<void> }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<CommentDto[]>([]);
  const [replyState, setReplyState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const replyCount = item.replyCount ?? item.replies.length;
  const canReply = depth < 2;
  useEffect(() => {
    if (canReply && focusChain.includes(item.id) && focusedCommentId !== item.id) setShowReplies(true);
  }, [canReply, focusChain, focusedCommentId, item.id]);

  useEffect(() => {
    if (!showReplies || !canReply) return;
    let active = true;
    setReplyState("loading");
    apiGet<CommentDto[]>(`/frontend/comments/parent/${encodeURIComponent(item.id)}?viewerId=${encodeURIComponent(viewerId)}&page=0&size=10`)
      .then((items) => { if (active) { setReplies(items ?? []); setReplyState("ready"); } })
      .catch(() => { if (active) setReplyState("error"); });
    return () => { active = false; };
  }, [showReplies, item.id, viewerId, canReply, reloadToken]);
  return <div data-comment-id={item.id} className={`comment-thread depth-${depth}${depth > 0 ? " reply" : ""}${focusedCommentId === item.id ? " notification-comment-highlight" : ""}`}>
    <CommentRow item={item} depth={depth} viewerId={viewerId} postAuthorId={postAuthorId} liked={Boolean(item.hasLiked)} onLike={onLike} onReply={canReply ? onReply : undefined} onOpenMedia={onOpenMedia} onOpenProfile={onOpenProfile} />
    {canReply && replyCount > 0 && <button className="load-replies" onClick={() => setShowReplies((value) => !value)} aria-expanded={showReplies}><span aria-hidden="true" />{showReplies ? "Hide replies" : "View replies"}</button>}
    {showReplies && replyState === "loading" && <div className="reply-loading">Loading replies...</div>}
    {showReplies && replyState === "error" && <button className="reply-load-error" onClick={() => setShowReplies(false)}>Could not load replies · Close</button>}
    {showReplies && replyState === "ready" && replies.map((reply) => <CommentThread key={reply.id} item={{ ...reply, replies: [] }} depth={depth + 1} viewerId={viewerId} postAuthorId={postAuthorId} reloadToken={reloadToken} focusChain={focusChain} focusedCommentId={focusedCommentId} onLike={onLike} onReply={onReply} onOpenMedia={onOpenMedia} onOpenProfile={onOpenProfile} />)}
  </div>;
}function CommentState({ icon: Icon, title, detail }: { icon: typeof Home; title: string; detail: string }) { return <div className="comment-state"><Icon size={22} /><strong>{title}</strong><span>{detail}</span></div>; }
export function CommentRow({ item, depth = 0, viewerId, postAuthorId, liked = false, onLike, onReply, onOpenMedia, onOpenProfile }: { item: CommentDto; depth?: number; viewerId: string; postAuthorId?: string; liked?: boolean; onLike?: (id: string) => Promise<boolean>; onReply?: (item: CommentDto) => void; onOpenMedia?: (url: string, video: boolean) => void; onOpenProfile: (userId: string) => Promise<void> }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(item.content ?? "");
  const [editText, setEditText] = useState(item.content ?? "");
  const [saving, setSaving] = useState(false);
  const [commentLiked, setCommentLiked] = useState(liked);
  const [likePending, setLikePending] = useState(false);
  const menuRef = useRef<HTMLSpanElement | null>(null);
  const ownComment = item.userId === viewerId;
  const deleted = item.commentType === "DELETED";
  useEffect(() => { setContent(item.content ?? ""); setEditText(item.content ?? ""); }, [item.id, item.content]);
  useEffect(() => { setCommentLiked(liked); }, [item.id, liked]);
  useEffect(() => {
    if (!menuOpen) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);
  async function saveEdit() {
    const next = editText.trim();
    if (!next || saving) return;
    setSaving(true);
    try {
      const updated = await apiSend<CommentDto>("/comments", "PUT", { commentId: item.id, userId: viewerId, content: next });
      setContent(updated.content ?? next);
      setEditText(updated.content ?? next);
      setEditing(false);
      setMenuOpen(false);
    } finally {
      setSaving(false);
    }
  }
  async function toggleLike() {
    if (!onLike || likePending) return;
    const previous = commentLiked;
    setCommentLiked(!previous);
    setLikePending(true);
    try {
      setCommentLiked(await onLike(item.id));
    } catch {
      setCommentLiked(previous);
    } finally {
      setLikePending(false);
    }
  }
  return <div className={depth ? "comment-row nested" : "comment-row"}>
    <button type="button" className="comment-author-avatar" onClick={() => void onOpenProfile(item.userId)} aria-label={"Open profile for " + (item.username || item.userId)}><Avatar src={item.avatarUrl || undefined} label={item.username || item.userId} /></button>
    <div className="comment-content">
      {editing ? <div className="comment-edit"><textarea value={editText} onChange={(event) => setEditText(event.target.value)} aria-label="Edit comment" /><div><button type="button" onClick={() => { setEditing(false); setEditText(content); }}>Cancel</button><button type="button" onClick={() => void saveEdit()} disabled={!editText.trim() || saving}>{saving ? "Saving" : "Save"}</button></div></div> : <p className={deleted ? "comment-copy emoji-text deleted-comment" : "comment-copy emoji-text"}><button type="button" className="comment-author-name" onClick={() => void onOpenProfile(item.userId)}>{item.username || "Unknown user"}</button>{item.userId === postAuthorId && <span className="author-badge">Author</span>}{deleted ? " Deleted comment" : content ? ` ${content}` : null}</p>}
      {item.mediaUrl && <button type="button" className="comment-media-open" onClick={() => onOpenMedia?.(item.mediaUrl as string, isVideoMediaUrl(item.mediaUrl as string))} aria-label={isVideoMediaUrl(item.mediaUrl) ? "Open comment video" : "Open comment image"}>
        {isVideoMediaUrl(item.mediaUrl) ? <><video className="comment-media" src={item.mediaUrl} muted playsInline preload="metadata" /><span className="comment-media-play" aria-hidden="true"><Play size={22} fill="currentColor" /></span></> : <img className="comment-media" src={item.mediaUrl} alt="Comment attachment" />}
      </button>}
      <footer><time>{formatRelativeTime(item.timestamp ?? new Date().toISOString())}</time>{!deleted && onReply && <button onClick={() => onReply(item)}>Reply</button>}<span ref={menuRef} className="comment-options"><button onClick={() => setMenuOpen((value) => !value)} aria-label="Comment options" aria-expanded={menuOpen}><MoreHorizontal size={13} /></button>{menuOpen && <span className="comment-options-menu" role="menu"><button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>Report</button>{ownComment && !deleted && <button type="button" role="menuitem" onClick={() => { setEditing(true); setMenuOpen(false); }}>Edit</button>}<button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>Close</button></span>}</span></footer>
    </div>
    {!deleted && <button className={commentLiked ? "comment-like active" : "comment-like"} onClick={() => void toggleLike()} disabled={likePending} aria-label={commentLiked ? "Unlike comment" : "Like comment"}><Heart size={15} fill={commentLiked ? "currentColor" : "none"} /></button>}
  </div>;
}function EmptyState({ icon: Icon, title, action }: { icon: typeof Home; title: string; action: string }) { return <div className="empty-state"><Icon size={24} /><strong>{title}</strong><button>{action}</button></div>; }
