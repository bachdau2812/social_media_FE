import { Check, ChevronLeft, ChevronRight, Plus, Settings, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EmptyState, ErrorState } from "../../../shared/components";
import { storyApi } from "../api/story.api";
import type { StoryArchiveDto, StoryHighlightDto } from "../model/story.dto";
import "./story-highlights.css";

export function StoryHighlights({ ownerId, ownProfile, onOpen }: {
  ownerId: string;
  ownProfile: boolean;
  onOpen: (highlight: StoryHighlightDto) => void;
}) {
  const [highlights, setHighlights] = useState<StoryHighlightDto[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [editorOpen, setEditorOpen] = useState(false);
  const [archive, setArchive] = useState<StoryArchiveDto[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState({ left: false, right: false });

  function load() {
    setState("loading");
    storyApi.highlights(ownerId).then((items) => { setHighlights(items ?? []); setState("ready"); }).catch(() => setState("error"));
  }
  useEffect(load, [ownerId]);

  const updateScrollState = useCallback(() => {
    const node = stripRef.current;
    if (!node) return;
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setScrollState({
      left: node.scrollLeft > 4,
      right: node.scrollLeft < maxScrollLeft - 4,
    });
  }, []);

  useEffect(() => {
    updateScrollState();
    const node = stripRef.current;
    if (!node) return;
    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateScrollState);
    resizeObserver?.observe(node);
    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, [highlights.length, ownProfile, updateScrollState]);

  function scrollHighlights(direction: -1 | 1) {
    stripRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
    window.setTimeout(updateScrollState, 240);
  }

  async function openEditor() {
    setEditorOpen(true);
    const page = await storyApi.archive(ownerId).catch(() => null);
    setArchive(page?.content ?? []);
  }

  async function create() {
    if (!title.trim() || selected.size === 0 || saving) return;
    setSaving(true);
    try {
      await storyApi.createHighlight(ownerId, title.trim(), [...selected], [...selected][0]);
      setEditorOpen(false); setTitle(""); setSelected(new Set()); load();
    } finally { setSaving(false); }
  }

  if (state === "loading") return <div className="story-highlight-skeleton"><i /><i /><i /></div>;
  if (state === "error") return <ErrorState message="Không thể tải Story nổi bật" onRetry={load} />;
  if (!highlights.length && !ownProfile) return null;
  return (
    <section className="story-highlights-section" aria-label="Story nổi bật">
      <div className={`story-highlights-layout ${scrollState.left ? "can-left" : ""} ${scrollState.right ? "can-right" : ""}`}>
        <button type="button" className="story-highlight-scroll-button previous" onClick={() => scrollHighlights(-1)} aria-label="Story nổi bật trước" hidden={!scrollState.left}><ChevronLeft size={16} /></button>
        <div ref={stripRef} className="story-highlights-strip">
          {ownProfile ? <button type="button" className="story-highlight-item add" onClick={() => void openEditor()}><span><Plus size={20} /></span><small>Thêm mới</small></button> : null}
          {highlights.map((highlight) => <button type="button" className="story-highlight-item" key={highlight.id} onClick={() => onOpen(highlight)}><span>{highlight.coverUrl ? <img src={highlight.coverUrl} alt="" /> : <Settings size={19} />}</span><small>{highlight.title}</small></button>)}
        </div>
        <button type="button" className="story-highlight-scroll-button next" onClick={() => scrollHighlights(1)} aria-label="Story nổi bật tiếp theo" hidden={!scrollState.right}><ChevronRight size={16} /></button>
      </div>
      {editorOpen ? <div className="highlight-editor-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditorOpen(false); }}><section className="highlight-editor" role="dialog" aria-modal="true" aria-label="Tạo Story nổi bật"><header><strong>Tạo Story nổi bật</strong><button type="button" onClick={() => setEditorOpen(false)} aria-label="Đóng"><X size={19} /></button></header><label>Tên<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} /></label>{archive.length ? <div className="highlight-story-grid">{archive.map((story) => <button type="button" key={story.id} className={selected.has(story.id) ? "selected" : ""} onClick={() => setSelected((current) => { const next = new Set(current); if (next.has(story.id)) next.delete(story.id); else next.add(story.id); return next; })}>{story.mediaType?.toUpperCase() === "VIDEO" ? <video src={story.mediaUrl ?? ""} muted /> : <img src={story.mediaUrl ?? ""} alt="" />}{selected.has(story.id) ? <Check size={17} /> : null}</button>)}</div> : <EmptyState title="Kho Story đang trống" />}<footer><button type="button" onClick={() => setEditorOpen(false)}>Hủy</button><button type="button" onClick={() => void create()} disabled={!title.trim() || !selected.size || saving}>{saving ? "Đang tạo" : "Tạo"}</button></footer></section></div> : null}
    </section>
  );
}
