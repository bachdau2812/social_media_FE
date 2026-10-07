import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "src");

// Temporary exceptions have named owners and are removed in the owning feature phases.
const migrationAllowlist = new Map([
  ["src/features/auth/components/AuthLayout.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/components/AuthPrimitives.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/components/PasswordStrength.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/model/auth.copy.ts|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/model/auth.utils.ts|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/screens/AuthFlow.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/screens/ForgotPasswordScreen.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/screens/RegisterScreen.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/screens/ResetPasswordSuccessScreen.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/screens/SignInScreen.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/auth/screens/VerifyRegistrationScreen.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/library/screens/LibraryScreen.tsx|../../../app/router/ScreenLocation", "Pass screen location/navigation through a feature boundary in Phase 11."],
  ["src/features/search/screens/SearchScreen.tsx|../../../app/router/ScreenLocation", "Pass screen location/navigation through a feature boundary in Phase 11."],
  ["src/features/settings/screens/SettingsScreen.tsx|../../../app/router/ScreenLocation", "Pass screen location/navigation through a feature boundary in Phase 11."],
  ["src/features/settings/screens/SettingsScreen.tsx|../../../app/providers/LocaleProvider", "Move shared copy/localization outside app in Phase 11."],
  ["src/features/settings/screens/SettingsScreen.tsx|../../../app/providers/ThemeProvider", "Expose theme as a shared presentation contract in Phase 11."],
  ["src/features/story/components/StoryViewerController.tsx|../../../app/router/routes", "Pass route construction through a feature boundary in Phase 11."],
]);

function listSourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(fullPath);
    if (/\.(?:ts|tsx|js|jsx)$/.test(entry.name) && !/\.(?:test|spec)\./.test(entry.name)) return [fullPath];
    return [];
  });
}

function findImports(source) {
  const imports = [];
  const pattern = /\b(?:from\s+|import\s*(?:\(\s*)?)['"]([^'"]+)['"]/g;
  for (const match of source.matchAll(pattern)) imports.push(match[1]);
  return imports;
}

function featureAt(filePath) {
  const relativePath = path.relative(sourceRoot, filePath).split(path.sep).join("/");
  const match = relativePath.match(/^features\/([^/]+)(?:\/|$)/);
  return match?.[1];
}

function appAt(filePath) {
  return path.relative(sourceRoot, filePath).split(path.sep).join("/").startsWith("app/");
}

function isFeaturePublicEntryPoint(targetFeature, resolved) {
  const featureRoot = path.join(sourceRoot, "features", targetFeature);
  if (resolved === featureRoot) return true;
  if (resolved === path.join(featureRoot, "public")) {
    return [".ts", ".tsx", ".js", ".jsx"].some((extension) => existsSync(`${resolved}${extension}`));
  }
  if (resolved !== path.join(featureRoot, "api")) return false;
  return ["index.ts", "index.tsx", "index.js", "index.jsx"].some((name) => existsSync(path.join(resolved, name)));
}

function checkImport(file, specifier) {
  const relativeFile = file.replaceAll("\\", "/");
  if (migrationAllowlist.has(`${relativeFile}|${specifier}`)) return undefined;
  const sharedFile = relativeFile.startsWith("src/shared/");
  const sourceFeature = relativeFile.match(/^src\/features\/([^/]+)\//)?.[1];
  const resolved = path.resolve(projectRoot, path.dirname(relativeFile), specifier);
  const targetFeature = featureAt(resolved);
  const targetIsApp = appAt(resolved);

  if (sharedFile && (targetFeature || targetIsApp)) {
    return "shared modules cannot depend on app or feature modules";
  }
  if (sourceFeature && targetIsApp) return "feature modules cannot depend on app internals";
  if (sourceFeature && targetFeature && sourceFeature !== targetFeature) {
    if (isFeaturePublicEntryPoint(targetFeature, resolved)) return undefined;
    const allowlistKey = `${relativeFile}|${specifier}`;
    if (migrationAllowlist.has(allowlistKey)) return undefined;
    return "cross-feature imports must use the target feature's public entry point";
  }
  return undefined;
}

export function scanModuleBoundaries(fixtures) {
  const declarations = fixtures ?? listSourceFiles(sourceRoot).flatMap((file) => {
    const relativeFile = path.relative(projectRoot, file).split(path.sep).join("/");
    return findImports(readFileSync(file, "utf8")).map((specifier) => ({ file: relativeFile, specifier }));
  });

  const observedAllowlist = new Set();
  const violations = [];
  for (const { file, specifier } of declarations) {
    const reason = checkImport(file, specifier);
    const key = `${file.replaceAll("\\", "/")}|${specifier}`;
    if (migrationAllowlist.has(key)) observedAllowlist.add(key);
    if (reason) violations.push({ file, specifier, reason });
  }
  if (!fixtures) {
    for (const [key, migrationReason] of migrationAllowlist) {
      if (!observedAllowlist.has(key)) violations.push({ file: key, specifier: migrationReason, reason: "stale migration exception; remove it" });
    }
  }
  return violations;
}
