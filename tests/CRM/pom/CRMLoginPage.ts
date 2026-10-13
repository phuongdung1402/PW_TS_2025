import {test, expect} from '@playwright/test'
import { BasePage } from "./BasePage";

export class CRMLoginPage extends BasePage {
    //Khai báo locator 
    private readonly emailInput = this.page.locator('#email')
    private readonly passwordInput = this.page.locator('#password')
    private readonly loginButton = this.page.getByRole('button', {name: 'Login'})
    private readonly h1Text = this.page.getByRole('heading', {level: 1})

    async goto() {
        await this.page.goto('https://crm.anhtester.com/admin/authentication')
    }

    async expectOnPage(): Promise<void> {
        await expect(this.emailInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.h1Text).toContainText('Login')
        await expect(this.page).toHaveURL(/admin\/authentication/)
    }

    async login(email: string , password: string) {
        this.logFill(this.emailInput)
        await this.emailInput.fill(email)
        this.logFill(this.passwordInput)
        await this.passwordInput.fill(password)
        this.logClick(this.loginButton)
        await this.loginButton.click()     
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/admin/)
    }
}