import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AppLocale = "vi" | "en";
const STORAGE_KEY = "social-media-locale";
const LocaleContext = createContext<{ locale: AppLocale; setLocale: (locale: AppLocale) => void } | null>(null);

function initialLocale(): AppLocale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "vi" || stored === "en") return stored;
  return navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<AppLocale>(initialLocale);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used within LocaleProvider");
  return value;
}
