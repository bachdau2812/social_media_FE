import { apiGet, apiSend } from "../../../shared/api";
import type { UserSettings } from "../model/settings.types";

export const settingsApi = {
  get(userId: string) {
    return apiGet<UserSettings>(`/me/${encodeURIComponent(userId)}/settings`);
  },
  update(userId: string, settings: UserSettings) {
    return apiSend<UserSettings>(`/me/${encodeURIComponent(userId)}/settings`, "PATCH", settings);
  },
};
