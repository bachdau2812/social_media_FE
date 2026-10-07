import { Bookmark, ChevronRight, Heart, MessageCircle, RefreshCw, Users, WifiOff, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MobileSheet } from '../../../shared/overlays/MobileSheet';
import { useLocalSheetHistory } from '../../../shared/overlays/useLocalSheetHistory';
import { useViewportMode } from '../../../shared/hooks/useViewportMode';
import { useBodyScrollLock } from '../../../shared/overlays/useBodyScrollLock';
import { Avatar as SharedAvatar } from "../../../shared/components";
import type { Post } from "../model/post.types";
import { profileApi } from "../../profile";
import { postApi } from "../api/post.api";
type EngagementPerson = { id: string; username: string; displayName: string; avatarUrl: string };
const identityCache = new Map<string, { person: EngagementPerson; expires: number }>();
async function resolvePeople(ids: string[], viewerId: string, signal: AbortSignal) {
  const people: EngagementPerson[] = new Array(ids.length);
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(4, ids.length) }, async () => {
    while (index < ids.length && !signal.aborted) {
      const current = index++, id = ids[current], key = `${viewerId}:${id}`;
      const cached = identityCache.get(key);
      if (cached && cached.expires > Date.now()) { people[current] = cached.person; continue; }
      try {
        const profile = await profileApi.getSummary(id, viewerId, 1, signal);
        const person = { id, username: profile.user.username || id, displayName: profile.user.fullName || profile.user.username || id, avatarUrl: profile.currentAvatar?.secureUrl || profile.currentAvatar?.url || '' };
        people[current] = person; identityCache.set(key, { person, expires: Date.now() + 60_000 });
        if (identityCache.size > 200) identityCache.delete(identityCache.keys().next().value!);
      } catch { people[current] = { id, username: id, displayName: id, avatarUrl: '' }; }
    }
  }));
  return people.filter(Boolean);
}
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
export function EngagementListModal({ postId, kind, viewerId, onClose, onOpenProfile, sheetId }: { postId: string; kind: "LIKES" | "REPOSTS"; viewerId: string; onClose: () => void; onOpenProfile: (userId: string) => Promise<void>; sheetId?: string }) {
  const [people, setPeople] = useState<EngagementPerson[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const mobile = useViewportMode() === 'mobile';
  const dismiss = useLocalSheetHistory(sheetId ?? `post-${postId}-${kind}`, onClose, mobile);
  useBodyScrollLock(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const loading = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const load = useCallback(async (nextPage: number) => {
    if (loading.current) return;
    loading.current = true; setState('loading');
    const request = new AbortController(); controller.current = request;
    try {
      const result = await postApi.engagementActors(postId, kind, nextPage, 20, { signal: request.signal });
      const resolved = await resolvePeople(result.content ?? [], viewerId, request.signal);
      if (request.signal.aborted) return;
      setPeople(current => nextPage === 0 ? resolved : [...current, ...resolved.filter(person => !current.some(existing => existing.id === person.id))]);
      setPage(result.pageNumber); setHasMore(result.pageNumber + 1 < result.totalPages); setState('ready');
    } catch { if (!request.signal.aborted) setState('error'); }
    finally { if (controller.current === request) loading.current = false; }
  }, [postId, kind, viewerId]);
  useEffect(() => {
    setPeople([]); setPage(0); setHasMore(false); void load(0);
    return () => { controller.current?.abort(); loading.current = false; };
  }, [load]);
  const content = <div className="engagement-modal-backdrop" role={mobile ? undefined : 'dialog'} aria-modal={mobile ? undefined : true} aria-label={kind === "LIKES" ? "People who liked this post" : "People who reposted this post"} onClick={dismiss}>
    <section className="engagement-modal" onClick={(event) => event.stopPropagation()}>
      {!mobile && <header><strong>{kind === "LIKES" ? "Likes" : "Reposts"}</strong><button className="icon-button" onClick={dismiss} aria-label="Close"><X size={19} /></button></header>}
      <div className="engagement-people-list">
        {state === "loading" && <div className="engagement-list-loading"><span /><span /><span /></div>}
        {state === "error" && <div className="engagement-list-state"><WifiOff size={20} /><strong>Could not load people</strong><button onClick={() => void load(people.length ? page + 1 : 0)}>Retry loading people</button></div>}
        {state === "ready" && people.length === 0 && <div className="engagement-list-state"><Users size={20} /><strong>No people yet</strong></div>}
        {people.map((person) => <button key={person.id} className="engagement-person" onClick={() => dismiss(() => void onOpenProfile(person.id))}><Avatar src={person.avatarUrl} label={person.username} /><span><strong>{person.displayName}</strong><small>@{person.username}</small></span><ChevronRight size={16} /></button>)}
        {hasMore && state === 'ready' && <button onClick={() => void load(page + 1)}>Load more people</button>}
      </div>
    </section>
  </div>;
  return mobile ? <MobileSheet title={kind === 'LIKES' ? 'Likes' : 'Reposts'} closeLabel="Close" onClose={dismiss} className="engagement-sheet">{content}</MobileSheet> : content;
}
