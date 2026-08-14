import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VerifyRegistrationScreen } from "./VerifyRegistrationScreen";

afterEach(cleanup);

describe("VerificationCodeScreen busy controls", () => {
  it.each([
    { busy: true, resendBusy: false },
    { busy: false, resendBusy: true },
  ])("disables every ignored interaction while an action is pending", ({ busy, resendBusy }) => {
    render(
      <VerifyRegistrationScreen
        locale="en"
        email="bach@example.com"
        code="ABCDEFGH"
        onCodeChange={vi.fn()}
        onSubmit={vi.fn()}
        onResend={vi.fn()}
        onChangeEmail={vi.fn()}
        onBack={vi.fn()}
        busy={busy}
        resendBusy={resendBusy}
        resendSeconds={0}
      />,
    );

    screen.getAllByRole("button").forEach((button) => {
      expect(button).toBeDisabled();
    });
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toBeDisabled();
    });
  });
});
