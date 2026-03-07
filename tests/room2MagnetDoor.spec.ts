import { test, expect } from "@playwright/test";

test.describe("Room2 magnet door reveal", () => {
  test("reveals the exit door only after deactivation, keypad, and magnet", async ({ page }) => {
    await page.goto("room2");
    await expect(page.locator(".door")).toHaveCount(0);

    await page.locator(".dectivationpzzle").click();
    await page.getByTestId("metric-electricity").click();
    await page.getByTestId("metric-heat").click();
    await page.getByTestId("deactivation-submit").click();
    await expect(page.getByTestId("deactivation-result")).toHaveText("CORRECT!");
    await expect(page.getByTestId("deactivation-overlay")).toHaveCount(0, { timeout: 3000 });

    await page.locator(".controlconsole").click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button", { name: "Enter" }).click();
    await expect(page.locator(".modal-overlay")).toHaveCount(0, { timeout: 3000 });

    await page.locator(".magnet").click();
    await expect(page.locator(".door")).toBeVisible({ timeout: 3000 });

    await page.locator(".door").click();
    await expect(page).toHaveURL(/end-page/);
  });
});
