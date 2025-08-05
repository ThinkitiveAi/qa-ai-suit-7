const { test, expect } = require('@playwright/test');

test('Login and Create New Appointment (Simple)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'This test runs only on Chromium');

  await page.goto('https://stage_ketamin.uat.provider.ecarehealth.com/', { timeout: 90000 });
  await page.fill('input[placeholder="Email"]', 'amol.shete+TP@medarch.com');
  await page.fill('input[type="password"]', 'Test@123$');
  await page.click('button:has-text("Let\'s get Started")');
  //await page.waitForLoadState('networkidle');

 // Click Create and New appointment
  await page.click('text=Create');
  await page.click('text=New appointment');

  // Select Patient Name
  await page.fill('text=Patient Name *', 'Rancy Peter');
  await page.click('text=Rancy Peter');

  // Select Appointment Type
  const appttype = page.getByRole('combobox', { name: 'Appointment Type *' });
  await appttype.click();
  await page.getByRole('option', { name: 'New Patient Visit' }).click();

  // Fill Reason for Visit
  await page.fill('text =Reason For Visit *', 'Cough');

  // Select Time Zone
  await page.fill('text=Timezone *', 'Eastern Daylight Time (GMT -04:00)');
  await page.click('text= Eastern Daylight Time (GMT -04:00)');

  // Select Visit Type (toggle button)
  await page.click("button[value='VIRTUAL']");

  // Select Provider
  const provider = page.getByRole('combobox', { name: 'Provider *' });
  await provider.click();
  await page.getByRole('option', { name: 'Ben Jones' }).click();

  // Click View Availability
  await page.click('text=View Availability');
  await page.getByRole('gridcell', { name: '11' }).click();
  await page.getByRole('button', { name: '01:00 PM - 01:30 PM' }).click();
  await page.getByRole('button', { name: 'Save And Close' }).click();

  /*// Navigate to Scheduling > Appointments
  await page.click('text=Scheduling');
  await page.click('text=Appointments');

  // Verify the new appointment is created
  await expect(page.locator('text=George Gayle')).toBeVisible();
  await expect(page.locator('text=Cold')).toBeVisible();

  await page.screenshot({ path: 'appointment-created.png' });*/
}); 