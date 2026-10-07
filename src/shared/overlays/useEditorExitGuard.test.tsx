import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useEditorExitGuard } from './useEditorExitGuard';
afterEach(() => { vi.restoreAllMocks(); window.history.replaceState(null, '', '/'); });
it('cancels Back before Router handles it and consumes the restoration POP', () => {
  window.history.replaceState({ idx: 3 }, '', '/create/post');
  vi.spyOn(window, 'confirm').mockReturnValue(false); const go = vi.spyOn(window.history, 'go').mockImplementation(() => undefined);
  const hook = renderHook(() => useEditorExitGuard(true, 'Discard draft?'));
  const router = vi.fn(); window.addEventListener('popstate', router);
  act(() => { window.history.replaceState({ idx: 2 }, '', '/'); window.dispatchEvent(new PopStateEvent('popstate', { state: { idx: 2 } })); });
  expect(go).toHaveBeenCalledWith(1); expect(router).not.toHaveBeenCalled();
  act(() => { window.history.replaceState({ idx: 3 }, '', '/create/post'); window.dispatchEvent(new PopStateEvent('popstate', { state: { idx: 3 } })); });
  expect(router).not.toHaveBeenCalled(); expect(window.confirm).toHaveBeenCalledOnce();
  hook.unmount(); window.removeEventListener('popstate', router);
});
it('accepts actual route exit, ignores same URL sheet history and bypasses an explicit discard', () => {
  window.history.replaceState({ idx: 3 }, '', '/create/story');
  vi.spyOn(window, 'confirm').mockReturnValue(true);
  const hook = renderHook(() => useEditorExitGuard(true, 'Discard draft?'));
  act(() => window.dispatchEvent(new PopStateEvent('popstate', { state: { idx: 4, usr: { localSheet: { id: 'sheet' } } } })));
  expect(window.confirm).not.toHaveBeenCalled();
  act(() => { window.history.replaceState({ idx: 2 }, '', '/'); window.dispatchEvent(new PopStateEvent('popstate', { state: { idx: 2 } })); });
  expect(window.confirm).toHaveBeenCalledOnce();
  hook.result.current();
  const unload = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(unload); expect(unload.defaultPrevented).toBe(false);
  hook.unmount();
});
it('protects unsaved drafts on reload and stops guarding after cleanup', () => {
  const hook = renderHook(() => useEditorExitGuard(true, 'Discard draft?'));
  const unload = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(unload); expect(unload.defaultPrevented).toBe(true);
  hook.unmount(); const clean = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(clean); expect(clean.defaultPrevented).toBe(false);
});
