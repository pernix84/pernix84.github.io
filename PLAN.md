# Site plan — pernix84.github.io

Working note for the public site. Written 2026-10-05 so the work can continue on another machine.
Delete or fold into the site once it is live.

## Decisions

- **Host: the GitHub user site `pernix84/pernix84.github.io`** → `https://pernix84.github.io`,
  made by **renaming this repo** (`mrz-project`) and publishing from `/docs`. Free, no custom domain.
  The whole MRZ project represents its author, so it is the personal hub, not a per-project page.
  A more professional name via a free GitHub org was considered and dropped to keep it simple.
  - `mrz-project.github.io` is impossible: the `MRZ-PROJECT` org belongs to someone else
    (also taken: `mrzproject`, `mrz-lab`). Free at the time: `mrz-platform`, `mrz-labs`, `mrz-homelab`.
- **Main content: the MRZ platform.** Everything around the application — plan, build, run,
  secure, observe — with TM as the real workload that proves it.
- **Secondary: an architect reference section.** Present, never the frame of the site.
- **TM marketing stays out.** TM gets its own page through `tm-landing-page` (Astro). Deferred.
- **Tooling: plain HTML/CSS now, no build.** Move to Astro (same stack as `tm-landing-page`)
  once the site outgrows 2–3 pages or wants Markdown content. Deploy from branch until then,
  GitHub Actions after.
- **Review is local.** A free-plan Pages repo is public, and so is this one: anything pushed is
  published and stays in history. Preview by opening `docs/index.html`; push only what is approved.

## What exists in this repo

| Path | What |
| --- | --- |
| `docs/index.html`, `docs/styles.css` | The sketch: hero, six pillars, request flow, guided tour slots, selection principles, tried & retired |
| `docs/.nojekyll` | Serve files as-is, no Jekyll |
| `docs/img/tour/`, `docs/img/extra/` | Approved, redacted screenshots. A tour slot shows its file automatically once it exists |
| `SHOTLIST.md` | What to capture, exact filenames, the redaction checklist |
| `shots/inbox/` | Raw captures before redaction. **Git-ignored** — create it locally, it does not travel |

### The six pillars

1. **Plan & code** — GitHub, YouTrack, decisions as Markdown in Git
2. **Build & release** — TeamCity (3 agents, one CUDA), Docker Registry, Gitea NuGet feed, Infisical
3. **Run** — Docker, PostgreSQL, NATS JetStream, 3-node test and prod clusters, a network per tier
4. **Secure access** — ngrok → Traefik → oauth2-proxy → Keycloak; never tunnel straight to a service
5. **Observe** — Prometheus, Grafana, Jaeger + Elasticsearch, Seq, Uptime Kuma, cAdvisor, NATS Surveyor
6. **Prove it: TM** — Fleet, Transport ops, Backoffice BFF, React backoffice

Source of truth for the component list: `mrz-operations` — each tier's `run_all.sh` (what actually
starts), `archive/` (retired), `ARCHITECTURE.md` (topology). The README here is from 2025-03 and is
out of date: TeamCity no longer hosts NuGet (Gitea does); Keycloak, oauth2-proxy, Gitea and Uptime
Kuma are missing; NATS is now separate test and prod clusters.

## Before going public

Claims on the page not yet verified:

- [ ] "Secrets pulled from Infisical" in the commit-to-deploy lane — ADR-007 is still proposed
- [ ] "Deployed to the test network" — TM feature 009's "deployed to test" is not ticked
- [ ] "Visible as one trace across both services" — trace context through NATS not checked
- [ ] Footer names the author — keep or remove
- [ ] Every screenshot passed `SHOTLIST.md`'s redaction checklist
- [ ] Grafana, Seq, TeamCity, Trilium and Dawarich are still tunnelled directly (per
      `mrz-operations/ARCHITECTURE.md`). Move them behind Traefik before giving anyone live access

## Next steps

This repo **becomes** the site — rename it, nothing moves.

