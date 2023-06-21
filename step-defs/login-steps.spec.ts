import { Given, When, Then } from "@cucumber/cucumber";
import { page, baseBage } from "../config/global-setup";
import {BasePage} from "../page-objects/login-signin/BasePage";

Given("I navigate {string} to login page", async function (env) {
  await baseBage.LoginPage.navigateToLoginPage(env);
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
  await baseBage.InventoryPage.pageTitle();
});


Then("Error message {string}", async function (text) {
  await baseBage.LoginPage.lockoutError(text);
});
