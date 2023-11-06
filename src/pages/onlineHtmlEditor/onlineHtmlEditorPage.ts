import { Page } from "@playwright/test";
import { HtmlEditorSelectors } from "../../selectors/onlineHtmlEditor.selectors";
import { BasePage } from "../basePage";

export class HtmlEditorPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://onlinehtmleditor.dev");
  }

  async typeInEditor(text: string): Promise<void> {
    await this.page
      .frameLocator(HtmlEditorSelectors.editorIframe)
      .locator("body")
      .pressSequentially(text);
  }

  async pressBoldFormattingButton(): Promise<void> {
    await this.page.click(HtmlEditorSelectors.boldButton);
  }

  async pressUnderlineFormattingButton(): Promise<void> {
    await this.page.click(HtmlEditorSelectors.underlineButton);
  }

  async getEditorHtmlContent(): Promise<string> {
    return (
      (await this.page
        .frameLocator(HtmlEditorSelectors.editorIframe)
        .locator("body")
        .innerHTML()) || ""
    );
  }
}
