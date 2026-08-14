import { Check, Circle } from "lucide-react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";
import { passwordStrength } from "../model/auth.utils";

const labels = {
  vi: {
    weak: "Yếu", fair: "Trung bình", good: "Tốt", strong: "Mạnh",
    minimumLength: "Ít nhất 8 ký tự", mixedCase: "Có chữ hoa và chữ thường",
    number: "Có số", special: "Có ký tự đặc biệt",
  },
  en: {
    weak: "Weak", fair: "Fair", good: "Good", strong: "Strong",
    minimumLength: "At least 8 characters", mixedCase: "Upper and lowercase letters",
    number: "Contains a number", special: "Contains a special character",
  },
} as const;

export function PasswordStrength({ value, locale }: { value: string; locale: AppLocale }) {
  const result = passwordStrength(value);
  const copy = labels[locale];
  const requirements = [
    ["minimumLength", result.requirements.minimumLength],
    ["mixedCase", result.requirements.mixedCase],
    ["number", result.requirements.number],
    ["special", result.requirements.special],
  ] as const;
  return (
    <div className="auth-password-strength" aria-live="polite">
      <div className="auth-strength-heading">
        <span className="auth-strength-track"><i style={{ width: `${Math.max(8, result.score * 25)}%` }} /></span>
        <strong>{copy[result.label]}</strong>
      </div>
      <ul>
        {requirements.map(([key, met]) => (
          <li key={key} data-testid={met ? "password-requirement-met" : "password-requirement-unmet"} className={met ? "met" : undefined}>
            {met ? <Check size={14} aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}
            <span>{copy[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
