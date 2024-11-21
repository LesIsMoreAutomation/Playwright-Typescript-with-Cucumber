const { exec } = require('child_process');
const reporter = require("cucumber-html-reporter");

const testCommand = 'cucumber-js'; // Adjust this command as necessary

exec(testCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing tests: ${error.message}`);
  }
  if (stderr) {
    console.error(`Test stderr: ${stderr}`);
  }
  console.log(`Test stdout: ${stdout}`);

  // Generate the report regardless of the test results
  const options = {
    theme: "bootstrap",
    jsonFile: "test-report/cucumber_report.json",
    output: "test-report/cucumber_report.html",
    screenshotsDirectory: "test-report/assets/",
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
  };

  reporter.generate(options);
});
