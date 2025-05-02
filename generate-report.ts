import reporter from "multiple-cucumber-html-reporter";

reporter.generate({
  jsonDir: "reports/json",
  reportPath: "reports/html",
  reportName: "Playwright + Cucumber Report",
  metadata: {
    browser: {
      name: "chrome",
      version: "latest"
    },
    device: "Local Machine",
    platform: {
      name: "Windows",
      version: "11"
    }
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Playwright Automation Framework" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "Regression" },
      { label: "Execution Start Time", value: new Date().toLocaleString() },
      { label: "Execution End Time", value: new Date().toLocaleString() }
    ]
  }
});
