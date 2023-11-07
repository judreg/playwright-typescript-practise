import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { sauceDemoBaseURL } from "../../../config";

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page, `${sauceDemoBaseURL}/checkout-complete.html`);
  }
}
