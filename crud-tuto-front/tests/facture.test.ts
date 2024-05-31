import { chromium, test } from "@playwright/test";

test("Add Facture test", async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://localhost:4200/facture");
    await page.click("text=Add new Facture");

    await page.fill("input[placeholder='Montant Remise']", "20");
    await page.fill("input[placeholder='Montant Facture']", "500");
    await page.fill("input[type='number']", "1200");

    await page.fill("input#cdate", "2024-06-01"); // Use the yyyy-mm-dd format
    await page.fill("input#mdate", "2024-06-20"); // Use the yyyy-mm-dd format
    
    // Wait for the select element to be visible
    
    
    

    // Use selectOption for <select> element
    await page.selectOption("select#archiv", { label: "oui" });

    await page.click("//button[text()='Add ']");

    await page.waitForTimeout(5000);
    await browser.close();
});
