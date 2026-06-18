import { test, expect } from '@playwright/test';

test('Create Quote Page Loads', async ({ page }) => {
    await page.goto('http://localhost:3000/quotes/new');
    await expect(page.getByText('Create Quote')).toBeVisible();
});