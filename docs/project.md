# Project

## Stack

- `alchemy.run.ts` owns the Worker, Worker Assets, deployment stages, and future Cloudflare resources.
- The current Cloudflare graph contains only the Worker and Worker Assets.
- `src/index.tsx` exports the Worker `fetch` handler.
- `src/app.tsx` owns route composition, middleware, and request-context wiring.
- HTTP uses Effect `HttpRouter`.
- UI is server-rendered TSX through `datastar-kit`.
- Datastar response helpers live in `src/lib/datastar.ts`.
- Tailwind builds `src/styles.css` to `public/app.css`.
- Vitest runs in the Workers runtime.
- Playwright runs against `alchemy dev`.
- There is no project-owned browser bundle.

## UI

- Default to server TSX, Datastar `data-*` attributes, backend actions, and SSE patches.
- Use native inputs and `data-bind` for form state.
- Do not add a client application or web-component build without an approved architectural change.
- Keep JSX synchronous and load data before rendering.

## State

- The current baseline has no application storage bindings.
- Add a Cloudflare resource only when a product ticket establishes its source of truth and consistency boundary.
- Future Durable Objects own their SQLite schema and expose narrow structured-clone-safe RPC methods.
- Adapt raw bindings into Effect services before page code uses them.

## Observability

- Each request emits one structured wide event.
- `wideEventLogger` writes the per-request Worker log record.
- Middleware adds `http.method`, `http.path`, `http.status`, and `http.durationMs`.
- Add request fields with `annotate`.
- Use `annotateAction` for action fields.
- Keep secrets, tokens, and raw request bodies out of logs.
- Install structured console logging with `Layer.provideMerge(Logger.layer([Logger.consoleStructured]))`.

## Layout

- `src/index.tsx` — Worker entry.
- `src/app.tsx` — route merge, middleware, and request-context wiring.
- `src/lib/datastar.ts` — Datastar and Effect response bridge.
- `src/lib/observability/` — request annotations and wide-event logging.
- `src/pages/home/` — minimal product home.
- `src/pages/not-found.tsx` — catch-all HTML 404.
- `src/test/` — shared Worker test helpers.
- `src/ui/head.tsx` — shared document head.
- `docs/` — narrow agent guides.
- `public/` — generated or copied Worker assets.
- `repos/` — read-only references.

## Add a page

- Create `src/pages/<name>/index.tsx`.
- Export an Effect `HttpRouter` route or route layer.
- Put page TSX in `src/pages/<name>/components/`.
- Put page tests in `src/pages/<name>/tests/` when they are not better covered at the app seam.
- Merge the route in `src/app.tsx` before the catch-all route.
- Parse untrusted input with Effect Schema.
- Test through `loadApp()` and `app.fetch(request("/..."))`.

## Commands

- `nub run dev` — build CSS, watch CSS, and run `alchemy dev`.
- `nub run build` — build production CSS.
- `nub run preview` — build once and run `alchemy dev`.
- `nub run deploy` — build and deploy the selected stage.
- `nub run destroy` — destroy the selected stage.
- `nub run logs` / `nub run tail` — Worker logs.
- `nub run test` — Vitest Workers tests.
- `nub run test:e2e` — Playwright on port 8787.
- `nub run check` — typecheck, lint, format check, and Vitest.
- `nub run lint:fix` / `nub run format` — autofix.

Two TypeScript projects exist: Worker code in `tsconfig.json` and Node-based tool configuration in `tsconfig.tools.json`.
