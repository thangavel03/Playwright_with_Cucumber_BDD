// src/step-definitions/ContactUs_Steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../browserContextFixture";
import { expect } from "@playwright/test";
import { ContactUsPage } from "../pages/ContactUsPage";


const url = "https://www.webdriveruniversity.com/";
let contactUsPage: ContactUsPage;
Given('I navigate to the webdriveruniversity homepage',{timeout:100000}, async () => {
  if (!pageFixture.page) throw new Error("Page is not initialized");
  contactUsPage = new ContactUsPage(pageFixture.page);
  await contactUsPage.navigateToHomePage(url);
});

When('I click on the contact us button and switch to the new tab',{timeout:100000}, async () => {
  if (!pageFixture.page || !pageFixture.context) throw new Error("Page or context not initialized");
  const newPage = await contactUsPage.clickContactUsAndSwitchToNewTab(pageFixture.context);
  pageFixture.page = newPage;
  contactUsPage = new ContactUsPage(newPage); // Update instance with new tab
});

When('I type a first name',{timeout:100000}, async () => {
  await contactUsPage.fillFirstName("Vel");
});

When('I type a last name', async () => {
  await contactUsPage.fillLastName("R A");
});

When('I enter an email address', async () => {
  await contactUsPage.fillEmail("vel@gmail.com");
});

When('I type a comment', async () => {
  await contactUsPage.fillComment("Hello world!");
});

When('I click on the submit button',{timeout:100000} ,async () => {
  await contactUsPage.clickSubmitButton();
});

Then('I should be presented with a successful contact us submission message',{timeout:100000}, async () => {
  const text = await contactUsPage.verifySuccessMessage();
  expect(text).toBe("Thank You for your Message!");
});

Then('I should be presented with a unsuccessful contact us message',{timeout:100000}, async () => {
  const bodyText = await contactUsPage.verifyFailureMessage();
  expect(bodyText).toMatch(/Error: (all fields are required|Invalid email address)/);
});
