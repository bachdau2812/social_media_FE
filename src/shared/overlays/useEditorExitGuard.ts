import { useCallback, useEffect, useRef } from 'react';

function entryIndex(state: unknown): number | null {
  const entry = state as { idx?: number; usr?: { depth?: number } } | null;
  const value = entry?.idx ?? entry?.usr?.depth;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/** Feature-mounted adapter for BrowserRouter editors; same-URL sheets are not exits. */
export function useEditorExitGuard(dirty: boolean, message: string): () => void {
  const current = useRef({ dirty, message }); current.current = { dirty, message };
  const allowed = useRef(false);
  useEffect(() => {
    const editorUrl = window.location.href;
    const editorIndex = entryIndex(window.history.state);
    let restoring = false;
    const unload = (event: BeforeUnloadEvent) => {
      if (!current.current.dirty || allowed.current) return;
      event.preventDefault(); event.returnValue = '';
    };
    const pop = (event: PopStateEvent) => {
      if (restoring) {
        event.stopImmediatePropagation(); restoring = false; return;
      }
      if (window.location.href === editorUrl || !current.current.dirty || allowed.current) return;
      const targetIndex = entryIndex(event.state);
      // Without a known history delta, do not invent an entry or trap direct entry.
      if (editorIndex === null || targetIndex === null || editorIndex === targetIndex) return;
      if (window.confirm(current.current.message)) { allowed.current = true; return; }
      event.stopImmediatePropagation(); restoring = true;
      window.history.go(editorIndex - targetIndex);
    };
    window.addEventListener('beforeunload', unload);
    window.addEventListener('popstate', pop, true);
    return () => { window.removeEventListener('beforeunload', unload); window.removeEventListener('popstate', pop, true); };
  }, []);
  return useCallback(() => { allowed.current = true; }, []);
}
