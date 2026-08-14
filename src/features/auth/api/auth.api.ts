import { apiSend } from "../../../shared/api";
import type { RegistrationRequest } from "../model/auth.types";

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
