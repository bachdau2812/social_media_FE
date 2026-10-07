import { ImagePlus, Mic, Paperclip, Send, X } from "lucide-react";
import { useRef } from "react";
import { ChatAttachmentTray, ChatVoiceComposerState } from "./ChatMediaExperience";
import { EmojiPickerControl } from "./EmojiPickerControl";
import type { useChatController } from "../hooks/useChatController";

import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";

type Controller = ReturnType<typeof useChatController>;

function replyText(controller: Controller) {
  const reply = controller.replyTo;
  if (!reply) return "";
  if (reply.deleted) return "Tin nhắn gốc không còn tồn tại";
  if (reply.messageType === "IMAGE") return "Ảnh";
  if (reply.messageType === "AUDIO") return "Tin nhắn thoại";
  return reply.content || "Tin nhắn";
}

export function ChatComposer({ controller, compact = false }: { controller: Controller; compact?: boolean }) {
  const mobile = useMediaQuery("(max-width: 767px)");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const media = controller.mediaComposer;
  const composerError = media.error || controller.sendError;
  const disabled = controller.sending || Boolean(controller.active?.isDissolved);
  const canSend = Boolean(controller.draft.trim() || media.images.length || media.audioAttachment) && !disabled && !media.recording;

  function sendOnEnter(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (mobile || event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
    event.preventDefault();
    if (canSend) void controller.send();
  }

  const content = <>
    {controller.replyTo && <div className="chat-composer-reply">
      <span><strong>Đang trả lời {controller.replyTo.senderDisplayName || "tin nhắn"}</strong><small>{replyText(controller)}</small></span>
      <button type="button" onClick={() => controller.setReplyTo(null)} aria-label="Hủy trả lời"><X size={15} /></button>
    </div>}
    <ChatAttachmentTray
      images={media.images}
      disabled={disabled}
      onAdd={() => fileRef.current?.click()}
      onRemove={media.removeImage}
      onMove={media.moveImage}
      onRetry={(id) => media.updateImageState(id, { status: "ready", progress: 0, error: undefined })}
      onClear={media.clearImages}
    />
    <ChatVoiceComposerState
      recording={media.recording}
      elapsed={media.recordingElapsed}
      audioUrl={media.audioAttachment?.previewUrl}
      duration={media.audioAttachment?.duration}
      onCancelRecording={media.cancelRecording}
      onStopRecording={media.stopRecording}
      onRemoveAudio={media.clearAudio}
    />
    {composerError && <p className="chat-composer-error" role="alert">{composerError}</p>}
    <div className={`chat-composer-actions ${compact ? "compact floating-composer-row" : "full dm-composer-box"}`}>
      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(event) => { media.selectImages(event.target.files); event.currentTarget.value = ""; window.requestAnimationFrame(() => textareaRef.current?.focus()); }} />
      <button type="button" className="chat-attachment-shortcut" onClick={() => fileRef.current?.click()} disabled={disabled || media.recording} aria-label="Đính kèm ảnh"><Paperclip size={compact ? 17 : 19} /></button>
      <EmojiPickerControl textareaRef={textareaRef} value={controller.draft} onChange={controller.setDraft} disabled={disabled || media.recording} iconSize={compact ? 17 : 19} />
      <textarea
        ref={textareaRef}
        rows={1}
        value={controller.draft}
        onChange={(event) => controller.setDraft(event.target.value)}
        onKeyDown={sendOnEnter}
        placeholder="Tin nhắn..."
        aria-label="Nội dung tin nhắn"
        disabled={disabled || media.recording}
      />
      <button type="button" onClick={() => fileRef.current?.click()} disabled={disabled || media.recording} aria-label="Thêm ảnh"><ImagePlus size={compact ? 17 : 19} /></button>
      <button type="button" onClick={() => void media.startRecording()} disabled={disabled || media.recording || Boolean(media.audioAttachment)} aria-label="Ghi âm"><Mic size={compact ? 17 : 19} /></button>
      <button type="button" className={compact ? "floating-send" : "dm-send-action"} onClick={() => void controller.send()} disabled={!canSend} aria-label="Gửi tin nhắn"><Send size={compact ? 17 : 19} /></button>
    </div>
  </>;

  if (controller.active?.isDissolved) return <div className={`chat-dissolved-notice ${compact ? "compact" : ""}`}>Nhóm chat đã bị giải tán.</div>;
  return <div className={compact ? "floating-composer" : "dm-composer"}>{content}</div>;
}
