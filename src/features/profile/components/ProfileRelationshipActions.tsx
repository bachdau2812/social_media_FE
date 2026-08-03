import { UserRoundSearch } from "lucide-react";
import styles from "./ProfileRelationshipActions.module.css";

export type ProfileRelationship = "none" | "follows_you" | "following" | "friends";

export interface ProfileRelationshipActionsProps {
  relationship: ProfileRelationship;
  onFollow: () => void | Promise<void>;
  onUnfollow: () => void | Promise<void>;
  onMessage: () => void | Promise<void>;
  onFindSimilar: () => void;
  pending?: boolean;
}

export function ProfileRelationshipActions({
  relationship,
  onFollow,
  onUnfollow,
  onMessage,
  onFindSimilar,
  pending = false,
}: ProfileRelationshipActionsProps) {
  const isFollowing = relationship === "following" || relationship === "friends";
  const followLabel = relationship === "follows_you" ? "Follow back" : "Follow";

  return (
    <div className={styles.actions} aria-label="Profile actions">
      {isFollowing ? (
        <>
          <button
            className={styles.secondary}
            type="button"
            disabled={pending}
            onClick={() => void onUnfollow()}
          >
            Following
          </button>
          <button
            className={styles.secondary}
            type="button"
            disabled={pending}
            onClick={() => void onMessage()}
          >
            Message
          </button>
        </>
      ) : (
        <button
          className={styles.primary}
          type="button"
          disabled={pending}
          onClick={() => void onFollow()}
        >
          {followLabel}
        </button>
      )}

      <button
        className={styles.iconButton}
        type="button"
        aria-label="Find similar people"
        aria-pressed={false}
        disabled={pending}
        onClick={onFindSimilar}
      >
        <UserRoundSearch size={19} aria-hidden="true" />
      </button>
    </div>
  );
}

