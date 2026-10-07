import { test, expect } from '@playwright/test'

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/'
test('Get text()', async ({ page }) => {
    await page.goto(DEMO_URL);
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    const parent = page.locator('#demo-element-1');
    const text1 = await parent.textContent();
    const text2 = await parent.innerText()
    const text3 = await parent.innerHTML()
    console.log('text1: ', text1)
    console.log('text2: ', text2)
    console.log('text3: ', text3)
})

test('Get text() visibility : hidden ', async ({ page }) => {
    await page.goto(DEMO_URL);
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    const parent = page.locator('#demo-element-2');
    const text1 = await parent.textContent();
    const text2 = await parent.innerText()
    const text3 = await parent.innerHTML()
    console.log('text1: ', text1)
    console.log('text2: ', text2)
    console.log('text3: ', text3)
})

test('allTextContents()', async ({ page }) => {
    await page.goto(DEMO_URL);
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    // const parent = page.locator('#demo-dropdown');
    // await expect(parent).toBeVisible()
    // const allText = await parent.allTextContents();
    // console.log('allText:' , allText)
    // const allInnerText = await parent.allInnerTexts()
    // console.log('allInnerText:' , allInnerText)

    const listItem = page.locator('.demo-list-item')
    await expect(listItem).toHaveCount(3)
    const allTexts = await listItem.allTextContents()
    console.log(allTexts)

})

test('inputValue() , getAttribute()', async ({ page }) => {
    await page.goto(DEMO_URL);
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    const parent = page.locator('#demo-input-text');
    const inputValue = await parent.inputValue()
    console.log(inputValue)

    const attributes = page.locator('#demo-attributes')
    const dataStatusAttr = await attributes.getAttribute('data-status')
    console.log(dataStatusAttr)

})


//------------------------------------------------------------------------------------------------------
// Expect ko wait

//toBe(Value) :so sánh nghiêm ngặt , giống với === trong JS TS => nó kiểm tra cả giá trị và kiểu dữ liệu
test('toBe(Value)', () => {
    const name: string = 'Playwright'
    const version: number = 1.56
    const isActive: boolean = true

    //PASS 
    expect(name).toBe('Playwright')
    expect(version).toBe(1.56)
    expect(isActive).toBe(true)

    //Fail
    expect(version).toBe('1.56')
});

//toEqual : so sánh giá trị nội dung của các object hoặc array . Kiểm tra 2 object hoặc array phải giống hệt nhau
test('toEqual', async () => {
    const user1 = { id: 1, name: 'A' }
    const user2 = { id: 1, name: 'A' }
    expect(user1).toEqual(user2)

    const fruit = [{ id: 1, name: 'An' }, { id: 2, name: 'Binh' }]
    const fruit2 = [{ id: 1, name: 'An' }, { id: 2, name: 'Binh' }]

    expect(fruit).toEqual(fruit2)

});


//toContain : kiểm tra Mảng có chứa
//Dùng toContain để kiểm tra có chứa với array (thuần)
//Array object : dùng toContainEqual
test('toContain', () => {
    const permissions: string[] = ['read', 'write', 'delete']
    const users: { id: number; name: string }[] = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
    ]

    expect(permissions).toContain('write')
    expect(permissions).toContain('read')

    //FAIL : Ko dùng đc toContain vs mảng object . Khi so sanh mảng object dung toContainEqual
    //expect(users).toContain([{id:1, name: 'A'}, {id: 2, name: 'B'}])

    expect(users).toContainEqual({ id: 1, name: 'A' })
})

//TobeTruthy va tobeFalsy: kiem tra 1 gia tri có la truthy / falsy hay không ?
test('tobeTruthy', () => {
    expect('hello').toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
    expect('').toBeFalsy()
    expect(0).toBeFalsy()
    expect(false).toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()

})
//{} , [] : tobetruthy

//tobeGreaterThan /toBeLessThan
test('tobeGreaterThan /toBeLessThan', () => {
    const itemCount = 5
    const totalPrice = 100.5

    expect(itemCount).toBeGreaterThan(0)
    expect(totalPrice).toBeLessThan(120)

})

//So sanh ten cua User
test('Get text', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab', { name: 'Expect Assertions' }).click()
    const name = await page.locator('#profile-name').innerText()
    console.log(name);

    expect(name).toBe('Playwright Learner')
});


