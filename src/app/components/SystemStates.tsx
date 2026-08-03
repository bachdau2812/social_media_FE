import { Archive, Lock, RefreshCw, WifiOff, type LucideIcon } from "lucide-react";

export function SystemStates() {
  return (
    <section className="screen states-grid">
      <State icon={WifiOff} title="Offline" action="Retry" />
      <State icon={Lock} title="Permission denied" action="Back" />
      <State icon={Archive} title="Empty saved content" action="Open feed" />
      <State icon={RefreshCw} title="Session expired" action="Sign in" />
    </section>
  );
}

function State({ icon: Icon, title, action }: { icon: LucideIcon; title: string; action: string }) {
  return <div className="empty-state"><Icon size={26} /><strong>{title}</strong><span>{action}</span></div>;
}
