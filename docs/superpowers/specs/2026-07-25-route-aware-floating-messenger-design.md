# Route-Aware Floating Messenger Design

## Goal

Keep the full floating message launcher on Home while using an icon-only launcher on every other non-Chat screen.

## Behavior

- Home renders the existing wide launcher with label, recent avatars, and unread count.
- Other non-Chat screens render a compact message icon with an unread badge.
- Selecting either launcher opens the same floating conversation panel.
- Selecting Maximize opens the full Chat page.
- Moving between Home and another screen collapses an open panel back to the launcher appropriate for the destination screen.
- Conversation selection and draft state remain owned by `FloatingMessenger` and are otherwise unchanged.
