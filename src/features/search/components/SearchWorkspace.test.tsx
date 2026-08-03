import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchWorkspace, type PostSearchResult, type UserSearchResult } from "./SearchWorkspace";

const userResult: UserSearchResult = {
  id: "user-1",
  username: "bach",
  displayName: "Dau Duc Bach",
  avatarUrl: null,
  relationship: "friends",
};

const postResult: PostSearchResult = {
  id: "post-1",
  author: {
    id: "user-1",
    username: "bach",
    displayName: "Dau Duc Bach",
    avatarUrl: null,
  },
  caption: "A searchable post",
  hashtags: [],
  mediaRatio: null,
  createdAt: null,
  media: [],
  totalMediaItems: 0,
};

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("SearchWorkspace", () => {
  it("defaults to Users and debounces a controlled query by 350ms", async () => {
    vi.useFakeTimers();
    const loadUsers = vi.fn().mockResolvedValue([userResult]);
    const onQueryChange = vi.fn();

    render(
      <SearchWorkspace
        query=""
        onQueryChange={onQueryChange}
        loadUsers={loadUsers}
        loadPosts={vi.fn().mockResolvedValue([])}
        onSelectUser={vi.fn()}
        onSelectPost={vi.fn()}
      />,
    );

    expect(screen.getByRole("tab", { name: "Users" })).toHaveAttribute("aria-selected", "true");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "bach" } });
    expect(onQueryChange).toHaveBeenCalledWith("bach");

    render(
      <SearchWorkspace
        query="bach"
        onQueryChange={onQueryChange}
        loadUsers={loadUsers}
        loadPosts={vi.fn().mockResolvedValue([])}
        onSelectUser={vi.fn()}
        onSelectPost={vi.fn()}
      />,
    );

    await act(async () => {
      vi.advanceTimersByTime(349);
    });
    expect(loadUsers).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(1);
    });
    expect(loadUsers).toHaveBeenCalledTimes(1);
    expect(loadUsers.mock.calls[0][0].query).toBe("bach");
    expect(loadUsers.mock.calls[0][0].signal).toBeInstanceOf(AbortSignal);
  });

  it("keeps the query while switching tabs and ignores an older response", async () => {
    const firstRequest = deferred<UserSearchResult[]>();
    const secondRequest = deferred<UserSearchResult[]>();
    const loadUsers = vi
      .fn()
      .mockReturnValueOnce(firstRequest.promise)
      .mockReturnValueOnce(secondRequest.promise);
    const { rerender } = render(
      <SearchWorkspace
        query="ba"
        debounceMs={0}
        onQueryChange={vi.fn()}
        loadUsers={loadUsers}
        loadPosts={vi.fn().mockResolvedValue([postResult])}
        onSelectUser={vi.fn()}
        onSelectPost={vi.fn()}
      />,
    );

    await waitFor(() => expect(loadUsers).toHaveBeenCalledTimes(1));
    rerender(
      <SearchWorkspace
        query="bach"
        debounceMs={0}
        onQueryChange={vi.fn()}
        loadUsers={loadUsers}
        loadPosts={vi.fn().mockResolvedValue([postResult])}
        onSelectUser={vi.fn()}
        onSelectPost={vi.fn()}
      />,
    );
    await waitFor(() => expect(loadUsers).toHaveBeenCalledTimes(2));

    firstRequest.resolve([{ ...userResult, id: "stale", username: "stale" }]);
    secondRequest.resolve([userResult]);
    expect(await screen.findByText("Dau Duc Bach")).toBeInTheDocument();
    expect(screen.queryByText("stale")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("tab", { name: "Posts" }));
    expect(screen.getByRole("searchbox")).toHaveValue("bach");
    expect(await screen.findByText("A searchable post")).toBeInTheDocument();
  });

  it("renders loading, empty and retryable error states", async () => {
    const loadUsers = vi
      .fn()
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce([]);

    render(
      <SearchWorkspace
        query="missing"
        debounceMs={0}
        onQueryChange={vi.fn()}
        loadUsers={loadUsers}
        loadPosts={vi.fn().mockResolvedValue([])}
        onSelectUser={vi.fn()}
        onSelectPost={vi.fn()}
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Searching");
    expect(await screen.findByText("Search failed")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Retry search" }));
    expect(await screen.findByText("No users found")).toBeInTheDocument();
    expect(loadUsers).toHaveBeenCalledTimes(2);
  });

  it("invokes the matching result callback", async () => {
    const onSelectUser = vi.fn();
    render(
      <SearchWorkspace
        query="bach"
        debounceMs={0}
        onQueryChange={vi.fn()}
        loadUsers={vi.fn().mockResolvedValue([userResult])}
        loadPosts={vi.fn().mockResolvedValue([])}
        onSelectUser={onSelectUser}
        onSelectPost={vi.fn()}
      />,
    );

    await userEvent.click(await screen.findByRole("button", { name: /Open Dau Duc Bach profile/i }));
    expect(onSelectUser).toHaveBeenCalledWith(userResult);
  });

  it("clears the controlled query without closing the search field", async () => {
    const onQueryChange = vi.fn();
    render(
      <SearchWorkspace
        query="bach"
        debounceMs={0}
        onQueryChange={onQueryChange}
        loadUsers={vi.fn().mockResolvedValue([])}
        loadPosts={vi.fn().mockResolvedValue([])}
        onSelectUser={vi.fn()}
        onSelectPost={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onQueryChange).toHaveBeenCalledWith("");
    expect(screen.getByRole("searchbox")).toHaveFocus();
  });
});
import { cleanup } from '@testing-library/react';
