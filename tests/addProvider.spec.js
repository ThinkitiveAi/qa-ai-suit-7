const { test, expect, chromium } = require('@playwright/test');

test('Add Provider User and verify creation', async () => {
  // Launch Chromium browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Go to the login page
  await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/');

  // 2. Login
  await page.getByPlaceholder('Email').fill('rose.gomez@jourrapide.com');
  await page.getByPlaceholder('*********').fill('Pass@123');
  await page.getByRole('button', { name: /login|let's get started/i }).click();

  // 3. Navigate to Settings >> User settings >> Providers
  // Wait for dashboard or main page to load if needed
  // Click on "Settings" (adjust selector as needed)
  await page.locator('text=Settings').click();
  // Click on "User settings"
  await page.getByRole('menuitem', { name: /user settings/i }).click();
  // Click on "Providers" tab or menu
  await page.getByRole('tab', { name: /providers/i }).click();

  // 4. Click on Add Provider User
  await page.getByRole('button', { name: /add provider user/i }).click();

  // 5. Fill the mandatory fields (adjust field names as per actual UI)
  await page.getByRole('textbox', { name: /first name/i }).fill('Aileen');
  await page.getByRole('textbox', { name: /last name/i }).fill('Edward');
  await page.getByRole('textbox', { name: /email/i }).fill('aliee.k.provider@example.com');
  await page.getByRole('textbox', { name: /contact|phone/i }).fill('1235557890');

  // Select Gender (assuming dropdown or radio button)
  await page.getByRole('combobox', { name: /gender/i }).click();
  await page.getByRole('option', { name: /female/i }).click();
  await page.pause();

  // Select Role (assuming dropdown or radio button)
  await page.getByRole('combobox', { name: /role/i }).click();
  await page.getByRole('option', { name: /provider/i }).click();

  // Add more fields if required by your form

  // 6. Click Save
  await page.getByRole('button', { name: /save/i }).click();

  // 7. Verify that the newly created provider appears in the list
  // Optionally, search for the provider by name or email
  await page.getByPlaceholder(/search/i).fill('Aileen Edward');
  await expect(page.getByText('Aileen Edward')).toBeVisible();

  // Close browser
  await browser.close();
}); 