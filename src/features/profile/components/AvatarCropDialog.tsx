import { useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { LoaderCircle, X } from "lucide-react";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { avatarCropRect, type AvatarCropPosition } from "../model/avatarCrop";

type Props = {
  file: File;
  busy: boolean;
  uploading: boolean;
  message: string;
  error: boolean;
  onClose: () => void;
  onSave: (image: HTMLImageElement, zoom: number, position: AvatarCropPosition) => Promise<void>;
};

export function AvatarCropDialog({ file, busy, uploading, message, error, onClose, onSave }: Props) {
  useBodyScrollLock(true);
  const dialogRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [url, setUrl] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [imageError, setImageError] = useState("");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState<AvatarCropPosition>({ x: 0, y: 0 });
  const drag = useRef<{ id: number; x: number; y: number; position: AvatarCropPosition; stageWidth: number } | null>(null);
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previousFocus?.focus();
  }, []);
  const crop = avatarCropRect(dimensions.width, dimensions.height, zoom, position);
  const ready = dimensions.width > 0 && dimensions.height > 0 && !imageError;
  const clamp = (value: number) => Math.max(-1, Math.min(1, value));

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!ready || busy || event.button !== 0) return;
    const stageWidth = event.currentTarget.getBoundingClientRect().width;
    if (!stageWidth) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, position, stageWidth };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const origin = drag.current;
    if (!origin || origin.id !== event.pointerId || busy) return;
    const spanX = dimensions.width - crop.size;
    const spanY = dimensions.height - crop.size;
    setPosition({
      x: spanX > 0 ? clamp(origin.position.x - (event.clientX - origin.x) * crop.size * 2 / (origin.stageWidth * spanX)) : 0,
      y: spanY > 0 ? clamp(origin.position.y - (event.clientY - origin.y) * crop.size * 2 / (origin.stageWidth * spanY)) : 0,
    });
  }

  return createPortal(<div className="avatar-crop-backdrop" onMouseDown={(event) => {
    if (event.target === event.currentTarget && !uploading) onClose();
  }}>
    <section ref={dialogRef} className="avatar-crop-dialog" role="dialog" aria-modal="true" aria-label="Cắt ảnh đại diện" tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !uploading) { event.stopPropagation(); onClose(); }
        if (event.key !== "Tab") return;
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled])");
        if (!controls?.length) { event.preventDefault(); return; }
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}>
      <header><h2>Cắt ảnh đại diện</h2><button type="button" className="icon-button" aria-label="Đóng" disabled={uploading} onClick={onClose}><X size={20} /></button></header>
      <p>Kéo ảnh hoặc điều chỉnh bên dưới để chọn phần muốn hiển thị.</p>
      <div className="avatar-crop-stage" onPointerDown={startDrag} onPointerMove={moveDrag}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        {url && <img ref={imageRef} src={url} alt="Ảnh đã chọn để cắt" draggable={false}
          style={ready ? { width: `${dimensions.width / crop.size * 100}%`, height: `${dimensions.height / crop.size * 100}%`, left: `${-crop.x / crop.size * 100}%`, top: `${-crop.y / crop.size * 100}%` } : undefined}
          onLoad={(event) => {
            const image = event.currentTarget;
            if (!image.naturalWidth || !image.naturalHeight) { setImageError("Không thể đọc ảnh đã chọn."); return; }
            setDimensions({ width: image.naturalWidth, height: image.naturalHeight });
          }} onError={() => setImageError("Không thể đọc ảnh này. Hãy chọn ảnh JPG, PNG hoặc WebP khác.")} />}
        <span className="avatar-crop-circle" aria-hidden="true" />
      </div>
      <div className="avatar-crop-controls">
        <label>Phóng đại<input type="range" min={1} max={3} step={0.01} value={zoom} disabled={!ready || busy} onChange={(event) => setZoom(Number(event.target.value))} /></label>
        <label>Vị trí ngang<input type="range" min={-1} max={1} step={0.01} value={position.x} disabled={!ready || busy} onChange={(event) => setPosition((value) => ({ ...value, x: Number(event.target.value) }))} /></label>
        <label>Vị trí dọc<input type="range" min={-1} max={1} step={0.01} value={position.y} disabled={!ready || busy} onChange={(event) => setPosition((value) => ({ ...value, y: Number(event.target.value) }))} /></label>
      </div>
      {(message || imageError) && <p className="avatar-upload-message" role={error || imageError ? "alert" : "status"}>{busy && <LoaderCircle size={16} className="avatar-upload-spinner" />}{imageError || message}</p>}
      <footer><button type="button" className="avatar-crop-cancel" disabled={uploading} onClick={onClose}>{busy ? "Đóng" : "Hủy"}</button>
        <button type="button" className="avatar-crop-save" disabled={!ready || busy} onClick={() => {
          if (imageRef.current) void onSave(imageRef.current, zoom, position);
        }}>Lưu</button></footer>
    </section>
  </div>, document.body);
}
