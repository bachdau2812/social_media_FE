# Feed and Post Detail Video Autoplay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically play and loop the active Feed/Post Detail video with original audio when permitted, fall back to muted autoplay when required, and remove blocking carousel preload work.

**Architecture:** Add a shared `PostVideoPlayer` and playback coordinator inside the Post feature. Feed supplies eligibility from its existing single-owner viewport coordinator, while Post Detail supplies active-slide eligibility. Adjacent media are warmed declaratively without blocking slide state changes.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, native HTMLMediaElement, IntersectionObserver.

## Global Constraints

- Keep the existing post API/backend contract unchanged.
- Video media uses its original audio; image media retains the existing attached-music player.
- Audible autoplay rejection must retry muted and must not leave the active video stopped.
- After the first user interaction following an autoplay-policy fallback, the active and subsequent videos may use original audio.
- Active videos use `loop` and restart automatically after reaching the end.
- Only one eligible Feed video may play at a time.
- Carousel navigation must never await network preload completion.
- Preload only the active and immediately adjacent media items.

---

### Task 1: Shared Post Video Playback Policy and Player

**Files:**
- Create: `src/features/post/model/postVideoPlaybackCoordinator.ts`
- Create: `src/features/post/model/postVideoPlaybackCoordinator.test.ts`
- Create: `src/features/post/hooks/usePostVideoPlayback.ts`
- Create: `src/features/post/hooks/usePostVideoPlayback.test.tsx`
- Create: `src/features/post/components/PostVideoPlayer.tsx`
- Create: `src/features/post/components/PostVideoPlayer.test.tsx`

**Interfaces:**
- Produces: `subscribePostVideoSound(listener): () => void`
- Produces: `getPostVideoSoundEnabled(): boolean`
- Produces: `reportAudibleAutoplayBlocked(): void`
- Produces: `enablePostVideoSound(): void`
- Produces: `usePostVideoPlayback({ source, eligible }): { videoRef, muted, buffering, toggleSound }`
- Produces: `PostVideoPlayerProps` with `source`, `eligible`, `preload`, `controls`, `className`, `style`, and `onLoadedMetadata`.

- [ ] **Step 1: Write failing coordinator tests**

```ts
it("shares muted fallback and later audible activation across players", () => {
  const listener = vi.fn();
  const unsubscribe = subscribePostVideoSound(listener);
  reportAudibleAutoplayBlocked();
  expect(getPostVideoSoundEnabled()).toBe(false);
  enablePostVideoSound();
  expect(getPostVideoSoundEnabled()).toBe(true);
  expect(listener).toHaveBeenCalledTimes(2);
  unsubscribe();
});
```

- [ ] **Step 2: Run coordinator test and verify RED**

Run: `npm test -- src/features/post/model/postVideoPlaybackCoordinator.test.ts`

Expected: FAIL because the coordinator module does not exist.

- [ ] **Step 3: Implement the session coordinator**

```ts
let soundEnabled = true;
const listeners = new Set<(enabled: boolean) => void>();

export function getPostVideoSoundEnabled() { return soundEnabled; }
export function subscribePostVideoSound(listener: (enabled: boolean) => void) {
  listeners.add(listener);
  listener(soundEnabled);
  return () => listeners.delete(listener);
}
function setSoundEnabled(value: boolean) {
  if (soundEnabled === value) return;
  soundEnabled = value;
  listeners.forEach((listener) => listener(value));
}
export function reportAudibleAutoplayBlocked() { setSoundEnabled(false); }
export function enablePostVideoSound() { setSoundEnabled(true); }
```

- [ ] **Step 4: Write failing hook tests**

Use a real `<video>` rendered by a test harness. Stub `HTMLMediaElement.prototype.play` so the first audible call rejects with `new DOMException("blocked", "NotAllowedError")`, then resolves. Assert the hook retries with `video.muted === true`, pauses when `eligible` changes to false, and switches back to audible after a `pointerdown` event.

- [ ] **Step 5: Run hook test and verify RED**

Run: `npm test -- src/features/post/hooks/usePostVideoPlayback.test.tsx`

Expected: FAIL because the hook does not exist.

- [ ] **Step 6: Implement the playback hook**

```ts
export function usePostVideoPlayback({ source, eligible }: { source: string; eligible: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(getPostVideoSoundEnabled);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => subscribePostVideoSound(setSoundEnabled), []);
  useEffect(() => {
    if (soundEnabled) return;
    const activate = () => enablePostVideoSound();
    window.addEventListener("pointerdown", activate, { once: true, capture: true });
    window.addEventListener("keydown", activate, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", activate, true);
      window.removeEventListener("keydown", activate, true);
    };
  }, [soundEnabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundEnabled;
    if (!eligible) {
      video.pause();
      return;
    }
    void video.play().catch((error: DOMException) => {
      if (error.name !== "NotAllowedError" || video.muted) return;
      reportAudibleAutoplayBlocked();
      video.muted = true;
      return video.play();
    });
    return () => video.pause();
  }, [eligible, soundEnabled, source]);

  return { videoRef, muted: !soundEnabled, buffering, setBuffering, toggleSound: () => soundEnabled ? reportAudibleAutoplayBlocked() : enablePostVideoSound() };
}
```

