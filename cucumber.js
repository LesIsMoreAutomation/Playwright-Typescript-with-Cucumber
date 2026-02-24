const path = require('path');
const fs = require('fs');

/**
 * FIXED: Path to your step definitions
 * Based on your structure: Playwright-Typescript-with-Cucumber-main/step-defs
 * Note: Use forward slashes (/) for cross-platform compatibility
 */
const stepsPath = "step-defs/*.ts"; 

// Get the feature folder or file path from command-line arguments
const featureArg = process.argv.find(arg => arg.includes('features/'));
let featurePath;

if (featureArg) {
  const fullPath = path.resolve(featureArg);
  if (fs.existsSync(fullPath)) {
    if (fs.lstatSync(fullPath).isDirectory()) {
      featurePath = path.join(fullPath, '**/*.feature'); 
    } else if (fs.lstatSync(fullPath).isFile() && fullPath.endsWith('.feature')) {
      featurePath = fullPath; 
    } else {
      throw new Error("Invalid path. Provide a folder containing .feature files or a specific .feature file.");
    }
  } else {
    throw new Error(`Path "${featureArg}" does not exist.`);
  }
} else {
  featurePath = "features/**/*.feature"; 
}

// Extract the feature file name for reporting
const featureFileName = featureArg ? featureArg.split('/').pop().replace('.feature', '') : 'all-features';

const options = [
  "--require-module ts-node/register",
  // Use --import for Cucumber 11+ compatibility with TypeScript
  `--import ${stepsPath}`, 
  `-f json:test-report/${featureFileName}/${featureFileName}_cucumber_report.json`,
  `-f junit:test-report/${featureFileName}/${featureFileName}_cucumber_report.xml`,
  "--format summary",
  "--retry", "1"
].join(" ");

let runsettings = [featurePath, options].join(" ");

module.exports = {
  default: runsettings,
  runner: runsettings
};
