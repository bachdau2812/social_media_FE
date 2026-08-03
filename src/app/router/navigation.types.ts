export type ViewKey = "home" | "search" | "create" | "profile" | "connections" | "notifications" | "library" | "settings" | "chat" | "states";

export type AppDestination =
  | { kind: "home" }
  | { kind: "search"; query?: string }
  | { kind: "notifications" }
  | { kind: "library"; tab?: "saved" | "drafts" | "archive" }
  | { kind: "settings"; section?: string }
  | { kind: "profile"; userId: string }
  | { kind: "post"; postId: string; commentId?: string }
  | { kind: "conversation"; conversationId: string; messageId?: string }
  | { kind: "story"; ownerId: string; storyId?: string; scoped?: boolean };
