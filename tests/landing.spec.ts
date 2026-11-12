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

  test("the countdown links to the pinned event", async ({ page }) => {
    const card = page.getByTestId("next-on-sale");
    await expect(card.getByRole("link", { name: "View Jazz at the Gardens" })).toHaveAttribute(
      "href",
      "/events/jazz-at-the-gardens",
    );
  });

  test("the countdown card fits its digits on desktop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Phones use the full width.");
    const card = (await page.getByTestId("next-on-sale").boundingBox())!;
    const timer = (await page.getByRole("timer").boundingBox())!;
    // Little space between the seconds and the card's right edge.
    expect(card.x + card.width - (timer.x + timer.width)).toBeLessThanOrEqual(48);
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
    // Level with the header pill, inside the top band.
    expect(wordmarkBox.y).toBeLessThanOrEqual(40);
    expect(wordmarkBox.height).toBeGreaterThanOrEqual(44);
  });

  test("keeps the header pill at the top while scrolling", async ({ page }) => {
    const width = page.viewportSize()!.width;
    await page.setViewportSize({ width, height: 400 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

    const pill = page.getByTestId("header-pill");
    await expect(pill).toBeInViewport();
    expect((await pill.boundingBox())!.y).toBeLessThanOrEqual(24);
  });

  test("links point to their future routes", async ({ page }, testInfo) => {
    const banner = page.getByRole("banner");
    await expect(banner.getByRole("link", { name: "Log in" })).toHaveAttribute("href", "/login");
    if (testInfo.project.name === "desktop") {
      await expect(banner.getByRole("link", { name: "Create event" })).toHaveAttribute("href", "/create");
    }
  });

  test("search opens in the pill, takes focus and closes on Escape", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Search events" });
    await openButton.click();

    const field = page.getByRole("searchbox", { name: "Search events" });
    await expect(field).toBeFocused();
    await expect(field).toHaveAttribute("placeholder", /Free events this weekend/);
    // The pill's other contents make way for the field.
    await expect(page.getByRole("banner").getByRole("link", { name: "Log in" })).toBeHidden();

    await page.keyboard.press("Escape");
    await expect(field).toBeHidden();
    await expect(openButton).toBeFocused();
  });

  test("search closes on its close button", async ({ page }) => {
    await page.getByRole("button", { name: "Search events" }).click();
    await page.getByRole("button", { name: "Close search" }).click();
    await expect(page.getByRole("searchbox", { name: "Search events" })).toBeHidden();
  });

  test("search sends the query to the events route", async ({ page }) => {
    await page.getByRole("button", { name: "Search events" }).click();
    await page.getByRole("searchbox", { name: "Search events" }).fill("jazz");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/events\?q=jazz$/);
  });

  test("keeps the wordmark in the top-left corner while scrolling", async ({ page }) => {
    const width = page.viewportSize()!.width;
    await page.setViewportSize({ width, height: 400 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

    const wordmark = page.getByRole("banner").getByRole("link", { name: "TikoPoa" });
    await expect(wordmark).toBeInViewport();
    const box = (await wordmark.boundingBox())!;
    expect(box.x).toBeLessThanOrEqual(24);
    expect(box.y).toBeLessThanOrEqual(40);
  });
});

test.describe("Header pill dropdown (desktop)", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "The dropdown is desktop only.");
  });

  const panel = (page: import("@playwright/test").Page) => page.getByTestId("menu-panel");

  test("hovering a link shows a white chip and drops the panel", async ({ page }) => {
    const explore = page.getByRole("button", { name: "Explore" });
    await explore.hover();

    await expect(panel(page)).toBeVisible();
    await expect(panel(page).getByRole("link", { name: "This weekend" })).toBeVisible();
    await expect(explore).toHaveAttribute("aria-expanded", "true");
    // White chip: the same colour as the page background.
    const white = await page.locator("body").evaluate((b) => getComputedStyle(b).backgroundColor);
    await expect(explore).toHaveCSS("background-color", white);
    // The page behind is blurred.
    await expect(page.getByTestId("menu-backdrop")).toHaveCSS("backdrop-filter", "blur(16px)");
  });

  test("closes when the mouse leaves", async ({ page }) => {
    await page.getByRole("button", { name: "Explore" }).hover();
    await expect(panel(page)).toBeVisible();
    await page.mouse.move(700, 850);
    await expect(panel(page)).toBeHidden();
  });

  test("closes on a click outside", async ({ page }) => {
    await page.getByRole("button", { name: "Organize" }).click();
    await expect(panel(page)).toBeVisible();
    await page.mouse.click(700, 850);
    await expect(panel(page)).toBeHidden();
  });

  test("closes on Escape", async ({ page }) => {
    const help = page.getByRole("button", { name: "Help" });
    await help.focus();
    await page.keyboard.press("Enter");
    await expect(panel(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel(page)).toBeHidden();
  });
});

test.describe("Header pill menu (mobile)", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "The menu button is mobile only.");
  });

  test("the menu button opens the links as a list", async ({ page }) => {
    const button = page.getByRole("button", { name: "Menu" });
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");

    for (const name of ["Explore", "Organize", "My tickets", "Help", "Create event"]) {
      await expect(page.getByRole("link", { name, exact: true })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(page.getByRole("link", { name: "My tickets" })).toBeHidden();
  });
});
