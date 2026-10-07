import { describe, expect, it } from "vitest";
import type { Profile } from "./profile.types";
import { applyConnectionRemoval } from "./profileConnections";

const profile = { followerCount: 1, followingCount: 2, friendCount: 1 } as Profile;
const row = { friend: true } as any;

describe("applyConnectionRemoval", () => {
  it("decrements the active connection count and friend count without going below zero", () => {
    expect(applyConnectionRemoval(profile, "FOLLOWERS", row)).toMatchObject({ followerCount: 0, followingCount: 2, friendCount: 0 });
    expect(applyConnectionRemoval(profile, "FOLLOWING", { friend: false } as any)).toMatchObject({ followerCount: 1, followingCount: 1, friendCount: 1 });
    expect(applyConnectionRemoval({ ...profile, friendCount: 0 }, "FRIENDS", row)).toMatchObject({ friendCount: 0 });
  });

  it("preserves a missing profile", () => {
    expect(applyConnectionRemoval(null, "FOLLOWERS", row)).toBeNull();
  });
});
