import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/checkout-complete.html");
  }
}
