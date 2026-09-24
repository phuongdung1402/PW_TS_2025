import { test, expect } from '@playwright/test';
import { tr } from 'date-fns/locale';

// locator.check() => đảm bảo ô đc check. ( nếu đã check -> ko làm gì cả)
// locator.uncheck() =>đảm bảo ô bị uncheck ( nếu đã bỏ check -> thì ko làm gì cả)
// locator.setCheck(boolean) : 

//const shouldBeCheck = true
//await page.locator.setCheck(shouldBeCheck) -> luôn đảm bảo cho radio hoặc checkbox được check
//Áp dụng cho các thẻ có type radio , checkbox

test('Ví dụ về checkbox', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name : 'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name : '☑️ Checkboxes & Radio'}).click()

    // checkbox 1 : check() / uncheck()
    // await page.locator('#demo-checkbox-1').check()
    // await expect(page.locator('#demo-checkbox-1')).toBeChecked()

    // await page.locator('#demo-checkbox-1').uncheck()
    // await expect(page.locator('#demo-checkbox-1')).not.toBeChecked()

    // // Checkbox 2 : setChecked (true/false)
    // await page.locator('#demo-checkbox-2').setChecked(true)
    // await expect(page.locator('#demo-checkbox-2')).toBeChecked()

    // await page.locator('#demo-checkbox-2').setChecked(false)
    // await expect(page.locator('#demo-checkbox-2')).not.toBeChecked()

    // // checkbox 3 : Idempotent -- Gọi lại nhiều lần an toàn
    await page.locator('#demo-checkbox-3').setChecked(true)
    await page.locator('#demo-checkbox-3').setChecked(false)
    await expect(page.locator('#demo-checkbox-3')).not.toBeChecked()

    await page.pause()
})



test('Ví dụ về dropdown', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name : 'Bài 4: Mouse Actions'}).click()
    const panel =  page.getByRole('tab', {name : '☑️ Checkboxes & Radio'}).click()

    //TH1 : dropdown có thẻ select ( thao tác ko cần click)
    // const dropdownLocator = page.locator('#country-select')
    // await dropdownLocator.selectOption('Vietnam')
    //await dropdownLocator.selectOption({index : 3})

    //TH2 : dropdown ko có thẻ select
    // await page.locator("//div[contains(text(), 'Custom Dropdown (Không dùng <select>)')]/ancestor::div[@class='ant-card-head']/following-sibling::div//div[@class='cd-trigger']").click()
    // await page.locator("//ul[contains(@class, 'cd-menu')]//li[normalize-space()='Banana']").click()


    //TH3 : Dropdown có thẻ input được bọc bên ngoài thẻ div
    //await page.locator('#lib-strict-control').click()
    await page.locator("//div[@id='lib-strict-control']//input[@role='combobox' and @aria-label='Strict fruits combobox']").click()
    await page.pause()

})


//PW tu dong xu ly va accept tat ca cac dialog boi default
test('Ví dụ về alert', async({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name:'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name: '⚠️ Alerts & Modals'}).click()

    // trình lắng nghe trc khi click
    page.once('dialog', async (dialog) => {
        console.log(dialog.type())
        expect(dialog.type()).toBe('alert')
        expect(dialog.message()).toContain('Hello from alert')
        await dialog.accept()
    })

    await page.locator('#btn-alert').click()
    expect(page.locator('#alert-result')).toHaveText('Alert acknowledged')
    await page.pause()
})

test('Ví dụ về alert (Confirm - Prompt)', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name:'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name:'⚠️ Alerts & Modals'}).click()

    // Alert confirm
    // page.once('dialog', async (dialog)=> {
    //     console.log(dialog.type())
    //     expect(dialog.type()).toBe('confirm')
    //     expect(dialog.message()).toContain('Are you sure')
    // //    await dialog.accept()
    //     await dialog.dismiss()
    // })
    // await page.locator('#btn-confirm').click()
    // //expect(page.locator('#confirm-result')).toHaveText('Confirmed: YES')
    // expect(page.locator('#confirm-result')).toHaveText('Confirmed: NO')


    // Alert prompt
    page.once('dialog', async (dialog)=> {
        console.log(dialog.type())
        expect(dialog.type()).toBe('prompt')
        expect(dialog.message()).toContain('Your name:')
        // truyen text vao input
        await dialog.accept('Tester')
    })
    await page.locator('#btn-prompt').click()
    expect(page.locator('#prompt-result')).toHaveText('Hello, Tester')

    // page.once('dialog', async (dialog)=> {
    //     console.log(dialog.type())
    //     expect(dialog.type()).toBe('prompt')
    //     expect(dialog.message()).toContain('Your name:')
    //     await dialog.dismiss()
    // })
    // await page.locator('#btn-prompt').click()
    // expect(page.locator('#prompt-result')).toHaveText('Prompt canceled')
    // await page.pause()

 })


 // Locator chain -> mình có thể nối nhiều locator lại với ( tìm từ thằng cha trỏ xuống thằng con , chứ ko cần tìm trong cả page)
test('Ví dụ về modal', async({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name:'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name: '⚠️ Alerts & Modals'}).click()

    //Mở modal, điền tên , xác nhận và assert kết quả
    await page.locator('#open-basic-modal').click()

    //Assert là modal sẽ hiện lên để thao tác
    const dialog = page.getByRole('dialog', {name:'Thông báo'})
    await expect(dialog).toBeVisible()
    await dialog.locator('#basic-modal-input').fill('Alice')
    await page.getByRole('button', {name: 'Đồng ý'}).click()
    await expect(dialog).toHaveCount(0)
    await expect(page.locator('#basic-modal-result')).toHaveText('Submitted: Alice')

    await page.pause()
})
