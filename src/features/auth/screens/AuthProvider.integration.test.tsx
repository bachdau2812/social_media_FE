import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "../../../app/providers/AuthProvider";
import { LocaleProvider } from "../../../app/providers/LocaleProvider";
import { AuthFlow } from "./AuthFlow";
import { BootScreen } from "./BootScreen";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function AuthGate() {
  const { session, status, error, recoverableError, login, restoreSession } = useAuth();
  if (status === "loading") return <><BootScreen /><button onClick={() => void login("alice", "secret")}>Login during restore</button></>;
  if (!session) {
    return <><output data-testid="auth-status">{status}</output><button onClick={() => void restoreSession()}>Retry restore</button><AuthFlow errorText={error} errorIsRecoverable={recoverableError} loading={false} onLogin={async (username, password) => { await login(username, password); }} /></>;
  }
  return <><output data-testid="auth-status">{status}</output><p>Authenticated: {session.username}</p></>;
}

describe("AuthProvider and AuthFlow integration", () => {
  it("keeps the form mounted during login and safely handles a rejected request", async () => {
    let resolveLogin!: (response: Response) => void;
    const loginResponse = new Promise<Response>((resolve) => { resolveLogin = resolve; });
    vi.stubGlobal("fetch", vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/auth/session")) {
        return Promise.resolve(new Response(JSON.stringify({ message: "anonymous" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }));
      }
      return loginResponse;
    }));
    localStorage.setItem("social-media-locale", "vi");
    const user = userEvent.setup();
    render(<LocaleProvider><AuthProvider><AuthGate /></AuthProvider></LocaleProvider>);

    await screen.findByRole("heading", { name: "Đăng nhập" });
    await user.type(screen.getByLabelText("Email hoặc tên đăng nhập"), "bach");
    await user.type(screen.getByLabelText("Mật khẩu"), "secret");
    await user.click(screen.getByRole("button", { name: "Đăng nhập" }));

    expect(screen.getByRole("heading", { name: "Đăng nhập" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email hoặc tên đăng nhập")).toHaveValue("bach");
    expect(screen.getByRole("button", { name: "Đang đăng nhập" })).toBeDisabled();

    resolveLogin(new Response(JSON.stringify({ message: "raw backend login exception" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Tên đăng nhập hoặc mật khẩu không đúng."));
    expect(screen.queryByText("raw backend login exception")).not.toBeInTheDocument();

    await user.type(screen.getByLabelText("Email hoặc tên đăng nhập"), "2");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("keeps a failed session restore recoverable instead of treating a server error as anonymous", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response(JSON.stringify({ message: "unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    }))));
    render(<LocaleProvider><AuthProvider><AuthGate /></AuthProvider></LocaleProvider>);

    expect(await screen.findByTestId("auth-status")).toHaveTextContent("error");
    expect(screen.getByRole("heading", { name: "Đăng nhập" })).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Máy chủ đang gặp sự cố");
  });

  it("does not let an old restore response overwrite a newer login", async () => {
    let resolveRestore!: (response: Response) => void;
    const restoreResponse = new Promise<Response>((resolve) => { resolveRestore = resolve; });
    let restoreCount = 0;
    vi.stubGlobal("fetch", vi.fn((input: RequestInfo | URL) => {
      if (String(input).endsWith("/auth/session")) {
        restoreCount += 1;
        if (restoreCount === 1) return Promise.resolve(new Response(JSON.stringify({ message: "anonymous" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }));
        return restoreResponse;
      }
      return Promise.resolve(new Response(JSON.stringify({ userId: "login-user", username: "new-session" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }));
    }));
    const user = userEvent.setup();
    render(<LocaleProvider><AuthProvider><AuthGate /></AuthProvider></LocaleProvider>);

    await screen.findByRole("heading", { name: "Đăng nhập" });
    await user.click(screen.getByRole("button", { name: "Retry restore" }));
    await user.click(await screen.findByRole("button", { name: "Login during restore" }));
    expect(await screen.findByText("Authenticated: new-session")).toBeInTheDocument();

    resolveRestore(new Response(JSON.stringify({ userId: "old-user", username: "stale-session" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));
    await waitFor(() => expect(screen.getByText("Authenticated: new-session")).toBeInTheDocument());
    expect(screen.queryByText("Authenticated: stale-session")).not.toBeInTheDocument();
  });
});
