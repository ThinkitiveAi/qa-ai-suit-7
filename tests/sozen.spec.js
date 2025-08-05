const {test, expect}= require('@playwright/test');

test('My First test', async({page})=>{

    const UserName = page.locator('#email');
    const login = page.locator('text = Log In');

    await page.goto("https://qa-prp.sozen.health/");
    await page.pause();
    await UserName.fill("pooja.katkar@thinkitive.com");
    //await page.pause();
    await page.locator('#password').fill("Admin@123");
    //await page.pause();
    await login.click();
    //await page.pause();
    await page.locator('#button-settings').click();
    await page.locator('text = Locations').click();
    //await page.pause();
    await page.locator('#practice-setting-add-new-location-button').click();
    //await page.pause();
    await page.locator('#location-modal-name-input').fill("USA clinic");
    await page.pause();
    await page.locator('#location-modal-contactNumber-input').fill("5658974258");
    await page.pause();
    //dropdown handling
    const contactPersonInput = page.locator("input[placeholder='Enter Contact Person']");
    await contactPersonInput.click();
    await page.waitForTimeout(500);
    await page.pause();
   // Click the desired option by its visible text
    await page.locator("text=Sofiya").click();

    await page.locator("input[placeholder='Select'][name='PlaceOfService']").click();
    await page.pause();
    await page.locator('#dropdown-modal-add-new-btn').click();
    //await page.pause();
    await page.locator('#add-place-of-service-input').fill("ABC");
    await page.locator('#add-place-of-service-save-button').click();
    await page.locator("input[placeholder='Select'][name='specialityType']").click();
    await page.locator('#dropdown-modal-option-checkbox-2').click();
    //await page.pause();
    await page.locator('#dropdown-modal-done-button').click();

    await page.locator('#location-modal-email-input').fill("clinicUS09@mailinator.com");
    await page.locator('#location-modal-faxId-input').fill("9999999999");
    await page.pause();
    await page.locator('#location-modal-clinicNpiNumber-input').fill("5555555555");
    await page.pause();
    await page.locator('#location-modal-physical-physicalAddress1-input').fill("123 Main St");
    await page.locator("input[placeholder='Select State'][name='physicalAddressState']").fill("New York");
    await page.locator("button[id='dropdown-modal-option-New York']").click();
    //await page.pause();
    await page.locator("input[placeholder='Select City'][name='physicalAddressCity']").click();
    await page.locator("button[id='dropdown-modal-option- New york']").click();
    await page.locator('#location-modal-physical-physicalAddressZip-input').fill("58568");
    await page.locator('#checkbox-label-location-modal-same-address-checkbox').click();

    await page.locator('#location-modal-working-hours-checkbox-0').click();
    await page.locator("div[id='location-modal-working-hours-open-time-0'] select:nth-child(1)").click();
    await page.waitForTimeout(500);
    await page.locator('#location-modal-working-hours-open-time-0').getByRole('combobox').first().selectOption('19');
    await page.locator('#location-modal-working-hours-open-time-picker-0').click();
    await page.locator('#location-modal-working-hours-open-time-picker-0').selectOption('21');
    await page.pause();
    await page.locator('#location-modal-working-hours-close-time-0').getByRole('combobox').first().selectOption('12');
    await page.locator('#location-modal-working-hours-close-time-picker-0').click();
    await page.pause();
    await page.locator('#location-modal-working-hours-close-time-picker-0').selectOption('14');
    await page.locator('#location-modal-save-button').click();

});


test.only('test', async ({ page }) => {
  await page.goto('https://qa-prp.sozen.health/login');
  await page.getByRole('textbox', { name: 'Enter Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('pooja.katkar@thinkitive.com');
  await page.getByRole('textbox', { name: 'Enter Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('Admin@123');
  await page.locator('#password-field path').click();
  await page.locator('#password-field').getByRole('img').click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.locator('#setting-card-option-provider-account-3').click();
  /*await page.getByRole('button', { name: 'Add New Patient Flag' }).click();
  await page.getByRole('textbox', { name: 'Enter Flag Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Flag Name' }).fill('Test Flag');
  await page.locator('#color-selector-swatch').click();
  await page.pause();
  await page.locator('#color-selector-option-00FF00').click();
  await page.getByRole('button', { name: 'Create Flag' }).click();*/
  await page.pause();
  await page.getByRole('row', { name: 'Test Flag 0 07/01/2025 07/01/' }).locator('#dropdown-trigger').click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('#color-selector-swatch').click();
  await page.locator('#color-selector-option-7F00FF').click();
  await page.getByRole('textbox', { name: 'Enter Flag Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Flag Name' }).fill('Diabeties');
  await page.getByRole('button', { name: 'Update Flag' }).click();
  await page.locator('#color-selector-option-FFFF00').click();
  await page.getByRole('button', { name: 'Update Flag' }).click();
  await page.getByRole('row', { name: 'Diabeties 0 07/01/2025 07/01/' }).locator('#dropdown-trigger').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
});