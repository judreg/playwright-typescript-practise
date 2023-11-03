import { Page } from "@playwright/test";
import { CartPageSelectors } from "../../selectors/saucedemo.selectors";
import { BasePage } from "../basePage";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/cart.html");
  }

  async clickCheckoutButton(): Promise<void> {
    await this.page.click(CartPageSelectors.checkoutButton);
  }
}
