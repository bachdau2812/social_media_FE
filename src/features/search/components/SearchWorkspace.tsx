import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar as SharedAvatar } from "../../../shared/components/Avatar";
import type { PostSearchMedia, PostSearchResult, SearchRelationship, UserSearchResult } from "../model/search.types";
import styles from "./SearchWorkspace.module.css";

export type SearchTab = "users" | "posts";
export type { PostSearchMedia, PostSearchResult, SearchRelationship, UserSearchResult } from "../model/search.types";

export interface SearchLoadArgs {
  query: string;
  signal: AbortSignal;
}

export interface SearchWorkspaceProps {
  query: string;
  onQueryChange: (query: string) => void;
  loadUsers: (args: SearchLoadArgs) => Promise<UserSearchResult[]>;
  loadPosts: (args: SearchLoadArgs) => Promise<PostSearchResult[]>;
  onSelectUser: (user: UserSearchResult) => void;
  onSelectPost: (post: PostSearchResult) => void;
  initialTab?: SearchTab;
  debounceMs?: number;
}

type SearchStatus = "idle" | "loading" | "success" | "error";

const relationshipLabels: Record<SearchRelationship, string> = {
  none: "",
  follows_you: "Follows you",
  following: "Following",
  friends: "Friends",
};

function Avatar({ src, name }: { src: string | null; name: string }) {
  return <SharedAvatar src={src} name={name} alt={name} className={styles.avatar} fallbackClassName={styles.avatarFallback} />;
}

export function SearchWorkspace({
  query,
  onQueryChange,
  loadUsers,
  loadPosts,
  onSelectUser,
  onSelectPost,
  initialTab = "users",
  debounceMs = 350,
}: SearchWorkspaceProps) {
  const [tab, setTab] = useState<SearchTab>(initialTab);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [users, setUsers] = useState<UserSearchResult[]>([]);
  const [posts, setPosts] = useState<PostSearchResult[]>([]);
  const [retryVersion, setRetryVersion] = useState(0);
  const requestVersion = useRef(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const executeSearch = useCallback(
    async (activeTab: SearchTab, activeQuery: string, signal: AbortSignal, version: number) => {
      try {
        if (activeTab === "users") {
          const nextUsers = await loadUsers({ query: activeQuery, signal });
          if (signal.aborted || version !== requestVersion.current) return;
          setUsers(nextUsers);
        } else {
          const nextPosts = await loadPosts({ query: activeQuery, signal });
          if (signal.aborted || version !== requestVersion.current) return;
          setPosts(nextPosts);
        }
        setStatus("success");
      } catch (error) {
        if (signal.aborted || version !== requestVersion.current) return;
        setStatus("error");
      }
    },
    [loadPosts, loadUsers],
  );

  useEffect(() => {
    const normalizedQuery = query.trim();
    const controller = new AbortController();
    const version = ++requestVersion.current;

    if (!normalizedQuery) {
      setStatus("idle");
      setUsers([]);
      setPosts([]);
      return () => controller.abort();
    }

    setStatus("loading");
    const timer = window.setTimeout(() => {
      void executeSearch(tab, normalizedQuery, controller.signal, version);
    }, debounceMs);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [debounceMs, executeSearch, query, retryVersion, tab]);

  const activeResults = tab === "users" ? users : posts;

  return (
    <section className={styles.workspace} aria-label="Search">
      <div className={styles.tabs} role="tablist" aria-label="Search type">
        <button
          className={tab === "users" ? styles.activeTab : styles.tab}
          type="button"
          role="tab"
          aria-selected={tab === "users"}
          onClick={() => setTab("users")}
        >
          Users
        </button>
        <button
          className={tab === "posts" ? styles.activeTab : styles.tab}
          type="button"
          role="tab"
          aria-selected={tab === "posts"}
          onClick={() => setTab("posts")}
        >
          Posts
        </button>
      </div>

      <label className={styles.searchField}>
        <Search size={18} aria-hidden="true" />
        <span className={styles.srOnly}>Search {tab}</span>
        <input
          ref={searchInputRef}
          type="search"
          value={query}
          placeholder={tab === "users" ? "Search by username" : "Search posts"}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {query && (
          <button
            className={styles.clearSearch}
            type="button"
            aria-label="Clear search"
            onClick={() => {
              onQueryChange("");
              searchInputRef.current?.focus();
            }}
          >
            <X size={17} aria-hidden="true" />
          </button>
        )}
      </label>

      <div className={styles.results} aria-live="polite">
        {!query.trim() && (
          <div className={styles.quietState}>
            <Search size={22} aria-hidden="true" />
            <p>Start typing to search {tab}.</p>
          </div>
        )}

        {query.trim() && status === "loading" && (
          <div className={styles.status} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            Searching
          </div>
        )}

        {query.trim() && status === "error" && (
          <div className={styles.quietState} role="alert">
            <strong>Search failed</strong>
            <p>Check your connection and try again.</p>
            <button type="button" onClick={() => setRetryVersion((value) => value + 1)}>
              Retry search
            </button>
          </div>
        )}

        {query.trim() && status === "success" && activeResults.length === 0 && (
          <div className={styles.quietState}>
            <p>No {tab} found</p>
          </div>
        )}

        {tab === "users" && status === "success" && users.length > 0 && (
          <div className={styles.userList}>
            {users.map((user) => (
              <button
                className={styles.userRow}
                type="button"
                key={user.id}
                aria-label={`Open ${user.displayName} profile`}
                onClick={() => onSelectUser(user)}
              >
                <Avatar src={user.avatarUrl} name={user.displayName} />
                <span className={styles.userIdentity}>
                  <strong>{user.displayName}</strong>
                  <span>@{user.username}</span>
                  {user.metadata && <small>{user.metadata}</small>}
                </span>
                {user.relationship && relationshipLabels[user.relationship] && (
                  <span className={styles.relationship}>{relationshipLabels[user.relationship]}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {tab === "posts" && status === "success" && posts.length > 0 && (
          <div className={styles.postList}>
            {posts.map((post) => (
              <button
                className={styles.postRow}
                type="button"
                key={post.id}
                aria-label={`Open post by ${post.author.displayName}`}
                onClick={() => onSelectPost(post)}
              >
                <div className={styles.postAuthor}>
                  <Avatar src={post.author.avatarUrl} name={post.author.displayName} />
                  <span>
                    <strong>{post.author.displayName}</strong>
                    <small>@{post.author.username}</small>
                  </span>
                </div>
                {post.caption && <p>{post.caption}</p>}
                {post.media.length > 0 && (
                  <div className={styles.mediaStrip}>
                    {post.media.slice(0, 3).map((media, index) => (
                      <span className={styles.mediaItem} key={media.id}>
                        <img src={media.thumbnailUrl} alt="" />
                        {media.mediaType === "VIDEO" && <span className={styles.videoBadge}>Video</span>}
                        {index === 2 && (post.totalMediaItems ?? post.media.length) > 3 && (
                          <span className={styles.moreMedia}>+{(post.totalMediaItems ?? post.media.length) - 3}</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
