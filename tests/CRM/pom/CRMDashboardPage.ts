import { SidebarMenu } from "../components/SidebarMenu";
import { BasePage } from "./BasePage";
import { expect, Page } from "@playwright/test";

export class CRMDashboardPage extends BasePage {

    readonly sidebarMenu = new SidebarMenu(this.page)

    private readonly pageLocators = {
        logo : '#logo',
        searchInput : (page: Page) => page.getByRole('searchbox', {name: 'Search...', exact: true}),
        dashboardLink : (page: Page) => page.getByRole('link', {name: 'Dashboard'})
    } as const

    //public element = this.get(this.pageLocators, 'logo')
    public element = this.createLocatorGetter(this.pageLocators)

    async expectOnPage(): Promise<void> {
        await expect(this.element('logo')).toBeVisible()
        await expect(this.get(this.pageLocators, 'searchInput')).toBeVisible()
        await expect(this.element('dashboardLink')).toBeVisible()
    }
    

    async navigateMenu(menuText: string) {
        await this.sidebarMenu.clickMenuItem(menuText)
    }
}