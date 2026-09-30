import { test, expect, Page } from '@playwright/test'
import { stat } from 'node:fs/promises';

test('ví dụ về upload file', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: 'Upload Files' }).click()

    // 1) Input hiển thị
    // const visible = page.locator('#visible-input')
    // //PW tự động upload file cho chúng ta
    // await visible.setInputFiles('tests/fixtures/sample.txt')
    // await expect(page.locator("//div[text() = '1) Input hiển thị (setInputFiles)']/ancestor::div[@class='ant-card-head']/following-sibling::div//span").nth(1))
    // .toHaveText('sample.txt')
    // await page.pause()


    // 2) Input bị ẩn - set trực tiếp
    // const hidden = page.locator('#hidden-input-upload')
    // await hidden.setInputFiles('tests/fixtures/sample.txt')
    // await expect(hidden).toBeAttached()
    // await expect(page.locator("//div[text()='2) Input bị ẩn (setInputFiles trực tiếp)']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Đã chọn: ']/span")).toHaveText('sample.txt')
    // await page.pause()

    //3) Bắt sự kiện filechoose khi bắt buộc phải click nút
    //C1 : Thẻ input bị ẩn - set trực tiếp
    // const chooseInput = page.locator('#file-chooser-input')
    // await chooseInput.setInputFiles('tests/fixtures/sample.txt')
    // await expect(chooseInput).toBeAttached()


    //C2 : Bắt sự kiện filechoose khi bắt buộc phải click nút
    // const chooserPromise = page.waitForEvent("filechooser") // 1. đăng kí lắng nghe trước
    // await page.locator('#fancy-button').click()             // 2. click -> sự kiện bắn ra, listener đã sẵn sàng bắt
    // const chooser = await chooserPromise                    // 3. nhận đc chooser
    // await chooser.setFiles('tests/fixtures/sample.txt')
    // await expect(page.locator("//div[text()='3) Bắt sự kiện filechooser (waitForEvent)']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Đã chọn: ']/span")).toHaveText('sample1.txt')


    //C3 : PW khuyên dùng 
    const [chooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator('#fancy-button').click()
    ])
    await chooser.setFiles('tests/fixtures/sample.txt')
    await expect(page.locator("//div[text()='3) Bắt sự kiện filechooser (waitForEvent)']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Đã chọn: ']/span")).toHaveText('sample.txt')


    //4) Upload nhiều file + Xóa
    // const multi = page.locator('#multi-input')
    // await multi.setInputFiles([
    //     'tests/fixtures/sample1.txt',
    //     'tests/fixtures/sample2.txt',
    //     'tests/fixtures/sample3.txt'
    // ])
    // await expect(page.locator("//div[text()='4) Upload nhiều file + Xoá']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Số file: ']/span")).toHaveText('3')

    // Xóa
    // await multi.setInputFiles([])
    // await expect(page.locator("//div[text()='4) Upload nhiều file + Xoá']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Chưa có file nào']")).toBeVisible();

    await page.pause()
});


test('Ví dụ về download file', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '📤 Upload Files' }).click()

    //1. Đợi event download
    // Đợi cho tất cả các promise con ở trong array thực hiện thành công rồi lấy kết quả
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#download-demo-btn').click()
    ]);
    const fileName = download.suggestedFilename()
    console.log(fileName)

    //2. Kiểm tra tên file suggested
    //expect(download.suggestedFilename()).toBe('login-data.xlsx')
    await download.saveAs('downloads/login-data-verified.xlsx')
    const info = await stat('downloads/login-data-verified.xlsx');
    expect(info.size).toBeGreaterThan(100);

    await page.pause()
});

//---------------------------------------------------------------------------------------------------------------------------
//Shadom DOM (Open vs Closed)
test('Ví dụ về shadow DOM', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', { name: '🧩 Shadow DOM & iFrame' }).click()

    // tương tác như 1 element bình thường, chỉ cần trỏ tới thằng DOM -> Và từ đó dùng locator chain để tương tác
    // phần còn lại PW xử lý
    //shadow dom open
    const openHost = page.locator('open-shadow-el#open-shadow-demo');
    await openHost.locator('#os-input').fill('Hello Shadow');
    await openHost.locator('#os-btn').click();
    await expect(openHost.locator('#os-status')).toHaveText('You typed: Hello Shadow');


    //shadow dom close (thẻ closed-shadow-el : ko thể tương tác vào đc)
    const closedHost = page.locator('closed-shadow-el#closed-shadow-demo')
    const shadowDomText = await closedHost.textContent()
    console.log(shadowDomText)

    await page.pause()
})



