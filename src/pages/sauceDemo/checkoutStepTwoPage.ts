import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { CheckoutStepTwoSelectors } from "../../selectors/saucedemo.selectors";

export class CheckoutStepTwoPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/checkout-step-two.html");
  }

  async clickFinishButton(): Promise<void> {
    await this.page.click(CheckoutStepTwoSelectors.finishButton);
  }
}
