import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { CheckoutStepOneSelectors } from "../../selectors/saucedemo.selectors";

export class CheckoutStepOnePage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/checkout-step-one.html");
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    zipCode: string
  ): Promise<void> {
    await this.page.fill(CheckoutStepOneSelectors.firstNameInput, firstName);
    await this.page.fill(CheckoutStepOneSelectors.lastNameInput, lastName);
    await this.page.fill(CheckoutStepOneSelectors.zipCodeInput, zipCode);
    await this.page.click(CheckoutStepOneSelectors.continueButton);
  }
}
