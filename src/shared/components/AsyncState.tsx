import type { ReactNode } from "react";

export function Spinner({ label = "Loading" }: { label?: string }) {
  return <span className="shared-spinner" role="status" aria-label={label} />;
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="shared-state" role="status">
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="shared-state shared-state-error" role="alert">
      <p>{message}</p>
      {onRetry ? <button type="button" onClick={onRetry}>Retry</button> : null}
    </div>
  );
}
