# VIATOR Backend (multi-provider)

This folder contains a self-hosted backend scaffold. GitHub Pages remains the static frontend; it must never contain provider credentials.

## Components

- **VIATOR API**: validates requests, applies the VIATOR system identity, and returns the frontend's `{ "reply": "..." }` contract.
- **LiteLLM Proxy**: provider-neutral model gateway.
- **PostgreSQL**: LiteLLM database for virtual keys and gateway management.
- **Docker Compose**: keeps the LiteLLM gateway on the private container network. Only the API adapter is published on the host loopback interface.

## Important deployment notes

This is a deployment scaffold, not a live service. No model provider is selected, no API credentials are included, and no backend URL is configured in the website yet.

1. Deploy this stack on a server that supports Docker Compose and has outbound HTTPS access.
2. Copy `.env.example` to `.env` on the server. Generate unique random values for the database password, `LITELLM_MASTER_KEY`, and `LITELLM_SALT_KEY`. Never commit `.env`.
3. Pin `LITELLM_IMAGE` to a tested LiteLLM release tag or image digest before production.
4. Add at least one provider deployment to `litellm-config.yaml`, or add it through the LiteLLM UI. Put provider credentials in server environment secrets, never in this repository.
5. Start the stack. Create a restricted LiteLLM virtual key for the VIATOR API adapter, limited to the model alias `viator-main`, and set it as `LITELLM_API_KEY`. Do not use the master key as the application key.
6. Configure `VIATOR_MODEL` to the chosen LiteLLM model alias.
7. Put a TLS reverse proxy in front of the API host port (default `127.0.0.1:8080`). Configure it to overwrite `X-Real-IP` with the actual client IP and apply an edge rate limit. The in-process limiter here is only a basic secondary guard and is not shared between replicas.
8. Set the frontend meta tag `viator-api-endpoint` to the public HTTPS URL ending in `/api/chat`. Keep CORS `SITE_ORIGIN` restricted to the actual website origin.
9. Test health, valid chat, invalid payloads, rate limits, provider failure, and secret exposure before enabling the composer.

## Provider configuration

LiteLLM uses one model alias for the VIATOR application. That alias can be routed to different provider deployments and fallback models. Add only providers for which the owner has valid credentials and accepts the provider's privacy, retention, and pricing terms.

Example shape (replace with actual model IDs supported by your chosen provider):

```yaml
model_list:
  - model_name: viator-main
    litellm_params:
      model: openai/REPLACE_WITH_MODEL_ID
      api_key: os.environ/OPENAI_API_KEY
  - model_name: viator-fallback
    litellm_params:
      model: gemini/REPLACE_WITH_MODEL_ID
      api_key: os.environ/GEMINI_API_KEY
router_settings:
  num_retries: 1
  fallbacks:
    - viator-main: [viator-fallback]
```

Do not enable fallback until the alternative deployment is configured and tested. Model IDs, availability, prices, and data policies change; verify them before deployment.

## API contract

- `GET /health`
- `POST /api/chat` with `{ "messages": [{ "role": "user" | "assistant", "content": "..." }] }`
- Success response: `{ "reply": "..." }`

The server inserts the VIATOR system prompt. The browser cannot override it.

## Privacy and limitations

- The browser stores up to 24 recent messages in its own localStorage. This is local to that browser and is not a cloud archive.
- The backend does not currently create permanent conversation archives.
- Do not send sensitive personal, financial, medical, or authentication data.
- Provider requests leave the server and are subject to the selected provider's terms and data handling.
- The included per-process rate limiter is a basic safeguard, not production-grade abuse prevention. Enforce limits at the reverse proxy or hosting edge too.
- No provider is configured by default, so the API will return a service-unavailable response until configured.
