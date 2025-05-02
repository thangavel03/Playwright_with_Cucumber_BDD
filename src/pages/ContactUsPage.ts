// src/pages/ContactUsPage.ts
import { Page, BrowserContext } from "@playwright/test";

export class ContactUsPage {
  constructor(private page: Page) {}

  async navigateToHomePage(url: string) {
    await this.page.goto(url);
  }

  async clickContactUsAndSwitchToNewTab(context: BrowserContext): Promise<Page> {
    const pagesBefore = context.pages();
    const newPagePromise = context.waitForEvent('page');

    await this.page.locator('#contact-us').click();
    const newPage = await newPagePromise;
    const pagesAfter = context.pages();
    const detectedPage = pagesAfter.find(p => !pagesBefore.includes(p)) || newPage;

    if (!detectedPage) {
      throw new Error("New tab was not detected after clicking Contact Us");
    }

    await detectedPage.waitForLoadState('load');
    await detectedPage.bringToFront();
    await detectedPage.setViewportSize({ width: 1920, height: 1080 });

    return detectedPage;
  }

  async fillFirstName(name: string) {
    await this.page.getByPlaceholder('First Name').fill(name);
  }

  async fillLastName(name: string) {
    await this.page.getByPlaceholder('Last Name').fill(name);
  }

  async fillEmail(email: string) {
    await this.page.getByPlaceholder('Email Address').fill(email);
  }

  async fillComment(comment: string) {
    await this.page.getByPlaceholder('Comments').fill(comment);
  }

  async clickSubmitButton() {
    const submitButton = this.page.locator('input[value="SUBMIT"]');
    await submitButton.waitFor({ state: 'visible', timeout: 100000 });
    await submitButton.click();
  }

  async verifySuccessMessage() {
    await this.page.waitForSelector('#contact_reply h1', { timeout: 60000 });
    const text = await this.page.innerText('#contact_reply h1');
    return text;
  }

  async verifyFailureMessage() {
    await this.page.waitForSelector("body");
    return await this.page.locator("body").textContent();
  }
}
