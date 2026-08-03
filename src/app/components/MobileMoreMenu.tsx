import { Library, Settings, User } from "lucide-react";
import type { ViewKey } from "../router/navigation.types";

type MobileMoreMenuProps = {
  onNavigate: (view: ViewKey) => void;
  onClose: () => void;
};

const items: Array<{ view: ViewKey; label: string; icon: typeof User }> = [
  { view: "profile", label: "Trang cá nhân", icon: User },
  { view: "library", label: "Thư viện", icon: Library },
  { view: "settings", label: "Cài đặt", icon: Settings },
];

export function MobileMoreMenu({ onNavigate, onClose }: MobileMoreMenuProps) {
  return (
    <div className="mobile-more-menu" role="menu" aria-label="Điều hướng khác">
      {items.map(({ view, label, icon: Icon }) => (
        <button
          key={view}
          type="button"
          role="menuitem"
          onClick={() => {
            onNavigate(view);
            onClose();
          }}
        >
          <Icon size={20} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
