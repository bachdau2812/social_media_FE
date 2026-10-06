import { StrictMode, type ReactNode } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { postApi } from "../api/post.api";
import { PostInteractionProvider } from "./PostInteractionProvider";
import { usePostInteraction } from "./usePostInteraction";

const observers = new Map<Element, IntersectionObserverCallback>();
class Observer {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) { observers.set(target, this.callback); }
  disconnect() {}
}
function visibility(target: Element, ratio: number) {
  act(() => observers.get(target)?.([{ target, isIntersecting: ratio > 0, intersectionRatio: ratio } as IntersectionObserverEntry], {} as IntersectionObserver));
}
function Surface({ surface = "feed", postId = "post-1", viewerId = "viewer-1" }: { surface?: "feed" | "detail"; postId?: string; viewerId?: string }) {
  const interaction = usePostInteraction(postId, viewerId, surface);
  return <button ref={interaction.ref} onClick={interaction.click}>{surface}</button>;
}
function Provider({ children, feedBlocked = false, detailBlocked = false, viewerId = "viewer-1" }: { children: ReactNode; feedBlocked?: boolean; detailBlocked?: boolean; viewerId?: string }) {
  return <PostInteractionProvider viewerId={viewerId} feedBlocked={feedBlocked} detailBlocked={detailBlocked}>{children}</PostInteractionProvider>;
}

