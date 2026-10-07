import { afterEach, describe, expect, it, vi } from "vitest";
import { chatSendJobs, mediaSendJobKey, textSendJobKey } from "./chatSendJobs";

afterEach(() => chatSendJobs.clear());

describe("chatSendJobs", () => {
  it("keeps one client message ID until the persisted response completes the job", () => {
    const key = mediaSendJobKey("actor", "conversation", "attachment");
    const firstId = chatSendJobs.clientMessageId(key);

    expect(chatSendJobs.clientMessageId(key)).toBe(firstId);
    chatSendJobs.complete(key);
    expect(chatSendJobs.clientMessageId(key)).not.toBe(firstId);
  });

  it("reuses a successful upload after the message request needs retry", async () => {
    const key = mediaSendJobKey("actor", "conversation", "attachment");
    const upload = vi.fn().mockResolvedValue({ secureUrl: "https://cdn.test/image.png", publicId: "image", width: 80, height: 60 });

    const first = await chatSendJobs.upload(key, upload);
    const retry = await chatSendJobs.upload(key, upload);

    expect(retry).toBe(first);
    expect(upload).toHaveBeenCalledTimes(1);
  });

  it("retains the original text reply target when an earlier attachment succeeded", () => {
    const key = textSendJobKey("actor", "conversation", "hello");

    expect(chatSendJobs.textReplyToSeq(key, null)).toBeNull();
    const clientMessageId = chatSendJobs.clientMessageId(key);
    expect(chatSendJobs.textReplyToSeq(key, 12)).toBeNull();
    expect(chatSendJobs.clientMessageId(key)).toBe(clientMessageId);
  });
});
