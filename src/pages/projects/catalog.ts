import { Effect, Schema } from "effect"

const RequiredText = Schema.String.check(Schema.isTrimmed(), Schema.isNonEmpty())
const ProjectSlug = RequiredText.check(Schema.isPattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/))
const GitHubRepository = RequiredText.check(
  Schema.isPattern(/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/),
)

const ProjectRecordSchema = Schema.Struct({
  slug: ProjectSlug,
  name: RequiredText,
  summary: RequiredText,
  status: Schema.Literals(["Active", "Experimental", "Complete"]),
  technologies: Schema.NonEmptyArray(RequiredText),
  repository: GitHubRepository,
})

const ProjectCatalogSchema = Schema.NonEmptyArray(ProjectRecordSchema)

/** A source-controlled portfolio project ready for presentation. */
export type ProjectRecord = typeof ProjectRecordSchema.Type

/** Expected failure produced when source-controlled project data violates its schema. */
export class InvalidProjectCatalogError extends Schema.TaggedErrorClass<InvalidProjectCatalogError>()(
  "InvalidProjectCatalogError",
  { cause: Schema.Defect() },
) {}

/** Parse an unknown source value into renderable project records. */
export const parseProjectCatalog = Effect.fn("parseProjectCatalog")(function* (source: unknown) {
  return yield* Schema.decodeUnknownEffect(ProjectCatalogSchema)(source).pipe(
    Effect.mapError((cause) => new InvalidProjectCatalogError({ cause })),
  )
})

/** The hand-authored project catalog rendered by Mohil.dev. */
export const projectRecords = [
  {
    slug: "datastar-kit",
    name: "datastar-kit",
    summary:
      "A small TypeScript SDK for building server-driven UI with Datastar without adopting a full framework. It connects typed attributes and signals, server-rendered TSX, and native Response helpers while leaving routing and infrastructure choices open.",
    status: "Active",
    technologies: ["TypeScript", "Datastar", "TSX", "Server-Sent Events"],
    repository: "https://github.com/m0hill/datastar-kit",
  },
  {
    slug: "context-kit",
    name: "context-kit",
    summary:
      "A VS Code extension for assembling focused AI context from real workspaces. It combines visual file selection, gitignore-aware filtering, reusable prompts, and token estimates into a clipboard-ready handoff.",
    status: "Active",
    technologies: ["TypeScript", "VS Code", "esbuild"],
    repository: "https://github.com/m0hill/context-kit",
  },
  {
    slug: "honostar",
    name: "honostar",
    summary:
      "A runtime-agnostic meta-framework experiment for hypermedia applications, built around Hono, server-rendered TSX, and realtime updates. It explores how much structure a server-driven app needs without becoming a client framework.",
    status: "Experimental",
    technologies: ["TypeScript", "Hono", "Datastar", "Server-Sent Events"],
    repository: "https://github.com/m0hill/honostar",
  },
  {
    slug: "kv-explorer",
    name: "kv-explorer",
    summary:
      "A desktop workspace for inspecting and managing local and remote Cloudflare KV data used by Wrangler projects. It brings namespace browsing, structured values, metadata, edits, and deletion into one native interface.",
    status: "Complete",
    technologies: ["Tauri", "Rust", "React", "Cloudflare KV"],
    repository: "https://github.com/m0hill/kv-explorer",
  },
  {
    slug: "web2md",
    name: "web2md",
    summary:
      "A Rust and WebAssembly service that converts web pages into clean, readable Markdown at the Cloudflare edge. It handles metadata extraction, crawling, and resilient upstream requests for useful machine-readable output.",
    status: "Complete",
    technologies: ["Rust", "WebAssembly", "Cloudflare Workers"],
    repository: "https://github.com/m0hill/web2md",
  },
  {
    slug: "starter-flare",
    name: "starter-flare",
    summary:
      "An opinionated foundation for full-stack Cloudflare applications. It combines React Router with Worker-native deployment, D1 persistence, typed database access, authentication, and production-oriented tooling.",
    status: "Active",
    technologies: ["TypeScript", "React Router", "Cloudflare Workers", "D1", "Drizzle"],
    repository: "https://github.com/m0hill/starter-flare",
  },
] as const satisfies ReadonlyArray<ProjectRecord>
