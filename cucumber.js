const path = require('path');
const fs = require('fs');

// Get the feature folder or file path from command-line arguments
const featureArg = process.argv.find(arg => arg.includes('features/'));
let featurePath;

if (featureArg) {
  const fullPath = path.resolve(featureArg);
  if (fs.existsSync(fullPath)) {
    if (fs.lstatSync(fullPath).isDirectory()) {
      featurePath = path.join(fullPath, '**/*.feature'); // Run all .feature files in the folder
    } else if (fs.lstatSync(fullPath).isFile() && fullPath.endsWith('.feature')) {
      featurePath = fullPath; // Run the specific .feature file
    } else {
      throw new Error("Invalid path. Provide a folder containing .feature files or a specific .feature file.");
    }
  } else {
    throw new Error(`Path "${featureArg}" does not exist.`);
  }
} else {
  featurePath = "features/**/**/*.feature"; // Default to all .feature files
}

// Extract the feature file name for reporting
const featureFileName = featureArg ? featureArg.split('/').pop().replace('.feature', '') : 'all-features';

const options = [
  "--require-module ts-node/register",
  "--require src/step-defs/*.spec.ts",
  `-f json:test-report/${featureFileName}/${featureFileName}_cucumber_report.json`,
  `-f junit:test-report/${featureFileName}/${featureFileName}_cucumber_report.xml`,
  "--retry", "1"
].join(" ");

let runsettings = [featurePath, options].join(" ");

module.exports = {
  default: runsettings,
  runner: runsettings
};
