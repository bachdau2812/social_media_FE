import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { AuthSessionResponse } from "../../features/auth/api/auth.api";
import { useAuthSession, type AuthSessionFlow } from "../../features/auth/flows/useAuthSession";

export type AppSession = AuthSessionResponse;
type AuthContextValue = AuthSessionFlow;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authSession = useAuthSession();
  const { restoreSession } = authSession;

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  return <AuthContext.Provider value={authSession}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
