const path = require("path");

const stepDefinitionsPath = path.resolve(process.cwd(), "./src/support/step_definitions");
const outputFolder = path.resolve(process.cwd(), "../../dist/cypress/cucumber-json");

module.exports = {
  nonGlobalStepDefinitions: false,
  stepDefinitions: stepDefinitionsPath,
  commonPath: stepDefinitionsPath, // I added this line, not sure if necessary
  cucumberJson: {
    generate: true,
    outputFolder: outputFolder,
    filePrefix: "",
    fileSuffix: ".cucumber"
  }
};
