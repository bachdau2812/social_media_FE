export type UserSettings = {
  accountVisibility: string;
  storyVisibility: string;
  commentPermission: string;
  mentionPermission: string;
  tagApprovalRequired: boolean;
  activityStatusVisible: boolean;
  readReceiptsEnabled: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  likesEnabled: boolean;
  commentsEnabled: boolean;
  followsEnabled: boolean;
  mentionsEnabled: boolean;
  storiesEnabled: boolean;
  messagesEnabled: boolean;
  securityEnabled: boolean;
  sensitiveContentLevel: string;
  autoplayVideo: string;
  theme: string;
  reducedMotion: boolean;
  textScale: number;
  highContrast: boolean;
  alwaysShowCaptions: boolean;
};

export type SettingsSectionId = "appearance" | "privacy" | "posts" | "feed" | "messages" | "notifications";
