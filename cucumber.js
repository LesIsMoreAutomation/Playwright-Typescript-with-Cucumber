const path = require('path');
const fs = require('fs');

// Path to your step definitions
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
      throw new Error("Invalid path.");
    }
  } else {
    throw new Error(`Path "${featureArg}" does not exist.`);
  }
} else {
  featurePath = "features/**/*.feature"; 
}

const featureFileName = featureArg ? featureArg.split('/').pop().replace('.feature', '') : 'all-features';

const options = [
  // Use --loader instead of --require-module for ESM/Typescript compatibility
  "--loader ts-node/esm", 
  `--import ${stepsPath}`, 
  `-f json:test-report/${featureFileName}/${featureFileName}_cucumber_report.json`,
  `-f junit:test-report/${featureFileName}/${featureFileName}_cucumber_report.xml`,
  "--format summary",
  "--retry 1"
].join(" ");

let runsettings = [featurePath, options].join(" ");

module.exports = {
  default: runsettings,
  runner: runsettings
};
