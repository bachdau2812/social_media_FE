import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useVisualViewportSurface } from './useVisualViewportSurface';
afterEach(() => vi.unstubAllGlobals());
it('updates visible viewport bounds, ignores pinch zoom and removes its listeners', () => {
  const viewport = Object.assign(new EventTarget(), { height: 440, offsetTop: 12, scale: 1 });
  vi.stubGlobal('visualViewport', viewport);
  let frame: FrameRequestCallback | undefined;
  vi.stubGlobal('requestAnimationFrame', vi.fn(callback => { frame = callback; return 1; }));
  const cancel = vi.fn(); vi.stubGlobal('cancelAnimationFrame', cancel);
  const remove = vi.spyOn(viewport, 'removeEventListener');
  const hook = renderHook(() => useVisualViewportSurface(true));
  act(() => frame?.(0));
  expect(hook.result.current).toMatchObject({ '--surface-viewport-height': '440px', '--surface-viewport-top': '12px' });
  act(() => { viewport.scale = 2; viewport.height = 200; viewport.dispatchEvent(new Event('resize')); frame?.(0); });
  expect(hook.result.current).toMatchObject({ '--surface-viewport-height': '440px' });
  hook.unmount(); expect(remove).toHaveBeenCalledTimes(2); expect(cancel).toHaveBeenCalled();
});
