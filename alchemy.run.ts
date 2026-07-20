import * as Alchemy from "alchemy"
import * as Cloudflare from "alchemy/Cloudflare"
import * as Effect from "effect/Effect"

export const Worker = Cloudflare.Worker("Worker", {
  main: "./src/index.tsx",
  compatibility: {
    date: "2026-05-22",
  },
  assets: {
    directory: "./public",
    runWorkerFirst: false,
  },
  dev: {
    port: 8787,
    strictPort: true,
  },
  observability: {
    enabled: true,
    logs: {
      enabled: true,
      invocationLogs: false,
    },
  },
})

export type WorkerEnv = Cloudflare.InferEnv<typeof Worker>

export default Alchemy.Stack(
  "personal",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const worker = yield* Worker

    return {
      url: worker.url.as<string>(),
    }
  }),
)
