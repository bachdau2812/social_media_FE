import type { PostUpdateRequest } from "../model/post.dto";
import type { Post } from "../model/post.types";
import type { PostMediaRatio } from "../model/postMediaRatio";
import type { UploadedPostMedia } from "../creation/postCreation";

export type EditablePostMedia = Post["media"][number] & {
  originalIndex: number;
  file?: File;
  publicId?: string;
  resourceType?: string;
};

type UploadMedia = (file: File) => Promise<UploadedPostMedia>;

export async function uploadEditedPostMedia(
  media: EditablePostMedia[],
  upload: UploadMedia,
): Promise<EditablePostMedia[]> {
  return Promise.all(media.map(async (item) => {
    if (!item.file) return item;
    const uploaded = await upload(item.file);
    return {
      ...item,
      publicId: uploaded.publicId,
      resourceType: uploaded.resourceType,
      url: uploaded.secureUrl,
    };
  }));
}

export function buildPostUpdateRequest(input: {
  post: Post;
  userId: string;
  caption: string;
  hashtags: string;
  mediaRatio: PostMediaRatio;
  media: EditablePostMedia[];
}): PostUpdateRequest {
  return {
    postId: input.post.id,
    userId: input.userId,
    content: input.caption,
    hashtag: input.hashtags.split(/[ ,]+/).map((tag) => tag.replace(/^#/, "")).filter(Boolean),
    mediaRatio: input.mediaRatio,
    musicId: input.post.music?.id ?? undefined,
    musicStart: input.post.music?.segmentStart ?? undefined,
    musicEnd: input.post.music?.segmentEnd ?? undefined,
    items: input.media.map((item, index) => ({
      itemId: item.file ? null : item.id,
      orderNumber: index + 1,
      secureUrl: item.file ? item.url : null,
      publicId: item.file ? item.publicId : null,
      resourceType: item.file ? item.resourceType : null,
      caption: item.caption ?? null,
      musicId: item.music?.id ?? null,
      musicStart: item.music?.segmentStart ?? null,
      musicEnd: item.music?.segmentEnd ?? null,
    })),
  };
}
