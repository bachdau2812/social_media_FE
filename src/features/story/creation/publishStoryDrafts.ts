import type { StoryCreateRequestDto } from "../api/story.api";
import type { StoryDraft } from "./storyDraft";
import { storyPublicationFields } from "./storyPublication";

export type StoryMediaUploadResult = {
  secureUrl: string;
  publicId?: string;
  resourceType?: string;
};

export type StoryDraftStatusPatch = Pick<StoryDraft, "status" | "error">;

export type PublishStoryDraftDependencies = {
  uploadDraft: (draft: StoryDraft) => Promise<StoryMediaUploadResult>;
  createStory: (request: StoryCreateRequestDto) => Promise<unknown>;
  updateDraft: (draftId: string, patch: StoryDraftStatusPatch) => void;
};

export type PublishStoryDraftResult = {
  failedCount: number;
  firstFailureMessage: string;
};

export async function publishStoryDrafts(
  userId: string,
  drafts: StoryDraft[],
  publicationId: string,
  dependencies: PublishStoryDraftDependencies,
): Promise<PublishStoryDraftResult> {
  let failedCount = 0;
  let firstFailureMessage = "";

  for (const [draftIndex, draft] of drafts.entries()) {
    if (draft.status === "published") continue;
    try {
      dependencies.updateDraft(draft.id, { status: "uploading", error: undefined });
      const upload = await dependencies.uploadDraft(draft);
      dependencies.updateDraft(draft.id, { status: "publishing", error: undefined });
      await dependencies.createStory({
        userId,
        mediaUrl: upload.secureUrl,
        musicId: draft.music?.id ?? null,
        musicUrl: null,
        musicStart: draft.music ? draft.musicStart : null,
        musicEnd: draft.music ? draft.musicEnd : null,
        ...storyPublicationFields(publicationId, draftIndex, drafts.length),
      });
      dependencies.updateDraft(draft.id, { status: "published", error: undefined });
    } catch (error) {
      failedCount += 1;
      const message = error instanceof Error ? error.message : "Không thể đăng Story.";
      firstFailureMessage ||= message;
      dependencies.updateDraft(draft.id, { status: "failed", error: message });
    }
  }

  return { failedCount, firstFailureMessage };
}
