import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

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
    window.addEventListener("shared-app-toast", listener);
    return () => window.removeEventListener("shared-app-toast", listener);
  }, [showToast]);
  const value = useMemo(() => ({ showToast }), [showToast]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? <div className="global-toast-host" role="status">{message}</div> : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used within ToastProvider");
  return value;
}
