import type { ReactNode } from "react";
import { useViewportMode, type ViewportMode } from "../../shared/hooks/useViewportMode";

type ResponsiveAppShellProps = {
  children: ReactNode;
  className?: string;
  desktopNavigation: ReactNode;
  mobileHeader: ReactNode;
  mobileNavigation: ReactNode;
  rightRail?: ReactNode;
  viewportMode?: ViewportMode;
};

export function ResponsiveAppShell({
  children,
  className,
  desktopNavigation,
  mobileHeader,
  mobileNavigation,
  rightRail,
  viewportMode,
}: ResponsiveAppShellProps) {
  const detectedViewportMode = useViewportMode();
  const mode = viewportMode ?? detectedViewportMode;
  const mobile = mode === "mobile";

  return (
    <div className={["app-shell", className].filter(Boolean).join(" ")} data-viewport-mode={mode}>
      {mobile ? mobileHeader : desktopNavigation}
      <main className="app-main">{children}</main>
      {mode === "desktop" && rightRail}
      {mobile && mobileNavigation}
    </div>
  );
}
