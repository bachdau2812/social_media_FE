# Mobile-first Frontend Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the existing feature-based React frontend to mobile-first responsive behavior and exact backend DTO mapping without rewriting the application or changing current contracts.

**Architecture:** Preserve feature ownership and business flows. Introduce a responsive AppShell, shared viewport/overlay behavior, endpoint-specific DTOs with pure mappers, and mobile-default CSS that expands at tablet and desktop breakpoints.

**Tech Stack:** React 18, TypeScript 5.7, React Router 6, Vite 6, Vitest 4, Testing Library, plain CSS/CSS Modules.

## Global Constraints

- Do not change backend REST, SSE, WebSocket, Kafka, or persistence contracts.
- Do not rewrite the frontend or replace its CSS/UI framework.
- Keep `mediaRatio` in `width:height` order and use `postMediaRatioValue`.
- Keep Chat domain behavior shared between the full page and floating mini-chat.
- Do not implement Chat E2E encryption.
- Mobile CSS is the default; tablet/desktop enhancements use `min-width`.
- Preserve routes, drafts, deep links, scroll behavior, realtime behavior, and current business rules.
- Do not use `any`, fabricated display data, fallback IDs as names, or mock data to hide missing backend fields.

---

### Task 1: Responsive foundation and contract helpers

**Files:**
- Create: `src/shared/hooks/useMediaQuery.ts`
- Create: `src/shared/hooks/useMediaQuery.test.tsx`
- Create: `src/shared/hooks/useViewportMode.ts`
- Create: `src/shared/hooks/useViewportMode.test.tsx`
- Create: `src/shared/overlays/useBodyScrollLock.ts`
- Create: `src/shared/overlays/useBodyScrollLock.test.tsx`
- Modify: `src/shared/styles/tokens.css`
- Modify: `src/shared/styles/base.css`
- Modify: `src/styles.css`
- Modify: `index.html`

**Interfaces:**
- Produces: `useMediaQuery(query: string): boolean`
- Produces: `useViewportMode(): "mobile" | "tablet" | "desktop"`
- Produces: `useBodyScrollLock(active: boolean): void`
- Produces CSS tokens for safe areas, navigation/header heights, touch size, spacing, type, surfaces, and z-index.

- [ ] Write failing tests proving media-query subscriptions update and remove listeners.
- [ ] Run `npm test -- src/shared/hooks/useMediaQuery.test.tsx` and confirm the expected failures.
- [ ] Implement `useMediaQuery` and `useViewportMode` with `matchMedia` cleanup and SSR-safe defaults.
- [ ] Write failing tests proving nested scroll locks restore the original body styles only after the final lock closes.
- [ ] Run the focused tests and confirm the expected failures.
- [ ] Implement reference-counted body scroll locking and focus-safe cleanup.
- [ ] Add mobile-default design tokens, `viewport-fit=cover`, `100dvh` fallbacks, 16px mobile form controls, reduced motion, wrapping, and root box-sizing.
- [ ] Run focused tests, `npm run typecheck`, and `npm run lint`.

### Task 2: Responsive AppShell and navigation ownership

**Files:**
- Create: `src/app/layouts/ResponsiveAppShell.tsx`
- Create: `src/app/layouts/ResponsiveAppShell.test.tsx`
- Create: `src/app/components/MobileAppHeader.tsx`
- Create: `src/app/components/MobileMoreMenu.tsx`
- Modify: `src/app/components/Navigation.tsx`
- Modify: `src/app/SocialApplication.tsx`
- Modify: `src/app/router/RouteStateAdapter.tsx`
- Modify: `src/shared/styles/application-shell.css`

**Interfaces:**
- Consumes: `useViewportMode`
- Produces: a shell that mounts exactly one navigation system.
- Produces: mobile navigation with Home, Search, Create, Notifications, Chat, and Chat unread badge.
- Produces: mobile More menu routes for Profile, Library, and Settings.

