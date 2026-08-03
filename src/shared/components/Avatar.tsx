import { useEffect, useState, type ImgHTMLAttributes } from "react";

type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "name"> & {
  src?: string | null;
  name?: string | null;
  fallbackSrc?: string;
  fallbackClassName?: string;
};

export function avatarInitials(label?: string | null): string {
  const normalized = (label ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, (value) => value === "Đ" ? "D" : "d")
    .replace(/[^\p{L}\p{N}]/gu, "");
  return normalized.slice(0, 2).toUpperCase() || "U";
}

export function Avatar({
  src,
  name,
  fallbackSrc: _fallbackSrc,
  alt = "",
  className,
  fallbackClassName,
  style,
  onError,
  ...props
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const label = name || alt;

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <span
        className={["avatar-fallback", fallbackClassName ?? className].filter(Boolean).join(" ")}
        style={style}
        role="img"
        aria-label={alt || label || "Avatar"}
      >
        {avatarInitials(label)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={(event) => {
        onError?.(event);
        setFailed(true);
      }}
      {...props}
    />
  );
}
