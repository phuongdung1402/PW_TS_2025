import {test , expect} from '@playwright/test'

//B1: Break nhỏ UI ra xem có chức năng gì
//B2: Xác định testcase có những TCs gì
//B3: Xác định các step sẽ thực hiện và các step đó liên quan đến các elements nào trên UI và nguồn input (data test) đầu vào là gì?
//B4: Xác định locator của các elements
//Có thể nắm vững đc 1 cách lấy locator đơn -> nghĩ đến hướng có thể lấy locator mà áp dụng đc cho nhiều phần tử
//áp dụng đc cho những phần tử giống nhau , khác nhau về 1 số text chẳng hạn

const LOGIN_URL = 'https://hrm.anhtester.com/erp/login'
test.describe('HRM Login Page - Positive case', ()=> {
    test('TC_LOGIN_01 - Đăng nhập thành công (Click)', async ({page})=> {
        await page.goto(LOGIN_URL)
        await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo')

        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('123456')
        await page.getByRole('button', {name: ' Login'}).click()

        await expect(page.locator('#swal2-title')).toContainText('Logged In Successfully.')
        await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk')
        // await expect(page).toHaveURL(/erp\/desk/)
        // await expect(page).toHaveURL(/.*\/erp\/desk.*/)
    })


    test('TC_LOGIN_02 - Đăng nhập thành công (Enter)', async ({page})=> {
        await page.goto(LOGIN_URL)
        await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo')

        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('123456')
        await page.locator('#ipassword').press('Enter')
        
        await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.')

        //await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk')
        //await expect(page).toHaveURL(/erp\/desk/)
        await expect(page).toHaveURL(/.*\/erp\/desk.*/)
    })
})

test.describe('HRM Login Page - Negative case', ()=> {
    test('TC_LOGIN_03 - Đăng nhập thất bại ( Sai mật khẩu )', async ({page})=> {
        await page.goto(LOGIN_URL)
        await expect(page.locator('h4.mb-3.f-w-600')).toContainText('Welcome to HRM | Anh Tester Demo')

        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('123456789')
        await page.locator('#ipassword').press('Enter')

        await expect(page.locator('.toast-message')).toContainText('Invalid Login Credentials')
        await page.pause()
    })

    test('TC_LOGIN_08 - Mật khẩu quá ngắn (dưới 6 kí tự)', async ({page})=> {
        await page.goto(LOGIN_URL)
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')
        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('123')
        await page.keyboard.press('Enter')
        await expect(page.locator('.toast-message')).toContainText('Your password is too short, minimum 6 characters required.')
    })
})

test.describe('HRM Login Page - UI', ()=> {
    test('TC_LOGIN_09 - Mật khẩu bị che (Masking)', async ({page})=> {
        await page.goto(LOGIN_URL)
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')
        await expect(page.locator('#ipassword')).toHaveAttribute('type', 'password')
    })

    test('TC_LOGIN_11 - Placeholder (Văn bản gợi ý)', async ({page})=> {
        await page.goto(LOGIN_URL)
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')
        await expect(page.locator('#iusername')).toHaveAttribute('placeholder', 'Your Username')
        await expect(page.locator('#ipassword')).toHaveAttribute('placeholder', 'Enter Password')

    })
})