import {test, expect, Page} from '@playwright/test'
import {addDays, differenceInDays, format, getMonth, subDays, parse, getYear, isValid} from 'date-fns'

test('Ví dụ data picker', ()=> {
    //Date là 1 obj o trong JS/TS
    //HN+7 -> UTC - 7
    const now = new Date()
    console.log(now)
    // console.log(now.getFullYear())
    // console.log(now.getMonth()+1)
    // console.log(now.getDate())
    

    //yyyy-mm-ddT
    // const specificDate = new Date('2025-01-30T10:00:00') 
    // console.log(specificDate)

    // const today = new Date()
    // const formatDate = format(today, 'dd/MM/yyyy')
    // console.log(formatDate)


    // const formatedTime = format(today, 'HH:mm:ss')
    // console.log(formatedTime)

    // const today2 = new Date('2025-11-06')
    // const inTenDays = addDays(today2, 10)
    // const insubDays = subDays(today2, 3)
    // console.log(inTenDays)
    // console.log(insubDays)

    // const dateA = new Date('2025-11-11')
    // const dateB = new Date('2025-11-06')

    // const daysBetween = differenceInDays(dateA, dateB)
    // console.log(`A hon B ${daysBetween} ngay`)
})

test('Ví dụ về date picker', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name: 'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name: '📅 jQuery Date Picker'}).click()
    
})


const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

async function openAntSlectedByCardTitle(page: Page, cardTitle: string, index: number) {
  const card = page.locator(
    `xpath=//div[contains(@class, 'ant-card ')][.//div[contains(@class,'ant-card-head-title') and normalize-space()='${cardTitle}']]`
  );
  const selects = card.locator(
    "xpath=.//div[contains(@class, 'ant-select')]//div[contains(@class, 'ant-select-selector')]"
  );
  const selector = selects.nth(index - 1);
  await selector.click();
  const dropdown = page.locator('.ant-select-dropdown:visible').first();
  return dropdown;
}

async function pickAntOptionByText(page: Page, text: string) {
  const option = page
    .locator(
      `//div[contains(@class, 'ant-select-dropdown') and not(contains(@style, 'display:none'))]//div[contains(@class,'ant-select-item-option-content') and normalize-space()='${text}']`
    )
    .first();
  await option.scrollIntoViewIfNeeded();
  await option.click();
}

async function selectDateDemo2(page: Page, ymd: string) {
  const monthYearText = page.locator('#dp2-month-year');

  //validate input
  const parsed = parse(ymd, 'yyyy-MM-dd', new Date());
  if (!isValid(parsed)) {
    throw new Error('Ngay khong hop le', ymd);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed > today) {
    throw new Error('Khong the chon ngay tuong lai', ymd);
  }

  const demo2Title = 'Demo 2: Dropdown Navigation + Today highlight + Disable future dates';
  await openAntSlectedByCardTitle(page, demo2Title, 1);
  await pickAntOptionByText(page, monthNames[getMonth(parsed)]);

  await openAntSlectedByCardTitle(page, demo2Title, 2);
  await pickAntOptionByText(page, String(getYear(parsed)));

  //verify
  const targetMonthName = monthNames[getMonth(parsed)];
  const targetYear = getYear(parsed);
  const expecText = `${targetMonthName} ${targetYear}`;
  await expect(monthYearText).toHaveText(expecText);

  //tim ngay
  const dayCell = page.locator(`//table[@id='dp2-table']//td[@data-date='${ymd}']`);
  await dayCell.click();
  await expect(page.locator('#dp2-selected')).toHaveText(ymd);
}
test('ví dụ date picker2', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByText('📅 jQuery Date Picker', { exact: true }).click();
  const lastMonth = new Date(); 
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const y = lastMonth.getFullYear();
  //yyyy/mm/dd
  //020304050607
  const m = String(lastMonth.getMonth() + 1).padStart(2, '0');
  const d = '15';
  const ymd = `${y}-${m}-${d}`;
  await selectDateDemo2(page, ymd);
  await page.pause()
});