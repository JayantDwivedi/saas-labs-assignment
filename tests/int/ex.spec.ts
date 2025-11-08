/* eslint-disable testing-library/prefer-screen-queries */
import test, { expect } from "@playwright/test";

test('check screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1800, height: 2400 });
    // Go to the page.
    await page.goto("https://www.docusign.com/");
    await page.getByRole('button', { name: 'Sales', exact: true }).click();

    const screenshot = page.locator('div').filter({ hasText: 'Close faster with automated' }).nth(5);
    await expect(screenshot).toHaveScreenshot();
});