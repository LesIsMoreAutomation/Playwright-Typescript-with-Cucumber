import { Given, When, Then } from "@cucumber/cucumber";
import { page, basePage } from "../config/global-setup";
import {BasePage} from "../page-objects/login-signin/BasePage";


Given("I enter my username {string}", async function (username) {
    await basePage.OfficePage.enterUsername(username);
});

Given("I enter my password {string}", async function (password) {
    await basePage.OfficePage.enterPassword(password);
});

Then("I click on a {string}", async function (text) {
    await basePage.OfficePage.clickOnText(text);
});

When("I search for {string}", async function (text) {
    await basePage.SportPage.enterPlaceholderInput(text)
});
