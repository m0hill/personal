import { describe, expect, it } from "vitest"
import { loadApp, request } from "@/test/utils"

describe("Projects page", () => {
  it("publishes the canonical Projects index in the shared site shell", async () => {
    const app = loadApp()
    const response = await app.fetch(request("/projects"))
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8")
    expect(html).toContain("<title>Projects — Mohil.dev</title>")
    expect(html).toContain('<link rel="canonical" href="https://mohil.dev/projects">')
    expect(html).toContain(">Projects</h1>")
    expect(html).toContain('aria-current="page"')
  })

  it("presents the complete source-controlled catalog with project details and repository links", async () => {
    const app = loadApp()
    const response = await app.fetch(request("/projects"))
    const html = await response.text()

    const expectedProjects = [
      {
        slug: "datastar-kit",
        name: "datastar-kit",
        repository: "https://github.com/m0hill/datastar-kit",
        summary: "server-driven UI",
        status: "Active",
        technologies: ["TypeScript", "Datastar", "TSX", "Server-Sent Events"],
      },
      {
        slug: "context-kit",
        name: "context-kit",
        repository: "https://github.com/m0hill/context-kit",
        summary: "focused AI context",
        status: "Active",
        technologies: ["TypeScript", "VS Code", "esbuild"],
      },
      {
        slug: "honostar",
        name: "honostar",
        repository: "https://github.com/m0hill/honostar",
        summary: "runtime-agnostic meta-framework",
        status: "Experimental",
        technologies: ["TypeScript", "Hono", "Datastar", "Server-Sent Events"],
      },
      {
        slug: "kv-explorer",
        name: "kv-explorer",
        repository: "https://github.com/m0hill/kv-explorer",
        summary: "local and remote Cloudflare KV",
        status: "Complete",
        technologies: ["Tauri", "Rust", "React", "Cloudflare KV"],
      },
      {
        slug: "web2md",
        name: "web2md",
        repository: "https://github.com/m0hill/web2md",
        summary: "clean, readable Markdown",
        status: "Complete",
        technologies: ["Rust", "WebAssembly", "Cloudflare Workers"],
      },
      {
        slug: "starter-flare",
        name: "starter-flare",
        repository: "https://github.com/m0hill/starter-flare",
        summary: "full-stack Cloudflare applications",
        status: "Active",
        technologies: ["TypeScript", "React Router", "Cloudflare Workers", "D1", "Drizzle"],
      },
    ] as const

    for (const project of expectedProjects) {
      const match = html.match(
        new RegExp(`<article[^>]*aria-labelledby="project-${project.slug}"[\\s\\S]*?</article>`),
      )
      expect(match, `${project.name} project entry`).not.toBeNull()
      const entry = match?.[0] ?? ""

      expect(entry).toContain(`>${project.name}</h2>`)
      expect(entry).toContain(`href="${project.repository}"`)
      expect(entry).toContain(project.summary)
      expect(entry).toContain(`>${project.status}</dd>`)
      for (const technology of project.technologies) {
        expect(entry).toContain(`>${technology}</li>`)
      }
    }
  })

  it("returns a controlled error instead of rendering malformed project data", async () => {
    const app = loadApp({
      projectSource: [
        {
          slug: "unsafe-project",
          name: "unsafe-project",
          status: "Active",
          technologies: ["TypeScript"],
          repository: "https://github.com/m0hill/unsafe-project",
        },
      ],
    })
    const response = await app.fetch(request("/projects"))
    const html = await response.text()

    expect(response.status).toBe(500)
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8")
    expect(html).toContain("<title>Projects unavailable — Mohil.dev</title>")
    expect(html).toContain(">Project catalog unavailable</h1>")
    expect(html).not.toContain(">unsafe-project</h2>")
    expect(html).not.toContain('rel="canonical"')
  })
})
