import type { CreatePostRequest } from "../model/post.dto";
import type { PostMediaRatio } from "../model/postMediaRatio";

export type MusicSelection = {
  id: string;
  title: string;
  artist: string;
  url: string;
  artwork: string;
  duration: number;
};

export type PostCreationMedia = {
  id: string;
  fileName: string;
  type: "IMAGE" | "VIDEO";
  file: File | null;
  secureUrl?: string;
  publicId?: string;
  resourceType?: string;
  itemCaption: string;
  music: MusicSelection | null;
  musicStart: number;
  musicEnd: number;
};

export type UploadedPostMedia = {
  secureUrl: string;
  publicId: string;
  resourceType: string;
};

type UploadMedia = (file: File) => Promise<UploadedPostMedia>;

export type PostCreationInput = {
  userId: string;
  caption: string;
  hashtags: string;
  mediaRatio: PostMediaRatio;
  sharedMusic: MusicSelection | null;
  sharedStart: number;
  sharedEnd: number;
  media: PostCreationMedia[];
};

export async function uploadPostMedia(media: PostCreationMedia[], upload: UploadMedia): Promise<UploadedPostMedia[]> {
  return Promise.all(media.map((item) => {
    if (item.secureUrl) {
      return Promise.resolve({
        secureUrl: item.secureUrl,
        publicId: item.publicId ?? "",
        resourceType: item.resourceType ?? item.type.toLowerCase(),
      });
    }
    if (!item.file) {
      return Promise.reject(new Error(`Missing local file for post media ${item.id}`));
    }
    return upload(item.file);
  }));
}

export function buildCreatePostRequest(input: PostCreationInput, uploads: UploadedPostMedia[]): CreatePostRequest {
  return {
    userId: input.userId,
    content: input.caption,
    hashtags: normalizeHashtags(input.hashtags),
    mediaRatio: input.mediaRatio,
    musicId: input.sharedMusic?.id ?? null,
    musicStart: input.sharedMusic ? input.sharedStart : null,
    musicEnd: input.sharedMusic ? input.sharedEnd : null,
    items: input.media.map((item, index) => {
      const music = itemMusic(input.sharedMusic, item);
      const uploaded = requireUpload(uploads, index);
      return {
        orderNumber: index + 1,
        secureUrl: uploaded.secureUrl,
        publicId: uploaded.publicId,
        resourceType: uploaded.resourceType,
        caption: item.itemCaption || null,
        musicId: music?.id ?? null,
        musicStart: music ? item.musicStart : null,
        musicEnd: music ? item.musicEnd : null,
      };
    }),
  };
}

export function buildPostDraftRequest(input: PostCreationInput, uploads: UploadedPostMedia[]) {
  return {
    id: null,
    draftType: "POST" as const,
    thumbnailUrl: uploads[0]?.secureUrl ?? null,
    mediaCount: input.media.length,
    captionPreview: input.caption || "Empty draft",
    payload: JSON.stringify({
      caption: input.caption,
      hashtags: input.hashtags,
      mediaRatio: input.mediaRatio,
      sharedMusic: input.sharedMusic,
      musicId: input.sharedMusic?.id ?? null,
      musicStart: input.sharedMusic ? input.sharedStart : null,
      musicEnd: input.sharedMusic ? input.sharedEnd : null,
      media: input.media.map((item, index) => {
        const music = itemMusic(input.sharedMusic, item);
        const uploaded = uploads[index];
        return {
          id: item.id,
          fileName: item.fileName,
          type: item.type,
          secureUrl: uploaded?.secureUrl,
          publicId: uploaded?.publicId,
          resourceType: uploaded?.resourceType,
          itemCaption: item.itemCaption,
          music: item.music,
          musicId: music?.id ?? null,
          musicStart: music ? item.musicStart : null,
          musicEnd: music ? item.musicEnd : null,
        };
      }),
    }),
  };
}

function itemMusic(sharedMusic: MusicSelection | null, item: PostCreationMedia): MusicSelection | null {
  return sharedMusic || item.type === "VIDEO" ? null : item.music;
}

function requireUpload(uploads: UploadedPostMedia[], index: number): UploadedPostMedia {
  const uploaded = uploads[index];
  if (!uploaded) {
    throw new Error(`Post media upload ${index + 1} is incomplete`);
  }
  return uploaded;
}

function normalizeHashtags(hashtags: string): string[] {
  return hashtags.split(/[ ,]+/).filter(Boolean).map((tag) => tag.replace(/^#/, ""));
}
