import { afterEach, describe, expect, it } from "vitest";
import { clearStoredFullChatTarget, readStoredFullChatTarget, writeStoredFullChatTarget } from "./chatNavigationPersistence";

afterEach(() => {
  sessionStorage.clear();
});

describe("full chat navigation persistence", () => {
  it("restores the active conversation after a page reload", () => {
    writeStoredFullChatTarget({ conversationId: "conversation-42", messageSeq: 15, panel: "details" });

    expect(readStoredFullChatTarget()).toEqual({
      conversationId: "conversation-42",
      messageSeq: 15,
      panel: "details",
    });
  });

  it("ignores malformed stored chat targets", () => {
    sessionStorage.setItem("social-media-full-chat-target", "{");

    expect(readStoredFullChatTarget()).toBeNull();
  });

  it("clears the active conversation when leaving the conversation pane", () => {
    writeStoredFullChatTarget({ conversationId: "conversation-42" });
    clearStoredFullChatTarget();

    expect(readStoredFullChatTarget()).toBeNull();
  });
});
