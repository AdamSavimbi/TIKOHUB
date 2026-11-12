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
