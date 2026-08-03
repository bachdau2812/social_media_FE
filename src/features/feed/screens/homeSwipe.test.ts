import { describe, expect, it } from "vitest";
import { shouldStartFeedTabSwipe } from "./homeSwipe";

describe("shouldStartFeedTabSwipe", () => {
  it("does not steal horizontal gestures from story rails or post media", () => {
    document.body.innerHTML = `
      <section class="feed-screen">
        <div class="story-strip"><button id="story">Story</button></div>
        <div class="post-media-frame"><video id="media"></video></div>
        <article id="caption">Caption</article>
      </section>
    `;

    expect(shouldStartFeedTabSwipe(document.querySelector("#story"))).toBe(false);
    expect(shouldStartFeedTabSwipe(document.querySelector("#media"))).toBe(false);
    expect(shouldStartFeedTabSwipe(document.querySelector("#caption"))).toBe(true);
  });
});
