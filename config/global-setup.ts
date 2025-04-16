import { After, AfterStep, Before, setDefaultTimeout, Status, World } from '@cucumber/cucumber';
import { Page, Browser, chromium, firefox, webkit, BrowserContext } from '@playwright/test';
import { BasePage } from '../page-objects/login-signin/BasePage';
import { config } from './runsetting-config';
import * as fs from 'fs';
import * as path from 'path';
let page: Page;
let browser: Browser;
let context: BrowserContext;
let basePage: BasePage;
// Define directories for artifacts
const artifactsDir = './test-results';
const screenshotsDir = path.join(artifactsDir, 'screenshots');
const videosDir = path.join(artifactsDir, 'videos');
const tracesDir = path.join(artifactsDir, 'traces');
// Create directories if they don't exist
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
// Setup directories
ensureDirectoryExists(screenshotsDir);
ensureDirectoryExists(videosDir);
ensureDirectoryExists(tracesDir);
setDefaultTimeout(1200000);
Before(async function(this: World, scenario) {
  // Get scenario info for naming artifacts
  const scenarioName = scenario.pickle.name.replace(/\s+/g, '-').toLowerCase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testId = `${scenarioName}-${timestamp}`;

  switch (config.browserOptions.channel) {
    case "firefox":
      browser = await firefox.launch(config.browserOptions);
      break;

    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }

  // Configure browser context with recording options
  context = await browser.newContext({
    recordVideo: {
      dir: videosDir,
      size: { width: 1280, height: 720 }
    },
  });

  // Start tracing
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  page = await context.newPage();
  basePage = await new BasePage(page);

  // Attach test info to World
  (this as any).testId = testId;
});
AfterStep(async function(this: World, { result }) {
  // Capture screenshot after each step
  if (result.status !== Status.PASSED) {
    const testId = (this as any).testId;
    const screenshotPath = path.join(screenshotsDir, `${testId}-passed.png`);
    const screenshot = await page.screenshot({ path: screenshotPath });
    await this.attach(screenshot, 'image/png');
  }
});
After(async function(this: World, scenario) {
  const testId = (this as any).testId;

  try {
    // Stop tracing and save trace file
    await context.tracing.stop({
      path: path.join(tracesDir, `${testId}.zip`)
    });

    // Capture final screenshot if scenario failed
    if (scenario.result?.status === Status.FAILED) {
      const screenshotPath = path.join(screenshotsDir, `${testId}-failed.png`);
      const screenshot = await page.screenshot({ path: screenshotPath });
      await this.attach(screenshot, 'image/png');

      // Attach trace file info to report
      await this.attach(
        `Trace file saved to: ${path.join(tracesDir, `${testId}.zip`)}`,
        'text/plain'
      );
    }
  } catch (error) {
    console.error('Error during test teardown:', error);
  } finally {
    // Always close browser resources
    await context.close();
    await browser.close();

    // If video was recorded, attach info to report
    const videoPath = `${videosDir}/${(context as any)._testId}.webm`;
    if (fs.existsSync(videoPath)) {
      await this.attach(`Video recorded at: ${videoPath}`, 'text/plain');
    }
  }
});
export { page, basePage };
