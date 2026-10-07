import { type CSSProperties, useEffect, useState } from 'react';

export function useVisualViewportSurface(enabled = true): CSSProperties {
  const [style, setStyle] = useState<CSSProperties>({});
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!enabled || !viewport) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Pinch zoom must retain browser panning rather than resize the app surface.
        if (Math.abs(viewport.scale - 1) > 0.01) return;
        setStyle({ '--surface-viewport-height': `${viewport.height}px`, '--surface-viewport-top': `${viewport.offsetTop}px` } as CSSProperties);
      });
    };
    update(); viewport.addEventListener('resize', update); viewport.addEventListener('scroll', update);
    return () => { cancelAnimationFrame(frame); viewport.removeEventListener('resize', update); viewport.removeEventListener('scroll', update); };
  }, [enabled]);
  return enabled ? style : {};
}
