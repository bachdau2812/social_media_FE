# Post Detail Media Lifecycle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Pause page media while the browser tab is hidden, preserve Post Detail media proportions, and prevent background feed scrolling while the modal is open.

**Architecture:** Keep the behavior in the existing App and Post Detail lifecycle. A global visibility listener records currently playing media and restores only those elements; Post Detail owns body scroll locking and renders media inside a frame derived from post.mediaRatio.

**Tech Stack:** React, TypeScript, Vite, CSS.

## Global Constraints

- Keep current audio position and carousel behavior.
- Do not change backend contracts.
- Preserve responsive Post Detail behavior.

---

### Task 1: Page visibility media lifecycle

**Files:**
- Modify: social_media_FE/src/App.tsx

- [ ] Add a document-level visibility controller that pauses active audio and video while hidden.
- [ ] Resume only media that was active before the tab became hidden.
- [ ] Preserve explicit Story pause state across visibility changes.

### Task 2: Post Detail modal isolation

**Files:**
- Modify: social_media_FE/src/App.tsx

- [ ] Lock body scrolling when selectedPost exists.
- [ ] Restore body styles and the exact previous scroll position when the modal closes.

### Task 3: Ratio-aware Post Detail frame

**Files:**
- Modify: social_media_FE/src/App.tsx
- Modify: social_media_FE/src/styles.css

- [ ] Apply postMediaRatioValue to the Post Detail media viewer.
- [ ] Constrain the frame by both modal width and height.
- [ ] Keep image intrinsic sizing with max-width and max-height only.
- [ ] Keep unused frame space on the existing neutral background.

### Task 4: Verification

**Files:**
- Modify: social_media/docs/frontend-backend-change-summary.md

- [ ] Run npm run build.
- [ ] Confirm no backend change is required because MediaDisplayType.POST already uses c_limit.