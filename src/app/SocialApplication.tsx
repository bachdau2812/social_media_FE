import { ChevronLeft } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { apiGet, apiSend } from "../shared/api";
import { useViewportMode } from "../shared/hooks/useViewportMode";
import type { ViewKey } from "./router/navigation.types";
import { usePostEventStream, type Post, type RepostToggleResponse } from "../features/post";
import { profileApi, profileToView as mapProfileToView, type ConnectionTab, type ConnectionUserDto, type Profile } from "../features/profile";
import { archivedStoryToItem, type StoryArchiveDto, type StoryItem } from "../features/story";
import { ChatScreen, FloatingMessenger, useChatUnreadCount, type ChatNavigationTarget, type ConversationDto } from "../features/chat";
import { NotificationScreen as FeatureNotificationScreen, refreshNotificationUnreadCount, startForegroundPushNotifications, stopForegroundPushNotifications, syncGrantedPushRegistration, useNotificationUnreadCount } from "../features/notification";
import { ConnectionsModal, ProfileScreen } from "../features/profile";
import { CreateContentMenu } from "./components/CreateContentMenu";
import { consumePendingNotificationDestination, decodeNotificationDeepLink, savePendingNotificationDestination, subscribeToNotificationNavigation, type AppDestination } from "../features/notification";
import { StoryCreatorStudio, StoryViewer, orderStoryQueue, persistSeenStoryIds, readSeenStoryIds, storyApi, storyStartIndex, type StoryHighlightDto } from "../features/story";
import { PostCreationStudio, PostDetail, PostEditDialog } from "../features/post";
import { useFeedMediaSuspension } from "../features/post/hooks/useFeedMediaSuspension";
import { PostInteractionProvider } from "../features/post/hooks/PostInteractionProvider";
import { useAppNavigation } from "./router/useAppNavigation";
import { destinationPath } from "./router/appRoute";
import { usePostRoute } from "./router/usePostRoute";
import { useStoryRoute } from "./router/useStoryRoute";
import { routes } from "./router/routes";
import { ScreenLocationProvider } from "./router/ScreenLocation";
import { SuggestedFriendsPanel } from "../features/suggestions";
import type { ContentDraft } from "../features/library";
import { BootScreen, LoginScreen } from "../features/auth";
import { InlineError, MobileNav, Navigation } from "./components/Navigation";
import { MobileAppHeader } from "./components/MobileAppHeader";
import { HomeScreen, useFeedController } from "../features/feed";
import { SystemStates } from "./components/SystemStates";
import { useAuth } from "./providers/AuthProvider";
import { useToast } from "./providers/ToastProvider";
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
const ACTIVE_FEED_TAB_STORAGE_KEY = "social-media-active-feed-tab";
function readStoredFeedTab(): "DISCOVER" | "FRIENDS" {
    try {
        return sessionStorage.getItem(ACTIVE_FEED_TAB_STORAGE_KEY) === "FRIENDS" ? "FRIENDS" : "DISCOVER";
    }
    catch {
        return "DISCOVER";
    }
}
export default function SocialApplication() {
    const { session, status: authStatus, error: authError, login, logout } = useAuth();
    const navigation = useAppNavigation();
    const { go, openResource, restoreScroll } = navigation;
    const view = navigation.screen.view;
    const profileUserId = navigation.screen.profileUserId ?? session?.userId;
    const [feedTab, setFeedTab] = useState<"DISCOVER" | "FRIENDS">(readStoredFeedTab);
    const feedScrollPositions = useRef<Record<"DISCOVER" | "FRIENDS", number>>({ DISCOVER: 0, FRIENDS: 0 });
    const feed = useFeedController();
    const { posts, stories, hasMore: feedHasMore, loadingMore: feedLoadingMore, setPosts } = feed;
    const storyRoute = useStoryRoute(navigation.route.story, session?.userId);
    const selectedStoryIndex = storyRoute.index;
    const setSelectedStoryIndex = storyRoute.setIndex;
    const [profile, setProfile] = useState<Profile | null>(null);
    const [connectionTab, setConnectionTab] = useState<ConnectionTab>("FOLLOWERS");
    const [connectionsOpen, setConnectionsOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [status, setStatus] = useState<LoadState>("idle");
    const [errorText, setErrorText] = useState("");
    const { showToast: showAppToast } = useToast();
    const chatUnreadCount = useChatUnreadCount(session?.userId);
    const notificationUnreadCount = useNotificationUnreadCount(session?.userId);
    const viewportMode = useViewportMode();
    const [createMenuOpen, setCreateMenuOpen] = useState(false);
    const [miniChatRequest, setMiniChatRequest] = useState<(ChatNavigationTarget & {
        nonce: number;
    }) | null>(null);
    const storyCreatorOpen = Boolean(navigation.route.createStory);
    const [resumeDraft, setResumeDraft] = useState<ContentDraft | null>(null);
    const [seenStoryIds, setSeenStoryIds] = useState<Set<string>>(new Set());
    const [recentlySeenStoryIds, setRecentlySeenStoryIds] = useState<Set<string>>(new Set());
    const fullChatTarget = navigation.screen.chatTarget ?? null;
    const activeConversationId = fullChatTarget?.conversationId;
    const storyViewerStories = storyRoute.stories;
    const setStoryViewerStories = storyRoute.setStories;
    const targetCommentId = navigation.route.commentId ?? null;
    const { post: selectedPost, setPost: setSelectedPost, error: postRouteError, retry: retryPostRoute } = usePostRoute(
        navigation.route.postId, session?.userId, [...posts, ...(profile?.posts ?? []), ...(profile?.reposts ?? [])],
    );
    const activePostId = selectedPost?.id;
    const screenRequestVersion = useRef(0);
    const loadedFeedKey = useRef<string | null>(null);
    const loadFeed = feed.load;
    const invalidateFeed = feed.invalidate;
    const initialDestinationHandled = useRef(false);
    const navigateToDestination = useCallback(async (destination: AppDestination) => {
        if (!session?.userId) {
            savePendingNotificationDestination(destination);
            return;
        }
        setCreateMenuOpen(false);
        setConnectionsOpen(false);
        if (destination.kind === "conversation" && destination.surface === "mini" && viewportMode !== "mobile") {
            setMiniChatRequest({ ...destination, nonce: Date.now() });
        } else if (destination.kind === "post" || destination.kind === "story") {
            openResource(destinationPath(destination));
        } else go(destinationPath(destination));
    }, [session?.userId, viewportMode, go, openResource]);
    useEffect(() => {
        if (session?.userId) {
            setSeenStoryIds(readSeenStoryIds(session.userId));
            setRecentlySeenStoryIds(new Set());
        } else initialDestinationHandled.current = false;
    }, [session?.userId]);
    useEffect(() => installPageVisibilityMediaController(), []);
    useEffect(() => {
        if (initialDestinationHandled.current)
            return;
        const destination = decodeNotificationDeepLink(`${navigation.location.pathname}${navigation.location.search}`);
        if (!session?.userId) {
            if (destination)
                savePendingNotificationDestination(destination);
            return;
        }
        const target = consumePendingNotificationDestination();
        initialDestinationHandled.current = true;
        if (target && navigation.location.pathname === "/" && !navigation.location.search) {
            void navigateToDestination(target);
        }
    }, [session?.userId, navigation.location.pathname, navigation.location.search, navigateToDestination]);
    useEffect(() => subscribeToNotificationNavigation((destination) => {
        if (!session?.userId) {
            savePendingNotificationDestination(destination);
            return;
        }
        void navigateToDestination(destination);
    }), [session?.userId, navigateToDestination]);
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
            getActiveDestination: () => view === "chat" && activeConversationId ? { kind: "conversation", conversationId: activeConversationId } : activePostId ? { kind: "post", postId: activePostId } : null,
            onReceived: () => {
                refreshNotificationUnreadCount();
                if (view === "notifications")
                    window.dispatchEvent(new Event("notification-refresh"));
            },
        });
        return () => stopForegroundPushNotifications();
    }, [session?.userId, view, activeConversationId, activePostId]);
    useEffect(() => {
        try {
            sessionStorage.setItem(ACTIVE_FEED_TAB_STORAGE_KEY, feedTab);
        }
        catch { /* Storage can be unavailable in privacy mode. */ }
    }, [feedTab]);
    const loadScreenData = useCallback(async (target: ViewKey, userId: string, tab: "DISCOVER" | "FRIENDS", reuseFeed = false) => {
        const version = ++screenRequestVersion.current;
        setStatus("loading");
        setErrorText("");
        try {
            if (target === "home") {
                const key = `${userId}:${tab}`;
                if (!reuseFeed || loadedFeedKey.current !== key) {
                    await loadFeed(userId, tab);
                    if (version === screenRequestVersion.current) loadedFeedKey.current = key;
                }
            } else invalidateFeed();
            if (target === "profile") {
                const data = await profileApi.getSummary(profileUserId ?? userId, userId);
                if (version === screenRequestVersion.current) setProfile(mapProfileToView(data));
            }
            if (version === screenRequestVersion.current) setStatus("ready");
        } catch (error) {
            if (version !== screenRequestVersion.current) return;
            setStatus("error");
            setErrorText(error instanceof Error ? error.message : "Request failed");
        }
    }, [loadFeed, invalidateFeed, profileUserId]);
    useEffect(() => {
        if (session?.userId && navigation.screen.known) void loadScreenData(view, session.userId, feedTab, true);
        return () => { screenRequestVersion.current += 1; };
    }, [view, feedTab, session?.userId, loadScreenData, navigation.screen.known]);
    useLayoutEffect(() => { if (status === "ready") restoreScroll(); }, [status, restoreScroll]);
    useFeedMediaSuspension({
        postDetailOpen: Boolean(selectedPost),
        storyCreatorOpen,
        storyViewerOpen: selectedStoryIndex !== null,
    });
    usePostEventStream(session?.userId, {
        onAvatarUploadResult: (data) => {
            showAppToast(data.result === "APPROVED" ? "Đã cập nhật ảnh đại diện" : "Ảnh đại diện không được chấp nhận");
            if (data.result === "APPROVED")
                setProfile((value) => value?.id === data.userId ? { ...value, avatarUrl: data.mediaUrl } : value);
        },
        onUploadResult: (data) => {
            const fallback = data.kind === "story"
                ? data.success ? "Story đã được đăng" : "Không thể đăng Story"
                : data.success ? "Bài viết đã được đăng" : "Không thể đăng bài viết";
            showAppToast(data.message || fallback);
            if (data.success && session)
                void loadScreenData("home", session.userId, feedTab);
        },
        onMusicFetchResult: (data) => {
            showAppToast(data.kind === "success"
                ? `Đã tải xong bài hát ${data.music.displayName}`
                : data.message || "Không thể tải bài hát");
        },
    }, feedTab);
    async function handleLogin(username: string, password: string) {
        setErrorText("");
        try {
            await login(username, password);
        }
        catch (error) {
            setErrorText(error instanceof Error ? error.message : "Login failed");
        }
    }
    async function handleLogout() {
        await logout();
        try {
            sessionStorage.removeItem(ACTIVE_FEED_TAB_STORAGE_KEY);
        }
        catch { /* Ignore unavailable storage. */ }
        feed.clear();
        loadedFeedKey.current = null;
        setProfile(null);
        navigation.go(routes.home, { replace: true });
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
    function openPostDetail(post: Post, commentId: string | null = null) {
        setSelectedPost(post);
        navigation.openResource(destinationPath({ kind: "post", postId: post.id, ...(commentId ? { commentId } : {}) }));
    }
    function closePostDetail() {
        navigation.closeResource();
    }
    function switchFeedTab(nextTab: "DISCOVER" | "FRIENDS") {
        if (nextTab === feedTab)
            return;
        feedScrollPositions.current[feedTab] = window.scrollY;
        setFeedTab(nextTab);
        window.setTimeout(() => window.scrollTo({ top: feedScrollPositions.current[nextTab] ?? 0, behavior: "auto" }), 80);
    }
    async function openProfile(userId: string, navigate = true) {
        if (!session)
            return;
        if (navigate) navigation.go(routes.profile(userId));
        else await loadScreenData("profile", session.userId, feedTab);
    }
    async function openChatForUser(targetUserId: string) {
        if (!session)
            return;
        try {
            const conversation = await apiSend<ConversationDto>(`/chat/conversations/direct?actorId=${encodeURIComponent(session.userId)}`, "POST", { targetUserId });
            if (viewportMode === "mobile") {
                navigation.go(routes.conversation(conversation.id));
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
        setConnectionsOpen(false);
        setSelectedStoryIndex(null);
        navigation.go(target === "profile" && session ? routes.profile(session.userId) : target === "home" ? routes.home : `/${target}`);
    }
    function handleBackNavigation() {
        if (selectedPost) {
            closePostDetail();
            return;
        }
        if (selectedStoryIndex !== null) {
            navigation.closeResource();
            return;
        }
        if (connectionsOpen) {
            setConnectionsOpen(false);
            return;
        }
        navigation.back();
    }
    function reloadHomeFromSidebar() {
        if (view === "home" && !navigation.resourceOpen && session) void loadScreenData("home", session.userId, feedTab);
        else navigation.go(routes.home);
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
        openStoryQueue(items, 0, "owner");
    }
    function openStoryQueue(queue: StoryItem[], index: number, scope: "owner" | "rail" = "rail") {
        const item = queue[index];
        if (!item) return;
        storyRoute.seed(queue, index);
        navigation.openResource(destinationPath({ kind: "story", ownerId: item.userId, storyId: item.id, scope }));
    }
    function selectStoryIndex(index: number) {
        const item = storyViewerStories[index];
        if (!item) return;
        setSelectedStoryIndex(index);
        navigation.openResource(destinationPath({ kind: "story", ownerId: item.userId, storyId: item.id, scope: navigation.route.story?.scope ?? "rail" }), { replace: true });
    }
    async function handleDeleteStory(storyId: string) {
        if (!session)
            return;
        await storyApi.deleteStory(storyId);
        const nextQueue = storyViewerStories.filter((story) => story.id !== storyId);
        if (!nextQueue.length) {
            navigation.closeResource();
        }
        else {
            setStoryViewerStories(nextQueue);
            const index = Math.min(selectedStoryIndex ?? 0, nextQueue.length - 1);
            openStoryQueue(nextQueue, index, navigation.route.story?.scope === "owner" ? "owner" : "rail");
        }
        void loadScreenData("home", session.userId, feedTab);
        showAppToast("Đã xóa Story");
    }
    if (authStatus === "loading")
        return <BootScreen />;
    const orderedStories = session ? orderStoryQueue(stories, session.userId, seenStoryIds, recentlySeenStoryIds) : stories;
    const activeStoryQueue = storyViewerStories;
    if (!session)
        return <LoginScreen errorText={errorText || authError} loading={false} onLogin={handleLogin}/>;
    const showBackButton = navigation.hasBack;
    const shellClassName = view === "home" ? "home-shell" : view === "chat" ? "chat-shell" : "centered-shell";
    const showMobileChrome = view !== "create";
    const coveringOverlayOpen = storyCreatorOpen || Boolean(navigation.route.story) || Boolean(editingPost) || connectionsOpen || createMenuOpen;
    return (<PostInteractionProvider viewerId={session.userId} feedBlocked={Boolean(navigation.route.postId) || coveringOverlayOpen} detailBlocked={coveringOverlayOpen}>
      <ScreenLocationProvider location={navigation.screenLocation}><ResponsiveAppShell
        className={shellClassName}
        viewportMode={viewportMode}
        desktopNavigation={<Navigation active={view} chatUnreadCount={chatUnreadCount} notificationUnreadCount={notificationUnreadCount} onNavigate={navigateToView} onReloadHome={reloadHomeFromSidebar} onLogout={handleLogout}/>}
        mobileHeader={showMobileChrome ? <MobileAppHeader title={MOBILE_VIEW_TITLES[view]} canGoBack={showBackButton && view !== "chat"} onBack={handleBackNavigation} onNavigate={navigateToView}/> : null}
        mobileNavigation={showMobileChrome ? <MobileNav active={view} chatUnreadCount={chatUnreadCount} notificationUnreadCount={notificationUnreadCount} onNavigate={navigateToView}/> : null}
        rightRail={view === "home" ? <aside className="right-rail"><SuggestedFriendsPanel viewerId={session.userId} onOpenProfile={openProfile} onOpenChat={openChatForUser}/></aside> : null}
      >
        {showBackButton && viewportMode !== "mobile" && view !== "chat" && <button type="button" className="app-back-button" onClick={handleBackNavigation} aria-label="Quay lại màn trước" title="Quay lại"><ChevronLeft size={20}/></button>}
        {status === "error" && <InlineError message={errorText} onRetry={() => loadScreenData(view, session.userId, feedTab)}/>}
        {!navigation.route.known && <div role="alert" className="feed-state"><strong>Không tìm thấy trang</strong><button onClick={() => navigation.go(routes.home, { replace: true })}>Về trang chủ</button></div>}
        {navigation.route.known && view === "home" && <HomeScreen userId={session.userId} tab={feedTab} setTab={switchFeedTab} stories={orderedStories} posts={posts} status={status} hasMore={feedHasMore} loadingMore={feedLoadingMore} onLoadMore={loadMoreFeed} onSelectPost={openPostDetail} onCreateStory={() => navigation.openResource(routes.createStory)} onSelectStory={(story) => { const queue = [...orderedStories]; openStoryQueue(queue, storyStartIndex(queue, story.userId)); }} onTogglePost={togglePost} onEditPost={setEditingPost} onArchivePost={handleArchivePost} onOpenProfile={openProfile}/>}
        {view === "search" && <Suspense fallback={<FeatureLoading/>}><FeatureSearchScreen viewerId={session.userId} onSelectPost={openPostDetail} onOpenProfile={openProfile}/></Suspense>}
        {view === "create" && <PostCreationStudio userId={session.userId} initialDraft={resumeDraft?.draftType === "POST" ? resumeDraft : null} onBack={() => { setResumeDraft(null); handleBackNavigation(); }} onClose={() => { setResumeDraft(null); handleBackNavigation(); }} onDraftSaved={() => undefined} onPublished={() => loadScreenData("home", session.userId, feedTab)}/>}
        {view === "notifications" && <FeatureNotificationScreen userId={session.userId} onNavigate={navigateToDestination}/>}
        {view === "library" && <Suspense fallback={<FeatureLoading/>}><FeatureLibraryScreen userId={session.userId} onOpenPost={(postId) => { void navigateToDestination({ kind: "post", postId }); }} onOpenStory={(storyId) => {
                void storyApi.archive(session.userId, 0, 100).then((page) => {
                    const item = page.content.find((entry) => entry.id === storyId);
                    if (!item)
                        return;
                    openStoryQueue([archivedStoryToItem(item, { username: session.username, fullName: session.username })], 0, "owner");
                });
            }} onResumeDraft={(draft: ContentDraft) => {
                setResumeDraft(draft);
                if (draft.draftType === "STORY")
                    navigation.openResource(routes.createStory);
                else
                    navigation.go(routes.createPost);
            }}/></Suspense>}
        {view === "chat" && <ChatScreen userId={session.userId} username={session.username} onOpenProfile={openProfile} onOpenStory={openStoryFromReply} initialTarget={fullChatTarget} onSelectConversation={(id) => navigation.go(id ? routes.conversation(id) : routes.chat)}/>}
        {view === "profile" && <ProfileScreen viewerId={session.userId} profile={profile?.id === profileUserId ? profile : null} onSelectPost={openPostDetail} onOpenStoryHighlight={openStoryHighlight} onOpenArchive={() => navigateToView("library")} onOpenConnections={openConnections} onRefresh={async () => {
                if (profile)
                    await openProfile(profile.id, false);
            }} onMessage={openChatForUser} onOpenProfile={openProfile}/>}
        {view === "settings" && <Suspense fallback={<FeatureLoading/>}><FeatureSettingsScreen userId={session.userId}/></Suspense>}
        {view === "states" && <SystemStates />}
      </ResponsiveAppShell></ScreenLocationProvider>
      <CreateContentMenu open={createMenuOpen} onClose={() => setCreateMenuOpen(false)} onCreatePost={() => { setCreateMenuOpen(false); navigation.go(routes.createPost); }} reelsAvailable={false}/>
      {connectionsOpen && <ConnectionsModal viewerId={session.userId} profile={profile} activeTab={connectionTab} onTabChange={setConnectionTab} onClose={() => setConnectionsOpen(false)} onOpenProfile={async (userId) => { setConnectionsOpen(false); await openProfile(userId); }} onRelationshipRemoved={handleConnectionRemoved}/>}
      {navigation.route.story && selectedStoryIndex === null && <div className="modal-backdrop" role="dialog" aria-modal="true"><section style={{ padding: 24, background: "var(--surface, white)", borderRadius: 16 }}><button onClick={navigation.closeResource}>Đóng</button>{storyRoute.error ? <div role="alert">Không thể tải Story.<button onClick={storyRoute.retry}>Thử lại</button></div> : <div role="status">Đang tải Story…</div>}</section></div>}
      {selectedStoryIndex !== null && activeStoryQueue[selectedStoryIndex] && <StoryViewer stories={activeStoryQueue} index={selectedStoryIndex} currentUserId={session.userId} onClose={navigation.closeResource} onSelectIndex={selectStoryIndex} onViewed={handleStoryViewed} onDelete={handleDeleteStory} onOpenProfile={openProfile}/>}
      {storyCreatorOpen && <StoryCreatorStudio userId={session.userId} initialDraft={resumeDraft?.draftType === "STORY" ? resumeDraft : null} onClose={() => { navigation.closeResource(); setResumeDraft(null); }} onDraftSaved={() => undefined} onPublished={() => loadScreenData("home", session.userId, feedTab)}/>}
      {navigation.route.postId && !selectedPost && <div className="modal-backdrop post-detail-backdrop" role="dialog" aria-modal="true"><section className="post-route-state" style={{ padding: 24, background: "var(--surface, white)", borderRadius: 16 }}><button onClick={closePostDetail}>Đóng</button>{postRouteError ? <div role="alert"><strong>Bài viết không còn tồn tại hoặc bạn không có quyền xem.</strong><button onClick={retryPostRoute}>Thử lại</button></div> : <div role="status">Đang tải bài viết…</div>}</section></div>}
      {selectedPost && <PostDetail post={selectedPost} viewerId={session.userId} targetCommentId={targetCommentId} onClose={closePostDetail} onTogglePost={togglePost} onCommentCreated={incrementPostCommentCount} onEdit={() => setEditingPost(selectedPost)} onArchive={() => void handleArchivePost(selectedPost)} onOpenProfile={openProfile}/>}
      {editingPost && <PostEditDialog post={editingPost} userId={session.userId} onClose={() => setEditingPost(null)} onSaved={handlePostEdited}/>}
      {viewportMode !== "mobile" && view !== "chat" && <FloatingMessenger userId={session.userId} compactLauncher={view !== "home"} onOpenFullChat={(id) => navigation.go(id ? routes.conversation(id) : routes.chat)} onOpenStory={openStoryFromReply} openConversationRequest={miniChatRequest}/>}
    </PostInteractionProvider>);
}
