# VIATOR Cloudflare Worker

This folder contains the Cloudflare Workers backend for the VIATOR workspace.

## Deploy the existing Worker from GitHub

The production Worker is named `viator-engine-9dcf`. The source of truth is the `main` branch of `Isuryas212/viator-claritatis`.

1. Open Cloudflare Dashboard → Workers & Pages.
2. Select the existing Worker `viator-engine-9dcf`.
3. Open Settings → Builds → Connect.
4. Connect the GitHub repository `Isuryas212/viator-claritatis`.
5. Set the production branch to `main`.
6. Set the root directory to `backend/cloudflare`.
7. Leave the build command empty. Set the deploy command to `npx wrangler deploy`.
8. Save the build settings. Review the displayed project settings before confirming.
9. Check the build result in Cloudflare. Do not assume deployment succeeded until the build is marked successful.

The Wrangler configuration in this directory names the Worker `viator-engine-9dcf` and declares the Workers AI binding `AI` plus the `VIATOR_LIMITER` rate-limit binding. The dashboard Worker name must match the Wrangler `name`.

Once connected, future commits to `main` can trigger production deployments. Do not connect the old `feature/viator-space` branch.

## API

- `GET /` health response.
- `OPTIONS /` CORS preflight.
- `POST /` accepts `{ "messages": [{ "role": "user|assistant", "content": "..." }] }`.
- Successful response: `{ "reply": "..." }`.

CORS allows only `https://isuryas212.github.io`. The Worker validates message roles, count, and length. It does not persist conversations. Browser history remains local to the VIATOR page.

## Model and quota

The initial model is `@cf/google/gemma-4-26b-a4b-it`. Workers AI usage is subject to the account's current quota, model availability, and pricing. Free hosting does not guarantee unlimited inference. Check account usage before increasing public traffic.

## Security limitations before public launch

This is an initial integration, not a complete production security layer. The Worker includes an application-level rate-limit binding; review its effective behavior in Cloudflare before a wider public launch. Monitor usage and configure an account-level budget/usage alert where available. Do not collect sensitive personal data in the dialog.

## Public knowledge boundary

The Worker fetches the public catalog JSON from GitHub Pages at request time. The catalog is for brief introductions and official links only. Do not upload full manuscripts or exclusive book content to this service. Prompt rules guide model behavior but are not absolute technical copyright protection.
