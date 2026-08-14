import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiGet, apiSend } from "../../shared/api";

export type AppSession = { userId: string; username: string; message?: string };
type AuthContextValue = {
  session: AppSession | null;
  status: "loading" | "authenticated" | "anonymous" | "error";
  error: string;
  login: (username: string, password: string) => Promise<AppSession>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<AppSession | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AppSession | null>(null);
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");
  const [error, setError] = useState("");

  async function restoreSession() {
    setStatus("loading");
    try {
      const restored = await apiGet<AppSession>("/auth/session");
      setSession(restored);
      setStatus("authenticated");
      return restored;
    } catch {
      setSession(null);
      setStatus("anonymous");
      return null;
    }
  }

  async function login(username: string, password: string) {
    setError("");
    try {
      const authenticated = await apiSend<AppSession>("/auth/login", "POST", {
        username,
        password,
        deviceInfo: "social-media-fe",
      });
      setSession(authenticated);
      setStatus("authenticated");
      return authenticated;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Login failed";
      setError(message);
      setStatus("error");
      throw cause;
    }
  }

  async function logout() {
    await apiSend<string>("/auth/logout", "POST").catch(() => undefined);
    setSession(null);
    setStatus("anonymous");
    setError("");
  }

  useEffect(() => {
    void restoreSession();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    status,
    error,
    login,
    logout,
    restoreSession,
  }), [session, status, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
