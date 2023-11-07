import { Page } from "@playwright/test";
import { CartPageSelectors } from "../../selectors/saucedemo.selectors";
import { BasePage } from "../basePage";
import { sauceDemoBaseURL } from "../../../config";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, `${sauceDemoBaseURL}/cart.html`);
  }

  async clickCheckoutButton(): Promise<void> {
    await this.page.click(CartPageSelectors.checkoutButton);
  }
}
