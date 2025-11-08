import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('goto google', async ({ page }) => {
  await page.goto('https://github.com/');
  await expect(page.getByRole('heading', { name: 'The future of building' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The future of building' })).toBeVisible();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('jayantdwivedi19@gmail.com');
  await page.getByRole('textbox', { name: 'Username or email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Jayant@123');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText('Incorrect username or')).toBeVisible();
})
