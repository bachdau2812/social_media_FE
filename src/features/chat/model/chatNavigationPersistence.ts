import type { ChatNavigationTarget } from "./chat.types";

const FULL_CHAT_TARGET_STORAGE_KEY = "social-media-full-chat-target";

function validPanel(value: unknown): ChatNavigationTarget["panel"] | undefined {
  return value === "details" || value === "requests" ? value : undefined;
}

export function readStoredFullChatTarget(): ChatNavigationTarget | null {
  try {
    const raw = sessionStorage.getItem(FULL_CHAT_TARGET_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (typeof parsed.conversationId !== "string" || !parsed.conversationId.trim()) return null;
    const target: ChatNavigationTarget = { conversationId: parsed.conversationId };
    if (typeof parsed.messageId === "string" && parsed.messageId.trim()) target.messageId = parsed.messageId;
    if (typeof parsed.messageSeq === "number" && Number.isFinite(parsed.messageSeq)) target.messageSeq = parsed.messageSeq;
    const panel = validPanel(parsed.panel);
    if (panel) target.panel = panel;
    return target;
  } catch {
    return null;
  }
}

export function writeStoredFullChatTarget(target: ChatNavigationTarget): void {
  try {
    sessionStorage.setItem(FULL_CHAT_TARGET_STORAGE_KEY, JSON.stringify(target));
  } catch {
    /* Storage can be unavailable in privacy mode. */
  }
}

export function clearStoredFullChatTarget(): void {
  try {
    sessionStorage.removeItem(FULL_CHAT_TARGET_STORAGE_KEY);
  } catch {
    /* Storage can be unavailable in privacy mode. */
  }
}
