import { ChevronLeft } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { apiGet, apiSend } from "../shared/api";
import { useViewportMode } from "../shared/hooks/useViewportMode";
import type { ViewKey } from "./router/navigation.types";
import { postDetailsToPost as mapPostDetailsToPost, usePostEventStream, type Post, type PostDetailsDto, type RepostToggleResponse } from "../features/post";
import { profileApi, profileToIdentity, profileToView as mapProfileToView, type ConnectionTab, type ConnectionUserDto, type Profile, type ProfileDto as FeatureProfileDto } from "../features/profile";
import { archivedStoryToItem, type StoryArchiveDto, type StoryItem } from "../features/story";
import { ChatScreen, FloatingMessenger, useChatUnreadCount, type ChatNavigationTarget, type ConversationDto } from "../features/chat";
import { NotificationScreen as FeatureNotificationScreen, refreshNotificationUnreadCount, startForegroundPushNotifications, stopForegroundPushNotifications, syncGrantedPushRegistration, useNotificationUnreadCount } from "../features/notification";
import { ConnectionsModal, ProfileScreen } from "../features/profile";
import { CreateContentMenu } from "./components/CreateContentMenu";
import { consumePendingNotificationDestination, decodeNotificationDeepLink, savePendingNotificationDestination, subscribeToNotificationNavigation, type AppDestination } from "../features/notification";
import { StoryCreatorStudio, StoryViewer, orderStoryQueue, persistSeenStoryIds, readSeenStoryIds, storyApi, storyStartIndex, type StoryHighlightDto } from "../features/story";
import { PostCreationStudio, PostDetail, PostEditDialog } from "../features/post";
import { useFeedMediaSuspension } from "../features/post/hooks/useFeedMediaSuspension";
import { SuggestedFriendsPanel } from "../features/suggestions";
import type { ContentDraft } from "../features/library";
import { BootScreen, LoginScreen } from "../features/auth";
import { InlineError, MobileNav, Navigation } from "./components/Navigation";
import { MobileAppHeader } from "./components/MobileAppHeader";
import { HomeScreen, useFeedController } from "../features/feed";
import { SystemStates } from "./components/SystemStates";
import { useAuth } from "./providers/AuthProvider";
import { installPageVisibilityMediaController } from "./bootstrap/mediaController";
import { ResponsiveAppShell } from "./layouts/ResponsiveAppShell";

const FeatureSearchScreen = lazy(() => import("../features/search").then((module) => ({ default: module.SearchScreen })));
const FeatureLibraryScreen = lazy(() => import("../features/library").then((module) => ({ default: module.LibraryScreen })));
const FeatureSettingsScreen = lazy(() => import("../features/settings").then((module) => ({ default: module.SettingsScreen })));

const MOBILE_VIEW_TITLES: Record<ViewKey, string> = {
    home: "Pulse",
    search: "Tìm kiếm",
    create: "Tạo bài viết",
    profile: "Trang cá nhân",
    connections: "Kết nối",
    notifications: "Thông báo",
    library: "Thư viện",
    settings: "Cài đặt",
    chat: "Tin nhắn",
    states: "Trạng thái hệ thống",
};

