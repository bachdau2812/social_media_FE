import type { ReactNode } from "react";
import type { AppLocale } from "../../../app/providers/LocaleProvider";
import type { AuthStep } from "../model/auth.types";
import { AuthBrandPanel, AuthMark } from "./AuthBrandPanel";
import { AuthFooter } from "./AuthPrimitives";

export function AuthLayout({
  stepKey,
  locale,
  onLocaleChange,
  children,
}: {
  stepKey: AuthStep;
  locale: AppLocale;
  onLocaleChange: (locale: AppLocale) => void;
  children: ReactNode;
}) {
  return (
    <main className="auth-experience">
      <AuthBrandPanel />
      <section className="auth-flow-panel">
        <div className="auth-mobile-mark"><AuthMark compact /></div>
        <div className="auth-content">
          <div key={stepKey} className="auth-step-transition">{children}</div>
        </div>
        <AuthFooter locale={locale} onLocaleChange={onLocaleChange} />
      </section>
    </main>
  );
}
