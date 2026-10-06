import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useNavigationType, type Location, type NavigateOptions } from "react-router-dom";
import { canonicalAppPath, isResourceRoute, readAppRoute } from "./appRoute";

type BackgroundLocation = Location;
type NavigationState = { backgroundLocation?: BackgroundLocation; depth?: number };

function readState(location: Location): NavigationState {
  const value = location.state as NavigationState | null;
  const background = value?.backgroundLocation;
  return {
    depth: typeof value?.depth === "number" && value.depth >= 0 ? value.depth : 0,
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
  const route = useMemo(() => readAppRoute(location), [location]);
  const state = readState(location);
  const resourceOpen = isResourceRoute(route);
  const background = resourceOpen ? state.backgroundLocation : undefined;
  const screen = background ? readAppRoute(background) : route;
  const screenLocation = background ?? location;

  useLayoutEffect(() => {
    // Native POP navigation must preserve the departing entry too. Modal scroll
    // locking may reset scrollY, so track only the visible underlying screen.
    if (resourceOpen) return;
    const save = () => {
      positions.current.set(location.key, window.scrollY);
      if (positions.current.size > 200) positions.current.delete(positions.current.keys().next().value!);
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.key, resourceOpen]);

  useEffect(() => {
    const canonical = canonicalAppPath(location);
    if (canonical) navigate(canonical, { replace: true, state: location.state });
  }, [location, navigate]);

  const restoreScroll = useCallback(() => {
    if (!resourceOpen && navigationType === "POP") {
      window.scrollTo({ top: positions.current.get(location.key) ?? 0, behavior: "auto" });
    }
  }, [location.key, resourceOpen, navigationType]);

  useLayoutEffect(() => {
    if (!resourceOpen) {
      if (navigationType === "POP") restoreScroll();
      else window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.key, resourceOpen, navigationType, restoreScroll]);

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
    } else navigate("/", { replace: true });
  }, [resourceOpen, closeResource, state.depth, location.key, navigate]);

  return { location, route, screen, screenLocation, resourceOpen, navigate, go, openResource, closeResource, back, restoreScroll,
    hasBack: (state.depth ?? 0) > 0 || location.pathname !== "/" };
}
