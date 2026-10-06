import { ApiError, type ApiRequestOptions } from "../../../shared/api";
import type { PostInteractionAcceptedResponse, PostInteractionRequest } from "./post.dto";

type Sender = (request: PostInteractionRequest, options: ApiRequestOptions) => Promise<PostInteractionAcceptedResponse>;
type Episode = {
  postId: string;
  impressionId: string;
  handles: Set<PostInteractionHandle>;
  visible: Set<PostInteractionHandle>;
  elapsed: number;
  startedAt: number | null;
  clicked: boolean;
  reportedContribution: number;
  firstReportedAt: number | null;
  timer?: ReturnType<typeof setTimeout>;
};
type PendingReport = {
  body: PostInteractionRequest;
  controller: AbortController;
  attempts: number;
  timer?: ReturnType<typeof setTimeout>;
};

export type PostInteractionHandle = {
  setVisible(visible: boolean): void;
  click(): void;
  detach(): void;
};

const DWELL_MILESTONES = [31_000, 61_000];
const MAX_DWELL_MS = 3_600_000;
const MAX_PENDING_REPORTS = 100;
// Leave room for delivery/retry latency within the backend's two-hour report span.
const MAX_IMPRESSION_AGE_MS = 2 * 60 * 60 * 1000 - 30_000;

function interactionUuid(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  // getRandomValues remains available on local/LAN HTTP origins.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** One foreground clock per display episode, shared by its presentation surfaces. */
export class PostInteractionTracker {
  private episodes = new Map<string, Episode>();
  private pending = new Set<PendingReport>();
  private stopped = false;
  private ownerVersion = 0;

  constructor(
    private send: Sender,
    private now: () => number = () => performance.now(),
    private uuid: () => string = interactionUuid,
    private wallNow: () => number = () => Date.now(),
  ) {}

  /** Deferring final disposal lets React StrictMode replay effects on this instance. */
  retain(): () => void {
    const version = ++this.ownerVersion;
    return () => queueMicrotask(() => {
      if (version === this.ownerVersion) this.dispose();
    });
  }

  attach(postId: string): PostInteractionHandle {
    let episode = this.episodes.get(postId);
    if (!episode) {
      episode = {
        postId, impressionId: this.uuid(), handles: new Set(), visible: new Set(),
        elapsed: 0, startedAt: null, clicked: false, reportedContribution: 0, firstReportedAt: null,
      };
      if (!this.stopped) this.episodes.set(postId, episode);
    }
    const current = episode;
    let detached = false;
    const handle: PostInteractionHandle = {
      setVisible: (visible) => {
        if (detached || this.stopped) return;
        if (visible) this.refreshExpiredEpisode(current);
        this.accountTime(current);
        if (visible) current.visible.add(handle);
        else current.visible.delete(handle);
        this.reconcileClock(current);
      },
      click: () => {
        if (detached || this.stopped) return;
        this.refreshExpiredEpisode(current);
        this.accountTime(current);
        current.clicked = true;
        this.publishProgress(current);
        this.reconcileClock(current);
      },
      detach: () => {
        if (detached) return;
        handle.setVisible(false);
        detached = true;
        current.handles.delete(handle);
        // Keep the identity through synchronous surface handoff and effect replay.
        queueMicrotask(() => {
          if (!current.handles.size && this.episodes.get(postId) === current) {
            clearTimeout(current.timer);
            this.episodes.delete(postId);
          }
        });
      },
    };
    current.handles.add(handle);
    return handle;
  }

  dispose(): void {
    this.stopped = true;
    this.episodes.forEach((episode) => clearTimeout(episode.timer));
    this.episodes.clear();
    this.pending.forEach((report) => {
      clearTimeout(report.timer);
      report.controller.abort();
    });
    this.pending.clear();
  }

  private accountTime(episode: Episode): void {
    if (episode.startedAt === null) return;
    const time = this.now();
    episode.elapsed = Math.min(MAX_DWELL_MS, episode.elapsed + Math.max(0, time - episode.startedAt));
    episode.startedAt = time;
    this.publishProgress(episode);
  }

  private reconcileClock(episode: Episode): void {
    clearTimeout(episode.timer);
    episode.startedAt = episode.visible.size ? this.now() : null;
    if (episode.startedAt === null || this.stopped) return;
    const next = DWELL_MILESTONES.find((milestone) => milestone > episode.elapsed);
    if (next === undefined) return;
    episode.timer = setTimeout(() => {
      this.accountTime(episode);
      this.reconcileClock(episode);
    }, next - episode.elapsed);
  }

  private publishProgress(episode: Episode): void {
    this.refreshExpiredEpisode(episode);
    const viewTime = Math.floor(episode.elapsed / 1000);
    // Milestones only decide when to send; the backend remains the scoring authority.
    const contribution = (episode.clicked ? 1 : 0) + (viewTime > 60 ? 2 : viewTime > 30 ? 1 : 0);
    if (this.stopped || contribution <= episode.reportedContribution) return;
    episode.reportedContribution = contribution;
    if (this.pending.size >= MAX_PENDING_REPORTS) return;
    episode.firstReportedAt ??= this.wallNow();
    const report: PendingReport = {
      body: Object.freeze({
        postId: episode.postId, isClick: episode.clicked, viewTime,
        eventId: this.uuid(), impressionId: episode.impressionId,
      }),
      controller: new AbortController(), attempts: 0,
    };
    this.pending.add(report);
    void this.deliver(report);
  }

  private refreshExpiredEpisode(episode: Episode): void {
    if (episode.firstReportedAt === null || this.wallNow() - episode.firstReportedAt < MAX_IMPRESSION_AGE_MS) return;
    clearTimeout(episode.timer);
    episode.impressionId = this.uuid();
    episode.elapsed = 0;
    episode.startedAt = episode.visible.size ? this.now() : null;
    episode.clicked = false;
    episode.reportedContribution = 0;
    episode.firstReportedAt = null;
  }

  private async deliver(report: PendingReport): Promise<void> {
    if (this.stopped || report.controller.signal.aborted) return;
    report.attempts += 1;
    try {
      await this.send(report.body, { signal: report.controller.signal });
      this.pending.delete(report);
    } catch (error) {
      if (this.stopped) return;
      if (error instanceof ApiError && error.status === 503 && String(error.code) === "1143") {
        // Ingestion is an optional server feature. Avoid a request storm when disabled.
        this.dispose();
        return;
      }
      const retryable = error instanceof ApiError && (error.status === 0 || error.status === 429 || error.status >= 500);
      if (retryable && report.attempts < 3) {
        report.timer = setTimeout(() => void this.deliver(report), report.attempts === 1 ? 1_000 : 4_000);
      } else {
        this.pending.delete(report);
      }
    }
  }
}
