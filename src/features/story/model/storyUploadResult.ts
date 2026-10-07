export type StoryUploadResult = {
  success: boolean;
  message?: string;
  result?: string;
};

export function parseStoryUploadResult(payload: string): StoryUploadResult {
  try {
    const value: unknown = JSON.parse(payload);
    if (!value || typeof value !== "object") return { success: false };
    const data = value as Record<string, unknown>;
    const result = typeof data.result === "string" ? data.result : undefined;
    return {
      success: result?.toUpperCase() === "APPROVED",
      message: typeof data.message === "string" ? data.message : undefined,
      result,
    };
  } catch {
    return { success: false };
  }
}
