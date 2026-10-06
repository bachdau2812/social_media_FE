export const REACTIONS = [
  { type: "HEART", emoji: "❤️", label: "Yêu thích" },
  { type: "LIKE", emoji: "👍", label: "Thích" },
  { type: "HAHA", emoji: "😂", label: "Haha" },
  { type: "WOW", emoji: "😮", label: "Wow" },
  { type: "SAD", emoji: "😢", label: "Buồn" },
  { type: "ANGRY", emoji: "😡", label: "Phẫn nộ" },
] as const;

export type ReactionType = typeof REACTIONS[number]["type"];
export type ReactionCount = { type: ReactionType; count: number };
export type ReactionState = {
  messageId: string; messageSeq: number; reactionVersion: number;
  actorId: string; reaction: ReactionType | null; likeCount: number; reactions: ReactionCount[];
};
export type ReactionSnapshot = Omit<ReactionState, "actorId" | "reaction"> & {
  myReaction: ReactionType | null; isReact: boolean;
};
export type MessageReactionFields = {
  reactionVersion?: number; myReaction?: ReactionType | null;
  likeCount?: number; isReact?: boolean; reactions?: ReactionCount[];
};
export type ReactionView = Required<MessageReactionFields> & { myReactionVersion: number };

export function reactionSnapshot(snapshot: MessageReactionFields): ReactionView {
  const myReaction = snapshot.myReaction ?? (snapshot.isReact ? "HEART" : null);
  return {
    reactionVersion: snapshot.reactionVersion ?? 0,
    myReactionVersion: snapshot.reactionVersion ?? 0,
    myReaction, isReact: myReaction === "HEART", likeCount: snapshot.likeCount ?? 0,
    reactions: snapshot.reactions ?? [],
  };
}

export function applyReactionSnapshot(current: ReactionView, snapshot: MessageReactionFields): ReactionView {
  const incoming = reactionSnapshot(snapshot);
  return {
    ...current,
    ...(incoming.reactionVersion >= current.reactionVersion ? {
      reactionVersion: incoming.reactionVersion, reactions: incoming.reactions, likeCount: incoming.likeCount,
    } : {}),
    ...(incoming.myReactionVersion >= current.myReactionVersion ? {
      myReactionVersion: incoming.myReactionVersion, myReaction: incoming.myReaction, isReact: incoming.isReact,
    } : {}),
  };
}

export function applyReactionEvent(current: ReactionView, event: ReactionState, viewerId: string): ReactionView {
  return {
    ...current,
    ...(event.reactionVersion >= current.reactionVersion ? {
      reactionVersion: event.reactionVersion, reactions: event.reactions, likeCount: event.likeCount,
    } : {}),
    ...(event.actorId === viewerId && event.reactionVersion >= current.myReactionVersion ? {
      myReactionVersion: event.reactionVersion, myReaction: event.reaction, isReact: event.reaction === "HEART",
    } : {}),
  };
}

/** The pending overlay is derived; rollback never restores an old server snapshot. */
export function projectReaction(current: ReactionView, desired: ReactionType | null): ReactionView {
  const counts = new Map(current.reactions.map((entry) => [entry.type, entry.count]));
  if (current.myReaction) counts.set(current.myReaction, Math.max(0, (counts.get(current.myReaction) ?? 0) - 1));
  if (desired) counts.set(desired, (counts.get(desired) ?? 0) + 1);
  const reactions = REACTIONS.map(({ type }) => ({ type, count: counts.get(type) ?? 0 })).filter(({ count }) => count > 0);
  return { ...current, myReaction: desired, isReact: desired === "HEART", likeCount: counts.get("HEART") ?? 0, reactions };
}
