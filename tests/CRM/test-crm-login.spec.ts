import {expect, test} from '@playwright/test'
import { CRMLoginPage } from './pom/CRMLoginPage'
import { CRMDashboardPage } from './pom/CRMDashboardPage'

test('CRM Login Page - Login thành công', async ({page})=> {
    const loginPage = new CRMLoginPage(page)
    const dashboardPage = new CRMDashboardPage(page)
    await loginPage.goto()
    await loginPage.expectLoggedIn()
    await loginPage.login('admin@example.com', '123456')
    // await expect(page).toHaveURL(/admin/)

    //assert chuyển trang :
    await dashboardPage.expectOnPage()
})