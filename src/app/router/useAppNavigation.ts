import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useNavigationType, type Location, type NavigateOptions } from "react-router-dom";
import { canonicalAppPath, isResourceRoute, readAppRoute } from "./appRoute";
import { routes } from "./routes";

type BackgroundLocation = Location;
type NavigationState = { backgroundLocation?: BackgroundLocation; depth?: number; localSheet?: { id: string; parentKey: string } };

function readState(location: Location): NavigationState {
  const value = location.state as NavigationState | null;
  const background = value?.backgroundLocation;
  return {
    depth: typeof value?.depth === "number" && value.depth >= 0 ? value.depth : 0,
    ...(typeof value?.localSheet?.id === "string" && typeof value.localSheet.parentKey === "string" ? { localSheet: value.localSheet } : {}),
    ...(background && typeof background.pathname === "string" && background.pathname.startsWith("/")
      && typeof background.search === "string" && typeof background.key === "string"
      && readAppRoute(background).known && !isResourceRoute(readAppRoute(background))
      ? { backgroundLocation: background } : {}),
  };
}

export function useAppNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const previousLocation = useRef(location);
  const preserveScroll = useMemo(() => {
    const previous = previousLocation.current;
    return previous.key !== location.key && previous.pathname === location.pathname && (
      (previous.search === location.search && previous.hash === location.hash &&
        Boolean(readState(previous).localSheet || readState(location).localSheet)) || navigationType === "REPLACE"
    );
  }, [location, navigationType]);
  const route = useMemo(() => readAppRoute(location), [location.pathname, location.search]);
  const state = readState(location);
  const resourceOpen = isResourceRoute(route);
  const background = resourceOpen ? state.backgroundLocation : undefined;
  const screen = background ? readAppRoute(background) : route;
  const screenLocation = background ?? (state.localSheet ? { ...location, key: state.localSheet.parentKey } : location);
  const scrollKey = screenLocation.key;
  const isRestoringScroll = useMemo(() => navigationType === "POP" && positions.current.has(scrollKey), [navigationType, scrollKey]);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    // Native POP navigation must preserve the departing entry too. Modal scroll
    // locking may reset scrollY, so track only the visible underlying screen.
    if (resourceOpen || state.localSheet) return;
    const save = () => {
      positions.current.set(scrollKey, window.scrollY);
      if (positions.current.size > 200) positions.current.delete(positions.current.keys().next().value!);
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [scrollKey, resourceOpen, state.localSheet]);

  useEffect(() => {
    const canonical = canonicalAppPath(location);
    if (canonical) navigate(canonical, { replace: true, state: location.state });
  }, [location, navigate]);

  const restoreScroll = useCallback(() => {
    if (!resourceOpen && !preserveScroll && navigationType === "POP") {
      window.scrollTo({ top: positions.current.get(scrollKey) ?? 0, behavior: "auto" });
    }
  }, [scrollKey, resourceOpen, navigationType, preserveScroll]);

  useLayoutEffect(() => {
    if (!resourceOpen && !preserveScroll) {
      if (navigationType === "POP") restoreScroll();
      else window.scrollTo({ top: 0, behavior: "auto" });
    }
    previousLocation.current = location;
  }, [location, resourceOpen, navigationType, restoreScroll, preserveScroll]);

  const go = useCallback((path: string, options: NavigateOptions = {}) => {
    if (path === `${location.pathname}${location.search}` && !resourceOpen) return;
    positions.current.set(location.key, window.scrollY);
    navigate(path, { ...options, state: { depth: (state.depth ?? 0) + (options.replace ? 0 : 1), ...options.state } });
  }, [location, navigate, resourceOpen, state.depth]);

  const openResource = useCallback((path: string, options: NavigateOptions = {}) => {
    if (path === `${location.pathname}${location.search}`) return;
    positions.current.set(location.key, window.scrollY);
    const backgroundLocation = background ?? (!resourceOpen ? {
      pathname: location.pathname, search: location.search, hash: location.hash, key: location.key, state: { depth: state.depth ?? 0 },
    } : undefined);
    const replace = options.replace ?? resourceOpen;
    navigate(path, { ...options, replace, state: {
      depth: (state.depth ?? 0) + (replace ? 0 : 1), backgroundLocation,
    } });
  }, [location, navigate, background, resourceOpen, state.depth]);

  const closeResource = useCallback(() => {
    if (background && (state.depth ?? 0) > 0) navigate(-1);
    else navigate("/", { replace: true });
  }, [background, state.depth, navigate]);
  const back = useCallback(() => {
    if (resourceOpen) closeResource();
    else if ((state.depth ?? 0) > 0) {
      positions.current.set(location.key, window.scrollY);
      navigate(-1);
    } else navigate(route.profileFeedPostId && route.profileUserId ? routes.profile(route.profileUserId) : "/", { replace: true });
  }, [resourceOpen, closeResource, state.depth, location.key, navigate, route.profileFeedPostId, route.profileUserId]);

  return { location, route, screen, screenLocation, resourceOpen, navigate, go, openResource, closeResource, back, restoreScroll,
    isPopNavigation: navigationType === "POP",
    isRestoringScroll, hasBackground: Boolean(background),
    hasBack: (state.depth ?? 0) > 0 || location.pathname !== "/" };
}
