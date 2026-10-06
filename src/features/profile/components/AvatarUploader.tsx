import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Plus } from "lucide-react";
import { uploadCloudinaryMedia, type CloudinaryUploadResult } from "../../../shared/api";
import { Avatar } from "../../../shared/components";
import { getMediaUploadPolicy, validateMediaFile } from "../../../shared/media/mediaUploadPolicy";
import { profileApi } from "../api/profile.api";
import { exportAvatarCrop, type AvatarCropPosition } from "../model/avatarCrop";
import { AVATAR_UPLOAD_RESULT_EVENT, isAvatarUploadResult } from "../model/avatarUpload";
import { AvatarCropDialog } from "./AvatarCropDialog";

export function AvatarUploader({ userId, avatarUrl, username, onApproved }: {
  userId: string; avatarUrl: string; username: string; onApproved: () => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "selecting" | "uploading" | "pending">("idle");
  const [notice, setNotice] = useState({ message: "", error: false });
  const mounted = useRef(true);
  const selection = useRef(0);
  const submitting = useRef(false);
  const operation = useRef(0);
  const pending = useRef<string | null>(null);
  const uploaded = useRef<{ key: string; media: CloudinaryUploadResult } | null>(null);
  const approvedRef = useRef(onApproved);
  useEffect(() => { approvedRef.current = onApproved; }, [onApproved]);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => {
    const handleResult = (event: Event) => {
      const data: unknown = (event as CustomEvent).detail;
      if (!isAvatarUploadResult(data) || data.userId !== userId || data.publicId !== pending.current) return;
      pending.current = null;
      operation.current++;
      submitting.current = false;
      uploaded.current = null;
      setStatus("idle");
      if (data.result === "APPROVED") {
        setFile(null);
        setNotice({ message: "Đã cập nhật ảnh đại diện.", error: false });
        void Promise.resolve().then(() => approvedRef.current()).catch(() => {
          if (mounted.current) setNotice({ message: "Ảnh đã được duyệt. Tải lại hồ sơ để xem ảnh mới.", error: false });
        });
      } else {
        setNotice({ message: "Ảnh không được chấp nhận. Vui lòng chọn ảnh khác.", error: true });
      }
    };
    window.addEventListener(AVATAR_UPLOAD_RESULT_EVENT, handleResult);
    return () => window.removeEventListener(AVATAR_UPLOAD_RESULT_EVENT, handleResult);
  }, [userId]);
  useEffect(() => {
    if (status !== "pending") return;
    const timer = window.setTimeout(() => {
      pending.current = null;
      uploaded.current = null;
      setStatus("idle");
      setFile(null);
      setNotice({ message: "Ảnh vẫn đang được xử lý. Tải lại hồ sơ để kiểm tra kết quả.", error: false });
    }, 90_000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected || submitting.current || pending.current) return;
    const version = ++selection.current;
    setNotice({ message: "", error: false });
    if (!selected.type.startsWith("image/")) { setNotice({ message: "Vui lòng chọn một tệp ảnh.", error: true }); return; }
    setStatus("selecting");
    try {
      const policy = await getMediaUploadPolicy();
      if (!mounted.current || version !== selection.current) return;
      const validationError = validateMediaFile(selected, "IMAGE", policy);
      if (validationError) { setNotice({ message: validationError, error: true }); return; }
      uploaded.current = null;
      setFile(selected);
    } catch {
      if (mounted.current) setNotice({ message: "Không thể mở ảnh. Vui lòng thử lại.", error: true });
    } finally {
      if (mounted.current && version === selection.current) setStatus("idle");
    }
  }

  async function save(image: HTMLImageElement, zoom: number, position: AvatarCropPosition) {
    if (submitting.current || pending.current) return;
    submitting.current = true;
    const version = ++operation.current;
    setStatus("uploading");
    setNotice({ message: "Đang tải ảnh lên…", error: false });
    try {
      const key = `${zoom}:${position.x}:${position.y}`;
      let media = uploaded.current?.key === key ? uploaded.current.media : null;
      if (!media) {
        media = await uploadCloudinaryMedia(await exportAvatarCrop(image, zoom, position));
        if (!mounted.current || version !== operation.current) return;
        uploaded.current = { key, media };
      }
      if (!mounted.current || version !== operation.current) return;
      // Set correlation before the request: moderation can finish before HTTP resolves.
      pending.current = media.publicId;
      await profileApi.uploadAvatar(userId, media.secureUrl);
      if (!mounted.current || version !== operation.current || pending.current !== media.publicId) return;
      setStatus("pending");
      setNotice({ message: "Ảnh đang được kiểm duyệt. Ảnh đại diện sẽ cập nhật khi được chấp nhận.", error: false });
    } catch (error) {
      if (!mounted.current || version !== operation.current) return;
      pending.current = null;
      setStatus("idle");
      setNotice({ message: error instanceof Error ? error.message : "Không thể tải ảnh lên. Vui lòng thử lại.", error: true });
    } finally {
      if (version === operation.current) submitting.current = false;
    }
  }

  const busy = status === "uploading" || status === "pending";
  return <div className="profile-avatar-uploader">
    <div className="profile-avatar-frame"><Avatar src={avatarUrl} name={username} alt={username} />
      <button type="button" className="profile-avatar-add" aria-label="Đổi ảnh đại diện" title="Đổi ảnh đại diện" disabled={status !== "idle"} onClick={() => inputRef.current?.click()}><Plus size={20} /></button>
    </div>
    <input ref={inputRef} type="file" accept="image/*" aria-label="Chọn ảnh đại diện" hidden onChange={(event) => void selectFile(event)} />
    {!file && notice.message && <p className="avatar-upload-message" role={notice.error ? "alert" : "status"}>{notice.message}</p>}
    {file && <AvatarCropDialog key={`${file.name}:${file.lastModified}`} file={file} busy={busy} uploading={status === "uploading"}
      message={notice.message} error={notice.error} onSave={save} onClose={() => {
        if (status === "uploading") return;
        setFile(null);
        if (status !== "pending") { uploaded.current = null; setNotice({ message: "", error: false }); }
      }} />}
  </div>;
}
