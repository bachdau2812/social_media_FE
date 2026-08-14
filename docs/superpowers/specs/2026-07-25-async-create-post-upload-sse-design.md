# Async Create Post Upload And SSE Design

## Goal

Move post creation to an item-based Cloudinary upload flow and finish publishing asynchronously after media scan.

## Design

- Frontend validates selected files before upload: only images or videos, images <= 50MB, videos <= 500MB.
- Frontend requests a Cloudinary signature from the backend, uploads each selected media file, then sends `PostCreateRequest` with only `items`.
- Backend stores `PostDetails` as `PENDING_SCAN`, publishes `check_media_event`, and returns a pending message immediately.
- `ImageScanWorker` scans each item independently, deletes rejected media, inserts approved media and `post_items`, then marks the post `APPROVED` or `REJECTED`.
- SSE event `post_upload` tells the frontend whether the post was published, partially cleaned, or rejected.
- Audit persistence is kept only for auth/user-owned actions; audit consumers for post/comment/like/story are removed.

## Verification

- Run Maven compile/package for backend.
- Run `npm run build` for frontend.