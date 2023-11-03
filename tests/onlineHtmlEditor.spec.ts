import { chromium, test, expect } from "@playwright/test";
import { HtmlEditorPage } from "../src/pages/onlineHtmlEditor/onlineHtmlEditorPage";

test("Validate text formatting in rich text editor", async ({ page }) => {
  const htmlEditorPage = new HtmlEditorPage(page);

  await htmlEditorPage.visit();

  await htmlEditorPage.pressBoldFormattingButton();
  await htmlEditorPage.typeInEditor("Automation");
  await htmlEditorPage.pressBoldFormattingButton();

  await htmlEditorPage.typeInEditor(" ");

  await htmlEditorPage.pressUnderlineFormattingButton();
  await htmlEditorPage.typeInEditor("Test");
  await htmlEditorPage.pressUnderlineFormattingButton();

  await htmlEditorPage.typeInEditor(" Example");

  const expectedContent: string =
    "<strong>Automation</strong>&nbsp;<u>Test</u>​​​​​​​ Example";
  const editorContent = await htmlEditorPage.getEditorHtmlContent();
  expect(editorContent).toContain(expectedContent);
});
