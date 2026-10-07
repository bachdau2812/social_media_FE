import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ViewKey } from "../router/navigation.types";
import { MobileMoreMenu } from "./MobileMoreMenu";

type MobileAppHeaderProps = {
  title: string;
  subtitle?: string;
  canGoBack: boolean;
  onBack: () => void;
  onNavigate: (view: ViewKey) => void;
};

export function MobileAppHeader({ title, subtitle, canGoBack, onBack, onNavigate }: MobileAppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("pointerdown", closeOnPointerDown);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnPointerDown);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="mobile-app-header" aria-label="Mobile header">
      {canGoBack ? (
        <button type="button" className="mobile-header-action" onClick={onBack} aria-label="Quay lại">
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
      ) : <span className="mobile-header-action" aria-hidden="true" />}
      <div className="mobile-header-title">{subtitle && <small>{subtitle}</small>}<strong>{title}</strong></div>
      <div className="mobile-more-anchor" ref={containerRef}>
        <button
          type="button"
          className="mobile-header-action"
          aria-label="Mở menu khác"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MoreHorizontal size={24} aria-hidden="true" />
        </button>
        {menuOpen && <MobileMoreMenu onNavigate={onNavigate} onClose={() => setMenuOpen(false)} />}
      </div>
    </header>
  );
}
