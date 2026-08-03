import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, GripVertical, ImagePlus, LoaderCircle, Pause, Play, RefreshCw, Trash2, X } from "lucide-react";
import { formatVoiceDuration, type ChatImageDraft } from "../hooks/useChatMediaComposer";

export type ChatDisplayMediaItem = {
  id?: string | null;
  url?: string | null;
  fileName?: string | null;
  status?: "ready" | "uploading" | "failed" | null;
  progress?: number | null;
  error?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ChatViewerItem = { url: string; alt: string };

export function ChatAttachmentTray({ images, disabled, onAdd, onRemove, onMove, onRetry, onClear }: {
  images: ChatImageDraft[];
  disabled: boolean;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onMove: (sourceId: string, targetId: string) => void;
  onRetry: (id: string) => void;
  onClear: () => void;
}) {
  const dragIdRef = useRef<string | null>(null);
  if (!images.length) return null;
  return <section className="chat-attachment-tray" aria-label={`${images.length} ảnh đã chọn`}>
    <header><strong>{images.length} ảnh đã chọn</strong><button type="button" onClick={onClear} disabled={disabled}>Bỏ tất cả</button></header>
    <div className="chat-attachment-scroll">
      {images.map((image, index) => <article
        className={`chat-attachment-thumb ${image.status}`}
        key={image.id}
        draggable={!disabled}
        onDragStart={() => { dragIdRef.current = image.id; }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => { if (dragIdRef.current) onMove(dragIdRef.current, image.id); dragIdRef.current = null; }}
      >
        <img src={image.previewUrl} alt={`Ảnh đã chọn ${index + 1}`} />
        <span className="chat-attachment-index">{String(index + 1).padStart(2, "0")}</span>
        {!disabled && <span className="chat-attachment-drag" aria-hidden="true"><GripVertical size={13} /></span>}
        <button type="button" className="chat-attachment-remove" onClick={() => onRemove(image.id)} disabled={disabled} aria-label={`Bỏ ảnh ${index + 1}`}><X size={13} /></button>
        {image.status === "uploading" && <span className="chat-attachment-state"><LoaderCircle size={15} className="spin" /><small>{Math.max(1, image.progress)}%</small></span>}
        {image.status === "failed" && <button type="button" className="chat-attachment-state failed" onClick={() => onRetry(image.id)} aria-label={`Thử lại ảnh ${index + 1}`}><RefreshCw size={14} /><small>Thử lại</small></button>}
      </article>)}
      <button type="button" className="chat-attachment-add" onClick={onAdd} disabled={disabled} aria-label="Thêm ảnh"><ImagePlus size={19} /><span>Thêm</span></button>
    </div>
  </section>;
}

export function ChatImageMosaic({ items, caption, onOpen, sending, failed, onRetry }: {
  items: ChatDisplayMediaItem[];
  caption?: string | null;
  onOpen: (items: ChatViewerItem[], index: number) => void;
  sending?: boolean;
  failed?: boolean;
  onRetry?: () => void;
}) {
  const available = items.filter((item): item is ChatDisplayMediaItem & { url: string } => Boolean(item.url));
  if (!available.length) return <p className="chat-media-unavailable">Ảnh không còn khả dụng.</p>;
  const viewerItems = available.map((item, index) => ({ url: item.url, alt: item.fileName || `Ảnh trong tin nhắn ${index + 1}` }));
  const canPair = available.length === 2 && available.every((item) => Boolean(item.width && item.height && item.width >= item.height));
  const layoutClass = canPair ? "paired" : "stacked";
  return <figure className={`chat-media-group media-card ${layoutClass} ${sending ? "sending" : ""} ${failed ? "failed" : ""}`}>
    <div className="chat-media-mosaic">
      {available.map((item, index) => <ChatImageCell key={item.id || `${item.url}-${index}`} item={item} index={index} total={available.length} displayWidth={canPair ? 420 : 840} onOpen={() => onOpen(viewerItems, index)} />)}
    </div>
    {caption?.trim() && <figcaption>{caption.trim()}</figcaption>}
    {sending && <span className="chat-media-group-status"><LoaderCircle size={16} className="spin" /> Đang gửi</span>}
    {failed && <span className="chat-media-group-status failed">Gửi thất bại {onRetry && <button type="button" onClick={(event) => { event.stopPropagation(); onRetry(); }}><RefreshCw size={14} /> Thử lại</button>}</span>}
  </figure>;
}

function ChatImageCell({ item, index, total, displayWidth, onOpen }: { item: ChatDisplayMediaItem & { url: string }; index: number; total: number; displayWidth: number; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const displayUrl = transformChatImageUrl(item.url, displayWidth);
  return <button type="button" className={`chat-media-cell ${loaded ? "loaded" : "loading"}`} onClick={(event) => { event.stopPropagation(); onOpen(); }} aria-label={`Mở ảnh ${index + 1} / ${total}`}>
    {!loaded && !failed && <LoaderCircle size={18} className="spin" />}
    {failed ? <span><ImagePlus size={18} /> Không tải được</span> : <img src={displayUrl} alt={item.fileName || `Ảnh trong tin nhắn ${index + 1}`} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
  </button>;
}

function transformChatImageUrl(url: string, width: number) {
  const marker = "/image/upload/";
  const markerIndex = url.indexOf(marker);
  if (markerIndex < 0) return url;
  const prefix = url.slice(0, markerIndex + marker.length);
  const source = url.slice(markerIndex + marker.length);
  return `${prefix}c_scale,w_${width},q_auto:good,f_auto/${source}`;
}
export function ChatMediaViewer({ items, initialIndex, onClose }: { items: ChatViewerItem[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(Math.min(Math.max(initialIndex, 0), Math.max(0, items.length - 1)));
  const touchStartRef = useRef<number | null>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") setIndex((value) => Math.max(0, value - 1));
      if (event.key === "ArrowRight") setIndex((value) => Math.min(items.length - 1, value + 1));
    };
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keydown);
    };
  }, [items.length, onClose]);
  const current = items[index];
  if (!current) return null;
  return createPortal(<div className="chat-media-viewer" role="dialog" aria-modal="true" aria-label="Xem ảnh" onPointerDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onTouchStart={(event) => { touchStartRef.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
    const start = touchStartRef.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartRef.current = null;
    if (start == null || end == null || Math.abs(start - end) < 45) return;
    setIndex((value) => start > end ? Math.min(items.length - 1, value + 1) : Math.max(0, value - 1));
  }}>
    <header><span>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><button type="button" onClick={onClose} aria-label="Đóng"><X size={22} /></button></header>
    {index > 0 && <button type="button" className="chat-viewer-nav previous" onClick={() => setIndex((value) => value - 1)} aria-label="Ảnh trước"><ChevronLeft size={25} /></button>}
    <img src={current.url} alt={current.alt} />
    {index < items.length - 1 && <button type="button" className="chat-viewer-nav next" onClick={() => setIndex((value) => value + 1)} aria-label="Ảnh tiếp theo"><ChevronRight size={25} /></button>}
  </div>, document.body);
}

