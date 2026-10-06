import { describe, expect, it } from "vitest";
import { canonicalAppPath, destinationPath, readAppRoute } from "./appRoute";

const location = (url: string) => { const parsed = new URL(url, "https://example.test"); return { pathname: parsed.pathname, search: parsed.search }; };

describe("resource URLs", () => {
  it.each([
    ["/", { view: "home", known: true }],
    ["/profile/user%20one", { view: "profile", profileUserId: "user one" }],
    ["/post/post-1?commentId=c-2", { view: "home", postId: "post-1", commentId: "c-2" }],
    ["/chat/group-1?messageSeq=42&panel=requests", { view: "chat", chatTarget: { conversationId: "group-1", messageSeq: 42, panel: "requests" } }],
    ["/story/user-1/story-2", { story: { kind: "story", ownerId: "user-1", storyId: "story-2", scope: "single" } }],
    ["/create/story", { view: "home", createStory: true }],
    ["/search?q=hello%20world", { view: "search", query: "hello world" }],
    ["/library?tab=archive", { view: "library", libraryTab: "archive" }],
    ["/settings/privacy", { view: "settings", settingsSection: "privacy" }],
  ])("reads %s", (url, expected) => expect(readAppRoute(location(url))).toMatchObject(expected));

  it.each(["/unknown", "/post/%E0%A4%A", "/post", "/profile/a/b", "/settings/missing"])("rejects an unknown/malformed resource %s", (url) => {
    expect(readAppRoute(location(url)).known).toBe(false);
  });

  it("does not interpret invalid message cursors as a focus request", () => {
    expect(readAppRoute(location("/chat/group-1?messageSeq=-1")).chatTarget).toEqual({ conversationId: "group-1" });
  });

  it("builds resource URLs with encoded IDs and focus metadata", () => {
    expect(destinationPath({ kind: "post", postId: "post one", commentId: "comment/two" })).toBe("/post/post%20one?commentId=comment%2Ftwo");
    expect(destinationPath({ kind: "conversation", conversationId: "group one", messageSeq: 3, panel: "details" })).toBe("/chat/group%20one?messageSeq=3&panel=details");
  });

  it.each([
    ["/app/posts/post-1?commentId=c-2", "/post/post-1?commentId=c-2"],
    ["/profiles/user-1", "/profile/user-1"],
    ["/messages?conversationId=group-1&messageSeq=7", "/chat/group-1?messageSeq=7"],
    ["/?notificationTarget=post&postId=post-1", "/post/post-1"],
    ["/stories?ownerId=u-1&storyId=s-1&storyScope=single", "/story/u-1/s-1?scope=single"],
  ])("normalizes legacy %s", (url, expected) => expect(canonicalAppPath(location(url))).toBe(expected));

  it("leaves a canonical resource URL intact", () => {
    expect(canonicalAppPath(location("/post/post-1?commentId=c-2"))).toBeNull();
  });
});
