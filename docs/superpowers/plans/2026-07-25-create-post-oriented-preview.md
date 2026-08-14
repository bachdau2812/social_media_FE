# Create Post Oriented Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scale Create Post image previews by natural orientation.

**Architecture:** Store image orientation from the loaded preview image and apply scoped CSS classes. Keep preview background white and preserve existing video behavior.

**Tech Stack:** React, Vite, TypeScript, CSS.

## Global Constraints

- Do not run tests; build is enough per user request.
- Keep edits scoped to the Create Post preview.

---

### Task 1: Orientation-Aware Preview

**Files:**
- Modify: `social_media_FE/src/PostCreationStudio.tsx`
- Modify: `social_media_FE/src/styles.css`
- Modify: `social_media/docs/frontend-backend-change-summary.md`

**Interfaces:**
- Consumes: existing `activeMedia` and preview frame markup.
- Produces: `preview-media landscape|portrait` classes for CSS scaling.

- [ ] **Step 1: Add orientation state and load handler**

Add a `mediaOrientation` state map and update it from `img.naturalWidth` / `img.naturalHeight`.

- [ ] **Step 2: Apply preview media classes**

Use `preview-media` plus `landscape` or `portrait` on the active preview image.

- [ ] **Step 3: Update CSS scaling**

Landscape images use full width. Portrait images use full height. Background remains white.

- [ ] **Step 4: Update summary**

Add a short entry to `frontend-backend-change-summary.md`.

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: build succeeds.