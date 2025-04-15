import { After, AfterStep, Before, setDefaultTimeout, Status, World } from '@cucumber/cucumber';
import { Page, Browser, chromium, firefox, webkit, BrowserContext } from '@playwright/test';
import { BasePage } from '../page-objects/login-signin/BasePage';
import { config } from './runsetting-config';
// Define a proper world interface
interface PlaywrightWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  basePage: BasePage;
}
// Set timeout for all steps
setDefaultTimeout(1200000);
// Initialize browser before each scenario
Before(async function(this: World) {
  // Launch browser based on configuration
  let browser: Browser;
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
  // Create context and page
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Initialize BasePage
  const basePage = new BasePage(page);
  
  // Attach browser objects to world context
  (this as any).browser = browser;
  (this as any).context = context;
  (this as any).page = page;
  (this as any).basePage = basePage;
});
// Clean up after each scenario
After(async function(this: PlaywrightWorld, scenario) {
  // Take screenshot on failure
  if (scenario.result?.status === Status.FAILED) {
    const screenShot = await this.page.screenshot();
    await this.attach(screenShot, "image/png");
  }
  
  // Close browser resources
  await this.context.close();
  await this.browser.close();
});
// Helper function to get the BasePage from World
export function getBasePage(world: World): BasePage {
  return (world as any).basePage;
}
// Helper function to get the Page from World
export function getPage(world: World): Page {
  return (world as any).page;
}
