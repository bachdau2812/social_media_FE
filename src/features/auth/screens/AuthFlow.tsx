import { type FormEvent, useEffect, useState } from "react";
import { useLocale } from "../../../app/providers/LocaleProvider";
import {
  preRegister,
  requestPasswordReset,
  verifyPasswordReset,
  verifyRegistration,
} from "../api/auth.api";
import { AuthLayout } from "../components/AuthLayout";
import { compactOTP } from "../components/OTPInput";
import { authCopy } from "../model/auth.copy";
import { OTP_LENGTHS, type AuthAction, type AuthStep, type RegistrationForm } from "../model/auth.types";
import {
  isValidEmail,
  mapAuthError,
  passwordStrength,
  registrationPayload,
} from "../model/auth.utils";
import { ForgotPasswordScreen } from "./ForgotPasswordScreen";
import { RegisterScreen } from "./RegisterScreen";
import { ResetPasswordSuccessScreen } from "./ResetPasswordSuccessScreen";
import { SignInScreen } from "./SignInScreen";
import { VerifyRegistrationScreen } from "./VerifyRegistrationScreen";
import { VerifyResetCodeScreen } from "./VerifyResetCodeScreen";

const RESEND_DELAY_MS = 60_000;

const initialRegistration: RegistrationForm = {
  fullName: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
  confirmPassword: "",
  dob: "",
  sex: "OTHER",
  livingIn: "",
  hometown: "",
  hobbyList: "",
  role: "USER",
};

type FieldErrors = Partial<Record<keyof RegistrationForm, string>>;