const CHAT_AUDIO_WAVEFORM = [8, 13, 20, 12, 24, 16, 27, 18, 11, 22, 26, 15, 23, 12, 19, 25, 17, 10, 22, 14, 24, 18, 12, 8];

function finiteAudioSeconds(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function ChatAudioPlayer({ src, durationHint, compact = false }: { src: string; durationHint?: number | null; compact?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const idRef = useRef(`chat-audio-${Math.random().toString(36).slice(2)}`);
  const hintedDuration = finiteAudioSeconds((durationHint ?? 0) / 1000);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(hintedDuration);
  const [playbackRate, setPlaybackRate] = useState<1 | 1.5 | 2>(1);

  useEffect(() => {
    setPlaying(false);
    setLoading(true);
    setFailed(false);
    setMetadataLoaded(false);
    setCurrent(0);
    setDuration(hintedDuration);
    setPlaybackRate(1);
  }, [src, hintedDuration]);

  useEffect(() => {
    const pauseOther = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail !== idRef.current) audioRef.current?.pause();
    };
    window.addEventListener("chat-audio-play", pauseOther);
    return () => {
      audioRef.current?.pause();
      window.removeEventListener("chat-audio-play", pauseOther);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio || failed) return;
    if (audio.paused) {
      setLoading(true);
      window.dispatchEvent(new CustomEvent("chat-audio-play", { detail: idRef.current }));
      void audio.play().catch(() => {
        setFailed(true);
        setLoading(false);
      });
    } else {
      audio.pause();
    }
  }

  function retry() {
    const audio = audioRef.current;
    if (!audio) return;
    setFailed(false);
    setLoading(true);
    setMetadataLoaded(false);
    setCurrent(0);
    audio.load();
  }

  function seek(nextValue: number) {
    const safeDuration = finiteAudioSeconds(duration);
    if (!safeDuration) return;
    const next = Math.min(Math.max(finiteAudioSeconds(nextValue), 0), safeDuration);
    setCurrent(next);
    if (audioRef.current) audioRef.current.currentTime = next;
  }

  function cyclePlaybackRate() {
    const next = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    setPlaybackRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  }

  if (!src) return <span className="chat-audio-unavailable">Tin nhắn thoại không còn khả dụng.</span>;

  const safeDuration = finiteAudioSeconds(duration);
  const safeCurrent = Math.min(finiteAudioSeconds(current), safeDuration || 0);
  const progress = safeDuration ? Math.min(100, Math.max(0, (safeCurrent / safeDuration) * 100)) : 0;
  const shownSeconds = safeCurrent > 0 ? safeCurrent : safeDuration;
  const durationLabel = metadataLoaded && shownSeconds > 0 ? formatVoiceDuration(shownSeconds * 1000) : "--:--";

  return <div className={`chat-audio-player ${compact ? "compact" : ""} ${failed ? "failed" : ""}`} onClick={(event) => event.stopPropagation()}>
    <audio
      ref={audioRef}
      src={src}
      preload="metadata"
      onLoadStart={() => setLoading(true)}
      onLoadedMetadata={(event) => {
        const nextDuration = finiteAudioSeconds(event.currentTarget.duration) || hintedDuration;
        setDuration(nextDuration);
        setMetadataLoaded(true);
        setLoading(false);
      }}
      onDurationChange={(event) => {
        const nextDuration = finiteAudioSeconds(event.currentTarget.duration);
        if (nextDuration) setDuration(nextDuration);
      }}
      onCanPlay={() => setLoading(false)}
      onWaiting={() => setLoading(true)}
      onPlaying={() => setLoading(false)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onTimeUpdate={(event) => setCurrent(finiteAudioSeconds(event.currentTarget.currentTime))}
      onEnded={() => { setPlaying(false); setCurrent(0); }}
      onError={() => { setFailed(true); setLoading(false); }}
    />
    {failed ? <>
      <span className="chat-audio-error">Không thể phát âm thanh</span>
      <button type="button" className="chat-audio-retry" onClick={retry}><RefreshCw size={15} /> Retry</button>
    </> : <>
      <button type="button" className="chat-audio-play" onClick={toggle} aria-label={playing ? "Tạm dừng" : "Phát tin nhắn thoại"}>
        {loading ? <LoaderCircle size={17} className="spin" /> : playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
      </button>
      <label className="chat-audio-waveform">
        <span className="chat-audio-bars base" aria-hidden="true">{CHAT_AUDIO_WAVEFORM.map((height, index) => <i key={`base-${index}`} style={{ height }} />)}</span>
        <span className="chat-audio-bars played" style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }} aria-hidden="true">{CHAT_AUDIO_WAVEFORM.map((height, index) => <i key={`played-${index}`} style={{ height }} />)}</span>
        <input type="range" min="0" max={safeDuration || 1} step="0.1" value={safeCurrent} disabled={!safeDuration} onChange={(event) => seek(Number(event.target.value))} aria-valuetext={`${formatVoiceDuration(safeCurrent * 1000)} / ${safeDuration ? formatVoiceDuration(safeDuration * 1000) : "--:--"}`} />
      </label>
      <time>{durationLabel}</time>
      <button type="button" className="chat-audio-speed" onClick={cyclePlaybackRate} aria-label={`Tốc độ phát ${playbackRate}x`}>{playbackRate}x</button>
    </>}
  </div>;
}

export function ChatVoiceComposerState({ recording, elapsed, audioUrl, duration, onCancelRecording, onStopRecording, onRemoveAudio }: {
  recording: boolean;
  elapsed: number;
  audioUrl?: string | null;
  duration?: number | null;
  onCancelRecording: () => void;
  onStopRecording: () => void;
  onRemoveAudio: () => void;
}) {
  if (recording) return <section className="chat-voice-composer recording" aria-live="polite"><span className="voice-recording-pulse" /><strong>Đang ghi âm</strong><time>{formatVoiceDuration(elapsed)}</time><button type="button" onClick={onCancelRecording}><Trash2 size={16} /> Hủy</button><button type="button" onClick={onStopRecording}><Pause size={16} fill="currentColor" /> Dừng</button></section>;
  if (!audioUrl) return null;
  return <section className="chat-voice-composer preview"><ChatAudioPlayer src={audioUrl} durationHint={duration} compact /><button type="button" onClick={onRemoveAudio} aria-label="Xóa bản ghi"><X size={16} /></button></section>;
}
