import { test, expect } from '@playwright/test';
//fixture
//Vòng đời của page 
//Không cần tạo page => playwright sẽ tạo ra page cho mình
//1.Khởi tạo : đầu tiên PW sẽ rạo ra browserContext ( giống như 1 profile riêng sạch sẽ) -> sau đó sẽ mở ra 1 page() - 1 tab mới hoàn toàn trống trong context đó
//2.Sử dụng : page sẽ được truyền vào qua cơ chế destructuring -> toàn bộ testcase sẽ diễn ra trong khối {...}
//3.Sau khi chạy xong -> page và browsercontext tương ứng sẽ bị hủy bỏ. 
test('has title', async ({ page , context }) => {

  //Tab 1 
  const playwrightPage = page
  await playwrightPage.goto('https://playwright.dev/');
  await playwrightPage.getByRole('button', {name: 'Search (Control+k)'}).click()
  await playwrightPage.getByRole('searchbox', {name: 'Search'}).fill('Locators')
  console.log('Tab 1 da go Locators vao o tim kiem ');

  //Tab 2
  const hrmPage = await context.newPage()
  await hrmPage.goto('https://hrm.anhtester.com')
  await hrmPage.getByRole('textbox', {name: 'Your Username'}).fill('admin_example');
  await hrmPage.getByRole('textbox', {name: 'Enter Password'}).fill('password_example')
  console.log('Tab 2 da dien thong tin dang nhap');
  
  console.log('Back ve tab 1 ');
  await playwrightPage.getByRole('searchbox', {name: 'Search'}).press('Enter')
  console.log('Tab 1 dang cho ket qua xuat hien');
  await page.pause()

  await playwrightPage.screenshot({path: 'screenshots/tab1-playwright.png'})
  await hrmPage.screenshot({path: 'screenshots/tab2-hrm.png'})

});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
