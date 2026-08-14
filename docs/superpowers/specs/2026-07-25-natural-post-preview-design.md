# Natural-Size Post Preview Design

## Goal

Render Create Post preview media without upscaling or cropping and use black for all unused preview space.

## Design

- Images and videos use their intrinsic dimensions and aspect ratio.
- Media is only scaled down when it exceeds the preview bounds.
- `object-fit: contain` prevents cropping and distortion.
- The preview panel, frame, and media fallback surface use black so letterboxed space is consistent.
- Upload, selection, editing, and publish behavior remain unchanged.
