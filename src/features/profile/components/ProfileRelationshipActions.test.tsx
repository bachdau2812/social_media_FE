import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProfileRelationshipActions } from "./ProfileRelationshipActions";

describe("ProfileRelationshipActions", () => {
  it.each([
    ["none", "Follow"],
    ["follows_you", "Follow back"],
  ] as const)("shows the correct primary action for %s", (relationship, label) => {
    render(
      <ProfileRelationshipActions
        relationship={relationship}
        onFollow={vi.fn()}
        onUnfollow={vi.fn()}
        onMessage={vi.fn()}
        onFindSimilar={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Message" })).not.toBeInTheDocument();
  });

  it.each(["following", "friends"] as const)(
    "shows Following and Message when relationship is %s",
    async (relationship) => {
      const onUnfollow = vi.fn();
      const onMessage = vi.fn();
      render(
        <ProfileRelationshipActions
          relationship={relationship}
          onFollow={vi.fn()}
          onUnfollow={onUnfollow}
          onMessage={onMessage}
          onFindSimilar={vi.fn()}
        />,
      );

      await userEvent.click(screen.getByRole("button", { name: "Following" }));
      await userEvent.click(screen.getByRole("button", { name: "Message" }));
      expect(onUnfollow).toHaveBeenCalledOnce();
      expect(onMessage).toHaveBeenCalledOnce();
    },
  );

  it("exposes an accessible similar-users action", async () => {
    const onFindSimilar = vi.fn();
    render(
      <ProfileRelationshipActions
        relationship="none"
        onFollow={vi.fn()}
        onUnfollow={vi.fn()}
        onMessage={vi.fn()}
        onFindSimilar={onFindSimilar}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Find similar people" }));
    expect(onFindSimilar).toHaveBeenCalledOnce();
  });
});
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

