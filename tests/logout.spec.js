import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stage_ketamin.uat.provider.ecarehealth.com/auth/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('amol.shete+TP@medarch.com');
  await page.getByRole('textbox', { name: '*********' }).click();
  await page.getByRole('textbox', { name: '*********' }).fill('Test@123$');
  await page.getByRole('button', { name: 'Let\'s get Started' }).click();
  await page.pause();
  await page.locator("//img[@alt='admin image']").click();
  await page.getByText('Log Out').click();
  await page.locator("//button[normalize-space()='Yes,Sure']").click();
});