import { test, expect } from '@playwright/test'
import { performance } from 'node:perf_hooks'

//test scenario (nhóm các testcase vào cùng 1 nhóm với cùng mục đích)
//testsuite để nhóm các test() có liên quan đến nhau
// test('Vao trang playwright.dev', async ({page})=> {

//   await page.goto('https://playwright.dev/');
//   await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();

// });

// test.describe('Trang chu playwright', ()=> {
//     test.skip('TC01 : Check menu hiển thị ', async ({page})=> {
//         await page.goto('https://playwright.dev')
//         await expect(page.getByRole('link', {name: 'Docs'})).toBeVisible()
//     })

//     test('TC2 : Check url hiển thị ', async ({page})=> {
//         await page.goto('https://playwright.dev')
//         await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
//     })
// })

// test.describe('Trang nhan su Anhtester', ()=> {
//     test('TC01 : Kich ban dang nhap va kiem tra widget ', async ({page})=> {
//         await test.step('Buoc 1 : Dieu huong va dang nhap', async ()=> {
//             await page.goto('https://hrm.anhtester.com/erp/login')
//             await page.getByRole('textbox', {name: 'Your Username'}).fill('admin_example')
//             await page.getByRole('textbox', {name: 'Enter Password'}).fill('123456')
//             await page.getByRole('button', { name: ' Login' }).click();
//         })

//         await test.step('Buoc 2: Kiem tra dang nhap thanh cong', async()=> {
//             await expect(page.getByRole('heading', {name: 'Logged In Successfully.'})).toBeVisible();
//interval 5s tự động check và kiểm tra lại url xem có = url mình mong muốn ko
//expect(page.url()).toBe('https://hrm.anhtester.com/erp/desk')
//     })
// })
//})

// const TARGET_URL = 'https://playwright.dev'
// test('TC01 : Demo DOMCONTENTLOADED ', async ({ page }) => {
//     console.log('DEMO WAIT UNTIL - Domcontentloaded - 01');
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev', {waitUntil: 'domcontentloaded'})
//     const endTime = performance.now()
//     console.log(`Thoi gian hoan tat TC01 : ${endTime - startTime}`);

//     const rootElement = page.locator('#__docusaurus')
//     await expect(rootElement).toBeAttached()
// })

// test('TC02 : Demo Load ', async ({ page }) => {
//     console.log('DEMO WAIT UNTIL - Load - 02');
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev', )
//     const endTime = performance.now()
//     console.log(`Thoi gian hoan tat TC02 :  ${endTime - startTime}`);

//     const searchBtn = page.getByRole('button', {name: 'Search (Control+k)' })
//     await expect(searchBtn).toBeEnabled()
// })

// test('TC03 : Demo Networkidle ', async ({ page }) => {
//     console.log('DEMO WAIT UNTIL - NetworkIDLE - 03');
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev', {waitUntil : 'networkidle'} )
//     const endTime = performance.now()
//     console.log(`Thoi gian hoan tat TC03 : ${endTime - startTime}`);

//     const searchBtn = page.getByRole('button', {name: 'Search (Control+k)' })
//     await expect(searchBtn).toBeEnabled()
// })

test('Test web demo', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
    await page.getByRole('button', { name: 'history 📜 Phiên bản cũ' }).click();
    //await page.getByRole('button', { name: 'Click Me!!' }).click({timeout: 500});
    await expect(page.locator('#status')).toContainText('Button Clicked Successfully!');
})
