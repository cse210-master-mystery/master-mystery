import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173/master-mystery/";

const GAME_RATIO = 1440 / 1024;

async function enterRoom1(page) {
  await page.goto(BASE_URL);

  await page.waitForSelector(".btnStart", { timeout: 5000 });
  await page.click(".btnStart");

  await page.waitForSelector(".room1bkg", { timeout: 5000 });
}

async function rect(page, selector) {
  const el = await page.waitForSelector(selector, { timeout: 5000 });
  const box = await el.boundingBox();

  if (!box) {
    throw new Error(`No bounding box for ${selector}`);
  }

  return {
    left: box.x,
    top: box.y,
    width: box.width,
    height: box.height
  };
}

async function relativeToGame(page, selector) {
  const game = await rect(page, ".game-scale");
  const el = await rect(page, selector);

  return {
    x: (el.left - game.left) / game.width,
    y: (el.top - game.top) / game.height,
    w: el.width / game.width,
    h: el.height / game.height
  };
}

test("game preserves aspect ratio at different screen sizes", async ({ page }) => {
  await enterRoom1(page);

  await page.setViewportSize({ width: 1600, height: 900 });

  const g1 = await rect(page, ".game-scale");

  expect(g1.width / g1.height).toBeCloseTo(GAME_RATIO, 3);
  expect(g1.width).toBeLessThanOrEqual(1600);
  expect(g1.height).toBeLessThanOrEqual(900);

  await page.setViewportSize({ width: 800, height: 1400 });

  const g2 = await rect(page, ".game-scale");

  expect(g2.width / g2.height).toBeCloseTo(GAME_RATIO, 3);
});

test("room 1 elements scale proportionally with the game frame", async ({ page }) => {
  await enterRoom1(page);

  await page.setViewportSize({ width: 1400, height: 900 });

  const baseline = {
    lever1: await relativeToGame(page, ".btnlever1"),
    lever2: await relativeToGame(page, ".btnlever2"),
    book: await relativeToGame(page, ".btnbook")
  };

  await page.setViewportSize({ width: 700, height: 1200 });

  const current = {
    lever1: await relativeToGame(page, ".btnlever1"),
    lever2: await relativeToGame(page, ".btnlever2"),
    book: await relativeToGame(page, ".btnbook")
  };

  for (const key of Object.keys(baseline)) {
    expect(current[key].x).toBeCloseTo(baseline[key].x, 3);
    expect(current[key].y).toBeCloseTo(baseline[key].y, 3);
    expect(current[key].w).toBeCloseTo(baseline[key].w, 3);
    expect(current[key].h).toBeCloseTo(baseline[key].h, 3);
  }
});

test("room 1 elements stay inside the game frame", async ({ page }) => {
  await enterRoom1(page);

  const game = await rect(page, ".game-scale");

  for (const sel of [".btnlever1", ".btnlever2", ".btnbook"]) {
    const r = await rect(page, sel);

    expect(r.left).toBeGreaterThanOrEqual(game.left);
    expect(r.top).toBeGreaterThanOrEqual(game.top);
    expect(r.left + r.width).toBeLessThanOrEqual(game.left + game.width);
    expect(r.top + r.height).toBeLessThanOrEqual(game.top + game.height);
  }
});
  