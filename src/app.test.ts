import { describe, expect, it } from "vitest"
import { loadApp, request } from "@/test/utils"

describe("Mohil.dev", () => {
  it("introduces Mohil and establishes the canonical site identity", async () => {
    const app = loadApp()
    const response = await app.fetch(request("/"))
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8")
    expect(html).toContain("<title>Mohil Garg — Software engineer</title>")
    expect(html).toContain('<link rel="canonical" href="https://mohil.dev/">')
    expect(html).toContain(
      '<meta name="description" content="Mohil Garg builds cloud systems, developer tools, and realtime web experiences.">',
    )
    expect(html).toContain(">Mohil Garg</span>")
    expect(html).toContain("cloud systems, developer tools, and realtime web experiences")
    expect(html).not.toContain("Tokyo, Japan")
  })

  it("exposes the complete primary navigation and approved contact links", async () => {
    const app = loadApp()
    const response = await app.fetch(request("/"))
    const html = await response.text()

    for (const href of ["/", "/about", "/projects", "/blog", "/live"]) {
      expect(html).toContain(`href="${href}"`)
    }
    expect(html).toContain('href="mailto:mohilg@outlook.com"')
    expect(html).toContain('href="https://github.com/m0hill"')
    expect(html).not.toContain('href="tel:')
  })

  it("serves the About narrative without unsupported current-status claims", async () => {
    const app = loadApp()
    const response = await app.fetch(request("/about"))
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(html).toContain("<title>About — Mohil.dev</title>")
    expect(html).toContain('<link rel="canonical" href="https://mohil.dev/about">')
    expect(html).toContain(">About</h1>")
    expect(html).toContain("Tokyo, Japan")
    expect(html).toContain("Kumamoto University")
    expect(html).toContain("Tokyo University of Foreign Studies")
    expect(html).not.toContain("Present")
    expect(html).not.toContain("available for")
  })

  it("serves a designed not-found page", async () => {
    const app = loadApp()
    const response = await app.fetch(request("/missing"))
    const html = await response.text()

    expect(response.status).toBe(404)
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8")
    expect(html).toContain("<title>Page not found — Mohil.dev</title>")
    expect(html).toContain(">Page not found</h1>")
    expect(html).toContain('href="/"')
    expect(html).not.toContain('rel="canonical"')
  })

  it.each(["/kv", "/d1", "/r2", "/do", "/live-counter", "/api", "/web-component", "/design"])(
    "does not expose the former demo route %s",
    async (path) => {
      const app = loadApp()
      const response = await app.fetch(request(path))
      const html = await response.text()

      expect(response.status).toBe(404)
      expect(html).toContain(">Page not found</h1>")
    },
  )
})
