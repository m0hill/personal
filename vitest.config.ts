import { cloudflareTest } from "@cloudflare/vitest-pool-workers"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflareTest({
      main: "./src/index.tsx",
      miniflare: {
        compatibilityDate: "2026-05-22",
        assets: { directory: "./public" },
      },
    }),
  ],
  test: {
    exclude: ["dist/**", "node_modules/**", "repos/**", "**/*.e2e.ts"],
  },
})
