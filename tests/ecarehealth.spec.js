import { test, expect } from '@playwright/test';

test('Patient Registration - Mandatory Fields', async ({ page }) => {
  // Navigate to the application
  await page.goto('https://stage_ketamin.uat.provider.ecarehealth.com/');

  // Login steps
  await page.fill('input[name="username"]', 'amol.shete+TP@medarch.com');
  await page.fill('input[type="password"]', 'Test@123$');
  await page.click('button:has-text("Let\'s get Started")');

  // Wait for dashboard to load
  //await page.waitForLoadState('networkidle');

  // Click on Create dropdown button
  await page.click('div[aria-haspopup="true"] .MuiBox-root.css-6qz1f6');

  // Click on "New Patient" from dropdown menu
  await page.click('li.MuiMenuItem-root:has-text("New Patient")');

  // Click on "Enter Patient Details" box
  await page.click('text=Enter Patient Details');

  // Click on "Next" button
  await page.click('button:has-text("Next")');

  // Wait for form to load
  await page.waitForLoadState('networkidle');

  // Fill mandatory Patient Details
  await page.fill('input[name="firstName"]', 'Rancy');
  await page.fill('input[name="lastName"]', 'Peter');
  
  // Handle Date of Birth field
  await page.click('input[name="birthDate"]');
  await page.fill('input[name="birthDate"]', '01-01-2005');

  // Select Gender from dropdown
  await page.click('input[name="gender"]');
  await page.click('li:has-text("Female")');

  // Fill mandatory Contact Info
  await page.fill('input[name="mobileNumber"]', '5555555555');
  await page.fill('input[name="email"]', 'rancy05@mailinator.com');

  // Click Save button
  await page.click('button:has-text("Save")');

  // Wait for save operation to complete
  await page.waitForLoadState('networkidle');

  // Verify patient was created successfully
  // This could be enhanced with specific assertions based on the success message or patient list
  await expect(page).toHaveURL(/.*patient.*/, { timeout: 10000 });
});


test('Login and Create New Appointment', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'This test runs only on Chromium');

  await page.goto('https://stage_ketamin.uat.provider.ecarehealth.com/', { timeout: 90000 });
  await page.fill('input[placeholder="Email"]', 'amol.shete+TP@medarch.com');
  await page.fill('input[type="password"]', 'Test@123$');
  await page.click('button:has-text("Let\'s get Started")');
  await page.waitForLoadState('networkidle');

  // Click Create (robust selector)
  await page.locator(':text-is("Create")').first().click();
  // Click New appointment (robust selector)
  await page.locator(':text-matches("New appointment", "i")').first().click();

  await page.screenshot({ path: 'after-new-appointment.png' });
}); 