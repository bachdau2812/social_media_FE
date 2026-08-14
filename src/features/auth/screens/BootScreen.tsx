import { RefreshCw } from "lucide-react";

export function BootScreen() {
  return (
    <main className="auth-shell">
      <div className="auth-card" role="status">
        <RefreshCw className="auth-spinner" size={24} aria-hidden="true" />
        <h1>Loading session</h1>
      </div>
    </main>
  );
}
