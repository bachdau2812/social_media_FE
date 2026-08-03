import { apiGet } from "../../../shared/api";
import type { ProfileDto } from "../model/profile.dto";

export const profileApi = {
  getSummary(userId: string, viewerId: string, postLimit = 18) {
    return apiGet<ProfileDto>(`/profiles/${encodeURIComponent(userId)}/summary?viewerId=${encodeURIComponent(viewerId)}&postLimit=${postLimit}`);
  },
};
