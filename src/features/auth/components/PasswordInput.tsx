import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showLabel: string;
  hideLabel: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
};

export function PasswordInput({
  label,
  value,
  onChange,
  showLabel,
  hideLabel,
  error,
  disabled,
  autoComplete,
  placeholder,
}: PasswordInputProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <label className={error ? "auth-field auth-field-error" : "auth-field"} htmlFor={id}>
      <span className="auth-field-label">{label}</span>
      <span className="auth-password-control">
        <input
          id={id}
          className="auth-field-control"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="auth-password-toggle"
          aria-label={visible ? hideLabel : showLabel}
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
        >
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </span>
      {error ? <small id={`${id}-error`} className="auth-field-message">{error}</small> : null}
    </label>
  );
}
