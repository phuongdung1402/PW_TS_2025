import { Locator, Page } from '@playwright/test'

export abstract class BasePage {

    constructor(protected page: Page) { }

    //Mục đích : Có 1 locatorMap chứa tất cả các locator ( có thể chứa các loại : css, xpath, getBy..)
    //gọi hàm get : sẽ đc gợi ý tất cả các loại locator đó và trả về đúng giá trị đó
    protected get<T extends Record<string, string | ((page: Page) => Locator)>>(locatorMap: T, locatorName: keyof T): Locator {
        const locatorDef = locatorMap[locatorName]
        if (typeof locatorDef === 'function') {
            return locatorDef(this.page)
        }
        return this.page.locator(locatorDef)
    }

    protected createLocatorGetter<T extends Record<string, string | ((page: Page) => Locator)>>(locatorMap: T): (locatorName: keyof T) => Locator {
        return (locatorName: keyof T): Locator => {
            const locatorDef = locatorMap[locatorName]
            if (typeof locatorDef === 'function') {
                return locatorDef(this.page)
            }
            return this.page.locator(locatorDef)
        }
    }




    protected async logClick(locator: Locator) {
        const elementInfo = await this.getElementInfo(locator)
        console.log(`[Click] ${elementInfo}`)
    }

    protected async logFill(locator: Locator, value?: string) {
        const elementInfo = await this.getElementInfo(locator)
        const valueInfo = value ? `with value ${value}` : ''
        console.log(`[Fill] ${elementInfo} ${valueInfo}`)
    }

    protected async fillWithLog(locator: Locator, value: string, options?: { isSensitive?: boolean, fillOptions?: Parameters<Locator['fill']>[1] }) {
        let isSensitive = options?.isSensitive
        const logValue = isSensitive ? '***' : value
        await this.logFill(locator, logValue)
        await locator.fill(value, options?.fillOptions)
    }

    protected async clickWithLog(locator: Locator, options?: Parameters<Locator['click']>[0]) {
        await this.logClick(locator)
        await locator.click()
    }

    private async getElementInfo(locator: Locator): Promise<string> {
        let text = ''

        try {
            text = await locator.innerText()
            text = text.trim()
        } catch {
            try {
                const textContent = await locator.textContent()
                text = textContent?.trim() || ''
            } catch {
                try {
                    const value = await locator.inputValue()
                    if (value) {
                        text = `value = ${value}`
                    }
                } catch { }
            }
        }
        return text
    }

    abstract expectOnPage(): Promise<void>
}