test('Ví dụ về iFrame', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', { name: '🧩 Shadow DOM & iFrame' }).click()

    //Cách 1 : Theo ID 
    // const frame = page.frameLocator('#demo-iframe')
    // await frame.locator('#if-input').fill('Hello iFrame')
    // await frame.locator('#if-btn').click()
    // await expect(frame.locator('#if-status')).toHaveText('You typed: Hello iFrame')


    // CÁCH 2 : Theo title attribute 
    const iframeSelector = 'iframe[title="payment-iframe"]'
    // const iframeElement = page.locator(iframeSelector)
    // await iframeElement.waitFor({state: 'attached', timeout: 10000})

    const framePayment = page.frameLocator(iframeSelector)
    await framePayment.locator('#pf-input').fill('hello')
    await framePayment.locator('#pf-btn').click()
    await expect(framePayment.locator('#pf-status')).toHaveText('You typed: hello')
    await page.pause()
})


//Evaluate : API cấp thấp để giao tiếp trực tiếp vs browser
test('Ví dụ về evaluate', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', { name: '🔧 evaluate()' }).click()

    // const domInfo = await page.locator('#demo-input-1').evaluate((el : HTMLInputElement)=> {
    //     return {
    //         value: el.value,
    //         placeholder: el.placeholder,
    //         type: el.type,
    //         disable: el.disabled,
    //         maxLength : el.maxLength,
    //         className : el.className,
    //         defaultValue : el.defaultValue,
    //         selectionStart: el.selectionStart, // ko có native method
    //         selectionEnd: el.selectionEnd, // ko có native method
    //     }
    // })
    // console.log('DOM Infor : ', domInfo)

})


//Thao tác với vùng chọn văn bản (textselection) trong ô input
test('Ví dụ về evaluate - tiếp theo', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', { name: '🔧 evaluate()' }).click()

    //page.on : đây là 1 event listener của PW. Nó lắng nghe sự kiện console
    // - tức là mọi lần trang web gọi console.log , console.error , console.warn,..
    page.on('console', (msg) => console.log('[BROWSER]', msg.text()))
    const input = page.locator('#demo-input-1')

    //1) Gõ nội dung
    await input.fill('Hello Playwright')

    //2) Chọn đoạn text "Hello" ( từ index 0 đến 5)
    await input.evaluate((el: HTMLInputElement) => {
        el.setSelectionRange(0, 5, 'forward')
    })

    //3) Đọc selection range ( cần evaluate )
    const selection = await input.evaluate((el: HTMLInputElement) => {
        return {
            selectionStart: el.selectionStart,
            selectionEnd: el.selectionEnd,
            selectionDirection: el.selectionDirection,
        }
        // console.log(el.selectionStart)
        // console.log(el.selectionEnd)
        // console.log(el.selectionDirection)
        
    })
    console.log(selection); // { selectionStart : 0, selectionEnd : 5 , selectionDirection : 'forward'}

    await page.pause()
})


test('Ví dụ về evaluate - đọc style', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', { name: '🔧 evaluate()' }).click()
    page.on('console', (msg) => console.log('[BROWSER]', msg.text()))

    const element = page.locator('#style-demo-element')

    // Đọc một style property
    // const backgroundColor = await element.evaluate((el : HTMLElement)=> {
    //     return window.getComputedStyle(el).backgroundColor
    // })
    // console.log('Background color:', backgroundColor);

    // Đọc nhiều style cùng lúc 
    const styles = await element.evaluate((el: HTMLElement) => {
        const computed = window.getComputedStyle(el)
        return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            padding: computed.padding,
            border: computed.border,
            borderRadius: computed.borderRadius,
        }
    })
    console.log('All styles:', styles);
})



async function isImageOK(page: Page, imgLocator: string): Promise<boolean> {
    // await page.locator(imgLocator).waitFor({state: 'visible'})
    // await page.waitForTimeout(2000)
    page.on('console', (msg)=> {console.log('[browser]', msg)})
    const result = await page.locator(imgLocator).evaluate((img: HTMLImageElement) => {
        console.log('width : ', img.naturalWidth)
        console.log('height : ', img.naturalHeight)
        //logic check ảnh : 
        //img.complete : trình duyệt đã tải xong(thành công or thất bại)
        //img.naturalWidth > 0 : chiều rộng gốc của ảnh > 0
        //img.natureHeight > 0 : chiều cao gốc của ảnh > 0
        return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0
    });
    return result;
}


test('Ví dụ về brokenImage', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', { name: '🖼️ Broken Images' }).click()
    // const checkImage = await isImageOK(page, "//img[@alt='Vite Logo']")
    // expect(checkImage).toBeTruthy()

    const checkImageF = await isImageOK(page, "//img[@alt='Broken 404']")
    expect(checkImageF).toBeFalsy()
    await page.pause()
})