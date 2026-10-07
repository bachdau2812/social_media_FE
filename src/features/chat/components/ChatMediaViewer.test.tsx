import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useBodyScrollLock } from "../../../shared/overlays/useBodyScrollLock";
import { ChatMediaViewer } from "./ChatMediaExperience";
afterEach(cleanup);
function OtherOverlay() { useBodyScrollLock(true); return null; }
it("keeps another overlay locked when the shared full/mini media viewer closes", () => {
 document.body.style.overflow = "auto";
 const { rerender, unmount } = render(<><ChatMediaViewer items={[{ url: "image.jpg", alt: "Image" }]} initialIndex={0} onClose={vi.fn()} /><OtherOverlay /></>);
 rerender(<OtherOverlay />);
 expect(document.body.style.overflow).toBe("hidden");
 unmount(); expect(document.body.style.overflow).toBe("auto");
});
