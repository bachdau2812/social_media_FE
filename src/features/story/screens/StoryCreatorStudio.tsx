import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  GripVertical,
  ImagePlus,
  Music2,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  Video,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./StoryCreatorStudio.css";
import "./StoryCreatorMobileFirst.css";
import { apiGet, apiSend, uploadCloudinaryMedia } from "../../../shared/api";
import { MusicSegmentEditor, useMusicSegmentPreview } from "../../../shared/music";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { createStoryPublicationId, storyPublicationFields } from "./storyPublication";

type MusicDto = {
  id: string;
  displayName: string;
  singleName?: string | null;
  category?: string | null;
  duration?: number | null;
  songUrl?: string | null;
  displayImages?: string | null;
};

type Page<T> = { content: T[]; pageNumber?: number; totalPages?: number };
type DraftStatus = "ready" | "uploading" | "publishing" | "published" | "failed";
type DraftBackground = "black" | "soft" | "blur";
type DraftFit = "contain" | "cover";

type StoryDraft = {
  id: string;
  file: File | null;
  previewUrl: string;
  secureUrl?: string;
  publicId?: string;
  resourceType?: string;
  fileName: string;
  mediaType: "IMAGE" | "VIDEO";
  status: DraftStatus;
  fit: DraftFit;
  background: DraftBackground;
  muted: boolean;
  music: MusicDto | null;
  musicStart: number | null;
  musicEnd: number | null;
  error?: string;
};

type StoryCreatorStudioProps = {
  userId: string;
  onClose: () => void;
  onPublished: () => void | Promise<void>;
  onDraftSaved?: (draft: { id: string; draftType: "STORY"; mediaCount: number; captionPreview: string; updatedAt: string }) => void;
  initialDraft?: { id: string; draftType: string; payload?: string | null } | null;
};

const IMAGE_MAX_BYTES = 50 * 1024 * 1024;
const VIDEO_MAX_BYTES = 500 * 1024 * 1024;

function createDraft(file: File, index: number): StoryDraft {
  return {
    id: `story-${Date.now()}-${index}-${crypto.randomUUID()}`,
    file,
    fileName: file.name,
    previewUrl: URL.createObjectURL(file),
    mediaType: file.type.startsWith("video/") ? "VIDEO" : "IMAGE",
    status: "ready",
    fit: "contain",
    background: "black",
    muted: false,
    music: null,
    musicStart: null,
    musicEnd: null,
  };
}

function validateFile(file: File) {
  const image = file.type.startsWith("image/");
  const video = file.type.startsWith("video/");
  if (!image && !video) return "Chỉ hỗ trợ tệp ảnh hoặc video.";
  if (image && file.size > IMAGE_MAX_BYTES) return "Ảnh không được vượt quá 50 MB.";
  if (video && file.size > VIDEO_MAX_BYTES) return "Video không được vượt quá 500 MB.";
  return null;
}

