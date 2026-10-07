import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "../../../shared/api";
import {
  getAuthSession,
  loginWithCredentials,
  logoutAuthSession,
  type AuthSessionResponse,
} from "../api/auth.api";

export type AuthSessionStatus = "loading" | "authenticated" | "anonymous" | "error";
export type AuthSessionFlow = {
  session: AuthSessionResponse | null;
  status: AuthSessionStatus;
  error: string;
  recoverableError: boolean;
  login: (username: string, password: string) => Promise<AuthSessionResponse>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<AuthSessionResponse | null>;
};

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "Không thể khôi phục phiên đăng nhập.";
}

export function useAuthSession(): AuthSessionFlow {
  const [session, setSession] = useState<AuthSessionResponse | null>(null);
  const [status, setStatus] = useState<AuthSessionStatus>("loading");
  const [error, setError] = useState("");
  const [recoverableError, setRecoverableError] = useState(false);
  const sessionRef = useRef<AuthSessionResponse | null>(null);
  const requestVersion = useRef(0);
  const mounted = useRef(false);

  const commitSession = useCallback((next: AuthSessionResponse | null) => {
    sessionRef.current = next;
    setSession(next);
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      requestVersion.current += 1;
    };
  }, []);

  const restoreSession = useCallback(async () => {
    const version = ++requestVersion.current;
    setStatus("loading");
    setError("");
    setRecoverableError(false);
    try {
      const restored = await getAuthSession();
      if (mounted.current && requestVersion.current === version) {
        commitSession(restored);
        setStatus("authenticated");
      }
      return requestVersion.current === version ? restored : sessionRef.current;
    } catch (cause) {
      if (mounted.current && requestVersion.current === version) {
        if (cause instanceof ApiError && cause.status === 401) {
          commitSession(null);
          setError("");
          setRecoverableError(false);
          setStatus("anonymous");
        } else {
          setError(messageFor(cause));
          setRecoverableError(cause instanceof ApiError
            && (cause.category === "network" || cause.category === "server"));
          setStatus("error");
        }
      }
      return requestVersion.current === version ? null : sessionRef.current;
    }
  }, [commitSession]);

  const login = useCallback(async (username: string, password: string) => {
    const version = ++requestVersion.current;
    setError("");
    setRecoverableError(false);
    try {
      const authenticated = await loginWithCredentials(username, password);
      if (mounted.current && requestVersion.current === version) {
        commitSession(authenticated);
        setStatus("authenticated");
      }
      return authenticated;
    } catch (cause) {
      if (mounted.current && requestVersion.current === version) {
        setError(messageFor(cause));
        setRecoverableError(cause instanceof ApiError
          && (cause.category === "network" || cause.category === "server"));
        setStatus("error");
      }
      throw cause;
    }
  }, [commitSession]);

  const logout = useCallback(async () => {
    const version = ++requestVersion.current;
    await logoutAuthSession().catch(() => undefined);
    if (mounted.current && requestVersion.current === version) {
      commitSession(null);
      setStatus("anonymous");
      setError("");
      setRecoverableError(false);
    }
  }, [commitSession]);

  return { session, status, error, recoverableError, login, logout, restoreSession };
}
