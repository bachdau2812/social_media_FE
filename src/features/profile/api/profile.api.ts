import { apiGet, apiSend } from "../../../shared/api";
import type { ProfileDto } from "../model/profile.dto";

export type ConnectionTab = "FOLLOWERS" | "FOLLOWING" | "FRIENDS";
export type ConnectionUserDto = { id: string; userId: string; username: string; displayName: string; avatarUrl?: string | null; mutualContext?: string | null; relationshipAction: string; viewerFollowsUser: boolean; userFollowsViewer: boolean; friend: boolean; followedAt?: string | null };
export type ConnectionsDto = { profileUserId: string; tab: ConnectionTab; users: ConnectionUserDto[]; totalCount: number; currentPage: number; pageSize: number; hasNextPage: boolean; hasPreviousPage: boolean };
export type UserDiscoveryDto = { userId: string; username: string; fullName?: string | null; avatarUrl?: string | null; viewerFollowsUser: boolean; userFollowsViewer: boolean; friend: boolean; relationship?: string | null };
export type Page<T> = { content: T[]; pageNumber: number; totalElements: number; totalPages: number };
export type ProfileRecordKind = "JOB" | "UNIVERSITY" | "HIGH_SCHOOL" | "SOCIAL";

export interface ProfileConnectionsQuery {
  profileId: string;
  viewerId: string;
  tab: ConnectionTab;
  query: string;
  sort: "RECENT" | "NAME";
  page?: number;
  size?: number;
}

export const profileApi = {
  uploadAvatar(userId: string, avatarUrl: string) {
    return apiSend<{ userId: string; status: "PENDING_SCAN" }>("/profile-media/avatar", "POST", { userId, avatarUrl });
  },
  getSummary(userId: string, viewerId: string, postLimit = 18, signal?: AbortSignal) {
    return apiGet<ProfileDto>(`/profiles/${encodeURIComponent(userId)}/summary?viewerId=${encodeURIComponent(viewerId)}&postLimit=${postLimit}`, { signal });
  },
  getConnections({ profileId, viewerId, tab, query, sort, page = 0, size = 40 }: ProfileConnectionsQuery) {
    return apiGet<ConnectionsDto>(`/profiles/${encodeURIComponent(profileId)}/connections?viewerId=${encodeURIComponent(viewerId)}&tab=${tab}&query=${encodeURIComponent(query)}&sort=${sort}&page=${page}&size=${size}`);
  },
  getSimilarUsers(profileId: string, viewerId: string, signal: AbortSignal) {
    return apiGet<Page<UserDiscoveryDto>>(`/search/users/${encodeURIComponent(profileId)}/similar?viewerId=${encodeURIComponent(viewerId)}&page=0&size=20`, { signal });
  },
  follow(followerId: string, followingId: string) {
    return apiSend("/user-followers/follow", "POST", { followerId, followingId });
  },
  unfollow(followerId: string, followingId: string) {
    return apiSend(`/user-followers/unfollow?followerId=${encodeURIComponent(followerId)}&followingId=${encodeURIComponent(followingId)}`, "DELETE");
  },
  saveJob(payload: Record<string, unknown>, method: "POST" | "PUT") {
    return apiSend("/user-jobs", method, payload);
  },
  saveUniversity(payload: Record<string, unknown>, method: "POST" | "PUT") {
    return apiSend("/user-universities", method, payload);
  },
  saveHighSchool(payload: Record<string, unknown>, method: "POST" | "PUT") {
    return apiSend("/user-high-schools", method, payload);
  },
  saveSocialLink(payload: Record<string, unknown>, method: "POST" | "PUT") {
    return apiSend("/user-social-media", method, payload);
  },
  removeRecord(kind: ProfileRecordKind, id: string) {
    const route = kind === "JOB" ? "user-jobs" : kind === "UNIVERSITY" ? "user-universities" : kind === "HIGH_SCHOOL" ? "user-high-schools" : "user-social-media";
    return apiSend(`/${route}/${encodeURIComponent(id)}`, "DELETE");
  },
  setRecordVisibility(kind: Exclude<ProfileRecordKind, "SOCIAL">, id: string, isPublic: boolean) {
    const route = kind === "JOB" ? "user-jobs" : kind === "UNIVERSITY" ? "user-universities" : "user-high-schools";
    return apiSend(`/${route}`, "PUT", { id, isPublic });
  },
  updateBasicDetails(payload: Record<string, unknown>) {
    return apiSend("/user-details/update", "PUT", payload);
  },
};
