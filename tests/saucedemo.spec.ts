import { chromium, test, expect, Browser, Page } from "@playwright/test";
import * as credentials from "../tests/resources/credential.json";
import { LoginPage } from "../src/pages/loginPage";
import { InventoryPage } from "../src/pages/inventoryPage";
import { CartPage } from "../src/pages/cartPage";
import { CheckoutStepOnePage } from "../src/pages/checkoutStepOnePage";
import { CheckoutStepTwoPage } from "../src/pages/checkoutStepTwoPage";
import { CheckoutCompletePage } from "../src/pages/checkoutCompletePage";

test.describe("Sauce Demo Tests", () => {
  let browser: Browser;
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeAll(async ({}) => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test("login and basic purchase process should work", async ({}) => {
    inventoryPage.visit();
    await page.waitForURL(loginPage.getUrl());

    await loginPage.login(
      credentials.users.perf_glitch.username,
      credentials.users.perf_glitch.password
    );
    await expect(page.url()).toEqual(inventoryPage.getUrl());

    await inventoryPage.addItemToCart("backpack");
    await inventoryPage.addItemToCart("fleeceJacket");
    const expectedNumberOfItemsInCart = 2;
    const numberOfItemsInCart = await inventoryPage.getNumberOfItemsInCart();
    expect(numberOfItemsInCart).toEqual(expectedNumberOfItemsInCart);

    await inventoryPage.goToShoppingCart();
    await page.waitForURL(cartPage.getUrl());
    await cartPage.clickCheckoutButton();

    await checkoutStepOnePage.fillCheckoutForm("First", "Last", "1031");
    await page.waitForURL(checkoutStepTwoPage.getUrl());

    await checkoutStepTwoPage.clickFinishButton();
    await page.waitForURL(checkoutCompletePage.getUrl());

    const expectedCompleteText: string = "Thank you for your order";
    await expect(page.getByText(expectedCompleteText)).toBeVisible();
  });
});
