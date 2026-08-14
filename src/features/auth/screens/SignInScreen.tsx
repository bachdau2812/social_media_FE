import { type FormEvent } from "react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";
import { API_BASE_URL } from "../../../shared/api";
import {
  AuthDivider,
  AuthError,
  AuthForm,
  AuthHeader,
  AuthInput,
  AuthPrimaryButton,
} from "../components/AuthPrimitives";
import { PasswordInput } from "../components/PasswordInput";
import { authCopy } from "../model/auth.copy";

export type OAuthProvider = "google" | "github" | "facebook";

export function SignInScreen({
  locale,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onForgot,
  onRegister,
  onOAuth,
  busy,
  loading,
  error,
}: {
  locale: AppLocale;
  username: string;
  password: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onForgot: () => void;
  onRegister: () => void;
  onOAuth?: (provider: OAuthProvider) => void;
  busy: boolean;
  loading: boolean;
  error?: string;
}) {
  const copy = authCopy(locale);
  const providers = ["google", "github", "facebook"] as const;
  const selectOAuth = onOAuth ?? ((provider: OAuthProvider) => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}`;
  });
  return (
    <section className="auth-step auth-step-signin">
      <AuthHeader title={copy.signIn} description={<p>{copy.signInDescription}</p>} />
      <AuthForm onSubmit={onSubmit}>
        <AuthError message={error} />
        <AuthInput
          label={copy.usernameOrEmail}
          value={username}
          onChange={onUsernameChange}
          placeholder={copy.usernamePlaceholder}
          autoComplete="username"
        />
        <PasswordInput
          label={copy.password}
          value={password}
          onChange={onPasswordChange}
          showLabel={copy.showPassword}
          hideLabel={copy.hidePassword}
          placeholder={copy.passwordPlaceholder}
          autoComplete="current-password"
        />
        <button type="button" className="auth-link" onClick={onForgot}>{copy.forgotPassword}</button>
        <AuthPrimaryButton
          type="submit"
          busy={busy || loading}
          busyLabel={copy.signingIn}
          disabled={!username.trim() || !password}
        >
          {copy.signIn}
        </AuthPrimaryButton>
        <AuthDivider label={copy.or} />
        <div className="auth-oauth-list">
          {providers.map((provider) => (
            <button key={provider} type="button" className="auth-oauth-button" onClick={() => selectOAuth(provider)}>
              <span className="auth-oauth-glyph" aria-hidden="true">{provider === "google" ? "G" : provider === "github" ? "GH" : "f"}</span>
              <span>{provider === "google" ? "Google" : provider === "github" ? "GitHub" : "Facebook"}</span>
            </button>
          ))}
        </div>
        <p className="auth-switch">{copy.noAccount}<button type="button" onClick={onRegister}>{copy.createAccount}</button></p>
      </AuthForm>
    </section>
  );
}
