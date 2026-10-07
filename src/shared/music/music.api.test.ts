import { beforeEach, expect, it, vi } from "vitest";
import { apiGet } from "../api";
import { musicCatalogApi } from "./music.api";

vi.mock("../api", () => ({ apiGet: vi.fn() }));
beforeEach(() => vi.clearAllMocks());

it("builds a shared paged music search request and forwards cancellation", () => {
  const controller = new AbortController();
  musicCatalogApi.search("slow / music", 2, 5, controller.signal);

  expect(apiGet).toHaveBeenCalledWith("/musics?page=2&size=5&keyword=slow%20%2F%20music", { signal: controller.signal });
});

it("uses the default page and size for the first search", () => {
  musicCatalogApi.search("ambient");

  expect(apiGet).toHaveBeenCalledWith("/musics?page=0&size=10&keyword=ambient", undefined);
});
