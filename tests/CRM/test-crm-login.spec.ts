import {expect, test} from '@playwright/test'
import { CRMLoginPage } from './pom/CRMLoginPage'

test('CRM Login Page - Login thành công', async ({page})=> {
    const loginPage = new CRMLoginPage(page)
    await loginPage.goto()
    await loginPage.expectOnPage()
    await loginPage.login('admin@example.com', '123456')
    await expect(page).toHaveURL(/admin/)
})