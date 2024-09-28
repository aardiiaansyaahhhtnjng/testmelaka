import { test, expect } from '@playwright/test';

test.describe('Menu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://dashboard.melaka.app/register', { waitUntil: 'domcontentloaded'});
    });

    test('SOLUSI KAMI', async ({ page }) => {
        await page.hover('text=SOLUSI KAMI');

        const land = page.getByTestId('landing__menu__our_solutions');
        await expect(land).toBeVisible();
        await land.click();
    })
})