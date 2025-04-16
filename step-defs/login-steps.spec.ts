import { Given, When, Then } from "@cucumber/cucumber";
import { page, basePage } from "../config/global-setup";
import {BasePage} from "../page-objects/login-signin/BasePage";
import {expect} from "@playwright/test";

Given("I navigate {string} to login page", async function (env) {
  await basePage.LoginPage.navigateToLoginPage(env);
});

Given("I enter username {string}", async function (username) {
  await basePage.LoginPage.enterUsername(username);
});

Given("I enter password {string}", async function (password) {
  await basePage.LoginPage.enterPassword(password);
});

When("I click login button", async function () {
  await basePage.LoginPage.clickOnLogin();
});

Then("I will be navigated to home page", async function () {
  await basePage.InventoryPage.pageTitle();
});


Then("Error message {string}", async function (text) {
  await basePage.LoginPage.lockoutError(text);
});

Then("I click on the link text {string}", async function (text) {
  await basePage.SportPage.clickByRole(text);
  await page.screenshot({ path: 'test-report/screenshot.png' })
});

Then('I should see {string} in {string} place', async function (driverName: string, position: string) {
  const positionNumber = parseInt(position); // Convert position to a number
  const actualName = await basePage.SportPage.getNameAtPosition(positionNumber);
  expect(actualName).toBe(driverName); // Assert that the actual name matches the expected name


});


Then('I assert that there are at least {int} list items', async function (results) {
  const selector = '.ssrcss-1020bd1-Stack.e1y4nx260'; // The CSS selector for the <ul> element

  // Wait for the <ul> element to be visible
  await page.waitForSelector(selector);

  // Get all the <li> elements within the specified <ul>
  const listItems = await page.$$(selector + ' li'); // Adjust selector for <li> items

  // Count the number of <li> elements
  const numberOfItems = listItems.length;

  // Assert that there are at least 4 <li> elements
  expect(numberOfItems).toBeGreaterThanOrEqual(results); // At least 4 items
});

