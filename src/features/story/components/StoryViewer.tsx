import { ChevronLeft, ChevronRight, MessageCircle, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "../../../shared/components";
import type { StoryItem } from "../model/story.types";
import { storyOwnerEntries } from "../model/storyQueue";
import { StoryViewerController, type StoryViewerProps } from "./StoryViewerController";

export function StoryRail({ userId, items, onCreate, onSelect }: { userId: string; items: StoryItem[]; onCreate: () => void; onSelect: (story: StoryItem) => void }) {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const ownerEntries = storyOwnerEntries(items);

  function updateScrollState() {
    const node = stripRef.current;
    if (!node) return;
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setScrollState({ left: node.scrollLeft > 4, right: node.scrollLeft < maxScrollLeft - 4 });
  }

  function scrollStories(direction: -1 | 1) {
    stripRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
    window.setTimeout(updateScrollState, 240);
  }

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
  }, [ownerEntries.length, userId]);

  return <div className={`story-row-wrap ${scrollState.left ? "can-left" : ""} ${scrollState.right ? "can-right" : ""}`}>
    <button className="story-scroll-button previous" onClick={() => scrollStories(-1)} aria-label="Previous stories" hidden={!scrollState.left}><ChevronLeft size={16} /></button>
    <div ref={stripRef} className="story-strip story-strip-left" aria-label="Story timeline">
      <button className="story-item add" onClick={onCreate} aria-label="Add story"><span className="story-avatar"><Plus size={18} /></span><span>Your story</span></button>
      {ownerEntries.map((item) => <button key={item.userId} className={`story-item ${item.state}`} title={item.username} onClick={() => onSelect(item)}>
        <span className="story-avatar"><Avatar src={item.avatarUrl} name={item.name || item.username} alt={item.username} />{item.seenItems > 0 && item.seenItems < item.totalItems && <small className="story-partial-count">{item.totalItems - item.seenItems}</small>}</span>
        <span>{item.userId === userId ? "You" : item.name}</span>
      </button>)}
    </div>
    <button className="story-scroll-button next" onClick={() => scrollStories(1)} aria-label="Next stories" hidden={!scrollState.right}><ChevronRight size={16} /></button>
  </div>;
}

export function StoryViewer(props: StoryViewerProps) {
  return <StoryViewerController {...props} />;
}

export function StoryAppLogo() {
  return <span className="app-logo compact"><MessageCircle size={18} /></span>;
}
