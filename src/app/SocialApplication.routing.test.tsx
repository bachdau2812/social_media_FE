import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { apiGet } from "../shared/api";
import { profileApi } from "../features/profile";
import SocialApplication from "./SocialApplication";

const fixtures = vi.hoisted(() => ({
  session: { userId: "viewer-1", username: "viewer" } as { userId: string; username: string } | null,
  post: { id: "post-1", author: { id: "author-1", username: "author", displayName: "Author", avatarUrl: "" },
    createdAt: "2026-10-06", caption: "Post", layoutVariant: "TEXT", mediaRatio: "4:3", media: [],
    viewerState: { liked: false, saved: false, reposted: false }, engagement: { likes: 0, comments: 0, saves: 0, shares: 0, reposts: 0 }, comments: [] },
  login: vi.fn(async () => {}), logout: vi.fn(async () => {}), toast: vi.fn(),
  feedLoad: vi.fn(async () => {}), pending: vi.fn(() => null),
  feedInvalidate: vi.fn(),
  stories: [{ id: "story-1", userId: "author-1", name: "Author", username: "author", avatarUrl: "", totalItems: 2, seenItems: 0, state: "unseen" }, { id: "story-2", userId: "author-1", name: "Author", username: "author", avatarUrl: "", totalItems: 2, seenItems: 0, state: "unseen" }],
}));
vi.mock("../shared/api", async (original) => ({ ...await original<typeof import("../shared/api")>(), apiGet: vi.fn(), apiSend: vi.fn(async () => ({})) }));
vi.mock("./providers/AuthProvider", () => ({ useAuth: () => ({ session: fixtures.session, status: "ready", login: fixtures.login, logout: fixtures.logout }) }));
vi.mock("./providers/ToastProvider", () => ({ useToast: () => ({ showToast: fixtures.toast }) }));
vi.mock("../shared/hooks/useViewportMode", () => ({ useViewportMode: () => "desktop" }));
vi.mock("./bootstrap/mediaController", () => ({ installPageVisibilityMediaController: () => () => {} }));
vi.mock("../features/post", async (original) => ({
  ...await original<typeof import("../features/post")>(), usePostEventStream: () => {},
  PostDetail: ({ post, targetCommentId, onClose }: any) => <div role="dialog">Post {post.id} Comment {targetCommentId}<button onClick={onClose}>Close post</button></div>,
  PostCreationStudio: () => <div>Create post</div>, PostEditDialog: () => null,
}));
vi.mock("../features/feed", () => ({
  useFeedController: () => ({ posts: [fixtures.post], stories: fixtures.stories, hasMore: false, loadingMore: false, setPosts: vi.fn(), load: fixtures.feedLoad, loadMore: vi.fn(), invalidate: fixtures.feedInvalidate, clear: vi.fn() }),
  HomeScreen: ({ onSelectPost, onOpenProfile, onSelectStory }: any) => <div>Home<button onClick={() => onSelectPost(fixtures.post)}>Open post</button><button onClick={() => onOpenProfile("author-1")}>Open author</button><button onClick={() => onSelectStory(fixtures.stories[0])}>Open story</button></div>,
}));
vi.mock("../features/profile", () => ({
  profileApi: { getSummary: vi.fn() }, profileToView: (value: any) => value, profileToIdentity: (value: any) => value,
  ProfileScreen: ({ profile, onSelectPost }: any) => <div>Profile {profile?.id}<button onClick={() => onSelectPost(fixtures.post)}>Profile post</button></div>, ConnectionsModal: () => null,
}));
vi.mock("../features/chat", () => ({
  useChatUnreadCount: () => 0, FloatingMessenger: () => <div>Mini chat</div>,
  ChatScreen: ({ initialTarget }: any) => <div>Chat {initialTarget?.conversationId || "inbox"}</div>,
}));
vi.mock("../features/notification", async (original) => ({
  ...await original<typeof import("../features/notification")>(), useNotificationUnreadCount: () => 0,
  syncGrantedPushRegistration: vi.fn(async () => {}), startForegroundPushNotifications: vi.fn(async () => {}), stopForegroundPushNotifications: vi.fn(),
  consumePendingNotificationDestination: fixtures.pending, subscribeToNotificationNavigation: () => () => {}, NotificationScreen: () => <div>Notifications</div>,
}));
vi.mock("../features/story", async (original) => ({
  ...await original<typeof import("../features/story")>(), StoryViewer: ({ stories, index, onSelectIndex, onClose }: any) => <div>Story {stories[index]?.id}<button onClick={() => onSelectIndex(1)}>Next story</button><button onClick={onClose}>Close story</button></div>, StoryCreatorStudio: () => <div>Create story</div>,
}));
vi.mock("../features/suggestions", () => ({ SuggestedFriendsPanel: () => null }));
vi.mock("../features/auth", () => ({ BootScreen: () => <div>Boot</div>, LoginScreen: ({ onLogin }: any) => <button onClick={() => onLogin("user", "password")}>Login</button> }));
vi.mock("./components/Navigation", () => ({
  Navigation: ({ onNavigate }: any) => <nav><button onClick={() => onNavigate("home")}>Go home</button><button onClick={() => onNavigate("profile")}>My profile</button><button onClick={() => onNavigate("chat")}>Go chat</button></nav>,
  MobileNav: () => null, InlineError: ({ message }: any) => <div role="alert">{message}</div>,
}));

