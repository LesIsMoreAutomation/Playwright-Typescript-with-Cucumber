import { After, AfterStep, Before, setDefaultTimeout, Status, World } from '@cucumber/cucumber';
import { Page, Browser, chromium, firefox, webkit, BrowserContext } from '@playwright/test';
import { BasePage } from '../page-objects/login-signin/BasePage';
import { config } from './runsetting-config';


let page: Page;
let browser: Browser;
let context: BrowserContext;
let baseBage: BasePage;

setDefaultTimeout(1200000);

Before(async () => {
  switch (config.browser) {
    case "firefox":
      browser = await firefox.launch(config.browserOptions);
      break;
    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  context = await browser.newContext();
  page = await context.newPage();
  baseBage = await new BasePage(page);
});

After(async function (this: World, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenShot = await page.screenshot();
    await this.attach(screenShot, "image/png");
  }
  await context.close();
  await browser.close();
});
export { page, baseBage };
