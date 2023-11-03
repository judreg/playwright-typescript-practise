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

    await inventoryPage.visit();
    await loginPage.waitForPageURL();
  });

  test("login and basic purchase process should work", async ({}) => {
    await loginPage.login(
      credentials.users.perf_glitch.username,
      credentials.users.perf_glitch.password
    );
    await inventoryPage.waitForPageURL();

    await inventoryPage.addItemToCart("backpack");
    await inventoryPage.addItemToCart("fleeceJacket");
    const expectedNumberOfItemsInCart: number = 2;
    const numberOfItemsInCart: number =
      await inventoryPage.getNumberOfItemsInCart();
    expect(numberOfItemsInCart).toEqual(expectedNumberOfItemsInCart);

    await inventoryPage.goToShoppingCart();
    await cartPage.waitForPageURL();
    await cartPage.clickCheckoutButton();

    await checkoutStepOnePage.fillCheckoutForm("First", "Last", "1031");
    await checkoutStepTwoPage.waitForPageURL();

    await checkoutStepTwoPage.clickFinishButton();
    await checkoutCompletePage.waitForPageURL();

    const expectedCompleteText: string = "Thank you for your order";
    await expect(page.getByText(expectedCompleteText)).toBeVisible();
  });

  test("login with error msg and validate footer", async ({}) => {
    await loginPage.clickOnLoginButton();
    const expectedErrorMessage: string = "Epic sadface: Username is required";
    await expect(page.getByText(expectedErrorMessage)).toBeVisible();

    await loginPage.login(
      credentials.users.standard.username,
      credentials.users.standard.password
    );
    await inventoryPage.waitForPageURL();

    await inventoryPage.scrollToBottom();

    const footerCopyText = await inventoryPage.getFooterCopyText();
    expect(footerCopyText).toContain("2023");
    expect(footerCopyText).toContain("Terms of Service");
  });
});
