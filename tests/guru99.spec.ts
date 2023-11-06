import { test, expect } from "@playwright/test";

test("Iframes and multiple tabs", async ({ page, context }) => {
  await page.goto("http://demo.guru99.com/test/guru99home");
  await page.frameLocator("#gdpr-consent-notice").locator("#save").click();

  const pagePromise = context.waitForEvent("page");
  await page.frameLocator("#a077aa5e").locator("img").click();

  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  expect(await newPage.title()).toEqual(
    "Selenium Live Project: FREE Real Time Project for Practice"
  );

  await newPage.close();
  await page.bringToFront();

  await page.locator(".top-banner").getByText("Testing").click();
  const outerIframe = await page.frameLocator(
    '[id="google_ads_iframe_/24132379/INTERSTITIAL_DemoGuru99_0"]'
  );
  await outerIframe
    .frameLocator("#ad_iframe")
    .locator("#dismiss-button")
    .click();

  await page.locator(".submit").isVisible();
});
