import { Page, Locator } from "@playwright/test";

export class SidebarMenu {
    private readonly sidebar: Locator
    private readonly menuItem: Locator
    private readonly page: Page


    constructor(page: Page) {
        this.page = page
        this.sidebar = page.locator('#menu.sidebar')
        this.menuItem = this.sidebar.locator('ul.nav.metis-menu > li')
    }

    private getMenuItemByText(text: string): Locator {
        return this.menuItem.filter({has: this.page.locator('span.menu-text', {hasText: text})})
    }

    async clickMenuItem(menuText: string): Promise<void> {
        console.log(`[SidebarMenu] Click menu item : ${menuText}`)
        const menuItem = this.getMenuItemByText(menuText)
        await menuItem.locator('a').click()
    }
}