import type { ConnectionTab, ConnectionUserDto } from "../api/profile.api";
import type { Profile } from "./profile.types";

export function applyConnectionRemoval(profile: Profile | null, tab: ConnectionTab, row: ConnectionUserDto): Profile | null {
  if (!profile) return profile;
  return {
    ...profile,
    followerCount: tab === "FOLLOWERS" ? Math.max(0, profile.followerCount - 1) : profile.followerCount,
    followingCount: tab === "FOLLOWING" ? Math.max(0, profile.followingCount - 1) : profile.followingCount,
    friendCount: row.friend ? Math.max(0, (profile.friendCount ?? 0) - 1) : profile.friendCount,
  };
}
