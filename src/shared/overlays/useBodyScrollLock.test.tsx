import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useBodyScrollLock } from "./useBodyScrollLock";

afterEach(() => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});

describe("useBodyScrollLock", () => {
  it("restores the original body styles after the final nested lock closes", () => {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "3px";

    const first = renderHook(() => useBodyScrollLock(true));
    const second = renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");

    first.unmount();
    expect(document.body.style.overflow).toBe("hidden");

    second.unmount();
    expect(document.body.style.overflow).toBe("auto");
    expect(document.body.style.paddingRight).toBe("3px");
  });

  it("does not change body styles while inactive", () => {
    document.body.style.overflow = "clip";
    const { unmount } = renderHook(() => useBodyScrollLock(false));

    expect(document.body.style.overflow).toBe("clip");

    unmount();
    expect(document.body.style.overflow).toBe("clip");
  });
});
