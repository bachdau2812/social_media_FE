# Create Post Oriented Preview Design

## Goal

Adjust the Create Post preview so uploaded images scale by their natural orientation.

## Design

- Landscape and square images fill the preview frame width while preserving aspect ratio.
- Portrait images fill the preview frame height while preserving aspect ratio.
- Empty space around the image uses the same white background as the surrounding create-post workspace.
- Videos keep the existing contained preview behavior.
- The implementation is scoped to `PostCreationStudio.tsx` and the existing Create Post CSS override.

## Verification

- Run `npm run build` in `social_media_FE`.