function FeatureLoading() {
    return <div className="app-route-fallback" role="status" aria-label="Đang tải"><span/><span/><span/></div>;
}
type LoadState = "idle" | "loading" | "ready" | "error";
type NavigationEntry = {
    view: ViewKey;
    profileUserId: string | null;
    scrollY: number;
};
type Page<T> = {
    content: T[];
    pageNumber: number;
    totalElements: number;
    totalPages: number;
};
const ACTIVE_VIEW_STORAGE_KEY = "social-media-active-view";
const ACTIVE_FEED_TAB_STORAGE_KEY = "social-media-active-feed-tab";
const PROFILE_USER_STORAGE_KEY = "social-media-profile-user";
const persistedViews = new Set<ViewKey>(["home", "search", "create", "profile", "notifications", "library", "settings", "chat", "states"]);
function readStoredView(): ViewKey {
    try {
        const stored = sessionStorage.getItem(ACTIVE_VIEW_STORAGE_KEY) as ViewKey | null;
        return stored && persistedViews.has(stored) ? stored : "home";
    }
    catch {
        return "home";
    }
}
function readStoredFeedTab(): "DISCOVER" | "FRIENDS" {
    try {
        return sessionStorage.getItem(ACTIVE_FEED_TAB_STORAGE_KEY) === "FRIENDS" ? "FRIENDS" : "DISCOVER";
    }
    catch {
        return "DISCOVER";
    }
}
function readStoredProfileUserId(): string | null {
    try {
        return sessionStorage.getItem(PROFILE_USER_STORAGE_KEY);
    }
    catch {
        return null;
    }
}
export default function SocialApplication() {
    const { session, status: authStatus, error: authError, login, logout } = useAuth();
    const [view, setView] = useState<ViewKey>(readStoredView);
    const [navigationHistory, setNavigationHistory] = useState<NavigationEntry[]>([]);
    const [feedTab, setFeedTab] = useState<"DISCOVER" | "FRIENDS">(readStoredFeedTab);
    const feedScrollPositions = useRef<Record<"DISCOVER" | "FRIENDS", number>>({ DISCOVER: 0, FRIENDS: 0 });
    const feed = useFeedController();
    const { posts, stories, hasMore: feedHasMore, loadingMore: feedLoadingMore, setPosts } = feed;
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [profileUserId, setProfileUserId] = useState<string | null>(readStoredProfileUserId);
    const [connectionTab, setConnectionTab] = useState<ConnectionTab>("FOLLOWERS");
    const [connectionsOpen, setConnectionsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [status, setStatus] = useState<LoadState>("idle");
    const [errorText, setErrorText] = useState("");
    const [appToast, setAppToast] = useState("");
    const chatUnreadCount = useChatUnreadCount(session?.userId);
    const notificationUnreadCount = useNotificationUnreadCount(session?.userId);
    const viewportMode = useViewportMode();
    const [createMenuOpen, setCreateMenuOpen] = useState(false);
    const [miniChatRequest, setMiniChatRequest] = useState<(ChatNavigationTarget & {
        nonce: number;
    }) | null>(null);
    const [storyCreatorOpen, setStoryCreatorOpen] = useState(false);
    const [resumeDraft, setResumeDraft] = useState<ContentDraft | null>(null);
    const [seenStoryIds, setSeenStoryIds] = useState<Set<string>>(new Set());
    const [recentlySeenStoryIds, setRecentlySeenStoryIds] = useState<Set<string>>(new Set());
    const [fullChatTarget, setFullChatTarget] = useState<ChatNavigationTarget | null>(null);
    const [storyViewerStories, setStoryViewerStories] = useState<StoryItem[] | null>(null);
    const [targetCommentId, setTargetCommentId] = useState<string | null>(null);
    const initialDestinationHandled = useRef(false);
    useEffect(() => {
        if (session?.userId) {
            setSeenStoryIds(readSeenStoryIds(session.userId));
            setRecentlySeenStoryIds(new Set());
        }
    }, [session?.userId]);
    useEffect(() => installPageVisibilityMediaController(), []);
    useEffect(() => {
        if (initialDestinationHandled.current)
            return;
        const destination = decodeNotificationDeepLink(window.location.href);
        if (!session) {
            if (destination)
                savePendingNotificationDestination(destination);
            return;
        }
        const target = consumePendingNotificationDestination() ?? destination;
        initialDestinationHandled.current = true;
        if (target) {
            void navigateToDestination(target);
            window.history.replaceState(window.history.state, "", "/");
        }
    }, [session?.userId]);
    useEffect(() => subscribeToNotificationNavigation((destination) => {
        if (!session) {
            savePendingNotificationDestination(destination);
            return;
        }
        void navigateToDestination(destination);
    }), [session?.userId]);
    useEffect(() => {
        if (!session?.userId)
            return;
        void syncGrantedPushRegistration(session.userId).catch((error: unknown) => {
            console.warn("Unable to synchronize this device for push notifications:", error instanceof Error ? error.message : "Unknown error");
        });
    }, [session?.userId]);
    useEffect(() => {
        if (!session?.userId) {
            stopForegroundPushNotifications();
            return;
        }
        void startForegroundPushNotifications({
            getActiveDestination: () => view === "chat" && fullChatTarget ? { kind: "conversation", conversationId: fullChatTarget.conversationId } : selectedPost ? { kind: "post", postId: selectedPost.id } : null,
            onReceived: () => {
                refreshNotificationUnreadCount();
                if (view === "notifications")
                    window.dispatchEvent(new Event("notification-refresh"));
            },
        });
        return () => stopForegroundPushNotifications();
    }, [session?.userId, view, fullChatTarget?.conversationId, selectedPost?.id]);
    useEffect(() => {
        try {
            sessionStorage.setItem(ACTIVE_VIEW_STORAGE_KEY, view);
        }
        catch { /* Storage can be unavailable in privacy mode. */ }
    }, [view]);
    useEffect(() => {
        try {
            sessionStorage.setItem(ACTIVE_FEED_TAB_STORAGE_KEY, feedTab);
        }
        catch { /* Storage can be unavailable in privacy mode. */ }
    }, [feedTab]);
    useEffect(() => {
        if (session)
            void loadScreenData(view, session.userId, feedTab);
    }, [view, feedTab, session?.userId, profileUserId]);
    useEffect(() => {
        function handleToast(event: Event) {
            const detail = (event as CustomEvent<string>).detail;
            if (detail)
                showAppToast(detail);
        }
        window.addEventListener("app-toast", handleToast);
        return () => window.removeEventListener("app-toast", handleToast);
    }, []);
    useFeedMediaSuspension({
        postDetailOpen: Boolean(selectedPost),
        storyCreatorOpen,
    });
    usePostEventStream(session?.userId, (data) => {
        showAppToast(data.message || (data.result === "FAILED" ? "Không thể đăng tải bài viết" : "Bài viết đã được cập nhật"));
        if (data.result !== "FAILED" && session)
            void loadScreenData("home", session.userId, feedTab);
    }, feedTab);
    function showAppToast(message: string) {
        setAppToast(message);
        window.setTimeout(() => setAppToast(""), 4200);
    }
    async function handleLogin(username: string, password: string) {
        setErrorText("");
        try {
            await login(username, password);
            setNavigationHistory([]);
            try {
                sessionStorage.setItem(ACTIVE_VIEW_STORAGE_KEY, "home");
            }
            catch { /* Ignore unavailable storage. */ }
            setView("home");
        }
        catch (error) {
            setErrorText(error instanceof Error ? error.message : "Login failed");
        }
    }
    async function handleLogout() {
        await logout();
        try {
            sessionStorage.removeItem(ACTIVE_VIEW_STORAGE_KEY);
            sessionStorage.removeItem(ACTIVE_FEED_TAB_STORAGE_KEY);
            sessionStorage.removeItem(PROFILE_USER_STORAGE_KEY);
        }
        catch { /* Ignore unavailable storage. */ }
        setNavigationHistory([]);
        feed.clear();
        setProfile(null);
        setProfileUserId(null);
    }
    async function loadScreenData(target: ViewKey, userId: string, tab: "DISCOVER" | "FRIENDS") {
        setStatus("loading");
        setErrorText("");
        try {
            if (target === "home") {
                await feed.load(userId, tab);
            }
            else {
                feed.invalidate();
            }
            if (target === "profile")
                await openProfile(profileUserId ?? userId, false);
            setStatus("ready");
        }
        catch (error) {
            setStatus("error");
            setErrorText(error instanceof Error ? error.message : "Request failed");
        }
    }
    async function loadMoreFeed() {
        if (!session || view !== "home" || status !== "ready" || !feedHasMore || feedLoadingMore)
            return;
        try {
            await feed.loadMore(session.userId, feedTab);
        }
        catch (error) {
            showAppToast(error instanceof Error ? error.message : "Không thể tải thêm bài viết");
        }
    }
    async function getProfile(userId: string, viewerId: string) {
        const data = await profileApi.getSummary(userId, viewerId);
        return mapProfileToView(data);
    }
    function openPostDetail(post: Post, commentId: string | null = null) {
        setTargetCommentId(commentId);
        setSelectedPost(post);
    }
    function closePostDetail() {
        setSelectedPost(null);
    }
    function switchFeedTab(nextTab: "DISCOVER" | "FRIENDS") {
        if (nextTab === feedTab)
            return;
        feedScrollPositions.current[feedTab] = window.scrollY;
        setFeedTab(nextTab);
        window.setTimeout(() => window.scrollTo({ top: feedScrollPositions.current[nextTab] ?? 0, behavior: "auto" }), 80);
    }
    function rememberNavigation(targetView: ViewKey, targetProfileUserId: string | null = null) {
        const currentProfileUserId = view === "profile" ? profileUserId : null;
        const nextProfileUserId = targetView === "profile" ? targetProfileUserId : null;
        if (view === targetView && currentProfileUserId === nextProfileUserId)
            return;
        setNavigationHistory((history) => [
            ...history,
            { view, profileUserId: currentProfileUserId, scrollY: window.scrollY },
        ].slice(-30));
    }
    async function openProfile(userId: string, navigate = true) {
        if (!session)
            return;
        const data = await getProfile(userId, session.userId);
        if (navigate)
            rememberNavigation("profile", userId);
        setProfileUserId(userId);
        try {
            sessionStorage.setItem(PROFILE_USER_STORAGE_KEY, userId);
        }
        catch { /* Ignore unavailable storage. */ }
        setProfile(data);
        setSelectedPost(null);
        setSelectedStoryIndex(null);
        if (navigate)
            setView("profile");
    }
    async function navigateToDestination(destination: AppDestination) {
        if (!session) {
            savePendingNotificationDestination(destination);
            return;
        }
        setCreateMenuOpen(false);
        if (destination.kind === "home") {
            navigateToView("home");
            return;
        }
        if (destination.kind === "profile") {
            await openProfile(destination.userId);
            return;
        }
        if (destination.kind === "post") {
            try {
                const details = await apiGet<PostDetailsDto>(`/posts/${encodeURIComponent(destination.postId)}?mediaType=POST`);
                openPostDetail(mapPostDetailsToPost(details), destination.commentId ?? null);
            }
            catch {
                showAppToast("Bài viết không còn tồn tại hoặc bạn không có quyền xem");
            }
            return;
        }
        if (destination.kind === "conversation") {
            const target: ChatNavigationTarget = { conversationId: destination.conversationId, ...(destination.messageId ? { messageId: destination.messageId } : {}), ...(destination.messageSeq !== undefined ? { messageSeq: destination.messageSeq } : {}), ...(destination.panel ? { panel: destination.panel } : {}) };
            if (destination.surface === "mini" && viewportMode !== "mobile") {
                setMiniChatRequest({ ...target, nonce: Date.now() });
            }
            else {
                rememberNavigation("chat");
                setFullChatTarget(target);
                setView("chat");
            }
            return;
        }
        if (destination.kind === "story") {
            const requestedId = destination.storyItemId || destination.storyId;
            try {
                const page = await apiGet<Page<StoryArchiveDto>>(`/profile-media/${encodeURIComponent(destination.ownerId)}/stories?page=0&size=50&mediaType=STORY`);
                let ownerProfile: FeatureProfileDto | null = null;
                try {
                    ownerProfile = await profileApi.getSummary(destination.ownerId, session.userId, 0);
                }
                catch {
                    ownerProfile = null;
                }
                const ownerIdentity = ownerProfile ? profileToIdentity(ownerProfile) : undefined;
                const scoped = (page.content ?? []).map((story) => archivedStoryToItem(story, ownerIdentity));
                if (destination.scope === "single" && requestedId) {
                    const requestedStory = scoped.find((item) => item.id === requestedId);
                    const unavailableStory: StoryItem = {
                        id: requestedId,
                        userId: destination.ownerId,
                        name: ownerIdentity?.fullName || ownerIdentity?.username || "Người dùng",
                        username: ownerIdentity?.username || "",
                        avatarUrl: ownerIdentity?.avatarUrl || "",
                        status: "EXPIRED",
                        replyEnabled: false,
                        viewerSeen: true,
                        totalItems: 1,
                        seenItems: 1,
                        state: "seen",
                    };
                    setStoryViewerStories([requestedStory ?? unavailableStory]);
                    setSelectedStoryIndex(0);
                    return;
                }
                if (!scoped.length) {
                    showAppToast("Story không còn khả dụng");
                    return;
                }
                const startIndex = requestedId ? Math.max(0, scoped.findIndex((item) => item.id === requestedId)) : 0;
                setStoryViewerStories(destination.scope === "owner" ? scoped : null);
                setSelectedStoryIndex(startIndex);
            }
            catch {
                if (destination.scope === "single" && requestedId) {
                    setStoryViewerStories([{
                        id: requestedId,
                        userId: destination.ownerId,
                        name: "Người dùng",
                        username: "",
                        avatarUrl: "",
                        status: "EXPIRED",
                        replyEnabled: false,
                        viewerSeen: true,
                        totalItems: 1,
                        seenItems: 1,
                        state: "seen",
                    }]);
                    setSelectedStoryIndex(0);
                    return;
                }
                showAppToast("Không thể tải Story");
            }
        }
    }
    async function openChatForUser(targetUserId: string) {
        if (!session)
            return;
        try {
            const conversation = await apiSend<ConversationDto>(`/chat/conversations/direct?actorId=${encodeURIComponent(session.userId)}`, "POST", { targetUserId });
            if (viewportMode === "mobile") {
                rememberNavigation("chat");
                setFullChatTarget({ conversationId: conversation.id });
                setView("chat");
            }
            else {
                setMiniChatRequest({ conversationId: conversation.id, nonce: Date.now() });
            }
        }
        catch (error) {
            showAppToast(error instanceof Error ? error.message : "Không thể mở cuộc trò chuyện");
        }
    }
    function navigateToView(target: ViewKey) {
        if (target === "create") {
            setCreateMenuOpen(true);
            return;
        }
        const targetProfileUserId = target === "profile" && session ? session.userId : null;
        rememberNavigation(target, targetProfileUserId);
        setConnectionsOpen(false);
        setSelectedPost(null);
        setSelectedStoryIndex(null);
        if (target === "profile" && session) {
            setProfileUserId(session.userId);
            try {
                sessionStorage.setItem(PROFILE_USER_STORAGE_KEY, session.userId);
            }
            catch { /* Ignore unavailable storage. */ }
        }
        setView(target);
    }
    function handleBackNavigation() {
        if (selectedPost) {
            closePostDetail();
            return;
        }
        if (selectedStoryIndex !== null) {
            setSelectedStoryIndex(null);
            return;
        }
        if (connectionsOpen) {
            setConnectionsOpen(false);
            return;
        }
        const previous = navigationHistory[navigationHistory.length - 1];
        if (!previous) {
            if (view !== "home") {
                setProfileUserId(null);
                setView("home");
                window.scrollTo({ top: 0, behavior: "auto" });
            }
            return;
        }
        setNavigationHistory((history) => history.slice(0, -1));
        setConnectionsOpen(false);
        setSelectedPost(null);
        setSelectedStoryIndex(null);
        setProfileUserId(previous.profileUserId);
        if (previous.profileUserId) {
            try {
                sessionStorage.setItem(PROFILE_USER_STORAGE_KEY, previous.profileUserId);
            }
            catch { /* Ignore unavailable storage. */ }
        }
        setView(previous.view);
        window.setTimeout(() => window.scrollTo({ top: previous.scrollY, behavior: "auto" }), 80);
    }
    function reloadHomeFromSidebar() {
        try {
            sessionStorage.setItem(ACTIVE_VIEW_STORAGE_KEY, "home");
        }
        catch { /* Ignore unavailable storage. */ }
        window.location.reload();
    }
    function openConnections(tab: ConnectionTab) {
        setConnectionTab(tab);
        setConnectionsOpen(true);
    }
    function handleConnectionRemoved(tab: ConnectionTab, row: ConnectionUserDto) {
        setProfile((current) => current ? {
            ...current,
            followerCount: tab === "FOLLOWERS" ? Math.max(0, current.followerCount - 1) : current.followerCount,
            followingCount: tab === "FOLLOWING" ? Math.max(0, current.followingCount - 1) : current.followingCount,
            friendCount: row.friend ? Math.max(0, (current.friendCount ?? 0) - 1) : current.friendCount,
        } : current);
    }
    function togglePost(postId: string, key: "liked" | "saved" | "reposted") {
        if (!session)
            return;
        const current = selectedPost?.id === postId ? selectedPost : posts.find((post) => post.id === postId) ?? profile?.posts.find((post) => post.id === postId) ?? profile?.reposts.find((post) => post.id === postId);
        const currentActive = Boolean(current?.viewerState[key]);
        const nextActive = !currentActive;
        const applyState = (active: boolean) => {
          const patchPost = (post: Post): Post => {
            if (post.id !== postId)
                return post;
            if (post.viewerState[key] === active)
                return post;
            const next = { ...post, viewerState: { ...post.viewerState, [key]: active } };
            if (key === "liked")
                next.engagement = { ...next.engagement, likes: Math.max(0, next.engagement.likes + (active ? 1 : -1)) };
            if (key === "reposted")
                next.engagement = { ...next.engagement, reposts: Math.max(0, next.engagement.reposts + (active ? 1 : -1)) };
            return next;
          };
          setPosts((items) => items.map(patchPost));
          setProfile((value) => value ? { ...value, posts: value.posts.map(patchPost), reposts: value.reposts.map(patchPost) } : value);
          setSelectedPost((value) => value ? patchPost(value) : value);
        };
        const rollback = () => {
            applyState(currentActive);
            showAppToast("Không thể cập nhật bài viết. Vui lòng thử lại.");
        };
        applyState(nextActive);
        if (key === "liked")
            void apiSend(`/likes/users/${session.userId}`, "POST", { targetId: postId, targetType: "POST" }).catch(rollback);
        if (key === "saved")
            void apiSend(`/me/${session.userId}/saved/items`, "POST", { postId }).catch(rollback);
        if (key === "reposted") {
            const method = nextActive ? "POST" : "DELETE";
            void apiSend<RepostToggleResponse>(`/posts/${encodeURIComponent(postId)}/repost?actorId=${encodeURIComponent(session.userId)}`, method).then((response) => {
                const syncPost = (post: Post): Post => post.id === postId ? { ...post, viewerState: { ...post.viewerState, reposted: response.reposted }, engagement: { ...post.engagement, reposts: response.repostCount } } : post;
                setPosts((items) => items.map(syncPost));
                setProfile((value) => value ? { ...value, posts: value.posts.map(syncPost), reposts: value.reposts.map(syncPost) } : value);
                setSelectedPost((value) => value ? syncPost(value) : value);
            }).catch(rollback);
        }
    }
    function incrementPostCommentCount(postId: string) {
        const increment = (post: Post): Post => post.id === postId
            ? { ...post, engagement: { ...post.engagement, comments: post.engagement.comments + 1 } }
            : post;
        setPosts((items) => items.map(increment));
        setProfile((value) => value ? { ...value, posts: value.posts.map(increment), reposts: value.reposts.map(increment) } : value);
        setSelectedPost((value) => value ? increment(value) : value);
    }
    function handlePostEdited(updated: Post) {
        const replace = (post: Post) => post.id === updated.id ? { ...post, ...updated } : post;
        setPosts((items) => items.map(replace));
        setProfile((value) => value ? {
            ...value,
            posts: value.posts.map(replace),
            reposts: value.reposts.map(replace),
        } : value);
        setSelectedPost((value) => value ? replace(value) : value);
    }
    async function handleArchivePost(post: Post) {
        if (!session || post.author.id !== session.userId)
            return;
        await apiSend<void>(`/me/${encodeURIComponent(session.userId)}/archive`, "POST", {
            contentId: post.id,
            contentType: "POST",
            thumbnailUrl: post.media[0]?.url ?? null,
            captionPreview: post.caption.slice(0, 180),
        });
        setPosts((items) => items.filter((item) => item.id !== post.id));
        setProfile((value) => value ? {
            ...value,
            posts: value.posts.filter((item) => item.id !== post.id),
            reposts: value.reposts.filter((item) => item.id !== post.id),
        } : value);
        if (selectedPost?.id === post.id)
            closePostDetail();
        showAppToast("Đã chuyển bài viết vào Kho lưu trữ");
    }
    function handleStoryViewed(storyId: string) {
        if (!session)
            return;
        setRecentlySeenStoryIds((current) => current.has(storyId) ? current : new Set(current).add(storyId));
        void storyApi.recordView(storyId, session.userId).then(() => {
            setSeenStoryIds((current) => {
                if (current.has(storyId))
                    return current;
                const next = new Set(current);
                next.add(storyId);
                persistSeenStoryIds(session.userId, next);
                return next;
            });
        }).catch(() => {
            setRecentlySeenStoryIds((current) => {
                if (!current.has(storyId))
                    return current;
                const next = new Set(current);
                next.delete(storyId);
                return next;
            });
        });
    }
    function openStoryFromReply(ownerId: string, storyId: string) {
        void navigateToDestination({ kind: "story", ownerId, storyId, scope: "single" });
    }
    function openStoryHighlight(highlight: StoryHighlightDto) {
        if (!profile)
            return;
        const items = (highlight.stories ?? []).map((story) => archivedStoryToItem(story, {
            username: profile.username,
            fullName: profile.displayName,
            avatarUrl: profile.avatarUrl,
        })).map((story) => ({ ...story, collectionId: highlight.id }));
        if (!items.length)
            return;
        setStoryViewerStories(items);
        setSelectedStoryIndex(0);
    }
    async function handleDeleteStory(storyId: string) {
        if (!session)
            return;
        await storyApi.deleteStory(storyId);
        const nextQueue = activeStoryQueue.filter((story) => story.id !== storyId);
        if (!nextQueue.length) {
            setSelectedStoryIndex(null);
            setStoryViewerStories(null);
        }
        else {
            setStoryViewerStories(nextQueue);
            setSelectedStoryIndex((current) => Math.min(current ?? 0, nextQueue.length - 1));
        }
        void loadScreenData("home", session.userId, feedTab);
        showAppToast("Đã xóa Story");
    }
    if (authStatus === "loading")
        return <BootScreen />;
    const orderedStories = session ? orderStoryQueue(stories, session.userId, seenStoryIds, recentlySeenStoryIds) : stories;
    const activeStoryQueue = storyViewerStories ?? orderedStories;
    if (!session)
        return <LoginScreen errorText={errorText || authError} loading={false} onLogin={handleLogin}/>;
    const showBackButton = navigationHistory.length > 0 || view !== "home";
    const shellClassName = view === "home" ? "home-shell" : view === "chat" ? "chat-shell" : "centered-shell";
    const showMobileChrome = view !== "create";
    return (<>
      <ResponsiveAppShell
        className={shellClassName}
        viewportMode={viewportMode}
        desktopNavigation={<Navigation active={view} chatUnreadCount={chatUnreadCount} notificationUnreadCount={notificationUnreadCount} onNavigate={navigateToView} onReloadHome={reloadHomeFromSidebar} onLogout={handleLogout}/>}
        mobileHeader={showMobileChrome ? <MobileAppHeader title={MOBILE_VIEW_TITLES[view]} canGoBack={showBackButton && view !== "chat"} onBack={handleBackNavigation} onNavigate={navigateToView}/> : null}
        mobileNavigation={showMobileChrome ? <MobileNav active={view} chatUnreadCount={chatUnreadCount} notificationUnreadCount={notificationUnreadCount} onNavigate={navigateToView}/> : null}
        rightRail={view === "home" ? <aside className="right-rail"><SuggestedFriendsPanel viewerId={session.userId} onOpenProfile={openProfile} onOpenChat={openChatForUser}/></aside> : null}
      >
        {showBackButton && viewportMode !== "mobile" && view !== "chat" && <button type="button" className="app-back-button" onClick={handleBackNavigation} aria-label="Quay lại màn trước" title="Quay lại"><ChevronLeft size={20}/></button>}
        {status === "error" && <InlineError message={errorText} onRetry={() => loadScreenData(view, session.userId, feedTab)}/>}
        {view === "home" && <HomeScreen userId={session.userId} tab={feedTab} setTab={switchFeedTab} stories={orderedStories} posts={posts} status={status} hasMore={feedHasMore} loadingMore={feedLoadingMore} onLoadMore={loadMoreFeed} onSelectPost={openPostDetail} onCreateStory={() => setStoryCreatorOpen(true)} onSelectStory={(story) => { const queue = [...orderedStories]; setStoryViewerStories(queue); setSelectedStoryIndex(storyStartIndex(queue, story.userId)); }} onTogglePost={togglePost} onEditPost={setEditingPost} onArchivePost={handleArchivePost} onOpenProfile={openProfile}/>}
        {view === "search" && <Suspense fallback={<FeatureLoading/>}><FeatureSearchScreen viewerId={session.userId} onSelectPost={openPostDetail} onOpenProfile={openProfile}/></Suspense>}
        {view === "create" && <PostCreationStudio userId={session.userId} initialDraft={resumeDraft?.draftType === "POST" ? resumeDraft : null} onBack={() => { setResumeDraft(null); handleBackNavigation(); }} onClose={() => { setResumeDraft(null); handleBackNavigation(); }} onDraftSaved={() => undefined} onPublished={() => loadScreenData("home", session.userId, feedTab)}/>}
        {view === "notifications" && <FeatureNotificationScreen userId={session.userId} onNavigate={navigateToDestination}/>}
        {view === "library" && <Suspense fallback={<FeatureLoading/>}><FeatureLibraryScreen userId={session.userId} onOpenPost={(postId) => { void navigateToDestination({ kind: "post", postId }); }} onOpenStory={(storyId) => {
                void storyApi.archive(session.userId, 0, 100).then((page) => {
                    const item = page.content.find((entry) => entry.id === storyId);
                    if (!item)
                        return;
                    setStoryViewerStories([archivedStoryToItem(item, { username: session.username, fullName: session.username })]);
                    setSelectedStoryIndex(0);
                });
            }} onResumeDraft={(draft: ContentDraft) => {
                setResumeDraft(draft);
                if (draft.draftType === "STORY")
                    setStoryCreatorOpen(true);
                else
                    setView("create");
            }}/></Suspense>}
        {view === "chat" && <ChatScreen userId={session.userId} username={session.username} onOpenProfile={openProfile} onOpenStory={openStoryFromReply} initialTarget={fullChatTarget}/>}
        {view === "profile" && <ProfileScreen viewerId={session.userId} profile={profile} onSelectPost={openPostDetail} onOpenStoryHighlight={openStoryHighlight} onOpenArchive={() => navigateToView("library")} onOpenConnections={openConnections} onRefresh={async () => {
                if (profile)
                    await openProfile(profile.id, false);
            }} onMessage={openChatForUser} onOpenProfile={openProfile}/>}
        {view === "settings" && <Suspense fallback={<FeatureLoading/>}><FeatureSettingsScreen userId={session.userId}/></Suspense>}
        {view === "states" && <SystemStates />}
      </ResponsiveAppShell>
      <CreateContentMenu open={createMenuOpen} onClose={() => setCreateMenuOpen(false)} onCreatePost={() => { rememberNavigation("create"); setView("create"); }} reelsAvailable={false}/>
      {connectionsOpen && <ConnectionsModal viewerId={session.userId} profile={profile} activeTab={connectionTab} onTabChange={setConnectionTab} onClose={() => setConnectionsOpen(false)} onOpenProfile={async (userId) => { setConnectionsOpen(false); await openProfile(userId); }} onRelationshipRemoved={handleConnectionRemoved}/>}
      {selectedStoryIndex !== null && activeStoryQueue[selectedStoryIndex] && <StoryViewer stories={activeStoryQueue} index={selectedStoryIndex} currentUserId={session.userId} onClose={() => { setSelectedStoryIndex(null); setStoryViewerStories(null); }} onSelectIndex={setSelectedStoryIndex} onViewed={handleStoryViewed} onDelete={handleDeleteStory} onOpenProfile={openProfile}/>}
      {storyCreatorOpen && <StoryCreatorStudio userId={session.userId} initialDraft={resumeDraft?.draftType === "STORY" ? resumeDraft : null} onClose={() => { setStoryCreatorOpen(false); setResumeDraft(null); }} onDraftSaved={() => undefined} onPublished={() => loadScreenData("home", session.userId, feedTab)}/>}
      {selectedPost && <PostDetail post={selectedPost} viewerId={session.userId} targetCommentId={targetCommentId} onClose={closePostDetail} onTogglePost={togglePost} onCommentCreated={incrementPostCommentCount} onEdit={() => setEditingPost(selectedPost)} onArchive={() => void handleArchivePost(selectedPost)} onOpenProfile={openProfile}/>}
      {editingPost && <PostEditDialog post={editingPost} userId={session.userId} onClose={() => setEditingPost(null)} onSaved={handlePostEdited}/>}
      {viewportMode !== "mobile" && view !== "chat" && <FloatingMessenger userId={session.userId} compactLauncher={view !== "home"} onOpenFullChat={() => navigateToView("chat")} onOpenStory={openStoryFromReply} openConversationRequest={miniChatRequest}/>}
      {appToast && <div className="app-global-toast" role="status">{appToast}</div>}
    </>);
}