- [ ] **Step 7: Write failing player component tests**

Render `PostVideoPlayer` and assert `loop`, `playsInline`, requested `preload`, accessible mute/unmute control, buffering indicator after `waiting`, and indicator removal after `canPlay`/`playing`.

- [ ] **Step 8: Implement `PostVideoPlayer` and verify GREEN**

The component must render one wrapper containing the video, a sound button that stops propagation, and a non-interactive buffering indicator. It forwards metadata dimensions through `onLoadedMetadata`.

Run: `npm test -- src/features/post/model/postVideoPlaybackCoordinator.test.ts src/features/post/hooks/usePostVideoPlayback.test.tsx src/features/post/components/PostVideoPlayer.test.tsx`

Expected: 3 test files pass.

- [ ] **Step 9: Commit Task 1**

```bash
git add src/features/post/model/postVideoPlaybackCoordinator.ts src/features/post/model/postVideoPlaybackCoordinator.test.ts src/features/post/hooks/usePostVideoPlayback.ts src/features/post/hooks/usePostVideoPlayback.test.tsx src/features/post/components/PostVideoPlayer.tsx src/features/post/components/PostVideoPlayer.test.tsx
git commit -m "feat: add shared post video playback"
```

### Task 2: Integrate Automatic Playback in Feed and Post Detail

**Files:**
- Modify: `src/features/post/components/PostSurfaces.tsx`
- Modify: `src/features/post/components/PostSurfaces.test.tsx`
- Modify: `src/features/post/styles/post-media.css`

**Interfaces:**
- Consumes: `PostVideoPlayer` from Task 1.
- Feed eligibility: `activeCarouselItem && playbackActive && !feedSuspended`.
- Detail eligibility: `activeDetailItem` while the dialog is mounted.

- [ ] **Step 1: Add failing Feed playback tests**

Render a video `PostCard`, provide an IntersectionObserver test double, report it as the active feed owner, and assert the active video calls `play()` without a click. Then report zero visibility and assert `pause()` is called.

- [ ] **Step 2: Add failing Post Detail playback tests**

Render `PostDetail` with two video items and mocked detail API data. Assert the first active video plays on open. Click `Next media`, assert the second video becomes eligible and plays without clicking its native controls.

- [ ] **Step 3: Run tests and verify RED**

Run: `npm test -- src/features/post/components/PostSurfaces.test.tsx`

Expected: FAIL because Feed video remains hard-muted and Detail has no automatic playback controller.

- [ ] **Step 4: Replace surface-specific video elements**

In `FeedMediaLayer`, use:

```tsx
<PostVideoPlayer
  source={media.url}
  eligible={active && playbackEligible}
  preload={active ? "auto" : "metadata"}
  controls={false}
/>
```

Pass `playbackActive && !feedSuspended` from `PostMediaCarousel`. Remove the nested Feed-only IntersectionObserver from `FeedVideo`; the existing feed owner coordinator remains the single source of viewport eligibility.

In `DetailMediaLayer`, use:

```tsx
<PostVideoPlayer
  source={media.url}
  eligible={active}
  preload={active ? "auto" : "metadata"}
  controls={active}
  style={mediaStyle}
  onLoadedMetadata={(video) => setNaturalSize(video.videoWidth, video.videoHeight)}
/>
```

- [ ] **Step 5: Add shared player styles**

Add `.post-video-player`, `.post-video-sound`, and `.post-video-buffering` styles. The wrapper and video fill their existing media layer; the control is keyboard accessible and the buffering indicator does not intercept pointer events.

- [ ] **Step 6: Verify Feed and Detail GREEN**

Run: `npm test -- src/features/post/components/PostSurfaces.test.tsx src/features/post/components/PostVideoPlayer.test.tsx`

Expected: all tests pass.

- [ ] **Step 7: Commit Task 2**

```bash
git add src/features/post/components/PostSurfaces.tsx src/features/post/components/PostSurfaces.test.tsx src/features/post/styles/post-media.css
git commit -m "fix: autoplay active post videos"
```

### Task 3: Non-blocking Adjacent Media Preload

