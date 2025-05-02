// cucumber.js
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.ts'],
    format: [
      'progress',
      'json:reports/json/cucumber-report.json'
    ],
    paths: ['src/features/**/*.feature'],
    parallel: 0,
    timeout: 100000 // ⏰ Increase timeout to 60 seconds
  }
};