beforeEach(() => {
  vi.useFakeTimers();
  observers.clear();
  vi.stubGlobal("IntersectionObserver", Observer);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  vi.spyOn(postApi, "recordInteraction").mockResolvedValue({ eventId: "accepted", computedScore: 1, duplicate: false });
});
afterEach(async () => {
  cleanup();
  await act(async () => {});
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it("counts only content visible at the approved 50% threshold", async () => {
  render(<Provider><Surface /></Provider>);
  const feed = screen.getByText("feed");
  visibility(feed, 0.49);
  await act(() => vi.advanceTimersByTimeAsync(60_000));
  expect(postApi.recordInteraction).not.toHaveBeenCalled();
  visibility(feed, 0.5);
  await act(() => vi.advanceTimersByTimeAsync(31_000));
  expect(postApi.recordInteraction).toHaveBeenCalledWith(expect.objectContaining({ viewTime: 31, isClick: false }), expect.anything());
});

it("does not fabricate dwell when IntersectionObserver is unsupported", async () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  render(<Provider><Surface /></Provider>);
  await act(() => vi.advanceTimersByTimeAsync(61_000));
  expect(postApi.recordInteraction).not.toHaveBeenCalled();
  fireEvent.click(screen.getByText("feed"));
  expect(postApi.recordInteraction).toHaveBeenCalledWith(expect.objectContaining({ isClick: true, viewTime: 0 }), expect.anything());
});

it("excludes the time spent with the document hidden", async () => {
  render(<Provider><Surface /></Provider>);
  visibility(screen.getByText("feed"), 1);
  await act(() => vi.advanceTimersByTimeAsync(20_000));
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  fireEvent(document, new Event("visibilitychange"));
  await act(() => vi.advanceTimersByTimeAsync(100_000));
  expect(postApi.recordInteraction).not.toHaveBeenCalled();
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  fireEvent(document, new Event("visibilitychange"));
  await act(() => vi.advanceTimersByTimeAsync(11_000));
  expect(postApi.recordInteraction).toHaveBeenCalledWith(expect.objectContaining({ viewTime: 31 }), expect.anything());
});

it("pauses feed immediately when an overlay opens and resumes its elapsed time", async () => {
  const { rerender } = render(<Provider><Surface /></Provider>);
  visibility(screen.getByText("feed"), 1);
  await act(() => vi.advanceTimersByTimeAsync(20_000));
  rerender(<Provider feedBlocked><Surface /></Provider>);
  await act(() => vi.advanceTimersByTimeAsync(100_000));
  expect(postApi.recordInteraction).not.toHaveBeenCalled();
  rerender(<Provider><Surface /></Provider>);
  await act(() => vi.advanceTimersByTimeAsync(11_000));
  expect(postApi.recordInteraction).toHaveBeenCalledWith(expect.objectContaining({ viewTime: 31 }), expect.anything());
});

it("starts mounted feed content paused when an overlay already exists", async () => {
  const { rerender } = render(<Provider feedBlocked><Surface /></Provider>);
  visibility(screen.getByText("feed"), 1);
  await act(() => vi.advanceTimersByTimeAsync(61_000));
  expect(postApi.recordInteraction).not.toHaveBeenCalled();
  rerender(<Provider><Surface /></Provider>);
  await act(() => vi.advanceTimersByTimeAsync(31_000));
  expect(postApi.recordInteraction).toHaveBeenCalledTimes(1);
});

it("continues feed dwell in detail without doubling the click", async () => {
  const { rerender } = render(<Provider><Surface /></Provider>);
  visibility(screen.getByText("feed"), 1);
  await act(() => vi.advanceTimersByTimeAsync(20_000));
  fireEvent.click(screen.getByText("feed"));
  rerender(<Provider feedBlocked><Surface /><Surface surface="detail" /></Provider>);
  await act(() => vi.advanceTimersByTimeAsync(11_000));
  const calls = vi.mocked(postApi.recordInteraction).mock.calls;
  expect(calls).toHaveLength(2);
  expect(calls[0][0]).toMatchObject({ isClick: true, viewTime: 20 });
  expect(calls[1][0]).toMatchObject({ isClick: true, viewTime: 31, impressionId: calls[0][0].impressionId });
});

it("starts a new display episode when scrolled out and back in", async () => {
  render(<Provider><Surface /></Provider>);
  const feed = screen.getByText("feed");
  visibility(feed, 1);
  fireEvent.click(feed);
  visibility(feed, 0);
  await act(async () => {});
  visibility(feed, 1);
  fireEvent.click(feed);
  const calls = vi.mocked(postApi.recordInteraction).mock.calls;
  expect(calls).toHaveLength(2);
  expect(calls[1][0].impressionId).not.toBe(calls[0][0].impressionId);
});

it("does not double-report detail when React StrictMode replays effects", async () => {
  render(<StrictMode><Provider><Surface surface="detail" /></Provider></StrictMode>);
  await act(() => vi.advanceTimersByTimeAsync(31_000));
  expect(postApi.recordInteraction).toHaveBeenCalledTimes(2);
  expect(vi.mocked(postApi.recordInteraction).mock.calls[1][0].viewTime).toBe(31);
});

it("does not manufacture another detail click when an expired episode resumes", async () => {
  render(<Provider><Surface surface="detail" /></Provider>);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  fireEvent(document, new Event("visibilitychange"));
  await act(() => vi.advanceTimersByTimeAsync(2 * 60 * 60 * 1000));
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  fireEvent(document, new Event("visibilitychange"));
  expect(postApi.recordInteraction).toHaveBeenCalledTimes(1);
  await act(() => vi.advanceTimersByTimeAsync(31_000));
  const calls = vi.mocked(postApi.recordInteraction).mock.calls;
  expect(calls).toHaveLength(2);
  expect(calls[1][0]).toMatchObject({ isClick: false, viewTime: 31 });
  expect(calls[1][0].impressionId).not.toBe(calls[0][0].impressionId);
});

it("aborts previous viewer reports and skips mismatched viewer adapters", async () => {
  vi.mocked(postApi.recordInteraction).mockReturnValueOnce(new Promise(() => {}));
  const { rerender } = render(<Provider><Surface surface="detail" /></Provider>);
  const signal = vi.mocked(postApi.recordInteraction).mock.calls[0][1]?.signal;
  rerender(<Provider viewerId="viewer-2"><Surface surface="detail" viewerId="viewer-2" /></Provider>);
  await act(async () => {});
  expect(signal?.aborted).toBe(true);
  const count = vi.mocked(postApi.recordInteraction).mock.calls.length;
  rerender(<Provider viewerId="viewer-2"><Surface surface="detail" viewerId="viewer-1" postId="post-2" /></Provider>);
  expect(postApi.recordInteraction).toHaveBeenCalledTimes(count);
});
