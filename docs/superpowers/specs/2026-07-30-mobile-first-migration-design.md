# Mobile-first Frontend Migration Design

## Status

Approved approach: incremental mobile-first migration with boundary cleanup (Option B).

## Goals

- Make mobile the default layout while preserving the current tablet and desktop experience.
- Keep existing routes, backend contracts, realtime contracts, business flows, drafts, deep links, and media-ratio behavior.
- Normalize backend payloads at feature API boundaries instead of inside components.
- Keep full-page Chat and floating mini-chat on the same controller, composer, message, optimistic-update, upload, reply, cursor, realtime, and recovery flow.
- Preserve the existing three-slide Story Viewer navigation and playback lifecycle.

## Architecture

The existing feature folders remain the primary ownership boundaries. The migration adds a responsive AppShell that mounts one navigation surface at a time, consolidates global viewport/overlay behavior, and progressively replaces desktop-first cascade overrides with mobile-default rules plus `min-width` enhancements.

Transport DTOs remain endpoint-specific. Pure feature mappers convert those DTOs into stable UI models. Components no longer invent missing display fields, silently coerce incompatible shapes, or duplicate provider/legacy fallbacks.

## Mobile shell

- Mobile header owns screen title, back action, and a More menu.
- Mobile bottom navigation contains Home, Search, Create, Notifications, and Chat.
- Chat shows the same unread count on desktop and mobile.
- Profile, Library, and Settings are available through the mobile More menu.
- Desktop sidebar and mobile navigation are never mounted together.
- Floating mini-chat is not mounted on mobile. Mobile chat entry points open the full Chat route/screen.
- Main content reserves bottom-navigation and safe-area space.

## Responsive rules

- Default CSS targets mobile.
- `min-width: 768px` expands to tablet behavior.
- `min-width: 1024px` restores desktop navigation and multi-column surfaces.
- Existing project breakpoints are reused where their values already match these layout transitions.
- Full-height surfaces use `100vh` fallback followed by `100dvh`.
- Fixed controls use safe-area insets.
- Interactive controls target at least 44 by 44 CSS pixels.
- Mobile text inputs use at least 16px font size.

## API mapping

- Feed DTOs include the backend's additive recommendation metadata without changing rendering or ordering.
- Feed, Post Detail, Profile Post, Search Post, Story Tray, Story Archive, and Highlight Story use distinct transport DTOs.
- A missing backend field stays missing or becomes an explicit unavailable state; it is not replaced with an ID, current time, mock data, or fabricated business default.
- Chat conversation/details/message contracts have one canonical frontend DTO and mapper shared by both Chat surfaces.
- API errors are normalized into authentication, permission, validation, unavailable, network, and server categories while preserving current request URLs and payloads.

## Overlay behavior

Feature-specific modal content remains feature-owned. Shared hooks own body scroll locking, focus restoration, Escape handling, viewport sizing, and safe-area behavior. Mobile presentation uses a full-screen dialog, bottom sheet, action sheet, or subpage according to the feature; desktop retains modal, popover, and side drawer behavior.

## Feature decisions

- Feed remains page-based because the current Home backend contract is page-based. No cursor is invented.
- The existing feed ordering and recommendation algorithm are not changed.
- Post media continues to use `postMediaRatioValue`; `mediaRatio` remains `width:height`.
- Profile and Archive grids remain three columns on mobile.
- Settings uses category-list-to-subpage navigation on mobile and the existing split panel on desktop.
- Create and Edit Post share form/model primitives, but their current publish/update contracts remain separate.
- Story Viewer is hardened and visually verified, not rewritten.
- Story Creator keeps its existing creation capabilities; detailed tools move into responsive sheets without inventing unsupported layer features.
- Chat E2E encryption is not implemented in this migration.

## Compatibility

No REST route, HTTP method, request body, response contract, SSE endpoint/event, WebSocket endpoint/frame, frontend route, browser-storage key, or user-visible business rule is intentionally changed. New frontend fields mirror additive backend fields. Missing backend data is documented separately rather than mocked.

## Verification

Each behavior change follows test-first development. Every phase runs focused Vitest tests, TypeScript typecheck, ESLint, and the production build. Mobile, tablet, and desktop layouts are then checked at representative viewport sizes, including safe-area, keyboard/composer, long text, empty/error/loading states, and dark/light themes.
