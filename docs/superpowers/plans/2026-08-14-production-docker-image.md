# Production Docker Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production container for the React/Vite frontend that runs behind the host's existing Nginx reverse proxy.

**Architecture:** A Node 22 Alpine build stage installs locked dependencies and creates the Vite `dist` bundle. An Nginx Alpine runtime stage serves that bundle on port 80, caches fingerprinted assets, and falls back to `index.html` for client-side routes.

**Tech Stack:** Docker multi-stage builds, Node.js 22 Alpine, npm, Vite 6, Nginx Alpine

## Global Constraints

- Keep the current frontend fallback API URL exactly `http://localhost:8888/app`; do not add or override `VITE_API_BASE_URL` in the image build.
- The host Nginx owns the public domain, TLS termination, and reverse proxying.
- The container Nginx listens on port 80 and serves only the built frontend.
- Preserve all unrelated staged, modified, and untracked files in the existing working tree.

---

### Task 1: Production frontend image

**Files:**
- Create: `.dockerignore`
- Create: `Dockerfile`
- Create: `nginx.conf`

**Interfaces:**
- Consumes: `package.json`, `package-lock.json`, the Vite source tree, and the `npm run build` script.
- Produces: a container image exposing HTTP port 80 and serving the React SPA.

- [ ] **Step 1: Verify the existing frontend build baseline**

Run:

```powershell
npm run build
```

Expected: exit code 0 and a generated `dist` directory. If it fails, record the pre-existing failure before changing Docker files.

- [ ] **Step 2: Limit the Docker build context**

Create `.dockerignore` with exactly:

```dockerignore
node_modules
dist
.git
.github
docs
logs
*.log
.env
.env.*
!.env.example
*.tsbuildinfo
```

- [ ] **Step 3: Configure the container web server**

Create `nginx.conf` with exactly:

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    location ~* \.(?:css|js|gif|ico|jpe?g|png|svg|webp|avif|woff2?|mp4|webm)$ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- [ ] **Step 4: Create the multi-stage image**

Create `Dockerfile` with exactly:

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

- [ ] **Step 5: Re-run the frontend build**

Run:

```powershell
npm run build
```

Expected: exit code 0. This confirms the new root-level files do not affect the application build.

- [ ] **Step 6: Build the production image**

Run:

```powershell
docker build -t social-media-fe:local .
```

Expected: exit code 0; both `build` and `runtime` stages complete.

- [ ] **Step 7: Verify static serving and SPA fallback**

Run:

```powershell
docker run --detach --name social-media-fe-check --publish 127.0.0.1:3000:80 social-media-fe:local
curl.exe --fail http://127.0.0.1:3000/
curl.exe --fail http://127.0.0.1:3000/profile/test-user
docker rm --force social-media-fe-check
```

Expected: both HTTP requests exit with code 0 and return the Vite application's HTML. The final command removes only the temporary verification container named `social-media-fe-check`.

- [ ] **Step 8: Review the exact change set**

Run:

```powershell
git diff -- .dockerignore Dockerfile nginx.conf
git status --short
```

Expected: the Docker files contain only the planned configuration; all unrelated user changes retain their prior status.

- [ ] **Step 9: Commit only the Docker configuration**

Run:

```powershell
git add -- .dockerignore Dockerfile nginx.conf
git diff --cached --name-only
git commit -m "build: add production frontend image"
```

Expected: the cached file list contains only `.dockerignore`, `Dockerfile`, and `nginx.conf` before committing. If any pre-staged user files appear, do not commit; preserve their index state and report it instead.
