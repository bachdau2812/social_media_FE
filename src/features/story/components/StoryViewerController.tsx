import { ChevronLeft, ChevronRight, MessageCircle, Users, X } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { useStoryNavigation } from "../hooks/useStoryNavigation";
import { useStoryPlayback } from "../hooks/useStoryPlayback";
import { useStoryPreloader } from "../hooks/useStoryPreloader";
import { storyApi } from "../api/story.api";
import type { StoryItem } from "../model/story.types";
import { StoryControls } from "./StoryControls";
import { StoryHeader } from "./StoryHeader";
import { isStoryVideo } from "./StoryMedia";
import { StoryProgress } from "./StoryProgress";
import { StoryReplyComposer } from "./StoryReplyComposer";
import { StorySlide } from "./StorySlide";
import { StoryTrack } from "./StoryTrack";
import { StoryViewersPanel } from "./StoryViewersPanel";
import { StoryViewport } from "./StoryViewport";

export type StoryViewerProps = {
  stories: StoryItem[];
  index: number;
  currentUserId: string;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  onViewed: (storyId: string) => void;
  onDelete?: (storyId: string) => void | Promise<void>;
  onOpenProfile: (userId: string) => Promise<void>;
};

export function StoryViewerController({ stories, index, currentUserId, onClose, onSelectIndex, onViewed, onDelete, onOpenProfile }: StoryViewerProps) {
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [composerFocused, setComposerFocused] = useState(false);
  const [visibilityPaused, setVisibilityPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [likeOverrides, setLikeOverrides] = useState<Record<string, boolean>>({});
  const [likePendingIds, setLikePendingIds] = useState<Set<string>>(new Set());
  const [moreOpen, setMoreOpen] = useState(false);
  const [viewersOpen, setViewersOpen] = useState(false);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [replyPendingIds, setReplyPendingIds] = useState<Set<string>>(new Set());
  const [replyErrors, setReplyErrors] = useState<Record<string, string | null>>({});
  const paused = userPaused || holding || composerFocused || visibilityPaused;
  const pausedRef = useRef(paused);
  const resumeAfterVisibilityRef = useRef(false);
  const reportedViewsRef = useRef(new Set<string>());
  const preloader = useStoryPreloader(stories);
  const { ensureReady, getState, markState, preloadAround, retry } = preloader;
  const navigation = useStoryNavigation({
    initialIndex: index,
    itemCount: stories.length,
    onCommit: onSelectIndex,
    prepare: ensureReady,
    onHoldChange: setHolding,
  });
  const moveStory = navigation.move;
  const current = stories[navigation.committedIndex];
  const canGoPrevious = navigation.committedIndex > 0;
  const canGoNext = navigation.committedIndex < stories.length - 1;
  const navigating = navigation.isPreparing || navigation.transitionState === "animating";
  const displayStoryId = navigation.transitionState === "animating" && navigation.pendingIndex !== null
    ? stories[navigation.pendingIndex]?.id ?? current.id
    : current.id;
  const currentState = current ? getState(current.id) : "unavailable";
  const playback = useStoryPlayback({
    story: current,
    ready: currentState === "ready",
    paused: paused || moreOpen,
    navigating,
    muted,
    onAdvance: () => {
      if (canGoNext) void moveStory(1);
      else onClose();
    },
  });
  const retryPlayback = playback.retryPlay;

  useBodyScrollLock(true);

  const previousIndex = navigation.direction === "previous" && navigation.pendingIndex !== null ? navigation.pendingIndex : navigation.committedIndex - 1;
  const nextIndex = navigation.direction === "next" && navigation.pendingIndex !== null ? navigation.pendingIndex : navigation.committedIndex + 1;
  const slides = [stories[previousIndex], current, stories[nextIndex]];
  const ownStory = current.userId === currentUserId;
  const liked = likeOverrides[current.id] ?? current.viewerReaction === "LIKE";
  const likePending = likePendingIds.has(current.id);
  const deleted = current.status === "DELETED" || current.status === "REMOVED";
  const expired = current.status === "EXPIRED";
  const replyPermitted = !ownStory && current.replyEnabled !== false && !deleted && !expired && currentState !== "network" && currentState !== "unavailable";
  const likePermitted = !ownStory && !deleted && !expired && currentState !== "network" && currentState !== "unavailable";
  const reply = replyDrafts[current.id] ?? "";
  const replyPending = replyPendingIds.has(current.id);
  const replyError = replyErrors[current.id] ?? null;
  const previewSlots = useMemo(() => {
    const ownerStarts = stories.reduce<number[]>((result, story, storyIndex) => {
      if (storyIndex === 0 || stories[storyIndex - 1]?.userId !== story.userId) result.push(storyIndex);
      return result;
    }, []);
    const ownerPosition = Math.max(0, ownerStarts.findIndex((start, ownerIndex) => navigation.committedIndex >= start && navigation.committedIndex < (ownerStarts[ownerIndex + 1] ?? stories.length)));
    return [-2, -1, 1, 2].map((offset) => ({ offset, target: ownerStarts[ownerPosition + offset] })).filter((slot): slot is { offset: number; target: number } => slot.target !== undefined).map((slot) => ({ ...slot, story: stories[slot.target] }));
  }, [navigation.committedIndex, stories]);

  async function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = reply.trim();
    if (!content || !replyPermitted || replyPending) return;
    const storyId = current.id;
    const form = event.currentTarget;
    setReplyPendingIds((ids) => new Set(ids).add(storyId));
    setReplyErrors((errors) => ({ ...errors, [storyId]: null }));
    try {
      await storyApi.reply(storyId, {
        content,
        clientMessageId: globalThis.crypto.randomUUID(),
        previewAtMs: isStoryVideo(current) ? playback.currentVideoTimeMs() : 0,
      });
      setReplyDrafts((drafts) => ({ ...drafts, [storyId]: "" }));
      form.querySelector<HTMLInputElement>("input")?.blur();
      setComposerFocused(false);
    } catch {
      setReplyErrors((errors) => ({ ...errors, [storyId]: "Không thể gửi trả lời" }));
    } finally {
      setReplyPendingIds((ids) => {
        const next = new Set(ids);
        next.delete(storyId);
        return next;
      });
    }
  }

  function retryStory(storyId: string) {
    const retryIndex = stories.findIndex((story) => story.id === storyId);
    if (retryIndex >= 0) void retry(retryIndex);
  }

  async function toggleStoryLike() {
    if (ownStory || likePending) return;
    const storyId = current.id;
    const previous = liked;
    const next = !previous;
    setLikeOverrides((values) => ({ ...values, [storyId]: next }));
    setLikePendingIds((ids) => new Set(ids).add(storyId));
    setReplyErrors((errors) => ({ ...errors, [storyId]: null }));
    try {
      if (next) await storyApi.like(storyId);
      else await storyApi.unlike(storyId);
    } catch {
      setLikeOverrides((values) => ({ ...values, [storyId]: previous }));
      setReplyErrors((errors) => ({ ...errors, [storyId]: "Không thể cập nhật lượt thích. Vui lòng thử lại." }));
    } finally {
      setLikePendingIds((ids) => {
        const nextIds = new Set(ids);
        nextIds.delete(storyId);
        return nextIds;
      });
    }
  }

  const toggleMuted = useCallback(() => {
    const nextMuted = !muted;
    if (!nextMuted && !paused) retryPlayback(false);
    setMuted(nextMuted);
  }, [muted, paused, retryPlayback]);

  useEffect(() => { void preloadAround(navigation.committedIndex); }, [navigation.committedIndex, preloadAround]);
  useEffect(() => {
    if (currentState !== "ready" && currentState !== "network" && currentState !== "unavailable") return;
    if (reportedViewsRef.current.has(current.id)) return;
    reportedViewsRef.current.add(current.id);
    onViewed(current.id);
  }, [current.id, currentState, onViewed]);
  useEffect(() => {
    setMoreOpen(false);
    setViewersOpen(false);
  }, [current.id]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        resumeAfterVisibilityRef.current = !pausedRef.current;
        setVisibilityPaused(true);
      } else {
        resumeAfterVisibilityRef.current = false;
        setVisibilityPaused(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, [contenteditable='true']")) return;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") void moveStory(-1);
      if (event.key === "ArrowRight") void moveStory(1);
      if (event.key === " " || event.key === "Spacebar") { event.preventDefault(); setUserPaused((value) => !value); }
      if (event.key.toLowerCase() === "m") toggleMuted();
    }
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveStory, onClose, toggleMuted]);

  if (!current) return null;
  return <div className="story-immersive-backdrop" role="dialog" aria-modal="true">
    <button className="story-app-mark" aria-label="Application home"><span className="app-logo compact"><MessageCircle size={18} /></span></button>
    <button className="story-global-close" onClick={onClose} aria-label="Close story"><X size={24} /></button>
    <div className={`story-preview-rail ${navigation.direction ? `moving-${navigation.direction}` : ""}`}>{previewSlots.map((slot) => <StoryPreviewCard key={`${slot.story.id}-${slot.offset}`} story={slot.story} offset={slot.offset} onClick={() => void navigation.moveTo(slot.target)} />)}</div>
    {canGoPrevious && <button className="story-external-arrow previous" disabled={navigating} onClick={() => void moveStory(-1)} aria-label="Previous story"><ChevronLeft size={22} strokeWidth={3} /></button>}
    {canGoNext && <button className="story-external-arrow next" disabled={navigating} onClick={() => void moveStory(1)} aria-label="Next story"><ChevronRight size={22} strokeWidth={3} /></button>}
    <StoryViewport className={`story-viewer immersive ${paused ? "paused" : ""}`} {...navigation.pointerHandlers}>
      <StoryTrack transform={navigation.trackTransform} animating={navigation.transitionState === "animating"} dragging={navigation.isDragging} snapping={navigation.isSnapping} onTransitionEnd={navigation.onTransitionEnd}>
        {slides.map((story, slideIndex) => <StorySlide key={story?.id ?? `boundary-${slideIndex}`} story={story} state={story ? getState(story.id) : "unavailable"} current={slideIndex === 1} muted={muted} videoRef={slideIndex === 1 ? playback.videoRef : undefined} onStateChange={markState} onRetry={retryStory} />)}
      </StoryTrack>
      <div className="story-top-gradient" /><div className="story-bottom-gradient" />
      <div className="story-chrome"><StoryProgress stories={stories} current={current} displayStoryId={displayStoryId} progress={playback.progress} /><header><StoryHeader story={current} onOpenProfile={onOpenProfile} /><StoryControls audible={isStoryVideo(current) || Boolean(current.musicUrl)} muted={muted} paused={paused} ownStory={ownStory} onToggleMuted={toggleMuted} onTogglePaused={() => setUserPaused((value) => !value)} onToggleMore={() => setMoreOpen((value) => !value)} /></header></div>
      <button className="story-hotzone previous" disabled={!canGoPrevious || navigating} onClick={() => { if (!navigation.consumeSuppressedClick()) void moveStory(-1); }} aria-label="Previous story" />
      <button className="story-hotzone next" disabled={!canGoNext || navigating} onClick={() => { if (!navigation.consumeSuppressedClick()) void moveStory(1); }} aria-label="Next story" />
      {navigation.isPreparing && <div className="story-navigation-loading" aria-label="Preparing story"><span /></div>}
      {ownStory && <div className="story-stickers own-only"><button onClick={() => setViewersOpen(true)}><Users size={15} /> Viewers</button></div>}
      {playback.playBlocked && <button className="story-play-blocked" onClick={() => retryPlayback(muted)}>Tap to play</button>}
      {ownStory && moreOpen && <div className="story-more-popover"><button onClick={() => { void navigator.clipboard?.writeText(`${window.location.origin}/stories/${current.id}`); setMoreOpen(false); }}>Copy link</button><button onClick={() => { setMoreOpen(false); setViewersOpen(true); }}>Story information</button><button className="danger" disabled={!onDelete} onClick={() => { setMoreOpen(false); if (onDelete) void onDelete(current.id); }}>Delete story</button></div>}
      <StoryReplyComposer name={current.name} value={reply} permitted={replyPermitted} sending={replyPending} error={replyError} liked={liked} showLike={likePermitted} likePending={likePending} onChange={(value) => { setReplyDrafts((drafts) => ({ ...drafts, [current.id]: value })); setReplyErrors((errors) => ({ ...errors, [current.id]: null })); }} onLikedChange={() => void toggleStoryLike()} onFocusChange={setComposerFocused} onSubmit={(event) => void submitReply(event)} />
      {viewersOpen && ownStory && <StoryViewersPanel storyId={current.id} ownerId={currentUserId} onClose={() => setViewersOpen(false)} onOpenProfile={(userId) => { setViewersOpen(false); void onOpenProfile(userId); }} />}
    </StoryViewport>
  </div>;
}

function StoryPreviewCard({ story, offset, onClick }: { story: StoryItem; offset: number; onClick: () => void }) {
  const distant = Math.abs(offset) > 1;
  return <button className={`story-preview-card ${offset < 0 ? "left" : "right"} ${distant ? "distant" : "near"}`} onClick={onClick} aria-label={`Open story by ${story.username}`}><span>{story.mediaUrl ? (isStoryVideo(story) ? <video src={story.mediaUrl} muted playsInline preload="metadata" /> : <img src={story.mediaUrl} alt="" />) : <MessageCircle size={22} />}</span><small>{story.name}</small></button>;
}