1. Review locally (open `docs/index.html`), then commit and push.
2. GitHub → this repo → Settings → General → rename `mrz-project` to `pernix84.github.io`.
   History is kept; the old URL redirects.
3. Settings → Pages → Deploy from a branch → `main` / `/docs`.
4. Locally: `git remote set-url origin https://github.com/pernix84/pernix84.github.io.git`
   (optional — the redirect works, but this avoids relying on it). Rename the local folder too if wanted.
5. Replace `README.md` with a short one (what the site is + the URL); delete `media/components.svg`
   and `media/under_construction.png`, which only the old README used. Keep
   `media/components.excalidraw` as the starting point for the re-drawn diagram.
6. Collect screenshots per `SHOTLIST.md`.

## Later

- **Architect section** — near the end of the page, after the tour has real pictures: how decisions
  get made, one or two worked examples, standards as docs. Material comes from `tm-architecture`
  (see below).
- **Live access** — per tool, decided later (e.g. a read-only Keycloak guest). Screenshots first.
- **Link to the TM landing page** once it exists.

## Material from tm-architecture

The direction is one way: **the site uses material from `tm-architecture`; that repo never refers
to the site.** It is TM's architecture repo, not MRZ's.

`tm-architecture` is **private** (checked 2026-10-05), so the site cannot link into it. Use copied
excerpts, re-drawn diagrams or screenshots — and run each through the same redaction pass as the
tool screenshots (no hostnames, realm or client ids, secrets). Copy, don't link; note the source
path and date beside each excerpt so it can be refreshed.

**Show the method, not the content.** TM's documents are far too detailed for this site. The
section demonstrates *how* decisions and standards are worked out; a reader who wants the full
text is not the audience. Rules:

- **At most three items**, each **one screen**: a short summary written for the site, never a
  pasted document.
- Summarise in the site's own words; quote a line or two at most.
- No TM domain detail beyond what the summary needs (no event names, endpoints, schemas).
- Everything else in `tm-architecture` stays there.

The three (paths relative to `tm-architecture/`):

| Item | What the reader takes away | Source to summarise from |
| --- | --- | --- |
| **System at a glance** | Clear boundaries: clients, entry points, two services owning their data, an event bus | `architecture/ACCEPTED/transit-architecture-final.png` — re-draw simplified rather than reuse |
| **One decision, worked through** | Context → options → decision → consequences, with costs accepted openly | `ADR/PROPOSED/010_single_realm_organizations_for_tenancy.md` — a decision with real trade-offs, labelled as proposed. Fallback if an accepted one is wanted: `ADR/ACCEPTED/009_health_reporting_as_metrics.md` |
| **How the practice runs** | Decisions and standards live as docs next to the code: idea → ADR, debt recorded with a trigger | `ADR/ADR.md` (statuses), `docs/standards/tech-debt-recording.md` — a few lines each, as a small diagram or list |

Swap an item if a better example appears; do not add a fourth.

### Reserve — kept in mind, not on the site now

Candidates for swapping in, or for a deeper page later if the site ever grows one. Same rules apply
if any is used: one screen, summarised, no domain detail.

| Topic | Source |
| --- | --- |
| Principles and service boundaries | `architecture/ACCEPTED/architecture.md` |
| Ideas → ADR pipeline | `ADR/ADR_IDEAs.md` |
| Health reporting as scraped metrics (accepted) | `ADR/ACCEPTED/009_health_reporting_as_metrics.md`, `docs/standards/health-reporting.md` |
| Tenancy rules that must not break | `docs/standards/tenancy.md` |
| No persisted read models across services | `ADR/PROPOSED/xxx_dotnet_cross_service_data_access.md` |
| Contracts flow: OpenAPI → generated clients, backend to frontend | `ADR/ACCEPTED/003_react_frontend_structure.md` |
| Feature work: idea → refinement note → build order | `FEATURES/README.md` and one refined note |
| Design system: one identity, a blueprint per app | `design/README.md`, `design/identity.md` |
