import { API_BASE_URL } from "../api";

export type RawAccountEvent = { type: string; data: string; lastEventId: string };
export type AccountEventListener = (event: RawAccountEvent) => void;

type AccountSession = {
  source: EventSource;
  subscribers: Map<string, Set<AccountEventListener>>;
  dispatchers: Map<string, EventListener>;
};

const sessions = new Map<string, AccountSession>();

/** One raw, credentialed SSE connection per account; event names and payloads stay opaque here. */
export function subscribeAccountEvents(
  userId: string | null | undefined,
  eventTypes: readonly string[],
  listener: AccountEventListener,
) {
  if (!userId || typeof EventSource === "undefined") return () => undefined;
  const types = [...new Set(eventTypes.filter((type) => type.trim().length > 0))];
  if (types.length === 0) return () => undefined;

  let session = sessions.get(userId);
  if (!session) {
    try {
      const source = new EventSource(`${API_BASE_URL}/posts/sse/${encodeURIComponent(userId)}`, { withCredentials: true });
      session = { source, subscribers: new Map(), dispatchers: new Map() };
      sessions.set(userId, session);
    } catch {
      return () => undefined;
    }
  }

  for (const type of types) {
    const subscribers = session.subscribers.get(type) ?? new Set<AccountEventListener>();
    subscribers.add(listener);
    session.subscribers.set(type, subscribers);
    if (!session.dispatchers.has(type)) {
      const dispatch: EventListener = (event) => {
        const message = event as MessageEvent<unknown>;
        const raw: RawAccountEvent = {
          type,
          data: typeof message.data === "string" ? message.data : "",
          lastEventId: typeof message.lastEventId === "string" ? message.lastEventId : "",
        };
        for (const subscriber of [...(session?.subscribers.get(type) ?? [])]) {
          try { subscriber(raw); }
          catch (error) { console.error("Account event listener failed", error); }
        }
      };
      session.dispatchers.set(type, dispatch);
      session.source.addEventListener(type, dispatch);
    }
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    for (const type of types) {
      const subscribers = session?.subscribers.get(type);
      subscribers?.delete(listener);
      if (subscribers?.size === 0) session?.subscribers.delete(type);
    }
    if (session && session.subscribers.size === 0 && sessions.get(userId) === session) {
      session.source.close();
      sessions.delete(userId);
    }
  };
}
