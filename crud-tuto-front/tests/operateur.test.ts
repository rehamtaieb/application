import { chromium, test } from "@playwright/test";

test("Add Operateur test", async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://localhost:4200/operateur");
    await page.click("text=Add new Operateur");

    await page.fill("input#nom", "boulares");
    await page.fill("input#pnom", "mohamedridha");
    await page.fill("input#pwd", "passwd");

   

    await page.click("//button[text()='Add ']");

    await page.waitForTimeout(1000);

   

    await page.click("//table[contains(@class,'table table-hover')]/tbody[1]/tr[1]/td[5]/button[1]");
    await page.fill("input#nom", "chafai");
    await page.fill("input#pnom", "samy");
    await page.fill("input#pwd", "passwd");


    await page.click("//button[text()='Add ']");
    await page.waitForTimeout(1000);

    

    await page.click("//table[contains(@class,'table table-hover')]/tbody[1]/tr[1]/td[5]/button[2]");
    await page.waitForTimeout(5000);
    await browser.close();

});
