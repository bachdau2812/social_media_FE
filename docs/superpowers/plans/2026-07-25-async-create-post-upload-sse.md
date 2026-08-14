# Async Create Post Upload And SSE Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement item-based Cloudinary post upload with asynchronous media scan and SSE publish feedback.

**Architecture:** Frontend uploads media to Cloudinary before calling `/posts`. Backend validates post payload, queues item scan, then worker persists approved media/items and sends SSE.

**Tech Stack:** Spring Boot WebFlux, Reactor, Kafka, Cloudinary, React, Vite, TypeScript.

## Global Constraints

- Keep domain code in owning modules.
- Do not run tests unless requested; build is required.
- Remove post/comment/like/story audit persistence, keep auth/user audit.

---

### Task 1: Backend Post Contract And Async Create

**Files:**
- Modify `PostCreateRequest.java`, `PostItemCreateRequest.java`, `MediaSignatureResponse.java`, `CloudinarySignatureService.java`, `PostService.java`
- Create `PostMediaScanItem.java`

- [ ] Add `secureUrl`, `publicId`, and optional `resourceType` to post item request/event payload.
- [ ] Save new posts as `PENDING_SCAN`, publish `check_media_event`, and return the pending Vietnamese message.
- [ ] Remove `wait_for_upload_post:*` usage.

### Task 2: Backend Worker And Audit Cleanup

**Files:**
- Modify `ImageScanWorker.java`, `LikeService.java`, `UserAuditService.java`

- [ ] Scan post items individually and insert only approved `media` and `post_items`.
- [ ] Validate Cloudinary metadata type and size server-side.
- [ ] Send final SSE message and publish `post_upload_event` only after scan.
- [ ] Remove audit log writes outside auth/user flows.

### Task 3: Frontend Upload, Draft Prompt, SSE

**Files:**
- Modify `api.ts`, `App.tsx`, `PostCreationStudio.tsx`, `styles.css`

- [ ] Add Cloudinary upload helper and typed SSE subscription.
- [ ] Validate files by type/size in create post UI.
- [ ] Upload every media item before submit and send the new `/posts` payload.
- [ ] Remove always-visible Save draft and show Save draft only in close warning.
- [ ] Show SSE and pending-response toasts, then return to home after submit.

### Task 4: Docs And Build

**Files:**
- Modify `social_media/docs/frontend-backend-change-summary.md`

- [ ] Summarize backend and frontend contract changes.
- [ ] Build backend and frontend.