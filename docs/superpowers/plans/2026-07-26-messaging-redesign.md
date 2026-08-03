# Messaging Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the floating messenger and full messaging page as one responsive monochrome messaging system without changing backend contracts.

**Architecture:** Keep API calls and optimistic send state inside the existing `ChatScreen` and `FloatingMessenger` components. Refactor their presentation markup and apply one final CSS layer that shares avatar, row, bubble, header, state, and composer rules across both surfaces.

**Tech Stack:** React 19, TypeScript, Vite, Lucide React, CSS.

## Global Constraints

- Preserve existing `/chat` API contracts and optimistic send behavior.
- Use a two-column desktop page and separate mobile inbox/conversation panes.
- Keep the floating widget fixed and use the same dimensions for list/detail.
- Use neutral monochrome surfaces, compact controls, visible focus states, and internal scrolling only.

---

### Task 1: Floating Messaging Widget

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Add client-side conversation search and retain list/detail state in one fixed panel.
- [ ] Refine header, rows, empty states, unread treatment, bubbles, and composer.
- [ ] Preserve close, back, expand, draft, API loading, sending and failure behavior.

### Task 2: Full Messaging Page

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Add functional All/Unread filtering and compact inbox hierarchy.
- [ ] Refine conversation grouping, headers, date separators, status metadata and composer alignment.
- [ ] Preserve two-column desktop and separate full-screen mobile panes.

### Task 3: Responsive Verification And Documentation

**Files:**
- Modify: `../social_media/docs/frontend-backend-change-summary.md`

- [ ] Run `npm run build` and require exit code 0.
- [ ] Verify desktop/tablet/mobile media-query rules and internal scroll containers.
- [ ] Record the frontend-only redesign in the project change summary.