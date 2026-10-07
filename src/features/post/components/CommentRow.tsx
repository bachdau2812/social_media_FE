import { Heart, MoreHorizontal, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar as SharedAvatar } from "../../../shared/components";
import { formatRelativeTime } from "../../../shared/utils";
import { commentApi, type CommentDto } from "../api/comment.api";

function Avatar({ src, label }: { src?: string; label: string }) {
  return <SharedAvatar src={src} name={label} alt={label} />;
}

function isVideoMediaUrl(url: string) {
  return /\/video\/upload\/|\.(mp4|webm|mov|m4v)(?:$|\?)/i.test(url);
}

export function CommentRow({ item, depth = 0, viewerId, postAuthorId, liked = false, onLike, onReply, onOpenMedia, onOpenProfile }: {
  item: CommentDto;
  depth?: number;
  viewerId: string;
  postAuthorId?: string;
  liked?: boolean;
  onLike?: (id: string) => Promise<boolean>;
  onReply?: (item: CommentDto) => void;
  onOpenMedia?: (url: string, video: boolean) => void;
  onOpenProfile: (userId: string) => Promise<void>;
}) {
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
      const updated = await commentApi.update(item.id, viewerId, next);
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
}
