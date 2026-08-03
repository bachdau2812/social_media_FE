import { Archive, Bookmark, FileEdit, Image, RefreshCw, Trash2, Undo2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { libraryApi } from "../api/library.api";
import type { ArchiveItem, ContentDraft, SavedPost, StoryArchiveItem } from "../model/library.types";
import "./library-screen.css";

type Tab = "SAVED" | "DRAFTS" | "ARCHIVE";
type Props = {
  userId: string;
  onOpenPost: (postId: string) => void;
  onOpenStory: (storyId: string) => void;
  onResumeDraft: (draft: ContentDraft) => void;
};

export function LibraryScreen({ userId, onOpenPost, onOpenStory, onResumeDraft }: Props) {
  const [tab, setTab] = useState<Tab>("SAVED");
  const [archiveType, setArchiveType] = useState<"POST" | "STORY">("POST");
  const [saved, setSaved] = useState<SavedPost[]>([]);
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [archive, setArchive] = useState<ArchiveItem[]>([]);
  const [storyArchive, setStoryArchive] = useState<StoryArchiveItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const [savedPage, nextDrafts, nextArchive, nextStoryArchive] = await Promise.all([
        libraryApi.saved(userId),
        libraryApi.drafts(userId),
        libraryApi.archive(userId, "POST"),
        libraryApi.storyArchive(userId),
      ]);
      setSaved(savedPage.content ?? []);
      setDrafts(nextDrafts ?? []);
      setArchive(nextArchive ?? []);
      setStoryArchive(nextStoryArchive.content ?? []);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [userId]);

  useEffect(() => { void load(); }, [load]);

  async function removeSaved(item: SavedPost) {
    await libraryApi.removeSaved(userId, item.postId);
    setSaved((current) => current.filter((entry) => entry.id !== item.id));
  }
  async function removeDraft(item: ContentDraft) {
    await libraryApi.deleteDraft(userId, item.id);
    setDrafts((current) => current.filter((entry) => entry.id !== item.id));
  }
  async function restore(item: ArchiveItem) {
    await libraryApi.restoreArchive(userId, item.contentId);
    setArchive((current) => current.filter((entry) => entry.id !== item.id));
  }
  async function removeArchive(item: ArchiveItem) {
    await libraryApi.deleteArchive(userId, item.id);
    setArchive((current) => current.filter((entry) => entry.id !== item.id));
  }

  const archiveRows = archive.filter((item) => item.contentType.toUpperCase().includes("POST"));
  const count = tab === "SAVED" ? saved.length : tab === "DRAFTS" ? drafts.length : archiveRows.length + storyArchive.length;
  return <section className="screen feature-library">
    <header className="feature-library-header"><div><span>Thư viện cá nhân</span><h2>Kho nội dung</h2><p>{count} mục</p></div><button onClick={() => void load()} aria-label="Tải lại"><RefreshCw size={18} /></button></header>
    <nav className="feature-library-tabs" aria-label="Các phần thư viện">
      <button className={tab === "SAVED" ? "active" : ""} onClick={() => setTab("SAVED")}><Bookmark size={18} />Đã lưu</button>
      <button className={tab === "DRAFTS" ? "active" : ""} onClick={() => setTab("DRAFTS")}><FileEdit size={18} />Bản nháp</button>
      <button className={tab === "ARCHIVE" ? "active" : ""} onClick={() => setTab("ARCHIVE")}><Archive size={18} />Kho lưu trữ</button>
    </nav>
    {status === "loading" && <div className="feature-library-grid loading">{Array.from({ length: 6 }, (_, index) => <span key={index} />)}</div>}
    {status === "error" && <LibraryState title="Không thể tải thư viện" action="Thử lại" onAction={() => void load()} />}
    {status === "ready" && tab === "SAVED" && (saved.length ? <div className="feature-library-grid">{saved.map((item) => <article key={item.id}><button className="library-preview placeholder" onClick={() => onOpenPost(item.postId)}><Image size={26} /><small>Bài viết</small></button><div><strong>{item.postId.slice(0, 12)}</strong><button onClick={() => void removeSaved(item)} aria-label="Bỏ lưu"><Trash2 size={17} /></button></div></article>)}</div> : <LibraryState title="Chưa có bài viết đã lưu" />)}
    {status === "ready" && tab === "DRAFTS" && (drafts.length ? <div className="feature-library-grid">{drafts.map((item) => <article key={item.id}><button className="library-preview" onClick={() => onResumeDraft(item)}>{item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" /> : <FileEdit size={26} />}<small>{item.draftType}</small></button><div><strong>{item.captionPreview || "Bản nháp chưa đặt tên"}</strong><button onClick={() => void removeDraft(item)} aria-label="Xóa bản nháp"><Trash2 size={17} /></button></div></article>)}</div> : <LibraryState title="Chưa có bản nháp" />)}
    {status === "ready" && tab === "ARCHIVE" && <><div className="feature-library-filter"><button className={archiveType === "POST" ? "active" : ""} onClick={() => setArchiveType("POST")}>Bài viết</button><button className={archiveType === "STORY" ? "active" : ""} onClick={() => setArchiveType("STORY")}>Story</button></div>{archiveType === "POST" ? (archiveRows.length ? <div className="feature-library-grid">{archiveRows.map((item) => <article key={item.id}><button className="library-preview" onClick={() => onOpenPost(item.contentId)}>{item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" /> : <Archive size={26} />}<small>Bài viết</small></button><div><strong>{item.captionPreview || item.contentId.slice(0, 12)}</strong><span><button onClick={() => void restore(item)} aria-label="Khôi phục"><Undo2 size={17} /></button><button onClick={() => void removeArchive(item)} aria-label="Xóa vĩnh viễn"><Trash2 size={17} /></button></span></div></article>)}</div> : <LibraryState title="Chưa có bài viết lưu trữ" />) : (storyArchive.length ? <div className="feature-library-grid story-archive-grid">{storyArchive.map((item) => <article key={item.id}><button className="library-preview" onClick={() => onOpenStory(item.id)}>{item.mediaUrl ? (item.mediaType?.toUpperCase().includes("VIDEO") ? <video src={item.mediaUrl} muted preload="metadata" /> : <img src={item.mediaUrl} alt="" />) : <Archive size={26} />}<small>Story</small></button><div><strong>{item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : item.id.slice(0, 12)}</strong></div></article>)}</div> : <LibraryState title="Chưa có Story lưu trữ" />)}</>}
  </section>;
}

function LibraryState({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <div className="feature-library-state"><Archive size={24} /><strong>{title}</strong>{action && <button onClick={onAction}>{action}</button>}</div>;
}
