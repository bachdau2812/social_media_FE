import { Archive, Bookmark, Check, ChevronLeft, ChevronRight, Heart, Home, Lock, MessageCircle, MoreHorizontal, Pause, PenLine, RefreshCw, Repeat2, Reply, Send, Users, Volume2, VolumeX, WifiOff, X } from "lucide-react";
import { type ChangeEvent, type FormEvent, type MouseEvent, type RefCallback, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { uploadCloudinaryMedia } from "../../../shared/api";
import { Avatar as SharedAvatar } from "../../../shared/components";
import { validateMediaFile } from "../../../shared/media";
import type { Post } from "../model/post.types";
import type { PostDetailsDto } from "../model/post.dto";
import { mergePostDetail } from "../model/post.mapper";
import { formatRelativeTime } from "../../../shared/utils";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { CommentRow } from "./CommentRow";
import { commentApi, type CommentDto } from "../api/comment.api";
import { postApi } from "../api/post.api";
import { PostDetailComposer, type CommentMediaSelection } from "./PostDetailComposer";
import { AdjacentPostMediaPreloads } from "./AdjacentPostMediaPreloads";
import { PostVideoPlayer } from "./PostVideoPlayer";
import { ActionBar, EngagementListModal } from "./PostEngagement";
import { usePostInteraction } from "../hooks/usePostInteraction";
import { useForegroundOverlay } from "../../../shared/overlays/useForegroundOverlay";
import { MobileSheet } from "../../../shared/overlays/MobileSheet";
import { useSheetHistoryRestore } from '../../../shared/overlays/useLocalSheetHistory';
type PostDetails = PostDetailsDto;
type CommentMediaViewer = { url: string; video: boolean };
type CommentNode = CommentDto & { replies: CommentNode[] };
type DiscussionDraft = { text: string; reply: CommentDto | null; media: CommentMediaSelection | null; pending: Set<string> };
const discussionDrafts = new Map<string, DiscussionDraft>();
function discussionDraft(key: string): DiscussionDraft {
  let draft = discussionDrafts.get(key);
  if (!draft) {
    draft = { text: '', reply: null, media: null, pending: new Set() };
    discussionDrafts.set(key, draft);
    if (discussionDrafts.size > 10) {
      const oldest = discussionDrafts.keys().next().value!;
      const expired = discussionDrafts.get(oldest);
      if (expired?.media) URL.revokeObjectURL(expired.media.previewUrl);
      discussionDrafts.delete(oldest);
    }
  }
  return draft;
}
export function PostDetail(props: Parameters<typeof PostDetailContent>[0]) {
  return <PostDetailContent key={`${props.viewerId}:${props.post.id}`} {...props} />;
}
function Avatar({ src, label }: { src?: string; label: string }) { return <SharedAvatar src={src} name={label} alt={label} />; }
function formatCount(value: number) { return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : String(value); }
function sortComments(items: CommentDto[], mode: "RELEVANT" | "RECENT") { return [...items].sort((left, right) => { if (mode === "RELEVANT") { const leftReplies = items.filter((item) => item.parentId === left.id).length; const rightReplies = items.filter((item) => item.parentId === right.id).length; if (leftReplies !== rightReplies) return rightReplies - leftReplies; } return new Date(right.timestamp ?? 0).getTime() - new Date(left.timestamp ?? 0).getTime(); }); }
function buildCommentTree(items: CommentDto[], mode: "RELEVANT" | "RECENT") { const nodes = new Map<string, CommentNode>(); sortComments(items, mode).forEach((item) => nodes.set(item.id, { ...item, replies: [] })); const roots: CommentNode[] = []; nodes.forEach((node) => { if (node.parentId && nodes.has(node.parentId)) nodes.get(node.parentId)?.replies.push(node); else roots.push(node); }); return roots; }
function PostDetailContent({ post, presentation = "detail", viewerId, targetCommentId, onClose, onTogglePost, onCommentCreated, onEdit, onArchive, onOpenProfile }: { post: Post; presentation?: "detail" | "discussion"; viewerId: string; targetCommentId?: string | null; onClose: () => void; onTogglePost: (postId: string, key: "liked" | "saved" | "reposted") => void; onCommentCreated: (postId: string) => void; onEdit: () => void; onArchive: () => void; onOpenProfile: (userId: string) => Promise<void> }) {
  useBodyScrollLock(true);
  const draft = discussionDraft(`${viewerId}:${post.id}`);
  const [detailPost, setDetailPost] = useState(post);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [commentState, setCommentState] = useState<"loading" | "ready" | "error">("loading");
  const [detailMediaReady, setDetailMediaReady] = useState(false);
  const engagementOwnerId = useId();
  const [engagementKind, setEngagementKind] = useState<"LIKES" | "REPOSTS" | null>(null);
  useSheetHistoryRestore(id => { if (id === `post-${post.id}-detail-${engagementOwnerId}-LIKES`) setEngagementKind('LIKES'); if (id === `post-${post.id}-detail-${engagementOwnerId}-REPOSTS`) setEngagementKind('REPOSTS'); });
  const [expandedCommentMedia, setExpandedCommentMedia] = useState<CommentMediaViewer | null>(null);
  const interactionOverlayOpen = Boolean(engagementKind || expandedCommentMedia);
  const interaction = usePostInteraction(post.id, viewerId, "detail", interactionOverlayOpen);
  useForegroundOverlay(interactionOverlayOpen);
  const [commentRevision, setCommentRevision] = useState(0);
  const [commentPage, setCommentPage] = useState(0);
  const [commentHasMore, setCommentHasMore] = useState(false);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);
  const [moreCommentsError, setMoreCommentsError] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [previousMediaIndex, setPreviousMediaIndex] = useState<number | null>(null);
  const [mediaTransition, setMediaTransition] = useState<"next" | "previous">("next");
  const [musicMuted, setMusicMuted] = useState(false);
  const [replyTarget, setReplyTarget] = useState<CommentDto | null>(draft.reply);
  const [commentText, setCommentText] = useState(draft.text);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [commentMedia, setCommentMedia] = useState<CommentMediaSelection | null>(draft.media);
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
  const pendingMediaCommentIds = useRef<Set<string>>(draft.pending);
  const commentFocusResolvedRef = useRef("");
  const discussionRef = useRef<HTMLElement | null>(null);
  const commentsRestricted = false;
  const activeMedia = detailPost.media[activeMediaIndex];
  const activeMusic = presentation === 'detail' ? detailPost.music ?? activeMedia?.music ?? null : null;
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
    postApi.getSurfaceDetail(post.id)
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
    if (commentReloadToken === 0) { setCommentState("loading"); setCommentPage(0); }
    commentApi.pageByPost(post.id, viewerId)
      .then((page) => {
        if (active) {
          setComments(current => commentReloadToken === 0 ? page.content ?? [] : [...(page.content ?? []), ...current.filter(item => !page.content?.some(fresh => fresh.id === item.id))]);
          if (commentReloadToken === 0) setCommentHasMore(page.pageNumber + 1 < page.totalPages);
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
        let current = await commentApi.byId(targetCommentId);
        if (current.postId !== post.id) throw new Error("Comment does not belong to this post");
        chain.push(current.id);
        for (let depth = 0; depth < 2 && current.parentId; depth += 1) {
          current = await commentApi.byId(current.parentId);
          chain.push(current.id);
        }
        if (cancelled) return;

        const rootId = chain[chain.length - 1];
        let merged = [...comments];
        let nextPage = commentPage + 1;
        let hasMore = commentHasMore;
        while (!merged.some((item) => item.id === rootId) && hasMore) {
          const page = await commentApi.pageByPost(post.id, viewerId, nextPage, 10);
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
      const target = discussionRef.current?.querySelector<HTMLElement>(`[data-comment-id="${CSS.escape(targetCommentId)}"]`);
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

  useEffect(() => {
    draft.text = commentText; draft.reply = replyTarget;
    if (draft.media && draft.media !== commentMedia) URL.revokeObjectURL(draft.media.previewUrl);
    draft.media = commentMedia;
  }, [draft, commentText, replyTarget, commentMedia]);

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
      if (event.key === "Escape" && !engagementKind && presentation === 'detail') onClose();
      if (event.key === "ArrowLeft") moveMedia(-1);
      if (event.key === "ArrowRight") moveMedia(1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaIndex, detailPost.media.length, expandedCommentMedia, engagementKind, presentation, onClose]);

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
    setMoreCommentsError(false);
    try {
      const page = await commentApi.pageByPost(post.id, viewerId, nextPage, 10);
      setComments((current) => {
        const merged = [...current, ...(page.content ?? [])];
        return merged.filter((item, index) => merged.findIndex((candidate) => candidate.id === item.id) === index);
      });
      setCommentPage(page.pageNumber);
      setCommentHasMore(page.pageNumber + 1 < page.totalPages);
    } catch {
      setMoreCommentsError(true);
    } finally {
      setLoadingMoreComments(false);
    }
  }
  async function toggleCommentLike(id: string) {
    const response = await commentApi.toggleLike(viewerId, id);
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
      const response = await commentApi.create({
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
        draft.text = ''; draft.reply = null;
        if (draft.media) URL.revokeObjectURL(draft.media.previewUrl);
        draft.media = null;
        window.dispatchEvent(new CustomEvent("app-toast", { detail: response.message || "Media is being reviewed." }));
        setCommentText("");
        clearCommentMedia();
        setReplyTarget(null);
        return;
      }
      try {
        const created = await commentApi.byId(response.commentId);
        if (!created.parentId) setComments(current => [created, ...current.filter(item => item.id !== created.id)]);
      } catch { setCommentReloadToken(value => value + 1); }
      setCommentRevision((value) => value + 1);
      onCommentCreated(post.id);
      draft.text = ''; draft.reply = null;
      setCommentText("");
      setReplyTarget(null);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit comment.");
    } finally {
      setSending(false);
    }
  }

  const mediaViewer = <DetailMediaViewer loading={!detailMediaReady} post={detailPost} activeIndex={activeMediaIndex} previousIndex={previousMediaIndex} transitionDirection={mediaTransition} musicMuted={musicMuted} onToggleMusicMuted={() => setMusicMuted((value) => !value)} onMove={moveMedia} onTouchStart={setTouchStart} onTouchEnd={handleSwipeEnd} />;

  const content = (
    <div className="modal-backdrop post-detail-backdrop" role={presentation === 'detail' ? 'dialog' : undefined} aria-modal={presentation === 'detail' ? true : undefined} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={node => { discussionRef.current = node; interaction.ref(node); }} className="post-detail" onMouseDown={(event) => event.stopPropagation()}>
        {presentation === 'detail' && <button className="icon-button close detail-close" onClick={onClose} aria-label="Close"><X size={22} /></button>}
        {presentation === "detail" && <div className="detail-media">{mediaViewer}</div>}
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
            {!commentsRestricted && commentState === "ready" && commentHasMore && <button className="load-more-comments" onClick={() => void loadMoreComments()} disabled={loadingMoreComments}>{loadingMoreComments ? "Loading..." : moreCommentsError ? "Retry loading comments" : "Load more comments"}</button>}
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
        {engagementKind && <EngagementListModal postId={detailPost.id} kind={engagementKind} viewerId={viewerId} sheetId={`post-${post.id}-detail-${engagementOwnerId}-${engagementKind}`} onClose={() => setEngagementKind(null)} onOpenProfile={onOpenProfile} />}
        {expandedCommentMedia && createPortal(<div className="comment-media-lightbox" role="dialog" aria-modal="true" aria-label="Comment media viewer" onClick={() => setExpandedCommentMedia(null)}>
          <button type="button" className="comment-media-lightbox-close" onClick={() => setExpandedCommentMedia(null)} aria-label="Close media viewer"><X size={22} /></button>
          <div className="comment-media-lightbox-content" onClick={(event) => event.stopPropagation()}>
            {expandedCommentMedia.video ? <video src={expandedCommentMedia.url} controls autoPlay playsInline /> : <img src={expandedCommentMedia.url} alt="Expanded comment attachment" />}
          </div>
        </div>, document.body)}
      </section>
    </div>
  );
  return presentation === 'discussion' ? <MobileSheet title="Comments" onClose={onClose} className="post-discussion-sheet">{content}</MobileSheet> : content;
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
  const [replyPage, setReplyPage] = useState(0);
  const [replyHasMore, setReplyHasMore] = useState(false);
  const [moreReplyState, setMoreReplyState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [retryToken, setRetryToken] = useState(0);
  const replyPagesRef = useRef(1);
  const replyCount = item.replyCount ?? item.replies.length;
  const canReply = depth < 2;
  useEffect(() => {
    if (canReply && focusChain.includes(item.id) && focusedCommentId !== item.id) setShowReplies(true);
  }, [canReply, focusChain, focusedCommentId, item.id]);

  useEffect(() => {
    if (!showReplies || !canReply) return;
    let active = true;
    setReplyState("loading");
    const size = replyPagesRef.current * 10;
    commentApi.replies(item.id, viewerId, 0, size)
      .then((items) => { if (active) { setReplies(items ?? []); setReplyHasMore((items?.length ?? 0) >= size); setReplyState("ready"); } })
      .catch(() => { if (active) setReplyState("error"); });
    return () => { active = false; };
  }, [showReplies, item.id, viewerId, canReply, reloadToken, retryToken]);
  async function loadMoreReplies() {
    if (moreReplyState === 'loading') return;
    setMoreReplyState('loading');
    try {
      const items = await commentApi.replies(item.id, viewerId, replyPage + 1, 10);
      setReplies(current => [...current, ...items.filter(item => !current.some(existing => existing.id === item.id))]);
      replyPagesRef.current += 1;
      setReplyPage(value => value + 1); setReplyHasMore(items.length === 10); setMoreReplyState('idle');
    } catch { setMoreReplyState('error'); }
  }
  return <div data-comment-id={item.id} className={`comment-thread depth-${depth}${depth > 0 ? " reply" : ""}${focusedCommentId === item.id ? " notification-comment-highlight" : ""}`}>
    <CommentRow item={item} depth={depth} viewerId={viewerId} postAuthorId={postAuthorId} liked={Boolean(item.hasLiked)} onLike={onLike} onReply={canReply ? onReply : undefined} onOpenMedia={onOpenMedia} onOpenProfile={onOpenProfile} />
    {canReply && replyCount > 0 && <button className="load-replies" onClick={() => setShowReplies((value) => !value)} aria-expanded={showReplies}><span aria-hidden="true" />{showReplies ? "Hide replies" : "View replies"}</button>}
    {showReplies && replyState === "loading" && <div className="reply-loading">Loading replies...</div>}
    {showReplies && replyState === "error" && <button className="reply-load-error" onClick={() => setRetryToken(value => value + 1)}>Retry loading replies</button>}
    {showReplies && replyState === "ready" && replies.map((reply) => <CommentThread key={reply.id} item={{ ...reply, replies: [] }} depth={depth + 1} viewerId={viewerId} postAuthorId={postAuthorId} reloadToken={reloadToken} focusChain={focusChain} focusedCommentId={focusedCommentId} onLike={onLike} onReply={onReply} onOpenMedia={onOpenMedia} onOpenProfile={onOpenProfile} />)}
    {showReplies && replyState === 'ready' && replyHasMore && <button className="load-replies" disabled={moreReplyState === 'loading'} onClick={() => void loadMoreReplies()}>{moreReplyState === 'error' ? 'Retry loading replies' : moreReplyState === 'loading' ? 'Loading replies...' : 'Load more replies'}</button>}
  </div>;
}function CommentState({ icon: Icon, title, detail }: { icon: typeof Home; title: string; detail: string }) { return <div className="comment-state"><Icon size={22} /><strong>{title}</strong><span>{detail}</span></div>; }
