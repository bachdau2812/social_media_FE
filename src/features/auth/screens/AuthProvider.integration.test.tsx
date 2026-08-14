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
  const { session, status, error, login } = useAuth();
  if (status === "loading") return <BootScreen />;
  if (!session) {
    return <AuthFlow errorText={error} loading={false} onLogin={async (username, password) => { await login(username, password); }} />;
  }
  return <p>Authenticated</p>;
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
});
