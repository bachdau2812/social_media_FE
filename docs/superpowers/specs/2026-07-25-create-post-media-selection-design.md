# Create Post Media Selection Redesign

## Goal

Simplify the Create Post header and make Step 1 transition from a focused upload surface into a preview-and-media-list workspace.

## Design

- The header contains a Close action on the left and four connected progress dots centered in the modal. It contains no title or numeric step labels.
- Completed connectors and dots are dark; the active dot is larger and stronger; upcoming progress remains gray. Dots remain keyboard accessible and selectable.
- With no media, Step 1 hides the preview column and centers one upload surface across the available body.
- After media is selected, the body becomes two columns: active media preview on the left and a compact selectable media list on the right.
- Selecting a list item updates `activeMediaId`, which already drives the preview.
- The initial upload surface disappears after selection. A single Add more action remains below the list and reuses the existing file input.
- Images and videos follow the same selection behavior. Existing upload, processing, draft, publish, music, and backend payload logic remains unchanged.