function formatSeconds(value: number | null) {
  const safeValue = Math.max(0, value ?? 0);
  const minutes = Math.floor(safeValue / 60);
  const seconds = Math.floor(safeValue % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function StoryCreatorStudio({ userId, onClose, onPublished, onDraftSaved, initialDraft }: StoryCreatorStudioProps) {
async function composeImageStoryFile(draft: StoryDraft): Promise<File> {
  if (!draft.file) throw new Error("Story media file is unavailable.");
  if (draft.mediaType !== "IMAGE") return draft.file;
  const image = new Image();
  image.src = draft.previewUrl;
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Không thể đọc ảnh Story."));
  });
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const context = canvas.getContext("2d");
  if (!context) return draft.file;
  context.fillStyle = draft.background === "soft" ? "#d7d7d1" : "#090c0f";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const scale = draft.fit === "cover"
    ? Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)
    : Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  return blob ? new File([blob], `${draft.file.name.replace(/\.[^.]+$/, "")}-story.jpg`, { type: "image/jpeg" }) : draft.file;
}
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrlsRef = useRef<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<StoryDraft[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "review">("edit");
  const [musicQuery, setMusicQuery] = useState("");
  const [musicResults, setMusicResults] = useState<MusicDto[]>([]);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicLoadingMore, setMusicLoadingMore] = useState(false);
  const [musicPage, setMusicPage] = useState(0);
  const [musicHasMore, setMusicHasMore] = useState(true);
  const musicRequestVersion = useRef(0);
  const publicationIdRef = useRef<string | null>(null);
  const [musicOpen, setMusicOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [closePrompt, setClosePrompt] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const restoredDraftIdRef = useRef<string | null>(null);
  const {
    previewingId,
    playSegment: playMusicSegment,
    toggleSegment: toggleMusicSegment,
    stop: stopMusicPreview,
  } = useMusicSegmentPreview();

  const active = drafts.find((draft) => draft.id === activeId) ?? drafts[0] ?? null;
  const readyCount = drafts.filter((draft) => draft.status !== "published").length;
  const allPublished = drafts.length > 0 && drafts.every((draft) => draft.status === "published");
  const canPublish = drafts.length > 0 && !publishing && drafts.some((draft) => draft.status !== "published");
  const activeIndex = active ? drafts.findIndex((draft) => draft.id === active.id) : -1;

  useBodyScrollLock(true);

  useEffect(() => {
    stopMusicPreview();
    setMobileToolsOpen(false);
  }, [active?.id, stopMusicPreview]);

  useEffect(() => {
    if (!initialDraft?.payload || initialDraft.draftType !== "STORY" || restoredDraftIdRef.current === initialDraft.id) return;
    restoredDraftIdRef.current = initialDraft.id;
    try {
      const payload = JSON.parse(initialDraft.payload) as Array<Partial<StoryDraft> & { secureUrl?: string }>;
      const restored = payload.filter((item) => Boolean(item.secureUrl)).map((item, index): StoryDraft => ({
        id: item.id ?? `restored-story-${index}-${crypto.randomUUID()}`,
        file: null,
        fileName: item.fileName ?? `story-${index + 1}`,
        previewUrl: item.secureUrl ?? "",
        secureUrl: item.secureUrl,
        publicId: item.publicId,
        resourceType: item.resourceType,
        mediaType: item.mediaType === "VIDEO" ? "VIDEO" : "IMAGE",
        status: "ready",
        fit: item.fit ?? "contain",
        background: item.background ?? "black",
        muted: item.muted ?? false,
        music: item.music ?? null,
        musicStart: item.musicStart ?? null,
        musicEnd: item.musicEnd ?? null,
      }));
      setDrafts(restored);
      setActiveId(restored[0]?.id ?? null);
      restored.forEach((draft) => previewUrlsRef.current.add(draft.previewUrl));
    } catch {
      setNotice("Không thể khôi phục bản nháp Story.");
    }
  }, [initialDraft]);

  useEffect(() => {
    if (!musicOpen) return;
    const requestVersion = ++musicRequestVersion.current;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
    setMusicResults([]);
    setMusicPage(0);
    setMusicHasMore(true);
      setMusicLoading(true);
      try {
        const page = await apiGet<Page<MusicDto>>(`/musics?page=0&size=10&keyword=${encodeURIComponent(musicQuery)}`, { signal: controller.signal });
        if (requestVersion !== musicRequestVersion.current) return;
        setMusicResults(page.content ?? []);
        setMusicPage(page.pageNumber ?? 0);
        setMusicHasMore((page.pageNumber ?? 0) + 1 < (page.totalPages ?? 0));
      } catch {
        if (!controller.signal.aborted && requestVersion === musicRequestVersion.current) setMusicResults([]);
      } finally {
        if (!controller.signal.aborted && requestVersion === musicRequestVersion.current) setMusicLoading(false);
      }
    }, 180);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [musicOpen, musicQuery]);

  async function loadMoreMusic() {
    if (musicLoading || musicLoadingMore || !musicHasMore) return;
    const requestVersion = musicRequestVersion.current;
    const nextPage = musicPage + 1;
    setMusicLoadingMore(true);
    try {
      const page = await apiGet<Page<MusicDto>>(`/musics?page=${nextPage}&size=10&keyword=${encodeURIComponent(musicQuery)}`);
      if (requestVersion !== musicRequestVersion.current) return;
      setMusicResults((current) => {
        const existing = new Set(current.map((music) => music.id));
        return [...current, ...(page.content ?? []).filter((music) => !existing.has(music.id))];
      });
      setMusicPage(page.pageNumber ?? nextPage);
      setMusicHasMore((page.pageNumber ?? nextPage) + 1 < (page.totalPages ?? 0));
    } finally {
      if (requestVersion === musicRequestVersion.current) setMusicLoadingMore(false);
    }
  }

  useEffect(() => () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function addFiles(files: FileList | File[]) {
    const accepted: File[] = [];
    const errors: string[] = [];
    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) errors.push(`${file.name}: ${error}`);
      else accepted.push(file);
    });
    if (errors.length) setNotice(errors[0]);
    if (!accepted.length) return;
    const next = accepted.map(createDraft);
    next.forEach((draft) => previewUrlsRef.current.add(draft.previewUrl));
    setDrafts((current) => [...current, ...next]);
    setActiveId((current) => current ?? next[0].id);
    setMode("edit");
  }

  function patchDraft(id: string, patch: Partial<StoryDraft>) {
    setDrafts((current) => current.map((draft) => draft.id === id ? { ...draft, ...patch } : draft));
  }

  function removeDraft(id: string) {
    setDrafts((current) => {
      const removed = current.find((draft) => draft.id === id);
      const next = current.filter((draft) => draft.id !== id);
      if (removed && !next.some((draft) => draft.previewUrl === removed.previewUrl)) {
        URL.revokeObjectURL(removed.previewUrl);
        previewUrlsRef.current.delete(removed.previewUrl);
      }
      if (activeId === id) setActiveId(next[Math.min(current.findIndex((draft) => draft.id === id), next.length - 1)]?.id ?? null);
      return next;
    });
  }

  function duplicateActive() {
    if (!active) return;
    const duplicate = { ...active, id: `story-${Date.now()}-${crypto.randomUUID()}`, status: "ready" as const, error: undefined };
    setDrafts((current) => {
      const index = current.findIndex((draft) => draft.id === active.id);
      const next = [...current];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
    setActiveId(duplicate.id);
  }

  function moveActive(direction: -1 | 1) {
    if (!active) return;
    setDrafts((current) => {
      const index = current.findIndex((draft) => draft.id === active.id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function dropOn(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    setDrafts((current) => {
      const sourceIndex = current.findIndex((draft) => draft.id === draggedId);
      const targetIndex = current.findIndex((draft) => draft.id === targetId);
      if (sourceIndex < 0 || targetIndex < 0) return current;
      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDraggedId(null);
  }

  function selectMusic(music: MusicDto) {
    if (!active) return;
    stopMusicPreview();
    const duration = Math.max(1, Math.floor(music.duration ?? 30));
    patchDraft(active.id, {
      music,
      musicStart: 0,
      musicEnd: Math.min(30, duration),
    });
    setMusicOpen(false);
  }

  function closeMusicBrowser() {
    stopMusicPreview();
    setMusicOpen(false);
  }

  async function saveDraftAndClose() {
    setPublishing(true);
    const uploads = await Promise.all(drafts.map(async (item) => item.secureUrl
      ? { secureUrl: item.secureUrl, publicId: item.publicId ?? "", resourceType: item.resourceType ?? item.mediaType.toLowerCase() }
      : uploadCloudinaryMedia(await composeImageStoryFile(item))));
    const draft = {
      id: initialDraft?.id ?? `story-draft-${Date.now()}`,
      draftType: "STORY" as const,
      mediaCount: drafts.length,
      captionPreview: drafts[0]?.fileName ?? "Story draft",
      updatedAt: new Date().toISOString(),
    };
    try {
      await apiSend(`/me/${encodeURIComponent(userId)}/drafts`, "POST", {
        id: initialDraft?.id ?? null,
        draftType: "STORY",
        thumbnailUrl: uploads[0]?.secureUrl ?? null,
        mediaCount: drafts.length,
        captionPreview: draft.captionPreview,
        payload: JSON.stringify(drafts.map((item, index) => ({
          id: item.id,
          fileName: item.fileName,
          mediaType: item.mediaType,
          secureUrl: uploads[index]?.secureUrl,
          publicId: uploads[index]?.publicId,
          resourceType: uploads[index]?.resourceType,
          fit: item.fit,
          background: item.background,
          muted: item.muted,
          music: item.music,
          musicStart: item.musicStart,
          musicEnd: item.musicEnd,
        }))),
      });
      onDraftSaved?.(draft);
      setPublishing(false);
      onClose();
    } catch {
      setPublishing(false);
      setClosePrompt(false);
      setNotice("Không thể lưu bản nháp Story.");
    }
  }

  async function publishStories() {
    if (!canPublish) return;
    stopMusicPreview();
    setPublishing(true);
    setNotice("");
    let failed = 0;
    const publicationId = publicationIdRef.current ?? createStoryPublicationId();
    publicationIdRef.current = publicationId;
    for (const [draftIndex, draft] of drafts.entries()) {
      if (draft.status === "published") continue;
      try {
        patchDraft(draft.id, { status: "uploading", error: undefined });
        const upload = draft.secureUrl
          ? { secureUrl: draft.secureUrl, publicId: draft.publicId ?? "", resourceType: draft.resourceType ?? draft.mediaType.toLowerCase() }
          : await uploadCloudinaryMedia(await composeImageStoryFile(draft));
        patchDraft(draft.id, { status: "publishing" });
        await apiSend("/profile-media/stories", "POST", {
          userId,
          mediaUrl: upload.secureUrl,
          musicId: draft.music?.id ?? null,
          musicUrl: null,
          musicStart: draft.music ? draft.musicStart : null,
          musicEnd: draft.music ? draft.musicEnd : null,
          ...storyPublicationFields(publicationId, draftIndex, drafts.length),
        });
        patchDraft(draft.id, { status: "published" });
      } catch (error) {
        failed += 1;
        patchDraft(draft.id, {
          status: "failed",
          error: error instanceof Error ? error.message : "Không thể đăng Story.",
        });
      }
    }
    setPublishing(false);
    if (failed > 0) {
      setNotice(`${failed} Story chưa đăng được. Các Story còn lại đã được giữ nguyên.`);
      return;
    }
    await onPublished();
    window.dispatchEvent(new CustomEvent("app-toast", { detail: "Story đang được xử lý và sẽ sớm hiển thị." }));
    onClose();
  }

  function requestClose() {
    if (drafts.some((draft) => draft.status !== "published")) setClosePrompt(true);
    else onClose();
  }

  const mediaClass = useMemo(() => active ? `story-studio-media ${active.fit} background-${active.background}` : "story-studio-media empty", [active]);

  return (
    <div className="story-studio-backdrop" role="dialog" aria-modal="true" aria-label="Tạo Story">
      <section className="story-studio">
        <header className="story-studio-header">
          <button className="story-studio-icon" onClick={requestClose} aria-label="Đóng trình tạo Story"><X size={21} /></button>
          <div>
            <strong>Tạo Story</strong>
            <span>{drafts.length ? `${drafts.length} Story trong phiên này` : "Canvas 9:16"}</span>
          </div>
          <div className="story-studio-steps" aria-label="Tiến trình tạo Story">
            <button className={mode === "edit" ? "active" : ""} onClick={() => setMode("edit")}>Chỉnh sửa</button>
            <button className={mode === "review" ? "active" : ""} onClick={() => setMode("review")} disabled={!drafts.length}>Xem lại</button>
          </div>
        </header>

        <div className="story-studio-body">
          <aside className="story-draft-rail" aria-label="Danh sách Story">
            <button className="story-draft-add" onClick={() => fileInputRef.current?.click()} aria-label="Thêm ảnh hoặc video"><Plus size={20} /><span>Thêm</span></button>
            {drafts.map((draft, index) => (
              <button
                key={draft.id}
                draggable
                onDragStart={() => setDraggedId(draft.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => dropOn(draft.id)}
                className={`story-draft-tile ${active?.id === draft.id ? "active" : ""} ${draft.status}`}
                onClick={() => { setActiveId(draft.id); setMode("edit"); }}
              >
                {draft.mediaType === "VIDEO" ? <video src={draft.previewUrl} muted playsInline /> : <img src={draft.previewUrl} alt="" />}
                <span>{String(index + 1).padStart(2, "0")}</span>
                {draft.status === "published" && <Check size={14} />}
                {draft.status === "failed" && <RefreshCw size={14} />}
              </button>
            ))}
            <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple hidden onChange={(event) => {
              if (event.target.files) addFiles(event.target.files);
              event.target.value = "";
            }} />
          </aside>

          <main className="story-studio-workspace">
            {mode === "edit" ? (
              <>
                <div className={mediaClass}>
                  {active ? (
                    active.mediaType === "VIDEO"
                      ? <video src={active.previewUrl} muted={active.muted} playsInline controls />
                      : <img src={active.previewUrl} alt={active.fileName} />
                  ) : (
                    <button onClick={() => fileInputRef.current?.click()}>
                      <ImagePlus size={34} />
                      <strong>Chọn ảnh hoặc video</strong>
                      <span>Tạo một hoặc nhiều Story trong cùng phiên.</span>
                    </button>
                  )}
                  {active?.music && <div className="story-studio-attribution"><Music2 size={14} /><span>{active.music.displayName}</span></div>}
                </div>
                {active && (
                  <div className="story-studio-item-nav">
                    <button onClick={() => setActiveId(drafts[activeIndex - 1]?.id ?? active.id)} disabled={activeIndex <= 0} aria-label="Story trước"><ChevronLeft size={19} /></button>
                    <span>{String(activeIndex + 1).padStart(2, "0")} / {String(drafts.length).padStart(2, "0")}</span>
                    <button onClick={() => setActiveId(drafts[activeIndex + 1]?.id ?? active.id)} disabled={activeIndex >= drafts.length - 1} aria-label="Story tiếp theo"><ChevronRight size={19} /></button>
                  </div>
                )}
                {active && <button className="story-mobile-tools-trigger" aria-expanded={mobileToolsOpen} aria-controls="story-studio-tools" onClick={() => setMobileToolsOpen(true)}><GripVertical size={18} /> Mở công cụ chỉnh sửa</button>}
              </>
            ) : (
              <section className="story-review">
                <header><strong>Xem lại chuỗi Story</strong><span>{drafts.length} mục sẽ được đăng theo thứ tự bên dưới.</span></header>
                <div>{drafts.map((draft, index) => (
                  <button key={draft.id} onClick={() => { setActiveId(draft.id); setMode("edit"); }}>
                    {draft.mediaType === "VIDEO" ? <video src={draft.previewUrl} muted /> : <img src={draft.previewUrl} alt="" />}
                    <span><strong>{String(index + 1).padStart(2, "0")} · {draft.fileName}</strong><small>{draft.music ? `${draft.music.displayName} · ${formatSeconds(draft.musicStart)}–${formatSeconds(draft.musicEnd)}` : "Không có nhạc"}</small></span>
                    <em className={draft.status}>{draft.status === "failed" ? "Thử lại" : draft.status}</em>
                  </button>
                ))}</div>
              </section>
            )}
          </main>

          <aside id="story-studio-tools" className={`story-studio-tools ${mobileToolsOpen ? "is-open" : ""}`}>
            <div className="story-mobile-tools-header"><strong>Công cụ chỉnh sửa</strong><button onClick={() => setMobileToolsOpen(false)} aria-label="Đóng công cụ chỉnh sửa"><X size={20} /></button></div>
            {active ? (
              <>
                <div className="story-tool-heading"><span><GripVertical size={16} /> Story {String(activeIndex + 1).padStart(2, "0")}</span><small>{active.fileName}</small></div>
                <section>
                  <label>Hiển thị media</label>
                  <div className="story-studio-segmented">
                    <button className={active.fit === "contain" ? "active" : ""} onClick={() => patchDraft(active.id, { fit: "contain" })}>Vừa khung</button>
                    <button className={active.fit === "cover" ? "active" : ""} onClick={() => patchDraft(active.id, { fit: "cover" })}>Phủ khung</button>
                  </div>
                </section>
                <section>
                  <label>Nền canvas</label>
                  <div className="story-background-options">
                    {(["black", "soft", "blur"] as DraftBackground[]).map((background) => (
                      <button key={background} className={`${background} ${active.background === background ? "active" : ""}`} onClick={() => patchDraft(active.id, { background })} aria-label={`Nền ${background}`} />
                    ))}
                  </div>
                </section>
                {active.mediaType === "VIDEO" && (
                  <button className="story-studio-row" onClick={() => patchDraft(active.id, { muted: !active.muted })}>
                    {active.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <span><strong>Âm thanh video</strong><small>{active.muted ? "Đang tắt" : "Đang bật"}</small></span>
                  </button>
                )}
                <section className="story-studio-music">
                  <div className="story-tool-label"><span><Music2 size={17} /> Nhạc cho Story này</span>{active.music && <button onClick={() => { stopMusicPreview(); patchDraft(active.id, { music: null, musicStart: null, musicEnd: null }); }}>Xóa</button>}</div>
                  {active.music ? (
                    <div className="story-selected-music">
                      <button className="story-music-summary" onClick={() => setMusicOpen(true)}>
                        <span><strong>{active.music.displayName}</strong><small>{active.music.singleName || active.music.category || "Music"}</small></span>
                        <span>Thay</span>
                      </button>
                      <MusicSegmentEditor
                        duration={Math.max(1, Math.floor(active.music.duration ?? 30))}
                        value={{
                          start: active.musicStart ?? 0,
                          end: active.musicEnd ?? Math.min(30, Math.max(1, Math.floor(active.music.duration ?? 30))),
                        }}
                        onInteractionStart={stopMusicPreview}
                        onChange={(segment) => patchDraft(active.id, {
                          musicStart: segment.start,
                          musicEnd: segment.end,
                        })}
                        onCommit={(segment) => {
                          void playMusicSegment(
                            { id: active.music!.id, url: active.music!.songUrl },
                            segment,
                          );
                        }}
                      />
                    </div>
                  ) : <button className="story-add-music" onClick={() => setMusicOpen(true)}><Music2 size={18} /> Chọn nhạc</button>}
                </section>
                <div className="story-studio-order-actions">
                  <button onClick={() => moveActive(-1)} disabled={activeIndex <= 0}><ChevronLeft size={17} /> Lùi</button>
                  <button onClick={() => moveActive(1)} disabled={activeIndex >= drafts.length - 1}>Tiến <ChevronRight size={17} /></button>
                </div>
                <div className="story-studio-item-actions">
                  <button onClick={duplicateActive}><Copy size={17} /> Nhân bản</button>
                  <button className="danger" onClick={() => removeDraft(active.id)}><Trash2 size={17} /> Xóa</button>
                </div>
              </>
            ) : <div className="story-tools-empty"><Video size={24} /><span>Công cụ sẽ xuất hiện sau khi bạn chọn media.</span></div>}
          </aside>
        </div>

        <footer className="story-studio-footer">
          <span>{notice || (allPublished ? "Tất cả Story đã được gửi." : `${readyCount} Story sẵn sàng`)}</span>
          <div>
            {mode === "edit" && <button onClick={() => setMode("review")} disabled={!drafts.length}>Xem lại</button>}
            <button className="primary" onClick={() => void publishStories()} disabled={!canPublish}>
              {publishing ? <RefreshCw className="spin" size={17} /> : <Send size={17} />}
              {publishing ? "Đang đăng..." : "Đăng Story"}
            </button>
          </div>
        </footer>

        {musicOpen && (
          <div className="story-music-overlay" role="dialog" aria-modal="true" aria-label="Chọn nhạc">
            <div className="story-music-browser">
              <header><div><strong>Chọn nhạc</strong><span>Áp dụng riêng cho Story đang chọn.</span></div><button onClick={closeMusicBrowser} aria-label="Đóng danh sách nhạc"><X size={19} /></button></header>
              <input autoFocus value={musicQuery} onChange={(event) => setMusicQuery(event.target.value)} placeholder="Tìm kiếm bài hát..." />
              <div>{musicLoading ? <p>Đang tìm kiếm...</p> : musicResults.length ? musicResults.map((music) => (
                <div className="story-music-result" key={music.id}>
                  <button className="story-music-select" onClick={() => selectMusic(music)}>
                    <span><strong>{music.displayName}</strong><small>{music.singleName || music.category || "Music"}</small></span>
                    {active?.music?.id === music.id ? <Check size={17} /> : <Plus size={17} />}
                  </button>
                  <button
                    type="button"
                    className="story-music-preview"
                    disabled={!music.songUrl}
                    aria-label={`${previewingId === music.id ? "Dừng nghe thử" : "Nghe thử"} ${music.displayName}`}
                    onClick={() => {
                      const duration = Math.max(1, Math.floor(music.duration ?? 30));
                      const start = active?.music?.id === music.id ? active.musicStart ?? 0 : 0;
                      const end = active?.music?.id === music.id
                        ? active.musicEnd ?? Math.min(30, duration)
                        : Math.min(30, duration);
                      void toggleMusicSegment(
                        { id: music.id, url: music.songUrl },
                        { start, end },
                      );
                    }}
                  >
                    {previewingId === music.id ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              )) : <p>Không tìm thấy bài hát.</p>}</div>
            {musicHasMore && <button className="story-music-load-more" onClick={() => void loadMoreMusic()} disabled={musicLoadingMore}>{musicLoadingMore ? "Loading more..." : "Load more tracks"}</button>}
            </div>
          </div>
        )}

        {closePrompt && (
          <div className="story-close-prompt" role="alertdialog" aria-modal="true">
            <div>
              <strong>Lưu bản nháp trước khi thoát?</strong>
              <span>Các media chưa đăng sẽ bị mất nếu bạn bỏ qua.</span>
              <button onClick={() => void saveDraftAndClose()}>Lưu bản nháp</button>
              <button className="danger" onClick={onClose}>Bỏ bản nháp</button>
              <button onClick={() => setClosePrompt(false)}>Tiếp tục chỉnh sửa</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