- [ ] Write failing component tests proving only mobile or desktop navigation exists in the DOM, never both.
- [ ] Write failing tests for the mobile Chat unread badge and More-menu destinations.
- [ ] Run the focused tests and verify the failures are caused by the missing responsive shell.
- [ ] Implement the responsive shell/header/menu and conditionally mount navigation.
- [ ] Move mobile back behavior into the screen header and remove the floating mobile back button.
- [ ] Move storage side effects out of render in `RouteStateAdapter`.
- [ ] Convert application-shell CSS to mobile defaults with tablet/desktop `min-width` expansions and safe-area padding.
- [ ] Run focused tests, typecheck, lint, and build.

### Task 3: API client, endpoint DTOs, and mapper invariants

**Files:**
- Modify: `src/shared/api/apiClient.ts`
- Create: `src/shared/api/apiError.ts`
- Create: `src/shared/api/apiClient.test.ts`
- Modify: `src/features/feed/model/feed.dto.ts`
- Create: `src/features/feed/model/feed.mapper.ts`
- Create: `src/features/feed/model/feed.mapper.test.ts`
- Modify: `src/features/post/model/post.dto.ts`
- Modify: `src/features/post/model/post.mapper.ts`
- Modify: `src/features/profile/model/profile.dto.ts`
- Modify: `src/features/profile/model/profile.mapper.ts`
- Modify: `src/features/search/model/search.dto.ts`
- Create: `src/features/search/model/search.mapper.ts`
- Modify: `src/features/story/model/story.dto.ts`
- Modify: `src/features/story/model/story.mapper.ts`
- Modify: `src/features/chat/model/chat.types.ts`
- Create: `src/features/chat/model/chat.mapper.ts`

**Interfaces:**
- Produces: normalized `ApiError` categories and optional `AbortSignal` support.
- Produces: endpoint-specific pure mappers with exact nullable fields.
- Feed UI models carry optional recommendation metadata without changing rendering.

- [ ] Write failing API-client tests for empty success bodies, backend error envelopes, network errors, and aborts.
- [ ] Implement safe response parsing and normalized errors while retaining current paths, cookies, and bodies.
- [ ] Write failing mapper tests showing Feed metadata is retained and missing display names are not replaced with IDs.
- [ ] Implement exact Feed/Search/Post/Profile DTO mappers.
- [ ] Write failing Story tests that distinguish tray, archive, and highlight payload shapes.
- [ ] Implement Story endpoint-specific DTOs and context-aware owner mapping.
- [ ] Write failing Chat mapper tests for canonical conversation/details/message shapes.
- [ ] Implement one Chat mapping boundary shared by full and mini surfaces.
- [ ] Run mapper/API tests, typecheck, lint, and build.

### Task 4: Feed, Story rail, Post Card, and Post Detail

**Files:**
- Modify: `src/features/feed/screens/HomeScreen.tsx`
- Modify: `src/features/feed/hooks/useFeedController.ts`
- Modify: `src/features/feed/api/feed.api.ts`
- Modify: `src/features/post/components/PostSurfaces.tsx`
- Create: `src/features/post/components/PostDetailComposer.tsx`
- Create: `src/features/post/components/PostDetailComposer.test.tsx`
- Modify: `src/features/post/styles/post-media.css`
- Modify: `src/features/feed/styles/feed-refinements.css`

**Interfaces:**
- Feed remains page-based and deduplicated by post ID.
- Feed requests use request generations/AbortController so stale tab requests cannot overwrite active data.
- Post Detail composer exposes the same comment/reply/media callbacks as the existing surface.

- [ ] Write failing controller tests for stale request cancellation, tab isolation, duplicate pages, and `hasMore`.
- [ ] Implement abort-aware Feed loading without changing `/home` query parameters.
- [ ] Write failing Post Detail composer tests for text, media, reply cancel, submit, and reset.
- [ ] Extract and implement the composer without changing comment request payloads.
- [ ] Convert Feed/Post CSS to a one-column mobile default, touch-safe actions, responsive media using `postMediaRatioValue`, sticky tabs, and a keyboard-safe composer.
- [ ] Ensure horizontal Feed swipe does not steal Story-rail or media-carousel gestures.
- [ ] Preserve deep-link comment scroll/highlight behavior.
- [ ] Run focused tests, typecheck, lint, and build.

