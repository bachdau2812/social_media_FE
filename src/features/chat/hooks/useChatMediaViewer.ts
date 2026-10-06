import { useCallback, useEffect, useState } from "react";
import type { ChatViewerItem } from "../components/ChatMediaExperience";
import type { ChatMessage } from "../model/chat.types";
import type { useChatController } from "./useChatController";

type Viewer = { userId: string; conversationId: string; items: ChatViewerItem[]; index: number; source?: ChatMessage };

/** Both surfaces discard private viewer state when its account, membership or source changes. */
export function useChatMediaViewer(userId: string, controller: ReturnType<typeof useChatController>) {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const unavailable = Boolean(viewer && (viewer.userId !== userId || !controller.active
    || viewer.conversationId !== controller.activeId
    || viewer.source && (controller.isMessageDeleted?.(viewer.conversationId, viewer.source.id)
      || controller.projectMessage?.(viewer.source).deleted)));
  useEffect(() => { if (unavailable) setViewer(null); }, [unavailable]);
  const closeViewer = useCallback(() => setViewer(null), []);
  function openViewer(items: ChatViewerItem[], index: number, messageId?: string) {
    if (!controller.activeId) return;
    const message = controller.activeMessages?.find((item) => item.id === messageId);
    // Retain identity/sequence only; an old history page can disappear during catch-up.
    const source: ChatMessage | undefined = messageId ? { id: messageId, conversationId: controller.activeId,
      messageSeq: message?.messageSeq ?? 0, senderId: "", messageType: "IMAGE" } : undefined;
    setViewer({ userId, conversationId: controller.activeId, items, index, source });
  }
  return { viewer: unavailable ? null : viewer, openViewer, closeViewer };
}
