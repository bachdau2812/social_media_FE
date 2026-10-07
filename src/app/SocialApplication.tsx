import { ChevronLeft } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useViewportMode } from "../shared/hooks/useViewportMode";
import type { ViewKey } from "./router/navigation.types";
import { type Post, usePostMutationController } from "../features/post";
import { applyConnectionRemoval, type ConnectionTab, type ConnectionUserDto, type Profile, useProfileController } from "../features/profile";
import { archivedStoryToItem, type StoryArchiveDto, type StoryItem } from "../features/story";
import { ChatScreen, FloatingMessenger, chatApi, useChatUnreadCount, type ChatNavigationTarget } from "../features/chat";
import { NotificationScreen as FeatureNotificationScreen, refreshNotificationUnreadCount, startForegroundPushNotifications, stopForegroundPushNotifications, syncGrantedPushRegistration, unregisterPushDevice, useNotificationUnreadCount } from "../features/notification";
import { ConnectionsModal, ProfileScreen } from "../features/profile";
import { CreateContentMenu } from "./components/CreateContentMenu";
import { consumePendingNotificationDestination, decodeNotificationDeepLink, savePendingNotificationDestination, subscribeToNotificationNavigation, type AppDestination } from "../features/notification";
import { StoryCreatorStudio, StoryViewer, orderStoryQueue, storyApi, storyStartIndex, useStorySeenState, type StoryHighlightDto } from "../features/story";
import { libraryApi } from "../features/library";
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
import type { DraftResumeIntent } from "../features/library";
import { BootScreen, LoginScreen } from "../features/auth";
import { InlineError, MobileNav, Navigation } from "./components/Navigation";
import { MobileAppHeader } from "./components/MobileAppHeader";
import { HomeScreen, useFeedController } from "../features/feed";
import { SystemStates } from "./components/SystemStates";
import { useAuth } from "./providers/AuthProvider";
import { useToast } from "./providers/ToastProvider";
import { installPageVisibilityMediaController } from "./bootstrap/mediaController";
import { ResponsiveAppShell } from "./layouts/ResponsiveAppShell";
import { useAccountRealtime } from "./composition/useAccountRealtime";

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
    const { session, status: authStatus, error: authError, recoverableError: authErrorIsRecoverable, login, logout } = useAuth();
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
    const { loadSummary: loadProfileSummary } = useProfileController(session?.userId);
    const postMutations = usePostMutationController({
        userId: session?.userId,
        getPost: findPost,
        updatePost: updatePostSurfaces,
        onError: showAppToast,
        savePost: libraryApi.savePost,
    });
    const chatUnreadCount = useChatUnreadCount(session?.userId);
    const notificationUnreadCount = useNotificationUnreadCount(session?.userId);
    const viewportMode = useViewportMode();
    const [createMenuOpen, setCreateMenuOpen] = useState(false);
    const [miniChatRequest, setMiniChatRequest] = useState<(ChatNavigationTarget & {
        nonce: number;
    }) | null>(null);
    const storyCreatorOpen = Boolean(navigation.route.createStory);
    const [resumeDraft, setResumeDraft] = useState<DraftResumeIntent | null>(null);
    const { seenStoryIds, recentlySeenStoryIds, markSeen } = useStorySeenState(session?.userId);
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
        if (!session?.userId) initialDestinationHandled.current = false;
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
        const controller = new AbortController();
        void syncGrantedPushRegistration(session.userId, controller.signal).catch((error: unknown) => {
            if (controller.signal.aborted) return;
            console.warn("Unable to synchronize this device for push notifications:", error instanceof Error ? error.message : "Unknown error");
        });
        return () => controller.abort();
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
                const data = await loadProfileSummary(profileUserId ?? userId, userId);
                if (version === screenRequestVersion.current) setProfile(data);
            }
            if (version === screenRequestVersion.current) setStatus("ready");
        } catch (error) {
            if (version !== screenRequestVersion.current) return;
            setStatus("error");
            setErrorText(error instanceof Error ? error.message : "Request failed");
        }
    }, [loadFeed, invalidateFeed, loadProfileSummary, profileUserId]);
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
    useAccountRealtime(session?.userId, {
        onAvatarUploadResult: (data) => {
            showAppToast(data.result === "APPROVED" ? "Đã cập nhật ảnh đại diện" : "Ảnh đại diện không được chấp nhận");
            if (data.result === "APPROVED")
                setProfile((value) => value?.id === data.userId ? { ...value, avatarUrl: data.mediaUrl } : value);
        },
        onPostUploadResult: (data) => {
            const fallback = data.success ? "Bài viết đã được đăng" : "Không thể đăng bài viết";
            showAppToast(data.message || fallback);
            if (data.success && session)
                void loadScreenData("home", session.userId, feedTab);
        },
        onStoryUploadResult: (result) => {
            const fallback = result.success ? "Story đã được đăng" : "Không thể đăng Story";
            showAppToast(result.message || fallback);
            if (result.success && session)
                void loadScreenData("home", session.userId, feedTab);
        },
        onMusicFetchResult: (data) => {
            showAppToast(data.kind === "success"
                ? `Đã tải xong bài hát ${data.music.displayName}`
                : data.message || "Không thể tải bài hát");
        },
    });
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
        await unregisterPushDevice().catch((error: unknown) => {
            console.warn("Unable to remove this device's push registration:", error instanceof Error ? error.message : "Unknown error");
        });
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
            const conversation = await chatApi.direct(session.userId, targetUserId);
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
        setProfile((current) => applyConnectionRemoval(current, tab, row));
    }
    function findPost(postId: string) {
        return selectedPost?.id === postId ? selectedPost : posts.find((post) => post.id === postId) ?? profile?.posts.find((post) => post.id === postId) ?? profile?.reposts.find((post) => post.id === postId);
    }
    function updatePostSurfaces(postId: string, update: (post: Post) => Post) {
        setPosts((items) => items.map((post) => post.id === postId ? update(post) : post));
        setProfile((value) => value ? {
            ...value,
            posts: value.posts.map((post) => post.id === postId ? update(post) : post),
            reposts: value.reposts.map((post) => post.id === postId ? update(post) : post),
        } : value);
        setSelectedPost((value) => value?.id === postId ? update(value) : value);
    }
    function togglePost(postId: string, key: "liked" | "saved" | "reposted") {
        return postMutations.togglePost(postId, key);
    }
    function incrementPostCommentCount(postId: string) {
        postMutations.incrementCommentCount(postId);
    }
    function handlePostEdited(updated: Post) {
        postMutations.applyEditedPost(updated);
    }
    async function handleArchivePost(post: Post) {
        if (!session || post.author.id !== session.userId)
            return;
        await libraryApi.archivePost(session.userId, {
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
        void markSeen(storyId);
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
        return <LoginScreen errorText={errorText || authError} errorIsRecoverable={!errorText && authErrorIsRecoverable} loading={false} onLogin={handleLogin}/>;
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
        {view === "create" && <PostCreationStudio userId={session.userId} initialDraft={resumeDraft?.kind === "POST" ? resumeDraft.draft : null} onBack={() => { setResumeDraft(null); handleBackNavigation(); }} onClose={() => { setResumeDraft(null); handleBackNavigation(); }} onDraftSaved={() => undefined} onSaveDraft={(request) => libraryApi.saveDraft(session.userId, request)} onPublished={() => loadScreenData("home", session.userId, feedTab)}/>}
        {view === "notifications" && <FeatureNotificationScreen userId={session.userId} onNavigate={navigateToDestination}/>}
        {view === "library" && <Suspense fallback={<FeatureLoading/>}><FeatureLibraryScreen key={session.userId} userId={session.userId} onOpenPost={(postId) => { void navigateToDestination({ kind: "post", postId }); }} onOpenStory={(storyId) => {
                void storyApi.archive(session.userId, 0, 100).then((page) => {
                    const item = page.content.find((entry) => entry.id === storyId);
                    if (!item)
                        return;
                    openStoryQueue([archivedStoryToItem(item, { username: session.username, fullName: session.username })], 0, "owner");
                });
            }} onResumeDraft={(intent) => {
                setResumeDraft(intent);
                if (intent.kind === "STORY")
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
      {storyCreatorOpen && <StoryCreatorStudio userId={session.userId} initialDraft={resumeDraft?.kind === "STORY" ? resumeDraft.draft : null} onClose={() => { navigation.closeResource(); setResumeDraft(null); }} onSaveDraft={(request) => libraryApi.saveDraft(session.userId, request)} onDraftSaved={() => undefined} onPublished={() => loadScreenData("home", session.userId, feedTab)}/>}
      {navigation.route.postId && !selectedPost && <div className="modal-backdrop post-detail-backdrop" role="dialog" aria-modal="true"><section className="post-route-state" style={{ padding: 24, background: "var(--surface, white)", borderRadius: 16 }}><button onClick={closePostDetail}>Đóng</button>{postRouteError ? <div role="alert"><strong>Bài viết không còn tồn tại hoặc bạn không có quyền xem.</strong><button onClick={retryPostRoute}>Thử lại</button></div> : <div role="status">Đang tải bài viết…</div>}</section></div>}
      {selectedPost && <PostDetail post={selectedPost} viewerId={session.userId} targetCommentId={targetCommentId} onClose={closePostDetail} onTogglePost={togglePost} onCommentCreated={incrementPostCommentCount} onEdit={() => setEditingPost(selectedPost)} onArchive={() => void handleArchivePost(selectedPost)} onOpenProfile={openProfile}/>}
      {editingPost && <PostEditDialog post={editingPost} userId={session.userId} onClose={() => setEditingPost(null)} onSaved={handlePostEdited}/>}
      {viewportMode !== "mobile" && view !== "chat" && <FloatingMessenger userId={session.userId} compactLauncher={view !== "home"} onOpenFullChat={(id) => navigation.go(id ? routes.conversation(id) : routes.chat)} onOpenStory={openStoryFromReply} openConversationRequest={miniChatRequest}/>}
    </PostInteractionProvider>);
}
