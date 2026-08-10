import { Archive, Check, ChevronLeft, ChevronRight, ImagePlus, Info, Music2, Pause, Play, Send, X } from "lucide-react";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { apiGet, apiSend, uploadCloudinaryMedia } from "../../../shared/api";
import { validateMediaFile } from "../../../shared/media";
import {
  MUSIC_FETCH_RESULT_EVENT,
  MusicSegmentEditor,
  MusicTrackBrowser,
  normalizeMusicSegment,
  requestMusicFetch,
  type MusicDto,
  type MusicFetchResult,
  useMusicSegmentPreview,
} from "../../../shared/music";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { DEFAULT_POST_MEDIA_RATIO, POST_MEDIA_RATIOS, postMediaRatioValue, type PostMediaRatio } from "../model/postMediaRatio";

type Page<T> = { content: T[]; pageNumber?: number; totalPages?: number };
type DraftSummary = { id: string; draftType: string; thumbnailUrl?: string; mediaCount: number; captionPreview: string; updatedAt: string };
type CreateStep = 1 | 2 | 3 | 4;
type PublishStatus = "idle" | "uploading" | "processing" | "publishing" | "success" | "failure" | "draft";
type MusicSelection = { id: string; title: string; artist: string; url: string; artwork: string; duration: number };
type MediaItem = {
  id: string;
  fileName: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  file: File | null;
  secureUrl?: string;
  publicId?: string;
  resourceType?: string;
  status: "ready" | "processing" | "failed";
  itemCaption: string;
  music: MusicSelection | null;
  musicStart: number;
  musicEnd: number;
};

type Props = {
  userId: string;
  onBack: () => void;
  onClose: () => void;
  onDraftSaved: (draft: DraftSummary) => void;
  onPublished: () => void;
  initialDraft?: { id: string; draftType: string; payload?: string | null } | null;
};

