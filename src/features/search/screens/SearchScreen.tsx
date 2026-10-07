import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScreenLocation } from "../../../app/router/ScreenLocation";
import type { Post } from "../../post";
import { postApi, postDetailsToPost } from "../../post";
import { searchApi } from "../api/search.api";
import { SearchWorkspace, type PostSearchResult, type UserSearchResult, type SearchLoadArgs, type SearchPage } from "../components/SearchWorkspace";
import { searchPostToResult, searchUserToResult } from "../model/search.mapper";

export function SearchScreen({ viewerId, onSelectPost, onOpenProfile }: {
  viewerId: string;
  onSelectPost: (post: Post) => void;
  onOpenProfile: (userId: string) => Promise<void>;
}) {
  const location = useScreenLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") ?? "";
  function setQuery(value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    navigate({ pathname: location.pathname, search: next.toString() }, { replace: true, state: location.state });
  }

  const loadUsers = useCallback(async ({ query: keyword, signal, page = 0 }: SearchLoadArgs): Promise<SearchPage<UserSearchResult>> => {
    const result = await searchApi.users(viewerId, keyword, signal, page);
    return { content: (result.content ?? []).filter((item) => item.userId !== viewerId).map(searchUserToResult), hasMore: page + 1 < result.totalPages };
  }, [viewerId]);

  const loadPosts = useCallback(async ({ query: keyword, signal, page = 0 }: SearchLoadArgs): Promise<SearchPage<PostSearchResult>> => {
    const result = await searchApi.posts(keyword, signal, page);
    return { content: (result.content ?? []).map(searchPostToResult), hasMore: page + 1 < result.totalPages };
  }, []);

  async function openPost(result: PostSearchResult) {
    try {
      const details = await postApi.getSurfaceDetail(result.id);
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