export function AuthFlow({
  errorText,
  loading,
  onLogin,
}: {
  errorText: string;
  loading: boolean;
  onLogin: (username: string, password: string) => Promise<void>;
}) {
  const { locale, setLocale } = useLocale();
  const copy = authCopy(locale);
  const [step, setStep] = useState<AuthStep>("signin");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registration, setRegistration] = useState(initialRegistration);
  const [forgotEmail, setForgotEmail] = useState("");
  const [code, setCode] = useState("");
  const [busyAction, setBusyAction] = useState<AuthAction | null>(null);
  const [resendDeadline, setResendDeadline] = useState<number | null>(null);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [forgotEmailError, setForgotEmailError] = useState("");
  const [externalErrorDismissed, setExternalErrorDismissed] = useState(false);

  useEffect(() => {
    setExternalErrorDismissed(false);
  }, [errorText]);

  useEffect(() => {
    if (resendDeadline === null) return;
    const updateRemaining = () => {
      const remaining = Math.max(0, Math.ceil((resendDeadline - Date.now()) / 1000));
      setResendSeconds(remaining);
      if (remaining === 0) setResendDeadline(null);
    };
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 250);
    return () => window.clearInterval(timer);
  }, [resendDeadline]);

  function startResendCountdown() {
    setResendDeadline(Date.now() + RESEND_DELAY_MS);
    setResendSeconds(60);
  }

  function moveTo(next: AuthStep) {
    setStep(next);
    setError("");
    setFieldErrors({});
    setForgotEmailError("");
  }

  function navigateTo(next: AuthStep) {
    if (busyAction === null) moveTo(next);
  }

  function updateRegistration(field: keyof RegistrationForm, value: string) {
    setRegistration((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setError("");
  }

  function validateRegistration(): FieldErrors {
    const errors: FieldErrors = {};
    if (!registration.fullName.trim()) errors.fullName = copy.required;
    if (!isValidEmail(registration.email)) errors.email = mapAuthError(null, "email", locale);
    if (!registration.username.trim()) errors.username = copy.required;
    else if (registration.username.trim().length < 4) {
      errors.username = locale === "vi" ? "Tên đăng nhập phải có ít nhất 4 ký tự." : "Username must be at least 4 characters.";
    }
    if (passwordStrength(registration.password).score < 2) {
      errors.password = mapAuthError(null, "password", locale);
    }
    if (!registration.confirmPassword || registration.confirmPassword !== registration.password) {
      errors.confirmPassword = copy.passwordMismatch;
    }
    return errors;
  }

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!loginUsername.trim() || !loginPassword || busyAction) return;
    setBusyAction("login");
    setError("");
    setExternalErrorDismissed(true);
    try {
      await onLogin(loginUsername.trim(), loginPassword);
    } catch (cause) {
      setError(mapAuthError(cause, "login", locale));
    } finally {
      setBusyAction(null);
    }
  }

  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busyAction) return;
    const errors = validateRegistration();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setBusyAction("register");
    setError("");
    try {
      await preRegister(registrationPayload(registration));
      setCode("");
      startResendCountdown();
      moveTo("verifyRegistration");
    } catch (cause) {
      setError(mapAuthError(cause, "generic", locale));
    } finally {
      setBusyAction(null);
    }
  }

  async function submitRegistrationCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCode = compactOTP(code, OTP_LENGTHS.registration);
    if (normalizedCode.length !== OTP_LENGTHS.registration || busyAction) return;
    setBusyAction("verifyRegistration");
    setError("");
    try {
      await verifyRegistration(registration.email.trim(), normalizedCode);
      setCode("");
      moveTo("signin");
    } catch (cause) {
      setError(mapAuthError(cause, "otp", locale));
    } finally {
      setBusyAction(null);
    }
  }

  async function resendRegistrationCode() {
    if (resendSeconds > 0 || busyAction) return;
    setBusyAction("resendRegistration");
    setError("");
    try {
      await preRegister(registrationPayload(registration));
      setCode("");
      startResendCountdown();
    } catch (cause) {
      setError(mapAuthError(cause, "generic", locale));
    } finally {
      setBusyAction(null);
    }
  }

  async function submitForgotEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busyAction) return;
    if (!isValidEmail(forgotEmail)) {
      setForgotEmailError(mapAuthError(null, "email", locale));
      return;
    }
    setBusyAction("requestReset");
    setError("");
    try {
      await requestPasswordReset(forgotEmail.trim());
      setCode("");
      startResendCountdown();
      moveTo("verifyReset");
    } catch (cause) {
      setError(mapAuthError(cause, "generic", locale));
    } finally {
      setBusyAction(null);
    }
  }

  async function submitResetCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCode = compactOTP(code, OTP_LENGTHS.passwordReset);
    if (normalizedCode.length !== OTP_LENGTHS.passwordReset || busyAction) return;
    setBusyAction("verifyReset");
    setError("");
    try {
      await verifyPasswordReset(forgotEmail.trim(), normalizedCode);
      setCode("");
      moveTo("resetSuccess");
    } catch (cause) {
      setError(mapAuthError(cause, "otp", locale));
    } finally {
      setBusyAction(null);
    }
  }

  async function resendResetCode() {
    if (resendSeconds > 0 || busyAction) return;
    setBusyAction("resendReset");
    setError("");
    try {
      await requestPasswordReset(forgotEmail.trim());
      setCode("");
      startResendCountdown();
    } catch (cause) {
      setError(mapAuthError(cause, "generic", locale));
    } finally {
      setBusyAction(null);
    }
  }

  const safeExternalError = !externalErrorDismissed && errorText
    ? mapAuthError(null, "login", locale)
    : "";
  const content = (() => {
    switch (step) {
      case "register":
        return <RegisterScreen locale={locale} form={registration} onFieldChange={updateRegistration} onSubmit={submitRegistration} onSignIn={() => navigateTo("signin")} busy={busyAction === "register"} error={error} fieldErrors={fieldErrors} />;
      case "verifyRegistration":
        return <VerifyRegistrationScreen locale={locale} email={registration.email} code={code} onCodeChange={(value) => { setCode(value); setError(""); }} onSubmit={submitRegistrationCode} onResend={() => void resendRegistrationCode()} onChangeEmail={() => navigateTo("register")} onBack={() => navigateTo("register")} busy={busyAction === "verifyRegistration"} resendBusy={busyAction === "resendRegistration"} resendSeconds={resendSeconds} error={error} />;
      case "forgotPassword":
        return <ForgotPasswordScreen locale={locale} email={forgotEmail} onEmailChange={(value) => { setForgotEmail(value); setForgotEmailError(""); setError(""); }} onSubmit={submitForgotEmail} onBack={() => navigateTo("signin")} busy={busyAction === "requestReset"} error={error} emailError={forgotEmailError} />;
      case "verifyReset":
        return <VerifyResetCodeScreen locale={locale} email={forgotEmail} code={code} onCodeChange={(value) => { setCode(value); setError(""); }} onSubmit={submitResetCode} onResend={() => void resendResetCode()} onChangeEmail={() => navigateTo("forgotPassword")} onBack={() => navigateTo("forgotPassword")} busy={busyAction === "verifyReset"} resendBusy={busyAction === "resendReset"} resendSeconds={resendSeconds} error={error} />;
      case "resetSuccess":
        return <ResetPasswordSuccessScreen locale={locale} email={forgotEmail} onSignIn={() => navigateTo("signin")} />;
      default:
        return <SignInScreen locale={locale} username={loginUsername} password={loginPassword} onUsernameChange={(value) => { setLoginUsername(value); setError(""); setExternalErrorDismissed(true); }} onPasswordChange={(value) => { setLoginPassword(value); setError(""); setExternalErrorDismissed(true); }} onSubmit={submitLogin} onForgot={() => navigateTo("forgotPassword")} onRegister={() => navigateTo("register")} busy={busyAction === "login"} loading={loading} error={error || safeExternalError} />;
    }
  })();

  return <AuthLayout stepKey={step} locale={locale} onLocaleChange={setLocale}>{content}</AuthLayout>;
}
