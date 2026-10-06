import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { uploadCloudinaryMedia } from "../../../shared/api";
import { profileApi } from "../api/profile.api";
import { AVATAR_UPLOAD_RESULT_EVENT, type AvatarUploadResult } from "../model/avatarUpload";
import { AvatarUploader } from "./AvatarUploader";

vi.mock("../../../shared/api", () => ({ uploadCloudinaryMedia: vi.fn(), apiGet: vi.fn(), apiSend: vi.fn() }));
vi.mock("../api/profile.api", () => ({ profileApi: { uploadAvatar: vi.fn() } }));
vi.mock("../../../shared/media/mediaUploadPolicy", async (importOriginal) => ({
  ...await importOriginal<typeof import("../../../shared/media/mediaUploadPolicy")>(),
  getMediaUploadPolicy: vi.fn().mockResolvedValue({ imageMaxBytes: 1000000, videoMaxBytes: 1000000, audioMaxBytes: 1000000 }),
}));

const approved: AvatarUploadResult = {
  userId: "owner", publicId: "folder/new-avatar", mediaUrl: "https://cdn/new.png", result: "APPROVED",
};
beforeEach(() => {
  vi.mocked(uploadCloudinaryMedia).mockResolvedValue({ secureUrl: approved.mediaUrl, publicId: approved.publicId, resourceType: "image", bytes: 100, fileName: "avatar.png", mimeType: "image/png" });
  vi.mocked(profileApi.uploadAvatar).mockResolvedValue({ userId: "owner", status: "PENDING_SCAN" });
  vi.stubGlobal("URL", class extends URL {
    static createObjectURL = vi.fn(() => "blob:preview");
    static revokeObjectURL = vi.fn();
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({ drawImage: vi.fn() } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation((callback) => callback(new Blob(["cropped"], { type: "image/png" })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.useRealTimers(); });

function renderUploader() {
  const onApproved = vi.fn().mockResolvedValue(undefined);
  render(<AvatarUploader userId="owner" avatarUrl="https://cdn/old.jpg" username="Bach" onApproved={onApproved} />);
  return onApproved;
}
async function chooseImage(user: ReturnType<typeof userEvent.setup>) {
  await user.upload(screen.getByLabelText("Chọn ảnh đại diện"), new File(["original"], "portrait.png", { type: "image/png" }));
  await screen.findByRole("dialog", { name: "Cắt ảnh đại diện" });
  const image = screen.getByAltText("Ảnh đã chọn để cắt");
  Object.defineProperties(image, { naturalWidth: { value: 1200 }, naturalHeight: { value: 800 } });
  fireEvent.load(image);
}
function result(event: AvatarUploadResult) {
  act(() => window.dispatchEvent(new CustomEvent(AVATAR_UPLOAD_RESULT_EVENT, { detail: event })));
}

describe("avatar upload", () => {
  it("rejects non-images and oversized originals before making a preview or uploading", async () => {
    renderUploader();
    const input = screen.getByLabelText("Chọn ảnh đại diện");
    fireEvent.change(input, { target: { files: [new File(["text"], "file.txt", { type: "text/plain" })] } });
    expect(await screen.findByRole("alert")).toHaveTextContent("Vui lòng chọn một tệp ảnh");
    fireEvent.change(input, { target: { files: [new File([new Uint8Array(1_000_001)], "large.png", { type: "image/png" })] } });
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("không được vượt quá"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(uploadCloudinaryMedia).not.toHaveBeenCalled();
  });

  it("disables Save for an image that cannot be decoded", async () => {
    const user = userEvent.setup();
    renderUploader();
    await user.upload(screen.getByLabelText("Chọn ảnh đại diện"), new File(["broken"], "bad.png", { type: "image/png" }));
    await screen.findByRole("dialog");
    fireEvent.error(screen.getByAltText("Ảnh đã chọn để cắt"));
    expect(screen.getByRole("alert")).toHaveTextContent("Không thể đọc ảnh này");
    expect(screen.getByRole("button", { name: "Lưu" })).toBeDisabled();
    expect(uploadCloudinaryMedia).not.toHaveBeenCalled();
  });

  it("exports the region chosen by pointer drag after zooming", async () => {
    const user = userEvent.setup();
    renderUploader();
    await chooseImage(user);
    fireEvent.change(screen.getByRole("slider", { name: "Phóng đại" }), { target: { value: "2" } });
    const image = screen.getByAltText("Ảnh đã chọn để cắt");
    const stage = image.parentElement!;
    vi.spyOn(stage, "getBoundingClientRect").mockReturnValue({ width: 280 } as DOMRect);
    Object.defineProperty(stage, "setPointerCapture", { value: vi.fn() });
    const pointer = (type: string, x: number) => {
      const event = new MouseEvent(type, { bubbles: true, button: 0, clientX: x, clientY: 100 });
      Object.defineProperty(event, "pointerId", { value: 1 });
      fireEvent(stage, event);
    };
    pointer("pointerdown", 100);
    pointer("pointermove", 170);
    pointer("pointerup", 170);
    expect(image).toHaveStyle({ left: "-75%", top: "-50%" });
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    const context = vi.mocked(HTMLCanvasElement.prototype.getContext).mock.results[0].value as CanvasRenderingContext2D;
    expect(context.drawImage).toHaveBeenCalledWith(image, 300, 200, 400, 400, 0, 0, 512, 512);
  });

  it("previews without uploading and cleans up on cancel", async () => {
    const user = userEvent.setup();
    renderUploader();
    await chooseImage(user);
    expect(screen.getByRole("slider", { name: "Phóng đại" })).toBeInTheDocument();
    expect(uploadCloudinaryMedia).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Hủy" }));
    expect(profileApi.uploadAvatar).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview");
  });

  it("submits the cropped bitmap and refreshes only after its approval", async () => {
    const user = userEvent.setup();
    const onApproved = renderUploader();
    await chooseImage(user);
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    await waitFor(() => expect(profileApi.uploadAvatar).toHaveBeenCalledWith("owner", approved.mediaUrl));
    expect(vi.mocked(uploadCloudinaryMedia).mock.calls[0][0]).toMatchObject({ name: "avatar.png", type: "image/png" });
    expect(screen.getByRole("img", { name: "Bach" })).toHaveAttribute("src", "https://cdn/old.jpg");
    expect(onApproved).not.toHaveBeenCalled();
    result({ ...approved, publicId: "old-upload" });
    expect(onApproved).not.toHaveBeenCalled();
    result(approved);
    await waitFor(() => expect(onApproved).toHaveBeenCalledOnce());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the old avatar and editable preview when moderation rejects the image", async () => {
    const user = userEvent.setup();
    const onApproved = renderUploader();
    await chooseImage(user);
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    await waitFor(() => expect(profileApi.uploadAvatar).toHaveBeenCalledOnce());
    result({ ...approved, result: "REJECTED" });
    expect(await screen.findByRole("alert")).toHaveTextContent("Ảnh không được chấp nhận");
    expect(screen.getByRole("button", { name: "Lưu" })).toBeEnabled();
    expect(onApproved).not.toHaveBeenCalled();
    expect(screen.getByRole("img", { name: "Bach" })).toHaveAttribute("src", "https://cdn/old.jpg");
  });

  it("retries the avatar API without uploading the same crop twice after a request error", async () => {
    const user = userEvent.setup();
    vi.mocked(profileApi.uploadAvatar).mockRejectedValueOnce(new Error("Network unavailable"));
    renderUploader();
    await chooseImage(user);
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Network unavailable");
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    await waitFor(() => expect(profileApi.uploadAvatar).toHaveBeenCalledTimes(2));
    expect(uploadCloudinaryMedia).toHaveBeenCalledOnce();
  });

  it("does not get stuck when approval arrives before the API response", async () => {
    const user = userEvent.setup();
    let accept!: (value: { userId: string; status: "PENDING_SCAN" }) => void;
    vi.mocked(profileApi.uploadAvatar).mockImplementation(() => new Promise((resolve) => { accept = resolve; }));
    const onApproved = renderUploader();
    await chooseImage(user);
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    await waitFor(() => expect(profileApi.uploadAvatar).toHaveBeenCalledOnce());
    result(approved);
    await act(async () => accept({ userId: "owner", status: "PENDING_SCAN" }));
    expect(onApproved).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Đổi ảnh đại diện" })).toBeEnabled();
  });

  it("releases the controls after a missed moderation event without resubmitting", async () => {
    const user = userEvent.setup();
    renderUploader();
    await chooseImage(user);
    vi.useFakeTimers();
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Lưu" })));
    await act(async () => vi.advanceTimersByTimeAsync(90_000));
    expect(screen.getByRole("button", { name: "Đổi ảnh đại diện" })).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent("Ảnh vẫn đang được xử lý");
    expect(profileApi.uploadAvatar).toHaveBeenCalledOnce();
  });

  it("accepts a new image after early approval and ignores the old HTTP error", async () => {
    const user = userEvent.setup();
    let rejectOld!: (error: Error) => void;
    vi.mocked(profileApi.uploadAvatar).mockImplementationOnce(() => new Promise((_resolve, reject) => { rejectOld = reject; }));
    renderUploader();
    await chooseImage(user);
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    await waitFor(() => expect(profileApi.uploadAvatar).toHaveBeenCalledOnce());
    result(approved);
    await chooseImage(user);
    vi.mocked(uploadCloudinaryMedia).mockResolvedValueOnce({ secureUrl: "https://cdn/second.png", publicId: "folder/second", resourceType: "image", bytes: 100, fileName: "avatar.png", mimeType: "image/png" });
    await user.click(screen.getByRole("button", { name: "Lưu" }));
    await waitFor(() => expect(profileApi.uploadAvatar).toHaveBeenCalledTimes(2));
    await act(async () => rejectOld(new Error("old request failed")));
    expect(screen.queryByText("old request failed")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Lưu" })).toBeDisabled();
  });
});
