import { apiSend } from "../../../shared/api";
import { apiGet, type ApiRequestOptions } from "../../../shared/api";
import type { RegistrationRequest } from "../model/auth.types";

export type AuthSessionResponse = { userId: string; username: string; message?: string };

export function loginWithCredentials(username: string, password: string) {
  return apiSend<AuthSessionResponse>("/auth/login", "POST", {
    username,
    password,
    deviceInfo: "social-media-fe",
  });
}

export function getAuthSession(options?: ApiRequestOptions) {
  return apiGet<AuthSessionResponse>("/auth/session", options);
}

export function logoutAuthSession() {
  return apiSend<string>("/auth/logout", "POST");
}

export function preRegister(request: RegistrationRequest) {
  return apiSend<string>("/auth/user-credentials/pre-register", "POST", request);
}

export function verifyRegistration(email: string, code: string) {
  return apiSend<string>(
    "/auth/user-credentials/email-verify-and-create-user",
    "POST",
    { email, code },
  );
}

export function requestPasswordReset(email: string) {
  return apiSend<string>(
    "/auth/user-credentials/check-and-send-code-for-forget-password",
    "POST",
    { email },
  );
}

export function verifyPasswordReset(email: string, code: string) {
  return apiSend<string>(
    "/auth/user-credentials/verify-and-send-new-password-to-user",
    "POST",
    { email, code },
  );
}
