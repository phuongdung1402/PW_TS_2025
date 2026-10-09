import { test, expect, Page } from '@playwright/test'
import { format } from 'date-fns'
import { faker } from '@faker-js/faker'
const LOGIN_URL = 'https://crm.anhtester.com/admin/authentication'


function createRandomUser() {
    return {
        phone: faker.phone.number(),
        vatNumber: faker.string.numeric(10),
        website: faker.internet.url(),
        currency: 'USD',
        language: 'Vietnamese',
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state:faker.location.state(),
        zipcode: faker.location.zipCode(),
        country: 'Vietnam'

    }

}


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

        const information = createRandomUser()
        //Input của các ô
        await page.getByRole('textbox', {name: 'VAT Number'}).fill(information.vatNumber)

        //bước tìm ra drop và click mở
        const currencyContainer = page.locator('div.form-group', {hasText: 'Currency'})
        await currencyContainer.locator('button[data-id="default_currency"]').click()

        await page.locator('a[role="option"]').filter({has: page.locator('span.text', {hasText: information.currency})}).click()
        //Cách chọn thẻ select
        //await currencyContainer.locator('#default_currency').selectOption(information.currency)
        //XPath : //a[@role='option'][.//span[contains(@class, 'text') and contains(., 'USD')]]

        const languageContainner = page.locator('div.form-group', {hasText: 'Default Language'})
        await languageContainner.locator('button[data-id="default_language"]').click()

        await page.locator('a[role="option"]').filter({has: page.locator('span.text', {hasText: information.language})}).click()

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
        
        await expect(page.locator('#vat')).toHaveValue(information.vatNumber)
        const dropdownText = await page.locator('button[data-id="default_currency"]').getAttribute('title')
        expect(dropdownText).toContain(information.currency)
        await page.pause()
       
    })


    test('TC_CUST_04 ', async ({page})=> {
        await loginAndNavigateToNewCustomer(page, 'Customers')

        const containerCompany = page.locator('label', {hasText: 'Company'})  // cách viết tương tự : page.locator('label').filter({hasText: 'Company'})
        const asterik = containerCompany.locator('small', {hasText: '*'})
        await expect(asterik).toBeVisible()

        const now = new Date()
        const parsedDate = format(now, 'HH:mm:ss')
        const companyName = `Auto PW company ${parsedDate}`
        await page.locator('#company').fill(companyName)

        const information = createRandomUser()
        //Input của các ô
        await page.getByRole('textbox', {name: 'VAT Number'}).fill(information.vatNumber)
        await page.locator('#address').fill(information.address)

        await page.getByRole('tab', {name: 'Billing & Shipping'}).click()
        await page.getByText('Same as Customer Info').click()
        await expect(page.locator('#billing_street')).toHaveValue(information.address)
        await page.pause()
       
    })


})