# Create Post Media Selection Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the numbered Create Post header and redesign Step 1 around empty and populated media states.

**Architecture:** Keep existing React state and upload functions. Derive body layout from `step` and `media.length`, and keep preview selection driven by `activeMediaId`.

**Tech Stack:** React, TypeScript, CSS, Vite, lucide-react.

## Global Constraints

- Do not change backend APIs or publish payloads.
- Preserve image and video upload.
- Preserve steps 2 through 4.
- Verify with `npm run build`; no automated tests are requested.

---

### Task 1: Create Post Header And Step 1

**Files:**
- Modify: `src/PostCreationStudio.tsx`
- Modify: `src/styles.css`
- Modify: `../social_media/docs/frontend-backend-change-summary.md`

**Interfaces:**
- Consumes: `step`, `media`, `activeMediaId`, `fileInputRef`, `addFiles`, `removeItem`.
- Produces: route-independent Create Post UI with empty and populated Step 1 states.

- [ ] Remove the title block and numeric labels from the header.
- [ ] Add four connected accessible progress dots.
- [ ] Hide preview while Step 1 has no media.
- [ ] Render the upload surface across the full body while empty.
- [ ] Render selectable media rows and Add more after upload.
- [ ] Style desktop and mobile states.
- [ ] Build with `npm run build`.
