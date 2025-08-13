const { test, expect } = require('@playwright/test');

// ✅ Helper function to generate valid random names (letters only)
function getRandomName(length = 6) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}

test.describe('End-to-End: Provider + Patient + Availability + Appointment', () => {
  test('should create provider, patient, set availability, and schedule appointment', async ({ page }) => {
    const patientFirstName = getRandomName();
    const patientLastName = getRandomName();
    const patientEmail = `${patientFirstName.toLowerCase()}_${patientLastName.toLowerCase()}@mailinator.com`;

    const providerFirstName = getRandomName();
    const providerLastName = getRandomName();
    const providerEmail = `${providerFirstName.toLowerCase()}_${providerLastName.toLowerCase()}@mailinator.com`;

    // --- LOGIN ---
    await page.goto('https://stage_aithinkitive.uat.provider.ecarehealth.com/');
    await page.fill('input[name="username"]', 'RubyVOlague@jourrapide.com');
    await page.fill('input[type="password"]', 'Pass@123');
    await page.click('button:has-text("Let\'s get Started")');
    await page.waitForLoadState('networkidle');

    // --- Create Provider ---
    await page.click('text=Settings');
    await page.click('text=User Settings');
    await page.click('button:has-text("Providers")');
    await page.click('button:has-text("Add Provider User")');

    await page.fill('input[name="firstName"]', providerFirstName);
    await page.fill('input[name="lastName"]', providerLastName);
    await page.click('input[name="role"]');
    await page.click('[role="option"]:has-text("Provider")');
    await page.click('input[name="gender"]');
    await page.click('[role="option"]:has-text("Male")');
    await page.fill('input[name="email"]', providerEmail);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.click('button:has-text("Save")');
    console.log(`✅ Created provider: ${providerFirstName} ${providerLastName} (${providerEmail})`);

    // --- Create Patient ---
    await page.click('text=Create');
    await page.click('[role="menuitem"]:has-text("New Patient")');
    await page.click('text=Enter Patient Details');
    await page.click('text=Next');

    await page.fill('input[name="firstName"]', patientFirstName);
    await page.fill('input[name="lastName"]', patientLastName);
    await page.fill('input[name="birthDate"]', '07-02-1990');
    await page.click('input[name="gender"]');
    await page.click('text=Male');
    await page.fill('input[name="mobileNumber"]', '90123456' + Math.floor(Math.random() * 90));
    await page.fill('input[name="email"]', patientEmail);
    await page.click('button:has-text("Save")');
    console.log(`✅ Created patient: ${patientFirstName} ${patientLastName} (${patientEmail})`);

    // --- Set Availability for Provider ---
    await page.click('text=Scheduling');
    await page.click('text=Availability');

    await page.click('button:has-text("Edit Availability")');
    await page.getByRole('combobox', { name: 'Select Provider' }).click();
    await page.getByRole('option', { name: new RegExp(`${providerFirstName}.*`, 'i') }).click();
    await page.getByRole('combobox', { name: 'Time Zone *' }).click();
    await page.getByRole('option', { name: 'Alaska Daylight Time (UTC -8)' }).click();
    await page.getByRole('combobox', { name: 'Booking Window *' }).click();
    await page.getByRole('option', { name: '5 Week' }).click();
    await page.getByRole('combobox', { name: 'Start Time *' }).click();
    await page.getByRole('option', { name: '12:00 AM' }).click();
    await page.getByRole('combobox', { name: 'End Time *' }).click();
    await page.getByRole('option', { name: '01:00 AM (1 hr)' }).click();
    await page.getByRole('checkbox', { name: 'Telehealth' }).check();

    await page.locator('form').filter({ hasText: 'Appointment TypeAppointment' }).getByLabel('Open').first().click();
    await page.getByRole('option', { name: 'New Patient Visit' }).click();
    await page.locator('div').filter({ hasText: /^Duration$/ }).nth(1).click();
    await page.getByRole('option', { name: '60 minutes' }).click();

    await page.getByRole('button', { name: 'Save' }).click();
    await page.click('button:has-text("Save")');
    console.log(`✅ Availability set for provider: ${providerFirstName} ${providerLastName}`);

    // --- Schedule Appointment ---
    await page.click('text=Scheduling');
    await page.getByText('Appointments').click();
    await page.getByRole('button', { name: 'Schedule Appointment' }).click();
    await page.getByRole('menuitem', { name: 'New Appointment' }).waitFor({ state: 'visible' });
    await page.getByRole('menuitem', { name: 'New Appointment' }).click();

    // Select patient
    await page.getByRole('combobox', { name: 'Patient Name *' }).click();
    await page.getByRole('combobox', { name: 'Patient Name *' }).fill(`${patientFirstName} ${patientLastName}`);
    await page.getByText(`${patientFirstName} ${patientLastName}`).click();

    // Select appointment type
    await page.getByRole('combobox', { name: 'Appointment Type *' }).click();
    await page.getByRole('option', { name: 'New Patient Visit' }).click();
    await page.getByRole('textbox', { name: 'Reason For Visit *' }).fill('test');

    // Select Timezone
    await page.getByRole('combobox', { name: 'Timezone *' }).click();
    await page.getByRole('option', { name: 'Alaska Daylight Time (GMT -08' }).click();

    // Select Telehealth
    await page.getByRole('button', { name: 'Telehealth' }).click();

    // Select provider
    await page.getByRole('combobox', { name: 'Provider *' }).click();
    await page.getByRole('combobox', { name: 'Provider *' }).fill(`${providerFirstName} ${providerLastName}`);
    await page.getByRole('option', { name: new RegExp(`${providerFirstName}.*`, 'i') }).click();

    // View availability and select date/time
    await page.getByRole('button', { name: 'View availability' }).click();
    await page.getByRole('button', { name: '12:00 AM - 01:00 AM' }).click();
    await page.getByRole('button', { name: 'Save And Close' }).click();

    console.log(`✅ Appointment scheduled with ${providerFirstName} for patient ${patientFirstName}`);
  });
});
