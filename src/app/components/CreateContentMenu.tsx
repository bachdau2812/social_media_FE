import { FileVideo2, PlusSquare, X } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./CreateContentMenu.module.css";

export interface CreateContentMenuProps {
  open: boolean;
  onClose: () => void;
  onCreatePost: () => void;
  reelsAvailable?: boolean;
  onCreateReels?: () => void;
}

export function CreateContentMenu({
  open,
  onClose,
  onCreatePost,
  reelsAvailable = false,
  onCreateReels,
}: CreateContentMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
    });
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      data-testid="create-content-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={styles.menu}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Create content"
      >
        <header>
          <strong>Create</strong>
          <button type="button" aria-label="Close create menu" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <div className={styles.options}>
          <button
            type="button"
            aria-label="Create post"
            onClick={() => {
              onCreatePost();
              onClose();
            }}
          >
            <span className={styles.icon}>
              <PlusSquare size={20} aria-hidden="true" />
            </span>
            <span>
              <strong>Post</strong>
              <small>Share photos, video or text</small>
            </span>
          </button>
          <button
            type="button"
            aria-label="Create reels"
            disabled={!reelsAvailable || !onCreateReels}
            onClick={() => {
              onCreateReels?.();
              onClose();
            }}
          >
            <span className={styles.icon}>
              <FileVideo2 size={20} aria-hidden="true" />
            </span>
            <span>
              <strong>Reels</strong>
              <small>{reelsAvailable ? "Create a short video" : "Unavailable"}</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

