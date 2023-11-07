import { test, expect, Locator } from "@playwright/test";
import { Guru99DemoSitePage } from "../src/pages/guru99/demoSitePage";
import { SwTestingTutorialPage } from "../src/pages/guru99/swTestingTutorialPage";

test("Iframes and multiple tabs", async ({ page, context }) => {
  const demoSitePage = new Guru99DemoSitePage(page);
  await demoSitePage.visit();
  await demoSitePage.acceptConsentNotice();

  const pagePromise = context.waitForEvent("page");
  await demoSitePage.clickOnImageInIframe();

  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  expect(await newPage.title()).toEqual(
    "Selenium Live Project: FREE Real Time Project for Practice"
  );

  await newPage.close();
  await page.bringToFront();

  await demoSitePage.clickOnTestingIconInHeader();
  const swTestingTutorialPage = new SwTestingTutorialPage(page);
  await swTestingTutorialPage.dismissAd();

  const submitButton: Locator = await swTestingTutorialPage.getSubmitButton();
  await expect(submitButton.isVisible()).toBeTruthy();
});