//profile-json
test('Get object json', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab', { name: 'Expect Assertions' }).click()
    const name = await page.locator('#profile-json').innerText()
    const profile = JSON.parse(name)
    //console.log(profile)
    expect(profile).toEqual({
        "id": 101,
        "role": "student",
        "active": true,
        "premium": false
    })
});

test('Check category', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab', { name: 'Expect Assertions' }).click()
    const result = await page.locator('#categories li').allInnerTexts()
    console.log(result);
    expect(result).toContain('🎧 Audio')
    expect(result.length).toBe(3)

    // dùng vs web first assertion
    await expect(page.locator('#categories')).toContainText('Audio')
});


test('Check trạng thái', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab', { name: 'Expect Assertions' }).click()
    const result = await page.locator('#in-stock-flag').getAttribute('data-value')
    const st = Boolean(result)
    expect(st).toBeTruthy()
});

// // .toHaveProperty : so sánh cặp key-value trong object
test('toHaveProperty', () => {
    const user = {
        id: 1,
        name: 'Alice',
        adress: {
            street: '123 THD',
            city: 'HN',
        },
        isActive: true,
    };
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('name', 'Alice');
    expect(user).toHaveProperty('adress.city');
    expect(user).toHaveProperty('adress.city', 'HN');
    expect(user).toHaveProperty('isActive', true);
});


//toHaveLength
test('toHaveLength', () => {
    const fruits = ['Cam', 'Xoai', 'Chuoi'];
    const emptyArry: string[] = [];
    expect(fruits).toHaveLength(3);
    expect(emptyArry).toHaveLength(0);
    expect(emptyArry).toBeTruthy()
});


//objectContaining
test('objectContaining', () => {
    const apiResponse = {
        id: 'txn-123',
        status: 'completed',
        amount: 50,
        timeStamp: '2025-10-28',
    };
    const expectedCoreData = {
        amount: 50,
        status: 'completed',
    };
    expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));
    //Fail -> object cha ko có cặp key value là status: pending
    expect(apiResponse).toEqual(expect.objectContaining({ status: 'pending' }));
});


// arrayContaining
test('arrayContaining', () => {
    const userPermissions = ['read', 'write', 'comment', 'delete']
    const requiredPermission = ['delete', 'read']

    expect(userPermissions).toEqual(expect.arrayContaining(requiredPermission))
})


//nested: dùng để so sánh object lồng nhau
test('objectContainingnested', () => {
    const apiResponse = {
        id: 'txn-123',
        status: 'completed',
        user: {
            id: 'user=123',
            name: 'Alice',
            email: 'Alice@gmail.com',
        },
        amount: 50,
        timeStamp: '2025-10-28',
    };
    const expectedCoreData = {
        status: 'completed',
        user: expect.objectContaining({
            id: 'user=123',
            name: 'Alice',
        }),
    };
    expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));
});

interface IMovieData {
    id: number;
    title: string;
    year: number;
    rating: number;
    genres: string[];
    isLike: boolean;
    inList: boolean;

}


test('Bài tập UI Movies', async ({ page }) => {
    await page.goto(DEMO_URL);
    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab', { name: 'Expect Assertions' }).click();
    //1 tìm locator của 4 thẻ phim
    const movieCards = await page
        .locator(
            "//span[text()='Danh sách phim']/ancestor::div[@class='ant-card-head']/following-sibling::div//div[contains(@class,'movie-card')]"
        )
        .all();
    console.log('Số lượng movies,', movieCards.length);
    expect(movieCards).toHaveLength(4);
    const moviesData: IMovieData[] = [];
    for (let i = 0; i < movieCards.length; i++) {
        //index =0 => slient code
        const card = movieCards[i];
        //lấy thông tin về thẻ phim
        const dataTitle = await card.getAttribute('data-title');
        console.log(dataTitle);
        const dataYear = await card.getAttribute('data-year');
        const dataRating = await card.getAttribute('data-rating');
        const dataGenres = await card.getAttribute('data-genres');

        //dùng locator chaining (css)
        const titleText = await card.locator('.ant-card-meta-detail span').nth(0).innerText();
        console.log('TitleText', titleText);
        const ratingText = await card.locator('.ant-card-meta-detail span').nth(1).innerText();
        console.log('ratingText', ratingText);
        const yearText = await card.locator('.ant-card-meta-description div div').nth(0).innerText();
        console.log('yearText', yearText);
        await page.pause();
    }
});