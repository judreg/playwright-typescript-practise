import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { CheckoutStepTwoSelectors } from "../../selectors/saucedemo.selectors";
import { sauceDemoBaseURL } from "../../../config";

export class CheckoutStepTwoPage extends BasePage {
  constructor(page: Page) {
    super(page, `${sauceDemoBaseURL}/checkout-step-two.html`);
  }

  async clickFinishButton(): Promise<void> {
    await this.page.click(CheckoutStepTwoSelectors.finishButton);
  }
}
