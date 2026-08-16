import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { APP_TOAST_EVENT, LEGACY_SHARED_APP_TOAST_EVENT } from "../../shared/notifications/appToast";

type ToastContextValue = { showToast: (message: string) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const showToast = useCallback((next: string) => {
    setMessage(next);
    window.setTimeout(() => setMessage((current) => current === next ? "" : current), 2600);
  }, []);
  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) showToast(detail);
    };
    window.addEventListener(APP_TOAST_EVENT, listener);
    window.addEventListener(LEGACY_SHARED_APP_TOAST_EVENT, listener);
    return () => {
      window.removeEventListener(APP_TOAST_EVENT, listener);
      window.removeEventListener(LEGACY_SHARED_APP_TOAST_EVENT, listener);
    };
  }, [showToast]);
  const value = useMemo(() => ({ showToast }), [showToast]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? <div className="app-global-toast global-toast-host" role="status">{message}</div> : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used within ToastProvider");
  return value;
}
