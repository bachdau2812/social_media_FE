import { AlertCircle, ArrowLeft, LoaderCircle } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";

export function AuthHeader({
  title,
  description,
  backLabel,
  onBack,
  backDisabled = false,
}: {
  title: string;
  description?: ReactNode;
  backLabel?: string;
  onBack?: () => void;
  backDisabled?: boolean;
}) {
  return (
    <header className="auth-header">
      {onBack && backLabel ? (
        <button
          type="button"
          className="auth-back"
          onClick={onBack}
          aria-label={backLabel}
          disabled={backDisabled}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span>{backLabel}</span>
        </button>
      ) : null}
      <h1>{title}</h1>
      {description ? <div className="auth-description">{description}</div> : null}
    </header>
  );
}

export function AuthForm(props: FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props} className={`auth-form ${props.className ?? ""}`.trim()} />;
}

type AuthInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function AuthInput({ label, value, onChange, error, className, ...props }: AuthInputProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <label className={error ? "auth-field auth-field-error" : "auth-field"} htmlFor={id}>
      <span className="auth-field-label">{label}</span>
      <input
        {...props}
        id={id}
        className={`auth-field-control ${className ?? ""}`.trim()}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={props["aria-label"] ?? label}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : props["aria-describedby"]}
      />
      {error ? <small id={errorId} className="auth-field-message">{error}</small> : null}
    </label>
  );
}

type AuthPrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  busy?: boolean;
  busyLabel?: string;
};

export function AuthPrimaryButton({
  busy = false,
  busyLabel = "Loading",
  disabled,
  children,
  className,
  ...props
}: AuthPrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`auth-primary ${className ?? ""}`.trim()}
      disabled={disabled || busy}
      aria-busy={busy}
    >
      {busy ? <LoaderCircle className="auth-spinner" size={18} aria-hidden="true" /> : null}
      <span>{busy ? busyLabel : children}</span>
    </button>
  );
}

export function AuthDivider({ label }: { label: string }) {
  return <div className="auth-divider"><span>{label}</span></div>;
}

export function AuthError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="auth-alert" role="alert">
      <AlertCircle size={17} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export function AuthFooter({
  locale,
  onLocaleChange,
}: {
  locale: AppLocale;
  onLocaleChange: (locale: AppLocale) => void;
}) {
  const labels = locale === "vi"
    ? { about: "Giới thiệu", help: "Trợ giúp", privacy: "Quyền riêng tư", terms: "Điều khoản", language: "Ngôn ngữ" }
    : { about: "About", help: "Help", privacy: "Privacy", terms: "Terms", language: "Language" };
  return (
    <footer className="auth-footer">
      <nav aria-label={locale === "vi" ? "Liên kết xác thực" : "Authentication links"}>
        <a href="#about" className="auth-footer-desktop">{labels.about}</a>
        <a href="#help" className="auth-footer-desktop">{labels.help}</a>
        <a href="#privacy">{labels.privacy}</a>
        <a href="#terms">{labels.terms}</a>
      </nav>
      <label className="auth-language">
        <span className="sr-only">{labels.language}</span>
        <select value={locale} onChange={(event) => onLocaleChange(event.target.value as AppLocale)}>
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </label>
    </footer>
  );
}
