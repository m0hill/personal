import { Context, Layer, Logger } from "effect"
import { HttpRouter } from "effect/unstable/http"
import { makeRequestLog, RequestLog } from "@/lib/observability/request-log"
import { wideEventLogger } from "@/lib/observability/wide-event"
import { homeRoutes } from "@/pages/home/index"
import { notFoundRoute } from "@/pages/not-found"

export const AppLayer = Layer.mergeAll(homeRoutes, notFoundRoute).pipe(
  Layer.provide(HttpRouter.middleware(wideEventLogger).layer),
  Layer.provideMerge(Logger.layer([Logger.consoleStructured])),
)

const { handler } = HttpRouter.toWebHandler(AppLayer, { disableLogger: true })

export const makeRequestContext = () =>
  Context.empty().pipe(Context.add(RequestLog, makeRequestLog()))

export type AppContext = ReturnType<typeof makeRequestContext>

export const handle = (request: Request, context: AppContext): Promise<Response> =>
  handler(request, context)

export const handleWithEnv = (request: Request, _env: CloudflareBindings): Promise<Response> =>
  handle(request, makeRequestContext())