export function PostCreationStudio({ userId, onBack, onClose, onDraftSaved, onPublished, initialDraft }: Props) {
  useBodyScrollLock(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    previewingId,
    playSegment: playMusicSegment,
    toggleSegment: toggleMusicSegment,
    stop: stopMusicPreview,
  } = useMusicSegmentPreview();
  const [step, setStep] = useState<CreateStep>(1);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const [expandedMusicItemId, setExpandedMusicItemId] = useState<string | null>(null);
  const [itemBrowserId, setItemBrowserId] = useState<string | null>(null);
  const [sharedBrowserOpen, setSharedBrowserOpen] = useState(false);
  const [sharedMusic, setSharedMusic] = useState<MusicSelection | null>(null);
  const [pendingSharedTrack, setPendingSharedTrack] = useState<MusicDto | null>(null);
  const [sharedStart, setSharedStart] = useState(0);
  const [sharedEnd, setSharedEnd] = useState(30);
  const [musicQuery, setMusicQuery] = useState("");
  const [tracks, setTracks] = useState<MusicDto[]>([]);
  const [fetchingTrackIds, setFetchingTrackIds] = useState<Set<string>>(() => new Set());
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicLoadingMore, setMusicLoadingMore] = useState(false);
  const [musicPage, setMusicPage] = useState(0);
  const [musicHasMore, setMusicHasMore] = useState(true);
  const musicRequestVersion = useRef(0);
  const [mediaOrientation, setMediaOrientation] = useState<Record<string, "landscape" | "portrait">>({});
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [mediaRatio, setMediaRatio] = useState<PostMediaRatio>(DEFAULT_POST_MEDIA_RATIO);
  const [status, setStatus] = useState<PublishStatus>("idle");
  const [showUnsaved, setShowUnsaved] = useState(false);
  const [toast, setToast] = useState("");
  const [fileError, setFileError] = useState("");
  const restoredDraftIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!initialDraft?.payload || initialDraft.draftType !== "POST" || restoredDraftIdRef.current === initialDraft.id) return;
    restoredDraftIdRef.current = initialDraft.id;
    try {
      const payload = JSON.parse(initialDraft.payload) as {
        caption?: string;
        hashtags?: string;
        mediaRatio?: PostMediaRatio;
        sharedMusic?: MusicSelection | null;
        musicStart?: number;
        musicEnd?: number;
        media?: Array<Partial<MediaItem> & { secureUrl?: string }>;
      };
      setCaption(payload.caption ?? "");
      setHashtags(payload.hashtags ?? "");
      setMediaRatio(payload.mediaRatio ?? DEFAULT_POST_MEDIA_RATIO);
      setSharedMusic(payload.sharedMusic ?? null);
      setSharedStart(payload.musicStart ?? 0);
      setSharedEnd(payload.musicEnd ?? 30);
      const restored = (payload.media ?? []).filter((item) => Boolean(item.secureUrl)).map((item, index): MediaItem => ({
        id: item.id ?? `restored-${index}-${crypto.randomUUID()}`,
        fileName: item.fileName ?? `media-${index + 1}`,
        type: item.type === "VIDEO" ? "VIDEO" : "IMAGE",
        url: item.secureUrl ?? "",
        file: null,
        secureUrl: item.secureUrl,
        publicId: item.publicId,
        resourceType: item.resourceType,
        status: "ready",
        itemCaption: item.itemCaption ?? "",
        music: item.music ?? null,
        musicStart: item.musicStart ?? 0,
        musicEnd: item.musicEnd ?? 30,
      }));
      setMedia(restored);
      setActiveMediaId(restored[0]?.id ?? null);
      setStep(restored.length ? 2 : 1);
    } catch {
      setFileError("Không thể khôi phục dữ liệu bản nháp.");
    }
  }, [initialDraft]);

  useEffect(() => {
    const requestVersion = ++musicRequestVersion.current;
    const controller = new AbortController();
    let alive = true;
    setTracks([]);
    setMusicPage(0);
    setMusicHasMore(true);
    setMusicLoading(true);
    apiGet<Page<MusicDto>>(`/musics?page=0&size=10&keyword=${encodeURIComponent(musicQuery)}`, { signal: controller.signal })
      .then((page) => {
        if (!alive || requestVersion !== musicRequestVersion.current) return;
        setTracks(page.content ?? []);
        setMusicPage(page.pageNumber ?? 0);
        setMusicHasMore((page.pageNumber ?? 0) + 1 < (page.totalPages ?? 0));
      })
      .catch(() => { if (alive && requestVersion === musicRequestVersion.current) setTracks([]); })
      .finally(() => { if (alive) setMusicLoading(false); });
    return () => { alive = false; controller.abort(); };
  }, [musicQuery]);

  useEffect(() => {
    const handleMusicFetchResult = (event: Event) => {
      const detail = (event as CustomEvent<MusicFetchResult>).detail;
      if (!detail || (detail.kind !== "success" && detail.kind !== "failure")) return;
      const trackId = detail.kind === "success" ? detail.music.id : detail.trackId;
      setFetchingTrackIds((current) => {
        if (!current.has(trackId)) return current;
        const next = new Set(current);
        next.delete(trackId);
        return next;
      });
      if (previewingId === trackId) stopMusicPreview();
      if (detail.kind === "success") {
        setTracks((current) => current.map((track) => track.id === trackId ? detail.music : track));
      } else {
        window.dispatchEvent(new CustomEvent("app-toast", { detail: detail.message }));
      }
    };
    window.addEventListener(MUSIC_FETCH_RESULT_EVENT, handleMusicFetchResult);
    return () => window.removeEventListener(MUSIC_FETCH_RESULT_EVENT, handleMusicFetchResult);
  }, [previewingId, stopMusicPreview]);

  async function fetchTrack(track: MusicDto) {
    if (track.fetched || fetchingTrackIds.has(track.id)) return;
    setFetchingTrackIds((current) => new Set(current).add(track.id));
    try {
      await requestMusicFetch(track.id);
    } catch {
      setFetchingTrackIds((current) => {
        const next = new Set(current);
        next.delete(track.id);
        return next;
      });
      window.dispatchEvent(new CustomEvent("app-toast", { detail: "Không thể bắt đầu tải bài hát." }));
    }
  }

  async function loadMoreTracks() {
    if (musicLoading || musicLoadingMore || !musicHasMore) return;
    const requestVersion = musicRequestVersion.current;
    const nextPage = musicPage + 1;
    setMusicLoadingMore(true);
    try {
      const page = await apiGet<Page<MusicDto>>(`/musics?page=${nextPage}&size=10&keyword=${encodeURIComponent(musicQuery)}`);
      if (requestVersion !== musicRequestVersion.current) return;
      setTracks((current) => {
        const existing = new Set(current.map((track) => track.id));
        return [...current, ...(page.content ?? []).filter((track) => !existing.has(track.id))];
      });
      setMusicPage(page.pageNumber ?? nextPage);
      setMusicHasMore((page.pageNumber ?? nextPage) + 1 < (page.totalPages ?? 0));
    } finally {
      if (requestVersion === musicRequestVersion.current) setMusicLoadingMore(false);

    }
  }
  const activeMedia = media.find((item) => item.id === activeMediaId) ?? media[0] ?? null;
  const itemMusicCount = media.filter((item) => item.type === "IMAGE" && item.music).length;
  const hasImage = media.some((item) => item.type === "IMAGE");
  const musicValid = sharedMusic
    ? sharedStart >= 0 && sharedEnd > sharedStart
    : media.every((item) => !item.music || (item.musicStart >= 0 && item.musicEnd > item.musicStart));
  const ready = media.length > 0 && media.every((item) => item.status === "ready") && musicValid;
  const hasUnsaved = media.length > 0 || Boolean(caption || hashtags || sharedMusic || itemMusicCount);

  function defaultEnd(track: MusicDto | MusicSelection) {
    return Math.max(1, Math.min(30, Math.floor((track.duration ?? 0) > 0 ? track.duration ?? 30 : 30)));
  }

  function toMusic(track: MusicDto): MusicSelection {
    return {
      id: track.id,
      title: track.displayName,
      artist: track.singleName || track.category || "Unknown artist",
      url: track.songUrl ?? "",
      artwork: track.displayImages || "",
      duration: track.duration || 0
    };
  }

  function requestClose() {
    if (hasUnsaved && status !== "success") {
      setShowUnsaved(true);
      return;
    }
    onClose();
  }

  function addFiles(files: FileList | File[]) {
    const selected = Array.from(files);
    const invalidType = selected.find((file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"));
    if (invalidType) {
      setFileError("Only image or video files are supported.");
      setStatus("failure");
      return;
    }
    const sizeError = selected
      .map((file) => validateMediaFile(file, file.type.startsWith("video/") ? "VIDEO" : "IMAGE"))
      .find((error): error is string => Boolean(error));
    if (sizeError) {
      setFileError(sizeError);
      setStatus("failure");
      return;
    }
    if (!selected.length) {
      setFileError("Choose at least one image or video.");
      setStatus("failure");
      return;
    }
    setFileError("");
    setStatus("uploading");
    const next = selected.map((file, index): MediaItem => ({
      id: `${Date.now()}-${index}-${file.name}`,
      fileName: file.name,
      type: file.type.startsWith("video/") ? "VIDEO" : "IMAGE",
      url: URL.createObjectURL(file),
      file,
      status: file.type.startsWith("video/") ? "processing" : "ready",
      itemCaption: "",
      music: null,
      musicStart: 0,
      musicEnd: 30
    }));
    setMedia((items) => [...items, ...next]);
    setActiveMediaId((current) => current ?? next[0]?.id ?? null);
    window.setTimeout(() => {
      setMedia((items) => items.map((item) => item.status === "processing" ? { ...item, status: "ready" } : item));
      setStatus("idle");
    }, 700);
  }

  function onFilesChanged(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }
  function moveItem(id: string, delta: number) {
    setMedia((items) => {
      const index = items.findIndex((item) => item.id === id);
      const nextIndex = Math.min(items.length - 1, Math.max(0, index + delta));
      if (index < 0 || index === nextIndex) return items;
      const copy = [...items];
      const [item] = copy.splice(index, 1);
      copy.splice(nextIndex, 0, item);
      return copy;
    });
  }

  function removeItem(id: string) {
    const index = media.findIndex((item) => item.id === id);
    const next = media.filter((item) => item.id !== id);
    setMedia(next);
    if (activeMediaId === id) setActiveMediaId(next[Math.min(index, next.length - 1)]?.id ?? null);
    if (expandedMusicItemId === id) {
      setExpandedMusicItemId(null);
      setItemBrowserId(null);
    }
  }

  function patchItem(id: string, patch: Partial<MediaItem>) {
    setMedia((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  function noteMediaOrientation(id: string, width: number, height: number) {
    if (!width || !height) return;
    const orientation = height >= width ? "portrait" : "landscape";
    setMediaOrientation((current) => current[id] === orientation ? current : { ...current, [id]: orientation });
  }

  function noteImageOrientation(id: string, image: HTMLImageElement) {
    noteMediaOrientation(id, image.naturalWidth, image.naturalHeight);
  }

  function noteVideoOrientation(id: string, video: HTMLVideoElement) {
    noteMediaOrientation(id, video.videoWidth, video.videoHeight);
  }

  function selectItemMusic(id: string, track: MusicDto) {
    if (!track.fetched || !track.songUrl) return;
    const music = toMusic(track);
    const end = defaultEnd(music);
    patchItem(id, { music, musicStart: 0, musicEnd: end });
    setExpandedMusicItemId(id);
    setItemBrowserId(null);
  }

  function removeItemMusic(id: string) {
    patchItem(id, { music: null, musicStart: 0, musicEnd: 30 });
    setItemBrowserId(id);
    stopPreview();
  }

  function applySharedTrack(track: MusicDto) {
    const music = toMusic(track);
    setSharedMusic(music);
    setSharedStart(0);
    setSharedEnd(defaultEnd(music));
    setMedia((items) => items.map((item) => ({ ...item, music: null, musicStart: 0, musicEnd: 30 })));
    setExpandedMusicItemId(null);
    setItemBrowserId(null);
    setSharedBrowserOpen(false);
    setPendingSharedTrack(null);
  }

  function requestSharedTrack(track: MusicDto) {
    if (!track.fetched || !track.songUrl) return;
    if (itemMusicCount > 0) {
      setPendingSharedTrack(track);
      return;
    }
    applySharedTrack(track);
  }

  function removeSharedMusic() {
    setSharedMusic(null);
    setSharedBrowserOpen(false);
    stopPreview();
    setToast("Shared music removed. Item music is available again.");
    window.setTimeout(() => setToast(""), 2400);
  }

  function openItemMusic() {
    const target = activeMedia?.type === "IMAGE" ? activeMedia : media.find((item) => item.type === "IMAGE");
    if (!target) return;
    setStep(2);
    setActiveMediaId(target.id);
    setExpandedMusicItemId(target.id);
    setItemBrowserId(target.music ? null : target.id);
  }

  function togglePreview(music: MusicSelection, start = 0, end?: number, restart = false) {
    if (!music.url) return;
    const segment = { start, end: end ?? start + defaultEnd(music) };
    void (restart ? playMusicSegment : toggleMusicSegment)(
      { id: music.id, url: music.url },
      segment,
    );
  }

  function stopPreview() {
    stopMusicPreview();
  }

  async function saveDraft() {
    setStatus("uploading");
    const uploads = await Promise.all(media.map(async (item) => item.secureUrl
      ? { secureUrl: item.secureUrl, publicId: item.publicId ?? "", resourceType: item.resourceType ?? item.type.toLowerCase() }
      : uploadCloudinaryMedia(item.file as File)));
    const draft = {
      id: initialDraft?.id ?? `draft_${Date.now()}`,
      draftType: "POST",
      mediaCount: media.length,
      captionPreview: caption || "Empty draft",
      updatedAt: new Date().toISOString()
    };
    onDraftSaved(draft);
    setStatus("draft");
    await apiSend(`/me/${userId}/drafts`, "POST", {
      id: initialDraft?.id ?? null,
      draftType: "POST",
      thumbnailUrl: uploads[0]?.secureUrl ?? null,
      captionPreview: draft.captionPreview,
      mediaCount: media.length,
      payload: JSON.stringify({
        caption,
        hashtags,
        mediaRatio,
        sharedMusic,
        musicId: sharedMusic?.id ?? null,
        musicStart: sharedMusic ? sharedStart : null,
        musicEnd: sharedMusic ? sharedEnd : null,
        media: media.map((item, index) => ({
          id: item.id,
          fileName: item.fileName,
          type: item.type,
          secureUrl: uploads[index]?.secureUrl,
          publicId: uploads[index]?.publicId,
          resourceType: uploads[index]?.resourceType,
          itemCaption: item.itemCaption,
          music: item.music,
          musicId: sharedMusic || item.type === "VIDEO" ? null : item.music?.id ?? null,
          musicStart: sharedMusic || item.type === "VIDEO" || !item.music ? null : item.musicStart,
          musicEnd: sharedMusic || item.type === "VIDEO" || !item.music ? null : item.musicEnd
        }))
      })
    }).catch(() => setStatus("failure"));
  }

  async function publish() {
    if (!ready) return;
    setStatus("publishing");
    try {
      const uploads = await Promise.all(media.map((item) => item.secureUrl
        ? { secureUrl: item.secureUrl, publicId: item.publicId ?? "", resourceType: item.resourceType ?? item.type.toLowerCase() }
        : uploadCloudinaryMedia(item.file as File)));
      const response = await apiSend<{ postId: string; message?: string }>("/posts", "POST", {
        userId,
        content: caption,
        hashtags: hashtags.split(/[ ,]+/).filter(Boolean).map((tag) => tag.replace(/^#/, "")),
        mediaRatio,
        musicId: sharedMusic?.id ?? null,
        musicStart: sharedMusic ? sharedStart : null,
        musicEnd: sharedMusic ? sharedEnd : null,
        items: media.map((item, index) => ({
          orderNumber: index + 1,
          secureUrl: uploads[index].secureUrl,
          publicId: uploads[index].publicId,
          resourceType: uploads[index].resourceType,
          caption: item.itemCaption || null,
          musicId: sharedMusic || item.type === "VIDEO" ? null : item.music?.id ?? null,
          musicStart: sharedMusic || item.type === "VIDEO" || !item.music ? null : item.musicStart,
          musicEnd: sharedMusic || item.type === "VIDEO" || !item.music ? null : item.musicEnd
        }))
      });
      setStatus("success");
      stopPreview();
      window.dispatchEvent(new CustomEvent("app-toast", { detail: response.message || "Bài viết mất một chút thời gian để tải lên, vui lòng đợi" }));
      onPublished();
      onClose();
    } catch (error) {
      setStatus("failure");
      setFileError(error instanceof Error ? error.message : "Publish failed");
    }
  }

  const previewMusic = sharedMusic ?? activeMedia?.music ?? null;
  const previewStart = sharedMusic ? sharedStart : activeMedia?.musicStart ?? 0;
  const previewEnd = sharedMusic ? sharedEnd : activeMedia?.musicEnd ?? 0;

  return <section className="screen post-create-screen">
    <div className="post-create-modal post-music-studio" role="dialog" aria-modal="true">
      <header className="post-create-header">
        <button className="icon-button" onClick={requestClose} aria-label="Close create"><X size={20} /></button>
        <nav className="step-meter" aria-label="Post creation progress">{[1, 2, 3, 4].map((item) => <button type="button" key={item} className={step === item ? "active" : item < step ? "complete" : ""} onClick={() => setStep(item as CreateStep)} aria-label={`Go to step ${item}`} aria-current={step === item ? "step" : undefined} />)}</nav>
      </header>

      <main className={`post-create-body ${step === 1 ? media.length ? "step-one-populated" : "step-one-empty" : ""}`}>
        {!(step === 1 && media.length === 0) && <section className="create-preview">
          <div className="preview-frame">
            <div className="preview-ratio-frame" style={{ aspectRatio: postMediaRatioValue(mediaRatio) }}>
            {activeMedia ? activeMedia.type === "VIDEO"
              ? <video className={`preview-media ${mediaOrientation[activeMedia.id] ?? "landscape"}`} src={activeMedia.url} muted playsInline controls onLoadedMetadata={(event) => noteVideoOrientation(activeMedia.id, event.currentTarget)} />
              : <img className={`preview-media ${mediaOrientation[activeMedia.id] ?? "landscape"}`} src={activeMedia.url} alt={activeMedia.fileName} onLoad={(event) => noteImageOrientation(activeMedia.id, event.currentTarget)} />
              : <div><ImagePlus size={32} /><span>Preview</span></div>}
            </div>
          </div>
          {previewMusic && <div className="preview-music-attribution"><Music2 size={17} /><span><strong>{previewMusic.title}</strong><small>{previewMusic.artist} · {formatTime(previewStart)}-{formatTime(previewEnd)}</small></span></div>}
          <PublishState status={status} />
        </section>}
        <section className="create-step-panel">
          {step === 1 && <div className={`create-step media-selection-step ${media.length ? "has-media" : "empty"}`}>
            <input className="media-file-input" ref={fileInputRef} type="file" accept="image/*,video/*" multiple onChange={onFilesChanged} />{fileError && <div className="create-status validation"><strong>Media validation</strong><span>{fileError}</span></div>}
            {!media.length ? <>
              <div className="drop-zone create-drop" onDragOver={(event) => event.preventDefault()} onDrop={onDrop}>
                <ImagePlus size={28} /><strong>Upload photos or videos</strong><span>JPEG, PNG, WEBP, MP4 or WEBM. Multiple items supported.</span>
                <button type="button" onClick={() => fileInputRef.current?.click()}>Choose from device</button>
              </div>
              <PublishState status={status} />
            </> : <>
              <nav className="step-one-media-list" aria-label="Selected post media">
                {media.map((item, index) => <article key={item.id} className={activeMedia?.id === item.id ? "active" : ""}>
                  <button type="button" className="step-one-media-select" onClick={() => setActiveMediaId(item.id)}>
                    <span className="media-order">{String(index + 1).padStart(2, "0")}</span>
                    <span className="step-one-media-thumb">{item.type === "VIDEO" ? <video src={item.url} muted /> : <img src={item.url} alt="" />}</span>
                    <span className="step-one-media-copy"><strong>{item.fileName}</strong><small>{item.type === "VIDEO" ? "Video" : "Image"} · {item.status}</small></span>
                    {activeMedia?.id === item.id && <Check size={17} />}
                  </button>
                  <button type="button" className="step-one-media-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.fileName}`}><X size={17} /></button>
                </article>)}
              </nav>
              <button type="button" className="add-more-media" onClick={() => fileInputRef.current?.click()}><ImagePlus size={17} /> Add more</button>
            </>}
          </div>}

          {step === 2 && <div className="create-step media-editor-step">
            <div className="create-step-heading">
              <div><h3>Edit media</h3><span>Item music · {itemMusicCount} configured</span></div>
              {itemMusicCount > 0 && <span className="music-step-chip"><Music2 size={15} />{itemMusicCount}</span>}
            </div>
            {sharedMusic && <div className="neutral-info-banner"><Info size={16} /><span>Shared post music is applied to the complete carousel. Individual music controls are hidden.</span></div>}
            <div className="step-two-media-accordion">
              {media.map((item, index) => {
                const expanded = expandedMusicItemId === item.id;
                return <article key={item.id} className={`${expanded ? "expanded" : ""} ${activeMedia?.id === item.id ? "active" : ""}`}>
                  <button type="button" className="media-accordion-trigger" onClick={() => {
                    const opening = expandedMusicItemId !== item.id;
                    setActiveMediaId(item.id);
                    setExpandedMusicItemId(opening ? item.id : null);
                    setItemBrowserId(opening && !sharedMusic && item.type === "IMAGE" && !item.music ? item.id : null);
                    stopPreview();
                  }} aria-expanded={expanded}>
                    <span className="media-order">{String(index + 1).padStart(2, "0")}</span>
                    <span className="media-list-thumb">{item.type === "VIDEO" ? <video src={item.url} muted /> : <img src={item.url} alt="" />}</span>
                    <span className="media-list-copy"><strong>{item.fileName}</strong><small>{item.itemCaption ? "Caption added" : "No caption"}{!sharedMusic && item.type === "IMAGE" ? item.music ? " · Music added" : " · No music" : ""}</small></span>
                    {!sharedMusic && item.music && <span className="media-music-status" title="Music added"><Music2 size={15} /></span>}
                    <ChevronRight className="media-accordion-chevron" size={17} />
                  </button>
                  {expanded && <div className="media-accordion-panel">
                    <div className="media-accordion-actions"><button type="button" onClick={() => moveItem(item.id, -1)} disabled={index === 0} aria-label="Move item left"><ChevronLeft size={15} /></button><button type="button" onClick={() => moveItem(item.id, 1)} disabled={index === media.length - 1} aria-label="Move item right"><ChevronRight size={15} /></button><button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.fileName}`}><X size={16} /></button></div>
                    <label className="item-caption-field"><span>Media caption</span><input value={item.itemCaption} onChange={(event) => patchItem(item.id, { itemCaption: event.target.value })} placeholder="Caption for this media" /></label>
                    {!sharedMusic && item.type === "IMAGE" && <div className="accordion-music-editor">
                      {item.music && itemBrowserId !== item.id
                        ? <SelectedTrackEditor music={item.music} start={item.musicStart} end={item.musicEnd} playing={previewingId === item.music.id} onRangeChange={(startValue, endValue) => patchItem(item.id, { musicStart: startValue, musicEnd: endValue })} onPlayToggle={() => togglePreview(item.music!, item.musicStart, item.musicEnd)} onRangeCommit={(startValue, endValue) => togglePreview(item.music!, startValue, endValue, true)} onInteractionStart={stopPreview} onReplace={() => setItemBrowserId(item.id)} onRemove={() => removeItemMusic(item.id)} />
                        : <MusicTrackBrowser tracks={tracks} query={musicQuery} loading={musicLoading} loadingMore={musicLoadingMore} hasMore={musicHasMore} selectedId={item.music?.id ?? null} previewingId={previewingId} fetchingTrackIds={fetchingTrackIds} onFetch={(track) => void fetchTrack(track)} onQueryChange={setMusicQuery} onLoadMore={() => void loadMoreTracks()} onPreview={(track) => togglePreview(toMusic(track))} onSelect={(track) => selectItemMusic(item.id, track)} onClose={() => { if (item.music) setItemBrowserId(null); else setExpandedMusicItemId(null); }} />}
                    </div>}
                  </div>}
                </article>;
              })}
            </div>
          </div>}
          {step === 3 && <div className="create-step details post-details-step">
            <div className="create-step-heading">
              <div><h3>Post details</h3><span>{sharedMusic ? "Shared music" : "No shared music"}</span></div>
              {sharedMusic && <span className="music-step-chip"><Music2 size={15} />1</span>}
            </div>
            <textarea value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Write a caption..." />
            <input value={hashtags} onChange={(event) => setHashtags(event.target.value)} placeholder="Hashtags" />
            <section className="post-ratio-section">
              <header><strong>Feed media ratio</strong><small>Applies to the media frame for this post</small></header>
              <div className="post-ratio-options" role="radiogroup" aria-label="Feed media ratio">
                {POST_MEDIA_RATIOS.map((ratio) => <button type="button" key={ratio} role="radio" aria-checked={mediaRatio === ratio} className={mediaRatio === ratio ? "active" : ""} onClick={() => setMediaRatio(ratio)}>{ratio}</button>)}
              </div>
            </section>
            <section className="shared-music-section">
              <header><Music2 size={19} /><span><strong>Music for the complete post</strong><small>Optional · Applies to every media item in this carousel</small></span></header>
              {!hasImage
                ? <div className="shared-music-empty"><span>Music is unavailable for a video-only post.</span></div>
                : sharedBrowserOpen
                  ? <MusicTrackBrowser tracks={tracks} query={musicQuery} loading={musicLoading} loadingMore={musicLoadingMore} hasMore={musicHasMore} selectedId={sharedMusic?.id ?? null} previewingId={previewingId} fetchingTrackIds={fetchingTrackIds} onFetch={(track) => void fetchTrack(track)} onQueryChange={setMusicQuery} onLoadMore={() => void loadMoreTracks()} onPreview={(track) => togglePreview(toMusic(track))} onSelect={requestSharedTrack} onClose={() => setSharedBrowserOpen(false)} />
                  : sharedMusic
                    ? <><SelectedTrackEditor music={sharedMusic} start={sharedStart} end={sharedEnd} playing={previewingId === sharedMusic.id} onRangeChange={(startValue, endValue) => { setSharedStart(startValue); setSharedEnd(endValue); }} onPlayToggle={() => togglePreview(sharedMusic, sharedStart, sharedEnd)} onRangeCommit={(startValue, endValue) => togglePreview(sharedMusic, startValue, endValue, true)} onInteractionStart={stopPreview} onReplace={() => setSharedBrowserOpen(true)} onRemove={removeSharedMusic} /><div className="neutral-info-banner"><Info size={16} /><span>This track will play across the complete post. Individual media music controls are hidden while shared music is active.</span></div></>
                    : <div className="shared-music-empty"><span>No shared track is selected. You can assign music separately to each media item in the previous step.</span><div><button type="button" onClick={() => setSharedBrowserOpen(true)}><Music2 size={16} /> Add shared music</button><button type="button" onClick={openItemMusic}>Edit item music</button></div></div>}
            </section>
          </div>}

          {step === 4 && <div className="create-step review">
            <div className="create-step-heading"><div><h3>Review and publish</h3><span>Confirm carousel and music configuration</span></div></div>
            <div className="review-block"><strong>Feed media ratio</strong><span>{mediaRatio}</span></div>
            <div className="review-block"><strong>Carousel order</strong>{media.map((item, index) => <span key={item.id}>{index + 1}. {item.fileName}{item.itemCaption ? ` - ${item.itemCaption}` : ""}</span>)}</div>
            <section className="review-music-summary">
              <header><strong>Music</strong><span>{sharedMusic ? `Shared across all ${media.length} media items` : itemMusicCount ? "Configured separately by media item" : "No music attached"}</span></header>
              {sharedMusic ? <div className="review-shared-track"><MusicArtwork music={sharedMusic} /><span><strong>{sharedMusic.title}</strong><small>{sharedMusic.artist}</small><small>{formatTime(sharedStart)}-{formatTime(sharedEnd)} · {sharedEnd - sharedStart} seconds</small></span><div><button type="button" onClick={() => togglePreview(sharedMusic, sharedStart, sharedEnd)}>{previewingId === sharedMusic.id ? <Pause size={16} /> : <Play size={16} />} Preview</button><button type="button" onClick={() => setStep(3)}>Edit</button></div></div>
                : itemMusicCount ? <div className="review-item-music-list">{media.map((item, index) => <button type="button" key={item.id} className={activeMedia?.id === item.id ? "active" : ""} onClick={() => setActiveMediaId(item.id)}><span>{String(index + 1).padStart(2, "0")}</span><span className="review-media-thumb">{item.type === "VIDEO" ? <video src={item.url} muted /> : <img src={item.url} alt="" />}</span><strong>{item.fileName}</strong><small>{item.music ? `${item.music.title} · ${formatTime(item.musicStart)}-${formatTime(item.musicEnd)}` : "No music"}</small></button>)}</div>
                  : null}
              {itemMusicCount > 0 && !sharedMusic && <button type="button" className="review-edit-music" onClick={openItemMusic}>Edit item music</button>}
            </section>
            <div className="review-block"><strong>Caption preview</strong><p>{caption || "No caption"}</p></div>
          </div>}
        </section>
      </main>

      <footer className="post-create-footer centered-actions">
        <div><button type="button" onClick={() => step === 1 ? onBack() : setStep((value) => Math.max(1, value - 1) as CreateStep)}>Back</button>{step < 4 ? <button type="button" onClick={() => setStep((value) => Math.min(4, value + 1) as CreateStep)} disabled={step === 1 && !ready}>Next</button> : <button type="button" onClick={() => void publish()} disabled={!ready || status === "publishing"}><Send size={18} /> Publish</button>}</div>
      </footer>

      {pendingSharedTrack && <div className="music-mode-dialog-backdrop" role="dialog" aria-modal="true"><div className="music-mode-dialog"><Music2 size={21} /><strong>Use one track for the complete post?</strong><p>Selecting shared music will replace the individual music presentation for this post.</p><div><button type="button" onClick={() => setPendingSharedTrack(null)}>Cancel</button><button type="button" onClick={() => applySharedTrack(pendingSharedTrack)}>Use shared music</button></div></div></div>}
      {toast && <div className="music-mode-toast">{toast}</div>}
      {showUnsaved && <div className="unsaved-warning"><div><strong>Unsaved changes warning</strong><span>Your post has unsaved work.</span><button type="button" onClick={() => setShowUnsaved(false)}>Keep editing</button><button type="button" onClick={() => void saveDraft().then(onClose)}><Archive size={16} /> Save draft</button><button type="button" onClick={onClose}>Discard</button></div></div>}
    </div>
  </section>;
}
function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function MusicArtwork({ music }: { music: MusicSelection }) {
  return music.artwork
    ? <img className="music-artwork" src={music.artwork} alt="" />
    : <span className="music-artwork fallback"><Music2 size={18} /></span>;
}

function SelectedTrackEditor({ music, start, end, playing, onRangeChange, onPlayToggle, onRangeCommit, onInteractionStart, onReplace, onRemove }: {
  music: MusicSelection;
  start: number;
  end: number;
  playing: boolean;
  onRangeChange: (start: number, end: number) => void;
  onPlayToggle: () => void;
  onRangeCommit: (start: number, end: number) => void;
  onInteractionStart: () => void;
  onReplace: () => void;
  onRemove: () => void;
}) {
  const duration = Math.max(1, Math.floor(music.duration || Math.max(end, 60)));
  return <section className="selected-music-editor compact">
    <div className="selected-track-summary"><MusicArtwork music={music} /><span><strong>{music.title}</strong><small>{music.artist}</small></span></div>
    <div className="post-music-presets">
      <span>Clip length</span>
      {[15, 30, 60].filter((seconds) => seconds <= duration).map((seconds) => (
        <button
          type="button"
          key={seconds}
          className={end - start === seconds ? "active" : ""}
          onClick={() => {
            const nextEnd = Math.min(duration, start + seconds);
            const next = normalizeMusicSegment({
              start: Math.max(0, nextEnd - seconds),
              end: nextEnd,
            }, duration);
            onInteractionStart();
            onRangeChange(next.start, next.end);
            onRangeCommit(next.start, next.end);
          }}
        >
          {seconds} sec
        </button>
      ))}
    </div>
    <MusicSegmentEditor
      duration={duration}
      value={{ start, end }}
      onInteractionStart={onInteractionStart}
      onChange={(segment) => onRangeChange(segment.start, segment.end)}
      onCommit={(segment) => onRangeCommit(segment.start, segment.end)}
    />
    <footer className="compact-music-actions"><button type="button" onClick={onPlayToggle}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? "Pause" : "Play"}</button><button type="button" onClick={onReplace}>Replace</button><button type="button" onClick={onRemove}>Remove</button></footer>
  </section>;
}

function PublishState({ status }: { status: PublishStatus }) {
  if (status === "idle") return null;
  const copy: Record<Exclude<PublishStatus, "idle">, [string, string]> = {
    uploading: ["Uploading", "Preparing selected media."],
    processing: ["Processing video", "Waiting for video processing."],
    publishing: ["Publishing", "Sending the post to the backend."],
    success: ["Publish success", "Post was submitted."],
    failure: ["Publish failure", "The request or media could not be processed."],
    draft: ["Draft saved", "Draft was sent to the backend."]
  };
  const [title, detail] = copy[status];
  return <div className="create-status"><strong>{title}</strong><span>{detail}</span></div>;
}
