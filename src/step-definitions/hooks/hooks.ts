import { BeforeAll, AfterAll, Before, After, AfterStep } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { pageFixture } from "../../../browserContextFixture";
import fs from "fs-extra";
import path from "path";

let browser: Browser;

BeforeAll(async function () {
  console.log("\nExecuting test suite...");
  fs.emptyDirSync("reports/screenshots");
  fs.emptyDirSync("reports/videos");
});

AfterAll(async function () {
  console.log("\nFinished execution of test suite!");
});

Before(async function () {
  browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: "reports/videos/",
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  Object.assign(pageFixture, {
    browser,
    context,
    page,
    videoPath: ""
  });
});

AfterStep(async function () {
  const timestamp = Date.now();
  const filePath = path.join("reports", "screenshots", `${timestamp}.png`);
  await pageFixture.page.screenshot({ path: filePath, fullPage: true });
  const image = fs.readFileSync(filePath);
  this.attach(image, "image/png");
});

After(async function (scenario) {
  const video = await pageFixture.page.video();

  await pageFixture.page.close();
  await pageFixture.context.close();
  await browser.close();

  if (scenario.result?.status === "FAILED" && video) {
    const savedPath = await video.path();
    const fileName = `${Date.now()}-failed.webm`;
    const destPath = path.join("reports", "videos", fileName);
    await fs.move(savedPath, destPath, { overwrite: true });
    this.attach(fs.readFileSync(destPath), "video/webm");
  } else if (video) {
    const pathToDelete = await video.path();
    await fs.remove(pathToDelete);
  }
});
