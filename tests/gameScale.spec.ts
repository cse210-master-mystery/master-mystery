import { test, expect } from "@playwright/test";

const GAME_RATIO = 1440 / 1024;
const LOCALHOST_URL = "http://localhost:5173/master-mystery/"; 

async function getGameSize(page) {
    return await page.evaluate(() => {
        const el = document.querySelector(".game-scale");
        if (!el) {
            return { width: 0, height: 0 }; // Return default values if element is not found
        }
        const r = el.getBoundingClientRect();
        return { width: r.width, height: r.height };
    });
}

async function enterRoom1(page) {
    await page.goto(LOCALHOST_URL);
  
    await page.waitForSelector(".btnStart", { timeout: 5000 });
    await page.click(".btnStart");
  
    await page.waitForSelector(".room1bkg", { timeout: 5000 });
  }

// start page tests

test("maintains aspect ratio on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto(LOCALHOST_URL); 

    const { width, height } = await getGameSize(page);

    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
    expect(width).toBeLessThanOrEqual(1600);
    expect(height).toBeLessThanOrEqual(900);
});

test("scales by height when screen is tall", async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 1400 });
    await page.goto(LOCALHOST_URL);

    const { width, height } = await getGameSize(page);

    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
    expect(height).toBeLessThanOrEqual(1400);
});

test("scales by width when screen is wide", async ({ page }) => {
    await page.setViewportSize({ width: 2000, height: 600 });
    await page.goto(LOCALHOST_URL); 

    const { width, height } = await getGameSize(page);

    expect(width).toBeLessThanOrEqual(2000);
    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
});

test("uses min dimension for scale", async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 500 });
    await page.goto(LOCALHOST_URL); 

    const { width } = await getGameSize(page);

    const expectedScale = Math.min(1000 / 1440, 500 / 1024);
    const expectedWidth = 1440 * expectedScale;

    expect(width).toBeCloseTo(expectedWidth, 1);
});

test("handles very small screens", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await page.goto(LOCALHOST_URL);

    const { width, height } = await getGameSize(page);

    expect(width).toBeLessThanOrEqual(320);
    expect(height).toBeLessThanOrEqual(480);
});

test("handles very large screens", async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await page.goto(LOCALHOST_URL); 

    const { width, height } = await getGameSize(page);

    expect(width).toBeLessThanOrEqual(3840);
    expect(height).toBeLessThanOrEqual(2160);
});

test("maintains aspect ratio on medium screens", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(LOCALHOST_URL); 

    const { width, height } = await getGameSize(page);

    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
    expect(width).toBeLessThanOrEqual(1280);
    expect(height).toBeLessThanOrEqual(720);
});

// room 1 tests

test("maintains aspect ratio on desktop (Room 1)", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await enterRoom1(page);

    const { width, height } = await getGameSize(page);

    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
    expect(width).toBeLessThanOrEqual(1600);
    expect(height).toBeLessThanOrEqual(900);
});

test("scales by height when screen is tall (Room 1)", async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 1400 });
    await enterRoom1(page);

    const { width, height } = await getGameSize(page);

    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
    expect(height).toBeLessThanOrEqual(1400);
});

test("scales by width when screen is wide (Room 1)", async ({ page }) => {
    await page.setViewportSize({ width: 2000, height: 600 });
    await enterRoom1(page); 

    const { width, height } = await getGameSize(page);

    expect(width).toBeLessThanOrEqual(2000);
    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
});

test("uses min dimension for scale (Room 1)", async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 500 });
    await enterRoom1(page); 

    const { width } = await getGameSize(page);

    const expectedScale = Math.min(1000 / 1440, 500 / 1024);
    const expectedWidth = 1440 * expectedScale;

    expect(width).toBeCloseTo(expectedWidth, 1);
});

test("handles very small screens (Room 1)", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await enterRoom1(page);

    const { width, height } = await getGameSize(page);

    expect(width).toBeLessThanOrEqual(320);
    expect(height).toBeLessThanOrEqual(480);
});

test("handles very large screens (Room 1)", async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await enterRoom1(page); 

    const { width, height } = await getGameSize(page);

    expect(width).toBeLessThanOrEqual(3840);
    expect(height).toBeLessThanOrEqual(2160);
});

test("maintains aspect ratio on medium screens (Room 1)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await enterRoom1(page); 

    const { width, height } = await getGameSize(page);

    expect(width / height).toBeCloseTo(GAME_RATIO, 3);
    expect(width).toBeLessThanOrEqual(1280);
    expect(height).toBeLessThanOrEqual(720);
});
