# Route-Aware Floating Messenger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the floating messenger launcher route-aware without changing the existing floating panel.

**Architecture:** Pass a boolean from the app route into `FloatingMessenger`. Use it to select the collapsed launcher presentation and collapse the panel when the route category changes.

**Tech Stack:** React, TypeScript, CSS, Vite.

## Global Constraints

- Home keeps the current expanded launcher.
- Other non-Chat screens use an icon-only launcher.
- Both launchers open the existing floating panel.
- Maximize remains the only action that opens the full Chat page.

---

### Task 1: Route-Aware Launcher

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `../social_media/docs/frontend-backend-change-summary.md`

**Interfaces:**
- Consumes: current `view` state.
- Produces: `compactLauncher: boolean` for `FloatingMessenger`.

- [ ] Pass `view !== "home"` to `FloatingMessenger`.
- [ ] Collapse the panel when `compactLauncher` changes.
- [ ] Render an icon-only collapsed button when compact.
- [ ] Add compact launcher styling and unread badge placement.
- [ ] Build with `npm run build`.
