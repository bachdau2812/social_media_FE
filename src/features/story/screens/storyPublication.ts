export function createStoryPublicationId(): string {
  return globalThis.crypto.randomUUID();
}

export function storyPublicationFields(publicationId: string, zeroBasedIndex: number, itemCount: number) {
  return {
    publicationId,
    publicationOrder: zeroBasedIndex + 1,
    publicationItemCount: itemCount,
  };
}
