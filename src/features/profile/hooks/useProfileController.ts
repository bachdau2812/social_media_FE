import { useCallback, useEffect, useRef } from "react";
import { profileApi } from "../api/profile.api";
import { profileToView } from "../model/profile.mapper";

export function useProfileController(viewerId?: string | null) {
  const requestRef = useRef<AbortController | null>(null);

  const loadSummary = useCallback(async (profileId: string, viewerId: string) => {
    requestRef.current?.abort();
    const request = new AbortController();
    requestRef.current = request;
    try {
      const data = await profileApi.getSummary(profileId, viewerId, 18, request.signal);
      return profileToView(data);
    } finally {
      if (requestRef.current === request) requestRef.current = null;
    }
  }, []);

  useEffect(() => {
    requestRef.current?.abort();
    requestRef.current = null;
  }, [viewerId]);

  useEffect(() => () => {
    requestRef.current?.abort();
    requestRef.current = null;
  }, []);

  return { loadSummary };
}
