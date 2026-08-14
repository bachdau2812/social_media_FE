# Production Docker Image Design

## Goal

Package the React 18 and Vite 6 frontend as a production container that can run behind the server's existing Nginx reverse proxy.

## Architecture

Use a multi-stage image. A Node 22 Alpine stage installs the locked dependencies with `npm ci` and produces the static bundle with `npm run build`. An Nginx Alpine stage contains only the generated `dist` directory and the runtime web-server configuration.

The host Nginx remains responsible for the public domain, TLS termination, and reverse proxying. The container Nginx listens on port 80 and serves the frontend files.

## Runtime behavior

- Requests for existing static assets are served directly.
- Unknown paths fall back to `/index.html` so React Router routes work after a page refresh.
- Static assets receive cache headers; `index.html` is not given a long-lived immutable cache.
- `VITE_API_BASE_URL` is not overridden during the image build, so the application keeps its current fallback value: `http://localhost:8888/app`.

## Files

- `Dockerfile`: deterministic multi-stage production build.
- `nginx.conf`: SPA routing and static-file serving configuration.
- `.dockerignore`: excludes dependencies, build output, Git metadata, logs, local environment files, and generated TypeScript metadata from the build context.

## Deployment interface

The image exposes port 80. A typical host mapping is `127.0.0.1:3000:80`, with the host Nginx proxying the frontend domain to `http://127.0.0.1:3000`.

## Verification

Run the existing frontend build first. If Docker is available, build the image and start a temporary container, then verify that `/` and a nested SPA route both return the application successfully.
