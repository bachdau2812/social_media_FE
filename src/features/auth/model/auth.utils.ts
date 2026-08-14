import type { AppLocale } from "../../../app/providers/LocaleProvider";
import { ApiError } from "../../../shared/api";
import type {
  PasswordStrengthResult,
  RegistrationForm,
  RegistrationRequest,
} from "./auth.types";

export type AuthErrorContext = "login" | "email" | "password" | "otp" | "network" | "generic";

export function registrationPayload(form: RegistrationForm): RegistrationRequest {
  const optional = (value: string) => value.trim() || null;
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    phoneNumber: optional(form.phoneNumber),
    username: form.username.trim(),
    password: form.password,
    dob: optional(form.dob),
    sex: optional(form.sex),
    livingIn: optional(form.livingIn),
    hometown: optional(form.hometown),
    hobbyList: form.hobbyList.split(",").map((item) => item.trim()).filter(Boolean),
    role: form.role || "USER",
  };
}

export function maskEmail(email: string): string {
  const [local = "", domain = ""] = email.trim().split("@");
  if (!domain) return email.trim();
  return `${local.charAt(0) || "*"}***@${domain}`;
}

export function passwordStrength(value: string): PasswordStrengthResult {
  const requirements = {
    minimumLength: value.length >= 8,
    mixedCase: /[a-z]/.test(value) && /[A-Z]/.test(value),
    number: /\d/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
  };
  const score = Object.values(requirements).filter(Boolean).length;
  const label = score <= 1 ? "weak" : score === 2 ? "fair" : score === 3 ? "good" : "strong";
  return { score, label, requirements };
}

const errorCopy = {
  vi: {
    login: "Tên đăng nhập hoặc mật khẩu không đúng.",
    email: "Vui lòng nhập email hợp lệ.",
    password: "Mật khẩu chưa đáp ứng yêu cầu.",
    otp: "Mã xác minh không đúng hoặc đã hết hạn.",
    network: "Không thể kết nối. Vui lòng thử lại.",
    generic: "Không thể hoàn tất thao tác. Vui lòng thử lại.",
  },
  en: {
    login: "The username or password is incorrect.",
    email: "Please enter a valid email address.",
    password: "The password does not meet the requirements.",
    otp: "The verification code is incorrect or has expired.",
    network: "Unable to connect. Please try again.",
    generic: "Unable to complete this action. Please try again.",
  },
} satisfies Record<AppLocale, Record<AuthErrorContext, string>>;

export function mapAuthError(
  error: unknown,
  context: AuthErrorContext,
  locale: AppLocale,
): string {
  if (error instanceof ApiError && error.category === "network") {
    return errorCopy[locale].network;
  }
  return errorCopy[locale][context];
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
