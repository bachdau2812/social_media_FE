import { type FormEvent } from "react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";
import { AuthError, AuthForm, AuthHeader, AuthInput, AuthPrimaryButton } from "../components/AuthPrimitives";
import { authCopy } from "../model/auth.copy";

export function ForgotPasswordScreen({
  locale,
  email,
  onEmailChange,
  onSubmit,
  onBack,
  busy,
  error,
  emailError,
}: {
  locale: AppLocale;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  busy: boolean;
  error?: string;
  emailError?: string;
}) {
  const copy = authCopy(locale);
  return (
    <section className="auth-step auth-step-forgot">
      <AuthHeader title={copy.forgotTitle} description={<p>{copy.forgotDescription}</p>} backLabel={copy.back} onBack={onBack} />
      <AuthForm onSubmit={onSubmit}>
        <AuthError message={error} />
        <AuthInput label={copy.email} value={email} onChange={onEmailChange} autoComplete="email" inputMode="email" error={emailError} />
        <AuthPrimaryButton type="submit" busy={busy} busyLabel={copy.sending} disabled={!email.trim()}>{copy.continue}</AuthPrimaryButton>
        <p className="auth-switch"><button type="button" onClick={onBack}>{copy.backToSignIn}</button></p>
      </AuthForm>
    </section>
  );
}
