const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Base directory where feature reports are stored
const baseReportDirectory = 'test-report';

// Iterate over all subdirectories to process reports
fs.readdirSync(baseReportDirectory).forEach((subDir) => {
  const reportDirectory = path.join(baseReportDirectory, subDir);

  if (fs.existsSync(reportDirectory) && fs.lstatSync(reportDirectory).isDirectory()) {
    fs.readdirSync(reportDirectory).forEach((file) => {
      if (file.endsWith('_cucumber_report.json')) {
        const jsonReportPath = path.join(reportDirectory, file);
        const featureName = file.replace('_cucumber_report.json', ''); // Extract feature name

        // Generate the HTML report for this JSON file
        const options = {
          theme: 'bootstrap',
          jsonFile: jsonReportPath,
          output: path.join(reportDirectory, `${featureName}_cucumber_report.html`),
          storeScreenshots: true,
          reportSuiteAsScenarios: true,
          scenarioTimestamp: true,
          launchReport: true,
          customData: {
            title: 'My Custom Report',
            data: [
              { label: 'Feature', value: featureName },
              { label: 'Project', value: 'Cucumber Playwright' },
              { label: 'Environment', value: 'Dev' },
              { label: 'Date', value: new Date().toLocaleString() },
            ],
          },
        };

        console.log(`Generating HTML report for ${featureName} in ${subDir}...`);
        reporter.generate(options);
        console.log(`HTML report for ${featureName} in ${subDir} generated successfully!`);
      }
    });
  }
});
