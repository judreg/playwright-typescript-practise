import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class SwTestingTutorialPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.guru99.com/software-testing.html");
  }

  async dismissAd(): Promise<void> {
    const outerIframe = await this.page.frameLocator(
      '[id="google_ads_iframe_/24132379/INTERSTITIAL_DemoGuru99_0"]'
    );
    await outerIframe
      .frameLocator("#ad_iframe")
      .locator("#dismiss-button")
      .click();
  }

  async getSubmitButton(): Promise<Locator> {
    return await this.page.locator(".submit");
  }
}
