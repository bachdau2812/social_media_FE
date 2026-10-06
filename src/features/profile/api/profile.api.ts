import { apiGet, apiSend } from "../../../shared/api";
import type { ProfileDto } from "../model/profile.dto";

export const profileApi = {
  uploadAvatar(userId: string, avatarUrl: string) {
    return apiSend<{ userId: string; status: "PENDING_SCAN" }>("/profile-media/avatar", "POST", { userId, avatarUrl });
  },
  getSummary(userId: string, viewerId: string, postLimit = 18) {
    return apiGet<ProfileDto>(`/profiles/${encodeURIComponent(userId)}/summary?viewerId=${encodeURIComponent(viewerId)}&postLimit=${postLimit}`);
  },
};
