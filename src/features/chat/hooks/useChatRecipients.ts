import { useEffect, useState } from "react";
import { chatApi } from "../api/chat.api";
import type { ChatUserSuggestion } from "../model/chat.types";

export function useChatRecipients(userId: string) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChatUserSuggestion[]>([]);
  const [selected, setSelected] = useState<ChatUserSuggestion[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let current = true;
    const timer = window.setTimeout(() => {
      setStatus("loading");
      void chatApi.suggestions(userId, query.trim()).then((items) => { if (current) { setResults(items ?? []); setStatus("ready"); } })
        .catch(() => { if (current) setStatus("error"); });
    }, query ? 280 : 0);
    return () => { current = false; window.clearTimeout(timer); };
  }, [query, userId, revision]);
  const toggle = (user: ChatUserSuggestion) => setSelected((items) => items.some((item) => item.id === user.id) ? items.filter((item) => item.id !== user.id) : [...items, user]);
  return { query, setQuery, results, selected, toggle, status, retry: () => setRevision((value) => value + 1) };
}
