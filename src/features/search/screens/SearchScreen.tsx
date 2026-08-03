import { useState } from "react";
import type { Post } from "../../post";
import { postApi, postDetailsToPost } from "../../post";
import { searchApi } from "../api/search.api";
import { SearchWorkspace, type PostSearchResult, type UserSearchResult } from "../components/SearchWorkspace";
import { searchPostToResult, searchUserToResult } from "../model/search.mapper";

export function SearchScreen({ viewerId, onSelectPost, onOpenProfile }: {
  viewerId: string;
  onSelectPost: (post: Post) => void;
  onOpenProfile: (userId: string) => Promise<void>;
}) {
  const [query, setQuery] = useState("");

  async function loadUsers({ query: keyword, signal }: { query: string; signal: AbortSignal }): Promise<UserSearchResult[]> {
    const page = await searchApi.users(viewerId, keyword, signal);
    return (page.content ?? []).filter((item) => item.userId !== viewerId).map(searchUserToResult);
  }

  async function loadPosts({ query: keyword, signal }: { query: string; signal: AbortSignal }): Promise<PostSearchResult[]> {
    const page = await searchApi.posts(keyword, signal);
    return (page.content ?? []).map(searchPostToResult);
  }

  async function openPost(result: PostSearchResult) {
    try {
      const details = await postApi.getDetail(result.id);
      onSelectPost(postDetailsToPost(details));
    } catch {
      window.dispatchEvent(new CustomEvent("app-toast", { detail: "Không thể mở bài viết này" }));
    }
  }

  return <section className="screen"><SearchWorkspace
    query={query}
    onQueryChange={setQuery}
    loadUsers={loadUsers}
    loadPosts={loadPosts}
    onSelectUser={(user) => void onOpenProfile(user.id)}
    onSelectPost={(post) => void openPost(post)}
  /></section>;
}
