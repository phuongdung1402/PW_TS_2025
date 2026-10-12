import {test, expect} from '@playwright/test'
import { BasePage } from "./BasePage";

export class CRMLoginPage extends BasePage {
    //Khai báo locator 
    private readonly emailInput = this.page.locator('#email')
    private readonly passwordInput = this.page.locator('#password')
    private readonly loginButton = this.page.getByRole('button', {name: 'Login'})


    async expectOnPage(): Promise<void> {
        await expect(this.emailInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.page).toHaveURL(/admin\/authentication/)
    }

    async login(email: string , password: string) {
        await this.emailInput.fill(email)
        this.logFill(this.emailInput)
        await this.passwordInput.fill(password)
        this.logFill(this.passwordInput)

        await this.loginButton.click()
        this.logClick(this.loginButton)
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/admin/)
    }
}