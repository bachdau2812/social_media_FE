// @vitest-environment jsdom

import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ToastProvider } from "./ToastProvider";

afterEach(cleanup);

describe("ToastProvider", () => {
  it.each(["app-toast", "shared-app-toast"])(
    "renders one application toast for %s events",
    (eventName) => {
      render(<ToastProvider><span>Application</span></ToastProvider>);

      act(() => {
        window.dispatchEvent(new CustomEvent(eventName, { detail: "Đã xử lý xong" }));
      });

      const statuses = screen.getAllByRole("status");
      expect(statuses).toHaveLength(1);
      expect(statuses[0]).toHaveTextContent("Đã xử lý xong");
      expect(statuses[0]).toHaveClass("app-global-toast");
    },
  );
});
