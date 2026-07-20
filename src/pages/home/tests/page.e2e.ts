import { expect, test } from "@playwright/test"

test("primary navigation works at a narrow viewport and preserves keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto("/")

  const navigation = page.getByRole("navigation", { name: "Primary navigation" })
  for (const label of ["Home", "About", "Projects", "Blog", "Live"]) {
    await expect(navigation.getByRole("link", { name: label, exact: true })).toBeVisible()
  }

  await page.keyboard.press("Tab")
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused()

  await navigation.getByRole("link", { name: "About", exact: true }).click()
  await expect(page).toHaveURL("/about")
  await expect(page.getByRole("heading", { level: 1, name: "About" })).toBeVisible()
})

test("theme follows the system and remembers an explicit choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/")

  const root = page.locator("html")
  const theme = page.getByRole("button", { name: "Theme: System" })
  await expect(root).toHaveAttribute("data-theme", "system")
  await expect(theme).toBeVisible()

  const darkBackground = await page.evaluate("getComputedStyle(document.body).backgroundColor")
  await page.emulateMedia({ colorScheme: "light" })
  await expect
    .poll(() => page.evaluate("getComputedStyle(document.body).backgroundColor"))
    .not.toBe(darkBackground)

  await theme.click()
  await expect(root).toHaveAttribute("data-theme", "light")
  await expect(page.getByRole("button", { name: "Theme: Light" })).toBeVisible()
  await expect.poll(() => page.evaluate("localStorage.getItem('mohil-theme')")).toBe("light")

  await page.reload()
  await expect(root).toHaveAttribute("data-theme", "light")
  await expect(page.getByRole("button", { name: "Theme: Light" })).toBeVisible()
})

test("reduced-motion preference suppresses decorative transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  await expect
    .poll(() => page.evaluate("getComputedStyle(document.documentElement).scrollBehavior"))
    .toBe("auto")
  const transitionDuration = await page.evaluate<string>(
    "getComputedStyle(document.querySelector('.theme-control')).transitionDuration",
  )
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.001)
})
