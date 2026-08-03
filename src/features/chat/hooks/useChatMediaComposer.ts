import { useEffect, useRef, useState } from "react";

export const CHAT_MEDIA_MAX_BYTES = 50 * 1024 * 1024;
export const CHAT_VOICE_MAX_DURATION_MS = 5 * 60 * 1000;
export const CHAT_IMAGE_MAX_COUNT = 10;

export type ChatAttachmentStatus = "ready" | "uploading" | "failed";

export type ChatImageDraft = {
  id: string;
  kind: "IMAGE";
  file: File;
  previewUrl: string;
  status: ChatAttachmentStatus;
  progress: number;
  error?: string;
};

export type ChatAudioDraft = {
  id: string;
  kind: "AUDIO";
  file: File;
  previewUrl: string;
  duration?: number;
};

export type ChatAttachmentDraft = ChatImageDraft | ChatAudioDraft;

function attachmentId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `media-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useChatMediaComposer() {
  const [images, setImages] = useState<ChatImageDraft[]>([]);
  const [audioAttachment, setAudioAttachment] = useState<ChatAudioDraft | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordingElapsed, setRecordingElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);
  const cancelledRef = useRef(false);
  const stopTimerRef = useRef<number | null>(null);
  const imageUrlsRef = useRef(new Set<string>());
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => {
      setRecordingElapsed(Math.min(Date.now() - startedAtRef.current, CHAT_VOICE_MAX_DURATION_MS));
    }, 250);
    return () => window.clearInterval(timer);
  }, [recording]);

  useEffect(() => () => {
    stopRecorder(true);
    imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
  }, []);

  function releaseStream() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (stopTimerRef.current !== null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  }

  function replaceAudio(next: ChatAudioDraft | null) {
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    audioUrlRef.current = next?.previewUrl ?? null;
    setAudioAttachment(next);
  }

  function selectImages(files: FileList | File[] | null) {
    setError(null);
    if (!files) return;
    const candidates = Array.from(files);
    if (!candidates.length) return;
    const available = Math.max(0, CHAT_IMAGE_MAX_COUNT - images.length);
    const accepted: ChatImageDraft[] = [];
    let validationError: string | null = null;
    candidates.slice(0, available).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        validationError = "Chỉ hỗ trợ tệp ảnh.";
        return;
      }
      if (file.size > CHAT_MEDIA_MAX_BYTES) {
        validationError = "Mỗi ảnh không được vượt quá 50 MB.";
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      imageUrlsRef.current.add(previewUrl);
      accepted.push({ id: attachmentId(), kind: "IMAGE", file, previewUrl, status: "ready", progress: 0 });
    });
    if (candidates.length > available) validationError = `Chỉ có thể chọn tối đa ${CHAT_IMAGE_MAX_COUNT} ảnh.`;
    if (validationError) setError(validationError);
    if (accepted.length) setImages((current) => [...current, ...accepted]);
  }

  function removeImage(id: string) {
    setImages((current) => {
      const target = current.find((image) => image.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        imageUrlsRef.current.delete(target.previewUrl);
      }
      return current.filter((image) => image.id !== id);
    });
  }

  function moveImage(sourceId: string, targetId: string) {
    if (sourceId === targetId) return;
    setImages((current) => {
      const sourceIndex = current.findIndex((item) => item.id === sourceId);
      const targetIndex = current.findIndex((item) => item.id === targetId);
      if (sourceIndex < 0 || targetIndex < 0) return current;
      const next = [...current];
      const [source] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, source);
      return next;
    });
  }

  function updateImageState(id: string, state: Partial<Pick<ChatImageDraft, "status" | "progress" | "error">>) {
    setImages((current) => current.map((image) => image.id === id ? { ...image, ...state } : image));
  }

  function clearImages() {
    setImages((current) => {
      current.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
        imageUrlsRef.current.delete(image.previewUrl);
      });
      return [];
    });
    setError(null);
  }

  async function startRecording() {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Trình duyệt không hỗ trợ ghi âm.");
      return;
    }
    stopRecorder(true);
    replaceAudio(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"]
        .find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = preferredType ? new MediaRecorder(stream, { mimeType: preferredType }) : new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      chunksRef.current = [];
      cancelledRef.current = false;
      startedAtRef.current = Date.now();
      setRecordingElapsed(0);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const duration = Math.min(Date.now() - startedAtRef.current, CHAT_VOICE_MAX_DURATION_MS);
        const cancelled = cancelledRef.current;
        const chunks = chunksRef.current;
        const mimeType = recorder.mimeType || "audio/webm";
        recorderRef.current = null;
        chunksRef.current = [];
        releaseStream();
        setRecording(false);
        if (cancelled || chunks.length === 0) return;
        const blob = new Blob(chunks, { type: mimeType });
        if (blob.size > CHAT_MEDIA_MAX_BYTES) {
          setError("Tin nhắn thoại không được vượt quá 50 MB.");
          return;
        }
        const extension = mimeType.includes("mp4") ? "m4a" : "webm";
        const file = new File([blob], `voice-${Date.now()}.${extension}`, { type: mimeType });
        const previewUrl = URL.createObjectURL(blob);
        replaceAudio({ id: attachmentId(), kind: "AUDIO", file, previewUrl, duration });
      };
      recorder.start(250);
      setRecording(true);
      stopTimerRef.current = window.setTimeout(() => stopRecorder(false), CHAT_VOICE_MAX_DURATION_MS);
    } catch {
      releaseStream();
      setError("Không thể truy cập microphone.");
    }
  }

  function stopRecorder(cancelled = false) {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      releaseStream();
      setRecording(false);
      return;
    }
    cancelledRef.current = cancelled;
    recorder.stop();
  }

  function clearAudio() {
    setError(null);
    if (recording) {
      stopRecorder(true);
      return;
    }
    replaceAudio(null);
  }

  function clearAll() {
    clearImages();
    clearAudio();
  }

  return {
    images,
    audioAttachment,
    recording,
    recordingElapsed,
    error,
    selectImages,
    removeImage,
    moveImage,
    updateImageState,
    clearImages,
    startRecording,
    stopRecording: () => stopRecorder(false),
    cancelRecording: () => stopRecorder(true),
    clearAudio,
    clearAll,
    clearError: () => setError(null),
  };
}

export function formatVoiceDuration(value: number) {
  const totalSeconds = Math.max(0, Math.floor(value / 1000));
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
