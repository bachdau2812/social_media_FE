# Create Post Step 2 Accordion And Music Range Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Step 2 master-detail editor with an accordion and improve per-image range selection and playback.

**Architecture:** Reuse `expandedMusicItemId` as the single expanded accordion row and `activeMediaId` as the preview source. Extend `SegmentEditor` with committed-range playback and pointer dragging while retaining the existing publish model.

**Tech Stack:** React, TypeScript, CSS, HTML range inputs, Vite.

## Global Constraints

- Each image has at most one music selection.
- Video media does not use item music.
- Start must remain less than End.
- Backend request structures remain unchanged.
- Verify with `npm run build`; no automated tests are requested.

---

### Task 1: Step 2 Accordion

**Files:**
- Modify: `src/PostCreationStudio.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `activeMediaId`, `expandedMusicItemId`, `itemBrowserId`, and `MediaItem.music`.
- Produces: one expanded media editor at a time.

- [ ] Replace the master-detail list with accordion rows.
- [ ] Select preview and expansion from the same row action.
- [ ] Render caption and one-track music controls inside the expanded row.

### Task 2: Music Range Interaction

**Files:**
- Modify: `src/PostCreationStudio.tsx`
- Modify: `src/styles.css`
- Modify: `../social_media/docs/frontend-backend-change-summary.md`

**Interfaces:**
- Consumes: `SegmentEditor.onChange` and `togglePreview`.
- Produces: `SegmentEditor.onCommit(start, end)` and draggable selected range.

- [ ] Clamp Start and End to a valid ordered interval.
- [ ] Add selected-window pointer and keyboard movement.
- [ ] Restart range playback after selection and drag release.
- [ ] Remove redundant text and center compact action buttons.
- [ ] Build with `npm run build`.
