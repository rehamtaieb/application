import { chromium, test } from "@playwright/test";

test("Add Product test", async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://192.168.100.10:4200/");
    await page.click("text=Add new Product");
    await page.waitForTimeout(1000);

    await page.fill("input[placeholder='Product Code']", "5");
    await page.waitForTimeout(1000);
    await page.fill("input[placeholder='Product Name']", "souris");
    await page.waitForTimeout(1000);
    await page.fill("input[type='number']", "1200");
    await page.waitForTimeout(1000);

    await page.fill("input#Product-cdate", "2024-06-01"); // Use the yyyy-mm-dd format
    await page.waitForTimeout(1000);
    await page.fill("input#Product-mdate", "2024-06-20"); // Use the yyyy-mm-dd format
    await page.waitForTimeout(1000);

    await page.click("//button[text()='Add ']");

    await page.waitForTimeout(1000);

   

    await page.click("//table[contains(@class,'table table-hover')]/tbody[1]/tr[1]/td[7]/button[1]");
    await page.waitForTimeout(1000);
    await page.fill("input[placeholder='Product Code']", "10");
    await page.waitForTimeout(1000);
    await page.fill("input[placeholder='Product Name']", "tablette");
    await page.waitForTimeout(1000);
    await page.fill("input[type='number']", "3000");
    await page.waitForTimeout(1000);

    await page.fill("input#Product-cdate", "2024-06-01"); // Use the yyyy-mm-dd format
    await page.waitForTimeout(1000);
    await page.fill("input#Product-mdate", "2024-06-20"); // Use the yyyy-mm-dd format
    await page.waitForTimeout(1000);


    await page.click("//button[text()='Add ']");
    await page.waitForTimeout(1000);

    

    await page.click("//table[contains(@class,'table table-hover')]/tbody[1]/tr[2]/td[7]/button[2]");
    await page.waitForTimeout(5000);
    await browser.close();

});
