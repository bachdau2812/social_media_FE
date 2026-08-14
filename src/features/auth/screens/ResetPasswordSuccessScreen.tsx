import { Check } from "lucide-react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";
import { AuthHeader, AuthPrimaryButton } from "../components/AuthPrimitives";
import { authCopy } from "../model/auth.copy";
import { maskEmail } from "../model/auth.utils";

export function ResetPasswordSuccessScreen({ locale, email, onSignIn }: { locale: AppLocale; email: string; onSignIn: () => void }) {
  const copy = authCopy(locale);
  return (
    <section className="auth-step auth-success">
      <div className="auth-success-icon"><Check size={28} aria-hidden="true" /></div>
      <AuthHeader title={copy.resetSuccessTitle} description={<><p>{copy.resetSuccessText}</p><p><strong>{maskEmail(email)}</strong></p><p>{copy.resetSuccessHint}</p></>} />
      <AuthPrimaryButton type="button" onClick={onSignIn}>{copy.signIn}</AuthPrimaryButton>
    </section>
  );
}
