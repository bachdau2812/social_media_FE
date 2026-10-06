import { beforeEach, describe, expect, it, vi } from "vitest";
import { MessageForwarding } from "./messageForwarding";
const api = vi.hoisted(() => ({ direct: vi.fn(), forward: vi.fn(), group: vi.fn() }));
const realtime = vi.hoisted(() => ({ publishLocalMessage: vi.fn() }));
vi.mock("../api/chat.api", () => ({ chatApi: api }));
vi.mock("./chatRealtime", () => ({ chatRealtime: realtime }));
beforeEach(() => { Object.values(api).forEach((mock) => mock.mockReset()); realtime.publishLocalMessage.mockClear(); });

describe("independent recipient forwarding", () => {
  it("limits concurrent destinations and does not duplicate sends while running", async () => {
    const pending: (() => void)[] = [];
    let active = 0, peak = 0;
    api.direct.mockImplementation((_actor, user: string) => Promise.resolve({ id: `direct-${user}` }));
    api.forward.mockImplementation((conversationId: string) => new Promise((resolve) => {
      active += 1; peak = Math.max(peak, active);
      pending.push(() => { active -= 1; resolve({ id: conversationId, conversationId, messageSeq: 1, senderId: "me", messageType: "IMAGE", metadata: { url: "original.jpg" } }); });
    }));
    const forwarding = new MessageForwarding("me", "source-c", "source-m");
    const request = forwarding.send(["a", "b", "c", "d", "e", "a"]);
    await vi.waitFor(() => expect(pending).toHaveLength(3));
    await forwarding.send(["a", "b"]);
    expect(api.direct).toHaveBeenCalledTimes(3);
    pending.splice(0).forEach((resolve) => resolve());
    await vi.waitFor(() => expect(pending).toHaveLength(2));
    pending.splice(0).forEach((resolve) => resolve()); await request;
    expect(peak).toBe(3); expect(api.forward).toHaveBeenCalledTimes(5);
    expect(new Set(api.forward.mock.calls.map((call) => call[2].clientMessageId)).size).toBe(5);
    expect(api.forward.mock.calls[0][2]).toEqual({ sourceConversationId: "source-c", sourceMessageId: "source-m", clientMessageId: expect.any(String) });
  });
  it("cancels queued destinations and ignores late publication after account/dialog cleanup", async () => {
    const pending: ((value: unknown) => void)[] = [];
    api.direct.mockImplementation((_actor, user: string) => Promise.resolve({ id: `direct-${user}` }));
    api.forward.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));
    const forwarding = new MessageForwarding("me", "source-c", "source-m");
    const request = forwarding.send(["a", "b", "c", "d"]);
    await vi.waitFor(() => expect(pending).toHaveLength(3)); forwarding.cancel();
    pending.forEach((resolve) => resolve({ id: "late", conversationId: "d", messageSeq: 1, senderId: "me", messageType: "TEXT" })); await request;
    expect(api.direct).toHaveBeenCalledTimes(3); expect(realtime.publishLocalMessage).not.toHaveBeenCalled();
    await forwarding.send(["e"]); expect(api.direct).toHaveBeenCalledTimes(3);
  });
  it("reuses successful recipients and failed recipient keys/destination on retry", async () => {
    api.direct.mockImplementation((_actor, user: string) => Promise.resolve({ id: `direct-${user}` }));
    api.forward.mockResolvedValueOnce({ id: "sent", conversationId: "direct-a", messageSeq: 1, messageType: "TEXT", senderId: "me" }).mockRejectedValueOnce(new Error("offline"));
    const forwarding = new MessageForwarding("me", "source-c", "source-m");
    await forwarding.send(["a", "b"]);
    expect(forwarding.results()).toMatchObject([{ userId: "a", status: "sent" }, { userId: "b", status: "error" }]);
    const retryBody = api.forward.mock.calls[1][2];
    api.forward.mockResolvedValueOnce({ id: "sent-b", conversationId: "direct-b", messageSeq: 1, messageType: "TEXT", senderId: "me" });
    await forwarding.send(["a", "b"]);
    expect(api.direct).toHaveBeenCalledTimes(2);
    expect(api.forward).toHaveBeenCalledTimes(3);
    expect(api.forward.mock.calls[2]).toEqual(["direct-b", "me", retryBody]);
    expect(api.group).not.toHaveBeenCalled();
    expect(realtime.publishLocalMessage).toHaveBeenCalledTimes(2);
  });
});
