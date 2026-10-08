import { test, expect, Page } from '@playwright/test'
import { format } from 'date-fns'
const LOGIN_URL = 'https://crm.anhtester.com/admin/authentication'

async function loginAndNavigateToNewCustomer(page: Page, tabName: string) {
    await page.goto(LOGIN_URL)
    await expect(page.getByRole('heading', {level: 1})).toContainText('Login')
    await page.locator('#email').fill('admin@example.com')
    await page.locator('#password').fill('123456')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL(/admin/)
    await expect(page.getByRole('img', {name: 'Perfex CRM | Anh Tester Demo'})).toBeVisible()
    await page.locator(`//span[normalize-space(.)='${tabName}']//parent::a`).click()
    await page.getByRole('link', {name: 'New Customer'}).click()

}


test.describe('CRM Customer Page - Positive case', () => {
    test('TC_CUST_01 - Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page }) => {
        await loginAndNavigateToNewCustomer(page, 'Customers')

        const containerCompany = page.locator('label', {hasText: 'Company'})  // cách viết tương tự : page.locator('label').filter({hasText: 'Company'})
        const asterik = containerCompany.locator('small', {hasText: '*'})
        await expect(asterik).toBeVisible()

        const now = new Date()
        const parsedDate = format(now, 'HH:mm:ss')
        const companyName = `Auto PW company ${parsedDate}`
        await page.locator('#company').fill(companyName)

        await page.locator('#profile-save-section').filter({hasText: 'Save'}).locator('button', {hasText: 'Save'}).nth(1).click()
        await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.')
        await expect(page).toHaveURL(/clients\/client/)
        const currentUrl = page.url()
        const urlParst = currentUrl.split('/clients/client/')
        console.log(urlParst)
        const customerId = urlParst[1]

        const customerNameDisplay = page.locator('span.tw-truncate')
        const displayedText = await customerNameDisplay.textContent()
        console.log(displayedText)
        expect(displayedText).toContain(customerId)

       
    })
})