# Mohil.dev

Source for [mohil.dev](https://mohil.dev), Mohil Garg's personal portfolio, technical blog, and collaborative web experiments.

## Stack

- Cloudflare Workers and Worker Assets
- Alchemy for infrastructure and deployment
- Effect HTTP routing and observability
- Server-rendered TSX with Datastar and `datastar-kit`
- Tailwind CSS v4
- Vitest Workers and Playwright

The current baseline intentionally provisions only a Worker and Worker Assets. Product pages, source-controlled writing, and One Million Checkboxes are delivered incrementally through the tracked work plan.

## Local development

```sh
nub install
nub run dev
```

Open `http://localhost:8787`.

## Verification

```sh
nub run check
nub run test:e2e
```

## Project guidance

- `AGENTS.md` is the agent entry point.
- `docs/` contains narrow architecture and implementation guides.
- Planning issues live in the private Kaam-dō tracker described by `docs/agents/issue-tracker.md`.
