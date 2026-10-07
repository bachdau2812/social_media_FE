import { describe, expect, it } from "vitest";
import { buildCreatePostRequest, buildPostDraftRequest, type PostCreationInput, type UploadedPostMedia } from "./postCreation";

const input: PostCreationInput = {
  userId: "user-1",
  caption: "caption",
  hashtags: "#first second, #third",
  mediaRatio: "16:9",
  sharedMusic: null,
  sharedStart: 0,
  sharedEnd: 30,
  media: [{
    id: "media-1",
    fileName: "photo.jpg",
    type: "IMAGE",
    file: null,
    itemCaption: "item caption",
    music: { id: "track-1", title: "Track", artist: "Artist", url: "track.mp3", artwork: "", duration: 60 },
    musicStart: 5,
    musicEnd: 20,
  }],
};
const uploads: UploadedPostMedia[] = [{
  secureUrl: "https://cdn.example/photo.jpg",
  publicId: "photo-1",
  resourceType: "image",
}];

describe("post creation workflow", () => {
  it("builds a publish request with normalized hashtags and ordered media fields", () => {
    expect(buildCreatePostRequest(input, uploads)).toEqual({
      userId: "user-1",
      content: "caption",
      hashtags: ["first", "second", "third"],
      mediaRatio: "16:9",
      musicId: null,
      musicStart: null,
      musicEnd: null,
      items: [{
        orderNumber: 1,
        secureUrl: "https://cdn.example/photo.jpg",
        publicId: "photo-1",
        resourceType: "image",
        caption: "item caption",
        musicId: "track-1",
        musicStart: 5,
        musicEnd: 20,
      }],
    });
  });

  it("persists the same media and music selection into the draft payload", () => {
    const draft = buildPostDraftRequest(input, uploads);

    expect(draft.captionPreview).toBe("caption");
    expect(draft.mediaCount).toBe(1);
    expect(draft.thumbnailUrl).toBe("https://cdn.example/photo.jpg");
    expect(JSON.parse(draft.payload)).toMatchObject({
      caption: "caption",
      hashtags: "#first second, #third",
      mediaRatio: "16:9",
      media: [{
        id: "media-1",
        secureUrl: "https://cdn.example/photo.jpg",
        publicId: "photo-1",
        musicId: "track-1",
        musicStart: 5,
        musicEnd: 20,
      }],
    });
  });

  it("stores shared music once and clears per-item music references", () => {
    const withSharedMusic = {
      ...input,
      sharedMusic: { id: "shared", title: "Shared", artist: "Artist", url: "shared.mp3", artwork: "", duration: 90 },
      sharedStart: 12,
      sharedEnd: 42,
    };

    expect(buildCreatePostRequest(withSharedMusic, uploads)).toMatchObject({
      musicId: "shared",
      musicStart: 12,
      musicEnd: 42,
      items: [{ musicId: null, musicStart: null, musicEnd: null }],
    });
  });
});