### Task 5: Search, Notifications, Profile, Connections, and Library

**Files:**
- Modify: `src/features/search/screens/SearchScreen.tsx`
- Modify: `src/features/notification/screens/NotificationScreen.tsx`
- Modify: `src/features/notification/model/notification.mapper.ts`
- Modify: `src/features/profile/screens/ProfileScreen.tsx`
- Modify: `src/features/profile/components/ProfileRelationshipActions.module.css`
- Modify: `src/features/profile/styles/profile-content.css`
- Modify: `src/features/library/screens/LibraryScreen.tsx`
- Modify: `src/features/library/screens/library-screen.css`
- Modify relevant feature API and mapper tests.

**Interfaces:**
- Search keeps input focus and cancels stale requests.
- Notification refresh retains existing rows when a refresh fails.
- Profile and Archive grids remain three columns on mobile.

- [ ] Write failing Notification tests for stale filter responses, refresh failure retention, and optimistic read rollback.
- [ ] Implement abort/version handling and scoped error state.
- [ ] Write failing Search mapper tests for exact user/post fields and explicit missing mutual context.
- [ ] Move inline Search mapping into the feature mapper without changing endpoints.
- [ ] Write failing Profile mapper tests preventing ID-as-name and fabricated social IDs.
- [ ] Implement exact profile mapping and explicit unavailable labels.
- [ ] Convert Search, Notification, Profile, Connections, and Library styles to mobile-first layouts with 44px actions and three-column media grids.
- [ ] Change profile grid video preload from `auto` to a mobile-appropriate mode.
- [ ] Keep Saved Library's missing post summary explicit; do not create fake cards.
- [ ] Run focused tests, typecheck, lint, and build.

### Task 6: Chat mobile navigation and shared composer parity

**Files:**
- Modify: `src/features/chat/screens/ChatScreen.tsx`
- Modify: `src/features/chat/components/FloatingMessenger.tsx`
- Modify: `src/features/chat/components/ChatComposer.tsx`
- Modify: `src/features/chat/components/ConversationDetailsDrawer.tsx`
- Modify: `src/features/chat/hooks/useChatController.ts`
- Modify: `src/features/chat/hooks/useChatUnreadCount.ts`
- Modify: `src/features/chat/styles/messaging-workspace.css`
- Modify: `src/features/chat/styles/messaging-advanced.css`
- Modify: `src/features/chat/styles/floating-messenger.css`
- Modify: `src/features/chat/components/ChatComposer.test.tsx`
- Create: `src/features/chat/hooks/useChatController.race.test.tsx`

**Interfaces:**
- Full and mini surfaces continue to consume `useChatController` and `ChatComposer`.
- Mobile mounts no floating messenger controller; Chat launcher navigates to the full screen.
- Mobile Chat states are inbox, conversation, and details subpage.

- [ ] Write failing tests proving mobile does not mount FloatingMessenger and desktop still does.
- [ ] Write failing shared-composer tests for text, image/audio, reply, offline restoration, and reset in full and compact adapters.
- [ ] Write failing controller tests for rapid conversation switching and stale message pages.
- [ ] Implement request generation/abort handling without changing Chat requests or WebSocket frames.
- [ ] Consolidate composer layout so mobile uses touch-safe controls and the input cannot be squeezed by six fixed columns.
- [ ] Convert conversation list/detail/settings to mobile screen navigation and retain the desktop split layout at `min-width: 768px`.
- [ ] Keep old-message scroll anchoring, unread cursors, optimistic messages, and realtime cleanup.
- [ ] Remove CSS-only mobile hiding as the mechanism that controls FloatingMessenger lifecycle.
- [ ] Run all Chat tests, typecheck, lint, and build.

### Task 7: Story Viewer and Story Creator mobile hardening

**Files:**
- Modify: `src/features/story/components/StoryViewerController.tsx`
- Modify: `src/features/story/components/StoryViewport.tsx`
- Modify: `src/features/story/components/StoryReplyComposer.tsx`
- Modify: `src/features/story/screens/StoryCreatorStudio.tsx`
- Modify: `src/features/story/screens/StoryCreatorStudio.css`
- Modify: `src/features/story/styles/story-immersive.css`
- Modify existing Story tests.

