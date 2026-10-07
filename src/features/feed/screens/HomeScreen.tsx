import { Compass, Users, WifiOff, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PostCard, type Post } from "../../post";
import { StoryRail, type StoryItem } from "../../story";
import { feedEntryIdentity } from "../model/feed.mapper";
import { shouldStartFeedTabSwipe } from "./homeSwipe";

export type FeedLoadState = "idle" | "loading" | "ready" | "error";

export type HomeScreenProps = {
  userId: string;
  tab: "DISCOVER" | "FRIENDS";
  setTab: (tab: "DISCOVER" | "FRIENDS") => void;
  stories: StoryItem[];
  posts: Post[];
  status: FeedLoadState;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => Promise<void>;
  onSelectPost: (post: Post) => void;
  onCreateStory: () => void;
  onSelectStory: (story: StoryItem) => void;
  onTogglePost: (postId: string, key: "liked" | "saved" | "reposted") => void;
  onEditPost: (post: Post) => void;
  onArchivePost: (post: Post) => Promise<void>;
  onOpenProfile: (userId: string) => Promise<void>;
};

export function HomeScreen(props: HomeScreenProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const readyTabRef = useRef<string | null>(null);
  const hasPosts = props.posts.length > 0;
  const initialLoading = props.status === "loading" || props.status === "idle";
  const retainingFeed = readyTabRef.current === props.tab && hasPosts;
  const showFeedContent = props.status === "ready" || retainingFeed;
  useEffect(() => { if (props.status === 'ready') readyTabRef.current = props.tab; }, [props.status, props.tab]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !props.hasMore || props.loadingMore || props.status !== "ready") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) void props.onLoadMore();
    }, { rootMargin: "600px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [props.hasMore, props.loadingMore, props.status, props.posts.length, props.onLoadMore]);

  function handleTouchEnd(x: number, y: number) {
    if (touchStart === null) return;
    const delta = touchStart.x - x;
    if (Math.abs(delta) > 56 && Math.abs(delta) > Math.abs(touchStart.y - y) * 1.4) props.setTab(delta > 0 ? "FRIENDS" : "DISCOVER");
    setTouchStart(null);
  }

  return (
    <section
      className="screen feed-screen"
      aria-busy={initialLoading}
      onTouchStart={(event) => { const touch = event.touches[0]; setTouchStart(shouldStartFeedTabSwipe(event.target) && touch && event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null); }}
      onTouchCancel={() => setTouchStart(null)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0, event.changedTouches[0]?.clientY ?? 0)}
    >
      <div className="home-stories">
        <StoryRail userId={props.userId} items={props.stories} onCreate={props.onCreateStory} onSelect={props.onSelectStory} />
      </div>
      <div className="home-sticky">
        <div className="feed-tabs" role="tablist" aria-label="Feed tabs">
          <button className={props.tab === "DISCOVER" ? "active" : ""} onClick={() => props.setTab("DISCOVER")} role="tab" aria-selected={props.tab === "DISCOVER"}>Discover</button>
          <button className={props.tab === "FRIENDS" ? "active" : ""} onClick={() => props.setTab("FRIENDS")} role="tab" aria-selected={props.tab === "FRIENDS"}>Friends</button>
        </div>
      </div>
      {initialLoading && !retainingFeed && <SkeletonFeed />}
      {props.status === "error" && <FeedState icon={WifiOff} title="No internet" detail="Feed could not be loaded from the backend." />}
      {showFeedContent && !hasPosts && (
        <FeedState
          icon={props.tab === "FRIENDS" ? Users : Compass}
          title={props.tab === "FRIENDS" ? "Empty Friends feed" : "No posts yet"}
          detail={props.tab === "FRIENDS" ? "Mutual friends have not posted yet." : "Discovery has no posts available."}
        />
      )}
      {showFeedContent && hasPosts && (
        <div className="post-stack">
          {props.posts.map((post, index) => (
            <PostCard
              key={feedEntryIdentity(post)}
              index={index + 1}
              post={post}
              viewerId={props.userId}
              onOpen={() => props.onSelectPost(post)}
              onToggle={props.onTogglePost}
              onEdit={() => props.onEditPost(post)}
              onArchive={() => props.onArchivePost(post)}
              onOpenProfile={props.onOpenProfile}
            />
          ))}
        </div>
      )}
      {props.status === "ready" && hasPosts && props.hasMore && (
        <div ref={loadMoreRef} className="feed-load-sentinel" aria-label="Load more posts">
          {props.loadingMore && <span>Loading more...</span>}
        </div>
      )}
      {props.status === "ready" && hasPosts && !props.hasMore && <p className="end-feed">End of feed</p>}
    </section>
  );
}

function FeedState({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return <div className="feed-state"><Icon size={24} /><strong>{title}</strong><span>{detail}</span></div>;
}

function SkeletonFeed() {
  return <div className="skeleton-stack" role="status" aria-label="Loading feed">
    <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
  </div>;
}
