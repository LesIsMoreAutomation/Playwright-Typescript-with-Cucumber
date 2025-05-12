const { exec } = require('child_process');
const reporter = require("cucumber-html-reporter");
const fs = require('fs');
const path = require('path');

const featureFiles = fs.readdirSync('features').filter(file => file.endsWith('.feature'));

featureFiles.forEach(featureFile => {
  const featurePath = path.join('features', featureFile);
  const testCommand = `cucumber-js ${featurePath}`; // Run tests for each feature file

  exec(testCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing tests for ${featureFile}: ${error.message}`);
    }
    if (stderr) {
      console.error(`Test stderr for ${featureFile}: ${stderr}`);
    }
    console.log(`Test stdout for ${featureFile}: ${stdout}`);

    // Generate the report for the current feature file
    const options = {
      theme: "bootstrap",
      jsonFile: `test-report/${featureFile.replace('.feature', '_report.json')}`, // Unique JSON file for each feature
      output: `test-report/${featureFile.replace('.feature', '_report.html')}`, // Unique HTML file for each feature
      screenshotsDirectory: "test-report/assets/",
      storeScreenshots: true,
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: true,
    };

    reporter.generate(options);
  });
});
