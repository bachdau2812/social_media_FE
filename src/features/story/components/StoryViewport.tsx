import type { HTMLAttributes, ReactNode } from "react";

export function StoryViewport({ children, className = "", ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <section className={`story-viewport ${className}`.trim()} {...props}>{children}</section>;
}
