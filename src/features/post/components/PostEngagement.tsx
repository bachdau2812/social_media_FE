import { Bookmark, ChevronRight, Heart, MessageCircle, RefreshCw, Users, WifiOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar as SharedAvatar } from "../../../shared/components";
import type { Post } from "../model/post.types";
import { profileApi } from "../../profile";
import { postApi } from "../api/post.api";
type EngagementPerson = { id: string; username: string; displayName: string; avatarUrl: string };
function Avatar({ src, label }: { src?: string; label: string }) { return <SharedAvatar src={src} name={label} alt={label} />; }
function formatCount(value: number) { return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : String(value); }

export function ActionBar({ post, onToggle, onComment, onOpenEngagement, showCounts = true }: { post: Post; onToggle: (postId: string, key: "liked" | "saved" | "reposted") => void; onComment?: () => void; onOpenEngagement?: (kind: "LIKES" | "REPOSTS") => void; showCounts?: boolean }) {
  return <div className="action-bar">
    <div className="engagement-action"><button className={post.viewerState.liked ? "active like-active" : "like-action"} onClick={() => onToggle(post.id, "liked")} aria-label="Like"><Heart size={21} fill={post.viewerState.liked ? "currentColor" : "none"} /></button>{showCounts && <button className="engagement-count" onClick={() => onOpenEngagement?.("LIKES")} aria-label={`View ${post.engagement.likes} likes`}>{formatCount(post.engagement.likes)}</button>}</div>
    <div className="engagement-action"><button onClick={onComment} aria-label="Comment"><MessageCircle size={21} /></button>{showCounts && <button className="engagement-count" onClick={onComment} aria-label={`Open ${post.engagement.comments} comments`}>{formatCount(post.engagement.comments)}</button>}</div>
    <div className="engagement-action"><button className={post.viewerState.reposted ? "active repost-active" : "repost-action"} onClick={() => onToggle(post.id, "reposted")} aria-label="Repost"><RefreshCw size={21} /></button>{showCounts && <button className="engagement-count" onClick={() => onOpenEngagement?.("REPOSTS")} aria-label={`View ${post.engagement.reposts} reposts`}>{formatCount(post.engagement.reposts)}</button>}</div>
    <button className={post.viewerState.saved ? "active save-action" : "save-action"} onClick={() => onToggle(post.id, "saved")} aria-label="Save"><Bookmark size={21} fill={post.viewerState.saved ? "currentColor" : "none"} /></button>
  </div>;
}
export function EngagementListModal({ postId, kind, viewerId, onClose, onOpenProfile }: { postId: string; kind: "LIKES" | "REPOSTS"; viewerId: string; onClose: () => void; onOpenProfile: (userId: string) => Promise<void> }) {
  const [people, setPeople] = useState<EngagementPerson[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let active = true;
    setState("loading");
    postApi.engagementActors(postId, kind)
      .then((page) => Promise.all((page.content ?? []).map((userId) => profileApi.getSummary(userId, viewerId, 1).catch(() => null))))
      .then((profiles) => { if (active) { setPeople(profiles.filter((item) => item !== null).map((item) => ({ id: item.user.userId, username: item.user.username || item.user.userId, displayName: item.user.fullName || item.user.username || item.user.userId, avatarUrl: item.currentAvatar?.secureUrl || item.currentAvatar?.url || "" }))); setState("ready"); } })
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
}