**Interfaces:**
- Preserve committed/pending Story indexes, three-slide track, transitionend commit, preload, swipe, hold, and playback hooks.
- Mobile Creator keeps the current draft/publish payload and exposes detailed controls through sheets.

- [ ] Add failing Story Viewer interaction tests proving composer/button pointer events do not trigger navigation or hold-to-pause.
- [ ] Implement pointer guards without changing slide navigation.
- [ ] Add failing tests for current-only playback and cleanup while opening the reply keyboard.
- [ ] Harden safe-area and keyboard layout while preserving media lifecycle.
- [ ] Write failing Creator component tests for opening/closing mobile tool sheets without losing the draft.
- [ ] Implement responsive tool sheets using the existing creator state and actions.
- [ ] Convert Viewer/Creator controls to 44px touch targets and fixed `100dvh` mobile frames.
- [ ] Run all Story tests, typecheck, lint, and build.

### Task 8: Create/Edit Post, Settings, Auth, encoding, and final cleanup

**Files:**
- Create: `src/features/post/components/PostEditorForm.tsx`
- Create: `src/features/post/components/PostEditorForm.test.tsx`
- Modify: `src/features/post/screens/PostCreationStudio.tsx`
- Modify: `src/features/post/components/PostEditDialog.tsx`
- Modify related Post creation/edit CSS.
- Modify: `src/features/settings/screens/SettingsScreen.tsx`
- Modify: `src/features/auth/screens/LoginScreen.tsx`
- Modify related Settings/Auth CSS.
- Modify: `src/app/SocialApplication.tsx`
- Modify: `src/features/post/components/PostSurfaces.tsx`

**Interfaces:**
- `PostEditorForm` shares caption, hashtags, media item captions/order, and music UI state while Create and Edit retain separate submit adapters.
- Settings mobile uses list/subpage navigation; desktop retains category/detail panels.

- [ ] Write failing shared editor tests for caption input after media selection, reorder, music, validation, and Create/Edit adapters.
- [ ] Extract shared editor form/model and retain current Create/Edit API payloads.
- [ ] Convert mobile Create/Edit to full-height screens with safe-area headers/footers and keyboard-safe scrolling.
- [ ] Write failing Settings tests for mobile category navigation and immediate theme/locale updates.
- [ ] Implement mobile subpages while retaining desktop split layout; keep locale device-local because the backend has no language field.
- [ ] Convert Auth to a mobile-default single column with 16px inputs, 44px actions, scrolling, and desktop illustration expansion.
- [ ] Replace confirmed corrupted Vietnamese source strings with UTF-8 text.
- [ ] Remove obsolete duplicate CSS rules only after confirming selectors have a canonical owner.
- [ ] Run the complete test suite, typecheck, lint, build, and UTF-8 scan.

### Task 9: Cross-viewport verification and compatibility report

**Files:**
- Modify: `docs/superpowers/plans/2026-07-30-mobile-first-migration.md`
- Create: `docs/mobile-first-compatibility-report.md`

**Interfaces:**
- Produces a mapping/compatibility matrix and records unresolved additive backend fields.

- [ ] Verify mobile widths 320, 375, 390, 430, and 480 pixels.
- [ ] Verify tablet widths 768 and 1024 pixels and desktop widths 1280 and 1440 pixels.
- [ ] Verify portrait/landscape, long Vietnamese text, dark/light themes, loading/empty/error states, touch-only actions, reduced motion, and keyboard-visible forms/composers.
- [ ] Verify Feed media and Create Post preview both use `postMediaRatioValue`.
- [ ] Verify Chat behavior parity across full and mini surfaces on supported viewports.
- [ ] Verify routes, deep links, storage keys, SSE names, WebSocket frames, and request payloads are unchanged.
- [ ] Record backend fields still missing instead of adding frontend fallbacks.
- [ ] Run `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build`.
- [ ] Update every completed checkbox and write the final compatibility report.
