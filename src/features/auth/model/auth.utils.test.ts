import { describe, expect, it } from "vitest";
import { ApiError } from "../../../shared/api";
import type { RegistrationForm } from "./auth.types";
import { mapAuthError, maskEmail, passwordStrength, registrationPayload } from "./auth.utils";

const form: RegistrationForm = {
  fullName: "  An Nguyen ",
  email: " an@example.com ",
  phoneNumber: " ",
  username: " annguyen ",
  password: "Secret123!",
  confirmPassword: "Secret123!",
  dob: "",
  sex: "OTHER",
  livingIn: " Da Nang ",
  hometown: " Hue ",
  hobbyList: "music, , travel",
  role: "USER",
};

describe("auth utilities", () => {
  it("maps the registration form to the existing backend contract", () => {
    expect(registrationPayload(form)).toEqual({
      fullName: "An Nguyen",
      email: "an@example.com",
      phoneNumber: null,
      username: "annguyen",
      password: "Secret123!",
      dob: null,
      sex: "OTHER",
      livingIn: "Da Nang",
      hometown: "Hue",
      hobbyList: ["music", "travel"],
      role: "USER",
    });
  });

  it("masks an email without losing its destination domain", () => {
    expect(maskEmail("bach@example.com")).toBe("b***@example.com");
    expect(maskEmail("a@example.com")).toBe("a***@example.com");
  });

  it("calculates the four visible password requirements", () => {
    expect(passwordStrength("Secret123!")).toEqual({
      score: 4,
      label: "strong",
      requirements: {
        minimumLength: true,
        mixedCase: true,
        number: true,
        special: true,
      },
    });
  });

  it("never exposes raw errors and returns contextual Vietnamese copy", () => {
    expect(mapAuthError(new Error("database password leaked"), "otp", "vi"))
      .toBe("Mã xác minh không đúng hoặc đã hết hạn.");
    expect(mapAuthError(new ApiError("POST", "/auth/login", 0), "login", "vi"))
      .toBe("Không thể kết nối. Vui lòng thử lại.");
  });
});
