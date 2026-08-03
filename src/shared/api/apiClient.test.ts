import { afterEach, describe, expect, it, vi } from "vitest";
import { apiGet, apiSend } from "./apiClient";
import { ApiError } from "./apiError";

afterEach(() => vi.unstubAllGlobals());

describe("apiClient", () => {
  it("returns undefined for a successful response without a body", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 204 })));

    await expect(apiSend<void>("/stories/story-1", "DELETE")).resolves.toBeUndefined();
  });

  it("normalizes a backend permission error without exposing a transport-only message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({
      code: 40301,
      message: "permission denied",
      traceId: "trace-7",
    }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })));

    const error = await apiGet("/private").catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      category: "permission",
      status: 403,
      code: 40301,
      traceId: "trace-7",
      backendMessage: "permission denied",
    });
  });

  it("normalizes a fetch failure as a network error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("Failed to fetch"); }));

    const error = await apiGet("/home").catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ category: "network", status: 0, path: "/home" });
  });

  it("forwards AbortSignal on write requests", async () => {
    const controller = new AbortController();
    const fetchRequest = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      expect(init?.signal).toBe(controller.signal);
      return new Response(JSON.stringify({ result: { saved: true } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchRequest);

    await expect(apiSend<{ saved: boolean }>("/settings", "PUT", {}, { signal: controller.signal }))
      .resolves.toEqual({ saved: true });
  });
});
