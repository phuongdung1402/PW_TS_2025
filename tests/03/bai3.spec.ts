import { test } from '@playwright/test'

test('Vai tro ngam dinh', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
    await page.getByRole('button', { name: 'Playwright getByRole' }).click()

    await page.getByRole('link', { name: 'Trang chủ' }).nth(0).hover()
    await page.pause()

})


test('Locator dung filter', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name:'Bài 2: Playwright Locators'}).click()
    await page.getByRole('button', {name : 'Playwright getBy Nâng cao'}).click()
    await page.locator('.product-card').filter({has: page.locator('h3:has-text("iPhone 15 Pro")')}).getByRole('button', {name: 'Mua ngay'}).click()
    await page.pause()

})