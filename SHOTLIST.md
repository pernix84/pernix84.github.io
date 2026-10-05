# Shot list

Screenshots for the guided tour on the site (`docs/index.html`, section "Guided tour").

**This repository is public.** A screenshot is public the moment it is pushed — with or without
GitHub Pages switched on — and stays in Git history after it is deleted.

## Workflow

1. Capture into `shots/inbox/`. That folder is git-ignored; nothing in it can be committed by
   accident.
2. Redact against the checklist below.
3. Save the approved, redacted picture into `docs/img/tour/` under the exact filename from the
   table. The page picks it up on reload — the placeholder disappears.
4. Preview locally (open `docs/index.html`), then commit.

## Redaction checklist

Every picture, before it leaves `shots/inbox/`:

- [ ] No ngrok hostnames or other real URLs in address bars, links or config panes
- [ ] No IP addresses, ports or Docker network names that map the host
- [ ] No usernames, emails or avatars other than a demo user
- [ ] No tokens, API keys, client secrets or connection strings — check config and env panes
- [ ] No Keycloak realm, client ids or redirect URIs
- [ ] Nothing from the personal tier (Dawarich, Immich, n8n, Trilium, Homepage)
- [ ] Browser chrome cropped or neutral (no bookmarks bar, no other tabs)

## Tour stops

Capture at 1600×1000 or larger (the slot is 16:10 and crops from the top left).

| File (`docs/img/tour/`) | Stop | What it should show | Status |
| --- | --- | --- | --- |
| `01-front-door.png` | The front door | Keycloak sign-in page; Traefik dashboard with a TM router and its ForwardAuth middleware | todo |
| `02-commit-to-artifact.png` | Commit to artifact | A green TeamCity build of a TM service (tests, image, package steps); the `Contracts.Api` package versions on the Gitea feed | todo |
| `03-runtime.png` | Runtime | NATS NUI on the TM stream: messages and the durable consumers reading them | todo |
| `04-one-request.png` | One request, followed | A Jaeger trace spanning BFF → Fleet / Transport ops; the same request in Seq | todo |
| `05-health.png` | Health at a glance | A Grafana dashboard (host, containers, Postgres, NATS) and the Uptime Kuma status page | todo |
| `06-product.png` | The product | The TM backoffice routes screen with real data | todo |

## Extra examples (not on the page yet)

Collect these too. Each may become its own stop or a gallery later.

| File (`docs/img/extra/`) | What | Status |
| --- | --- | --- |
| `teamcity-agents.png` | The three agents, one with CUDA | todo |
| `infisical-project.png` | A TM project in Infisical — names only, values hidden | todo |
| `jaeger-dependencies.png` | Jaeger's service dependency graph | todo |
| `nats-surveyor.png` | NATS cluster metrics in Grafana via Surveyor | todo |
| `cadvisor.png` | Container resource usage | todo |
| `scalar-bff.png` | The BFF's API reference (Scalar) | todo |
| `bruno-collection.png` | A Bruno request against a TM service | todo |
