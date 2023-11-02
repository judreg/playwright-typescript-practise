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
}
