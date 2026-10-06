import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "../../../shared/api";
import { PostInteractionTracker } from "./postInteractionTracker";
import type { ApiRequestOptions } from "../../../shared/api";
import type { PostInteractionRequest } from "./post.dto";

const send = vi.fn(async (_request: PostInteractionRequest, _options: ApiRequestOptions) => ({ eventId: "accepted", computedScore: 1, duplicate: false }));
let tracker: PostInteractionTracker;
let sequence: number;
beforeEach(() => {
  vi.useFakeTimers();
  sequence = 0;
  send.mockReset().mockResolvedValue({ eventId: "accepted", computedScore: 1, duplicate: false });
  tracker = new PostInteractionTracker(send, () => Date.now(), () => `00000000-0000-4000-8000-${String(++sequence).padStart(12, "0")}`);
});
afterEach(() => { tracker?.dispose(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("foreground post dwell", () => {
  it("reports only after 30 and 60 completed seconds", async () => {
    const feed = tracker.attach("post-1");
    feed.setVisible(true);
    await vi.advanceTimersByTimeAsync(30_000);
    expect(send).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1_000);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0]).toMatchObject({ postId: "post-1", isClick: false, viewTime: 31 });
    await vi.advanceTimersByTimeAsync(29_000);
    expect(send).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1_000);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1][0]).toMatchObject({ isClick: false, viewTime: 61 });
    expect(send.mock.calls[1][0].impressionId).toBe(send.mock.calls[0][0].impressionId);
    expect(send.mock.calls[1][0].eventId).not.toBe(send.mock.calls[0][0].eventId);
  });

  it("pauses instead of counting hidden time", async () => {
    const feed = tracker.attach("post-1");
    feed.setVisible(true);
    await vi.advanceTimersByTimeAsync(20_000);
    feed.setVisible(false);
    await vi.advanceTimersByTimeAsync(120_000);
    expect(send).not.toHaveBeenCalled();
    feed.setVisible(true);
    await vi.advanceTimersByTimeAsync(11_000);
    expect(send.mock.calls[0][0].viewTime).toBe(31);
  });

  it("keeps a single clock and click across feed/detail handoff", async () => {
    const feed = tracker.attach("post-1");
    feed.setVisible(true);
    await vi.advanceTimersByTimeAsync(20_000);
    feed.click();
    const detail = tracker.attach("post-1");
    detail.click();
    detail.setVisible(true);
    await vi.advanceTimersByTimeAsync(5_000);
    feed.setVisible(false);
    feed.detach();
    await vi.advanceTimersByTimeAsync(6_000);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0][0]).toMatchObject({ isClick: true, viewTime: 20 });
    expect(send.mock.calls[1][0]).toMatchObject({ isClick: true, viewTime: 31 });
    expect(send.mock.calls[1][0].impressionId).toBe(send.mock.calls[0][0].impressionId);
  });

  it("creates a fresh impression when a display episode has ended", async () => {
    const first = tracker.attach("post-1");
    first.click();
    first.detach();
    await Promise.resolve();
    const second = tracker.attach("post-1");
    second.click();
    expect(send.mock.calls[1][0].impressionId).not.toBe(send.mock.calls[0][0].impressionId);
  });

  it("preserves the episode during StrictMode-style effect replay", async () => {
    const first = tracker.attach("post-1");
    first.click();
    first.detach();
    const replay = tracker.attach("post-1");
    replay.click();
    await Promise.resolve();
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("starts fresh dwell after an impression has exceeded the server report span", async () => {
    const feed = tracker.attach("post-1");
    feed.setVisible(true);
    feed.click();
    await vi.advanceTimersByTimeAsync(31_000);
    feed.setVisible(false);
    await vi.advanceTimersByTimeAsync(2 * 60 * 60 * 1000);
    feed.setVisible(true);
    await vi.advanceTimersByTimeAsync(30_000);
    expect(send).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1_000);
    expect(send).toHaveBeenCalledTimes(3);
    expect(send.mock.calls[2][0]).toMatchObject({ isClick: false, viewTime: 31 });
    expect(send.mock.calls[2][0].impressionId).not.toBe(send.mock.calls[0][0].impressionId);
  });

  it("floors dwell and caps late callbacks at 3600 seconds", () => {
    let now = 0;
    const delayed = new PostInteractionTracker(send, () => now);
    const feed = delayed.attach("post-1");
    feed.setVisible(true);
    now = 12_999;
    feed.click();
    expect(send.mock.calls[0][0].viewTime).toBe(12);
    now = 4_000_000;
    feed.setVisible(false);
    expect(send.mock.calls[1][0].viewTime).toBe(3600);
    delayed.dispose();
  });
});

describe("interaction delivery", () => {
  it("uses valid UUIDs on HTTP origins without crypto.randomUUID", () => {
    const getRandomValues = crypto.getRandomValues.bind(crypto);
    vi.stubGlobal("crypto", { getRandomValues });
    const httpTracker = new PostInteractionTracker(send);
    httpTracker.attach("post-1").click();
    const body = send.mock.calls[0][0];
    const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    expect(body.eventId).toMatch(uuid);
    expect(body.impressionId).toMatch(uuid);
    expect(body.eventId).not.toBe(body.impressionId);
    httpTracker.dispose();
  });

  it("retries transient failures with the exact immutable event and body", async () => {
    send.mockRejectedValueOnce(new ApiError("POST", "/posts/interaction", 0));
    const feed = tracker.attach("post-1");
    feed.setVisible(true);
    feed.click();
    await vi.advanceTimersByTimeAsync(1_000);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1][0]).toBe(send.mock.calls[0][0]);
    expect(Object.isFrozen(send.mock.calls[0][0])).toBe(true);
  });

  it.each([400, 401, 403, 404, 409])("does not retry terminal HTTP %i", async (status) => {
    send.mockRejectedValue(new ApiError("POST", "/posts/interaction", status));
    tracker.attach("post-1").click();
    await vi.advanceTimersByTimeAsync(20_000);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("stops submitting optional telemetry when ingestion is disabled", async () => {
    send.mockRejectedValue(new ApiError("POST", "/posts/interaction", 503, { code: 1143 }));
    tracker.attach("post-1").click();
    await vi.advanceTimersByTimeAsync(1_000);
    tracker.attach("post-2").click();
    await vi.advanceTimersByTimeAsync(20_000);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("bounds retries to three attempts", async () => {
    send.mockRejectedValue(new ApiError("POST", "/posts/interaction", 500));
    tracker.attach("post-1").click();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(send).toHaveBeenCalledTimes(3);
  });

  it("cancels pending retries when the authenticated viewer leaves", async () => {
    send.mockRejectedValue(new ApiError("POST", "/posts/interaction", 0));
    tracker.attach("post-1").click();
    await Promise.resolve();
    tracker.dispose();
    await vi.advanceTimersByTimeAsync(20_000);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][1].signal?.aborted).toBe(true);
    tracker.attach("post-2").click();
    expect(send).toHaveBeenCalledTimes(1);
  });
});
