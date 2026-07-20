import { env } from "cloudflare:workers"

export const loadApp = async (): Promise<{
  readonly fetch: (request: Request) => Promise<Response>
}> => {
  const app = await import("@/app")
  return { fetch: (request) => app.handleWithEnv(request, env) }
}

export const request = (path: string, init: RequestInit = {}): Request =>
  new Request(`http://test.local${path}`, init)
