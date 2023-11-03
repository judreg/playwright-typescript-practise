import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  getUrl(): string {
    return this.url;
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url);
  }

  async waitForPageURL(): Promise<void> {
    await this.page.waitForURL(this.url);
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
  }
}
