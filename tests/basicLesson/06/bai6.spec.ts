import {test, expect} from '@playwright/test'

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/'


//Mouse Action
test('ví dụ về các loại click trong PW', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.locator('//span[text()="Click Me"]').click();

  await page.locator('//span[text()="Double Click Me"]').dblclick();

  await page.locator('//span[text()="Right Click Me"]').click({ button: 'right' });
  await page.pause();
});

//Mouse Hover
test('Hover trong PW 00', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.locator("//div[text() = 'Hover over me']").hover()
    const result = await page.locator("//div[text() = 'Hover over me']/preceding-sibling::span/following-sibling::div").nth(1).innerText()
    console.log(result)
    expect(result).toBe('Hover Count: 1')
})

test('Hover trong PW 01', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.locator('//div[text()="Hover để xem tooltip"]').nth(0).hover();
  const toolTip = await page.locator("//div[@class='ant-tooltip-inner']").innerText() 
  console.log(toolTip);
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.pause();
});


// test('Hover trong PW ( Single tooltip )', async ({page})=> {
//     await page.goto("https://demoapp-sable-gamma.vercel.app/")
//     await page.getByRole('link', {name:'Bài 4: Mouse Actions'}).click()
//     await page.locator("//div[text()='Single tooltip']").hover()
//     const toolTip = await page.locator("//div[@class='ant-tooltip-inner']").innerText()
//     expect(toolTip).toBe('Tooltip với placement khác nhau')
//     await page.pause()
// })

// thẻ span ko có event listener hay thuộc tính disable -> nên khi mà disable thẻ , vẫn có thể click được
test('Click element thật và giả', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()

    //await page.locator('//button', {hasText: 'Disable Button'}) ( filter trong PW)
    // Dấu (.) : tìm trong các thẻ con
    await page.locator("//button[normalize-space(.)='Disable Button']").click()

    // button giả    
    await page.locator("//span[text()='Click Me (Span)']").click()

    // button thật
    await page.locator("//button[normalize-space(.)='Click Me (Button)']").click()

    //website có cơ chế trình duyệt ( gọi là event bubbling ): khi thẻ span ko click đc , web sẽ tìm và gọi đến thẻ trên nó

    await page.pause()

})


test('Click nhiều button 1 lúc', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()

    const files = ['📄 Document.pdf ', '🖼️ Image.jpg ', '📊 Report.xlsx ', '🎵 Music.mp3 ', '📹 Video.mp4 ']

    // for each ko dùng được await 
    for (const f of files) {
        await page.getByRole('button', { name: f }).click()
    }
    await expect(page.locator('#ac-selected-count-advanced')).toContainText('Selected: 5 items')
    await page.locator('#ac-process').click()
    const successMessage = page.locator('.ant-space-item .ant-alert-message')

    await expect(successMessage).toHaveText('Processing Complete!')
    await page.pause()
})


// Phím chức năng
test('keyboard actions', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '⌨️ Keyboard Actions' }).click()

    // // Nhấn phím Enter
   //await page.locator('input').press('Enter')

    // //  // Nhấn phím Delete
    // await page.locator('input').press('Delete')

    //  // Nhấn phím Arrow
    // await page.locator('input').press('ArrowUp')
    // await page.locator('input').press('ArrowDown')
    // await page.locator('input').press('ArrowLeft')
    // await page.locator('input').press('ArrowRight')

    // // Nhấn phím Escape
    // await page.locator('input').press('Escape')

    // // Nhấn phím Tab
    // await page.locator('input').press('Tab')

    // // Nhấn phím Space
    // await page.locator('input').press('Space')


    //------------------------------------------------------------------------------------------
    // const areaInput = page.getByPlaceholder('Vùng text cho Demo 4');
    // await areaInput.click()
    // await page.keyboard.press('a')
    // // type dùng đc với page.keyboard / còn page.locator().pressSequence thay cho page.locator().type
    // await page.keyboard.type('Hello world', { delay: 300 })
    // await page.keyboard.down('Shift')
    // await page.keyboard.press('ArrowRight')
    // await page.keyboard.press('ArrowRight')
    // await page.keyboard.up('Shift')
    // await page.keyboard.type('the end')

    //------------------------------------------------------------------------------------------
    //Focus vào textarea Demo 5
    // await page.locator('#demo5-textarea').click()

    //Select All , Copy , CUT , Paste
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Control+c')
    await page.keyboard.press('Control+x')
    await page.locator('#demo5-textarea').fill('ABC')
    await page.locator('#demo5-textarea').pressSequentially('Toi la super man', { delay: 1000 })
    await page.keyboard.press('Control+v')
    await page.pause()

})