import { Pin, X } from "lucide-react";
import { useState } from "react";
import type { useChatController } from "../hooks/useChatController";
import { messagePreview } from "../model/chatMessageActions";
import "../styles/chat-message-actions.css";

export function PinnedMessagesBar({ controller }: { controller: ReturnType<typeof useChatController> }) {
  const [open, setOpen] = useState(false);
  const [focusError, setFocusError] = useState(false);
  const pins = controller.pins;
  if (!pins?.items.length && !controller.pinsError) return null;
  return <div className="chat-pins-bar">
    <button type="button" className="chat-pins-toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}><Pin size={14} />{pins?.items.length ?? 0} tin nhắn đã ghim</button>
    {controller.pinsError && <div role="alert">{controller.pinsError}<button type="button" onClick={() => controller.activeId && void controller.refreshPins(controller.activeId)}>Thử lại</button></div>}
    {open && <div className="chat-pins-panel" role="region" aria-label="Tin nhắn đã ghim">
      {pins?.items.map((item) => <div className="chat-pins-item" key={item.message.id}>
        <button type="button" onClick={() => {
          setFocusError(false);
          void controller.focusMessage(item.message.messageSeq).then(() => setOpen(false)).catch(() => setFocusError(true));
        }}>
          <small>{item.message.senderDisplayName || item.message.senderId}</small><strong>{messagePreview(item.message)}</strong>
          <time dateTime={item.message.createdAt ?? undefined}>{item.message.createdAt ? new Date(item.message.createdAt).toLocaleString("vi-VN") : ""}</time>
        </button>
        {pins.canManage && !controller.active?.isDissolved && <button type="button" aria-label={`Bỏ ghim ${messagePreview(item.message)}`} disabled={controller.messageActionState(item.message).pending} onClick={() => void controller.pinMessage(item.message, true)}><X size={15} /></button>}
        {controller.messageActionState(item.message).error && <p role="alert">{controller.messageActionState(item.message).error}</p>}
      </div>)}
      {focusError && <p role="alert">Không thể mở tin nhắn. Vui lòng thử lại.</p>}
    </div>}
  </div>;
}
