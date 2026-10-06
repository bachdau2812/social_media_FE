import { describe, expect, it } from "vitest";

import * as domain from "./chatReactions";
import type { ReactionSnapshot, ReactionState, ReactionType } from "./chatReactions";

const snapshot = (version = 1, myReaction: ReactionType | null = "HEART"): ReactionSnapshot => ({
  messageId: "m", messageSeq: 2, reactionVersion: version, myReaction,
  likeCount: 1, isReact: myReaction === "HEART", reactions: [{ type: "HEART", count: 1 }],
});
const event = (version: number, actorId: string, reaction: ReactionType | null): ReactionState => ({
  messageId: "m", messageSeq: 2, reactionVersion: version, actorId, reaction,
  likeCount: 2, reactions: [{ type: "HEART", count: 2 }],
});

describe("chat reaction domain", () => {
  it("defines exactly the six selected reactions", () => {
    expect(domain.REACTIONS.map((item: { type: string }) => item.type)).toEqual(["HEART", "LIKE", "HAHA", "WOW", "SAD", "ANGRY"]);
  });

  it("keeps viewer reaction separate from another actor's update", () => {
    const initial = domain.reactionSnapshot(snapshot());
    const next = domain.applyReactionEvent(initial, event(2, "other", "HEART"), "me");
    expect(next.myReaction).toBe("HEART");
    expect(next.likeCount).toBe(2);
  });

  it("accepts an older own event after a newer aggregate event", () => {
    let state = domain.reactionSnapshot(snapshot(0, null));
    state = domain.applyReactionEvent(state, event(3, "other", "HEART"), "me");
    state = domain.applyReactionEvent(state, event(2, "me", "HAHA"), "me");
    expect(state.reactionVersion).toBe(3);
    expect(state.myReaction).toBe("HAHA");
    expect(state.myReactionVersion).toBe(2);
    expect(state.isReact).toBe(false);
  });

  it("does not resurrect an own reaction from an old event or history snapshot", () => {
    let state = domain.reactionSnapshot(snapshot());
    state = domain.applyReactionEvent(state, event(4, "me", null), "me");
    state = domain.applyReactionEvent(state, event(3, "me", "HAHA"), "me");
    state = domain.applyReactionSnapshot(state, snapshot(2, "HEART"));
    expect(state.myReaction).toBe(null);
    expect(state.reactionVersion).toBe(4);
  });

  it("repeated events leave the aggregate unchanged", () => {
    const initial = domain.reactionSnapshot(snapshot());
    const next = domain.applyReactionEvent(initial, event(2, "other", "HEART"), "me");
    expect(domain.applyReactionEvent(next, event(2, "other", "HEART"), "me")).toEqual(next);
  });

  it("projects an optimistic replacement without altering the confirmed snapshot", () => {
    const initial = domain.reactionSnapshot(snapshot());
    const projected = domain.projectReaction(initial, "HAHA");
    expect(projected.myReaction).toBe("HAHA");
    expect(projected.isReact).toBe(false);
    expect(projected.likeCount).toBe(0);
    expect(projected.reactions).toEqual([{ type: "HAHA", count: 1 }]);
    expect(initial.myReaction).toBe("HEART");
  });
});
