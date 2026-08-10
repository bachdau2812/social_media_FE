# Feed and Post Detail Video Autoplay Design

## Goal

Video media should start automatically when it becomes the active media in the Feed or Post Detail. It should use the video's original audio whenever the browser permits audible autoplay, fall back to muted autoplay when the browser blocks it, and loop continuously after reaching the end. Moving between media items must remain responsive and must not wait for a new preload operation.

## Current Root Causes

- Feed videos are always rendered with `muted`, so their original audio can never be heard during viewport autoplay.
- Post Detail renders the active video with controls but has no automatic playback lifecycle.
- `preloadPostMedia` creates detached videos with `preload="metadata"` while waiting for `loadeddata`, which is a mismatch between the requested resource level and the event being awaited.
- Feed and Post Detail preload every media item concurrently and then create another preload operation before changing slides. This competes with the active video for bandwidth and delays the visual transition.
- Feed and Detail implement video behavior separately, which allows their playback rules to diverge.

## Playback Architecture

Create one shared post-video playback implementation used by both Feed and Post Detail.

The shared controller receives:

- whether the media item is the active carousel item;
- whether its surface is eligible for playback, based on viewport visibility for Feed and dialog visibility for Post Detail;
- the source URL;
- the user's current sound preference.

It owns the video element lifecycle:

- call `play()` when the item becomes eligible;
- pause when it loses eligibility, leaves the viewport, becomes a previous transition layer, the document is hidden, or the component unmounts;
- enable `loop` so completion restarts from the beginning automatically;
- prevent two Feed videos from remaining active simultaneously;
- reset playback state when the source changes.

## Audible Autoplay Policy

The controller first attempts playback using original audio when sound is enabled.

If `play()` is rejected by browser autoplay policy:

1. mute that video;
2. retry playback immediately;
3. show an accessible sound control indicating that playback is muted;
4. after the user's first sound-enabling interaction, unmute and play the active video;
5. retain that sound preference for subsequent Feed and Detail videos during the current application session.

The application will not try to bypass browser policy. A policy rejection must never leave the active video stopped if muted autoplay remains available.

## Feed Behavior

- Only the active carousel media in the Feed post selected by the existing visibility coordinator may play.
- The visibility threshold remains stable enough to avoid rapid start/pause oscillation while scrolling.
- A video leaving the active viewport pauses immediately.
- Feed video audio and post-added music remain mutually exclusive: video media uses its own audio; image media can continue using the existing attached-music player.
- The video surface exposes a mute/unmute control without requiring the user to open Post Detail.

## Post Detail Behavior

- Opening Post Detail starts its first active video automatically.
- Changing to another video starts the new active video automatically.
- The previous transition layer is always paused and muted.
- Image media keeps the existing attached-music behavior.
- The active video exposes native or application sound controls, while autoplay state is controlled by the shared controller.

## Preloading and Transition Performance

- Do not preload the whole carousel at once.
- Give the active video `preload="auto"`.
- Warm only the immediately adjacent media items. Adjacent videos use browser-managed preload and do not create a blocking Promise.
- Change the active index immediately when the user navigates. The transition must not await network completion.
- Keep the previous media layer only for the existing 320 ms visual animation.
- Show a lightweight buffering indicator on the active video when it is waiting for enough data, without disabling carousel navigation.
- Post Detail becomes visible after its post payload is hydrated; it does not wait for every media resource to load.

## Error Handling

- A rejected audible play retries muted once.
- A second playback failure leaves the media controls available and clears any perpetual loading indicator.
- Media load errors show a non-blocking unavailable state for that item.
- Playback failures do not affect post data, comments, music metadata, or carousel navigation.

## Testing

Regression tests will prove:

- an eligible Feed video calls `play()` automatically;
- a Feed video pauses when it loses eligibility;
- Post Detail auto-plays the active video on open and after navigation;
- audible autoplay rejection retries with `muted=true`;
- videos are configured to loop;
- carousel state changes without awaiting preload;
- only adjacent items receive eager preload priority;
- image music playback remains unchanged;
- existing Feed and Post Detail tests remain green.

## Out of Scope

- Backend media transcoding or API contract changes;
- changing Cloudinary delivery URLs;
- persisting sound preference to the backend or local storage;
- autoplaying multiple videos simultaneously;
- bypassing browser autoplay restrictions.
