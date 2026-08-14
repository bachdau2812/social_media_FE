import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiSend } from "../../../shared/api";
import type { RegistrationRequest } from "../model/auth.types";
import {
  preRegister,
  requestPasswordReset,
  verifyPasswordReset,
  verifyRegistration,
} from "./auth.api";

vi.mock("../../../shared/api", () => ({
  apiSend: vi.fn(),
}));

const request: RegistrationRequest = {
  fullName: "An Nguyen",
  username: "annguyen",
  password: "Secret123!",
  email: "an@example.com",
  phoneNumber: null,
  dob: null,
  sex: "OTHER",
  livingIn: "Da Nang",
  hometown: "Hue",
  hobbyList: ["music"],
  role: "USER",
};

describe("auth API contract", () => {
  beforeEach(() => {
    vi.mocked(apiSend).mockResolvedValue("ok");
  });

  it("keeps the existing pre-register request", async () => {
    await preRegister(request);
    expect(apiSend).toHaveBeenCalledWith(
      "/auth/user-credentials/pre-register",
      "POST",
      request,
    );
  });

  it("keeps the existing registration verification request", async () => {
    await verifyRegistration("an@example.com", "AB12CD34");
    expect(apiSend).toHaveBeenCalledWith(
      "/auth/user-credentials/email-verify-and-create-user",
      "POST",
      { email: "an@example.com", code: "AB12CD34" },
    );
  });

  it("keeps the existing forgot-password email request", async () => {
    await requestPasswordReset("an@example.com");
    expect(apiSend).toHaveBeenCalledWith(
      "/auth/user-credentials/check-and-send-code-for-forget-password",
      "POST",
      { email: "an@example.com" },
    );
  });

  it("keeps the backend-generated password verification request", async () => {
    await verifyPasswordReset("an@example.com", "AB12CD34EF");
    expect(apiSend).toHaveBeenCalledWith(
      "/auth/user-credentials/verify-and-send-new-password-to-user",
      "POST",
      { email: "an@example.com", code: "AB12CD34EF" },
    );
  });
});
