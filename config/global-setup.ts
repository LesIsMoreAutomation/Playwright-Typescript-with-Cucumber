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

  // Attach browser objects to world context
  (this as any).browser = browser;
  (this as any).context = context;
  (this as any).page = page;
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
// Export a helper function to get page from World
export function getPage(world: World): Page {
  return (world as any).page;
}
