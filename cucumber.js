const options = [
  "--require-module ts-node/register",
  "--require step-defs/*.spec.ts",
  "-f json:test-report/cucumber_report.json",
  '--retry', '0',
].join(" ");

let runsettings = ["features/*.feature", options].join(" ");

module.exports = {
  runner: runsettings,
  // Add this to ensure the report is generated regardless of test results
  after: (results) => {
    const reporter = require("cucumber-html-reporter");
    const reportOptions = {
      theme: "bootstrap",
      jsonFile: "test-report/cucumber_report.json",
      output: "test-report/cucumber_report.html",
      screenshotsDirectory: "test-report/assets/",
      storeScreenshots: true,
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: true,
      customData: {
        title: 'My Custom Report',
        data: [
          { label: 'Project', value: 'Cucumber Playwright' },
          { label: 'Environment', value: 'Staging' },
          { label: 'Date', value: new Date().toLocaleString() }, // Current date and time
          { label: 'Logo', value: '<img "logo.png" alt="logo" />' } // Example of adding logo
        ]
      }
    };

    // Generate the report
    reporter.generate(reportOptions);
  }
};
