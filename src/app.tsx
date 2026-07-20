import { Context, Layer, Logger } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { makeRequestLog, RequestLog } from "@/lib/observability/request-log"
import { wideEventLogger } from "@/lib/observability/wide-event"
import { aboutRoutes } from "@/pages/about/index"
import { homeRoutes } from "@/pages/home/index"
import { notFoundRoute } from "@/pages/not-found"
import { projectRecords } from "@/pages/projects/catalog"
import { makeProjectsRoutes } from "@/pages/projects/index"

const makeAppLayer = (projectSource: unknown) =>
  Layer.mergeAll(homeRoutes, aboutRoutes, makeProjectsRoutes(projectSource), notFoundRoute).pipe(
    Layer.provide(HttpRouter.middleware(wideEventLogger).layer),
    Layer.provideMerge(Logger.layer([Logger.consoleStructured])),
  )

/** Production application layer backed by the checked-in project catalog. */
export const AppLayer = makeAppLayer(projectRecords)

/** Create the request handler for a source-controlled project catalog. */
export const makeHandle = (projectSource: unknown) => {
  const { handler } = HttpRouter.toWebHandler(makeAppLayer(projectSource), { disableLogger: true })
  return handler
}

const handler = makeHandle(projectRecords)

/** Create isolated request-scoped services for one Worker request. */
export const makeRequestContext = () =>
  Context.empty().pipe(Context.add(RequestLog, makeRequestLog()))

/** Runtime context supplied to the application request handler. */
export type AppContext = ReturnType<typeof makeRequestContext>

/** Handle one Worker request with an already-created request context. */
export const handle = (request: Request, context: AppContext): Promise<Response> =>
  handler(request, context)

/** Handle one Worker request at the Cloudflare bindings boundary. */
export const handleWithEnv = (request: Request, _env: CloudflareBindings): Promise<Response> =>
  handle(request, makeRequestContext())
