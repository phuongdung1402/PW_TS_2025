//PW có 3 cấp độ kiểm soát timeOut
//1.Cao nhất : inline timeout ( áp dụng cho 1 hành động duy nhất)
//2.Trung bình : action timeout ( setup trong file playwright.config.ts : config trong use : actionTimeout)
//3.Thấp nhất , toàn cục (setup trong file playwright.config.ts : config ngoài use : timeout)

import {test, expect} from '@playwright/test'

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/'

test('Cấp 1 : Cấp độ cao nhất', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.locator("//span[contains(text(), 'Bắt đầu Test')]").click()
    const slowBtn1 = page.locator('#button-1')
    await slowBtn1.click({timeout: 5000})
})


test('Cấp 2 : Cấp độ actionTimeout', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.locator("//span[contains(text(), 'Bắt đầu Test')]").click()
    const slowBtn2 = page.locator('#button-2')
    //Lỗi timeout 10000ms
    await slowBtn2.click()
})

test('Cấp 3 : Cấp độ toàn cục', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.locator("//span[contains(text(), 'Bắt đầu Test')]").click()
    const startBtn = page.locator('#start-btn')
    const continueBtn = page.locator('#continue-btn')
    const expectedBtn = page.locator('#final-btn')
    await startBtn.click()
    await continueBtn.click()
    await expectedBtn.click()
})


// test.setTimeout(30000)
//testcase sẽ pass khi set lại timeout toàn cục 
test('Cấp 3-1 : set lại timeout bên trên', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.locator("//span[contains(text(), 'Bắt đầu Test')]").click()
    const startBtn = page.locator('#start-btn')
    const continueBtn = page.locator('#continue-btn')
    const expectedBtn = page.locator('#final-btn')
    await startBtn.click()
    await continueBtn.click()
    await expectedBtn.click()
})

//Mặc định sẽ là 30s cho timeout toàn cục và 30s cho action timeout


//WEB FIRST ASSERTION
//Có 2 cấp độ :
//Cấp độ 1 : inline timeout : cao nhất ( ghi đè trực tiếp trong hành động)
//Cấp độ 2 : Toàn cục - quy định chung 5s (config tại playwright.config.ts : ngoài use : expect {timeout : ..})

test('Cấp 1 : Web first assertion', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'Web-First Assertions'}).click()
    await page.getByText("Bắt đầu chờ").click()
    const statusMessage = page.locator('#status-message')
    //PW sẽ có cơ chế retry để đảm bảo locator sẽ đc expect như mong muốn trong x giây , nếu ko văng timeout
    await expect(statusMessage).toHaveText('Tải dữ liệu thành công!', {timeout : 5000})
})

test('Cấp 2 : Web first assertion', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'Web-First Assertions'}).click()
    await page.getByText("Bắt đầu chờ").click()
    const statusMessage = page.locator('#status-message')
    //PW sẽ có cơ chế retry để đảm bảo locator sẽ đc expect như mong muốn trong x giây , nếu ko văng timeout
    await expect(statusMessage).toHaveText('Tải dữ liệu thành công!')
})

test(' Web first assertion pass', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'Web-First Assertions'}).click()
    await page.getByText("Bắt đầu chờ").click()
    const statusMessage = page.locator('#status-message')
    // sau 7s tcs sẽ pass
    await expect(statusMessage).toHaveText('Tải dữ liệu thành công!', {timeout: 8000})
})


//tobeAttached : kiểm tra xem phần tử có tồn tại trong dom hay ko, nó koo quan tâm có hiển thị trên màn hình hay ko
test(' tobeAttached', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-attach').click()
    //sau 5s để phần tử đc gắn vào dom
    await expect(page.locator('#attacted-node')).toBeAttached()
})
//tobeVisible : kiểm tra vừa tồn tại trong dom vừa hiển thị trên màn hình
test(' tobeVisible', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-hide').click()
    await page.locator('#btn-show').click()
    
    await expect(page.locator('#visibility-target')).toBeVisible()
})

//tobeHidden : check ko có trong dom hoặc bị ẩn
test(' tobeHidden', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-hide-for-hidden').click()
    
    await expect(page.locator('#hidden-target')).toBeHidden()
})

//tobechecked : kiểm tra phần tử có ở trạng thái đc chọn / kích hoạt hay ko ( support radio/checkbox , ko support tab)
test(' tobeChecked', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#tab-option').click()
    const trangThai = await page.locator('#tab-option').getAttribute('aria-selected')
    await expect(trangThai).toBe('true')
})

test(' tobeChecked 2', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#news-check').click()
    await expect(page.locator('#news-check')).toBeChecked()
})
//tobeDisable : check phần tử vô hiệu hóa
test(' tobeDisable', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#toggle-disabled').click()
    await expect(page.locator('#email')).toBeDisabled()
})

//tobeEnable : check phần tử ko bị vô hiệu hóa
test(' tobeEnable', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await expect(page.locator('#enabled-input')).toBeEnabled()
})

//tobeEditable : kiểm tra phần tử có thể nhận đc nội dung nhập liệu hay ko, ko bị disabled và ko có thuộc tính read only
test(' tobeEditable', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await expect(page.locator('#editable')).toBeEditable()
})

//tobeEmpty : kiểm tra phần tử ko chứa bất kì phần tử con nào, hoặc ko có nội dung text()
test(' tobeEmpty', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-clear').click()
    await expect(page.locator('#empty-box')).toBeEmpty()
})

//toHaveCount : check có chứa chính xác bao nhiêu phần tử
test(' toHaveCount', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()

    await expect(page.locator('#items li')).toHaveCount(2)
})
//toContainText : kiểm tra nội dung text của phần tử , ko phân biệt hoa thường và tự chuẩn hóa khoảng trắng
test(' toContainText', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-set-complex-text').click()
    
    await expect(page.locator('#text-container')).toContainText('John Doe')
    await expect(page.locator('#text-container')).toContainText('example.com')
})

//tobeFocus : check focus vào input con trỏ chuột nhấp nháy
test(' tobeFocus', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-focus').click()
    
    await expect(page.locator('#focusable')).toBeFocused()
    
})

//toHaveValue : check phần tử có thuộc tính value của thẻ input hoặc textarea
test(' toHaveValue', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.getByText('Set Value', {exact: true}).click()
    await expect(page.locator('#value-input')).toHaveValue('Hello World')
})

//toHaveValues : check giá trị hiện tại của 1 thẻ select multiple có bnh phần tử array
test('toHaveValues', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.getByText('Set Values', {exact: true}).click()

    await expect(page.locator('#multi-select')).toHaveValues(['Action', 'Drama']);
})

//toHaveClass
test('toHaveClass', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-toggle-exact-class').click()
    
    await expect(page.locator('#exact-class-target')).toHaveClass('highlight');
})

test('toContainClass', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-toggle-class').click()
    
    await expect(page.locator('#class-target')).toContainClass('highlight');
})


// test('toHaveAttribute', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await page.locator("#btn-toggle-attr").click()
//     await expect(page.locator('#avatar')).toHaveAttribute('alt', 'User Avatar')

// })