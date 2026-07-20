import { describe, expect, it } from "vitest"
import { loadApp, request } from "@/test/utils"

describe("personal site baseline", () => {
  it("serves a minimal Mohil.dev home page", async () => {
    const app = loadApp()
    const response = await app.fetch(request("/"))
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8")
    expect(html).toContain("<title>Mohil.dev</title>")
    expect(html).toContain(">Mohil.dev</h1>")
    expect(html).toContain("Portfolio and writing")
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
