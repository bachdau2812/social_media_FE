export const OTP_LENGTHS = {
  registration: 8,
  passwordReset: 10,
} as const;

export type AuthStep =
  | "signin"
  | "register"
  | "verifyRegistration"
  | "forgotPassword"
  | "verifyReset"
  | "resetSuccess";

export type AuthAction =
  | "login"
  | "register"
  | "verifyRegistration"
  | "requestReset"
  | "verifyReset"
  | "resendRegistration"
  | "resendReset";

export type RegistrationForm = {
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
  dob: string;
  sex: string;
  livingIn: string;
  hometown: string;
  hobbyList: string;
  role: string;
};

export type RegistrationRequest = {
  fullName: string;
  email: string;
  phoneNumber: string | null;
  username: string;
  password: string;
  dob: string | null;
  sex: string | null;
  livingIn: string | null;
  hometown: string | null;
  hobbyList: string[];
  role: string;
};

export type PasswordStrengthResult = {
  score: number;
  label: "weak" | "fair" | "good" | "strong";
  requirements: {
    minimumLength: boolean;
    mixedCase: boolean;
    number: boolean;
    special: boolean;
  };
};
