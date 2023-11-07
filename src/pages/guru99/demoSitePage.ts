import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { guru99BaseURL } from "../../../config";

export class Guru99DemoSitePage extends BasePage {
  constructor(page: Page) {
    super(page, `${guru99BaseURL}/test/guru99home`);
  }

  async acceptConsentNotice(): Promise<void> {
    await this.page
      .frameLocator("#gdpr-consent-notice")
      .locator("#save")
      .click();
  }

  async clickOnImageInIframe(): Promise<void> {
    await this.page.frameLocator("#a077aa5e").locator("img").click();
  }

  async clickOnTestingIconInHeader(): Promise<void> {
    await this.page.locator(".top-banner").getByText("Testing").click();
  }
}
