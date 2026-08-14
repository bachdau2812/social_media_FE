import { type FormEvent } from "react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";
import { AuthError, AuthForm, AuthHeader, AuthInput, AuthPrimaryButton } from "../components/AuthPrimitives";
import { PasswordInput } from "../components/PasswordInput";
import { PasswordStrength } from "../components/PasswordStrength";
import { authCopy } from "../model/auth.copy";
import type { RegistrationForm } from "../model/auth.types";

export function RegisterScreen({
  locale,
  form,
  onFieldChange,
  onSubmit,
  onSignIn,
  busy,
  error,
  fieldErrors,
}: {
  locale: AppLocale;
  form: RegistrationForm;
  onFieldChange: (field: keyof RegistrationForm, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSignIn: () => void;
  busy: boolean;
  error?: string;
  fieldErrors: Partial<Record<keyof RegistrationForm, string>>;
}) {
  const copy = authCopy(locale);
  const field = (key: keyof RegistrationForm) => (value: string) => onFieldChange(key, value);
  return (
    <section className="auth-step auth-step-register">
      <AuthHeader title={copy.registerTitle} description={<p>{copy.registerDescription}</p>} />
      <AuthForm className="auth-form-register" onSubmit={onSubmit}>
        <AuthError message={error} />
        <div className="auth-form-grid">
          <AuthInput label={copy.fullName} value={form.fullName} onChange={field("fullName")} autoComplete="name" error={fieldErrors.fullName} />
          <AuthInput label={copy.email} value={form.email} onChange={field("email")} autoComplete="email" inputMode="email" error={fieldErrors.email} />
          <AuthInput label={copy.phoneNumber} value={form.phoneNumber} onChange={field("phoneNumber")} autoComplete="tel" inputMode="tel" />
          <AuthInput label={copy.username} value={form.username} onChange={field("username")} autoComplete="username" error={fieldErrors.username} />
          <div className="auth-field-full">
            <PasswordInput label={copy.password} value={form.password} onChange={field("password")} showLabel={copy.showPassword} hideLabel={copy.hidePassword} autoComplete="new-password" error={fieldErrors.password} />
          </div>
          <div className="auth-field-full"><PasswordStrength value={form.password} locale={locale} /></div>
          <div className="auth-field-full">
            <PasswordInput label={copy.confirmPassword} value={form.confirmPassword} onChange={field("confirmPassword")} showLabel={copy.showPassword} hideLabel={copy.hidePassword} autoComplete="new-password" error={fieldErrors.confirmPassword} />
          </div>
          <AuthInput label={copy.dateOfBirth} value={form.dob} onChange={field("dob")} type="date" />
          <label className="auth-field auth-select-field" htmlFor="auth-register-sex">
            <span>{copy.gender}</span>
            <select id="auth-register-sex" value={form.sex} onChange={(event) => field("sex")(event.target.value)}>
              <option value="OTHER">{copy.other}</option><option value="MALE">{copy.male}</option><option value="FEMALE">{copy.female}</option>
            </select>
          </label>
          <AuthInput label={copy.livingIn} value={form.livingIn} onChange={field("livingIn")} />
          <AuthInput label={copy.hometown} value={form.hometown} onChange={field("hometown")} />
          <AuthInput className="auth-field-full" label={copy.hobbies} value={form.hobbyList} onChange={field("hobbyList")} placeholder={copy.hobbiesPlaceholder} />
          <label className="auth-field auth-select-field" htmlFor="auth-register-role">
            <span>{copy.role}</span>
            <select id="auth-register-role" value={form.role} onChange={(event) => field("role")(event.target.value)}><option value="USER">USER</option></select>
          </label>
        </div>
        <AuthPrimaryButton type="submit" busy={busy} busyLabel={copy.creatingAccount}>{copy.createAccountCta}</AuthPrimaryButton>
        <p className="auth-switch">{copy.alreadyAccount}<button type="button" onClick={onSignIn}>{copy.signIn}</button></p>
      </AuthForm>
    </section>
  );
}
