import { env } from "cloudflare:workers"
import { handleWithEnv, makeHandle, makeRequestContext } from "@/app"

/** Load the Worker application, optionally replacing its source-controlled project boundary. */
export const loadApp = (options?: {
  readonly projectSource: unknown
}): {
  readonly fetch: (request: Request) => Promise<Response>
} => {
  if (options === undefined) {
    return { fetch: (request) => handleWithEnv(request, env) }
  }

  const handler = makeHandle(options.projectSource)
  return { fetch: (request) => handler(request, makeRequestContext()) }
}

/** Create a Worker request for a route under the deterministic test origin. */
export const request = (path: string, init: RequestInit = {}): Request =>
  new Request(`http://test.local${path}`, init)