**Files:**
- Create: `src/features/post/model/adjacentPostMedia.ts`
- Create: `src/features/post/model/adjacentPostMedia.test.ts`
- Create: `src/features/post/components/AdjacentPostMediaPreloads.tsx`
- Create: `src/features/post/components/AdjacentPostMediaPreloads.test.tsx`
- Modify: `src/features/post/components/PostSurfaces.tsx`
- Modify: `src/features/post/styles/post-media.css`

**Interfaces:**
- Produces: `adjacentPostMedia(media, activeIndex): Post["media"]`
- Produces: `AdjacentPostMediaPreloads({ media, activeIndex })`.

- [ ] **Step 1: Write failing adjacency tests**

```ts
expect(adjacentPostMedia(items, 0).map((item) => item.id)).toEqual(["item-2"]);
expect(adjacentPostMedia(items, 1).map((item) => item.id)).toEqual(["item-1", "item-3"]);
expect(adjacentPostMedia(items, 2).map((item) => item.id)).toEqual(["item-2"]);
```

- [ ] **Step 2: Run adjacency test and verify RED**

Run: `npm test -- src/features/post/model/adjacentPostMedia.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement adjacency selection**

Return only valid `activeIndex - 1` and `activeIndex + 1` items, preserving index order and never including the active item.

- [ ] **Step 4: Write failing declarative preload tests**

Render a three-item media list with the middle active. Assert only the previous and next items exist in the hidden preload container, adjacent videos use `preload="auto"`, and the active item is absent.

- [ ] **Step 5: Implement `AdjacentPostMediaPreloads`**

```tsx
export function AdjacentPostMediaPreloads({ media, activeIndex }: Props) {
  return <div className="post-adjacent-preloads" aria-hidden="true">
    {adjacentPostMedia(media, activeIndex).map((item) => item.type === "VIDEO"
      ? <video key={item.id} src={item.url} preload="auto" muted playsInline />
      : <img key={item.id} src={item.url} alt="" />)}
  </div>;
}
```

- [ ] **Step 6: Remove blocking preloads from carousel movement**

Both `move` and `moveMedia` must set transition direction, previous index, and active index synchronously. Remove `preloadPostMedia(...).then(...)` wrappers.

Replace Feed's `Promise.all(post.media.map(preloadPostMedia))` effect with `AdjacentPostMediaPreloads`.

In Post Detail, change:

```ts
const hydrated = mergePostDetail(post, detail);
await Promise.all(hydrated.media.map(preloadPostMedia));
setDetailPost(hydrated);
```

to:

```ts
const hydrated = mergePostDetail(post, detail);
if (active) {
  setDetailPost(hydrated);
  setDetailMediaReady(true);
}
```

Render `AdjacentPostMediaPreloads` for the current Detail index and remove `preloadPostMedia` entirely.

- [ ] **Step 7: Add transition regression assertions**

In `PostSurfaces.test.tsx`, click next while adjacent preload media has emitted no load event. Assert the counter changes immediately and the next active video receives `play()`.

- [ ] **Step 8: Verify Task 3 GREEN**

Run: `npm test -- src/features/post/model/adjacentPostMedia.test.ts src/features/post/components/AdjacentPostMediaPreloads.test.tsx src/features/post/components/PostSurfaces.test.tsx`

Expected: all tests pass without dispatching any preload completion event.

- [ ] **Step 9: Commit Task 3**

```bash
git add src/features/post/model/adjacentPostMedia.ts src/features/post/model/adjacentPostMedia.test.ts src/features/post/components/AdjacentPostMediaPreloads.tsx src/features/post/components/AdjacentPostMediaPreloads.test.tsx src/features/post/components/PostSurfaces.tsx src/features/post/styles/post-media.css
git commit -m "perf: preload adjacent post media"
```

### Task 4: Final Verification

**Files:**
- Verify only; modify production code only if a scoped regression is found.

**Interfaces:**
- Consumes all Task 1-3 deliverables.
- Produces verification evidence for both presentation surfaces.

- [ ] **Step 1: Run all Post tests**

Run: `npm test -- src/features/post`

Expected: all Post test files pass.

- [ ] **Step 2: Run Feed tests**

Run: `npm test -- src/features/feed`

Expected: all Feed test files pass.

- [ ] **Step 3: Run typecheck and production build**

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run build`

Expected: Vite build exits 0; an existing chunk-size warning is acceptable.

- [ ] **Step 4: Verify scoped diff**

Run: `git diff --check 880f2ea..HEAD`

Expected: no whitespace errors in task commits.

- [ ] **Step 5: Review behavior checklist**

Confirm Feed autoplay, Detail autoplay, original audio attempt, muted fallback, first-interaction sound activation, looping, single Feed owner, adjacent-only preload, immediate slide transition, and unchanged image-music behavior each map to a passing test.
