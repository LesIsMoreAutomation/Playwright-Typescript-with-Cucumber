import { Given, When, Then } from "@cucumber/cucumber";
import { page, baseBage } from "../config/global-setup";

Given("I navigate to login page", async function () {
  await page.goto("https://www.saucedemo.com/");
});

Given("I enter username {string}", async function (username) {
  await baseBage.LoginPage.enterUsername(username);
});

Given("I enter password {string}", async function (password) {
  await baseBage.LoginPage.enterPassword(password);
});

When("I click login button", async function () {
  await baseBage.LoginPage.clickOnLogin();
});

Then("I will be navigated to home page", async function () {
  await baseBage.LoginPage.isUserLoggedIn();
});

Then("I click on the {string}", async function (text) {
  await baseBage.LoginPage.clickByText(text);
  await page.screenshot({ path: 'test-report/screenshot.png' })
});
