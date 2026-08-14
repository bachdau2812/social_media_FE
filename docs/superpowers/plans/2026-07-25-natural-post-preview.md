# Natural-Size Post Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve natural media sizing in Create Post preview and render empty space black.

**Architecture:** Add scoped final CSS overrides for `post-music-studio` so existing creation and responsive behavior remains intact.

**Tech Stack:** CSS, React, Vite.

## Global Constraints

- Do not change media data or backend APIs.
- Do not upscale media.
- Verify with `npm run build`.

---

### Task 1: Preview Styling

**Files:**
- Modify: `src/styles.css`
- Modify: `../social_media/docs/frontend-backend-change-summary.md`

**Interfaces:**
- Consumes: `.post-music-studio .create-preview` and `.preview-frame`.
- Produces: intrinsic-size contained media on a black surface.

- [ ] Override preview backgrounds to black.
- [ ] Remove forced 4:5 sizing and cover behavior.
- [ ] Limit media only with max width and max height.
- [ ] Build with `npm run build`.
