import { useCallback, useContext, useEffect, useRef } from 'react';
import { UNSAFE_LocationContext, useInRouterContext, useLocation, useNavigate } from 'react-router-dom';

export function useSheetHistoryRestore(onRestore: (id: string) => void) {
  const context = useContext(UNSAFE_LocationContext);
  const callback = useRef(onRestore); callback.current = onRestore;
  const id = context?.location.state?.localSheet?.id;
  useEffect(() => { if (typeof id === 'string') callback.current(id); }, [id]);
}

// Keep the adapter optional for isolated components and direct test rendering.
export function useLocalSheetHistory(id: string, onClose: () => void, enabled = true): (afterClose?: unknown) => void {
  const inRouter = useInRouterContext();
  // Router presence is fixed for this component's lifetime.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return inRouter ? useRouterSheetHistory(id, onClose, enabled) : (afterClose?: unknown) => { onClose(); if (typeof afterClose === 'function') afterClose(); };
}

function useRouterSheetHistory(id: string, onClose: () => void, enabled: boolean) {
  const location = useLocation();
  const navigate = useNavigate();
  const closeRef = useRef(onClose); closeRef.current = onClose;
  const initial = useRef(location);
  const entered = useRef(false);
  const observed = useRef(false);
  const after = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (!enabled || entered.current) return;
    entered.current = true;
    const parent = initial.current;
    if (parent.state?.localSheet?.id === id) { observed.current = true; return; }
    navigate({ pathname: parent.pathname, search: parent.search, hash: parent.hash }, {
      state: { ...parent.state, localSheet: { id, parentKey: parent.state?.localSheet?.parentKey ?? parent.key } }, preventScrollReset: true,
    });
  }, [enabled, id, navigate]);
  useEffect(() => {
    if (location.state?.localSheet?.id === id) observed.current = true;
    if (!enabled || !observed.current) return;
    if (location.state?.localSheet?.id !== id) { closeRef.current(); const action = after.current; after.current = null; action?.(); }
  }, [enabled, id, location]);
  return useCallback((afterClose?: unknown) => {
    after.current = typeof afterClose === 'function' ? afterClose as () => void : null;
    if (enabled && location.state?.localSheet?.id === id) navigate(-1);
    else { closeRef.current(); const action = after.current; after.current = null; action?.(); }
  }, [enabled, id, location.state, navigate]);
}
