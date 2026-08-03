import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar as SharedAvatar } from "../../../shared/components/Avatar";
import type { ProfileRelationship } from "./ProfileRelationshipActions";
import styles from "./SimilarUsersSection.module.css";

export interface SimilarUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  relationship: ProfileRelationship;
  metadata?: string;
}

export interface SimilarUsersLoadArgs {
  profileId: string;
  signal: AbortSignal;
}

export interface SimilarUsersSectionProps {
  open: boolean;
  profileId: string;
  loadUsers: (args: SimilarUsersLoadArgs) => Promise<SimilarUser[]>;
  onSelectUser: (user: SimilarUser) => void;
  onFollow: (user: SimilarUser) => void | Promise<void>;
  onUnfollow: (user: SimilarUser) => void | Promise<void>;
  onClose: () => void;
}

const similarUsersCache = new Map<string, SimilarUser[]>();

export function clearSimilarUsersCache() {
  similarUsersCache.clear();
}

function Avatar({ user }: { user: SimilarUser }) {
  return <SharedAvatar src={user.avatarUrl} name={user.displayName} alt={user.displayName} className={styles.avatar} fallbackClassName={styles.avatarFallback} />;
}

function SimilarUserCard({
  user,
  onSelect,
  onToggleFollow,
}: {
  user: SimilarUser;
  onSelect: () => void;
  onToggleFollow: () => void;
}) {
  const following = user.relationship === "following" || user.relationship === "friends";
  return (
    <article className={styles.card}>
      <button
        className={styles.identityButton}
        type="button"
        aria-label={`Open ${user.displayName} profile`}
        onClick={onSelect}
      >
        <Avatar user={user} />
        <strong>{user.displayName}</strong>
        <span>@{user.username}</span>
        {user.metadata && <small>{user.metadata}</small>}
      </button>
      <button
        className={following ? styles.followingButton : styles.followButton}
        type="button"
        aria-label={`${following ? "Unfollow" : user.relationship === "follows_you" ? "Follow back" : "Follow"} ${user.displayName}`}
        onClick={onToggleFollow}
      >
        {following ? "Following" : user.relationship === "follows_you" ? "Follow back" : "Follow"}
      </button>
    </article>
  );
}

export function SimilarUsersSection({
  open,
  profileId,
  loadUsers,
  onSelectUser,
  onFollow,
  onUnfollow,
  onClose,
}: SimilarUsersSectionProps) {
  const [users, setUsers] = useState<SimilarUser[]>(() => similarUsersCache.get(profileId) ?? []);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    similarUsersCache.has(profileId) ? "success" : "idle",
  );
  const [retryVersion, setRetryVersion] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const cached = similarUsersCache.get(profileId);
    if (cached) {
      setUsers(cached);
      setStatus("success");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    void loadUsers({ profileId, signal: controller.signal })
      .then((loadedUsers) => {
        if (controller.signal.aborted) return;
        similarUsersCache.set(profileId, loadedUsers);
        setUsers(loadedUsers);
        setStatus("success");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });

    return () => controller.abort();
  }, [loadUsers, open, profileId, retryVersion]);

  useEffect(() => {
    if (!dialogOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [dialogOpen]);

  if (!open) return null;

  const updateRelationship = async (user: SimilarUser) => {
    const following = user.relationship === "following" || user.relationship === "friends";
    const previous = users;
    const next = users.map((entry) =>
      entry.id === user.id
        ? { ...entry, relationship: following ? "none" as const : "following" as const }
        : entry,
    );
    setUsers(next);
    similarUsersCache.set(profileId, next);
    try {
      if (following) await onUnfollow(user);
      else await onFollow(user);
    } catch {
      setUsers(previous);
      similarUsersCache.set(profileId, previous);
    }
  };

  const renderCard = (user: SimilarUser) => (
    <SimilarUserCard
      key={user.id}
      user={user}
      onSelect={() => onSelectUser(user)}
      onToggleFollow={() => void updateRelationship(user)}
    />
  );
  const railCards = users.slice(0, 3).map(renderCard);
  const dialogCards = users.map(renderCard);

  return (
    <section className={styles.section} aria-label="Similar people">
      <header className={styles.header}>
        <div>
          <strong>Similar people</strong>
          <span>Profiles related to this account</span>
        </div>
        <button type="button" aria-label="Close similar people" onClick={onClose}>
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      {status === "loading" && <div className={styles.skeleton} role="status">Loading suggestions</div>}
      {status === "error" && (
        <div className={styles.state} role="alert">
          <strong>Unable to load suggestions</strong>
          <button
            type="button"
            onClick={() => {
              similarUsersCache.delete(profileId);
              setRetryVersion((value) => value + 1);
            }}
          >
            Retry suggestions
          </button>
        </div>
      )}
      {status === "success" && users.length === 0 && (
        <div className={styles.state}>No similar people found</div>
      )}
      {status === "success" && users.length > 0 && (
        <>
          <div className={styles.railControls}>
            <button
              type="button"
              aria-label="Previous suggestions"
              onClick={() => railRef.current?.scrollBy({ left: -240, behavior: "smooth" })}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next suggestions"
              onClick={() => railRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.rail} ref={railRef}>{railCards}</div>
          {users.length > 3 && (
            <button
              className={styles.viewAll}
              type="button"
              aria-label="View all similar people"
              onClick={() => setDialogOpen(true)}
            >
              View all
            </button>
          )}
        </>
      )}

      {dialogOpen && (
        <div className={styles.dialogBackdrop} role="presentation" onMouseDown={() => setDialogOpen(false)}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Similar people"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <strong>Similar people</strong>
              <button type="button" aria-label="Close similar people dialog" onClick={() => setDialogOpen(false)}>
                <X size={18} aria-hidden="true" />
              </button>
            </header>
            <div className={styles.dialogGrid}>{dialogCards}</div>
          </div>
        </div>
      )}
    </section>
  );
}
