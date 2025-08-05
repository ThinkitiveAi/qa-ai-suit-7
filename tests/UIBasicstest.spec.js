const {test, expect}= require('@playwright/test');

test('My First Test', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");

});

test('My second test', async({page})=>{

    const UserName = page.locator('#user-name');
    const login = page.locator('#login-button');

    await page.goto("https://www.saucedemo.com/");
    //console.log(await page.title());
    //await expect(page).toHaveTitle("Swag Labs");
    //await page.locator('#user-name').fill("standard_er");
    await UserName.fill("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.pause();
    await login.click();
    //await page.locator('#login-button').click();
    //await page.pause();
    //console.log(await page.locator("h3[data-test='error']").textContent());
    await page.pause();
    //await expect (page.locator("h3[data-test='error']")).toContainText('do not match');

    console.log(await page.locator("a[id='item_4_title_link'] div[class='inventory_item_name ']").textContent());
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    
    


}); 