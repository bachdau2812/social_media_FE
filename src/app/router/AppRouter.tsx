import { lazy, Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { RouteStateAdapter } from "./RouteStateAdapter";

const SocialApplication = lazy(() => import("../SocialApplication"));

type RouteView = "home" | "search" | "create" | "profile" | "notifications" | "library" | "settings" | "chat";

function ApplicationScreen({ view }: { view: RouteView }) {
  return (
    <RouteStateAdapter view={view}>
      <Suspense fallback={<RouteFallback />}><SocialApplication /></Suspense>
    </RouteStateAdapter>
  );
}

function ProfileRouteScreen() {
  const { userId } = useParams();
  return (
    <RouteStateAdapter view="profile" profileUserId={userId}>
      <Suspense fallback={<RouteFallback />}><SocialApplication /></Suspense>
    </RouteStateAdapter>
  );
}

function RouteFallback() {
  return <div className="app-route-fallback" role="status" aria-label="Đang tải"><span /><span /><span /></div>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationScreen view="home" />} />
      <Route path="/search" element={<ApplicationScreen view="search" />} />
      <Route path="/notifications" element={<ApplicationScreen view="notifications" />} />
      <Route path="/library" element={<ApplicationScreen view="library" />} />
      <Route path="/settings/:section?" element={<ApplicationScreen view="settings" />} />
      <Route path="/chat/:conversationId?" element={<ApplicationScreen view="chat" />} />
      <Route path="/profile/:userId" element={<ProfileRouteScreen />} />
      <Route path="/post/:postId" element={<ApplicationScreen view="home" />} />
      <Route path="/story/:ownerId/:storyId?" element={<ApplicationScreen view="home" />} />
      <Route path="/create/post" element={<ApplicationScreen view="create" />} />
      <Route path="/create/story" element={<ApplicationScreen view="home" />} />
      <Route path="/create/reel" element={<ApplicationScreen view="create" />} />
      <Route path="*" element={<ApplicationScreen view="home" />} />
    </Routes>
  );
}
