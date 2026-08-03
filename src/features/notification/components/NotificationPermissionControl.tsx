import { Bell, Check, LoaderCircle, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { currentNotificationPermission, requestAndRegisterPushNotifications } from "../services/pushNotifications";

type PermissionState = NotificationPermission | "unsupported" | "requesting" | "registered" | "error";

export function NotificationPermissionControl({ userId }: { userId: string }) {
  const [state, setState] = useState<PermissionState>(() => currentNotificationPermission());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  async function confirmRequest() {
    setDialogOpen(false);
    setState("requesting");
    setError("");
    try {
      await requestAndRegisterPushNotifications(userId);
      setState("registered");
    } catch (requestError) {
      const permission = currentNotificationPermission();
      setState(permission === "denied" || permission === "unsupported" ? permission : "error");
      setError(requestError instanceof Error ? requestError.message : "Could not register push notifications.");
    }
  }

  const disabled = state === "requesting" || state === "registered" || state === "unsupported" || state === "denied";
  const label = state === "requesting" ? "Requesting permission"
    : state === "registered" ? "Permission granted"
      : state === "denied" ? "Permission blocked"
        : state === "unsupported" ? "Notifications unsupported"
          : "Request Permission";

  return <>
    <div className="notification-permission-control">
      <span><Bell size={18} /><span><strong>Browser notifications</strong><small>Allow this device to receive push notifications.</small></span></span>
      <button type="button" disabled={disabled} onClick={() => setDialogOpen(true)}>
        {state === "requesting" ? <LoaderCircle className="spin" size={17} /> : state === "registered" ? <Check size={17} /> : null}
        {label}
      </button>
      {error && <small className="notification-permission-error" role="alert">{error}</small>}
    </div>
    {dialogOpen && createPortal(<div className="permission-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDialogOpen(false)}>
      <section className="permission-dialog" role="dialog" aria-modal="true" aria-labelledby="permission-dialog-title">
        <button className="permission-dialog-close" onClick={() => setDialogOpen(false)} aria-label="Close"><X size={18} /></button>
        <span className="permission-dialog-icon"><Bell size={22} /></span>
        <h3 id="permission-dialog-title">Allow notifications?</h3>
        <p>Your browser will ask for permission. When accepted, this device will be registered for account notifications.</p>
        <div><button onClick={() => setDialogOpen(false)}>Not now</button><button className="primary" onClick={() => void confirmRequest()}>Continue</button></div>
      </section>
    </div>, document.body)}
  </>;
}
