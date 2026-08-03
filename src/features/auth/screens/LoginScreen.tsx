import { ChevronLeft, RefreshCw, WifiOff } from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { API_BASE_URL, apiSend } from "../../../shared/api";
import imageLeftLogin from "../../../../image_left_login.png";
export function BootScreen() { return <main className="auth-shell"><div className="auth-card"><RefreshCw size={24} /><h1>Loading session</h1></div></main>; }
export function LoginScreen({ errorText, loading, onLogin }: { errorText: string; loading: boolean; onLogin: (username: string, password: string) => Promise<void> }) {
  type AuthScreen = "signin" | "create" | "verifyCreate" | "forgot" | "verifyForgot";
  const [screen, setScreen] = useState<AuthScreen>("signin");
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    dob: "",
    sex: "OTHER",
    livingIn: "",
    hometown: "",
    hobbyList: "",
    role: "USER",
    code: ""
  });
  const [localError, setLocalError] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [usernameUnavailable, setUsernameUnavailable] = useState(false);
  const strength = passwordStrength(form.password);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = window.setInterval(() => setResendIn((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [resendIn]);

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setLocalError("");
    setNetworkError("");
    if (key === "username") setUsernameUnavailable(value.toLowerCase().includes("taken") || (value.length > 0 && value.length < 4));
  }

  function createUserPayload() {
    return {
      fullName: form.fullName.trim(),
      username: form.username.trim(),
      password: form.password,
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim() || null,
      dob: form.dob || null,
      sex: form.sex || null,
      livingIn: form.livingIn.trim() || null,
      hometown: form.hometown.trim() || null,
      hobbyList: form.hobbyList.split(",").map((item) => item.trim()).filter(Boolean),
      role: form.role || "USER"
    };
  }

  function social(provider: "google" | "github" | "facebook") {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}`;
  }

  async function submitSignIn(event: FormEvent) {
    event.preventDefault();
    if (!form.username.trim() || !form.password) {
      setLocalError("Enter your username and password.");
      return;
    }
    setBusy(true);
    try {
      await onLogin(form.username.trim(), form.password);
    } catch (error) {
      setNetworkError(error instanceof Error ? error.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  async function submitCreate(event?: FormEvent) {
    event?.preventDefault();
    if (!form.fullName.trim() || !form.username.trim() || !form.password || !form.email.trim()) {
      setLocalError("Complete full name, username, password and email.");
      return;
    }
    if (usernameUnavailable) {
      setLocalError("Username unavailable.");
      return;
    }
    if (strength.score < 2 || form.password !== form.confirmPassword) {
      setLocalError("Check password strength and confirmation.");
      return;
    }
    setBusy(true);
    try {
      await apiSend<string>("/auth/user-credentials/pre-register", "POST", createUserPayload());
      setResendIn(60);
      setScreen("verifyCreate");
    } catch (error) {
      setNetworkError(error instanceof Error ? error.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCreate(event: FormEvent) {
    event.preventDefault();
    if (!form.email.trim() || !form.code.trim()) {
      setLocalError("Enter email and verification code.");
      return;
    }
    setBusy(true);
    try {
      await apiSend<string>("/auth/user-credentials/email-verify-and-create-user", "POST", { email: form.email.trim(), code: form.code.trim() });
      setScreen("signin");
      setForm((current) => ({ ...current, code: "" }));
    } catch (error) {
      setNetworkError(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setBusy(false);
    }
  }

  async function resendCreateCode() {
    if (resendIn > 0 || busy) return;
    await submitCreate();
  }

  async function submitForgot(event: FormEvent) {
    event.preventDefault();
    if (!form.email.trim()) {
      setLocalError("Enter your email.");
      return;
    }
    setBusy(true);
    try {
      await apiSend<string>("/auth/user-credentials/check-and-send-code-for-forget-password", "POST", { email: form.email.trim() });
      setResendIn(60);
      setScreen("verifyForgot");
    } catch (error) {
      setNetworkError(error instanceof Error ? error.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  async function verifyForgot(event: FormEvent) {
    event.preventDefault();
    if (!form.email.trim() || !form.code.trim()) {
      setLocalError("Enter email and verification code.");
      return;
    }
    setBusy(true);
    try {
      await apiSend<string>("/auth/user-credentials/verify-and-send-new-password-to-user", "POST", { email: form.email.trim(), code: form.code.trim() });
      setScreen("signin");
      setForm((current) => ({ ...current, code: "" }));
    } catch (error) {
      setNetworkError(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setBusy(false);
    }
  }

  async function resendForgotCode() {
    if (resendIn > 0 || busy || !form.email.trim()) return;
    setBusy(true);
    try {
      await apiSend<string>("/auth/user-credentials/check-and-send-code-for-forget-password", "POST", { email: form.email.trim() });
      setResendIn(60);
    } catch (error) {
      setNetworkError(error instanceof Error ? error.message : "Network error");
    } finally {
      setBusy(false);
    }
  }

  const providers = [{ id: "google", label: "Google" }, { id: "github", label: "GitHub" }, { id: "facebook", label: "Facebook" }] as const;
  const alert = localError || networkError || errorText;

  return <main className="auth-experience"><section className="auth-brand-panel auth-image-panel" aria-hidden="true"><img src={imageLeftLogin} alt="" /></section><section className="auth-flow-panel"><div className="auth-shell">{screen !== "signin" && <button className="auth-back" onClick={() => setScreen(screen === "create" || screen === "forgot" ? "signin" : screen === "verifyCreate" ? "create" : "forgot")}><ChevronLeft size={18} /> Back</button>}{screen === "signin" && <AuthCard title="Sign in" subtitle="Access your account with username and password."><form className="auth-form" onSubmit={submitSignIn}><AuthField label="Username" value={form.username} onChange={(value) => update("username", value)} autoComplete="username" error={!form.username && localError ? "Username is required" : undefined} /><AuthField label="Password" type="password" value={form.password} onChange={(value) => update("password", value)} autoComplete="current-password" error={!form.password && localError ? "Password is required" : undefined} /><button className="auth-primary" disabled={busy || loading}>{busy || loading ? "Signing in" : "Sign in"}</button></form><button className="auth-link" onClick={() => setScreen("forgot")}>Forgot password?</button><SocialButtons providers={providers} onSelect={social} /><p className="auth-switch">Don't have an account? <button onClick={() => setScreen("create")}>Create account</button></p></AuthCard>}{screen === "create" && <AuthCard title="Create account" subtitle="Enter the account details required by the service."><form className="auth-form auth-form-wide" onSubmit={submitCreate}><AuthField label="Full name" value={form.fullName} onChange={(value) => update("fullName", value)} autoComplete="name" error={localError && !form.fullName ? "Full name is required" : undefined} /><AuthField label="Email" value={form.email} onChange={(value) => update("email", value)} autoComplete="email" inputMode="email" error={localError && !form.email ? "Email is required" : undefined} /><AuthField label="Phone number" value={form.phoneNumber} onChange={(value) => update("phoneNumber", value)} autoComplete="tel" inputMode="tel" /><AuthField label="Username" value={form.username} onChange={(value) => update("username", value)} autoComplete="username" error={usernameUnavailable ? "Username unavailable" : undefined} /><AuthField label="Password" type="password" value={form.password} onChange={(value) => update("password", value)} autoComplete="new-password" /><PasswordMeter result={strength} /><AuthField label="Confirm password" type="password" value={form.confirmPassword} onChange={(value) => update("confirmPassword", value)} autoComplete="new-password" error={form.confirmPassword && form.confirmPassword !== form.password ? "Passwords do not match" : undefined} /><AuthField label="Date of birth" type="date" value={form.dob} onChange={(value) => update("dob", value)} /><label className="auth-field"><span>Sex</span><select value={form.sex} onChange={(event) => update("sex", event.target.value)}><option value="OTHER">Other</option><option value="MALE">Male</option><option value="FEMALE">Female</option></select></label><AuthField label="Living in" value={form.livingIn} onChange={(value) => update("livingIn", value)} /><AuthField label="Hometown" value={form.hometown} onChange={(value) => update("hometown", value)} /><AuthField label="Hobbies" value={form.hobbyList} onChange={(value) => update("hobbyList", value)} /><label className="auth-field"><span>Role</span><select value={form.role} onChange={(event) => update("role", event.target.value)}><option value="USER">USER</option></select></label><button className="auth-primary" disabled={busy || usernameUnavailable}>{busy ? "Sending code" : "Create account"}</button></form><p className="auth-switch">Already have an account? <button onClick={() => setScreen("signin")}>Sign in</button></p></AuthCard>}{screen === "verifyCreate" && <AuthCard title="Verify email" subtitle="Enter the verification code sent to your email."><form className="auth-form" onSubmit={verifyCreate}><AuthField label="Email" value={form.email} onChange={(value) => update("email", value)} autoComplete="email" inputMode="email" /><AuthField label="Verification code" value={form.code} onChange={(value) => update("code", value)} inputMode="numeric" error={localError ? "Code is required" : undefined} /><button className="auth-primary" disabled={busy}>{busy ? "Verifying" : "Verify and create"}</button></form><button className="auth-link" disabled={resendIn > 0 || busy} onClick={() => void resendCreateCode()}>{resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}</button></AuthCard>}{screen === "forgot" && <AuthCard title="Forgot password" subtitle="Request a verification code for your email."><form className="auth-form" onSubmit={submitForgot}><AuthField label="Email" value={form.email} onChange={(value) => update("email", value)} autoComplete="email" inputMode="email" error={localError ? "Email is required" : undefined} /><button className="auth-primary" disabled={busy}>{busy ? "Sending" : "Send verification code"}</button></form><p className="auth-switch">Remembered it? <button onClick={() => setScreen("signin")}>Sign in</button></p></AuthCard>}{screen === "verifyForgot" && <AuthCard title="Verify email" subtitle="Confirm the code to receive the reset password response from the service."><form className="auth-form" onSubmit={verifyForgot}><AuthField label="Email" value={form.email} onChange={(value) => update("email", value)} autoComplete="email" inputMode="email" /><AuthField label="Verification code" value={form.code} onChange={(value) => update("code", value)} inputMode="numeric" error={localError ? "Code is required" : undefined} /><button className="auth-primary" disabled={busy}>{busy ? "Verifying" : "Verify"}</button></form><button className="auth-link" disabled={resendIn > 0 || busy} onClick={() => void resendForgotCode()}>{resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}</button></AuthCard>}{alert && <p className="auth-alert"><WifiOff size={16} /> {alert}</p>}</div></section></main>;
}
function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) { return <div className="auth-step-card"><h1>{title}</h1><p>{subtitle}</p>{children}</div>; }
function AuthField({ label, value, onChange, type = "text", error, autoComplete, inputMode }: { label: string; value: string; onChange: (value: string) => void; type?: string; error?: string; autoComplete?: string; inputMode?: "text" | "numeric" | "tel" | "email" | "url" }) { return <label className={error ? "auth-field error" : "auth-field"}><span>{label}</span><input value={value} type={type} autoComplete={autoComplete} inputMode={inputMode} onChange={(event) => onChange(event.target.value)} />{error && <small>{error}</small>}</label>; }
function SocialButtons({ providers, onSelect }: { providers: readonly { id: "google" | "github" | "facebook"; label: string }[]; onSelect: (provider: "google" | "github" | "facebook") => void }) { return <div className="social-login"><span>Or continue with</span>{providers.map((provider) => <button key={provider.id} className={`oauth-button ${provider.id}`} onClick={() => onSelect(provider.id)}><span className={`oauth-logo ${provider.id}`} aria-hidden="true">{provider.id === "google" ? "G" : provider.id === "github" ? "GH" : "f"}</span><span>{provider.label}</span></button>)}</div>; }
function passwordStrength(value: string) { let score = 0; if (value.length >= 8) score++; if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++; if (/\d/.test(value)) score++; if (/[^A-Za-z0-9]/.test(value)) score++; const label = score <= 1 ? "Weak" : score === 2 ? "Fair" : score === 3 ? "Good" : "Strong"; return { score, label }; }
function PasswordMeter({ result }: { result: { score: number; label: string } }) { return <div className="password-meter"><span><i style={{ width: `${Math.max(12, result.score * 25)}%` }} /></span><small>{result.label}</small></div>; }
