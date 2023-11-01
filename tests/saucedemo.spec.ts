import { test, expect } from '@playwright/test';
import * as credentials from '../tests/resources/credential.json';

const baseUrl = 'https://www.saucedemo.com';
const inventoryUrl = `${baseUrl}/inventory.html`;

test('login and basic purchase process should work', async ({ page }) => {
  await page.goto(inventoryUrl);
  await expect(page.url()).toContain(baseUrl);

  await page.fill('[data-test="username"]', credentials.users.perf_glitch.username);
  await page.fill('[data-test="password"]', credentials.users.perf_glitch.password);
  await page.click('[data-test=login-button]');
  await expect(page.url()).toEqual(inventoryUrl);

  const BackpackCart = '[data-test="add-to-cart-sauce-labs-backpack"]';
  await page.click(BackpackCart);

  const fleeceJacketCart = '[data-test="add-to-cart-sauce-labs-fleece-jacket"]';
  await page.click(fleeceJacketCart);
});
