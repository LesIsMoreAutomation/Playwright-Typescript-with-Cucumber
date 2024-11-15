import { Given, When, Then } from "@cucumber/cucumber";
import { page, baseBage } from "../config/global-setup";
import {BasePage} from "../page-objects/login-signin/BasePage";


Given("I enter my username {string}", async function (username) {
    await baseBage.OfficePage.enterUsername(username);
});

Given("I enter my password {string}", async function (password) {
    await baseBage.OfficePage.enterPassword(password);
});

Then("I click on a {string}", async function (text) {
    await baseBage.OfficePage.clickOnText(text);
});

When("I search for {string}", async function (text) {
    await baseBage.SportPage.enterPlaceholderInput(text)
});