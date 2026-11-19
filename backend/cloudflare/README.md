# VIATOR Cloudflare Worker

This folder contains the Cloudflare Workers backend for the VIATOR workspace.

## Deploy

1. In Cloudflare Dashboard, open the existing Worker `viator-engine-9dcf`.
2. Open Settings / Builds and connect the GitHub repository `Isuryas212/viator-claritatis`.
3. Select branch `feature/viator-space`.
4. Set the root directory to `backend/cloudflare`.
5. Set the build/deploy command to `npx wrangler deploy` (no build command is needed).
6. Ensure the deployment uses the checked-in `wrangler.toml`. It declares the Workers AI binding named `AI`.
7. Deploy, then test the Worker URL with a GET request. It should return service VIATOR and status online.

The worker uses Cloudflare Workers AI through the `AI` binding; no provider API key is stored in this repository.

## API

- `GET /` health response.
- `OPTIONS /` CORS preflight.
- `POST /` accepts `{ "messages": [{ "role": "user|assistant", "content": "..." }] }`.
- Successful response: `{ "reply": "..." }`.

CORS allows only `https://isuryas212.github.io`. The worker validates message roles, count, and length. It does not persist conversations. Browser history remains local to the VIATOR page.

## Model and quota

The initial model is `@cf/google/gemma-4-26b-a4b-it`. Workers AI usage is subject to the account's current free-tier quota and Cloudflare model availability/pricing. A free hosting target does not guarantee unlimited inference.

## Security limitations before public launch

This is an initial integration, not a complete production security layer. Add Cloudflare rate-limiting rules for the Worker route before making it widely public. Monitor usage and configure an account-level budget/usage alert where available. Do not collect sensitive personal data in the dialog.
