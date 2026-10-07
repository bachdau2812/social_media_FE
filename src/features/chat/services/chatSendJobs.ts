export type UploadedChatMedia = {
  secureUrl: string;
  publicId: string;
  width?: number;
  height?: number;
};

type SendJob = {
  clientMessageId: string;
  uploadedMedia?: UploadedChatMedia;
  uploadPromise?: Promise<UploadedChatMedia>;
  textReplyInitialized?: boolean;
  textReplyToSeq?: number | null;
  updatedAt: number;
};

const JOB_TTL_MS = 30 * 60 * 1000;
const MAX_JOBS = 500;

function newClientMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    return (character === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

class ChatSendJobStore {
  private readonly jobs = new Map<string, SendJob>();

  clientMessageId(key: string) {
    return this.getOrCreate(key).clientMessageId;
  }

  textReplyToSeq(key: string, proposed: number | null) {
    const job = this.getOrCreate(key);
    if (!job.textReplyInitialized) {
      job.textReplyInitialized = true;
      job.textReplyToSeq = proposed;
    }
    return job.textReplyToSeq ?? null;
  }

  upload(key: string, performUpload: () => Promise<UploadedChatMedia>): Promise<UploadedChatMedia> {
    const job = this.getOrCreate(key);
    if (job.uploadedMedia) return Promise.resolve(job.uploadedMedia);
    if (job.uploadPromise) return job.uploadPromise;

    job.uploadPromise = performUpload().then((uploaded) => {
      job.uploadedMedia = uploaded;
      job.uploadPromise = undefined;
      job.updatedAt = Date.now();
      return uploaded;
    }).catch((error: unknown) => {
      job.uploadPromise = undefined;
      job.updatedAt = Date.now();
      throw error;
    });
    return job.uploadPromise;
  }

  complete(key: string) {
    this.jobs.delete(key);
  }

  retainUser(userId: string) {
    for (const key of this.jobs.keys()) {
      if (!key.startsWith(`${userId}\u0000`)) this.jobs.delete(key);
    }
  }

  clear() {
    this.jobs.clear();
  }

  private getOrCreate(key: string) {
    const now = Date.now();
    for (const [candidate, job] of this.jobs) {
      if (!job.uploadPromise && now - job.updatedAt > JOB_TTL_MS) this.jobs.delete(candidate);
    }
    let job = this.jobs.get(key);
    if (!job) {
      while (this.jobs.size >= MAX_JOBS) {
        const oldest = this.jobs.keys().next().value;
        if (!oldest) break;
        this.jobs.delete(oldest);
      }
      job = { clientMessageId: newClientMessageId(), updatedAt: now };
      this.jobs.set(key, job);
    } else {
      job.updatedAt = now;
    }
    return job;
  }
}

export const chatSendJobs = new ChatSendJobStore();

export function mediaSendJobKey(userId: string, conversationId: string, attachmentId: string) {
  return `${userId}\u0000${conversationId}\u0000media:${attachmentId}`;
}

export function textSendJobKey(userId: string, conversationId: string, text: string) {
  return `${userId}\u0000${conversationId}\u0000text:${text}`;
}
