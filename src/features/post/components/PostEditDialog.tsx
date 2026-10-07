import { ChevronDown, ChevronUp, ImagePlus, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import type { Post } from "../model/post.types";
import { POST_MEDIA_RATIOS, type PostMediaRatio } from "../model/postMediaRatio";
import { uploadCloudinaryMedia } from "../../../shared/api";
import { postApi } from "../api/post.api";
import { mergePostDetail } from "../model/post.mapper";
import { buildPostUpdateRequest, uploadEditedPostMedia, type EditablePostMedia } from "../editing/postEditing";
import "./post-edit-dialog.css";

export function PostEditDialog({ post, userId, onClose, onSaved }: {
  post: Post;
  userId: string;
  onClose: () => void;
  onSaved: (post: Post) => void;
}) {
  useBodyScrollLock(true);
  const [caption, setCaption] = useState(post.caption);
  const [hashtags, setHashtags] = useState((post.hashtags ?? []).join(" "));
  const [mediaRatio, setMediaRatio] = useState<PostMediaRatio>(post.mediaRatio);
  const [media, setMedia] = useState<EditablePostMedia[]>(post.media.map((item, index) => ({ ...item, originalIndex: index })));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const dirty = useMemo(() => JSON.stringify({ caption, hashtags, mediaRatio, media }) !== JSON.stringify({
    caption: post.caption,
    hashtags: (post.hashtags ?? []).join(" "),
    mediaRatio: post.mediaRatio,
    media: post.media.map((item, index) => ({ ...item, originalIndex: index })),
  }), [caption, hashtags, media, mediaRatio, post]);

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= media.length) return;
    setMedia((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function addMedia(files: FileList | null) {
    if (!files?.length) return;
    const additions = Array.from(files)
      .filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"))
      .map((file, index): EditablePostMedia => ({
        id: `new-${crypto.randomUUID()}`,
        orderNumber: media.length + index + 1,
        type: file.type.startsWith("video/") ? "VIDEO" : "IMAGE",
        url: URL.createObjectURL(file),
        aspectRatio: 1,
        alt: file.name,
        caption: null,
        music: null,
        originalIndex: media.length + index,
        file,
      }));
    setMedia((current) => [...current, ...additions]);
  }

  async function save() {
    if (!dirty || saving) return;
    setSaving(true);
    setError("");
    try {
      const uploadedMedia = await uploadEditedPostMedia(media, uploadCloudinaryMedia);
      const updated = await postApi.update(buildPostUpdateRequest({
        post,
        userId,
        caption,
        hashtags,
        mediaRatio,
        media: uploadedMedia,
      }));
      onSaved(mergePostDetail(post, updated));
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Không thể cập nhật bài viết");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="post-edit-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="post-edit-dialog" role="dialog" aria-modal="true" aria-labelledby="post-edit-title">
        <header><h2 id="post-edit-title">Chỉnh sửa bài viết</h2><button type="button" onClick={onClose} aria-label="Đóng"><X size={20} /></button></header>
        <div className="post-edit-body">
          <label>Nội dung<textarea value={caption} onChange={(event) => setCaption(event.target.value)} rows={5} /></label>
          <label>Hashtag<input value={hashtags} onChange={(event) => setHashtags(event.target.value)} placeholder="#travel #memory" /></label>
          {media.length ? <label>Tỷ lệ khung<select value={mediaRatio} onChange={(event) => setMediaRatio(event.target.value as PostMediaRatio)}>{POST_MEDIA_RATIOS.map((ratio) => <option key={ratio} value={ratio}>{ratio}</option>)}</select></label> : null}
          <label className="post-edit-add-media"><span><ImagePlus size={17} /> Thêm ảnh hoặc video</span><input type="file" accept="image/*,video/*" multiple onChange={(event) => { addMedia(event.target.files); event.target.value = ""; }} /></label>
          {media.length ? <div className="post-edit-media-list" aria-label="Media bài viết">
            {media.map((item, index) => <article key={item.id}>
              {item.type === "VIDEO" ? <video src={item.url} muted /> : <img src={item.url} alt={item.alt} />}
              <label>Caption media<textarea value={item.caption ?? ""} onChange={(event) => setMedia((current) => current.map((entry) => entry.id === item.id ? { ...entry, caption: event.target.value } : entry))} rows={2} /></label>
              <div><button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Đưa media lên"><ChevronUp size={17} /></button><button type="button" onClick={() => move(index, 1)} disabled={index === media.length - 1} aria-label="Đưa media xuống"><ChevronDown size={17} /></button><button type="button" className="danger" onClick={() => setMedia((current) => current.filter((entry) => entry.id !== item.id))} aria-label="Xóa media"><Trash2 size={17} /></button></div>
            </article>)}
          </div> : null}
          {error ? <p className="post-edit-error" role="alert">{error}</p> : null}
        </div>
        <footer><button type="button" onClick={onClose}>Hủy</button><button type="button" className="primary" onClick={() => void save()} disabled={!dirty || saving}><Save size={17} />{saving ? "Đang lưu" : "Lưu thay đổi"}</button></footer>
      </section>
    </div>
  );
}
