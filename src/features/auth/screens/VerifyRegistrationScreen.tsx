import { type FormEvent } from "react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";
import { AuthError, AuthForm, AuthHeader, AuthPrimaryButton } from "../components/AuthPrimitives";
import { compactOTP, OTPInput } from "../components/OTPInput";
import { authCopy } from "../model/auth.copy";
import { OTP_LENGTHS } from "../model/auth.types";
import { maskEmail } from "../model/auth.utils";

export type VerificationScreenProps = {
  locale: AppLocale;
  email: string;
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
  onChangeEmail: () => void;
  onBack: () => void;
  busy: boolean;
  resendBusy: boolean;
  resendSeconds: number;
  error?: string;
};

function countdown(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function VerificationCodeScreen({
  mode,
  locale,
  email,
  code,
  onCodeChange,
  onSubmit,
  onResend,
  onChangeEmail,
  onBack,
  busy,
  resendBusy,
  resendSeconds,
  error,
}: VerificationScreenProps & { mode: "registration" | "reset" }) {
  const copy = authCopy(locale);
  const length = mode === "registration" ? OTP_LENGTHS.registration : OTP_LENGTHS.passwordReset;
  const codeComplete = compactOTP(code, length).length === length;
  const actionPending = busy || resendBusy;

  return (
    <section className="auth-step auth-step-verify">
      <AuthHeader
        title={mode === "registration" ? copy.verifyAccount : copy.verifyReset}
        description={<p>{mode === "registration" ? copy.verifyAccountDescription : copy.verifyResetDescription}<br /><strong>{maskEmail(email)}</strong></p>}
        backLabel={copy.back}
        onBack={onBack}
        backDisabled={actionPending}
      />
      <AuthForm onSubmit={onSubmit}>
        <AuthError message={error} />
        <OTPInput
          ariaLabel={copy.verificationCode}
          value={code}
          length={length}
          onChange={onCodeChange}
          disabled={actionPending}
          invalid={Boolean(error)}
          autoFocus
        />
        <AuthPrimaryButton
          type="submit"
          busy={busy}
          busyLabel={copy.verifying}
          disabled={!codeComplete || resendBusy}
        >
          {copy.verify}
        </AuthPrimaryButton>
        <div className="auth-inline-actions">
          <button type="button" onClick={onResend} disabled={resendSeconds > 0 || actionPending}>
            {resendBusy ? copy.resending : resendSeconds > 0 ? `${copy.resendAfter} ${countdown(resendSeconds)}` : copy.resend}
          </button>
          <button type="button" onClick={onChangeEmail} disabled={actionPending}>{copy.changeEmail}</button>
          <button type="button" onClick={onBack} disabled={actionPending}>
            {mode === "registration" ? copy.backToRegistration : copy.back}
          </button>
        </div>
      </AuthForm>
    </section>
  );
}

export function VerifyRegistrationScreen(props: VerificationScreenProps) {
  return <VerificationCodeScreen {...props} mode="registration" />;
}
