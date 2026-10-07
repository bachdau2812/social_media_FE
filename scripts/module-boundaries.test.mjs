import test from "node:test";
import assert from "node:assert/strict";
import { scanModuleBoundaries } from "./module-boundaries.mjs";

test("shared files cannot depend on app or feature modules", () => {
  const violations = scanModuleBoundaries([
    { file: "src/shared/api/client.ts", specifier: "../../features/auth/api/auth.api" },
    { file: "src/shared/utils/date.ts", specifier: "../utils/time" },
  ]);

  assert.deepEqual(violations, [
    {
      file: "src/shared/api/client.ts",
      specifier: "../../features/auth/api/auth.api",
      reason: "shared modules cannot depend on app or feature modules",
    },
  ]);
});

test("features cannot import app internals or another feature's implementation", () => {
  const violations = scanModuleBoundaries([
    { file: "src/features/post/model/post.mapper.ts", specifier: "../../profile/model/profile.types" },
    { file: "src/features/post/screens/PostScreen.tsx", specifier: "../../../app/providers/AuthProvider" },
    { file: "src/features/feed/model/feed.mapper.ts", specifier: "../../post" },
    { file: "src/features/story/screens/StoryCreatorStudio.tsx", specifier: "../../library/api" },
  ]);

  assert.deepEqual(violations, [
    {
      file: "src/features/post/model/post.mapper.ts",
      specifier: "../../profile/model/profile.types",
      reason: "cross-feature imports must use the target feature's public entry point",
    },
    {
      file: "src/features/post/screens/PostScreen.tsx",
      specifier: "../../../app/providers/AuthProvider",
      reason: "feature modules cannot depend on app internals",
    },
  ]);
});

test("features may import an explicitly published domain contract", () => {
  assert.deepEqual(scanModuleBoundaries([
    { file: "src/features/post/hooks/usePostEventStream.ts", specifier: "../../profile/public" },
    { file: "src/features/post/hooks/usePostEventStream.ts", specifier: "../../story/public" },
  ]), []);
});

test("current cross-feature implementation imports stay on the named migration allowlist", () => {
  const violations = scanModuleBoundaries();
  assert.deepEqual(violations, []);
});
