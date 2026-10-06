import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const SocialApplication = lazy(() => import("../SocialApplication"));

function RouteFallback() {
  return <div className="app-route-fallback" role="status" aria-label="Đang tải"><span /><span /><span /></div>;
}

export function AppRouter() {
  return (
    <Routes>
      {/* One application instance retains feed state and shared telemetry across URLs. */}
      <Route path="*" element={<Suspense fallback={<RouteFallback />}><SocialApplication /></Suspense>} />
    </Routes>
  );
}