function HistoryControls() {
  const location = useLocation();
  const navigate = useNavigate();
  return <><output data-testid="url">{location.pathname}{location.search}</output><button onClick={() => navigate(-1)}>Browser back</button><button onClick={() => navigate(1)}>Browser forward</button><button onClick={() => navigate("/post/post-2")}>Other post</button></>;
}
function Application({ entry = "/" }: { entry?: string }) {
  return <MemoryRouter initialEntries={[entry]}><HistoryControls /><SocialApplication /></MemoryRouter>;
}
beforeEach(() => {
  vi.clearAllMocks();
  fixtures.session = { userId: "viewer-1", username: "viewer" };
  fixtures.pending.mockReturnValue(null);
  sessionStorage.clear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.mocked(profileApi.getSummary).mockImplementation(async (id) => ({ id, posts: [], reposts: [] } as any));
  vi.mocked(apiGet).mockImplementation(async (path) => {
    if (path.startsWith("/posts/")) return { postId: path.split("/")[2].split("?")[0], userId: "author-1", content: "Loaded", items: [] } as any;
    return { content: [], totalPages: 0 } as any;
  });
});
afterEach(async () => { cleanup(); await act(async () => {}); vi.restoreAllMocks(); });

it("changes the URL when a feed post opens and returns to feed on close", async () => {
  render(<Application />);
  fireEvent.click(screen.getByText("Open post"));
  expect(screen.getByTestId("url")).toHaveTextContent("/post/post-1");
  await screen.findByRole("dialog");
  fireEvent.click(screen.getByText("Close post"));
  expect(screen.getByTestId("url")).toHaveTextContent(/^\/$/);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

it("loads a directly visited post and keeps the resource URL", async () => {
  render(<Application entry="/post/post-9?commentId=comment-1" />);
  await waitFor(() => expect(screen.getByRole("dialog")).toHaveTextContent("Post post-9 Comment comment-1"));
  expect(apiGet).toHaveBeenCalledWith(expect.stringContaining("/posts/post-9"), expect.anything());
  expect(screen.getByTestId("url")).toHaveTextContent("/post/post-9?commentId=comment-1");
});

it("prioritizes an explicit resource URL over a stale pending notification", async () => {
  fixtures.pending.mockReturnValue({ kind: "post", postId: "old-post" } as any);
  render(<Application entry="/post/requested" />);
  await waitFor(() => expect(screen.getByRole("dialog")).toHaveTextContent("Post requested"));
  expect(screen.getByTestId("url")).toHaveTextContent("/post/requested");
});

it("reads profiles from the URL instead of stored screen preferences", async () => {
  sessionStorage.setItem("social-media-active-view", "chat");
  sessionStorage.setItem("social-media-profile-user", "wrong-user");
  render(<Application entry="/profile/author-9" />);
  await screen.findByText("Profile author-9");
  expect(profileApi.getSummary).toHaveBeenCalledWith("author-9", "viewer-1");
  expect(screen.getByTestId("url")).toHaveTextContent("/profile/author-9");
});

it("keeps the loaded feed when returning from a profile with browser Back", async () => {
  render(<Application />);
  await waitFor(() => expect(fixtures.feedLoad).toHaveBeenCalledTimes(1));
  fireEvent.click(screen.getByText("Open author"));
  await screen.findByText("Profile author-1");
  fireEvent.click(screen.getByText("Browser back"));
  await screen.findByText("Open post");
  expect(fixtures.feedLoad).toHaveBeenCalledTimes(1);
});

it("uses browser Back/Forward to open and close the selected resource", async () => {
  render(<Application />);
  fireEvent.click(screen.getByText("Open post"));
  await screen.findByRole("dialog");
  fireEvent.click(screen.getByText("Browser back"));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  fireEvent.click(screen.getByText("Browser forward"));
  expect(await screen.findByRole("dialog")).toHaveTextContent("Post post-1");
});

it("keeps a requested resource URL across login", async () => {
  fixtures.session = null;
  const { rerender } = render(<Application entry="/post/post-9" />);
  fireEvent.click(screen.getByText("Login"));
  await act(async () => {});
  fixtures.session = { userId: "viewer-1", username: "viewer" };
  rerender(<Application entry="/post/post-9" />);
  await waitFor(() => expect(screen.getByRole("dialog")).toHaveTextContent("Post post-9"));
  expect(screen.getByTestId("url")).toHaveTextContent("/post/post-9");
});

it("shows unavailable post errors without discarding the shareable URL", async () => {
  vi.mocked(apiGet).mockRejectedValue(new Error("Post unavailable"));
  render(<Application entry="/post/missing-post" />);
  expect(await screen.findByRole("alert")).toBeInTheDocument();
  expect(screen.getByTestId("url")).toHaveTextContent("/post/missing-post");
});

it("loads a full conversation from its resource URL", async () => {
  render(<Application entry="/chat/conversation-1?messageSeq=42" />);
  expect(await screen.findByText("Chat conversation-1")).toBeInTheDocument();
});

it("opens stories at individual URLs and updates the current story URL", async () => {
  render(<Application />);
  fireEvent.click(screen.getByText("Open story"));
  expect(screen.getByTestId("url")).toHaveTextContent("/story/author-1/story-1");
  await screen.findByText("Story story-1");
  fireEvent.click(screen.getByText("Next story"));
  expect(screen.getByTestId("url")).toHaveTextContent("/story/author-1/story-2");
  fireEvent.click(screen.getByText("Close story"));
  expect(screen.getByTestId("url")).toHaveTextContent(/^\/$/);
});

it("loads directly visited stories and the story creator", async () => {
  const { unmount } = render(<Application entry="/story/author-9/story-9" />);
  await screen.findByText("Story story-9");
  expect(screen.getByTestId("url")).toHaveTextContent("/story/author-9/story-9");
  unmount();
  render(<Application entry="/create/story" />);
  expect(screen.getByText("Create story")).toBeInTheDocument();
});

it("discards a stale direct post response after navigating to another post", async () => {
  let resolveFirst!: (value: any) => void;
  vi.mocked(apiGet).mockImplementation((path) => path.includes("/posts/post-9")
    ? new Promise((resolve) => { resolveFirst = resolve; })
    : Promise.resolve({ postId: "post-2", userId: "author-1", items: [] } as any));
  render(<Application entry="/post/post-9" />);
  fireEvent.click(screen.getByText("Other post"));
  await waitFor(() => expect(screen.getByRole("dialog")).toHaveTextContent("Post post-2"));
  await act(async () => resolveFirst({ postId: "post-9", userId: "author-1", items: [] }));
  expect(screen.getByRole("dialog")).toHaveTextContent("Post post-2");
});
