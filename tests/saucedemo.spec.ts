import { test, expect } from '@playwright/test';
import * as credentials from '../tests/resources/credential.json';

const baseUrl = 'https://www.saucedemo.com';
const inventoryUrl = `${baseUrl}/inventory.html`;
const cartUrl = `${baseUrl}/cart.html`;
const checkoutStepOneUrl =  `${baseUrl}/checkout-step-one.html`;
const checkoutStepTwoUrl =  `${baseUrl}/checkout-step-two.html`;
const checkoutCompleteUrl =  `${baseUrl}/checkout-complete.html`;

test('login and basic purchase process should work', async ({ page }) => {
  await page.goto(inventoryUrl);
  await expect(page.url()).toContain(baseUrl);

  // Login
  await page.fill('[data-test="username"]', credentials.users.perf_glitch.username);
  await page.fill('[data-test="password"]', credentials.users.perf_glitch.password);
  await page.click('[data-test=login-button]');
  await expect(page.url()).toEqual(inventoryUrl);

  // Add items to cart
  let expectedNumberOfItemsInCart = 0;
  const backpackCartSelector = '[data-test="add-to-cart-sauce-labs-backpack"]';
  await page.click(backpackCartSelector);
  expectedNumberOfItemsInCart++;

  const fleeceJacketCartSelector = '[data-test="add-to-cart-sauce-labs-fleece-jacket"]';
  await page.click(fleeceJacketCartSelector);
  expectedNumberOfItemsInCart++;

  // Check number of items in cart
  const shoppingCartBadgeSelector = '.shopping_cart_badge';
  const shoppingCartBadgeText = await page.textContent(shoppingCartBadgeSelector);
  await expect(shoppingCartBadgeText).toEqual(expectedNumberOfItemsInCart.toString());

  // Finish purchase process
  const shoppingCartContainer = '.shopping_cart_container';
  await page.click(shoppingCartContainer);
  await expect(page.url()).toContain(cartUrl);

  const checkoutButtonSelector = '[data-test="checkout"]';
  await page.click(checkoutButtonSelector);
  await expect(page.url()).toContain(checkoutStepOneUrl);

  const firstName: string = 'First';
  const lastName: string = 'Last';
  const zipCode: string = '1031';
  await page.fill('[data-test="firstName"]', firstName);
  await page.fill('[data-test="lastName"]', lastName);
  await page.fill('[data-test="postalCode"]', zipCode);
  await page.click('[data-test=continue]');
  await expect(page.url()).toContain(checkoutStepTwoUrl);

  await page.click('[data-test=finish]');
  await expect(page.url()).toContain(checkoutCompleteUrl);

  // Validate complete step
  const expectedCompleteText: string = 'Thank you for your order';
  await expect(page.getByText(expectedCompleteText)).toBeVisible()
});
