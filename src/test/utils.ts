import { env } from "cloudflare:workers"
import { handleWithEnv } from "@/app"

export const loadApp = (): {
  readonly fetch: (request: Request) => Promise<Response>
} => ({ fetch: (request) => handleWithEnv(request, env) })

export const request = (path: string, init: RequestInit = {}): Request =>
  new Request(`http://test.local${path}`, init)
