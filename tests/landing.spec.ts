import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Whole page", () => {
  test("shows no bracketed placeholder text", async ({ page }) => {
    // Unfinished copy in the design pack is written in square brackets, e.g. "[refund policy]".
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\[[^\]\n]+\]/);
  });
});

test.describe("Live pulse", () => {
  test("is the first section on the page", async ({ page }) => {
    const firstSection = page.locator("main section").first();
    await expect(
      firstSection.getByRole("heading", { name: "Happening right now." }),
    ).toBeVisible();
  });

  test("counts down to the next on-sale", async ({ page }) => {
    const countdown = page.getByRole("timer");
    await expect(countdown).toBeVisible();
    const before = await countdown.innerText();
    await expect(countdown).not.toHaveText(before, { timeout: 5_000 });
  });
});

test.describe("Header", () => {
  test("shows the TikoPoa wordmark in the top-left corner, above Live pulse", async ({ page }) => {
    const wordmark = page.getByRole("banner").getByRole("link", { name: "TikoPoa" });
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toHaveAttribute("href", "/");

    const heading = page.getByRole("heading", { name: "Happening right now." });
    const wordmarkBox = (await wordmark.boundingBox())!;
    const headingBox = (await heading.boundingBox())!;
    expect(wordmarkBox.y + wordmarkBox.height).toBeLessThanOrEqual(headingBox.y);
    // Tucked into the top-left corner, not indented with the sections.
    expect(wordmarkBox.x).toBeLessThanOrEqual(24);
    expect(wordmarkBox.y).toBeLessThanOrEqual(24);
    expect(wordmarkBox.height).toBeGreaterThanOrEqual(44);
  });
});
