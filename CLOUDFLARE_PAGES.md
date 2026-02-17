# Cloudflare Pages Setup

Use these values in **Cloudflare Pages > Settings > Builds & deployments**.

- Framework preset: `Vite`
- Build command: `npm run build:cloudflare`
- Build output directory: `dist`
- Root directory: `/` (repository root)
- Node.js version: `20`

## Environment Variables

- `VITE_BASE_PATH=./`

## Failure Behavior

Cloudflare Pages will stop deployment when the build command exits with a non-zero code.
`npm run build:cloudflare` exits non-zero when `vite build` fails.

## SPA Routing

`public/_redirects` is included with this rule set:

- `/assets/*    /assets/:splat    200`
- `/vite.svg    /vite.svg         200`
- `/*           /index.html       200`

This keeps asset requests intact and rewrites application routes to `index.html`.
