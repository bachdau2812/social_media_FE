import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useChatMediaComposer } from "./useChatMediaComposer";

function imageFile(size: number): File {
  const file = new File(["image"], "photo.jpg", { type: "image/jpeg" });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

describe("useChatMediaComposer media limits", () => {
  beforeEach(() => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:preview");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
  });

  it("accepts a 100 MB image and rejects one byte over", () => {
    const oneHundredMegabytes = 100 * 1024 * 1024;
    const { result } = renderHook(() => useChatMediaComposer());

    act(() => result.current.selectImages([imageFile(oneHundredMegabytes)]));
    expect(result.current.images).toHaveLength(1);
    expect(result.current.error).toBeNull();

    act(() => result.current.selectImages([imageFile(oneHundredMegabytes + 1)]));
    expect(result.current.images).toHaveLength(1);
    expect(result.current.error).toContain("100 MB");
  });
});
